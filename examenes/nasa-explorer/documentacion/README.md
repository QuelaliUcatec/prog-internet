# 🚀 DOCUMENTACIÓN COMPLETA: OBSERVATORIO NASA

## 1. Arquitectura y Conexión de la API
El proyecto utiliza un flujo de datos asíncrono para conectar el cliente (tu App) con los servidores de la NASA.

### ¿Cómo conectamos la API?
Originalmente intentamos usar el endpoint APOD (Astronomy Picture of the Day), pero debido a restricciones de seguridad y problemas con las llaves, migramos a la NASA Image & Video Library API.

- **Endpoint**: `https://images-api.nasa.gov/search`
- **Método**: GET
- **Lógica de Conexión**: Implementamos una función asíncrona que utiliza el comando `fetch`. A diferencia de una conexión simple, procesamos la respuesta para limpiar el JSON complejo de la NASA y convertirlo en un array de objetos sencillo para React.

---

## 2. Partes Fundamentales del Código

### A. El "Cerebro" (Manejo de Estados)
Utilizamos `useState` para controlar cuatro pilares de la aplicación:
- **data**: Almacena los hallazgos cósmicos.
- **loading**: Controla el estado visual mientras los datos viajan desde el espacio.
- **query**: Captura lo que el usuario desea buscar (Mars, Nebula, etc.).
- **telemetry**: Genera datos técnicos aleatorios para la inmersión.

### B. El Componente `Card.jsx`
Es la unidad visual de la galería. Su código es fundamental porque:
- Recibe el objeto `item` como prop.
- Utiliza `clip-path` en CSS para crear las esquinas angulares estilo "militar/espacial".
- Renderiza la metadata (fecha y origen) con fuentes monoespaciadas.

---

## 3. Mejoras Implementadas (Upgrade del Sistema)
Pasamos de una galería simple a una Terminal de Comando:

### - Barra de Telemetría:
Añadimos un panel superior que muestra coordenadas (COORD) y sectores (SECTOR) que cambian dinámicamente.

### - Efecto de Escaneo Láser:
Mediante pseudo-elementos (`::after`) en CSS, creamos una línea de escaneo que recorre las imágenes al pasar el mouse.

### - Brillo Neón (Glow):
Aplicamos filtros de sombra y resplandor al título "OBSERVATORIO NASA" para que parezca una pantalla de alta tecnología.

### - Filtros de Vidrio (Glassmorphism):
El buscador y el header utilizan `backdrop-filter: blur()` para dar profundidad sobre el fondo de estrellas.

---

## 4. Gestión de Errores y Soluciones (Debugging)
Durante el desarrollo, enfrentamos retos técnicos que resolvimos paso a paso:

| **Error Encontrado**       | **Causa**                                        | **Solución Aplicada**                                                                                   |
|----------------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Pantalla Negra**          | Fallo en la API Key o colapso de contenedores CSS. | Se implementó un `min-height` y un sistema de "Galaxia de Prueba" como respaldo (catch) en el código.    |
| **Imágenes No Cargaban**    | Ruta de importación incorrecta en los componentes. | Se corrigieron las rutas de `./components/Card` asegurando que las mayúsculas coincidieran con los archivos.  |
| **API Key Inválida**        | Problemas de autenticación con la NASA.            | Se cambió al buscador público de imágenes, más estable y que permite búsquedas libres por palabras clave. |
| **Parpadeo de Datos**       | Los números aleatorios cambiaban cada vez que el usuario escribía. | La lógica de aleatoriedad se movió a un estado que solo se actualiza al presionar "EXPLORAR".             |

### Detalles:
- **Pantalla Negra**: Añadimos un sistema de fallback para evitar fallos en la visualización si la API o los contenedores CSS no se cargan correctamente.
- **Imágenes No Cargaban**: Se aseguraron las rutas correctas y se revisaron las mayúsculas para que las importaciones no fallaran.
- **API Key Inválida**: En lugar de intentar acceder con una clave que fallaba, se usó una alternativa pública, accesible y estable.
- **Parpadeo de Datos**: Se optimizó la lógica para mantener la estabilidad en la interfaz, evitando cambios inesperados en la UI mientras el usuario interactúa.

---

## 5. Instrucciones de Despegue (Instalación)

### 1. Instalar dependencias:
```bash
npm install
3. Puerto de escucha:

Por defecto en http://localhost:5173
