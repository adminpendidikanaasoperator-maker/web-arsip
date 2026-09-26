const https = require('https');

const archives = [
  {
    id: 'ARSIP-SIMTI-2026-001',
    nomor: '001/AAS/SI-DIKTI/IX/2026',
    judul: 'Laporan Sinkronisasi PDDikti Feeder Semester 2025/2026 Genap & Checkpoint 100%',
    bidang: 'sistem_pendidikan',
    jenis: 'pddikti_feeder',
    format: 'pdf',
    status: 'selesai',
    tanggal: '2026-09-20',
    ay: '2026',
    keterangan: 'Kelengkapan 100% data KRS, KHS, dan AKM Mahasiswa di Neo Feeder PDDikti',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Laporan_PDDikti_Feeder_Genap_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-001',
    queryId: 'ARSIP-SIMTI-2026-001',
    createdAt: new Date('2026-09-20T08:30:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-002',
    nomor: '002/AAS/SI-DIKTI/IX/2026',
    judul: 'Rekapitulasi Beban Kerja Dosen (BKD) SISTER Dikti Semester Ganjil 2026',
    bidang: 'sistem_pendidikan',
    jenis: 'sister_bkd',
    format: 'pdf',
    status: 'selesai',
    tanggal: '2026-09-18',
    ay: '2026',
    keterangan: 'Verifikasi BKD dosen homebase dan sinkronisasi API SISTER Cloud Dikti',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Rekap_BKD_SISTER_Dosen_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-002',
    queryId: 'ARSIP-SIMTI-2026-002',
    createdAt: new Date('2026-09-18T09:15:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-003',
    nomor: '003/AAS/SI-DIKTI/IX/2026',
    judul: 'Berita Acara Reservasi dan Verifikasi PIN & PISN Ijazah Lulusan 2026',
    bidang: 'sistem_pendidikan',
    jenis: 'pin_pisn',
    format: 'pdf',
    status: 'aktif',
    tanggal: '2026-09-22',
    ay: '2026',
    keterangan: 'Validasi eligible PIN Dikti untuk berkas ijazah lulusan D3 Akupunktur',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Verifikasi_PIN_PISN_Lulusan_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-003',
    queryId: 'ARSIP-SIMTI-2026-003',
    createdAt: new Date('2026-09-22T10:00:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-004',
    nomor: '004/AAS/SI-DIKTI/IX/2026',
    judul: 'Laporan Kinerja Tata Kelola Kemahasiswaan SIMKATMAWA Dikti 2026',
    bidang: 'sistem_pendidikan',
    jenis: 'simkatmawa_lapor',
    format: 'excel',
    status: 'aktif',
    tanggal: '2026-09-15',
    ay: '2026',
    keterangan: 'Rekapitulasi pelaporan kegiatan mandiri dan prestasi mahasiswa di portal Dikti',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Laporan_SIMKATMAWA_2026.xlsx',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-004',
    queryId: 'ARSIP-SIMTI-2026-004',
    createdAt: new Date('2026-09-15T11:20:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-005',
    nomor: '005/AAS/SI-DIKTI/IX/2026',
    judul: 'Laporan Capaian 8 Indikator Kinerja Utama (IKU) LLDIKTI Wilayah VII',
    bidang: 'sistem_pendidikan',
    jenis: 'iku_lldikti',
    format: 'pdf',
    status: 'aktif',
    tanggal: '2026-09-12',
    ay: '2026',
    keterangan: 'Evaluasi berkala pemenuhan target IKU perguruan tinggi vokasi kesehatan',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Capaian_IKU_LLDIKTI_VII_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-005',
    queryId: 'ARSIP-SIMTI-2026-005',
    createdAt: new Date('2026-09-12T14:00:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-006',
    nomor: '006/AAS/SI-DIKTI/IX/2026',
    judul: 'Laporan Uptime Server & Cloud Infrastructure AAS Periode TA 2026',
    bidang: 'sistem_pendidikan',
    jenis: 'server_cloud',
    format: 'pdf',
    status: 'aktif',
    tanggal: '2026-09-24',
    ay: '2026',
    keterangan: 'Tingkat ketersediaan server cloud 99.98% dan pemeliharaan DNS Cloudflare',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Laporan_Uptime_Server_AAS_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-006',
    queryId: 'ARSIP-SIMTI-2026-006',
    createdAt: new Date('2026-09-24T16:45:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-007',
    nomor: '007/AAS/SI-DIKTI/IX/2026',
    judul: 'Dokumen Audit Keamanan Siber & Log Backup Database Terjadwal',
    bidang: 'sistem_pendidikan',
    jenis: 'backup_db',
    format: 'excel',
    status: 'diproses',
    tanggal: '2026-09-10',
    ay: '2026',
    keterangan: 'Verifikasi enkripsi cadangan basis data cloud dan pembaruan firewall',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Audit_Keamanan_Siber_Backup_2026.xlsx',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-007',
    queryId: 'ARSIP-SIMTI-2026-007',
    createdAt: new Date('2026-09-10T13:10:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-008',
    nomor: '008/AAS/SI-DIKTI/IX/2026',
    judul: 'Dokumen Sistem Informasi Akreditasi LAM-PTKes (Kriteria 6 Tata Pamong & SI)',
    bidang: 'sistem_pendidikan',
    jenis: 'borang_ti_lamptkes',
    format: 'word',
    status: 'aktif',
    tanggal: '2026-09-08',
    ay: '2026',
    keterangan: 'Borang LED dan LKPS pemenuhan sistem informasi akademik terintegrasi',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'Borang_Akreditasi_TI_LAMPTKes_2026.docx',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-008',
    queryId: 'ARSIP-SIMTI-2026-008',
    createdAt: new Date('2026-09-08T09:00:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-009',
    nomor: '009/AAS/SI-DIKTI/VIII/2026',
    judul: 'SK Penugasan Pengelola Sistem Informasi & Tim Operator PDDIKTI AAS',
    bidang: 'sistem_pendidikan',
    jenis: 'sk_operator',
    format: 'pdf',
    status: 'selesai',
    tanggal: '2026-08-28',
    ay: '2026',
    keterangan: 'Surat Keputusan Direktur tentang penetapan admin dan operator SI Dikti',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'SK_Direktur_Pengelola_Sistem_Informasi_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-009',
    queryId: 'ARSIP-SIMTI-2026-009',
    createdAt: new Date('2026-08-28T07:45:00Z').toISOString()
  },
  {
    id: 'ARSIP-SIMTI-2026-010',
    nomor: '010/AAS/SI-DIKTI/VIII/2026',
    judul: 'Panduan Operasional Standar (SOP) Akses Jaringan & Sistem Akademik',
    bidang: 'sistem_pendidikan',
    jenis: 'panduan_sistem',
    format: 'pdf',
    status: 'diproses',
    tanggal: '2026-08-15',
    ay: '2026',
    keterangan: 'Manual book pemanfaatan infrastruktur digital untuk dosen dan mahasiswa',
    pengirim: 'Bidang Administrasi SI PT',
    fileName: 'SOP_Akses_Jaringan_Sistem_Akademik_2026.pdf',
    url: 'https://bidang-administrasi-sistem-informasi-pendidikan-tinggi.adminpendidikanaas-operator.workers.dev?id=ARSIP-SIMTI-2026-010',
    queryId: 'ARSIP-SIMTI-2026-010',
    createdAt: new Date('2026-08-15T10:30:00Z').toISOString()
  }
];

function uploadDoc(doc) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      fields: {
        id: { stringValue: doc.id },
        nomor: { stringValue: doc.nomor },
        judul: { stringValue: doc.judul },
        bidang: { stringValue: doc.bidang },
        jenis: { stringValue: doc.jenis },
        format: { stringValue: doc.format },
        status: { stringValue: doc.status },
        tanggal: { stringValue: doc.tanggal },
        ay: { stringValue: doc.ay },
        keterangan: { stringValue: doc.keterangan },
        pengirim: { stringValue: doc.pengirim },
        fileName: { stringValue: doc.fileName },
        url: { stringValue: doc.url },
        queryId: { stringValue: doc.queryId },
        createdAt: { stringValue: doc.createdAt }
      }
    });

    const req = https.request(`https://firestore.googleapis.com/v1/projects/arsip-aas/databases/(default)/documents/arsip/${doc.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ id: doc.id, statusCode: res.statusCode }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`Starting upload of ${archives.length} official documents for sistem_pendidikan into arsip-aas...`);
  for (const doc of archives) {
    const res = await uploadDoc(doc);
    console.log(`Uploaded ${res.id} -> HTTP ${res.statusCode}`);
  }
  console.log('All documents successfully stored in Firebase Firestore collection arsip!');
}

main().catch(console.error);
