const fs = require('fs');

const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `      <div class="stat-card">
        <div class="sc-icon" style="background:#10b98118; color:#10b981;"><i class="fas fa-notes-medical"></i></div>
        <div class="sc-label">Total LAM-PTKes</div><div class="sc-value" id="badge-dash-lamptkes">0</div>
      </div>
    </div>`;

const newStr = `      <div class="stat-card">
        <div class="sc-icon" style="background:#10b98118; color:#10b981;"><i class="fas fa-notes-medical"></i></div>
        <div class="sc-label">Total LAM-PTKes</div><div class="sc-value" id="badge-dash-lamptkes">0</div>
      </div>
    </div>
    
    <!-- DASHBOARD ANGGARAN (RAB) -->
    <div style="margin-top: 30px; margin-bottom: 20px; display: none;" id="dashboard-anggaran-section">
      <h2 style="color: var(--p1); font-size: 1.25rem; margin-bottom: 15px;"><i class="fas fa-money-check-alt" style="margin-right:8px;"></i> Monitor Rencana Anggaran Biaya (RAB)</h2>
      <div class="stat-cards">
        <div class="stat-card" style="border-left: 4px solid #3b82f6;">
          <div class="sc-icon" style="background:#3b82f618; color:#3b82f6;"><i class="fas fa-file-invoice-dollar"></i></div>
          <div class="sc-label">Total Pengajuan</div><div class="sc-value" id="badge-rab-total" style="font-size:1.2rem;">Rp 0</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #22c55e;">
          <div class="sc-icon" style="background:#22c55e18; color:#22c55e;"><i class="fas fa-hand-holding-usd"></i></div>
          <div class="sc-label">Telah Terealisasi</div><div class="sc-value" id="badge-rab-realisasi" style="font-size:1.2rem;">Rp 0</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #f59e0b;">
          <div class="sc-icon" style="background:#f59e0b18; color:#f59e0b;"><i class="fas fa-hourglass-half"></i></div>
          <div class="sc-label">Sisa / Menunggu</div><div class="sc-value" id="badge-rab-sisa" style="font-size:1.2rem;">Rp 0</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #ef4444;">
          <div class="sc-icon" style="background:#ef444418; color:#ef4444;"><i class="fas fa-times-circle"></i></div>
          <div class="sc-label">Ditolak</div><div class="sc-value" id="badge-rab-ditolak" style="font-size:1.2rem;">Rp 0</div>
        </div>
      </div>
    </div>`;

// Use regex to normalize line endings for matching
const regex = new RegExp(targetStr.replace(/\r?\n/g, '\\r?\\n'), 'g');
content = content.replace(regex, newStr);

fs.writeFileSync(file, content, 'utf8');
console.log('Widget injected!');
