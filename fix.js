const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The main issue: </div><!-- end main --> is at line 292, closing mainWrap too early.
// It needs to be moved to right after the last </main> tag, before <div class="toast-stack">

// 1. Remove </div><!-- end main -->
html = html.replace('</div><!-- end main -->\n', '');
html = html.replace('</div><!-- end main -->\r\n', '');
html = html.replace('</div><!-- end main -->', '');

// 2. Find the last </main> tag and insert </div><!-- end main --> after it
const lastMainIdx = html.lastIndexOf('</main>');
if (lastMainIdx !== -1) {
    const insertPos = lastMainIdx + '</main>'.length;
    html = html.slice(0, insertPos) + '\n</div><!-- end main -->\n' + html.slice(insertPos);
}

fs.writeFileSync('index.html', html);
console.log('Fixed index.html structure.');
