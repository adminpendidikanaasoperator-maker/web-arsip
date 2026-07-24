function changeGenForm() {
  const type = document.getElementById('genType').value;
  document.querySelectorAll('.gen-form-group').forEach(el => el.style.display = 'none');
  document.getElementById('form-' + type).style.display = 'block';
}

function getKopSuratHTML() {
  return `
    <div style="text-align:center; border-bottom:3px solid black; padding-bottom:10px; margin-bottom:20px;">
      <h2 style="margin:0; font-family:'Times New Roman', Times, serif; font-size:16pt; font-weight:bold;">AKADEMI AKUPUNKTUR SURABAYA</h2>
      <p style="margin:0; font-family:'Times New Roman', Times, serif; font-size:12pt;">
        Jl Parang Kusumo 14 Surabaya - 60176 Telp. 031.3526916<br>
        Email : akademi.akupunktur@gmail.com  www.akademiakupunktursurabaya.ac.id<br>
        Akreditasi BAN-PT No : 2523/SK/BAN-PT/Ak.S/2.0/PT/IX/2025<br>
        Akreditasi LAM-PTKes No : 0179/LAM-PTKes/Akr/Dip/V/2021
      </p>
    </div>
  `;
}

async function generatePDF() {
  const type = document.getElementById('genType').value;
  const template = document.getElementById('pdf-template');
  
  let content = getKopSuratHTML();
  
  if (type === 'surat_tugas') {
    const no = document.getElementById('genNoSurat').value || '.../.../.../...';
    const nama = document.getElementById('genNamaDosen').value || '.........................';
    const tugas = document.getElementById('genTugas').value || '.........................';
    const tanggal = document.getElementById('genTanggal').value || '.........................';
    
    content += `
      <div style="text-align:center; margin-bottom:20px;">
        <h3 style="margin:0; font-family:'Times New Roman', Times, serif; font-size:14pt; text-decoration:underline; font-weight:bold;">SURAT TUGAS</h3>
        <p style="margin:0; font-family:'Times New Roman', Times, serif; font-size:12pt;">Nomor: ${no}</p>
      </div>
      
      <p style="font-family:'Times New Roman', Times, serif; font-size:12pt; text-align:justify; margin-bottom:10px;">
        Direktur Akademi Akupunktur Surabaya, dengan ini menugaskan kepada:
      </p>
      
      <table style="width:100%; margin-bottom:10px; font-family:'Times New Roman', Times, serif; font-size:12pt;">
        <tr>
          <td style="width:150px; vertical-align:top;">Nama</td>
          <td style="width:10px; vertical-align:top;">:</td>
          <td><strong>${nama}</strong></td>
        </tr>
      </table>
      
      <p style="font-family:'Times New Roman', Times, serif; font-size:12pt; text-align:justify; margin-bottom:10px;">
        Untuk melaksanakan tugas: ${tugas}
      </p>
      <p style="font-family:'Times New Roman', Times, serif; font-size:12pt; text-align:justify; margin-bottom:30px;">
        Tugas ini dilaksanakan pada tanggal ${tanggal}. Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.
      </p>
      
      <div style="width:300px; float:right; text-align:center; font-family:'Times New Roman', Times, serif; font-size:12pt;">
        <p>Surabaya, ${new Date().toLocaleDateString('id-ID')}</p>
        <p>Direktur,</p>
        <br><br><br><br>
        <p><strong>( ______________________ )</strong></p>
      </div>
      <div style="clear:both;"></div>
    `;
  } else if (type === 'rps_obe') {
    const makul = document.getElementById('genMakul').value || '.........................';
    const cpl = document.getElementById('genCPL').value || '.........................';
    
    content += `
      <div style="text-align:center; margin-bottom:20px;">
        <h3 style="margin:0; font-family:'Times New Roman', Times, serif; font-size:14pt; font-weight:bold;">Rencana Pembelajaran Semester (RPS) Berbasis OBE</h3>
      </div>
      
      <table style="width:100%; margin-bottom:10px; font-family:'Times New Roman', Times, serif; font-size:12pt;">
        <tr>
          <td style="width:200px; vertical-align:top;">Mata Kuliah</td>
          <td style="width:10px; vertical-align:top;">:</td>
          <td><strong>${makul}</strong></td>
        </tr>
        <tr>
          <td style="vertical-align:top;">Capaian Pembelajaran (CPL)</td>
          <td style="vertical-align:top;">:</td>
          <td>${cpl}</td>
        </tr>
      </table>
    `;
  }
  
  template.innerHTML = content;
  template.style.display = 'block';
  
  const opt = {
    margin:       10,
    filename:     type + '.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(template).save().then(() => {
    template.style.display = 'none';
  });
}

function generateWord() {
  const type = document.getElementById('genType').value;
  alert('Fitur DOCX menggunakan pustaka eksternal docx.js.\nSedang diproses...');
  
  // Minimalist DOCX mapping
  const doc = new docx.Document({
    sections: [{
      properties: {},
      children: [
        new docx.Paragraph({
          text: "AKADEMI AKUPUNKTUR SURABAYA",
          heading: docx.HeadingLevel.HEADING_2,
          alignment: docx.AlignmentType.CENTER,
        }),
        new docx.Paragraph({
          text: "Jl Parang Kusumo 14 Surabaya - 60176 Telp. 031.3526916",
          alignment: docx.AlignmentType.CENTER,
        }),
        new docx.Paragraph({
          text: "Dokumen yang di-generate via sistem",
          alignment: docx.AlignmentType.CENTER,
        }),
      ],
    }],
  });
  
  docx.Packer.toBlob(doc).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type + ".docx";
    a.click();
  });
}

// Ensure generator link triggers UI show
document.addEventListener('DOMContentLoaded', () => {
  const navGen = document.getElementById('nav-generator');
  if(navGen) {
    navGen.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      document.getElementById('page-generator').classList.remove('hidden');
      
      document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
      navGen.classList.add('active');
    });
  }
});
