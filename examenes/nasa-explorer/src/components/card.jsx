export default function Card({ item, onOpen }) {
  return (
    <div className="card" onClick={onOpen}>
      <div className="card-image">
        <img 
          src={item.url} 
          alt={item.title} 
          loading="lazy" // Mejora el rendimiento
          style={{ filter: 'contrast(1.1) brightness(0.9)' }} 
        />
      </div>
      <div className="card-content">
        <span className="nasa-id">SOURCE: NASA_DATABASE // {item.date}</span>
        <h3>{item.title}</h3>
        <div className="card-footer">
           <button className="btn-action">EXTRAER DATOS</button>
        </div>
      </div>
    </div>
  );
}