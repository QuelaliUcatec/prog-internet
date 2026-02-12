import { useState, useEffect } from 'react';

const url = "https://pokeapi.co/api/v2/pokemon?limit=3000";

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <ul>
        {data?.results?.map((item) => {
          return <li>
            <a href={item.url}>{item.name}</a>
          </li>;
        })}
      </ul>
    </>
  )
}

export default App
