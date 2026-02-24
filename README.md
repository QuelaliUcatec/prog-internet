
# Guía Técnica: Estructura del Observador de la NASA

## Herramientas y Tecnologías Utilizadas

Para el desarrollo de este proyecto se emplearon las siguientes herramientas:

- **React**: Biblioteca principal utilizada para construir la interfaz de usuario mediante componentes interactivos y gestión de estados de memoria.
- **Vite**: Entorno de desarrollo y herramienta de construcción elegida por su velocidad extrema en la compilación del código.
- **JavaScript (ES6+)**: Lenguaje base utilizado para la lógica asíncrona, manipulación de datos y conexión con servidores externos.
- **Variables de Entorno (.env)**: Sistema de seguridad para proteger credenciales sensibles (como la API Key de la NASA) y evitar que se expongan en el código público.

---

## Conexión de Datos en Tiempo Real (Método GET)

La aplicación no almacena imágenes estáticas. En su lugar, se conecta directamente a los servidores de la NASA para obtener registros astronómicos actualizados mediante peticiones de lectura (**GET**).

### Implementación en JavaScript

```javascript
const fetchNasaData = async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=12`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("🚨 Error GET NASA:", error);
    return []; 
  }
};
```

**Lógica aplicada:**  
Se envía una petición asíncrona (`fetch`) al servidor de la NASA. El programa espera la respuesta (`await`), valida que la conexión haya sido exitosa (`response.ok`) y finalmente transforma los datos recibidos a un formato legible (`JSON`) para que la interfaz pueda dibujarlos en pantalla.

---

## Guardado de Registros en Base de Datos (Método POST)

Para permitir que el usuario guarde sus descubrimientos favoritos, se implementó un sistema de escritura remota. Al no poder modificar la base de datos de la NASA, se simula el envío a un servidor propio utilizando el método **POST**.

### Implementación en JavaScript

```javascript
const saveFavoritePost = async (nasaItem) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nasaItem),
  });
  return await response.json();
};
```

**Lógica aplicada:**  
A diferencia del GET, aquí se especifica el método `POST`. Se empaqueta la información de la imagen seleccionada y se convierte en una cadena de texto (`JSON.stringify`) que viaja dentro del **body** de la petición hacia el servidor destino.

---

## Traducción Dinámica de Datos

Dado que los informes científicos de la NASA están en inglés, se integró un microservicio de traducción automática en segundo plano para eliminar la barrera del idioma sin interrumpir la experiencia visual.

### Implementación en JavaScript

```javascript
const translateText = async (text) => {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`;
  const response = await fetch(url);
  const data = await response.json();
  return data.responseData.translatedText;
};
```

**Lógica aplicada:**  
Cuando el usuario abre un registro, el programa toma el texto original en inglés, lo codifica para que viaje seguro por internet (`encodeURIComponent`) y solicita su equivalente en español a una API de traducción, inyectando el resultado directamente en la pantalla.

---

## Gestión de la Memoria Interna (Estados de React)

Para que la interfaz reaccione al instante a los clics del usuario sin necesidad de recargar la página, se utilizó el sistema de estados de **React**.

### Implementación en JavaScript

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedItem, setSelectedItem] = useState(null);
```

- **Estado de carga (`loading`)**: Controla la visibilidad de los mensajes e indicadores espaciales mientras se descargan las imágenes.
- **Selección (`selectedItem`)**: Almacena el registro estelar específico al que el usuario hizo clic, activando la ventana flotante de detalles.

---

## Diseño Estelar y Reacción de la Interfaz (CSS)

Para lograr una inmersión temática (simulando una terminal espacial), se diseñó un fondo interactivo y tarjetas que reaccionan de forma fluida al movimiento del cursor.

### Implementación en CSS

```css
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.3);
  border-color: #00d2ff;
}
```

**Elevación y Resplandor:**  
Al pasar el ratón, la tarjeta se eleva sutilmente (`translateY`) y emite un brillo de neón azul (`box-shadow`), indicando que el elemento es interactivo y simulando tecnología holográfica.

---

## Sistema de Enfoque Visual (Modal y Blur)

Para leer cómodamente los densos textos astronómicos, se creó una ventana flotante (**Modal**) que oscurece y desenfoca el resto de la galería.

### Implementación en CSS

```css
.modal-overlay {
  position: fixed;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(5px);
  z-index: 1000;
}
```

**Lógica aplicada:**  
Al abrir un detalle, se despliega una capa oscura casi opaca que cubre toda la pantalla (`position: fixed`). La propiedad `backdrop-filter: blur(5px)` desenfoca sutilmente las estrellas y tarjetas de fondo, centrando toda la atención del usuario en la información científica traducida.

---

**Resultado Final:**  
Una aplicación dinámica, reactiva y temática que combina consumo de APIs en tiempo real, persistencia simulada de datos.
