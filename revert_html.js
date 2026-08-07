const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// Modals
let modalsHtml = '';
const modals = ['arsip', 'user', 'sdm_mhs'];
modals.forEach(m => {
  modalsHtml += fs.readFileSync(`views/modals/${m}.html`, 'utf8') + '\n';
});
index = index.replace('<div id="modalsContainer"></div>', '<div id="modalsContainer">\n' + modalsHtml + '\n</div>');

// Pages
let pagesHtml = '';
const pages = ['dashboard', 'semua', 'dept', 'activity', 'mahasiswa', 'sdm', 'banpt', 'lamptkes', 'users', 'generator', 'arsip', 'analytics', 'aktivitas'];
// Wait, 'semua' doesn't exist? 'arsip' was extracted in split_html2.js
const actualPages = fs.readdirSync('views').filter(f => f.endsWith('.html'));
actualPages.forEach(p => {
  pagesHtml += fs.readFileSync(`views/${p}`, 'utf8') + '\n';
});
index = index.replace('<main id="mainContent" class="main-content"></main>', '<main id="mainContent" class="main-content">\n' + pagesHtml + '\n</main>');

fs.writeFileSync('index.html', index);
console.log('Reverted HTML modularization!');
