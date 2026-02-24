import { useEffect, useState } from "react";
import { getNasaImages, type NasaImage } from "./services/nasaService";
import Card from "./components/Card";

function App() {
  const [images, setImages] = useState<NasaImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNasaImages()
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-4xl text-white text-center mb-10">
         NASA EXPLORER
      </h1>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images
          .filter(item => item.media_type === "image")
          .map((item, index) => (
            <Card key={index} data={item} />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;