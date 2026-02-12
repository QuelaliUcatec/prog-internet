import { useState } from 'react'

function App() {
  // Estado para la pantalla principal (lo que ve el usuario)
  const [pantalla, setPantalla] = useState<string>("0");

  // Estado para guardar el primer número ingresado antes de una operación
  const [memoria, setMemoria] = useState<number | null>(null);

  // Estado para guardar la operación seleccionada (+, -, *, /)
  const [operacion, setOperacion] = useState<string | null>(null);

  // Bandera para saber si debemos limpiar la pantalla al ingresar el siguiente número
  const [esperandoSegundoNumero, setEsperandoSegundoNumero] = useState(false);

  // Función para manejar el evento de agregar números a la pantalla
  const agregarNumero = (num: string) => {
    if (esperandoSegundoNumero || pantalla === "0") {
      setPantalla(num); // Reemplaza el contenido si es el primer dígito o después de una operación
      setEsperandoSegundoNumero(false);
    } else {
      setPantalla(prev => prev + num); // Concatena el número si ya hay dígitos
    }
  };

  // Función para preparar la calculadora para una operación matemática
  const prepararOperacion = (op: string) => {
    setMemoria(Number(pantalla)); // Guarda el número actual en memoria
    setOperacion(op); // Guarda la operación seleccionada
    setEsperandoSegundoNumero(true); // Indica que el próximo input debe limpiar la pantalla
  };

  // Función para ejecutar el cálculo final
  const ejecutarCalcular = () => {
    if (memoria === null || operacion === null) return;

    const n1 = memoria;
    const n2 = Number(pantalla);
    let res: number | string = 0;

    // Realiza la operación correspondiente
    switch (operacion) {
      case "+": res = n1 + n2; break;
      case "-": res = n1 - n2; break;
      case "*": res = n1 * n2; break;
      case "/": res = n2 === 0 ? "Error" : n1 / n2; break; // Manejo de división por cero
    }

    setPantalla(String(res)); // Muestra el resultado
    setMemoria(null);         // Limpia la memoria
    setOperacion(null);       // Limpia la operación
    setEsperandoSegundoNumero(true); // Prepara para el siguiente cálculo
  };

  // Función para reiniciar la calculadora (AC)
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

          {/* Fila 7, 8, 9, * */}
          {[7, 8, 9, '*'].map((val) => (
            <button
              key={val}
              // Si es número llama a agregarNumero, si es operador llama a prepararOperacion
              onClick={() => typeof val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)}
              className={`${typeof val === 'number' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-4 rounded-xl transition-all`}
            >
              {val}
            </button>
          ))}

          {/* Fila 4, 5, 6, - */}
          {[4, 5, 6, '-'].map((val) => (
            <button
              key={val}
              // Operador ternario para decidir la función y el estilo según el tipo de valor
              onClick={() => typeof val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)}
              className={`${typeof val === 'number' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-4 rounded-xl transition-all`}
            >
              {val}
            </button>
          ))}

          {/* Fila 1, 2, 3, + */}
          {[1, 2, 3, '+'].map((val) => (
            <button
              key={val}
              // Lógica condicional repetida para los botones numéricos y de operación
              onClick={() => typeof val === 'number' ? agregarNumero(String(val)) : prepararOperacion(val)}
              className={`${typeof val === 'number' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-orange-500 hover:bg-orange-600'} text-white font-bold py-4 rounded-xl transition-all`}
            >
              {val}
            </button>
          ))}

          {/* Fila Inferior: 0, ., = */}
          <button onClick={() => agregarNumero('0')} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl">0</button>
          <button onClick={() => agregarNumero('.')} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl">.</button>
          <button onClick={ejecutarCalcular} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;