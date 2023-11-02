import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterList from "./components/CharacterList";

function App() {
  const [query, setQuery] = useState("")
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const url = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    axios
      .get(url)
      .then((data) => {
        setCharacters(data.data.results);
        setInfo(data.data.info);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNextPage = () => {
    fetchCharacters(info.next);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    fetchCharacters(info.prev);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchCharacters(url);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
            setCharacters(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    fetchData()
}, [query])

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand text-uppercase" href="/">
        Rick and Morty
        </a>
      </div>
      <div className="search">
          <input type="text"
          placeholder={"Search Character"}
          className={"input"}
          onChange={event => setQuery(event.target.value)}
          value={query}
                />
      </div>
    </nav>
      <div className="container py-5">
        <nav>
          <ul className="pagination justify-content-center">
            {info.prev ? (
              <li className="page-item">
                <button className="page-link" onClick={handlePreviousPage}>
                  Previous
                </button>
              </li>
            ) : null}
            {info.next ? (
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>

      <CharacterList characters={characters} />

      <div className="container pb-5">
        <nav>
          <ul className="pagination justify-content-center">
            {info.prev ? (
              <li className="page-item">
                <button className="page-link" onClick={handlePreviousPage}>
                  Previous
                </button>
              </li>
            ) : null}
            {info.next ? (
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default App;