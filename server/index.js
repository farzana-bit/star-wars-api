const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;
app.use(cors());

// In-memory cache
let cachedCharacters = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

app.get('/api/characters', async (req, res) => {
  const { search = '', page = 1 } = req.query;
  const limit = 10;

  try {
    const now = Date.now();
    const shouldRefetch = cachedCharacters.length === 0 || (now - cacheTimestamp > CACHE_DURATION);

    if (shouldRefetch) {
      console.log("⏳ Fetching fresh characters from SWAPI...");
      let allCharacters = [];
      let currentPage = 1;
      let totalPages = 1;

      do {
        const response = await axios.get('https://swapi.tech/api/people', {
          params: { page: currentPage, limit }
        });

        if (!response.data || !response.data.results) break;

        allCharacters = allCharacters.concat(response.data.results);
        totalPages = Math.ceil(response.data.total_records / limit);
        currentPage++;
      } while (currentPage <= totalPages);

      // Enrich all characters once and cache them
      cachedCharacters = await Promise.all(
        allCharacters.map(async (char) => {
          try {
            const detailRes = await axios.get(char.url);
            const data = detailRes.data.result.properties;

            return {
              uid: char.uid,
              name: data.name,
              birth_year: data.birth_year,
              eye_color: data.eye_color,
              hair_color: data.hair_color,
              skin_color: data.skin_color,
              height: data.height,
              mass: data.mass,
              gender: data.gender,
              homeworld: data.homeworld,
              created: data.created,
              edited: data.edited,
              url: data.url
            };
            
          } catch (err) {
            console.error(`❌ Failed to fetch details for ${char.name}:`, err.message);
            return null;
          }
        })
      );

      // Filter out failed fetches
      cachedCharacters = cachedCharacters.filter(Boolean);
      cacheTimestamp = now;
      console.log("✅ Characters cached.");
    } else {
      console.log("✅ Serving characters from cache.");
    }

    // Filter by search
    let filtered = [...cachedCharacters];
    if (search.trim()) {
      const keyword = search.trim().toLowerCase();
      filtered = filtered.filter(char =>
        char.name.toLowerCase().includes(keyword)
      );
    }

    // Paginate
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);
    const totalRecords = filtered.length;
    const totalPages = Math.ceil(totalRecords / limit);

    res.json({
      results: paginated,
      total_records: totalRecords,
      total_pages: totalPages,
    });

  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

app.get('/api/starships', async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const response = await axios.get('https://www.swapi.tech/api/starships', {
      params: { page }
    });

    res.json({
      results: response.data.results,
      total_records: response.data.total_records || response.data.count || response.data.results.length,
    });

  } catch (error) {
    console.error('Starships API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch starships' });
  }
});

app.listen(PORT, () => {
  console.log("🚀 Server starting...");
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});
