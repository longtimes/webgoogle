// proxy.js
import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Phục vụ static file (index.html)
app.use(express.static(__dirname));

// Route proxy
app.get('/proxy', async (req, res) => {
  const matram = req.query.matram || '553100';
  const thoigianbd = req.query.thoigianbd || "'2025-10-01 00:00:00'";
  const thoigiankt = req.query.thoigiankt || "'2025-10-01 23:59:00'";

  const apiUrl = `http://203.209.181.170:2018/API_TTB/json/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${encodeURIComponent(thoigianbd)}&thoigiankt=${encodeURIComponent(thoigiankt)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json({ matram, data });
  } catch (error) {
    console.error('Error fetching API:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
