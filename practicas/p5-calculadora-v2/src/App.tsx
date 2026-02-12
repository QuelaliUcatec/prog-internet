// App.tsx — Calculadora completa en un solo archivo

import { useState, useEffect } from "react";

type State = { display: string; first: string; op: string; waiting: boolean };
const init: State = { display: "0", first: "", op: "", waiting: false };

const calc = (a: string, b: string, op: string): number => {
  const [x, y] = [parseFloat(a), parseFloat(b)];
  return op === "+" ? x + y : op === "-" ? x - y : op === "*" ? x * y : y !== 0 ? x / y : 0;
};

export default function App() {
  const [s, setS] = useState<State>(init);
  const [history, setHistory] = useState<string[]>([]);

  // Agrega un dígito o punto decimal a la pantalla
  const num = (n: string) => setS((p) => ({
    ...p,
    display: p.waiting ? n : p.display === "0" && n !== "." ? n : p.display.includes(".") && n === "." ? p.display : p.display + n,
    waiting: false,
  }));

  // Guarda el operador y el primer número
  const op = (o: string) => setS((p) => {
    if (p.op && !p.waiting) {
      const r = calc(p.first, p.display, p.op);
      return { display: String(r), first: String(r), op: o, waiting: true };
    }
    return { ...p, first: p.display, op: o, waiting: true };
  });

  // Calcula el resultado y guarda en historial
  const eq = () => setS((p) => {
    if (!p.op || p.waiting) return p;
    const r = calc(p.first, p.display, p.op);
    setHistory((h) => [`${p.first} ${p.op} ${p.display} = ${r}`, ...h].slice(0, 9));
    return { display: String(r), first: "", op: "", waiting: false };
  });

  // Soporte de teclado
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (/^[0-9.]$/.test(e.key)) num(e.key);
      if (["+", "-", "*", "/"].includes(e.key)) op(e.key);
      if (e.key === "Enter" || e.key === "=") eq();
      if (e.key === "Escape") setS(init);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [s]);

  // Colores por tipo de botón
  const color: Record<string, string> = {
    op:     "#f59e0b",
    eq:     "#f59e0b",
    action: "#71717a",
    wide:   "#3f3f46",
    empty:  "transparent",
    "":     "#3f3f46",
  };

  // [label, acción, variante]
  const buttons: [string, () => void, string][] = [
    ["C",   () => setS(init),                                                    "action"],
    ["+/-", () => setS((p) => ({ ...p, display: String(parseFloat(p.display) * -1) })), "action"],
    ["",    () => {},                                                             "empty" ],
    ["/",   () => op("/"),                                                        "op"    ],
    ["7",   () => num("7"), ""], ["8", () => num("8"), ""], ["9", () => num("9"), ""],
    ["×",   () => op("*"),  "op"],
    ["4",   () => num("4"), ""], ["5", () => num("5"), ""], ["6", () => num("6"), ""],
    ["-",   () => op("-"),  "op"],
    ["1",   () => num("1"), ""], ["2", () => num("2"), ""], ["3", () => num("3"), ""],
    ["+",   () => op("+"),  "op"],
    ["0",   () => num("0"), "wide"],
    [".",   () => num("."), ""],
    ["=",   eq,             "eq" ],
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", padding: "16px" }}>

      {/* Calculadora */}
      <div style={{ background: "#27272a", borderRadius: "24px", padding: "16px", width: "288px", boxShadow: "0 25px 50px rgba(0,0,0,0.8)" }}>

        {/* Pantalla */}
        <div style={{ background: "#18181b", borderRadius: "16px", padding: "16px 20px", marginBottom: "12px", textAlign: "right" }}>
          <div style={{ color: "#f59e0b", fontSize: "18px", minHeight: "24px" }}>{s.op}</div>
          <div style={{ color: "#fff", fontWeight: 100, fontSize: s.display.length > 9 ? "2rem" : s.display.length > 6 ? "2.5rem" : "3.5rem", lineHeight: 1 }}>
            {s.display}
          </div>
        </div>

        {/* Grilla de botones — 4 columnas con estilos inline para garantizar el layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {buttons.map(([label, action, variant], i) => (
            <button
              key={i}
              onClick={action}
              style={{
                gridColumn: variant === "wide" ? "span 2" : "span 1",
                background: color[variant],
                border: "none",
                borderRadius: "16px",
                height: "64px",
                color: variant === "empty" ? "transparent" : "#fff",
                fontSize: "20px",
                fontWeight: 300,
                cursor: variant === "empty" ? "default" : "pointer",
                transition: "opacity 0.1s, transform 0.1s",
                pointerEvents: variant === "empty" ? "none" : "auto",
              }}
              onMouseEnter={(e) => { if (variant !== "empty") (e.target as HTMLElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
              onMouseDown={(e)  => { (e.target as HTMLElement).style.transform = "scale(0.95)"; }}
              onMouseUp={(e)    => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Historial */}
      {history.length > 0 && (
        <div style={{ background: "#27272a", borderRadius: "24px", padding: "16px", width: "240px", boxShadow: "0 25px 50px rgba(0,0,0,0.8)", alignSelf: "flex-start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ color: "#a1a1aa", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" }}>Historial</span>
            <button onClick={() => setHistory([])} style={{ background: "none", border: "none", color: "#71717a", cursor: "pointer", fontSize: "12px" }}>
              Limpiar
            </button>
          </div>
          {history.map((e, i) => (
            <p key={i} style={{ color: "#d4d4d8", fontSize: "14px", textAlign: "right", borderBottom: i < history.length - 1 ? "1px solid #3f3f46" : "none", padding: "6px 0", margin: 0 }}>
              {e}
            </p>
          ))}
        </div>
      )}

    </div>
  );
}
