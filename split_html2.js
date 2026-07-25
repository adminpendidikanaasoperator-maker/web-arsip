const fs = require('fs');

const file = 'c:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP\\index.html';
let html = fs.readFileSync(file, 'utf8');

const pages = ['arsip', 'analytics', 'aktivitas'];

pages.forEach(p => {
  const startStr = `<main class="page hidden" id="page-${p}">`;
  let startIdx = html.indexOf(startStr);
  
  if (startIdx !== -1) {
    let endIdx = html.indexOf('</main>', startIdx);
    if (endIdx !== -1) {
      endIdx += '</main>'.length;
      const content = html.substring(startIdx, endIdx);
      fs.writeFileSync(`c:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP\\views\\${p}.html`, content);
      html = html.replace(content, '');
    }
  }
});

// Inject mainContent inside appWrapper
const appWrapperStart = '<div id="appWrapper" class="hidden">';
if (html.indexOf(appWrapperStart) !== -1) {
  // Find topbar end or just put it before the first remaining page or after sidebar
  const marker = '<div id="toastStack"';
  if (html.indexOf('<div id="mainContent"></div>') === -1) {
    html = html.replace(marker, `<div id="mainContent"></div>\n  <div id="modalsContainer"></div>\n  ${marker}`);
  }
}

fs.writeFileSync(file, html);
console.log('Done secondary extraction');
