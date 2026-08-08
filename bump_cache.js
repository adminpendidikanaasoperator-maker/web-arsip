const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');
index = index.replace(/loader\.js\?v=\d+/g, 'loader.js?v=1013');
index = index.replace(/generator\.js\?v=\d+/g, 'generator.js?v=1013');
index = index.replace(/auth\.js\?v=\d+/g, 'auth.js?v=1013');
index = index.replace(/admin\.js\?v=\d+/g, 'admin.js?v=1013');
index = index.replace(/app\.js\?v=\d+/g, 'app.js?v=1013');
fs.writeFileSync('index.html', index);
console.log('Bumped cache to 1013');
