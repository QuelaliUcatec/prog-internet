import { TYPE_COLORS } from '../types/pokemon';

const TYPES = [
  'fire', 'water', 'grass', 'electric', 'psychic',
  'ice', 'dragon', 'dark', 'fairy', 'fighting',
  'flying', 'poison', 'ground', 'rock', 'bug',
  'ghost', 'steel', 'normal',
];

interface TypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
      <button
        onClick={() => onTypeChange('')}
        className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200"
        style={{
          backgroundColor: selectedType === '' ? '#e53e3e' : '#ffffff11',
          color: 'white',
          border: `1px solid ${selectedType === '' ? '#e53e3e' : '#ffffff22'}`,
        }}
      >
        Todos
      </button>

      {TYPES.map((type) => {
        const isSelected = selectedType === type;
        const color = TYPE_COLORS[type] || '#666';
        return (
          <button
            key={type}
            onClick={() => onTypeChange(isSelected ? '' : type)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200"
            style={{
              backgroundColor: isSelected ? color : `${color}22`,
              color: isSelected ? 'white' : color,
              border: `1px solid ${color}55`,
            }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}