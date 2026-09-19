const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Path target penyimpanan dari user
const ROOT_UPLOAD_DIR = 'C:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP';

// Izinkan akses CORS
app.use(cors());

// Sajikan file web secara statis (agar bisa dibuka di http://localhost:3000)
app.use(express.static(__dirname));

// Konfigurasi penyimpanan Multer (menyesuaikan struktur folder)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const bidang = req.body.bidang || 'Uncategorized';
    const tahun = req.body.tahun || new Date().getFullYear().toString();
    const jenis = req.body.jenis || 'Lainnya';
    
    // Helper Kapitalisasi
    const capitalize = (str) => {
      if(!str) return '';
      return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    // Buat struktur folder: ROOT / Bidang / Tahun / Jenis
    const destFolder = path.join(ROOT_UPLOAD_DIR, capitalize(bidang), tahun, capitalize(jenis));
    
    // Buat folder jika belum ada (recursive)
    fs.mkdirSync(destFolder, { recursive: true });
    
    cb(null, destFolder);
  },
  filename: function (req, file, cb) {
    // Menyimpan dengan nama file aslinya
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// API Endpoint untuk Upload File
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'Tidak ada file yang diupload.' });
    }
    
    // Kembalikan path absolut sebagai fileUrl agar bisa ditelusuri pengguna jika klik 'Buka File'
    const fileUrl = 'file:///' + req.file.path.replace(/\\/g, '/');
    
    res.json({
      status: 'success',
      fileUrl: fileUrl,
      folderPath: req.file.destination
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Jalankan Server
app.listen(port, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(` SIMARSIP Local Server berjalan di port ${port}`);
  console.log(` Buka di browser: http://localhost:${port}`);
  console.log(` Menyimpan arsip fisik ke: ${ROOT_UPLOAD_DIR}`);
  console.log('====================================================');
});
