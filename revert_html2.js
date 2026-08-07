const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// Pages
let pagesHtml = '';
const actualPages = fs.readdirSync('views').filter(f => f.endsWith('.html'));
actualPages.forEach(p => {
  pagesHtml += fs.readFileSync(`views/${p}`, 'utf8') + '\n';
});
index = index.replace('<main id="mainContent" class="main-content"></main>', '<main id="mainContent" class="main-content">\n' + pagesHtml + '\n</main>');

fs.writeFileSync('index.html', index);
console.log('Reverted HTML modularization!');
