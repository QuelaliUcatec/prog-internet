# Documentación del Proyecto Calculadora

Este documento explica el funcionamiento principal de la aplicación `App.tsx` y algunos conceptos clave utilizados en el desarrollo.

## ¿Qué hace `App.tsx`?

`App.tsx` es el componente principal de nuestra aplicación de calculadora construida con React. Su función es renderizar la interfaz de usuario (la pantalla y los botones) y gestionar la lógica de las operaciones matemáticas.

El componente maneja el "estado" de la aplicación, que incluye:
- **`pantalla`**: Muestra el número actual que el usuario está escribiendo o el resultado.
- **`memoria`**: Almacena el primer número ingresado cuando se selecciona una operación (como sumar o restar).
- **`operacion`**: Guarda qué operación matemática se va a realizar (+, -, *, /).
- **`esperandoSegundoNumero`**: Una bandera (true/false) que indica si el próximo número que presione el usuario debe empezar uno nuevo en la pantalla (como después de elegir una operación).

## Explicación del comando `.map`

En el código, verás algo como esto:

```javascript
{[7, 8, 9, '*'].map((val) => ( ... ))}
```

El método **`.map()`** es una función de JavaScript que se usa en arreglos (arrays). Su propósito es "transformar" cada elemento de una lista en otra cosa.

En este caso, lo usamos para **generar botones automáticamente** en lugar de escribir `<button>...</button>` cuatro veces seguidas.

- **Entrada:** Una lista de valores: `[7, 8, 9, '*']`.
- **Proceso:** Por cada valor (`val`), React crea (retorna) un elemento `<button>`.
- **Salida:** Una lista de botones renderizados en la pantalla con esos valores.

Es una forma eficiente y limpia de crear elementos repetitivos en la interfaz.

## Explicación de la Lógica Condicional

El código contiene la siguiente línea dentro del `.map()`:

```javascript
val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)
```

(Nota: En el código real usamos `typeof val === 'number'`, pero el concepto es el mismo).

Esto es un **Operador Ternario**. Es una forma corta de escribir un `if-else`. Se lee así:

1.  **Condición:** `¿Es el valor un número?` (`typeof val === 'number'`)
2.  **Si es VERDADERO (?):** Ejecuta `agregarNumero(String(val))`. Esto significa que si el botón es 7, 8 o 9, lo agrega a la pantalla.
3.  **Si es FALSO (:):** Ejecuta `prepararOperacion(val)`. Esto significa que si el valor NO es un número (por ejemplo, es un '*'), entonces prepara la calculadora para multiplicar.

En resumen: "Si tocaste un número, agrégalo a la pantalla; si no, asume que es una operación y prepárala".

## ¿Qué son NPM y Vite?

### NPM (Node Package Manager)
**NPM** es el gestor de paquetes de Node.js. Imagínalo como una "tienda de aplicaciones" o una biblioteca gigante para código de programación.
- Nos permite instalar librerías creadas por otros (como React) para no tener que escribir todo desde cero.
- Gestiona las dependencias de nuestro proyecto (guarda qué versiones de cada librería estamos usando en `package.json`).
- Nos permite ejecutar scripts, como iniciar el servidor de desarrollo (`npm run dev`).

### Vite
**Vite** (palabra francesa para "rápido") es una herramienta de construcción (build tool) moderna para el desarrollo web.
- **Servidor de Desarrollo Veloz:** Inicia tu proyecto casi instantáneamente.
- **Recarga Rápida (HMR):** Cuando guardas un cambio en tu código, Vite actualiza la página web al instante sin recargarla toda, manteniendo el estado de tu aplicación.
- **Optimización:** Prepara tu código para producción de manera muy eficiente.
- Es el entorno que usamos para crear y correr este proyecto de React.
