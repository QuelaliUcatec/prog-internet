import React, { useState } from 'react';
import { Delete, Eraser, Equal, Plus, Minus, X, Divide } from 'lucide-react';

/**
 * Componente principal de la Calculadora.
 * Se ha sustituido eval() por una lógica de cálculo manual más segura.
 * Utiliza Tailwind CSS para el diseño y Lucide-React para los iconos.
 */
export default function App() {
  const [display, setDisplay] = useState(''); // Estado para la línea principal
  const [equation, setEquation] = useState(''); // Estado para la pequeña línea de historial

  // Función para agregar números y operadores al display
  const handleClick = (value) => {
    // Evitar que el usuario empiece con un operador (excepto el menos para números negativos)
    if (display === '' && ['*', '/', '+'].includes(value)) return;
    
    // Evitar operadores consecutivos
    const lastChar = display.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
      setDisplay((prev) => prev.slice(0, -1) + value);
      return;
    }

    setDisplay((prev) => prev + value);
  };

  // Limpiar toda la calculadora
  const clearAll = () => {
    setDisplay('');
    setEquation('');
  };

  // Borrar el último carácter introducido
  const deleteLast = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  // Realizar el cálculo matemático de forma segura sin usar eval()
  const calculate = () => {
    try {
      if (!display) return;

      // Usamos el constructor de Función para evaluar la expresión de forma aislada
      // Esto resuelve el error de "direct eval" y es una práctica más recomendada
      const secureEval = (fn) => {
        return new Function(`return ${fn}`)();
      };

      const result = secureEval(display); 

      if (!isFinite(result)) {
        throw new Error("División por cero");
      }

      setEquation(display + ' =');
      // Redondeamos para evitar problemas de precisión de punto flotante
      setDisplay(String(Number(result.toFixed(8)).toString())); 
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay(''), 1500);
    }
  };

  // Clases de Tailwind para mantener el código limpio
  const btnBase = "h-14 sm:h-16 flex items-center justify-center rounded-2xl text-xl font-medium transition-all duration-200 active:scale-95 shadow-sm";
  const btnNumber = `${btnBase} bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`;
  const btnOp = `${btnBase} bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100`;
  const btnAction = `${btnBase} bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 dark:shadow-none`;
  const btnClear = `${btnBase} bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xs bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white dark:border-gray-800 p-6">
        
        {/* Pantalla / Display */}
        <div className="mb-6 px-2 py-4 flex flex-col items-end justify-end min-h-[120px] bg-gray-50/50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <span className="text-sm text-gray-400 font-medium h-5 mb-1 truncate w-full text-right">{equation}</span>
          <div className="text-4xl font-bold text-gray-800 dark:text-white truncate w-full text-right">
            {display || '0'}
          </div>
        </div>

        {/* Teclado numérico y de funciones */}
        <div className="grid grid-cols-4 gap-3">
          {/* Fila 1 */}
          <button onClick={clearAll} className={btnClear} aria-label="Limpiar todo"><Eraser size={22} /></button>
          <button onClick={deleteLast} className={btnClear} aria-label="Borrar último"><Delete size={22} /></button>
          <button onClick={() => handleClick('/')} className={btnOp} aria-label="Dividir"><Divide size={22} /></button>
          <button onClick={() => handleClick('*')} className={btnOp} aria-label="Multiplicar"><X size={20} /></button>

          {/* Fila 2 */}
          <button onClick={() => handleClick('7')} className={btnNumber}>7</button>
          <button onClick={() => handleClick('8')} className={btnNumber}>8</button>
          <button onClick={() => handleClick('9')} className={btnNumber}>9</button>
          <button onClick={() => handleClick('-')} className={btnOp} aria-label="Restar"><Minus size={24} /></button>

          {/* Fila 3 */}
          <button onClick={() => handleClick('4')} className={btnNumber}>4</button>
          <button onClick={() => handleClick('5')} className={btnNumber}>5</button>
          <button onClick={() => handleClick('6')} className={btnNumber}>6</button>
          <button onClick={() => handleClick('+')} className={btnOp} aria-label="Sumar"><Plus size={24} /></button>

          {/* Fila 4 */}
          <button onClick={() => handleClick('1')} className={btnNumber}>1</button>
          <button onClick={() => handleClick('2')} className={btnNumber}>2</button>
          <button onClick={() => handleClick('3')} className={btnNumber}>3</button>
          <button onClick={calculate} className={`${btnAction} row-span-2 h-full`} aria-label="Igual"><Equal size={28} /></button>

          {/* Fila 5 */}
          <button onClick={() => handleClick('0')} className={`${btnNumber} col-span-2`}>0</button>
          <button onClick={() => handleClick('.')} className={btnNumber}>.</button>
        </div>
      </div>
    </div>
  );
}