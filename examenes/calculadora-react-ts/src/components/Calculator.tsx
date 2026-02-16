import { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const handleClick = (value: string) => {
    if (value === "=") {
      try {
        const result = eval(display).toString();
        setHistory([`${display} = ${result}`, ...history]);
        setDisplay(result);
      } catch {
        setDisplay("Error");
      }
    } else if (value === "C") {
      setDisplay("");
    } else {
      setDisplay(display + value);
    }
  };

  // Soporte teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ("0123456789+-*/.".includes(e.key)) {
        setDisplay((prev) => prev + e.key);
      }
      if (e.key === "Enter") {
        handleClick("=");
      }
      if (e.key === "Backspace") {
        setDisplay((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [display]);

  const buttons = [
    "7","8","9","/",
    "4","5","6","*",
    "1","2","3","-",
    "0",".","C","+",
    "="
  ];

  return (
    <div className="calculator">
      <div className="display">{display || "0"}</div>

      <div className="keypad">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`btn ${
              btn === "="
                ? "equal"
                : "0123456789.".includes(btn)
                ? "number"
                : "operator"
            }`}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="history">
        <h4>Historial</h4>
        {history.slice(0, 5).map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
