# 1- React
#  Conceptos Básicos de JavaScript

## 2- `.map()`

**Definición:**\
Método de los arrays que recorre cada elemento y devuelve un **nuevo
arreglo transformado**.

**Sintaxis:**

``` js
array.map((elemento) => nuevoValor)
```

**Ejemplo:**

``` js
const numeros = [1, 2, 3];
const dobles = numeros.map(n => n * 2);
// [2, 4, 6]
```

------------------------------------------------------------------------

##  3- Arrow Function (Función Flecha)

**Definición:**\
Forma moderna y más corta de escribir funciones en JavaScript.

**Sintaxis:**

``` js
(parametros) => resultado
```

**Ejemplo:**

``` js
const sumar = (a, b) => a + b;
```

 No tiene su propio `this`, lo hereda del contexto.

------------------------------------------------------------------------

##  4- Operador Ternario

**Definición:**\
Forma abreviada de un `if-else`. Devuelve un valor según una condición.

**Sintaxis:**

``` js
condición ? valor_si_true : valor_si_false
```

**Ejemplo:**

``` js
let mensaje = edad >= 18 ? "Mayor" : "Menor";
```

## 5. NVM (Node Version Manager):

Para simplifarlo es un **"Gestor De versiones"**. Imaginemos que es como una caja, pero para guardar versiones de Node.js (el entorno para ejecutar JavaScript fuera del navegador) que nos permite tener instaladas varias versiones en nuestras computadoras al mismo tiempo (la versión antigua para un proyecto viejo y la nueva para uno moderno) y cambiar entre ellas fácilmente. Un ejemplo clarisimo seria que en clase usamos macOs y en nuestras casas Windows, por lo cual esta herramienta nos permitiria cambiar de versiones a gusto sin tener que estar reinstalando versiones de node.js. 

### ¿Dónde NO se usa?

como cualquier cosa en nuestra profesion, algo no  simpre es para todas las ocasiones; generalmente no empleariamos en producción (ejemplo un servidor final donde este una web), ya que para eso  instalaria una versión fija y estable; no se necesita estar cambiando.

---

## 6. TRY:

Significa "Intentar". Es un bloque de seguridad. Le dices al código: "Intenta hacer esta acción, aunque sea peligrosa o pueda fallar". Si todo sale bien, perfecto. Si algo falla, el programa no se rompe (crashea), sino que pasa el control al comando `catch` del cual hare mención mas adelante.

### ¿En qué se usa?

Por ejemplo cuando querramos ejecutar un código que dependa de cosas externas que podrían fallar como conectarse a una base de datos, leer un archivo que quizás no existe, o pedir datos a internet.

### ¿Dónde NO se usa?

No debemos emplearla en todo el código sin razón, ya que puede ocultar errores graves de lógica que deberímos arreglar en lugar de ignorar. Asi que debemos ser cautelosos. 

---

## 7. CATCH:

Significa "Atrapar". Es el siguiente en la fila para trabajar despues del 'try'. Si el código que trabajamos dentro del `try` falla y lanza un error, el 'catch' lo atrapa por asi decirlo . Aquí es donde uno ya decide qué hacer con el error (mostrar un mensaje amigable al usuario, guardar un registro, etc.) para que el programa siga funcionando, por ejemplo para manejar el error indicariamos en codigo (ej. mostrar "No se pudo cargar la imagen" en vez de que la pantalla se ponga blanca).

### ¿Dónde NO se usa?

- No funciona por sí solo; siempre debe ir acompañado de un `try`.
- No se usa para "silenciar" errores (atrapar el error y no hacer nada), porque entonces nunca sabrás qué está fallando. Nuevamente repito hay que saber usarla con cuidado.

---

## 8. THROW:

Significa "Lanzar". Este comando seria como levantar la mano y gritar: "Aquí hay un problema". Lanzas el error para que un bloque 'catch' más arriba lo atrape y lo maneje; por ejemplo, si una función espera una edad y recibe `-5`, hariamos un 'throw' diciendo: "La edad no puede ser negativa". Se puede notar que trabja con los anteriores ya mencionados.

### ¿Dónde NO se usa?

No se usa para controlar el flujo normal del programa, solo debe usarse para situaciones excepcionales o incorrectas.

---

## 9. JSX (JavaScript XML):

Es una mezcla visual entre HTML y JavaScript. Se usa casi exclusivamente en la biblioteca React. Nos permite escribir etiquetas que parecen HTML (como `<div>` o `<h1>`) directamente dentro de tu código JavaScript. Lo usamos por ejemplo: 

- Al construir componentes en React (y bibliotecas similares como Preact o Solid).
- Para definir cómo se ve la estructura de tu aplicación.

### ¿Dónde NO se usa?

No funciona directamente en un navegador web estándar. El navegador no entiende JSX; necesita un traductor (como Babel o Vite) que convierta ese JSX en JavaScript normal antes de que funcione.
