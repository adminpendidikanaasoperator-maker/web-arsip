const admin = require('firebase-admin');
const fs = require('fs');

console.log('=== SCRIPT SINKRONISASI DATA KEMAHASISWAAN KE PORTAL UTAMA ===');

// --- PENGECEKAN SERVICE ACCOUNT ---
// Cek apakah file kunci (Service Account) sudah tersedia
if (!fs.existsSync('./key_kemahasiswaan.json') || !fs.existsSync('./key_portal.json')) {
    console.error('\n[ERROR] File Service Account tidak ditemukan!');
    console.error('Harap pastikan Anda telah mendownload file Service Account (JSON) dari Firebase Console untuk:');
    console.error('1. Project Web Kemahasiswaan (simpan dengan nama: key_kemahasiswaan.json)');
    console.error('2. Project Portal Utama (simpan dengan nama: key_portal.json)');
    console.error('Tempatkan kedua file tersebut di folder DATA WEB ARSIP ini sebelum menjalankan script.');
    process.exit(1);
}

// 1. Load file JSON Service Account
const serviceAccountKemahasiswaan = require('./key_kemahasiswaan.json');
const serviceAccountPortal = require('./key_portal.json');

// --- INISIALISASI APLIKASI FIREBASE ---
// Aplikasi sumber (Web Kemahasiswaan)
const appKemahasiswaan = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKemahasiswaan)
}, 'KemahasiswaanApp');

// Aplikasi tujuan (Portal Utama)
const appPortal = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPortal)
}, 'PortalApp');

const dbSumber = admin.firestore(appKemahasiswaan);
const dbTujuan = admin.firestore(appPortal);

// --- DAFTAR KOLEKSI YANG AKAN DISINKRONKAN ---
const COLLECTIONS = [
  'alumniData',
  'laporanData',
  'skData',
  'beasiswaData',
  'bemData',
  'anggaranData'
];

async function syncCollection(collectionName) {
  console.log(`\n[-] Sinkronisasi koleksi: ${collectionName}...`);
  
  try {
    // 1. Ambil data dari sumber
    const snapshot = await dbSumber.collection(collectionName).get();
    
    if (snapshot.empty) {
      console.log(`  -> Koleksi ${collectionName} kosong di database asal. Mengabaikan...`);
      return;
    }

    let count = 0;
    
    // 2. Tentukan nama koleksi tujuan (diberi awalan 'kemahasiswaan_')
    const targetCollectionName = `kemahasiswaan_${collectionName}`;
    
    // 3. Simpan setiap dokumen (upsert)
    // Menggunakan doc.id yang sama agar jika dijalankan ulang, data lama diupdate, bukan terduplikasi.
    for (const doc of snapshot.docs) {
      const data = doc.data();
      await dbTujuan.collection(targetCollectionName).doc(doc.id).set(data);
      count++;
    }
    
    console.log(`  -> Berhasil menyalin ${count} dokumen ke koleksi ${targetCollectionName}`);
  } catch (error) {
    console.error(`  -> [ERROR] Gagal menyinkronkan ${collectionName}:`, error);
  }
}

async function runSync() {
  console.log('\nMulai mengambil data...');
  for (const coll of COLLECTIONS) {
    await syncCollection(coll);
  }
  console.log('\n=== SINKRONISASI SELESAI ===');
  process.exit(0);
}

runSync();
