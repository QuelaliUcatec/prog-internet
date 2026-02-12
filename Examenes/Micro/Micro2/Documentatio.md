# Práctica 4: Calculadora Web

## 1. Descripción del Proyecto
Este proyecto consiste en una aplicación web de una calculadora funcional desarrollada como parte de la materia de Programación Internet.

## 2. Tecnologías y Herramientas Usadas
Para el desarrollo de esta práctica se utilizaron las siguientes versiones de frameworks y librerías, enfocadas en un entorno de desarrollo rápido y eficiente:

* **Entorno de Ejecución:** Node.js (Requerido para instalar las librerías).
* **Librería Principal:** React `v19.2.0` (Para crear la interfaz de usuario).
* **Lenguaje:** TypeScript `v5.9.3` (JavaScript con tipos para evitar errores).
* **Empaquetador:** Vite `v7.3.1` (Herramienta para ejecutar el proyecto rápidamente).
* **Estilos:** Tailwind CSS `v4.1.18` (Framework de CSS para diseño rápido).
### 2.1 Instalación y Configuración de Tailwind CSS (v4)

Para los estilos del proyecto, se integró la versión 4 de Tailwind CSS. A continuación, se detallan los comandos y configuraciones realizadas:

**1. Instalación de dependencias**
Se ejecutó el siguiente comando en la terminal para instalar el paquete principal y el plugin necesario para Vite:

npm install tailwindcss @tailwindcss/vite

## 3. Preparación del Entorno

Si deseas ejecutar este proyecto en tu computadora, sigue estos pasos sencillos:

### Paso 1: Instalar Node.js
Es necesario tener instalado **Node.js** en tu sistema.
1.  Descarga la versión "LTS" desde [nodejs.org](https://nodejs.org/).
2.  Instálalo siguiendo las instrucciones del asistente.
3.  Verifica que funciona abriendo una terminal y escribiendo: `node -v`.

### Paso 2: Descargar e Instalar Dependencias
Una vez que tengas la carpeta del proyecto en tu computadora:

1.  Abre la terminal dentro de la carpeta del proyecto (`P4-Calculadora`).
2.  Ejecuta el siguiente comando para descargar todas las librerías necesarias (las que están en el `package.json`):
    ```bash
    npm install
    ```
    *(Esto creará la carpeta `node_modules` automáticamente).*

### Paso 3: Ejecutar el Proyecto
Para ver la calculadora funcionando en tu navegador:

1.  En la misma terminal, escribe:
    ```bash
    npm run dev
    ```
2.  Aparecerá un link local (generalmente `http://localhost:5173/`). Ábrelo en tu navegador.

---

## 4. Estructura de Carpetas

A continuación se explica brevemente para qué sirve cada archivo y carpeta importante del proyecto:

*  **`src/`**: Es la carpeta más importante ("Source"). Aquí está todo el código fuente que escribimos (la lógica de la calculadora y los componentes de React).
*  **`public/`**: Contiene archivos públicos que no cambian, como imágenes estáticas o el icono de la pestaña del navegador.
*  **`node_modules/`**: Aquí se guardan todas las librerías que descargamos con `npm install`. **Nota:** Esta carpeta no se toca manualmente.
*  **`index.html`**: Es el archivo base de la página web. Aquí es donde React "monta" o dibuja la aplicación.
*  **`package.json`**: Es como el DNI del proyecto. Contiene el nombre, la versión y la lista de "dependencias" (librerías) que necesita el proyecto para funcionar.
*  **`vite.config.ts`**: Archivo de configuración de Vite. Aquí se configuran los plugins, como el soporte para React y Tailwind CSS.
*  **`tsconfig.json`**: Configuración de TypeScript. Define las reglas para que el código sea seguro y estricto.

## 5. Scripts Disponibles

En el archivo `package.json` se definieron los siguientes comandos útiles:

* `npm run dev`: Inicia el servidor de desarrollo (para trabajar).
* `npm run build`: Compila el proyecto para subirlo a producción.
* `npm run lint`: Busca errores de escritura en el código.



Como funciona la logica de este proyecto?


#  Así construí mi Calculadora: Estructura y Métodos

Para desarrollar esta aplicación, me enfoqué en dos pilares principales: **React** para manejar la lógica y la memoria, y **Tailwind CSS** para crear una interfaz moderna y responsiva.

A continuación, detallo los métodos y estrategias que utilicé:

## 1. Gestión de la Memoria (El Estado)

Lo primero que hice fue definir "dónde guarda la información" la calculadora. Para esto, utilicé el hook `useState` de React, creando cuatro espacios de memoria esenciales:

* **`currentDisplay`:** Es la variable que controla lo que el usuario ve en la pantalla grande.
* **`previousVal`:** Funciona como una memoria temporal para guardar el primer número cuando el usuario va a realizar una operación (ej. guarda el "10" mientras escribes el siguiente número).
* **`operation`:** Aquí almaceno qué operación matemática (`+`, `-`, `*`, `/`) está pendiente de ejecutarse.
* **`overwrite`:** Implementé esta "bandera" lógica (verdadero/falso) para saber cuándo el sistema debe borrar la pantalla automáticamente antes de escribir un nuevo dígito (por ejemplo, justo después de presionar un operador).

## 2. El Motor Matemático

Para mantener el código ordenado, separé la lógica de cálculo de la interfaz visual creando un método específico:

* **Método `calculateResult`:**
    * Su única función es tomar los dos números guardados en memoria, convertirlos de texto a números reales y aplicar la operación matemática correspondiente.
    * Incluí una validación de seguridad: si el usuario intenta dividir por cero, el sistema devuelve "Error" en lugar de fallar.

## 3. Métodos de Interacción (Controladores)

Diseñé tres funciones principales para manejar lo que sucede cuando el usuario toca los botones:

* **Manejo de Números (`handleNumber`):**
    * Este método verifica si debe agregar el número al final de la cifra actual o si debe reemplazarla por completo (usando la bandera `overwrite`).
    * También evita errores comunes, como escribir múltiples puntos decimales en un mismo número.

* **Manejo de Operaciones (`handleOperation`):**
    * Este es el "cerebro" del flujo. Cuando se presiona un operador (+, -), este método mueve el número actual a la memoria de reserva (`previousVal`) y prepara la pantalla para recibir la siguiente cifra.

* **Ejecución (`handleEquals`):**
    * Es el método que finaliza el proceso. Llama al motor matemático, muestra el resultado final y limpia la memoria de operaciones para dejar la calculadora lista para una nueva cuenta.

## 4. Diseño y Arquitectura Visual

Para la interfaz, no quise repetir código, así que utilicé una arquitectura basada en componentes reutilizables:

* **Componente `Button`:**
    * En lugar de escribir el código de 20 botones distintos, creé un solo "molde" de botón inteligente.
    * Este componente acepta una "variante" (color), lo que me permite diferenciar visualmente los números (gris), de los operadores (naranja) y las acciones especiales (verde/gris claro) de forma automática.

* **Sistema de Rejilla (Grid):**
    * Utilicé `CSS Grid` (a través de Tailwind) para alinear los botones perfectamente.
    * Aproveché las propiedades `col-span` y `row-span` para que el botón "0" y el botón "=" ocuparan más espacio, imitando la ergonomía de una calculadora física real.

---

**Conclusión:**
Con esta estructura, logré una calculadora que no solo realiza operaciones matemáticas precisas, sino que también gestiona errores y ofrece una experiencia de usuario fluida y visualmente atractiva.