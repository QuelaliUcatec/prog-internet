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
