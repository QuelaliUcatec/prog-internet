# Todo sobre JSON: El Estándar de la Web Moderna

## 1. ¿Qué es JSON?
JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos. Aunque nació de JavaScript, hoy es independiente del lenguaje, lo que permite que sistemas escritos en diferentes tecnologías se comuniquen entre sí.

Surgió como una alternativa más eficiente y legible que el formatoXML para el desarrollo de aplicaciones en internet.

## 2. Reglas de Sintaxis (Sencillas pero Estrictas)
Para que un archivo JSON sea válido, debe cumplir con lo siguiente:

* Pares Clave/Valor: Los datos siempre se organizan como "clave": "valor".
* Comillas Dobles: Tanto las claves como las cadenas de texto deben usar comillas dobles (" ").
* Objetos: Se definen entre llaves { }.
* Arreglos (Listas): Se definen entre corchetes [ ].
* Tipos de Datos:
    * Strings: "Hola Mundo"
    * Números: 42 o 3.14
    * Booleanos: true o false
    * Nulo: null



## 3. Usos Principales
En la arquitectura web actual, JSON es fundamental para:

1. APIs REST: Es el formato preferido para enviar y recibir datos entre servidores y navegadores.
2. Configuración de Proyectos: Herramientas como VS Code o Node.js guardan sus ajustes en archivos .json.
3. Bases de Datos NoSQL: Motores como MongoDB utilizan estructuras similares a JSON para almacenar información.



## 4. Frameworks y Herramientas
Casi todos los lenguajes modernos tienen soporte nativo para JSON:

* JavaScript: Usa JSON.parse() y JSON.stringify().
* Python: Incluye la librería json.
* Frameworks Web: React, Angular y Vue dependen de JSON para actualizar el contenido de las páginas dinámicamente.



## 5. JSON vs XML
| Característica | JSON | XML |
| :--- | :--- | :--- |
| Legibilidad | Muy alta (estilo código) | Media (basado en etiquetas) |
| Peso | Ligero (sin etiquetas de cierre) | Pesado (más texto) |
| Velocidad | Rápido de procesar | Más lento de analizar |
| Estructura | Mapas y Arreglos | Árbol de etiquetas |