import  { saveToLogbook, type NasaImage } from "../services/nasaService";

interface Props {
  data: NasaImage;
}

const Card = ({ data }: Props) => {
  const handleSave = async () => {
    const response = await saveToLogbook(data);
    alert("Guardado con ID: " + response.id);
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300">
      <img
      src={data.url}
      alt={data.title}
      className="w-full h-60 object-cover"
      onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{data.title}</h2>
        <p className="text-sm text-gray-400 mb-4">
          {data.explanation.substring(0, 100)}...
        </p>
        <button onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          ADD TO LOGBOOK
        </button>
      </div>
    </div>
  );
};

export default Card;