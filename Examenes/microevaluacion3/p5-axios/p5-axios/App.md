// Definimos los estados globales (la memoria) de nuestro componente principal usando el hook useState.
// 1. 'view': Controla la navegación. Define qué pantalla estamos viendo (inicio, cuadrícula de tipos o búsqueda). Usamos TypeScript para bloquearlo y que solo acepte esos tres textos exactos.
// 2. 'selectedType': Guarda el nombre del tipo seleccionado (ej. 'fire') para filtrar los Pokémon y cambiar la temática visual de la página.
// 3. 'searchQuery': Almacena el texto exacto que el usuario va tecleando en la barra de búsqueda para luego consultar a la API.

// Estados para manejar los datos de la API y la experiencia visual del usuario (UX).
// 1. 'pokemons': Almacena la lista completa de Pokémon que se mostrarán en la cuadrícula. Usamos TypeScript (<PokemonBase[]>) para asegurar que cada elemento de la lista tenga la estructura correcta. Comienza como una lista vacía ([]).
// 2. 'loading': Actúa como un interruptor (booleano) para saber si estamos esperando datos de internet. Empieza en 'false', cambia a 'true' al hacer la petición, y nos permite mostrar animaciones de carga en la pantalla para que el usuario sepa que la app está pensando.

// Estados para controlar la paginación local y la ventana modal de detalles.
// 1. 'currentPage': Guarda el número de la página actual (empezando en 0) para dividir los resultados y no saturar la pantalla.
// 2. 'typeTotalList': Almacena TODOS los Pokémon de un tipo a la vez. Como la PokeAPI no permite usar 'offset' o 'limit' cuando buscas por tipo, guardamos la lista completa aquí y luego la paginamos nosotros mismos en el navegador.
// 3. 'selectedPokemon': Guarda los datos exactos del Pokémon al que el usuario le hizo clic. Si su valor es 'null', la ventana flotante (modal) se mantiene cerrada.

// Bloque de código seguro (try/catch/finally) para descargar los Pokémon principales o "héroes".
// En lugar de pedir los Pokémon uno por uno (lo cual sería lento), creamos una lista de peticiones pendientes (promises) y usamos 'Promise.all' para dispararlas todas al mismo tiempo hacia la PokeAPI. 
// Una vez que llegan todos los resultados, los limpiamos con 'normalizePokemonData' y los guardamos en el estado. Finalmente, sin importar si hubo éxito o error, apagamos el estado de carga (setLoading) en el bloque finally.
                    --79-110
// Función principal para cargar todos los Pokémon de un tipo específico (ej. 'Fuego').
// 1. Reiniciamos la "memoria" del componente (estados) para preparar la pantalla limpia.
// 2. Descargamos la lista gigante de ese tipo desde la PokeAPI.
// 3. FILTRO CRÍTICO: La API incluye formas alternas (Megas, Gigamax) con IDs gigantes (>10000). Usamos manipulación de texto (split) para extraer el ID numérico directo de la URL y filtramos para quedarnos solo con los Pokémon de la Pokédex Nacional estándar (<= MAX_POKEMON_ID).
// 4. Guardamos la lista validada y delegamos la tarea de descargar las fotos y datos a 'fetchPageForType'.

        --112 - 124---
// Función auxiliar para paginar localmente y descargar los detalles de un grupo específico de Pokémon.
// 1. Calculamos los índices de inicio (start) y fin (end) basándonos en el número de página actual y el límite deseado.
// 2. Usamos '.slice()' para "recortar" únicamente el fragmento de la lista gigante que necesitamos mostrar en este momento.
// 3. Convertimos esa pequeña lista de URLs en peticiones reales usando 'fetch' y 'Promise.all' para descargarlas en paralelo a máxima velocidad.
// 4. Normalizamos los datos crudos resultantes y actualizamos el estado 'pokemons' para que React dibuje las tarjetas.

        --127 - 156--
// Función asíncrona para manejar el envío del formulario de búsqueda.
// 1. Prevenimos que la página se recargue (e.preventDefault) y bloqueamos búsquedas vacías.
// 2. PRIMERA BARRERA: Si el usuario escribe un número de ID mayor al límite (1025), bloqueamos la petición antes de gastar recursos de internet y le avisamos con un alert().
// 3. SEGUNDA BARRERA: Buscamos en la API convirtiendo el texto a minúsculas. Si el usuario buscó un nombre válido pero resulta ser una forma alterna (cuyo ID devuelto es > 10000), lanzamos un error forzado para ignorarlo.
// 4. Si todo es correcto, normalizamos los datos y lo guardamos en el estado dentro de una lista de un solo elemento []. Si falla, vaciamos la lista.

            --158 - 163-
// Función "Adaptador" para limpiar los datos crudos de la PokeAPI. 
// Recibe el objeto gigante de la API (data: any) y lo transforma en un objeto ligero y perfecto que cumple estrictamente con nuestra interfaz (PokemonBase).
// Extrae el ID (convirtiéndolo a texto), el nombre, navega por las carpetas internas para sacar la ilustración oficial (con un plan de respaldo por si falla), y aplana la lista de tipos elementales.

            165 - 170
// Efecto secundario (useEffect) que "escucha" los cambios en la página actual.
// El arreglo de dependencias [currentPage] hace que este código se dispare automáticamente cada vez que el usuario avanza o retrocede de página.
// Incluye un candado de seguridad (if): solo se activa si estamos en la vista de tipos ('type-grid') y si la lista gigante ya está descargada. Si se cumple, enciende la pantalla de carga, pide el nuevo grupo de Pokémon y apaga la carga al terminar.


// 1. Efecto de inicialización: El useEffect con el arreglo vacío [] asegura que la función 'loadHome()' se ejecute una sola vez cuando la página carga por primera vez.
// 2. Fondo dinámico (currentBg): Calculamos el color de fondo de toda la aplicación en tiempo real. Usamos un operador ternario para preguntar: "¿Estamos viendo la cuadrícula de tipos y hay un tipo seleccionado?". Si es SÍ, buscamos el gradiente de ese tipo (o uno por defecto). Si es NO (ej. estamos en Inicio o Búsqueda), usamos el gradiente principal de la casa (home).

            --- 178 - 286----
// ==========================================
// RENDERIZADO PRINCIPAL (LA INTERFAZ)
// ==========================================
// Aquí construimos la estructura visual de la aplicación. 
// Dividida en 3 partes principales:
// 1. HEADER: Logo interactivo, selector de tipos y barra de búsqueda.
// 2. CONTENIDO: Título dinámico, estado de carga (esqueletos), mensajes de error y la cuadrícula principal de tarjetas (PokemonCard).
// 3. PAGINACIÓN Y MODAL: Controles de navegación de páginas y la ventana flotante que aparece al seleccionar un Pokémon.