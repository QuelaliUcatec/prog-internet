import { useState } from 'react';

function App() {
  /**
   * SECCIÓN 1: ESTADO (STATE)
   * Aquí definimos las variables que React monitorea. 
   * Si alguna cambia, React redibuja la pantalla automáticamente.
   */
  // Almacena el número que el usuario está escribiendo actualmente.
  const [valorActual, setValorActual] = useState<string>("0");
  
  // Guarda la operación (+, -, *, /) seleccionada antes de presionar el siguiente número.
  const [operacionPendiente, setOperacionPendiente] = useState<string | null>(null);
  
  // Almacena el número anterior para poder realizar el cálculo cuando llegue el segundo valor.
  const [valorAnterior, setValorAnterior] = useState<number | null>(null);
  
  // Esta es la "Memoria Visual": guarda el historial de lo que vas escribiendo (ej: "12 + 5 =").
  const [memoria, setMemoria] = useState<string>("");

  /**
   * SECCIÓN 2: LÓGICA DE BOTONES
   * Funciones que controlan el comportamiento de la calculadora.
   */

  // Agrega números al string. Si hay un "0", lo reemplaza; si no, lo concatena (ej: "1" + "2" = "12").
  const presionarNumero = (num: string) => {
    setValorActual(prev => (prev === "0" ? num : prev + num));
  };

  // Resetea todas las variables de estado a su valor inicial para empezar de cero.
  const limpiar = () => {
    setValorActual("0");
    setOperacionPendiente(null);
    setValorAnterior(null);
    setMemoria("");
  };

  /**
   * SECCIÓN 3: MANEJO DE OPERACIONES Y MEMORIA
   * Aquí es donde sucede el rastro visual.
   */
  const manejarOperacion = (op: string) => {
    // Si ya existia una operación pendiente (por ejemplo: si ya pusiste 5 + 5 y ahora presionas *),
    // se calcula el resultado parcial antes de seguir.
    if (valorAnterior !== null && operacionPendiente !== null) {
      const parcial = realizarCalculo(valorAnterior, Number(valorActual), operacionPendiente);
      setValorAnterior(Number(parcial));
      setMemoria(`${parcial} ${op}`); // Actualiza la memoria con el resultado acumulado.
    } else {
      // Si es la primera operación, mueve el valor actual al anterior y lo muestra en la memoria.
      setValorAnterior(Number(valorActual));
      setMemoria(`${valorActual} ${op}`);
    }
    setOperacionPendiente(op);
    setValorActual("0"); // Limpia la pantalla principal para el siguiente número.
  };

  // Motor lógico: Recibe dos números y un símbolo, y devuelve el resultado matemático.
  const realizarCalculo = (n1: number, n2: number, op: string): string | number => {
    switch (op) {
      case "+": return n1 + n2;
      case "-": return n1 - n2;
      case "*": return n1 * n2;
      case "/": return n2 === 0 ? "Error" : n1 / n2;
      default: return n2;
    }
  };

  // Se ejecuta al presionar "=". Finaliza la cuenta y muestra toda la operación en la memoria.
  const calcularResultado = () => {
    if (operacionPendiente === null || valorAnterior === null) return;
    const resultadoFinal = realizarCalculo(valorAnterior, Number(valorActual), operacionPendiente);
    
    // Aquí la memoria muestra el resumen completo: "Anterior [OP] Actual ="
    setMemoria(`${valorAnterior} ${operacionPendiente} ${valorActual} =`);
    setValorActual(String(resultadoFinal));
    setOperacionPendiente(null);
    setValorAnterior(null);
  };

  /**
   * SECCIÓN 4: ESTILOS REUTILIZABLES (Tailwind)
   * Variables de texto que contienen clases de Tailwind para no repetir código en los botones.
   * active:scale-95 crea el efecto visual de "presionar" al hacer clic.
   */
  const btnNum = "bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition-all active:scale-95";
  const btnOp = "bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded-lg transition-all active:scale-95";

  return (
    /**
     * SECCIÓN 5: INTERFAZ DE USUARIO (JSX)
     * Estructura visual usando Flexbox y Grid de Tailwind.
     */
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a1a1a] to-[#3a3a3a] flex justify-center items-center p-4">
      
      <div className="bg-[#333] p-5 rounded-2xl w-full max-w-[280px] shadow-2xl border border-white/5">
        <h3 className="text-white/70 text-center mb-4 font-medium text-sm tracking-widest uppercase">Calculadora v3.0</h3>
        
        {/* PANTALLA: Muestra la memoria (arriba en pequeño) y el valor actual (abajo en grande) */}
        <div className="bg-[#222] text-white p-4 rounded-lg mb-4 h-28 flex flex-col justify-end items-end overflow-hidden shadow-inner">
          <div className="text-gray-500 text-sm h-5 mb-1 font-mono">{memoria}</div>
          <div className="text-4xl font-mono truncate w-full text-right">{valorActual}</div>
        </div>

        {/* BOTONES: Usa una cuadrícula de 4 columnas (grid-cols-4) */}
        <div className="grid grid-cols-4 gap-2">
          {/* Botón C: ocupa 3 columnas (col-span-3) */}
          <button className="col-span-3 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all active:scale-95" onClick={limpiar}>C</button>
          <button className={btnOp} onClick={() => manejarOperacion('/')}>/</button>
          
          {/* Renderizado dinámico de números para ahorrar líneas de código */}
          {['7', '8', '9'].map(n => <button key={n} className={btnNum} onClick={() => presionarNumero(n)}>{n}</button>)}
          <button className={btnOp} onClick={() => manejarOperacion('*')}>*</button>
          
          {['4', '5', '6'].map(n => <button key={n} className={btnNum} onClick={() => presionarNumero(n)}>{n}</button>)}
          <button className={btnOp} onClick={() => manejarOperacion('-')}>-</button>
          
          {['1', '2', '3'].map(n => <button key={n} className={btnNum} onClick={() => presionarNumero(n)}>{n}</button>)}
          <button className={btnOp} onClick={() => manejarOperacion('+')}>+</button>
          
          <button className={`${btnNum} col-span-2`} onClick={() => presionarNumero('0')}>0</button>
          <button className={btnNum} onClick={() => presionarNumero('.')}>.</button>
          <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-all active:scale-95" onClick={calcularResultado}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;