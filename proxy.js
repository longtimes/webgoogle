import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 8080;

// API proxy
app.get('/proxy', async (req, res) => {
  try {
    const matram = req.query.matram || '553100';
    const thoigianbd = req.query.thoigianbd || "'2025-10-01 00:00:00'";
    const thoigiankt = req.query.thoigiankt || "'2025-10-01 23:59:00'";

    const apiUrl = `http://203.209.181.170:2018/API_TTB/json/solieu.php?matram=${matram}&ten_table=mucnuoc_oday&sophut=60&tinhtong=0&thoigianbd=${encodeURIComponent(thoigianbd)}&thoigiankt=${encodeURIComponent(thoigiankt)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json({ matram, data });
  } catch (error) {
    console.error('Error in proxy:', error);
    res.status(500).json({ error: error.message });
  }
});

// Phục vụ file static (index.html)
app.use(express.static('.'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
