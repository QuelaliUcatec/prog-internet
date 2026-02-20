import { useState } from 'react';

const MetodoPost = () => {
  const [titulo, setTitulo] = useState('');
  const [cuerpo, setCuerpo] = useState('');
  const [respuesta, setRespuesta] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: titulo,
        body: cuerpo,
        userId: 1, // JSONPlaceholder espera un userId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setRespuesta(json);
        console.log('Post creado (simulado):', json);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Crear nuevo post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Cuerpo del post"
          value={cuerpo}
          onChange={(e) => setCuerpo(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      {respuesta && (
        <div>
          <h3>Respuesta de la API:</h3>
          <pre>{JSON.stringify(respuesta, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MetodoPost;