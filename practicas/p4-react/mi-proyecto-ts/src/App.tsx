import { useState } from 'react'

function App() {
  const [pantalla, setPantalla] = useState<string>("0"); // Lo que ve el usuario
  const [memoria, setMemoria] = useState<number | null>(null); // El primer número guardado
  const [operacion, setOperacion] = useState<string | null>(null); // La operación elegida
  const [esperandoSegundoNumero, setEsperandoSegundoNumero] = useState(false);

  const agregarNumero = (num: string) => {
    if (esperandoSegundoNumero || pantalla === "0") {
      setPantalla(num);
      setEsperandoSegundoNumero(false);
    } else {
      setPantalla(prev => prev + num);
    }
  };

  const prepararOperacion = (op: string) => {
    setMemoria(Number(pantalla));
    setOperacion(op);
    setEsperandoSegundoNumero(true);
  };

  const ejecutarCalcular = () => {
    if (memoria === null || operacion === null) return;
    
    const n1 = memoria;
    const n2 = Number(pantalla);
    let res: number | string = 0;

    switch (operacion) {
      case "+": res = n1 + n2; break;
      case "-": res = n1 - n2; break;
      case "*": res = n1 * n2; break;
      case "/": res = n2 === 0 ? "Error" : n1 / n2; break;
    }

    setPantalla(String(res));
    setMemoria(null);
    setOperacion(null);
    setEsperandoSegundoNumero(true); // Para que el siguiente número limpie el resultado
  };

  const limpiar = () => {
    setPantalla("0");
    setMemoria(null);
    setOperacion(null);
    setEsperandoSegundoNumero(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-black border-4 border-gray-800 p-6 rounded-3xl shadow-2xl w-full max-w-xs">
        
        {/* PANTALLA ÚNICA */}
        <div className="bg-gray-200 p-4 rounded-xl mb-6 text-right shadow-inner">
          <p className="text-xs text-gray-500 h-4 uppercase font-bold">
            {memoria !== null ? `${memoria} ${operacion}` : ''}
          </p>
          <p className="text-4xl font-mono font-bold text-gray-800 overflow-hidden">
            {pantalla}
          </p>
        </div>

        {/* TECLADO */}
        <div className="grid grid-cols-4 gap-3">
          {/* Botón Limpiar */}
          <button onClick={limpiar} className="col-span-3 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all">
            AC (BORRAR)
          </button>
          
          <button onClick={() => prepararOperacion('/')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl">/</button>

          {/* Números y Operadores */}
          {[7, 8, 9, '*'].map((val) => (
            <button
              key={val}
              onClick={() => typeof val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)}
              className={`${typeof val === 'number' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-4 rounded-xl transition-all`}
            >
              {val}
            </button>
          ))}

          {[4, 5, 6, '-'].map((val) => (
            <button
              key={val}
              onClick={() => typeof val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)}
              className={`${typeof val === 'number' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-4 rounded-xl transition-all`}
            >
              {val}
            </button>
          ))}

          {[1, 2, 3, '+'].map((val) => (
            <button
              key={val}
              onClick={() => typeof val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)}
              className={`${typeof val === 'number' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-4 rounded-xl transition-all`}
            >
              {val}
            </button>
          ))}

          {/* Fila Inferior */}
          <button onClick={() => agregarNumero('0')} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl">0</button>
          <button onClick={() => agregarNumero('.')} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl">.</button>
          <button onClick={ejecutarCalcular} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;