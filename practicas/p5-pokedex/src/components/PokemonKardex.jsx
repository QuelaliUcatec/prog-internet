import React, { useEffect, useState } from 'react';

const PokemonKardex = ({ pokemon, onBack }) => {
  const [logMessages, setLogMessages] = useState([]);

  useEffect(() => {
    // 1. DICCIONARIO DE ESTADÍSTICAS
    const statNamesEs = {
      'hp': 'Puntos de salud',
      'attack': 'Ataque',
      'defense': 'Defensa',
      'special-attack': 'Ataque especial',
      'special-defense': 'Defensa especial',
      'speed': 'Velocidad'
    };

    // 2. PREPARACIÓN DEL MENSAJE
    const nameToRead = pokemon.name.toUpperCase();
    const statsDetail = pokemon.stats
      .map(s => `${statNamesEs[s.stat.name] || s.stat.name}: ${s.base_stat}`)
      .join(". ");
    
    const fullMessage = `Sujeto identificado: ${nameToRead}. Analizando datos biométricos. ${statsDetail}.`;
    const utterance = new SpeechSynthesisUtterance(fullMessage);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 0.8;

    // 3. LÓGICA DE AUDIO (BEEP + VOZ)
    const beep = new Audio('https://www.soundjay.com/buttons/sounds/button-20.mp3');
    beep.volume = 0.2;

    beep.play()
      .then(() => {
        setTimeout(() => {
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }, 300);
      })
      .catch(() => {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });

    // 4. LOGS DE TERMINAL (CORRECCIÓN DEL ERROR DE SETSTATE)
    const messages = [
      `> INICIANDO ESCANEO: ${nameToRead}...`,
      `> RASTREANDO ADN... TIPO ${pokemon.types.map(t => t.type.name.toUpperCase()).join(" / ")}`,
      `> CARGANDO PROTOCOLOS DE COMBATE...`,
      `> ANÁLISIS FINALIZADO CON ÉXITO.`
    ];

    // Usamos un pequeño delay para limpiar y luego mostrar, evitando el error síncrono
    
    const timers = messages.map((msg, i) => {
      return setTimeout(() => {
        setLogMessages(prev => [...prev, msg]);
      }, (i + 1) * 800);
    });

    // LIMPIEZA AL CERRAR O CAMBIAR DE POKEMON
    return () => {
      window.speechSynthesis.cancel();
      beep.pause();
      timers.forEach(t => clearTimeout(t)); // Limpiamos los timers para evitar fugas de memoria
    };
  }, [pokemon]);

  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className="kardex-overlay">
      <div className="kardex-lab-panel glitch-entry">
        <div className="corner tl"></div><div className="corner tr"></div>
        <div className="corner bl"></div><div className="corner br"></div>

        <header className="panel-header">
          <div className="scanner-id">
            <span className="blink-dot">●</span> BIO_SCANNER_VER_2.0_{pokemon.id}
          </div>
          <button className="close-panel" onClick={onBack}>× ABORTAR_ANÁLISIS</button>
        </header>

        <div className="panel-body">
          <div className="visualizer-section">
            <div className="image-container">
              <div className="laser-scanner"></div>
              <div className="radar-circle"></div>
              <img src={imageUrl} alt={pokemon.name} className="pokemon-render" />
              <div className="hologram-grid"></div>
            </div>
            <h1 className="pokemon-name-display">{pokemon.name.toUpperCase()}</h1>
          </div>

          <div className="data-section">
            <div className="data-header">DATOS_DE_RENDIMIENTO</div>
            <div className="stats-list">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name} className="stat-item">
                  <div className="stat-info">
                    <span className="label">{(s.stat.name).replace('-', ' ').toUpperCase()}</span>
                    <span className="value">{s.base_stat}</span>
                  </div>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${(s.base_stat / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="terminal-log-window">
              {logMessages.map((msg, i) => (
                <p key={i} className="log-line">{msg}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonKardex;