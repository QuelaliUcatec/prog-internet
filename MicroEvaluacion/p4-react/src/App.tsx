import React, { useState } from 'react';

function Calculadora() {
  // Estado para almacenar y actualizar el valor mostrado en la pantalla
  const [pantalla, setPantalla] = useState("");

  // Controlador de eventos para procesar la entrada de cada botón
  const clickBoton = (valor) => {
    if (valor === "=") {
      // Intento de evaluación de la expresión matemática acumulada
      try {
        if (pantalla) {
          // Ejecución del cálculo y conversión del resultado a cadena de texto
          setPantalla(eval(pantalla).toString());
        }
      } catch (e) {
        // Gestión de errores en caso de sintaxis matemática incorrecta
        setPantalla("Error");
      }
    } else if (valor === "C") {
      // Restablecimiento del estado para limpiar la pantalla
      setPantalla("");
    } else {
      // Concatenación del nuevo valor presionado al valor actual de la pantalla
      setPantalla(pantalla + valor);
    }
  };

  // Definición de clases de Tailwind para estilos base y efectos de interacción
  const btnBase = "p-4 text-xl font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center";
  const sombraBtn = "shadow-[0_4px_0_#1e293b] active:shadow-none active:translate-y-1 hover:brightness-110";

  return (
    // Contenedor principal con centrado absoluto y fondo oscuro
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center font-sans">
      
      {/* Estructura visual de la calculadora con sombreado y bordes redondeados */}
      <div className="bg-[#1e293b] p-5 rounded-[20px] shadow-[0px_0px_25px_rgba(56,189,248,0.15)] w-80">
        
        {/* Cabecera con tipografía estilizada */}
        <h3 className="text-[#38bdf8] text-center mt-0 mb-5 text-2xl font-bold tracking-[2px] uppercase drop-shadow-[0px_0px_10px_rgba(56,189,248,0.4)]">
          Calculadora V2.0
        </h3>
        
        {/* Componente de entrada de datos (solo lectura) para visualizar valores y resultados */}
        <input 
          type="text" 
          className="w-full h-[70px] text-4xl text-right mb-5 p-[10px] bg-[#020617] text-[#e0f2fe] border border-[#1e293b] rounded-xl focus:outline-none" 
          value={pantalla} 
          readOnly 
          placeholder="0" 
        />
        
        {/* Distribución de teclado mediante sistema de rejilla (CSS Grid) */}
        <div className="grid grid-cols-4 gap-3">
          
          {/* Fila 1: Botón de reset y operadores de división, multiplicación y resta */}
          <button 
            className={`${btnBase} ${sombraBtn} bg-[#0f766e] text-[#ccfbf1] font-bold shadow-[0_4px_0_#115e59]`} 
            onClick={() => clickBoton("C")}>C</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("/")}>/</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("*")}>*</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("-")}>-</button>
          
          {/* Fila 2: Botones numéricos superiores y operador de suma */}
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("7")}>7</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("8")}>8</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("9")}>9</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("+")}>+</button>

          {/* Fila 3: Botones numéricos medios */}
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("4")}>4</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("5")}>5</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("6")}>6</button>

          {/* Botón de ejecución de cálculo con extensión vertical de dos celdas */}
          <button 
            className={`${btnBase} ${sombraBtn} row-span-2 bg-[#3b82f6] text-white font-bold shadow-[0_4px_0_#1d4ed8]`} 
            onClick={() => clickBoton("=")}>=</button>

          {/* Fila 4: Botones numéricos inferiores */}
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("1")}>1</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("2")}>2</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("3")}>3</button>

          {/* Fila 5: Botón cero con extensión horizontal de dos celdas y separador decimal */}
          <button 
            className={`${btnBase} ${sombraBtn} col-span-2 bg-[#334155] text-[#f1f5f9]`} 
            onClick={() => clickBoton("0")}>0</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton(".")}>.</button>
        </div>
      </div>
    </div>
  );
}

export default Calculadora;
