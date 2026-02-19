import "./Filters.css";

interface Props {
  minAttack: number;
  minDefense: number;
  minSpeed: number;
  setMinAttack: (value: number) => void;
  setMinDefense: (value: number) => void;
  setMinSpeed: (value: number) => void;
}

const Filters = ({
  minAttack,
  minDefense,
  minSpeed,
  setMinAttack,
  setMinDefense,
  setMinSpeed,
}: Props) => {
  return (
    <div className="filters">
      <div>
        <label>Ataque mínimo: {minAttack}</label>
        <input
          type="range"
          min={0}
          max={150}
          value={minAttack}
          onChange={(e) => setMinAttack(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Defensa mínima: {minDefense}</label>
        <input
          type="range"
          min={0}
          max={150}
          value={minDefense}
          onChange={(e) => setMinDefense(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Velocidad mínima: {minSpeed}</label>
        <input
          type="range"
          min={0}
          max={150}
          value={minSpeed}
          onChange={(e) => setMinSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Filters;