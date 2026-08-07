const fs = require('fs');

let index = fs.readFileSync('index.html', 'utf8');

// Pages
let pagesHtml = '';
const actualPages = fs.readdirSync('views').filter(f => f.endsWith('.html'));
actualPages.forEach(p => {
  pagesHtml += fs.readFileSync(`views/${p}`, 'utf8') + '\n';
});

// Inject right before toastStack
const target = '<div class="toast-stack" id="toastStack">';
index = index.replace(target, '<div id="mainContent" class="main-content">\n' + pagesHtml + '\n</div>\n' + target);

fs.writeFileSync('index.html', index);
console.log('Reverted HTML modularization for real!');
