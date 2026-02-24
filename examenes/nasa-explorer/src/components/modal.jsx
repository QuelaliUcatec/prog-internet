export default function Modal({ item, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-body">
          <img src={item.url} alt={item.title} className="modal-img" />
          <div className="modal-text">
            <span className="nasa-id">ARCHIVE DATE: {item.date}</span>
            <h2>{item.title}</h2>
            <p>{item.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}