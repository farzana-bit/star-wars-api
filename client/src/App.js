import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './components/CharacterCard';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalStarships, setTotalStarships] = useState(0);
  const [loading, setLoading] = useState(false);

  // Debounce the search input to avoid excessive calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // Adjust delay as needed
    return () => clearTimeout(handler);
  }, [search]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const params = debouncedSearch.trim()
        ? { search: debouncedSearch.trim() }
        : { page };

      const res = await axios.get('http://localhost:5000/api/characters', { params });
      setCharacters(res.data.results || []);
      setTotalPages(Math.ceil(res.data.total_records / 10));
    } catch (err) {
      console.error('Error fetching characters:', err);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStarships = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/starships');
      setTotalStarships(res.data.total_records || 0);
    } catch (err) {
      console.error('Error fetching starships:', err);
    }
  };

  // Refetch when search or page changes
  useEffect(() => {
    fetchCharacters();
  }, [debouncedSearch, page]);

  useEffect(() => {
    fetchStarships();
  }, []);

  return (
    <div className="app">
      <h1>Star Wars Characters</h1>
      <p>Total Starships: {totalStarships}</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <button onClick={fetchCharacters} disabled={loading}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading characters...</p>
      ) : characters.length === 0 ? (
        <p>No characters found.</p>
      ) : (
        <div className="grid">
          {characters.map((char) => (
            <CharacterCard
              key={char.uid || char.name}
              name={char.name}
              gender={char.gender}
              birth_year={char.birth_year}
              homeworld={char.homeworld}
              eye_color={char.eye_color}
              hair_color={char.hair_color}
              height={char.height}
              mass={char.mass}
              skin_color={char.skin_color}
              created={char.created}
              edited={char.edited}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(1)} disabled={page === 1}>
            First
          </button>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            &lt; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((num) => num === 1 || num === totalPages || Math.abs(num - page) <= 2)
            .map((num, index, arr) => (
              <React.Fragment key={num}>
                {index > 0 && num - arr[index - 1] > 1 && <span>...</span>}
                <button
                  onClick={() => setPage(num)}
                  className={num === page ? 'active' : ''}
                >
                  {num}
                </button>
              </React.Fragment>
            ))}

          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            Next &gt;
          </button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            Last
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
