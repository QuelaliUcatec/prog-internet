import { useState } from "react";
import "./calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState<string>("");

  const addValue = (value: string) => {
    setDisplay(display + value);
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const calculate = () => {
    try {
      const result = eval(display);
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display || "0"}</div>

      <div className="buttons">
        <button onClick={() => addValue("1")}>1</button>
        <button onClick={() => addValue("2")}>2</button>
        <button onClick={() => addValue("3")}>3</button>
        <button className="op" onClick={() => addValue("+")}>+</button>

        <button onClick={() => addValue("4")}>4</button>
        <button onClick={() => addValue("5")}>5</button>
        <button onClick={() => addValue("6")}>6</button>
        <button className="op" onClick={() => addValue("-")}>-</button>

        <button onClick={() => addValue("7")}>7</button>
        <button onClick={() => addValue("8")}>8</button>
        <button onClick={() => addValue("9")}>9</button>
        <button className="op" onClick={() => addValue("*")}>*</button>

        <button onClick={calculate}>=</button>
        <button onClick={() => addValue("0")}>0</button>
        <button onClick={() => addValue(".")}>.</button>
        <button className="op" onClick={() => addValue("/")}>/</button>
      </div>

      <button className="clear" onClick={clearDisplay}>Clear</button>
    </div>
  );
};

export default Calculator;
