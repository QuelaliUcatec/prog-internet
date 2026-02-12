import { useState } from 'react';
import './index.css';
// Tipos definidos
type Operation = '+' | '-' | '*' | '/' | null;

export default function App() {
  const [currentDisplay, setCurrentDisplay] = useState<string>('0');
  const [previousVal, setPreviousVal] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [overwrite, setOverwrite] = useState<boolean>(false);

  // --- Lógica de Negocio ---

  const calculateResult = (): string => {
    if (!previousVal || !operation) return currentDisplay;

    const curr = parseFloat(currentDisplay);
    const prev = parseFloat(previousVal);

    if (isNaN(curr) || isNaN(prev)) return 'Error';

    let result = 0;

    switch (operation) {
      case '+': result = prev + curr; break;
      case '-': result = prev - curr; break;
      case '*': result = prev * curr; break;
      case '/': 
        if (curr === 0) return 'Error'; // Manejo de error
        result = prev / curr; 
        break;
      default: return currentDisplay;
    }

    return String(result);
  };

  const handleNumber = (num: string) => {
    if (currentDisplay === 'Error') {
      setCurrentDisplay(num);
      setPreviousVal(null);
      setOperation(null);
      setOverwrite(false);
      return;
    }

    if (currentDisplay.includes('.') && num === '.') return;

    if (overwrite) {
      setCurrentDisplay(num);
      setOverwrite(false);
    } else {
      setCurrentDisplay(currentDisplay === '0' && num !== '.' ? num : currentDisplay + num);
    }
  };

  const handleDelete = () => {
    if (currentDisplay === 'Error') {
      handleClear();
      return;
    }
    if (overwrite) {
      setCurrentDisplay('0');
      setOverwrite(false);
      return;
    }
    if (currentDisplay.length === 1) {
      setCurrentDisplay('0');
    } else {
      setCurrentDisplay(currentDisplay.slice(0, -1));
    }
  };

  const handleClear = () => {
    setCurrentDisplay('0');
    setPreviousVal(null);
    setOperation(null);
    setOverwrite(false);
  };

  const handleOperation = (op: Operation) => {
    if (currentDisplay === 'Error') return;

    if (previousVal === null) {
      setPreviousVal(currentDisplay);
    } else if (operation) {
      const result = calculateResult();
      setPreviousVal(result);
      setCurrentDisplay(result);
      if (result === 'Error') {
        setOperation(null);
        setOverwrite(true);
        return;
      }
    }
    setOperation(op);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (!operation || !previousVal) return;
    const result = calculateResult();
    setCurrentDisplay(result);
    setPreviousVal(null);
    setOperation(null);
    setOverwrite(true);
  };

  // --- Componentes Visuales con Tailwind ---

  const Button = ({ 
    text, onClick, variant = 'default', className = '' 
  }: { 
    text: string, onClick: () => void, variant?: 'default' | 'operator' | 'action' | 'equals', className?: string 
  }) => {
    
    // Clases base para todos los botones
    const baseStyle = "h-16 text-2xl font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-lg select-none";
    
    // Diccionario de estilos según la variante
    const variants = {
      default: "bg-slate-700 text-white hover:bg-slate-600",
      operator: "bg-amber-500 text-white hover:bg-amber-400",
      action: "bg-slate-500 text-slate-100 hover:bg-slate-400",
      equals: "bg-emerald-500 text-white hover:bg-emerald-400"
    };

    return (
      <button 
        onClick={onClick} 
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {text}
      </button>
    );
  };

  return (
    // Contenedor Principal (Fondo oscuro completo)
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans">
      
      {/* Calculadora (Cuerpo) */}
      <div className="w-full max-w-sm bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-700">
        
        {/* Pantalla */}
        <div className="bg-slate-950 p-4 rounded-xl mb-6 flex flex-col items-end justify-center h-28 border border-slate-700 shadow-inner">
          <div className="text-slate-400 text-sm h-6 mb-1 font-mono">
            {previousVal} {operation}
          </div>
          <div className="text-white text-5xl font-light tracking-wide overflow-hidden whitespace-nowrap w-full text-right">
            {currentDisplay}
          </div>
        </div>

        {/* Grid de Botones */}
        <div className="grid grid-cols-4 gap-3">
          
          <Button text="AC" onClick={handleClear} variant="action" />
          <Button text="DEL" onClick={handleDelete} variant="action" />
          <Button text="/" onClick={() => handleOperation('/')} variant="operator" />
          <Button text="x" onClick={() => handleOperation('*')} variant="operator" />

          <Button text="7" onClick={() => handleNumber('7')} />
          <Button text="8" onClick={() => handleNumber('8')} />
          <Button text="9" onClick={() => handleNumber('9')} />
          <Button text="-" onClick={() => handleOperation('-')} variant="operator" />

          <Button text="4" onClick={() => handleNumber('4')} />
          <Button text="5" onClick={() => handleNumber('5')} />
          <Button text="6" onClick={() => handleNumber('6')} />
          <Button text="+" onClick={() => handleOperation('+')} variant="operator" />

          <Button text="1" onClick={() => handleNumber('1')} />
          <Button text="2" onClick={() => handleNumber('2')} />
          <Button text="3" onClick={() => handleNumber('3')} />
          
          {/* Botón Igual (ocupa 2 filas) */}
          <Button text="=" onClick={handleEquals} variant="equals" className="row-span-2 h-auto" />

          {/* Botón Cero (ocupa 2 columnas) */}
          <Button text="0" onClick={() => handleNumber('0')} className="col-span-2" />
          <Button text="." onClick={() => handleNumber('.')} />
        </div>

      </div>
    </div>
  );
}