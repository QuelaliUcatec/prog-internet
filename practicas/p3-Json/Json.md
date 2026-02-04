<img src="imagenes/images_1.PNG" style="float:right; margin-right:20px" width="200">


# INVESTIGACION SOBRE
# JSON


## JSON (Java Script Object Notation)

JSON es un formato de datos basado en texto que sigue la sintaxis de objeto de JavaScript, popularizado por **Douglas Crockford**. Aunque es muy parecido a la sintaxis de objeto literal de **JavaScript**, puede ser utilizado independientemente de JavaScript, y muchos entornos de programación poseen la capacidad de leer (convertir; parsear) y generar JSON.
### Que es realmente JSON
Los JSON son cadenas - útiles cuando se quiere transmitir datos a través de una red. Debe ser convertido a un objeto nativo de JavaScript cuando se requiera acceder a sus datos. Ésto no es un problema, dado que JavaScript posee un objeto global JSON que tiene los métodos disponibles para convertir entre ellos.

Nota: Convertir una cadena a un objeto nativo se denomina parsing, mientras que convertir un objeto nativo a una cadena para que pueda ser transferido a través de la red se denomina stringification.

Un objeto JSON puede ser almacenado en su propio archivo, que es básicamente sólo un archivo de texto con una extension .json, y una MIME type de application/json.

## Porque se utliza JSON 
La naturaleza independiente del lenguaje de JSON lo convierte en un formato ideal para intercambiar datos a través de diferentes lenguajes de programación y plataformas. Por ejemplo, una aplicación escrita en Java puede enviar fácilmente datos **JSON** a una aplicación **Python**. O una aplicación móvil escrita en **JavaScript** puede usar **JSON** para comunicarse con un servidor back-end escrito en PHP. ¿Por qué? Porque ambos sistemas pueden analizar y generar JSON.

### ESTRUCTURA DE JSON

Como se describió previamente, un JSON es una cadena cuyo formato recuerda al de los objetos literales JavaScript. Es posible incluir los mismos tipos de datos básicos dentro de un JSON que en un objeto estándar de JavaScript - cadenas, números, arreglos, booleanos, y otros literales de objeto. Esto permite construir una jerarquía de datos, como ésta:
```
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": ["Radiation resistance", "Turning tiny", "Radiation blast"]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
```

### JSON FRENTE A HTML Y XML
Existe una serie de formatos para almacenar y transmitir datos en la web. Tres opciones populares son JSON, XML y HTML. JSON y XML son formatos utilizados para almacenar y transmitir datos, y cada uno tiene diferentes fortalezas. HTML es un lenguaje utilizado para crear la estructura de una página web y se utiliza a menudo junto con estos formatos de almacenamiento de datos.

#### DIFERENCIAS CLAVE
- JSON VS XML
Aunque XML fue inicialmente utilizado para los servicios web y el intercambio de datos en general, con el tiempo JSON ha venido desplazando a XML debido a su simplicidad y eficiencia.

    JSON tiene una sintaxis más simple y es más fácil de leer y escribir que XML. Además, JSON es más ligero, no solo para su transmisión sino también para el procesamiento de los datos. Por ello resulta más eficiente.

### Ventajas y beneficios del formato JSON
Por muchos motivos JSON se ha convertido en un formato ampliamente usado en el mundo del desarrollo, especialmente en la web.

#### Facilidad de uso y lectura por humanos
JSON es fácil de leer y escribir. Su estructura simple y clara facilita la comprensión de los datos a simple vista.

#### Eficiencia en la transmisión de datos
Debido a su naturaleza ligera, JSON es eficiente en la transmisión de datos, lo que lo hace ideal para la comunicación entre el cliente y el servidor en aplicaciones web pero en general también  en cualquier sistema distribuido.
