const GAS_URL = 'https://script.google.com/macros/s/AKfycbygsAY90lqF2Ax1SzWZ7NGMpPPWMhYa8kwwvzFJn9hVJVmY8BqWXhC1v-SpRTTuqHfSzA/exec';
const PROJECT_ID = 'arsip-aas';

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'string') return { stringValue: val };
  if (typeof val === 'number') return Number.isInteger(val) ? { integerValue: val.toString() } : { doubleValue: val };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (typeof val === 'object') {
    const fields = {};
    for (const k in val) fields[k] = toFirestoreValue(val[k]);
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

async function run() {
  console.log("Fetching data from GAS...");
  const res = await fetch(GAS_URL + '?action=loadAll');
  const json = await res.json();
  
  const collections = ['arsip', 'activity', 'mahasiswa', 'sdm'];
  for (const col of collections) {
    const items = json.data[col] || [];
    console.log(`Menemukan ${items.length} item di ${col}. Mulai upload via REST...`);
    
    let count = 0;
    for (const item of items) {
      if (!item.id) continue;
      try {
        const fields = {};
        for (const k in item) fields[k] = toFirestoreValue(item[k]);
        
        const apiKey = 'AIzaSyCdOtyCix06Cty82u7ls1YT-WhKcUMpjIo';
        const docId = item.id.toString();
        const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${col}/${docId}?key=${apiKey}`;
        
        const resPost = await fetch(url, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields })
        });
        
        if (!resPost.ok) {
           const errJson = await resPost.text();
           console.error(`Gagal upload id ${docId}:`, errJson);
        } else {
           count++;
           if (count % 5 === 0) console.log(`  Uploaded ${count} to ${col}`);
        }
      } catch (err) {
        console.error(`Error network id ${item.id}:`, err.message);
      }
    }
    console.log(`Selesai koleksi ${col}: ${count} item.`);
  }
  console.log("MIGRASI LOKAL SELESAI!");
}

run();
