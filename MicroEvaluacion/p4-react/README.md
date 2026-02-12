# Guía para emplear JavaScript, HTML y programar una página web

---

# Parte I: Configuración del Entorno y Creación del Proyecto

## 1. Preparación del Entorno (Node.js y NVM)

Para ejecutar herramientas de JavaScript, es necesario tener instalado un gestor de versiones (NVM) y el entorno de ejecución (Node.js).

**Instalación y activación de la última versión estable:** En la terminal, se ejecutan los siguientes comandos para descargar y utilizar la versión LTS (Long Term Support) de Node.js:

```bash
nvm install lts
nvm use lts
```

## 2. Creación del Proyecto (Vite + React + TypeScript)

Vite es la herramienta de construcción que permite iniciar el proyecto de manera rápida.

**Generar la estructura del proyecto:** Se ejecuta el siguiente comando para crear la carpeta y los archivos base:

```bash
npm create vite@latest mi-proyecto
```

Durante la configuración, se debe seleccionar React como framework.

Luego, se debe seleccionar TypeScript como variante.

**Instalación de dependencias:** Una vez creada la carpeta, es necesario ingresar a ella e instalar las librerías base:

```bash
cd mi-proyecto
npm install
```

## 3. Integración de Tailwind CSS

Para añadir el framework de estilos, se deben instalar sus paquetes y configurar los archivos de inicio.

**Instalación de paquetes de desarrollo:**

```bash
npm install -D tailwindcss postcss autoprefixer
```

**Inicialización de la configuración:** Este comando genera los archivos `tailwind.config.js` y `postcss.config.js`:

```bash
npx tailwindcss init -p
```

**Configuración de rutas de contenido:** Se debe abrir el archivo `tailwind.config.js` y reemplazar la propiedad `content` con lo siguiente para que Tailwind reconozca los archivos del proyecto:

```javascript
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

**Inyección de directivas CSS:** En el archivo `src/index.css`, se debe borrar el contenido existente y agregar estas tres líneas al principio:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 4. Ejecución del Entorno de Desarrollo

Con todo configurado, el proyecto está listo para ser visualizado en el navegador.

**Iniciar el servidor local:**

```bash
npm run dev
```

Esto habilitará una dirección local (generalmente `http://localhost:5173/`) donde se podrá ver la aplicación en funcionamiento.

---

# Parte II: Lógica de Programación de la Calculadora

## 1. Gestión del Estado (useState)

```javascript
const [pantalla, setPantalla] = useState("");
```

Usamos un Hook de React. pantalla almacena la expresión matemática actual (string) y setPantalla es el disparador que actualiza el DOM cada vez que hay un cambio. Sin esto, la UI no reaccionaría a los clicks.

## 2. Función Flecha (Arrow Function)

```javascript
const clickBoton = (valor) => { ... }
```

Sintaxis ES6. Es más limpia que declarar function clickBoton(). Recibe el argumento valor directamente del onClick de cada botón. Al ser una constante, aseguramos que la referencia a la función no sea reasignada.

## 3. El Motor de Cálculo (eval)

```javascript
if (valor === "=") {
  setPantalla(eval(pantalla).toString());
}
```

Aquí está el core. eval() toma el string del estado (ej: "2+2*5") y lo parsea como código JavaScript ejecutable.

Importante: eval devuelve un Number.

`.toString()`: Es obligatorio convertirlo de vuelta a String porque nuestro estado pantalla espera texto (para poder seguir concatenando operaciones después).

## 4. Manejo de Excepciones (try...catch)

```javascript
try {
  // Ejecuta eval()
} catch (e) {
  setPantalla("Error");
}
```

Javascript lanzará una excepción si eval() intenta procesar algo inválido (como 5++*9).

Sin esto: La aplicación crashearía (pantalla blanca) por un error de sintaxis no controlado.

Con esto: Capturamos el error y actualizamos el estado visual a "Error", manteniendo la app viva.

## 5. Concatenación y Limpieza

```javascript
} else if (valor === "C") {
  setPantalla(""); // Reinicia el estado a string vacío
} else {
  setPantalla(pantalla + valor); // Acumula el input
}
```

Si no es = ni C, asumimos que es un input válido. Simplemente tomamos el estado actual (pantalla) y le concatenamos el nuevo carácter. React detecta este cambio de estado y re-renderiza el input con el nuevo valor.

---

# Parte III: Fundamentos de JSX y Modularidad en React

## 1. Sintaxis JSX y className

```javascript
<div className="bg-[#1e293b] ...">
```

Aunque la estructura visual parece HTML, técnicamente es JSX (JavaScript XML). Esto implica dos diferencias clave respecto al HTML tradicional:

**Atributo className:** En JavaScript, la palabra `class` es reservada (se usa para definir clases de programación). Por ello, en React se utiliza `className` para asignar estilos CSS.

**Expresiones Dinámicas:** JSX permite insertar lógica de JavaScript directamente en el diseño visual utilizando llaves `{ }`. Por ejemplo, `{pantalla}` no muestra el texto "pantalla", sino el valor variable que contiene en ese momento.

## 2. Control de Ejecución en Eventos (onClick)

```javascript
onClick={() => clickBoton("7")}
```

Para pasar argumentos a una función dentro de un evento, es necesario envolver la llamada en una función flecha anónima `() =>`.

**Ejecución Inmediata vs. Diferida:** Si se escribiera `onClick={clickBoton("7")}`, la función se ejecutaría automáticamente al cargar la página, creando un bucle infinito de renderizado.

**La Solución:** Al usar la sintaxis `() =>`, se le indica a React que debe esperar a que ocurra el evento del clic para recién ejecutar la función con el valor "7".

## 3. Modularidad y Exportación

```javascript
export default Calculadora;
```

Esta línea final convierte la función Calculadora en un módulo reutilizable.

**Encapsulamiento:** Permite que este archivo contenga toda la lógica y diseño de la calculadora de forma aislada.

**Reutilización:** Gracias a esta instrucción, otros archivos principales de la aplicación (como App.jsx o main.jsx) pueden importar este componente mediante `import Calculadora` y renderizarlo en la interfaz de usuario. Sin esto, el componente sería invisible para el resto del proyecto.
