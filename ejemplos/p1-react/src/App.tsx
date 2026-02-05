import { useState } from 'react'
import './App.css'

function App() {
  const [numero1, setNumero1] = useState<number>()
  const [numero2, setNumero2] = useState<number>()
  const [resultado, setResultado] = useState<number | string>("N/D")

  const calcular = (operacion: string) => {
    const n1 = Number(numero1);
    const n2 = Number(numero2);

    switch (operacion) {
      case "+":
        setResultado(n1 + n2);
        break;
      case "-":
        setResultado(n1 - n2);
        break;
      case "*":
        setResultado(n1 * n2);
        break;
      case "/":
        if (n2 == 0) {
          setResultado("Error - Divisioni por cero")
        }
        else {
          setResultado(n1 / n2);
        }
        break;
      default:
        setResultado("Operacion Invalida!!!");
    }
  }

  return (
    <>
      <h1>Version Calculadora 1.0</h1>

      <div>
        <label>Numero: </label>
        <input
          type="text" 
          value={numero1} 
          onChange={(e) => setNumero1(Number(e.target.value))}
        />
        <label>Numero: </label>
        <input
          type='text' 
          value={numero2} 
          onChange={(e) => setNumero2(Number(e.target.value))}
        />
      </div>

      <div>
         <button onClick={() => calcular('+')}>+</button>
         <button onClick={() => calcular('-')}>-</button>
         <button onClick={() => calcular('*')}>*</button>
         <button onClick={() => calcular('/')}>/</button>
      </div>

      <hr />

      <h2>Resultado: {resultado}</h2>
    </>
  )
}

export default App
