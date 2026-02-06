import { useState } from 'react';
import './App.css';

// Estilo para el contenedor principal de la calculadora
const calculadoraContainer: React.CSSProperties = {
  backgroundColor: '#333',
  padding: '20px',
  borderRadius: '15px',
  width: '260px',
  margin: '50px auto',
  boxShadow: '0px 10px 20px rgba(0,0,0,0.3)'
};

// Estilo para la pantalla de resultado
const pantalla: React.CSSProperties = {
  backgroundColor: '#222',
  color: 'rgb(255, 255, 255)',
  fontSize: '2rem',
  textAlign: 'right',
  padding: '30px 20px',
  marginBottom: '20px',
  borderRadius: '5px',
  height: '50px',
  overflow: 'hidden'
};

// Estilo para la cuadrícula de botones
const gridBotones: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '10px'
};
const estiloMemoria: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#888',
  height: '20px',
  marginBottom: '5px'
};
function App() {
  const [valorActual, setValorActual] = useState<string>("0");
  const [operacionPendiente, setOperacionPendiente] = useState<string | null>(null);
  const [valorAnterior, setValorAnterior] = useState<number | null>(null);
  const [memoria, setMemoria] = useState<string>("");

  // Función para cuando presionas un número
  const presionarNumero = (num: string) => {
    setValorActual(prev => (prev === "0" ? num : prev + num));
  };

  // Función para resetear (C)
  const limpiar = () => {
    setValorActual("0");
    setOperacionPendiente(null);
    setValorAnterior(null);
  };

  // Función para manejar las operaciones
const manejarOperacion = (op: string) => {
    // Si ya hay una operación pendiente y un valor anterior, calculamos el parcial primero
    if (valorAnterior !== null && operacionPendiente !== null) {
      const parcial = realizarCalculo(valorAnterior, Number(valorActual), operacionPendiente);
      setValorAnterior(Number(parcial));
      setMemoria(`${parcial} ${op}`);
    } else {
      // Si es la primera operación del ciclo
      setValorAnterior(Number(valorActual));
      setMemoria(`${valorActual} ${op}`);
    }
    
    setOperacionPendiente(op);
    setValorActual("0");
  };

  // Función auxiliar para no repetir código de cálculo
  const realizarCalculo = (n1: number, n2: number, op: string): string | number => {
    switch (op) {
      case "+": return n1 + n2;
      case "-": return n1 - n2;
      case "*": return n1 * n2;
      case "/": return n2 === 0 ? "Error" : n1 / n2;
      default: return n2;
    }
  };

  const calcularResultado = () => {
    if (operacionPendiente === null || valorAnterior === null) return;

    const resultadoFinal = realizarCalculo(valorAnterior, Number(valorActual), operacionPendiente);
    
    setMemoria(`${valorAnterior} ${operacionPendiente} ${valorActual} =`);
    setValorActual(String(resultadoFinal));
    setOperacionPendiente(null);
    setValorAnterior(null);
  };

  return (
    <div style={calculadoraContainer}>
      <h3 style={{color: 'white', textAlign: 'center'}}>Calculadora v1.0</h3>
      
      {/* Pantalla con rastro visual */}
      <div style={pantalla}>
        <div style={estiloMemoria}>{memoria}</div>
        <div>{valorActual}</div>
      </div>

      <div style={gridBotones}>
        {/* ... (tus botones se mantienen exactamente igual) ... */}
        <button style={{ gridColumn: 'span 3', backgroundColor: '#ff5555' }} onClick={limpiar}>C</button>
        <button style={{ backgroundColor: '#f39c12' }} onClick={() => manejarOperacion('/')}>/</button>
        {['7', '8', '9'].map(n => <button key={n} onClick={() => presionarNumero(n)}>{n}</button>)}
        <button style={{ backgroundColor: '#f39c12' }} onClick={() => manejarOperacion('*')}>*</button>
        {['4', '5', '6'].map(n => <button key={n} onClick={() => presionarNumero(n)}>{n}</button>)}
        <button style={{ backgroundColor: '#f39c12' }} onClick={() => manejarOperacion('-')}>-</button>
        {['1', '2', '3'].map(n => <button key={n} onClick={() => presionarNumero(n)}>{n}</button>)}
        <button style={{ backgroundColor: '#f39c12' }} onClick={() => manejarOperacion('+')}>+</button>
        <button style={{ gridColumn: 'span 2' }} onClick={() => presionarNumero('0')}>0</button>
        <button onClick={() => presionarNumero('.')}>.</button>
        <button style={{ backgroundColor: '#27ae60' }} onClick={calcularResultado}>=</button>
      </div>
    </div>
  );
}

export default App;