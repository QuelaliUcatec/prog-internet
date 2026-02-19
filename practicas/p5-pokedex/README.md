# Guía Técnica: Estructura de la PokéDex Digital

Este documento describe de manera general el funcionamiento y la construcción de una aplicación moderna para la consulta de datos de Pokémon. Se detalla la lógica aplicada, el uso de herramientas tecnológicas y la arquitectura del código.

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
Se emplea para controlar la visibilidad de los mensajes de espera mientras se obtienen datos de la red.

**Selección (`selectedPokemon`):**  
Almacena la ficha completa del elemento que ha sido seleccionado para ser mostrado en detalle.

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
Se envía una petición de red a una dirección específica. Una vez que el servidor responde, el paquete de datos se transforma a un formato legible para el programa y se guarda en la memoria interna.

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
Se configuró un desplazamiento vertical para dar la sensación de que el elemento se levanta.

**Profundidad:**  
Se añadió una sombra dinámica para separar visualmente el contenido del fondo de la página.

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
Al activar la vista detallada, se aplica un filtro de desenfoque y se reduce el brillo al resto de la aplicación. Además, se bloquean las interacciones con el fondo para asegurar que el usuario se concentre únicamente en la información desplegada.

---

## Conclusión

El proyecto integra lógica de programación con diseño visual para resolver el problema de la consulta y presentación de datos complejos. El resultado es un sistema dinámico capaz de gestionar información externa y presentarla de manera organizada y estética.
