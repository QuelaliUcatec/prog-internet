import React, { useState } from 'react';
import './App.css';

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


  const btnNum = (num) => <button onClick={() => clickBoton(num)}>{num}</button>;
  const btnOp = (op) => <button className="btn-operador" onClick={() => clickBoton(op)}>{op}</button>;

  return (
    <div className="calculadora">
      <h3 className="titulo">Calculadora V2.0</h3>
      
      <input type="text" className="pantalla" value={pantalla} readOnly placeholder="0" />
      
      <div className="botones-grid">
        {/* Fila 1 */}
        <button className="btn-clear" onClick={() => clickBoton("C")}>C</button>
        {btnOp("/")}
        {btnOp("*")}
        {btnOp("-")}
        
        {/* Fila 2 */}
        {btnNum("7")}
        {btnNum("8")}
        {btnNum("9")}

        {btnOp("+")}

        {/* Fila 3 */}
        {btnNum("4")}
        {btnNum("5")}
        {btnNum("6")}

        <button className="btn-igual" onClick={() => clickBoton("=")}>=</button>


        {btnNum("1")}
        {btnNum("2")}
        {btnNum("3")}


        <button className="btn-cero" onClick={() => clickBoton("0")}>0</button>
        <button onClick={() => clickBoton(".")}>.</button>
      </div>
    </div>
  );
}

export default Calculadora;
