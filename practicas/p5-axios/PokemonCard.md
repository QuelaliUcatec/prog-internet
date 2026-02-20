// Usamos themeClass.split(' ')[0] para extraer únicamente la primera clase de nuestra lista de colores (la que corresponde al color de fondo o 'bg-'). Al cortarla con split y elegir la posición [0], podemos aplicar solo el fondo a ciertos elementos (como el brillo detrás del Pokémon), sin aplicarle también el borde o la sombra por error.

// Contenedor de la cabecera de la carta. Usa 'flex' y 'justify-between' para alinear el nombre a la izquierda y el HP a la derecha. Además, aplica un efecto moderno de "vidrio esmerilado" combinando un fondo gris semitransparente (bg-slate-100/80) con un desenfoque (backdrop-blur-sm).

// Contenedor de la cabecera de la carta. Usa 'flex' y 'justify-between' para alinear el nombre a la izquierda y el HP a la derecha. Además, aplica un efecto moderno de "vidrio esmerilado" combinando un fondo gris semitransparente (bg-slate-100/80) con un desenfoque (backdrop-blur-sm).

// Etiqueta <h2> para el nombre del Pokémon. Usamos Tailwind para darle formato de título pequeño, en negrita y todo en mayúsculas (text-sm font-bold uppercase). Separamos un poco las letras para darle más elegancia (tracking-wider). Además, usamos 'truncate' para proteger el diseño: si un nombre es demasiado largo, lo cortará automáticamente y le pondrá puntos suspensivos (...) al final.

// Etiqueta <span> para mostrar los Puntos de Salud (HP). Usamos una fuente monoespaciada (font-mono) para que los números tengan un estilo de videojuego o estadísticas. Como no tenemos el HP real, usamos una fórmula matemática de JavaScript ({Math.floor(Math.random() * 50) + 50}) para generar un número entero al azar entre el 50 y el 99 cada vez que se dibuja la carta.

// Contenedor principal de la imagen del Pokémon. Creamos una caja con sombra interior (shadow-inner) para que parezca hundida en la carta. Adentro tiene dos capas:
// 1. Un div absoluto que dibuja un círculo muy difuminado (blur-2xl) usando el color del tipo del Pokémon para crear un efecto de "aura" o brillo mágico de fondo.
// 2. La etiqueta <img /> del Pokémon, optimizada con loading="lazy" y con clases para que la imagen se adapte sin deformarse (object-contain). Además, le añadimos un efecto de zoom suave al pasar el ratón (group-hover:scale-110) y una sombra que sigue la silueta del dibujo (drop-shadow-lg).

// Contenedor para las etiquetas de los tipos del Pokémon. Usamos Flexbox (flex) para colocar las etiquetas en una fila horizontal y las centramos perfectamente (justify-center). Usamos 'gap-2' para crear una separación uniforme entre ellas si el Pokémon tiene más de un tipo, y 'mb-2' para separarlas del número de la Pokédex que va debajo.

// Contenedor de las etiquetas de los tipos del Pokémon. Usamos `.map()` para recorrer la lista de tipos y crear un <span> por cada uno. 
// Aquí aplicamos nuestros dos diccionarios: TYPE_TRANSLATIONS para mostrar el nombre del tipo en español, y TYPE_COLORS (cortado con split) para darle a cada etiqueta su color de fondo exacto. Si algún dato falla, usamos valores por defecto (||) para evitar que la carta se rompa.

// Pie final de la carta. Usamos un borde superior (border-t) para separarlo visualmente de las etiquetas de los tipos. 
// A la izquierda mostramos el número de Pokédex del Pokémon con una fuente monoespaciada (#ID). A la derecha, agregamos el texto "VER CARTA", el cual está invisible por defecto (opacity-0) pero aparece suavemente cuando el usuario pasa el ratón sobre cualquier parte de la carta entera gracias a las clases 'group-hover:opacity-100' y 'transition-opacity'.

// Pie final de la carta. Usamos un borde superior (border-t) para separarlo visualmente de las etiquetas de los tipos. 
// A la izquierda mostramos el número de Pokédex del Pokémon con una fuente monoespaciada (#ID). A la derecha, agregamos el texto "VER CARTA", el cual está invisible por defecto (opacity-0) pero aparece suavemente cuando el usuario pasa el ratón sobre cualquier parte de la carta entera gracias a las clases 'group-hover:opacity-100' y 'transition-opacity'.