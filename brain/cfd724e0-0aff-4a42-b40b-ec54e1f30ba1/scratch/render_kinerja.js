
let cKinerjaPie;

async function renderKinerjaDashboard() {
  const listEl = document.getElementById('kinerjaList');
  const ctxKP = document.getElementById('chartKinerjaPie')?.getContext('2d');
  
  if (!listEl && !ctxKP) return;
  
  try {
    const snap = await db.collection('kinerja_bidang')
                          .orderBy('timestamp', 'desc')
                          .limit(50)
                          .get();
    
    if (snap.empty) {
      if(listEl) listEl.innerHTML = '<div style="text-align:center; padding:20px; color:var(--t2);">Belum ada aktivitas dilaporkan.</div>';
      return;
    }
    
    let html = '';
    const deptCounts = {};
    
    snap.forEach(doc => {
      const d = doc.data();
      const time = d.timestamp ? d.timestamp.toDate().toLocaleString('id-ID', {day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'}) : 'Baru saja';
      const bName = d.bidangName || d.bidangId;
      const bColor = (DEPT && DEPT[d.bidangId]) ? DEPT[d.bidangId].color : '#2563eb';
      
      deptCounts[d.bidangId] = (deptCounts[d.bidangId] || 0) + 1;
      
      html += `
        <div class="rl-item">
          <div class="rl-icon" style="background:${bColor}15; color:${bColor}">
            <i class="fas fa-clipboard-check"></i>
          </div>
          <div class="rl-info">
            <div class="rl-title">${d.deskripsi}</div>
            <div class="rl-meta" style="margin-top:4px; font-size:0.75rem;">
              <span style="background:var(--bg3); padding:2px 6px; border-radius:4px; margin-right:5px;"><i class="fas fa-sitemap"></i> ${bName}</span>
              <span style="background:var(--bg3); padding:2px 6px; border-radius:4px; margin-right:5px;"><i class="fas fa-user"></i> ${d.userName}</span>
              <span style="background:var(--bg3); padding:2px 6px; border-radius:4px;"><i class="fas fa-tags"></i> ${d.kategori}</span>
            </div>
          </div>
          <div class="rl-time">${time}</div>
        </div>
      `;
    });
    
    if (listEl) listEl.innerHTML = html;
    
    if (ctxKP) {
      if (cKinerjaPie) cKinerjaPie.destroy();
      
      const labels = Object.keys(deptCounts).map(k => (DEPT && DEPT[k]) ? DEPT[k].label : k);
      const dataV = Object.keys(deptCounts).map(k => deptCounts[k]);
      const colors = Object.keys(deptCounts).map(k => (DEPT && DEPT[k]) ? DEPT[k].color : '#94a3b8');
      
      cKinerjaPie = new Chart(ctxKP, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: dataV,
            backgroundColor: colors.map(c => c + 'cc'),
            borderColor: colors,
            borderWidth: 1
          }]
        },
        options: chartOpts({
          plugins: {
            legend: { position: 'right', labels: { color: '#8b9dbf', font: { size: 10 } } }
          }
        })
      });
    }
  } catch(e) {
    console.error(e);
    if(listEl) listEl.innerHTML = '<div style="color:#ef4444; padding:15px; text-align:center;">Gagal memuat data.</div>';
  }
}
