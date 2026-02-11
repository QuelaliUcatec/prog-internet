import React, { useState } from 'react';

function Calculadora() {
  const [pantalla, setPantalla] = useState("");

  const clickBoton = (valor) => {
    if (valor === "=") {
      try {
        if (pantalla) {
          setPantalla(eval(pantalla).toString());
        }
      } catch (e) {
        setPantalla("Error");
      }
    } else if (valor === "C") {
      setPantalla("");
    } else {
      setPantalla(pantalla + valor);
    }
  };

  // Clases base para replicar tu efecto de sombra 3D del CSS
  const btnBase = "p-4 text-xl font-semibold rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center";
  const sombraBtn = "shadow-[0_4px_0_#1e293b] active:shadow-none active:translate-y-1 hover:brightness-110";

  return (
    // Reemplaza el body/html del CSS con estas clases de contenedor
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center font-sans">
      
      {/* .calculadora */}
      <div className="bg-[#1e293b] p-5 rounded-[20px] shadow-[0px_0px_25px_rgba(56,189,248,0.15)] w-80">
        
        {/* .titulo */}
        <h3 className="text-[#38bdf8] text-center mt-0 mb-5 text-2xl font-bold tracking-[2px] uppercase drop-shadow-[0px_0px_10px_rgba(56,189,248,0.4)]">
          Calculadora V2.0
        </h3>
        
        {/* .pantalla */}
        <input 
          type="text" 
          className="w-full h-[70px] text-4xl text-right mb-5 p-[10px] bg-[#020617] text-[#e0f2fe] border border-[#1e293b] rounded-xl focus:outline-none" 
          value={pantalla} 
          readOnly 
          placeholder="0" 
        />
        
        {/* .botones-grid */}
        <div className="grid grid-cols-4 gap-3">
          
          {/* Fila 1 */}
          <button 
            className={`${btnBase} ${sombraBtn} bg-[#0f766e] text-[#ccfbf1] font-bold shadow-[0_4px_0_#115e59]`} 
            onClick={() => clickBoton("C")}>C</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("/")}>/</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("*")}>*</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("-")}>-</button>
          
          {/* Fila 2 */}
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("7")}>7</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("8")}>8</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("9")}>9</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#0ea5e9] text-white shadow-[0_4px_0_#0284c7]`} onClick={() => clickBoton("+")}>+</button>

          {/* Fila 3 */}
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("4")}>4</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("5")}>5</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("6")}>6</button>

          {/* El botón IGUAL ocupa 2 filas */}
          <button 
            className={`${btnBase} ${sombraBtn} row-span-2 bg-[#3b82f6] text-white font-bold shadow-[0_4px_0_#1d4ed8]`} 
            onClick={() => clickBoton("=")}>=</button>

          {/* Fila 4 */}
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("1")}>1</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("2")}>2</button>
          <button className={`${btnBase} ${sombraBtn} bg-[#334155] text-[#f1f5f9]`} onClick={() => clickBoton("3")}>3</button>

          {/* Fila 5: El botón CERO ocupa 2 columnas */}
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