const PROJECT_ID = 'arsip-aas';
const API_KEY = 'AIzaSyCdOtyCix06Cty82u7ls1YT-WhKcUMpjIo';

function fromFirestoreValue(val) {
  if (!val) return null;
  if (val.stringValue !== undefined) return val.stringValue;
  if (val.integerValue !== undefined) return parseInt(val.integerValue, 10);
  if (val.doubleValue !== undefined) return parseFloat(val.doubleValue);
  if (val.booleanValue !== undefined) return val.booleanValue;
  if (val.nullValue !== undefined) return null;
  if (val.arrayValue) return (val.arrayValue.values || []).map(fromFirestoreValue);
  if (val.mapValue) {
    const obj = {};
    for (const k in val.mapValue.fields) {
      obj[k] = fromFirestoreValue(val.mapValue.fields[k]);
    }
    return obj;
  }
  return null;
}

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

function extractRabData(item) {
    if (!item.keterangan) return { amount: 0, status: 'Direncanakan' };
    
    let amount = 0;
    let status = 'Direncanakan';

    // Parse status
    const statMatch = item.keterangan.match(/Status:\s*([^\n]+)/i);
    if (statMatch) {
        status = statMatch[1].trim();
    } else if (item.keterangan.toLowerCase().includes('disetujui')) {
        status = 'Disetujui';
    } else if (item.keterangan.toLowerCase().includes('terealisasi')) {
        status = 'Terealisasi';
    }

    // Parse amount
    // Simspras: "Total: Rp 1.500.000"
    const totalMatch = item.keterangan.match(/Total:\s*Rp\s*([0-9.,]+)/i);
    if (totalMatch) {
        amount = parseInt(totalMatch[1].replace(/[^0-9]/g, ''), 10) || 0;
    } else {
        // Simlab: "Qty: 10 \nHarga: Rp 15000"
        const qtyMatch = item.keterangan.match(/Qty:\s*([0-9]+)/i);
        const priceMatch = item.keterangan.match(/Harga:\s*Rp\s*([0-9.,]+)/i);
        if (qtyMatch && priceMatch) {
            const qty = parseInt(qtyMatch[1], 10) || 1;
            const price = parseInt(priceMatch[1].replace(/[^0-9]/g, ''), 10) || 0;
            amount = qty * price;
        }
    }

    return { amount, status };
}

async function migrate() {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/arsip?pageSize=1000&key=${API_KEY}`;
    
    try {
        const res = await fetch(url);
        const json = await res.json();
        
        let count = 0;
        for (const doc of json.documents || []) {
            const idPath = doc.name.split('/');
            const id = idPath[idPath.length - 1];
            
            const fields = doc.fields || {};
            const jenis = fromFirestoreValue(fields.jenis);
            
            if (jenis === 'umum_rab' || jenis === 'k6_1' || jenis === 'k2_1') { // Focus on RAB mainly
                const item = {};
                for (const k in fields) item[k] = fromFirestoreValue(fields[k]);
                
                // If it already has rab_amount, skip or override? We override just to be safe.
                const { amount, status } = extractRabData(item);
                
                // We do a PATCH to update just rab_amount and rab_status
                const patchUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/arsip/${id}?updateMask.fieldPaths=rab_amount&updateMask.fieldPaths=rab_status&key=${API_KEY}`;
                
                const patchBody = {
                    fields: {
                        rab_amount: toFirestoreValue(amount),
                        rab_status: toFirestoreValue(status)
                    }
                };

                const resPatch = await fetch(patchUrl, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(patchBody)
                });
                
                if (resPatch.ok) {
                    count++;
                } else {
                    console.error('Failed to patch', id, await resPatch.text());
                }
            }
        }
        console.log(`Migrated ${count} RAB documents.`);
    } catch (e) {
        console.error('Migration failed:', e);
    }
}

migrate();
