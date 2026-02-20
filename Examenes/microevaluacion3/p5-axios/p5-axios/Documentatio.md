# PokéGallery - Documentación Técnica del Proyecto

## 1. Introducción
**PokéGallery** es una aplicación web interactiva desarrollada con **React 19** y **TypeScript**. Actúa como una interfaz visual moderna para la [PokéAPI](https://pokeapi.co/), permitiendo la exploración de Pokémon mediante un sistema de paginación optimizado, filtrado por tipos y búsqueda directa.

### Stack Tecnológico
* **Core:** React 19.2 (Hooks, Functional Components).
* **Lenguaje:** TypeScript 5.9 (Tipado estricto).
* **Build Tool:** Vite 7 (Hot Module Replacement instantáneo).
* **Estilos:** Tailwind CSS 4.1 (Utility-first framework).
* **Red:** Fetch API nativa.

---

## 2. Instalación y Configuración

El proyecto utiliza `vite` para la gestión del entorno.

### Requisitos
* Node.js v18 o superior.
* NPM o Yarn.

### Comandos
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:5173)
npm run dev

# Construir para producción (genera carpeta /dist)
npm run build
```

## 3. Definición de Tipos (types/pokemon.ts)
Se utiliza una interfaz centralizada para evitar la sobrecarga de datos (Over-fetching) en el cliente.

```
export interface PokemonBase {
  id: string;       // Identificador único (ej: "1")
  name: string;     // Nombre del Pokémon
  url?: string;     // URL de referencia a la API
  imageUrl: string; // URL del "Official Artwork"
  types: string[];  // Array de tipos (ej: ["grass", "poison"])
}
```
## 4. Arquitectura del Controlador (App.tsx)
El archivo App.tsx funciona como el Contenedor Inteligente o Controlador. No solo renderiza la UI, sino que orquesta toda la lógica de negocio.

Gestión de Estado (Hooks)
El componente mantiene la verdad única de la aplicación a través de múltiples estados:

view: Controla el modo de visualización ('home', 'type-grid', 'search').

pokemons: Array de objetos PokemonBase que se renderizan actualmente.

typeTotalList: Almacena todas las referencias de un tipo específico (pueden ser 100+) para permitir la paginación en el cliente sin volver a consultar la API de tipos.

currentPage: Índice numérico para controlar el "slice" (rebanada) del array typeTotalList.

loading: Bandera booleana para mostrar estados de carga.

Inicialización (useEffect)
Al montar el componente ([]), se ejecuta loadHome(), que trae una lista predefinida de Pokémon populares ("Héroes") para que la pantalla no esté vacía al inicio.

## 5. Estrategias de Consumo de API y Paginación
El sistema utiliza tres estrategias diferentes para obtener datos, optimizando el rendimiento y respetando los límites de la API.

- A. Carga Inicial (Paralelismo)
Se define un array de IDs fijos (HERO_IDS). Se utiliza Promise.all para lanzar 10 peticiones simultáneas. Esto es rápido porque conocemos exactamente qué IDs queremos.

- B. Filtrado por Tipo (Paginación Híbrida)
Esta es la lógica más compleja (loadByType):

Petición Maestra: Se solicita /type/{tipo}. Esto devuelve un JSON ligero con todos los Pokémon de ese tipo (solo nombre y URL).

Filtrado de Seguridad:

La API incluye formas alternas y "glitch" con IDs muy altos.

El código filtra cualquier ID mayor a 1025 (MAX_POKEMON_ID) para asegurar que solo se muestren Pokémon con imágenes válidas.

Almacenamiento: La lista filtrada completa se guarda en typeTotalList.

Fetching por Página:

No se piden los detalles de los 100 Pokémon a la vez.

Se calcula un rango: start = page * 20 y end = start + 20.

Se toman solo esos 20 items y se hace un fetch individual para cada uno para obtener su imagen y tipos.

C. Búsqueda Directa
Valida si el input es un número o texto. Si es un número mayor a 1025, bloquea la petición para evitar errores 404 innecesarios.

## 6. Componentes Visuales
PokemonCard.tsx (Componente Presentacional)
Recibe un objeto PokemonBase y muestra la tarjeta.

Mapeo de Estilos: Utiliza un diccionario TYPE_COLORS para transformar el string del tipo (ej: 'fire') en clases de Tailwind (ej: 'bg-orange-500').

Traducción: Convierte los tipos de inglés a español en tiempo real usando el diccionario TYPE_TRANSLATIONS.

Optimización de Imagen: Usa el atributo loading="lazy" para mejorar el rendimiento del navegador.

PokemonModal.tsx (Lazy Loading)
Muestra los detalles profundos. No se carga hasta que el usuario hace clic.

Doble Petching: Al abrirse, dispara dos peticiones:

/pokemon/{id}: Para altura, peso y habilidades.

/pokemon-species/{id}: Específicamente para buscar la descripción (Flavor Text).

Lógica de Idioma: Itera sobre flavor_text_entries buscando language.name === 'es'. Si no existe, tiene un fallback (texto por defecto).

Limpieza de Texto: Utiliza Regex (.replace(/[\f\n]/g, ' ')) para eliminar caracteres de salto de línea extraños que vienen en la base de datos de Nintendo antigua.
## 7. Sistema de Diseño y CSS (Tailwind)
El diseño es totalmente responsivo y utiliza clases utilitarias para efectos avanzados.

Efectos Clave
Glassmorphism (Efecto Vidrio):
Usado en la cabecera del nombre del Pokémon dentro de la carta.
```
bg-slate-100/80 backdrop-blur-sm
```
Transiciones de Fondo Global:
En App.tsx, el div principal tiene una clase dinámica bg-gradient-to... que cambia suavemente (duration-700) dependiendo del tipo de Pokémon que se esté filtrando (Rojo para fuego, Azul para agua, etc.).

Animaciones de Entrada:

Cartas: animate-in fade-in slide-in-from-bottom-4 (Las cartas entran desde abajo).

Modal: zoom-in-95 (El modal crece ligeramente al aparecer).

## 8. Flujo de Datos (Paso a Paso)
Descripción del ciclo de vida de una interacción de usuario completa: "El usuario busca a Pikachu".

Input: El usuario escribe "Pikachu" en el buscador y presiona Enter.

Handler (handleSearch):

Previene el comportamiento por defecto del formulario.

Establece loading: true.

Cambia view a 'search'.

API Request: Se hace fetch('https://pokeapi.co/api/v2/pokemon/pikachu').

Normalización:

La API responde con un JSON gigante.

La función normalizePokemonData extrae solo: ID (25), Nombre, Imagen y Tipos.

State Update: Se actualiza setPokemons([pikachuData]) y setLoading(false).

Render: React detecta el cambio y pinta una sola PokemonCard en el centro.

Interacción: El usuario hace clic en la carta.

Modal: Se monta PokemonModal, inicia su propio loading, busca la descripción en español y la muestra sobre el fondo oscurecido.

## 9. Ejemplos de Uso y Escenarios
Caso 1: Paginación en Lista de Tipos
Acción: El usuario selecciona "Agua" en el menú desplegable.
Resultado Interno:

Se obtienen 150 nombres de Pokémon de agua.

Se muestran los primeros 20 (Squirtle, Blastoise, Psyduck...).

El botón "Siguiente" se habilita.
Acción: Usuario hace clic en "Siguiente".
Resultado: currentPage pasa de 0 a 1. La App toma los items del 21 al 40 de la lista guardada en memoria y hace fetch de sus imágenes. No se vuelve a consultar la API de tipos.

Caso 2: Manejo de Errores (Búsqueda)
Acción: Usuario busca "Agumon" (Digimon) o el ID "9999".
Lógica:

El fetch retorna un error 404 (Not Found) o el validador de ID detecta > 1025.

El bloque catch captura el error.

Se hace setPokemons([]) (array vacío).
Resultado Visual: Aparece el mensaje: "No encontramos ningún Pokémon con esos datos."

Caso 3: Límite de API (1025)
Contexto: La API contiene Pokémon "beta" o formas especiales con IDs como 10001, 10002, que a menudo rompen la UI por falta de imágenes.
Solución:
En la función loadByType, se ejecuta este filtro crítico:
```
const validPokemons = data.pokemon.filter((p) => {
   // Extraer ID de la URL '.../pokemon/10158/'
   const id = parseInt(parts[parts.length - 2]);
   return id <= 1025; // Solo Pokémon oficiales con número de Pokédex estándar
});
```
Esto garantiza que la grilla nunca muestre cartas rotas o sin imagen.