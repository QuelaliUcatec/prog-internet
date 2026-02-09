# 🛡️ Poké-Lab: Advanced Biometric Analysis Interface

Este proyecto transforma una Pokédex convencional en una estación de investigación biotecnológica. No es solo un visor de datos; es una herramienta de análisis que utiliza efectos visuales de HUD (Heads-Up Display), síntesis de voz y procesamiento de logs en tiempo real.

---

## 🚀 Funcionalidades Principales (Protocolos de Análisis)

El proyecto destaca por su enfoque en la **inmersión del usuario** mediante las siguientes características:

* **Identificación por Voz:** Al iniciar el análisis, el sistema utiliza la `Web Speech API` para anunciar el nombre del sujeto y desglosar sus estadísticas base en español.
* **Interfaz de Laboratorio (HUD):**
    * **Láser Scanner:** Una línea neón dinámica que recorre al Pokémon simulando un escaneo de superficie.
    * **Radar de Proximidad:** Pulsos circulares concéntricos que emanan del centro del espécimen.
    * **Efecto Glitch:** Una animación de entrada que simula la estabilización de un holograma.
* **Terminal de Procesos:** Una ventana de comandos que muestra en cascada el estado del sistema (`LEYENDO ADN`, `PROTOCOLOS DE COMBATE`, etc.).
* **Feedback Acústico:** Integración de alertas sonoras ("Beeps") de inicio de sesión sincronizadas con la locución.

---

## 🛠️ Desafíos Técnicos y Soluciones (Log de Errores)

A lo largo del desarrollo, se identificaron y corrigieron errores críticos de arquitectura en React:

### 1. Error de Cascada de Estado (Synchronous SetState)
* **Error:** `Error: Calling setState synchronously within an effect can trigger cascades`.
* **Causa:** Intentábamos limpiar los mensajes de la terminal (`setLogMessages([])`) directamente en el cuerpo del `useEffect` al cambiar de Pokémon, lo que provocaba conflictos en el ciclo de renderizado.
* **Solución:** Se encapsuló la limpieza dentro de la lógica de timers y se gestionó un array de referencias para asegurar que el estado solo se actualice de forma asíncrona y controlada.

### 2. Sincronización de Audio y Voz (Promesas)
* **Error:** La voz del sistema se solapaba con el sonido del "beep" inicial, resultando en un ruido confuso.
* **Solución:** Se utilizó el manejo de promesas de la API de Audio (`beep.play().then(...)`). Se añadió un `setTimeout` de 300ms para crear una transición fluida entre el sonido de hardware y la voz artificial.

### 3. Fugas de Memoria (Memory Leaks)
* **Error:** Los timers de los logs de terminal seguían ejecutándose incluso si el usuario cerraba el panel rápidamente.
* **Solución:** Se implementó una función de limpieza (`cleanup function`) en el `return` del `useEffect` que utiliza `clearTimeout` y `window.speechSynthesis.cancel()` para detener todos los procesos al desmontar el componente.

---

## 🎨 Especificaciones de Diseño (UI/UX)

El diseño se basa en una paleta de colores **Cyber-Cyan** sobre fondos profundos:

| Elemento | Descripción Técnica |
| :--- | :--- |
| **Fuentes** | `Orbitron` para títulos, `Rajdhani` para métricas y `Share Tech Mono` para la terminal. |
| **Efecto Neón** | Utilización de `text-shadow` y `box-shadow` con valores cian (#00f2ff). |
| **Componentes HUD** | Esquinas decorativas posicionadas de forma absoluta para enmarcar el análisis. |
| **Barras Dinámicas** | Indicadores de progreso que cambian de color (Cian a Turquesa) si el stat supera los 100 puntos. |

---

## 📦 Requisitos e Instalación

1.  **Dependencias:** React 18+, PokeAPI.
2.  **Fuentes Externas:** Se requiere la importación de Google Fonts en el CSS global:
    ```css
    @import url('[https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap](https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap)');
    ```
3.  **Ejecución:**
    ```bash
    npm install
    npm start
    ```

---

## 📝 Conclusión
Este proyecto demuestra el uso avanzado de **React Hooks**, la integración de **APIs nativas del navegador** (Voz y Audio) y la creación de interfaces de usuario altamente interactivas mediante **CSS avanzado**.