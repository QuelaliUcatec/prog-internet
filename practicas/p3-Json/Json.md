# **RESUMEN JSON** 
## **¿Qué es JSON (JavaScript Object Notation)?**

JSON (JavaScript Object Notation) es un formato basado en texto para almacenar e intercambiar datos de una manera que es legible por humanos y analizable por máquina. 

Es un formato ligero que permite el intercambio de datos, además de aquello es un subconjunto estándar de Lenguaje de Programacion JavaScript ECMA-262. Es un lenguaje ideal para el intercambio de datos.

## **Caracteristicas Principales de Json**

Existe una serie de formatos para almacenar y transmitir datos en la web. Tres opciones populares son JSON, XML y HTML. JSON y XML son formatos utilizados para almacenar y transmitir datos, y cada uno tiene diferentes fortalezas. HTML es un lenguaje utilizado para crear la estructura de una página web y se utiliza a menudo junto con estos formatos de almacenamiento de datos.

Ademas Json se basa en dos estructuras: 

Una colección principalmente de pares-de **clave valor**. Estos en varios lenguajes y se puede materializar como un objeto, un registro, una estructura, etc.

Una lista ordenada de valores. En la mayoría de los lenguajes se suele presentar como una matriz, un vector, una lista o una secuencia en si.


### **Diferencias clave** 
* JSON (notación de objeto JavaScript) se suele utilizar para el almacenamiento y la transferencia de datos. JSON es una opción popular para aplicaciones que se benefician de un formato de datos simple y fácil de usar.

* XML (Extensible Markup Language) es un lenguaje de marcas de uso general similar a JSON que permite estructuras de datos más complejas.

* HTML (lenguaje de marcado de hipertexto) se utiliza para crear la estructura y el contenido de las páginas web. A menudo lo verás utilizado con otros idiomas, como CSS (Cascading Style Sheets) y JavaScript, para unificar el estilo de un sitio web y agregar interactividad a sus páginas.

---

### **Tipos de datos JSON**

En el contexto del desarrollo, los tipos de dato son los diferentes tipos de valores que se pueden almacenar y manipular en un lenguaje de programación. Cada tipo de dato tiene su propio juego de atributos y comportamientos. JSON admite varios tipos de datos, entre ellos los siguientes:

* Objetos. Un tipo de datos de objeto JSON es un conjunto de pares de nombres o valores insertados entre {} ( llaves). Las claves deben ser cadenas y separadas por una coma y deben ser únicas.

* Matrices. Un tipo de datos de matriz es una recopilación ordenada de valores. En JSON, los valores de matriz deben ser cadena, número, objeto, matriz, booleano o nulo.

* Cadenas. En JSON, las cadenas van entre comillas dobles, pueden contener cualquier carácter Unicode y se suelen utilizar para almacenar y transmitir datos basados en texto, como nombres, direcciones o descripciones.

* Booleano. Los valores booleanos se designan como verdaderos o falsos. Los valores booleanos no van entre comillas y se tratan como valores de cadena.

* Nulo. Nulo representa un valor que se deja intencionadamente vacío. Cuando no se asigna ningún valor a una clave, se puede tratar como nula.

* Número. Los números se utilizan para almacenar valores numéricos para diversos fines, como cálculos, comparaciones o análisis de datos. 
JSON admite tanto números positivos como negativos, así como puntos decimales. El número JSON sigue el formato de punto flotante de precisión doble de JavaScript.

## **Almacenamiento de datos Json**

Al almacenar datos, estos deben tener un formato determinado y, sin importar dónde elija almacenarlos, el texto siempre es uno de los formatos legales.

JSON permite almacenar objetos JavaScript como texto.

### **Breve Ejemplo**

Texto que define un objeto de empleados con una matriz de 3 objetos de empleados:

```
{
"employees":[
  {"firstName":"John", "lastName":"Doe"},
  {"firstName":"Anna", "lastName":"Smith"},
  {"firstName":"Peter", "lastName":"Jones"}
]
}
````
**Datos JSON: un nombre y un valor**

Los datos JSON se escriben como pares nombre/valor, al igual que las propiedades de los objetos de JavaScript.

Un par nombre/valor consta de un nombre de campo (entre comillas dobles), seguido de dos puntos, seguido de un valor:

```
"firstName":"John"
```
**Objetos JSON**

Los objetos JSON se escriben dentro de llaves.

Al igual que en JavaScript, los objetos pueden contener múltiples pares nombre/valor:

````
{"firstName":"John", "lastName":"Doe"}
````

** Matrices JSON**

Las matrices JSON se escriben dentro de corchetes.

Al igual que en JavaScript, una matriz puede contener objetos:

````
"employees":[
  {"firstName":"John", "lastName":"Doe"},
  {"firstName":"Anna", "lastName":"Smith"},
  {"firstName":"Peter", "lastName":"Jones"}
]
`````
En el ejemplo anterior, el objeto "empleados" es una matriz. Contiene tres objetos.

Cada objeto es un registro de una persona (con un nombre y un apellido).


## **Preguntas Frecuentes sobre Json**

¿Es JSON un archivo o código?

JSON no es un archivo ni un código. Es un formato simple utilizado para almacenar y transportar datos. Es un formato de texto sin formato, que permite un fácil intercambio de datos entre diferentes lenguajes de programación. Se utiliza a menudo para enviar datos entre aplicaciones web y servidores.

