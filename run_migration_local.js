const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCdOtyCix06Cty82u7ls1YT-WhKcUMpjIo",
  projectId: "arsip-aas"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const GAS_URL = 'https://script.google.com/macros/s/AKfycbygsAY90lqF2Ax1SzWZ7NGMpPPWMhYa8kwwvzFJn9hVJVmY8BqWXhC1v-SpRTTuqHfSzA/exec';

async function run() {
  console.log("Fetching from GAS...");
  const res = await fetch(GAS_URL + '?action=loadAll');
  const json = await res.json();
  
  const collections = ['arsip', 'activity', 'mahasiswa', 'sdm'];
  for (const col of collections) {
    const items = json.data[col] || [];
    console.log(`Menemukan ${items.length} item di ${col}. Mulai upload...`);
    
    let count = 0;
    for (const item of items) {
      if (!item.id) continue;
      try {
        await db.collection(col).doc(item.id.toString()).set(item);
        count++;
        if (count % 5 === 0) console.log(`  Uploaded ${count} to ${col}`);
      } catch (err) {
        console.error(`Gagal upload id ${item.id}:`, err.message);
      }
    }
    console.log(`Selesai koleksi ${col}.`);
  }
  console.log("MIGRASI LOKAL SELESAI!");
  process.exit(0);
}

run();
