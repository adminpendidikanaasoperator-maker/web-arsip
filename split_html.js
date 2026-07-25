const fs = require('fs');

const file = 'c:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP\\index.html';
let html = fs.readFileSync(file, 'utf8');

const pages = [
  'dashboard', 'semua', 'dept', 'activity', 'mahasiswa', 'sdm', 'banpt', 'lamptkes', 'users', 'generator'
];

pages.forEach(p => {
  const startStr = `<main class="page hidden" id="page-${p}">`;
  const fallbackStr = `<main class="page" id="page-${p}">`; // in case some don't have hidden
  
  let startIdx = html.indexOf(startStr);
  if (startIdx === -1) {
    startIdx = html.indexOf(fallbackStr);
  }

  if (startIdx !== -1) {
    // Find the matching </main>
    let endIdx = html.indexOf('</main>', startIdx);
    if (endIdx !== -1) {
      endIdx += '</main>'.length;
      const content = html.substring(startIdx, endIdx);
      fs.writeFileSync(`c:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP\\views\\${p}.html`, content);
      
      // We will remove it later, let's keep it in HTML for now and remove via another step
      // or replace with nothing
      html = html.replace(content, '');
    }
  }
});

// Modals
const modals = [
  { id: 'overlayUserForm', name: 'user' },
  { id: 'formBox', name: 'arsip' },
  { id: 'overlaySdmForm', name: 'sdm_mhs' }, // include overlayMhsForm too
  { id: 'overlayMhsForm', name: 'sdm_mhs_2' }
];

let sdm_mhs_content = '';

modals.forEach(m => {
  const startStr = `<div class="overlay hidden" id="${m.id}">`;
  const startIdx = html.indexOf(startStr);
  
  if (startIdx !== -1) {
    let openDivs = 0;
    let i = startIdx;
    while (i < html.length) {
      if (html.substring(i, i + 4) === '<div') {
        openDivs++;
      } else if (html.substring(i, i + 5) === '</div') {
        openDivs--;
        if (openDivs === 0) {
          i += 6; // '</div>'.length
          const content = html.substring(startIdx, i);
          
          if (m.name.startsWith('sdm_mhs')) {
            sdm_mhs_content += content + '\n';
          } else {
            fs.writeFileSync(`c:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP\\views\\modals\\${m.name}.html`, content);
          }
          
          html = html.replace(content, '');
          break;
        }
      }
      i++;
    }
  }
});

if (sdm_mhs_content) {
  fs.writeFileSync(`c:\\Users\\Admin\\OneDrive\\Desktop\\Dokumen AAS\\DATA WEB ARSIP\\views\\modals\\sdm_mhs.html`, sdm_mhs_content);
}

// Write the placeholder for mainContent
const marker = '<!-- ÔöÇÔöÇÔöÇ DASHBOARD & STATISTIK ÔöÇÔöÇÔöÇ -->';
html = html.replace(marker, `<div id="mainContent"></div>\n  <div id="modalsContainer"></div>\n  ${marker}`);

fs.writeFileSync(file + '.new', html);
console.log('Done splitting HTML');
