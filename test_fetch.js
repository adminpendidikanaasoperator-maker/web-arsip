const fetch = require('node-fetch');

const GAS_URL = 'https://script.google.com/macros/s/AKfycbygsAY90lqF2Ax1SzWZ7NGMpPPWMhYa8kwwvzFJn9hVJVmY8BqWXhC1v-SpRTTuqHfSzA/exec';

async function testFetch() {
  console.log("Fetching from GAS...");
  const start = Date.now();
  try {
    const res = await fetch(GAS_URL + '?action=loadAll');
    const json = await res.json();
    console.log(`Fetch took ${Date.now() - start}ms`);
    if(json.data) {
      console.log(`Found ${json.data.arsip?.length} arsip, ${json.data.mahasiswa?.length} mhs`);
    } else {
      console.log("No data found:", json);
    }
  } catch (err) {
    console.error("Error fetching:", err);
  }
}

testFetch();
