# NASA Explorer Archive: Documentación Técnica

Esta plataforma representa la culminación del examen parcial, integrando servicios de datos espaciales con una arquitectura moderna de frontend.

## Preparación del Entorno

Para este proyecto, se ha priorizado un flujo de trabajo basado en el control de versiones y herramientas de construcción de alto rendimiento.

1. Gestión de Ramas y Estructura

Se inicializó el entorno de trabajo mediante una rama dedicada para asegurar la trazabilidad del código:

Rama de Trabajo: GutierrezAlexander/examen-parcial

Directorio Raíz: NASAAPI

2. Inicialización del Stack

El proyecto utiliza Vite para una compilación ultra-rápida y TypeScript para garantizar un desarrollo libre de errores de tipado.

``` Creación del scaffold con React y TypeScript
npm create vite@latest . -- --template react-ts 

Instalación de dependencias base
npm install

Implementación de Tailwind CSS 4 (Motor CSS-first)
npm install tailwindcss @tailwindcss/vite 
```


## Especificaciones del Proyecto

1. Resumen

NASA Explorer Archive es una Single Page Application (SPA) diseñada para la exploración visual de la base de datos de la NASA. El sistema permite a los usuarios realizar búsquedas de cuerpos celestes mediante una interfaz moderna, integrando servicios de consulta (GET) y simulación de persistencia (POST).

2. Stack Tecnológico

La selección tecnológica se basa en las mejores prácticas de escalabilidad y mantenibilidad:

Vite + React: Biblioteca base para la gestión de componentes y UI.

TypeScript: Interfaces estrictas para asegurar la integridad de los datos consumidos de la API.

Tailwind CSS 4: Estilos de última generación para diseño responsivo y efectos de glassmorphism.

Git: Control de versiones granular para el desarrollo de funcionalidades independientes.

## Arquitectura y Flujo de Datos

La comunicación con servicios externos se realiza bajo el protocolo HTTP, optimizando la experiencia de usuario mediante lógica de traducción local.

A. Servicio GET (Consulta)

Endpoint: https://images-api.nasa.gov/search?q={query}&media_type=image

Lógica: Implementación de un diccionario local de términos astronómicos que traduce las búsquedas en tiempo real, permitiendo consultar una fuente de datos en inglés mediante términos en español.

B. Servicio POST (Simulación)

Endpoint: https://jsonplaceholder.typicode.com/posts

Propósito: Simular el almacenamiento de registros favoritos.

Payload: Envío de objetos JSON conteniendo el nasa_id, title y el timestamp de la acción.


## Instalación Local

Para replicar el entorno de ejecución, siga estos pasos desde la terminal de su preferencia:

Sincronizar Rama:

git checkout GutierrezAlexander/examen-parcial


Instalar Dependencias:

npm install


Ejecutar Servidor de Desarrollo:

npm run dev


## Estrategia de Versionamiento (Git)

Se ha implementado una convención de mensajes de commit para facilitar la lectura del historial de cambios:

feat: Implementación de nuevas características.

fix: Resolución de bugs o errores técnicos.

refactor: Optimización de código existente sin alterar su funcionalidad.