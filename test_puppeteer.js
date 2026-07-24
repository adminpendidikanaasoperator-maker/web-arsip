const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  
  const url = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  console.log('Navigating to:', url);
  
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log('Page loaded.');
  
  // Try to create a dummy record in Firestore
  await page.evaluate(async () => {
    try {
      console.log('Attempting to save to Firestore...');
      await db.collection('arsip').doc('test_id_123').set({ test: 'data' });
      console.log('Firestore write success!');
      
      const snap = await db.collection('arsip').get();
      console.log('Firestore read success. Docs count:', snap.docs.length);
    } catch(err) {
      console.error('Firestore Error:', err.message);
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
