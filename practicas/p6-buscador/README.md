# Guía Técnica: Estructura del Buscador Zēteō (ζητέω)

## Herramientas, Tecnologías y Origen de Datos

Para el desarrollo de este portal de búsqueda monumental se emplearon las siguientes herramientas y servicios:

- **[DuckDuckGo Autocomplete API](https://duckduckgo.com/):** Motor principal de la aplicación. Se utiliza su endpoint público de autocompletado (`/ac/?q=`) para obtener predicciones de búsqueda en tiempo real basadas en la entrada del usuario.
- **[React](https://react.dev/):** Biblioteca utilizada para construir la interfaz de usuario y gestionar el ciclo de vida del buscador.
- **[Vite](https://vitejs.dev/):** Entorno de desarrollo y herramienta de construcción elegida por su velocidad de compilación.
- **[JavaScript (ES6+)](https://developer.mozilla.org/es/docs/Web/JavaScript):** Lenguaje base estructurado con promesas y funciones asíncronas para el manejo de datos de red.
- **[npm (Node Package Manager)](https://nodejs.org/):** Gestor de paquetes utilizado para administrar las dependencias del entorno local.

---

## 1. Integración del Motor DuckDuckGo y Evasión CORS

El núcleo funcional de Zēteō se alimenta de las sugerencias directas de DuckDuckGo. Sin embargo, al consultar su base de datos (`https://duckduckgo.com/ac/`) desde un entorno local, el navegador bloquea la petición por políticas CORS. Para resolverlo, se implementó un puente de red (proxy).

### Implementación en JavaScript

```javascript
const targetUrl = encodeURIComponent(`https://duckduckgo.com/ac/?q=${query}`);
const res = await fetch(`https://api.allorigins.win/get?url=${targetUrl}`);
const data = await res.json();
const parsed = JSON.parse(data.contents);
```

**Lógica aplicada:**  
La consulta original se envía a través de un servidor proxy gratuito (AllOrigins). Este intermediario realiza la petición oficial, recibe los datos predictivos y los devuelve a nuestra aplicación evitando la restricción CORS. Finalmente, el texto plano se transforma nuevamente en un arreglo JSON manejable.

---

## 2. Gestión de la Memoria Interna (Estados)

Para que el buscador responda a cada pulsación de tecla y muestre los resultados dinámicamente, se controló el flujo de datos mediante gestión de estados.

### Implementación en JavaScript

```javascript
const [query, setQuery] = useState('');
const [suggestions, setSuggestions] = useState([]);
```

**Consulta actual (`query`):**  
Almacena lo que el usuario escribe en tiempo real.

**Sugerencias (`suggestions`):**  
Guarda el arreglo de palabras clave devuelto por la API para desplegar el autocompletado visual.

---

## 3. Optimización de Peticiones en Tiempo Real (Debounce)

Para evitar saturar el proxy o los servidores de DuckDuckGo con una petición por cada letra, se implementó una pausa estratégica.

### Implementación en JavaScript

```javascript
const timer = setTimeout(fetchSuggestions, 50);
return () => clearTimeout(timer);
```

**Lógica aplicada (Debounce):**  
El sistema retrasa la ejecución unos milisegundos. Si el usuario continúa escribiendo, el temporizador anterior se cancela y se crea uno nuevo. La petición solo se ejecuta cuando el usuario hace una micro-pausa, optimizando el rendimiento y reduciendo el consumo de red.

---

## 4. Diseño Arquitectónico y Efecto Cristal (CSS)

Se adoptó una estética inspirada en piedra tallada, oro y cristal esmerilado, evocando una arquitectura clásica.

### Implementación en CSS

```css
.search-box {
  background: linear-gradient(180deg, rgba(15, 20, 30, 0.4) 0%, rgba(5, 8, 12, 0.8) 100%);
  border-bottom: 2px solid #E5A93C;
  backdrop-filter: blur(12px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
}
```

**Efecto de Cristal (Glassmorphism):**  
La propiedad `backdrop-filter: blur()` desenfoca el fondo dinámicamente, creando un efecto de vidrio oscuro. Los bordes dorados refuerzan la estructura visual.

---

## 5. Sistema de Redirección Final

El objetivo del motor predictivo es llevar al usuario a los resultados reales del buscador.

### Implementación en JavaScript

```javascript
const executeSearch = (searchTerm) => {
  if (searchTerm.trim()) {
    window.open(`https://duckduckgo.com/?q=${encodeURIComponent(searchTerm)}`, '_blank');
  }
};
```

**Lógica aplicada:**  
Cuando el usuario presiona "Enter" o selecciona una sugerencia, la función sanitiza la entrada y abre una nueva pestaña ejecutando la búsqueda directamente en DuckDuckGo.

---

## 6. Limitaciones del Sistema y Latencia de Red

Durante el uso del buscador Zēteō puede experimentarse una ligera latencia en la carga de sugerencias. Esto no es un error de código, sino una limitación estructural:

### Cuello de botella en el Proxy (AllOrigins)

Al depender de un servicio público y gratuito como intermediario, las peticiones pueden congestionarse, generando retrasos.

### Endpoint no documentado

El endpoint `/ac/?q=` es utilizado internamente por DuckDuckGo y no está diseñado como API pública oficial para alto tráfico externo. Posee protecciones anti-spam (Rate Limiting).

### Sacrificio del Debounce

Se agregan 50 milisegundos de espera por pulsación para mantener estabilidad y evitar bloqueos por exceso de peticiones.

---

## Conclusión y Visión a Futuro

En el proyecto Zēteō se empleo el uso:

- Manejo de flujos asíncronos.
- Integración de APIs externas.
- Diseño de interfaces inmersivas.

Sin embargo, representa solo la primera fase de una arquitectura mayor.

### Hoja de Ruta de  Posibles Mejoras


- **Historial Local (Caché):** Implementar `localStorage` para recordar consultas recientes.
- **Temas Dinámicos (Día/Noche):** Implementar modo claro/oscuro según la hora del sistema.
