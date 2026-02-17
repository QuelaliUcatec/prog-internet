interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">
        🔍
      </span>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-2xl text-white placeholder-white/30 outline-none transition-all duration-200"
        style={{
          backgroundColor: '#ffffff0d',
          border: '1px solid #ffffff1a',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#e53e3e88';
          e.target.style.boxShadow = '0 0 0 3px #e53e3e22';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#ffffff1a';
          e.target.style.boxShadow = 'none';
        }}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}