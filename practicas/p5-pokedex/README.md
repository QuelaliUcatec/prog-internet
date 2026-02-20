# Guía Técnica: Estructura de la PokéDex Digital

## Herramientas y Tecnologías Utilizadas

Para el desarrollo de este proyecto se empleó las siguientes herramientas:

- **[React](https://react.dev/):** Biblioteca principal utilizada para construir la interfaz de usuario mediante componentes reutilizables y gestión de estados.
- **[Vite](https://vitejs.dev/):** Entorno de desarrollo y herramienta de construcción (bundler) elegida por su velocidad y eficiencia en la compilación del código.
- **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript que añade tipado estático, permitiendo la detección temprana de errores y una estructura más robusta.
- **[npm (Node Package Manager)](https://nodejs.org/):** Gestor de paquetes utilizado para descargar, instalar y administrar las dependencias del proyecto.

---

## 1. Traducción Automática de Datos

Debido a que las bases de datos internacionales entregan la información en inglés por defecto, se implementó un sistema de traducción para mejorar la experiencia del usuario.

### Implementación en JavaScript

```javascript
const typeTranslations = {
  fire: 'Fuego', 
  water: 'Agua', 
  grass: 'Planta'
};
```

**Lógica aplicada:**  
Se definió un objeto que actúa como puente lingüístico. Cuando el sistema recibe un término técnico del servidor, se realiza una búsqueda en este diccionario y se muestra en pantalla el equivalente en el idioma destino.

---

## 2. Gestión de la Memoria Interna (Estados)

Para que la interfaz responda en tiempo real a las acciones del usuario, se utilizó la gestión de estados. Estos funcionan como un registro temporal donde el programa anota qué ocurre en cada momento.

### Implementación en JavaScript

```javascript
const [loading, setLoading] = useState(false);
const [selectedPokemon, setSelectedPokemon] = useState(null);
```

**Estado de carga (`loading`):**  
Controla la visibilidad de los mensajes de espera mientras se obtienen datos de la red.

**Selección (`selectedPokemon`):**  
Almacena la ficha completa del elemento que ha sido seleccionado para mostrarse en detalle.

---

## 3. Consulta de Datos en Tiempo Real (Fetch)

La aplicación no almacena la información de manera estática. En su lugar, se configuró un sistema de peticiones dinámicas a una biblioteca digital externa conocida como PokeAPI.

### Implementación en JavaScript

```javascript
fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
  .then(res => res.json())
  .then(pokemon => {
     setSelectedPokemon(pokemon);
  });
```

**Lógica aplicada:**  
Se envía una petición de red a una dirección específica. Una vez que el servidor responde, los datos se transforman a un formato legible y se almacenan en la memoria interna.

---

## 4. Diseño y Reacción de la Interfaz (CSS)

Para lograr una navegación fluida, se aplicaron reglas de diseño que permiten que los elementos reaccionen visualmente al movimiento del cursor.

### Implementación en CSS

```css
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}
```

**Elevación:**  
Desplazamiento vertical para simular que el elemento se levanta.

**Profundidad:**  
Sombra dinámica que separa visualmente el contenido del fondo.

---

## 5. Sistema de Enfoque Visual (Blur)

Para evitar distracciones cuando se consulta una ficha técnica, se diseñó un sistema de enfoque que resalta el contenido principal.

### Implementación en CSS

```css
.content-area.blurred {
  filter: blur(8px) brightness(0.7);
  pointer-events: none; 
}
```

**Lógica aplicada:**  
Al activar la vista detallada, se aplica un filtro de desenfoque y reducción de brillo al resto de la aplicación. Además, se bloquean las interacciones con el fondo para garantizar la concentración del usuario en la información desplegada.

---

## 6. Sistema de Paginación Dinámica

Para evitar la sobrecarga de memoria en el navegador al consultar categorías con un alto volumen de registros, se implementó un sistema de paginación que fracciona los resultados.

### Implementación en JavaScript

```javascript
const start = (page - 1) * itemsPerPage;
const end = start + itemsPerPage;
const slice = urls.slice(start, end);
```

**Lógica aplicada:**  
Se utiliza una fórmula matemática para extraer un bloque específico de datos (por ejemplo, 20 elementos) a partir de la lista total. El sistema monitorea la página actual y desactiva los controles de navegación si el usuario alcanza el límite inicial o final, garantizando una interacción estable y libre de errores.

---

## Conclusión

El proyecto integra lógica de programación con diseño visual para resolver el problema de la consulta y presentación de datos complejos. El resultado es un sistema dinámico capaz de gestionar información externa, modular grandes volúmenes de datos mediante paginación y presentarlos de manera organizada y estética.