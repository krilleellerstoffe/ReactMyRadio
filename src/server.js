const express = require('express');
let fetch;

// Dynamic import of node-fetch using import()
const importFetch = () => import('node-fetch');

const app = express();

app.use(express.json());

app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    if (!fetch) {
      fetch = await importFetch(); // Fetch the module if not available
    }
    const baseAPIurl = `https://www.giantbomb.com/api/search?api_key=c5748b92bc0ea8fd7d5239f363241e6d77ef65ab&format=json&resources=game&query=${query}`;
    console.log(query)
    const response = await fetch.default(baseAPIurl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
