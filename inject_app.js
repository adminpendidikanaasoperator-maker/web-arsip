const fs = require('fs');

const file = 'app.js';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `function renderDashboard() {
    let data=arsip.filter(a=>!currentAY||a.ay===currentAY);
    initDashCharts(data); renderRecentList(data);
  }`;

const newStr = `function renderDashboard() {
    let data=arsip.filter(a=>!currentAY||a.ay===currentAY);
    
    // --- START RAB WIDGET LOGIC ---
    let totalRAB = 0, realisasi = 0, ditolak = 0, sisa = 0;
    
    data.filter(a => a.jenis === 'umum_rab').forEach(item => {
        let amt = Number(item.rab_amount) || 0;
        let stat = (item.rab_status || '').toLowerCase();
        
        totalRAB += amt;
        if (stat.includes('terealisasi') || stat.includes('disetujui') || stat.includes('selesai')) {
            realisasi += amt;
        } else if (stat.includes('tolak') || stat.includes('batal')) {
            ditolak += amt;
        } else {
            sisa += amt;
        }
    });

    const formatRp = (num) => 'Rp ' + num.toLocaleString('id-ID');
    
    const sect = document.getElementById('dashboard-anggaran-section');
    if (sect) {
        // Show section if there's any RAB data or always show it
        sect.style.display = 'block';
        if(document.getElementById('badge-rab-total')) document.getElementById('badge-rab-total').innerText = formatRp(totalRAB);
        if(document.getElementById('badge-rab-realisasi')) document.getElementById('badge-rab-realisasi').innerText = formatRp(realisasi);
        if(document.getElementById('badge-rab-sisa')) document.getElementById('badge-rab-sisa').innerText = formatRp(sisa);
        if(document.getElementById('badge-rab-ditolak')) document.getElementById('badge-rab-ditolak').innerText = formatRp(ditolak);
    }
    // --- END RAB WIDGET LOGIC ---

    initDashCharts(data); renderRecentList(data);
  }`;

const regex = new RegExp(targetStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\r?\n/g, '\\r?\\n'), 'g');
content = content.replace(regex, newStr);

fs.writeFileSync(file, content, 'utf8');
console.log('app.js injected!');
