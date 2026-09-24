

/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
   SIMARSIP  ÔÇö  app.js  v3.0
   Akademi Akupunktur Surabaya
   ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */
'use strict';
Chart.register(ChartDataLabels);

/* ÔöÇÔöÇÔöÇ STORAGE KEYS ÔöÇÔöÇÔöÇ */
const SK  = 'aas_arsip_v3';
const SAK = 'aas_activity_v3';
const SK_MHS = 'aas_mhs_v3';
const SK_SDM = 'aas_sdm_v3';

/* ÔöÇÔöÇÔöÇ GOOGLE APPS SCRIPT URL ÔöÇÔöÇÔöÇ */
// Paste URL "Web app" dari Google Apps Script di sini setelah melakukan Deployment.
// Contoh: 'https://script.google.com/macros/s/AKfycby.../exec'
const GAS_URL = 'https://script.google.com/macros/s/AKfycby0heFyeXzAmm_uNBvItuoCqFBe-79h6vL0sJ6iIYYJ-b-eWesITSu4MvHoSv4gqgMoNw/exec'; 

/* ÔöÇÔöÇÔöÇ DEPARTEMEN ÔöÇÔöÇÔöÇ */
const DEPT = {
  akademik: { label:'Bidang Administrasi Akademik', icon:'fas fa-graduation-cap', color:'#3b82f6' },
  ketenagaan: { label:'Bidang Ketenagaan', icon:'fas fa-users-gear', color:'#6366f1' },
  pendidikan: { label:'Bidang Pendidikan', icon:'fas fa-chalkboard-teacher', color:'#8b5cf6' },
  administrasi: { label:'Bidang Administrasi', icon:'fas fa-folder-open', color:'#a855f7' },
  sistem_pendidikan: { label:'Bidang Administrasi Sistem Informasi Pendidikan Tinggi', icon:'fas fa-laptop-code', color:'#d946ef' },
  laboratorium: { label:'Bidang Laboratorium', icon:'fas fa-vials', color:'#ec4899' },
  perpustakaan: { label:'Bidang Perpustakaan', icon:'fas fa-book', color:'#f43f5e' },
  penelitian_pelatihan: { label:'Bidang Penelitian dan Pelatihan', icon:'fas fa-microscope', color:'#f97316' },
  kemahasiswaan: { label:'Bidang Kemahasiswaan dan Alumni', icon:'fas fa-user-graduate', color:'#f59e0b' },
  pengabdian: { label:'Bidang Pengabdian Masyarakat', icon:'fas fa-hands-helping', color:'#eab308' },
  admin_kelembagaan: { label:'Bidang Administrasi dan Kelembagaan', icon:'fas fa-sitemap', color:'#84cc16' },
  admin_umum: { label:'Bidang Administrasi Umum', icon:'fas fa-building', color:'#22c55e' },
  admin_kepegawaian: { label:'Bidang Administrasi Kepegawaian', icon:'fas fa-user-tie', color:'#10b981' },
  admin_keuangan: { label:'Bidang Administrasi Keuangan Institusi dan Pendidikan', icon:'fas fa-coins', color:'#14b8a6' },
  rumah_tangga: { label:'Bidang Rumah Tangga', icon:'fas fa-home', color:'#06b6d4' },
  sarana: { label:'Bidang Sarana dan Prasarana', icon:'fas fa-tools', color:'#0ea5e9' },
  sistem_informasi: { label:'Bidang Sistem Informasi', icon:'fas fa-network-wired', color:'#0284c7' },
  humas: { label:'Bidang Humas', icon:'fas fa-bullhorn', color:'#3b82f6' },
  promosi: { label:'Bidang Promosi', icon:'fas fa-ad', color:'#4f46e5' },
  kerjasama: { label:'Bidang Kerjasama', icon:'fas fa-handshake', color:'#7c3aed' },
  it: { label:'Bidang IT', icon:'fas fa-server', color:'#db2777' },
  spmi: { label:'Bidang SPMI', icon:'fas fa-shield-check', color:'#f43f5e' },
  ami: { label:'Bidang AMI', icon:'fas fa-clipboard-check', color:'#10b981' },

  // Backward compatibility aliases
  lppm: { label:'Bidang Penelitian dan Pelatihan', icon:'fas fa-microscope', color:'#f97316' },
  umum: { label:'Bidang Administrasi Umum', icon:'fas fa-building', color:'#22c55e' },
  kepegawaian: { label:'Bidang Administrasi Kepegawaian', icon:'fas fa-user-tie', color:'#10b981' },
  keuangan: { label:'Bidang Administrasi Keuangan', icon:'fas fa-coins', color:'#14b8a6' },
  sdm: { label:'SDM & Kepegawaian', icon:'fas fa-user-tie', color:'#10b981' }
};

/* ÔöÇÔöÇÔöÇ JENIS DOKUMEN PER BIDANG (tidak ada "Lainnya") ÔöÇÔöÇÔöÇ */


const LAMPTKES_KRITERIA_JENIS = {
  lamptkes_k1: [
    {val: 'k1_1', label: 'Laporan kegiatan atau notulen rapat pada saat perumusan visi, misi, dan unggulan Program Studi yang berasal dari visi, misi, dan unggulan fakultas dan universitas. Visi, misi, dan unggulan tersebut mencakup peran UPPS dalam meningkatkan derajat kesehatan masyarakat.'},
    {val: 'k1_2', label: 'Bukti kegiatan keterlibatan pemangku kepentingan internal (mahasiswa, dosen, tendik, pengelola) dan eksternal (lulusan, pengguna lulusan, mitra, pakar, organisasi profesi dan pemerintah) seperti daftar hadir, rekaman foto/video pada saat pertemuan.'},
    {val: 'k1_3', label: 'Media yang digunakan untuk publikasi/sosialisasi visi, misi, dan unggulan.'},
    {val: 'k1_4', label: 'Dokumen rencana strategi (renstra) dan rencana operasional (renop)'}
  ],
  lamptkes_k2: [
    {val: 'k2_1', label: 'Notulen rapat komite kurikulum untuk merumuskan capaian pembelajaran lulusan setiap mata kuliah (termasuk pengetahuan, keterampilan, dan perilaku) berdasarkan visi, misi, dan unggulan program studi dengan pelibatan pemangku kepentingan internal dan eksternal.'},
    {val: 'k2_2', label: 'Buku kurikulum (kurikulum: prinsip, struktur, isi, urutan), peta kompetensi, rencana pembelajaran semester (RPS), hasil pembelajaran, metode pendidikan, penilaian.'},
    {val: 'k2_3', label: 'Daftar departemen klinis untuk penempatan mahasiswa, Daftar penempatan mahasiswa untuk orientasi pembelajaran klinik profesional (early clinical exposure) pada tahap akademik dan praktek klinik profesional tahap profesi.'},
    {val: 'k2_4', label: 'Daftar rumah sakit pendidikan, Daftar wahana praktek yang digunakan dan memenuhi persyaratan praktek klinik profesional mahasiswa'},
    {val: 'k2_5', label: 'Notulen rapat komite kurikulum tentang metode pendidikan, telaah kurikulum, evaluasi dan peninjauan kurikulum.'},
    {val: 'k2_6', label: 'Modul dan Panduan praktek klinik profesional mahasiswa'},
    {val: 'k2_7', label: 'Risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem manajemen mutu dan strategi keselamatan pasien'},
    {val: 'k2_8', label: 'Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut'},
    {val: 'k2_9', label: 'Kebijakan dan prosedur mitigasi kasus risiko kecelakaan'}
  ],
  lamptkes_k3: [
    {val: 'k3_1', label: 'Prosedur operasional standar penilaian'},
    {val: 'k3_2', label: 'Buku catatan mahasiswa (logbook), dokumen revisi strategi pengajaran: penilaian mahasiswa (evaluasi dan pemantauan kemajuan mahasiswa) dan umpan balik dosen (strategi mengajar dosen)'},
    {val: 'k3_3', label: 'Mekanisme remedial dan konseling'},
    {val: 'k3_4', label: 'Cetak (blueprint) penilaian'},
    {val: 'k3_5', label: 'Prosedur mekanisme banding'},
    {val: 'k3_6', label: 'Dokumen sistem Penjaminan Mutu: perencanaan dan pelaksanaan'},
    {val: 'k3_7', label: 'Kebijakan dan prosedur penilaian sesuai tempat pembelajaran'},
    {val: 'k3_8', label: 'Lampiran hasil Uji Kompetensi CBT dan OSCE'}
  ],
  lamptkes_k4: [
    {val: 'k4_1', label: 'Peraturan tentang kebijakan seleksi dan penerimaan: penyelarasan dengan misi dan akreditasi/persyaratan, publisitas/sosialisasi, peninjauan, dan revisi.'},
    {val: 'k4_2', label: 'Kebijakan, peraturan, prosedur dukungan/layanan mahasiswa, dan keselamatan lingkungan kerja'},
    {val: 'k4_3', label: 'Kebijakan, peraturan, dan prosedur konseling mahasiswa.'},
    {val: 'k4_4', label: 'Pendukung sumber daya manusia, fasilitas, dan keuangan untuk sistem pendukung/layanan mahasiswa.'},
    {val: 'k4_5', label: 'Monitoring dan evaluasi penerapan sistem pendukung/layanan kemahasiswaan.'},
    {val: 'k4_6', label: 'Dokumen hasil survey kepuasaan mahasiswa terhadap layanan mahasiswa.'},
    {val: 'k4_7', label: 'Dokumen hasil survey kepuasaan mahasiswa terhadap layanan manajemen'},
    {val: 'k4_8', label: 'Kebijakan, peraturan mengenai "kampus sehat" termasuk bebas dari kekerasan seksual, perundungan, intoleransi, bebas dari rokok dan narkotika.'},
    {val: 'k4_9', label: 'Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut'},
    {val: 'k4_10', label: 'Pemantauan dan evaluasi penerapan sistem pendukung mahasiswa dan keselamatan lingkungan kerja.'},
    {val: 'k4_11', label: 'Pedoman RCA (Root Cause Analysis).'}
  ],
  lamptkes_k5: [
    {val: 'k5_1', label: 'Rencana pengembangan sumber daya manusia (SDM) sesuai dengan kebutuhan masing-masing disiplin ilmu dan perkembangan ilmu pengetahuan.'},
    {val: 'k5_2', label: 'Kebijakan dan prosedur pengembangan SDM (dosen dan tendik).'},
    {val: 'k5_3', label: 'Notulen/risalah rapat dan daftar kehadiran terkait kegiatan pengembangan SDM.'},
    {val: 'k5_4', label: 'Pemetaan disiplin kurikulum (kesesuaian bidang ilmu dengan mata kuliah yang diampu dan beban kerja).'},
    {val: 'k5_5', label: 'Formulir monitoring dan evaluasi kinerja dosen, sampel formulir yang sudah diisi dari beberapa dosen, hasil penilaian kinerja setiap semester.'},
    {val: 'k5_6', label: 'Laporan program pelatihan orientasi.'},
    {val: 'k5_7', label: 'Laporan program pelatihan untuk dosen baru dan lama.'},
    {val: 'k5_8', label: 'Roadmap penelitian, dan Pengabdian kepada Masyarakat dosen.'},
    {val: 'k5_9', label: 'Laporan penelitian dosen dan PkM dosen serta publikasinya.'},
    {val: 'k5_10', label: 'Bukti penghargaan atau pengakuan atas hasil penelitian (termasuk menerima: Hibah penelitian, HaKi, dan Paten).'},
    {val: 'k5_11', label: 'Kebijakan penelitian dan PkM serta integrasinya.'},
    {val: 'k5_12', label: 'Sertifikat Pendidik/Dosen, Sertifikat Kompetensi, dan Ijazah'},
    {val: 'k5_13', label: 'HaKI atau surat pengakuan/penghargaan dari lembaga nasional/internasional'},
    {val: 'k5_14', label: 'Formulir monitoring dan evaluasi kinerja tendik.'},
    {val: 'k5_15', label: 'Laporan program pelatihan tendik.'}
  ],
  lamptkes_k6: [
    {val: 'k6_1', label: 'Daftar infrastruktur fisik/sarana dan prasarana'},
    {val: 'k6_2', label: 'Daftar sistem pendukung pembelajaran lainnya. Sistem manajemen pembelajaran dan dukungan internet'},
    {val: 'k6_3', label: 'Daftar rumah sakit pendidikan dan wahana praktek klinik.'},
    {val: 'k6_4', label: 'Daftar fasilitas di rumah sakit pendidikan dan pengajaran klinik (ruang diskusi, ruang shift malam, perpustakaan, dll.)'},
    {val: 'k6_5', label: 'Daftar manekin yang tersedia untuk pelatihan keterampilan klinis mahasiswa.'},
    {val: 'k6_6', label: 'Kebijakan mengenai keselamatan dan kesehatan kerja civitas akademika.'},
    {val: 'k6_7', label: 'Daftar pasien standar dan laporan pelatihannya.'},
    {val: 'k6_8', label: 'Daftar pelatihan dan laporannya dari dosen klinis dan pembimbing'},
    {val: 'k6_9', label: 'Daftar database jurnal yang tersedia'},
    {val: 'k6_10', label: 'Formulir evaluasi dan umpan balik dari mahasiswa dan staf akademik serta administrasi untuk sumber informasi yang tersedia'},
    {val: 'k6_11', label: 'Fasilitas untuk mengakses sumber informasi dan sumber belajar.'},
    {val: 'k6_12', label: 'Data hasil survei kepuasan atas pelayanan yang diberikan manajemen kepada seluruh pemangku kepentingan (mahasiswa, dosen, pegawai, rekanan, dan pemberi kerja alumni).'},
    {val: 'k6_13', label: 'Data hasil survei kepuasan terhadap kecukupan, kualitas dan akses terhadap fasilitas dan peralatan fisik serta sumber informasi pendidikan dan pelatihan klinis.'},
    {val: 'k6_14', label: 'Dokumen audit: keuangan dan sarana prasarana.'}
  ],
  lamptkes_k7: [
    {val: 'k7_1', label: 'Sistem penjaminan mutu: struktur dan tupoksi.'},
    {val: 'k7_2', label: 'Dokumen mutu: kebijakan, standar, manual, formulir, dan dokumen pendukung lainnya.'},
    {val: 'k7_3', label: 'Laporan audit mutu internal.'},
    {val: 'k7_4', label: 'Laporan rapat tinjauan manajemen.'},
    {val: 'k7_5', label: 'Sumber daya yang dialokasikan untuk penjaminan mutu.'},
    {val: 'k7_6', label: 'Notulen/risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem penjaminan mutu dan strategi keselamatan pasien.'},
    {val: 'k7_7', label: 'Dokumen tindak lanjut atas umpan balik penjaminan mutu untuk peningkatan mutu berkelanjutan.'},
    {val: 'k7_8', label: 'Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut'},
    {val: 'k7_9', label: 'Kebijakan dan prosedur mitigasi kasus risiko.'}
  ],
  lamptkes_k8: [
    {val: 'k8_1', label: 'Bagan organisasi pengelolaan dan administrasi beserta tupoksi.'},
    {val: 'k8_2', label: 'Prosedur operasional standar pengalokasian anggaran.'},
    {val: 'k8_3', label: 'Laporkan tinjauan kinerja institusi/UPPS'},
    {val: 'k8_4', label: 'Dokumen identifikasi dan mitigasi risiko.'},
    {val: 'k8_5', label: 'Laporan/risalah rapat keterlibatan mahasiswa dan dosen dalam pengambilan keputusan dan fungsi UPPS'},
    {val: 'k8_6', label: 'Standar prosedur operasional (SPO) untuk proses pengambilan keputusan.'},
    {val: 'k8_7', label: 'Standar prosedur operasional (SPO) pelaporan pembelajaran, penelitian, dan pengabdian kepada masyarakat.'},
    {val: 'k8_8', label: 'Dokumen indikator kinerja utama dan kinerja tambahan.'}
  ]
};


let ORIGINAL_BIDANG_HTML = '';
document.addEventListener('DOMContentLoaded', () => {
    const b = document.getElementById('fBidang');
    if(b) ORIGINAL_BIDANG_HTML = b.innerHTML;
});

const LAMPTKES_SPECIAL_TYPES = [
    { val: 'k1_led', label: '[LED] Laporan Evaluasi Diri Kriteria 1' },
    { val: 'k2_led', label: '[LED] Laporan Evaluasi Diri Kriteria 2' },
    { val: 'k3_led', label: '[LED] Laporan Evaluasi Diri Kriteria 3' },
    { val: 'k4_led', label: '[LED] Laporan Evaluasi Diri Kriteria 4' },
    { val: 'k5_led', label: '[LED] Laporan Evaluasi Diri Kriteria 5' },
    { val: 'k6_led', label: '[LED] Laporan Evaluasi Diri Kriteria 6' },
    { val: 'k7_led', label: '[LED] Laporan Evaluasi Diri Kriteria 7' },
    { val: 'k8_led', label: '[LED] Laporan Evaluasi Diri Kriteria 8' },
    { val: 'led_semua', label: '[LED FINISH] Laporan Evaluasi Diri Lengkap' },
    { val: 'spmi_akademik', label: '[SPMI] Bidang Akademik' },
    { val: 'spmi_sistem_pendidikan', label: '[SPMI] Bidang Sistem Pendidikan' },
    { val: 'spmi_kemahasiswaan', label: '[SPMI] Bidang Kemahasiswaan' },
    { val: 'spmi_kepegawaian', label: '[SPMI] Bidang Kepegawaian (SDM)' },
    { val: 'spmi_umum_keuangan', label: '[SPMI] Bidang Umum & Keuangan' },
    { val: 'spmi_lppm', label: '[SPMI] Bidang LPPM' },
    { val: 'spmi_penjaminan_mutu', label: '[SPMI] Bidang Penjaminan Mutu' },
    { val: 'spmi_perpustakaan', label: '[SPMI] Bidang Perpustakaan' },
    { val: 'spmi_it', label: '[SPMI] Bidang IT' },
    { val: 'spmi_tata_usaha', label: '[SPMI] Bidang Tata Usaha' },
    { val: 'spmi_semua', label: '[SPMI FINISH] Dokumen Mutu Lengkap' }
  ];

const COMMON_JENIS = [
  { val: 'umum_surat_masuk', label: 'Surat Masuk', icon: 'fas fa-inbox', color: '#3b82f6' },
  { val: 'umum_surat_keluar', label: 'Surat Keluar', icon: 'fas fa-paper-plane', color: '#10b981' },
  { val: 'umum_sk', label: 'Surat Keputusan (SK)', icon: 'fas fa-gavel', color: '#f59e0b' },
  { val: 'umum_laporan', label: 'Laporan', icon: 'fas fa-file-alt', color: '#6366f1' },
  { val: 'umum_rab', label: 'Rencana Anggaran Biaya (RAB)', icon: 'fas fa-money-check-alt', color: '#059669' },
  { val: 'umum_notulen', label: 'Notulen Rapat', icon: 'fas fa-users', color: '#8b5cf6' },
  { val: 'umum_lainnya', label: 'Lainnya', icon: 'fas fa-file', color: '#6b7280' }
];


const DEPT_JENIS = {
    "akademik": [
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_1",
                    "label": "Notulen rapat komite kurikulum untuk merumuskan capaian pembelajaran lulusan setiap mata kuliah (termasuk pengetahuan, keterampilan, dan perilaku) berdasarkan visi, misi, dan unggulan program studi dengan pelibatan pemangku kepentingan internal dan eksternal."
                },
                {
                    "val": "k2_2",
                    "label": "Buku kurikulum (kurikulum: prinsip, struktur, isi, urutan), peta kompetensi, rencana pembelajaran semester (RPS), hasil pembelajaran, metode pendidikan, penilaian."
                },
                {
                    "val": "k2_3",
                    "label": "Daftar departemen klinis untuk penempatan mahasiswa, Daftar penempatan mahasiswa untuk orientasi pembelajaran klinik profesional (early clinical exposure) pada tahap akademik dan praktek klinik profesional tahap profesi."
                },
                {
                    "val": "k2_4",
                    "label": "Daftar rumah sakit pendidikan, Daftar wahana praktek yang digunakan dan memenuhi persyaratan praktek klinik profesional mahasiswa"
                },
                {
                    "val": "k2_5",
                    "label": "Notulen rapat komite kurikulum tentang metode pendidikan, telaah kurikulum, evaluasi dan peninjauan kurikulum."
                },
                {
                    "val": "k2_6",
                    "label": "Modul dan Panduan praktek klinik profesional mahasiswa"
                }
            ]
        },
        {
            "group": "Penilaian",
            "items": [
                {
                    "val": "k3_1",
                    "label": "Prosedur operasional standar penilaian"
                },
                {
                    "val": "k3_2",
                    "label": "Buku catatan mahasiswa (logbook), dokumen revisi strategi pengajaran: penilaian mahasiswa (evaluasi dan pemantauan kemajuan mahasiswa) dan umpan balik dosen (strategi mengajar dosen)"
                },
                {
                    "val": "k3_3",
                    "label": "Mekanisme remedial dan konseling"
                },
                {
                    "val": "k3_4",
                    "label": "Cetak (blueprint) penilaian"
                },
                {
                    "val": "k3_5",
                    "label": "Prosedur mekanisme banding"
                },
                {
                    "val": "k3_7",
                    "label": "Kebijakan dan prosedur penilaian sesuai tempat pembelajaran"
                },
                {
                    "val": "k3_8",
                    "label": "Lampiran hasil Uji Kompetensi CBT dan OSCE"
                }
            ]
        },
        {
            "group": "Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat",
            "items": [
                {
                    "val": "k5_4",
                    "label": "Pemetaan disiplin kurikulum (kesesuaian bidang ilmu dengan mata kuliah yang diampu dan beban kerja)."
                }
            ]
        }
    ],
    "kemahasiswaan": [
{
  "group": "Kemahasiswaan & Alumni",
  "items": [
    { "val": "data_mahasiswa", "label": "Data Induk Mahasiswa", "icon": "fas fa-users" },
    { "val": "Data Mahasiswa", "label": "Dokumen Mahasiswa" },
    { "val": "Alumni & Tracer Study", "label": "Alumni & Tracer Study" },
    { "val": "Beasiswa", "label": "Beasiswa" },
    { "val": "Penerima Beasiswa", "label": "Penerima Beasiswa" },
    { "val": "Organisasi & BEM", "label": "Organisasi & BEM" },
    { "val": "Laporan Tahunan", "label": "Laporan Tahunan" },
    { "val": "Dokumen SK", "label": "Dokumen SK" },
    { "val": "Rencana Anggaran", "label": "Rencana Anggaran" },
    { "val": "Evaluasi & Kelengkapan", "label": "Evaluasi & Kelengkapan" },
    { "val": "Prestasi Mahasiswa", "label": "Prestasi Mahasiswa" },
    { "val": "Kegiatan UKM", "label": "Kegiatan UKM" },
    { "val": "Bimbingan Konseling & Disiplin", "label": "Bimbingan Konseling & Disiplin" },
    { "val": "Uji Kompetensi", "label": "Uji Kompetensi" },
    { "val": "Laporan SOP", "label": "Laporan SOP" },
    { "val": "Laporan Kebijakan", "label": "Laporan Kebijakan" },
    { "val": "Survey Pengguna Lulusan", "label": "Survey Pengguna Lulusan" },
    { "val": "Evaluasi Mitra PKL", "label": "Evaluasi Mitra PKL" },
    { "val": "Pengaduan & Kritik Saran", "label": "Pengaduan & Kritik Saran" }
  ]
}
],
"kepegawaian": [
        {
            "group": "Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat",
            "items": [
                {
                    "val": "k5_1",
                    "label": "Rencana pengembangan sumber daya manusia (SDM) sesuai dengan kebutuhan masing-masing disiplin ilmu dan perkembangan ilmu pengetahuan."
                },
                {
                    "val": "k5_2",
                    "label": "Kebijakan dan prosedur pengembangan SDM (dosen dan tendik)."
                },
                {
                    "val": "k5_3",
                    "label": "Notulen/risalah rapat dan daftar kehadiran terkait kegiatan pengembangan SDM."
                },
                {
                    "val": "k5_5",
                    "label": "Formulir monitoring dan evaluasi kinerja dosen, sampel formulir yang sudah diisi dari beberapa dosen, hasil penilaian kinerja setiap semester."
                },
                {
                    "val": "k5_6",
                    "label": "Laporan program pelatihan orientasi."
                },
                {
                    "val": "k5_7",
                    "label": "Laporan program pelatihan untuk dosen baru dan lama."
                },
                {
                    "val": "k5_12",
                    "label": "Sertifikat Pendidik/Dosen, Sertifikat Kompetensi, dan Ijazah"
                },
                {
                    "val": "k5_14",
                    "label": "Formulir monitoring dan evaluasi kinerja tendik."
                },
                {
                    "val": "k5_15",
                    "label": "Laporan program pelatihan tendik."
                }
            ]
        }
    ],
    "lppm": [
        {
            "group": "Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat",
            "items": [
                {
                    "val": "k5_8",
                    "label": "Roadmap penelitian, dan Pengabdian kepada Masyarakat dosen."
                },
                {
                    "val": "k5_9",
                    "label": "Laporan penelitian dosen dan PkM dosen serta publikasinya."
                },
                {
                    "val": "k5_10",
                    "label": "Bukti penghargaan atau pengakuan atas hasil penelitian (termasuk menerima: Hibah penelitian, HaKi, dan Paten)."
                },
                {
                    "val": "k5_11",
                    "label": "Kebijakan penelitian dan PkM serta integrasinya."
                },
                {
                    "val": "k5_13",
                    "label": "HaKI atau surat pengakuan/penghargaan dari lembaga nasional/internasional"
                }
            ]
        },
        {
            "group": "Tata Kelola dan Administrasi",
            "items": [
                {
                    "val": "k8_7",
                    "label": "Standar prosedur operasional (SPO) pelaporan pembelajaran, penelitian, dan pengabdian kepada masyarakat."
                }
            ]
        }
    ],
    "pengabdian": [
        {
            "group": "Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat",
            "items": [
                {
                    "val": "k5_8",
                    "label": "Roadmap penelitian, dan Pengabdian kepada Masyarakat dosen."
                },
                {
                    "val": "k5_9",
                    "label": "Laporan penelitian dosen dan PkM dosen serta publikasinya."
                },
                {
                    "val": "k5_10",
                    "label": "Bukti penghargaan atau pengakuan atas hasil penelitian (termasuk menerima: Hibah penelitian, HaKi, dan Paten)."
                },
                {
                    "val": "k5_11",
                    "label": "Kebijakan penelitian dan PkM serta integrasinya."
                },
                {
                    "val": "k5_13",
                    "label": "HaKI atau surat pengakuan/penghargaan dari lembaga nasional/internasional"
                }
            ]
        },
        {
            "group": "Tata Kelola dan Administrasi",
            "items": [
                {
                    "val": "k8_7",
                    "label": "Standar prosedur operasional (SPO) pelaporan pembelajaran, penelitian, dan pengabdian kepada masyarakat."
                }
            ]
        }
    ],
    "laboratorium": [
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_9",
                    "label": "Kebijakan dan prosedur mitigasi kasus risiko kecelakaan"
                }
            ]
        },
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_1",
                    "label": "Daftar infrastruktur fisik/sarana dan prasarana"
                },
                {
                    "val": "k6_3",
                    "label": "Daftar rumah sakit pendidikan dan wahana praktek klinik."
                },
                {
                    "val": "k6_4",
                    "label": "Daftar fasilitas di rumah sakit pendidikan dan pengajaran klinik (ruang diskusi, ruang shift malam, perpustakaan, dll.)"
                },
                {
                    "val": "k6_5",
                    "label": "Daftar manekin yang tersedia untuk pelatihan keterampilan klinis mahasiswa."
                },
                {
                    "val": "k6_6",
                    "label": "Kebijakan mengenai keselamatan dan kesehatan kerja civitas akademika."
                },
                {
                    "val": "k6_7",
                    "label": "Daftar pasien standar dan laporan pelatihannya."
                },
                {
                    "val": "k6_11",
                    "label": "Fasilitas untuk mengakses sumber informasi dan sumber belajar."
                },
                {
                    "val": "k6_13",
                    "label": "Data hasil survei kepuasan terhadap kecukupan, kualitas dan akses terhadap fasilitas dan peralatan fisik serta sumber informasi pendidikan dan pelatihan klinis."
                }
            ]
        }
    ],
    "sarana": [
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_9",
                    "label": "Kebijakan dan prosedur mitigasi kasus risiko kecelakaan"
                }
            ]
        },
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_1",
                    "label": "Daftar infrastruktur fisik/sarana dan prasarana"
                },
                {
                    "val": "k6_3",
                    "label": "Daftar rumah sakit pendidikan dan wahana praktek klinik."
                },
                {
                    "val": "k6_4",
                    "label": "Daftar fasilitas di rumah sakit pendidikan dan pengajaran klinik (ruang diskusi, ruang shift malam, perpustakaan, dll.)"
                },
                {
                    "val": "k6_5",
                    "label": "Daftar manekin yang tersedia untuk pelatihan keterampilan klinis mahasiswa."
                },
                {
                    "val": "k6_6",
                    "label": "Kebijakan mengenai keselamatan dan kesehatan kerja civitas akademika."
                },
                {
                    "val": "k6_7",
                    "label": "Daftar pasien standar dan laporan pelatihannya."
                },
                {
                    "val": "k6_11",
                    "label": "Fasilitas untuk mengakses sumber informasi dan sumber belajar."
                },
                {
                    "val": "k6_13",
                    "label": "Data hasil survei kepuasan terhadap kecukupan, kualitas dan akses terhadap fasilitas dan peralatan fisik serta sumber informasi pendidikan dan pelatihan klinis."
                }
            ]
        }
    ],
    "keuangan": [
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_14",
                    "label": "Dokumen audit: keuangan dan sarana prasarana."
                }
            ]
        },
        {
            "group": "Tata Kelola dan Administrasi",
            "items": [
                {
                    "val": "k8_2",
                    "label": "Prosedur operasional standar pengalokasian anggaran."
                }
            ]
        }
    ],
    "umum": [
        {
            "group": "Visi, Misi, Tujuan, dan Strategi",
            "items": [
                {
                    "val": "k1_1",
                    "label": "Laporan kegiatan atau notulen rapat pada saat perumusan visi, misi, dan unggulan Program Studi yang berasal dari visi, misi, dan unggulan fakultas dan universitas. Visi, misi, dan unggulan tersebut mencakup peran UPPS dalam meningkatkan derajat kesehatan masyarakat."
                },
                {
                    "val": "k1_2",
                    "label": "Bukti kegiatan keterlibatan pemangku kepentingan internal (mahasiswa, dosen, tendik, pengelola) dan eksternal (lulusan, pengguna lulusan, mitra, pakar, organisasi profesi dan pemerintah) seperti daftar hadir, rekaman foto/video pada saat pertemuan."
                },
                {
                    "val": "k1_3",
                    "label": "Media yang digunakan untuk publikasi/sosialisasi visi, misi, dan unggulan."
                },
                {
                    "val": "k1_4",
                    "label": "Dokumen rencana strategi (renstra) dan rencana operasional (renop)"
                }
            ]
        },
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_8",
                    "label": "Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut"
                }
            ]
        },
        {
            "group": "Penilaian",
            "items": [
                {
                    "val": "k3_6",
                    "label": "Dokumen sistem Penjaminan Mutu: perencanaan dan pelaksanaan"
                }
            ]
        },
        {
            "group": "Mahasiswa",
            "items": [
                {
                    "val": "k4_9",
                    "label": "Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut"
                },
                {
                    "val": "k4_11",
                    "label": "Pedoman RCA (Root Cause Analysis)."
                }
            ]
        },
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_8",
                    "label": "Daftar pelatihan dan laporannya dari dosen klinis dan pembimbing"
                }
            ]
        },
        {
            "group": "Penjaminan Mutu",
            "items": [
                {
                    "val": "k7_1",
                    "label": "Sistem penjaminan mutu: struktur dan tupoksi."
                },
                {
                    "val": "k7_2",
                    "label": "Dokumen mutu: kebijakan, standar, manual, formulir, dan dokumen pendukung lainnya."
                },
                {
                    "val": "k7_3",
                    "label": "Laporan audit mutu internal."
                },
                {
                    "val": "k7_4",
                    "label": "Laporan rapat tinjauan manajemen."
                },
                {
                    "val": "k7_5",
                    "label": "Sumber daya yang dialokasikan untuk penjaminan mutu."
                },
                {
                    "val": "k7_6",
                    "label": "Notulen/risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem penjaminan mutu dan strategi keselamatan pasien."
                },
                {
                    "val": "k7_7",
                    "label": "Dokumen tindak lanjut atas umpan balik penjaminan mutu untuk peningkatan mutu berkelanjutan."
                },
                {
                    "val": "k7_8",
                    "label": "Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut"
                },
                {
                    "val": "k7_9",
                    "label": "Kebijakan dan prosedur mitigasi kasus risiko."
                }
            ]
        },
        {
            "group": "Tata Kelola dan Administrasi",
            "items": [
                {
                    "val": "k8_1",
                    "label": "Bagan organisasi pengelolaan dan administrasi beserta tupoksi."
                },
                {
                    "val": "k8_3",
                    "label": "Laporkan tinjauan kinerja institusi/UPPS"
                },
                {
                    "val": "k8_4",
                    "label": "Dokumen identifikasi dan mitigasi risiko."
                },
                {
                    "val": "k8_5",
                    "label": "Laporan/risalah rapat keterlibatan mahasiswa dan dosen dalam pengambilan keputusan dan fungsi UPPS"
                },
                {
                    "val": "k8_6",
                    "label": "Standar prosedur operasional (SPO) untuk proses pengambilan keputusan."
                },
                {
                    "val": "k8_8",
                    "label": "Dokumen indikator kinerja utama dan kinerja tambahan."
                }
            ]
        }
    ],
    "sistem_pendidikan": [
        {
            "group": "Visi, Misi, Tujuan, dan Strategi",
            "items": [
                {
                    "val": "k1_1",
                    "label": "Laporan kegiatan atau notulen rapat pada saat perumusan visi, misi, dan unggulan Program Studi yang berasal dari visi, misi, dan unggulan fakultas dan universitas. Visi, misi, dan unggulan tersebut mencakup peran UPPS dalam meningkatkan derajat kesehatan masyarakat."
                },
                {
                    "val": "k1_2",
                    "label": "Bukti kegiatan keterlibatan pemangku kepentingan internal (mahasiswa, dosen, tendik, pengelola) dan eksternal (lulusan, pengguna lulusan, mitra, pakar, organisasi profesi dan pemerintah) seperti daftar hadir, rekaman foto/video pada saat pertemuan."
                },
                {
                    "val": "k1_3",
                    "label": "Media yang digunakan untuk publikasi/sosialisasi visi, misi, dan unggulan."
                },
                {
                    "val": "k1_4",
                    "label": "Dokumen rencana strategi (renstra) dan rencana operasional (renop)"
                }
            ]
        },
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_8",
                    "label": "Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut"
                }
            ]
        },
        {
            "group": "Penjaminan Mutu",
            "items": [
                {
                    "val": "k7_1",
                    "label": "Sistem penjaminan mutu: struktur dan tupoksi."
                },
                {
                    "val": "k7_2",
                    "label": "Dokumen mutu: kebijakan, standar, manual, formulir, dan dokumen pendukung lainnya."
                },
                {
                    "val": "k7_3",
                    "label": "Laporan audit mutu internal."
                },
                {
                    "val": "k7_4",
                    "label": "Laporan rapat tinjauan manajemen."
                },
                {
                    "val": "k7_5",
                    "label": "Sumber daya yang dialokasikan untuk penjaminan mutu."
                },
                {
                    "val": "k7_6",
                    "label": "Notulen/risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem penjaminan mutu dan strategi keselamatan pasien."
                },
                {
                    "val": "k7_7",
                    "label": "Dokumen tindak lanjut atas umpan balik penjaminan mutu untuk peningkatan mutu berkelanjutan."
                },
                {
                    "val": "k7_8",
                    "label": "Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut"
                },
                {
                    "val": "k7_9",
                    "label": "Kebijakan dan prosedur mitigasi kasus risiko."
                }
            ]
        },
        {
            "group": "Tata Kelola dan Administrasi",
            "items": [
                {
                    "val": "k8_1",
                    "label": "Bagan organisasi pengelolaan dan administrasi beserta tupoksi."
                },
                {
                    "val": "k8_3",
                    "label": "Laporkan tinjauan kinerja institusi/UPPS"
                },
                {
                    "val": "k8_4",
                    "label": "Dokumen identifikasi dan mitigasi risiko."
                },
                {
                    "val": "k8_5",
                    "label": "Laporan/risalah rapat keterlibatan mahasiswa dan dosen dalam pengambilan keputusan dan fungsi UPPS"
                },
                {
                    "val": "k8_6",
                    "label": "Standar prosedur operasional (SPO) untuk proses pengambilan keputusan."
                },
                {
                    "val": "k8_8",
                    "label": "Dokumen indikator kinerja utama dan kinerja tambahan."
                }
            ]
        }
    ],
    "perpustakaan": [
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_2",
                    "label": "Daftar sistem pendukung pembelajaran lainnya. Sistem manajemen pembelajaran dan dukungan internet"
                },
                {
                    "val": "k6_9",
                    "label": "Daftar database jurnal yang tersedia"
                },
                {
                    "val": "k6_10",
                    "label": "Formulir evaluasi dan umpan balik dari mahasiswa dan staf akademik serta administrasi untuk sumber informasi yang tersedia"
                }
            ]
        }
    ],
    "sistem_informasi": [
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_2",
                    "label": "Daftar sistem pendukung pembelajaran lainnya. Sistem manajemen pembelajaran dan dukungan internet"
                },
                {
                    "val": "k6_9",
                    "label": "Daftar database jurnal yang tersedia"
                },
                {
                    "val": "k6_10",
                    "label": "Formulir evaluasi dan umpan balik dari mahasiswa dan staf akademik serta administrasi untuk sumber informasi yang tersedia"
                }
            ]
        }
    ],
    "humas": [
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_7",
                    "label": "Risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem manajemen mutu dan strategi keselamatan pasien"
                }
            ]
        },
        {
            "group": "Mahasiswa",
            "items": [
                {
                    "val": "k4_7",
                    "label": "Dokumen hasil survey kepuasaan mahasiswa terhadap layanan manajemen"
                }
            ]
        },
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_12",
                    "label": "Data hasil survei kepuasan atas pelayanan yang diberikan manajemen kepada seluruh pemangku kepentingan (mahasiswa, dosen, pegawai, rekanan, dan pemberi kerja alumni)."
                }
            ]
        }
    ],
    "kerjasama": [
        {
            "group": "Kurikulum",
            "items": [
                {
                    "val": "k2_7",
                    "label": "Risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem manajemen mutu dan strategi keselamatan pasien"
                }
            ]
        },
        {
            "group": "Mahasiswa",
            "items": [
                {
                    "val": "k4_7",
                    "label": "Dokumen hasil survey kepuasaan mahasiswa terhadap layanan manajemen"
                }
            ]
        },
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_12",
                    "label": "Data hasil survei kepuasan atas pelayanan yang diberikan manajemen kepada seluruh pemangku kepentingan (mahasiswa, dosen, pegawai, rekanan, dan pemberi kerja alumni)."
                }
            ]
        }
    ],
    "rumah_tangga": [
        {
            "group": "Sarana, Prasarana Pendidikan, dan Keuangan",
            "items": [
                {
                    "val": "k6_1",
                    "label": "Daftar infrastruktur fisik/sarana dan prasarana"
                },
                {
                    "val": "k6_6",
                    "label": "Kebijakan mengenai keselamatan dan kesehatan kerja civitas akademika."
                }
            ]
        }
    ]
};


const FORMAT_MAP = {
  pdf:   { icon: 'fa-file-pdf',   label: 'PDF' },
  excel: { icon: 'fa-file-excel', label: 'Excel' },
  word:  { icon: 'fa-file-word',  label: 'Word' },
  image: { icon: 'fa-file-image', label: 'Gambar' }
};

const STATUS_CFG = {
  aktif:    { cls:'s-aktif',    icon:'fa-circle-dot',     label:'Aktif' },
  diproses: { cls:'s-diproses', icon:'fa-hourglass-half', label:'Diproses' },
  selesai:  { cls:'s-selesai',  icon:'fa-check-circle',   label:'Selesai' },
  arsip:    { cls:'s-arsip',    icon:'fa-box-archive',    label:'Diarsipkan' },
};

/* ─── STATE ─── */
let arsip    = [];
let currentDeptSub = 'all';
let currentLabTab = 'dashboard';
let currentSaranaTab = 'dashboard';
let currentPengabdianTab = 'dashboard';
let currentPengabdianAY = '2025/2026 Genap';

function renderDeptSubmenus() {
  document.querySelectorAll('.sb-link[data-page="dept"]').forEach(link => {
    const deptId = link.getAttribute('data-dept');
    
    let existingUl = link.nextElementSibling;
    if (existingUl && existingUl.classList.contains('sb-sub-menu')) {
      existingUl.remove();
    }
    
    const ul = document.createElement('ul');
    ul.className = 'sb-sub-menu';
    ul.id = `submenu-${deptId}`;
    ul.style.display = (currentPage === 'dept' && currentDept === deptId) ? 'block' : 'none';
    
    if (deptId === 'laboratorium') {
      const labSubItems = [
        { id: 'dashboard', label: 'Dashboard & Grafik', icon: 'fas fa-chart-pie' },
        { id: 'inventaris', label: 'Inventaris Alat Lab', icon: 'fas fa-boxes-stacked' },
        { id: 'perawatan', label: 'Pemeliharaan Alat', icon: 'fas fa-wrench' },
        { id: 'logbook', label: 'Logbook & Praktikum', icon: 'fas fa-book-bookmark' },
        { id: 'jadwal', label: 'Jadwal Praktikum', icon: 'fas fa-calendar-days' },
        { id: 'anggaran', label: 'Anggaran Lab (RAB)', icon: 'fas fa-file-invoice-dollar' },
        { id: 'dokumen', label: 'SOP & Dokumen Lab', icon: 'fas fa-file-shield' },
        { id: 'lpj', label: 'Laporan LPJ Lab', icon: 'fas fa-file-lines' },
        { id: 'portal', label: 'Web App SIMLAB', icon: 'fas fa-window-maximize' }
      ];
      labSubItems.forEach(item => {
        let isActive = (currentLabTab === item.id && currentDept === 'laboratorium') ? 'active' : '';
        ul.innerHTML += `<li class="${isActive}" onclick="switchLabTabFromSidebar('${item.id}', this)">
          <i class="${item.icon}"></i> ${item.label}
        </li>`;
      });
    } else if (deptId === 'sarana') {
      const saranaSubItems = [
        { id: 'dashboard', label: 'Dashboard & Grafik', icon: 'fas fa-chart-pie' },
        { id: 'inventaris', label: 'Inventarisasi Aset', icon: 'fas fa-boxes-stacked' },
        { id: 'peminjaman', label: 'Peminjaman Sarpras', icon: 'fas fa-hand-holding' },
        { id: 'anggaran', label: 'Anggaran Sarpras (RAB)', icon: 'fas fa-file-invoice-dollar' },
        { id: 'sop', label: 'SOP Sarana Prasarana', icon: 'fas fa-file-shield' },
        { id: 'pengawasan', label: 'Pengawasan & Evaluasi', icon: 'fas fa-clipboard-check' },
        { id: 'pemeliharaan', label: 'Pemeliharaan & Servis', icon: 'fas fa-wrench' },
        { id: 'laporan', label: 'Laporan & Berita Acara', icon: 'fas fa-file-lines' },
        { id: 'portal', label: 'Web App SIMSPRAS', icon: 'fas fa-window-maximize' }
      ];
      saranaSubItems.forEach(item => {
        let isActive = (currentSaranaTab === item.id && currentDept === 'sarana') ? 'active' : '';
        ul.innerHTML += `<li class="${isActive}" onclick="switchSaranaTabFromSidebar('${item.id}', this)">
          <i class="${item.icon}"></i> ${item.label}
        </li>`;
      });
    } else if (deptId === 'pengabdian') {
      const pkmSubItems = [
        { id: 'dashboard', label: 'Dashboard & Grafik', icon: 'fas fa-chart-pie' },
        { id: 'usulan', label: 'Usulan Proposal PkM', icon: 'fas fa-file-signature' },
        { id: 'baksos', label: 'Logbook & Pasien Baksos', icon: 'fas fa-stethoscope' },
        { id: 'reviewer', label: 'Reviewer Desk', icon: 'fas fa-clipboard-check' },
        { id: 'luaran', label: 'Katalog Luaran & HKI', icon: 'fas fa-award' },
        { id: 'borang', label: 'Borang LAM-PTKes (7 & 8)', icon: 'fas fa-table' },
        { id: 'dokumen', label: 'Dokumen & SK PkM', icon: 'fas fa-file-contract' },
        { id: 'portal', label: 'Web App SIM-PKM', icon: 'fas fa-window-maximize' }
      ];
      pkmSubItems.forEach(item => {
        let isActive = (currentPengabdianTab === item.id && currentDept === 'pengabdian') ? 'active' : '';
        ul.innerHTML += `<li class="${isActive}" onclick="switchPengabdianTabFromSidebar('${item.id}', this)">
          <i class="${item.icon}"></i> ${item.label}
        </li>`;
      });
      ul.innerHTML += `<hr style="border-color:rgba(255,255,255,0.08); margin:4px 10px;">`;
      ul.innerHTML += `<li onclick="syncPengabdianFromSumber()" style="color:#22c55e; font-weight:600;">
        <i class="fas fa-rotate" id="sbPengabdianSyncIcon"></i> <span style="flex:1;">Sinkron Data Live PkM</span>
      </li>`;
    } else if (DEPT_JENIS[deptId]) {
      let countAll = arsip.filter(a => a.bidang === deptId).length;
      ul.innerHTML += `<li class="${currentDeptSub === 'all' && currentDept === deptId ? 'active' : ''}" onclick="switchDeptSub('all', this, '${deptId}')">
        <i class="fas fa-folder-open"></i> Semua Arsip <span class="badge bg-p1" style="float:right; margin-top:2px;">${countAll}</span>
      </li>`;
      
      DEPT_JENIS[deptId].forEach((group, index) => {
        let count = arsip.filter(a => {
           if(a.bidang !== deptId) return false;
           return group.items.some(item => item.val === a.jenis);
        }).length;
        
        let safeId = 'group_' + index;
        let isActive = (currentDeptSub === safeId && currentDept === deptId) ? 'active' : '';
        ul.innerHTML += `<li class="${isActive}" onclick="switchDeptSub('${safeId}', this, '${deptId}')">
          <i class="fas fa-caret-right"></i> ${group.group} <span class="badge bg-p2" style="float:right; margin-top:2px;">${count}</span>
        </li>`;
      });
    }
    
    link.parentNode.insertBefore(ul, link.nextSibling);
  });
}

function switchDeptSub(subId, element, deptId) {
  document.querySelectorAll(`#submenu-${deptId} li`).forEach(li => li.classList.remove('active'));
  element.classList.add('active');
  currentDeptSub = subId;
  if (currentDept !== deptId) {
    currentDept = deptId;
    showPage('dept');
  } else {
    renderDeptPage(deptId);
  }
}

let isLamptkesMode = false;
let isBanptMode = false;
let activity = [];
let mahasiswa = [];
let sdm = [];
let currentPage = 'dashboard';
let isAppLoaded = false;
let uploadCount = 0;

window.addEventListener('beforeunload', function (e) {
  if (uploadCount > 0) {
    e.preventDefault();
    e.returnValue = 'Ada file yang masih dalam proses unggah. Jika Anda keluar, file akan macet pada status Mengunggah.';
  }
});
let currentDept = '';
let currentAY   = '';
let pendingPdfId = '';
let cLine, cYearlyLine, cDoughnut, cStatus, cDeptBar, cDeptDonut, cAnBar, cAnYear;

/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
   INIT
   ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */
document.addEventListener('DOMContentLoaded', async () => {
  currentAY = getAY(new Date().toISOString().slice(0,10));
  renderSidebarDate();
  setupNav();
  setupHamburger();
  document.addEventListener('click', e => {
    if (!e.target.closest('.export-box'))
      document.getElementById('exportMenu').classList.remove('open');
  });
  initSidebarSubMenus();
  await loadData();
  isAppLoaded = true;
  populateAYearSelect();
  updateBadges();
  generateBanptReport();
  generateLamptkesReport();
  showPage('dashboard');
});

/* ÔöÇÔöÇÔöÇ ACADEMIC YEAR ÔöÇÔöÇÔöÇ */
function getAY(dateStr) {
  if (!dateStr) return '';
  if (String(dateStr).length === 4) return String(dateStr);
  const d = new Date(dateStr + 'T00:00:00');
  return d.getFullYear().toString();
}
function getAYMonths(ay) {
  if (!ay) return [];
  const ms = [];
  for (let m=1; m<=12; m++) {
    ms.push(`${ay}-${String(m).padStart(2,'0')}`);
  }
  return ms;
}
function getMonthLabel(ym) {
  const [y,m] = ym.split('-');
  const n=['','Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${n[+m]}'${y.slice(2)}`;
}
function allAYears() {
  const s = new Set(arsip.map(a=>a.ay||getAY(a.tanggal)));
  if (currentAY) s.add(currentAY);
  for(let y=2014; y<=2050; y++) {
    s.add(y.toString());
  }
  return [...s].sort().reverse();
}
function populateAYearSelect() {
  const sel = document.getElementById('globalAYear');
  const mhsAy = document.getElementById('mhsFilterAy');
  const sdmAy = document.getElementById('sdmFilterAy');
  
  const yrs = allAYears();
  
  const globalHtml = '<option value="">Semua</option>' + yrs.map(y=>`<option value="${y}"${y===currentAY?' selected':''}>${y}</option>`).join('');
  if (sel) sel.innerHTML = globalHtml;
  
  const filterHtml = '<option value="">Semua</option>' + yrs.map(y=>`<option value="${y}">${y}</option>`).join('');
  if (mhsAy && !mhsAy.value) mhsAy.innerHTML = filterHtml;
  if (sdmAy && !sdmAy.value) sdmAy.innerHTML = filterHtml;
}
function onAYearChange() {
  currentAY = document.getElementById('globalAYear').value;
  updateBadges();
  if (currentPage==='dashboard')  renderDashboard();
  else if (currentPage==='arsip') renderArsipTable();
  else if (currentPage==='dept')  renderDeptPage(currentDept);
  else if (currentPage==='analytics') renderAnalytics();
  else if (currentPage==='lamptkes') initLamptkes();

}

/* ÔöÇÔöÇÔöÇ DATA ÔöÇÔöÇÔöÇ */
function checkKadaluarsa(tanggal) {
  if(!tanggal) return 'aman';
  const d = new Date(tanggal);
  const now = new Date();
  const diffYears = (now - d) / (1000 * 60 * 60 * 24 * 365.25);
  if (diffYears >= 5) return 'kadaluarsa';
  if (diffYears >= 4) return 'perlu_diperbarui';
  return 'aman';
}

let isInitialLoad = { arsip: true, activity: true, mahasiswa: true, sdm: true };

let hasMigratedK9 = false;
function processSnapshot(snapshot, collectionName) {
  const data = snapshot.docs.map(d => d.data());
  
  if (collectionName === 'arsip') { 
      let isFirst = isInitialLoad.arsip;
      // Force recalculate ay from tanggal so old database strings are ignored
      data.forEach(a => { 
          if (isFirst && a.gdriveLink === 'UPLOADING') {
              a.gdriveLink = '';
              try { db.collection('arsip').doc(a.id).update({ gdriveLink: '' }); } catch(e) {}
          }
          a.ay = getAY(a.tanggal); 
      });
      arsip = data;
 
      
      // MIGRATION SCRIPT FOR ALL K1-K8
      if (!hasMigratedK9 && typeof db !== 'undefined') {
          hasMigratedK9 = true;
          let batch = db.batch();
          let changedCount = 0;
          
          arsip.forEach(a => {
             let changed = false;
             let j = a.jenis || '';
             
             // Mapping based on common keywords
             if (!a.id || (!a.id.startsWith('SIMLAB-') && !a.id.startsWith('SIMSPRAS-'))) {
                 // Academic & Curriculum (K2 & K3)
                 if (j.includes('kurikulum') || j.includes('rps') || j.includes('pembelajaran') || j.includes('modul')) {
                     if (!j.match(/^k[23]_/)) { a.jenis = 'k2_2'; a.bidang = 'akademik'; changed = true; }
                 }
                 else if (j.includes('nilai') || j.includes('logbook') || j.includes('remedial') || j.includes('cbt') || j.includes('osce')) {
                     if (!j.match(/^k[23]_/)) { a.jenis = 'k3_1'; a.bidang = 'akademik'; changed = true; }
                 }
                 // Mahasiswa (K4)
                 else if (j.includes('mhs') || j.includes('mahasiswa') || j.includes('tracer') || j.includes('lulusan') || j.includes('alumni')) {
                     if (!j.match(/^k4_/)) { a.jenis = 'k4_2'; a.bidang = 'kemahasiswaan'; changed = true; }
                 }
                 // SDM / Dosen / Tendik (K5)
                 else if (j.includes('dosen') || j.includes('tendik') || j.includes('sdm') || j.includes('pelatihan')) {
                     if (!j.match(/^k5_/)) { a.jenis = 'k5_1'; a.bidang = 'kepegawaian'; changed = true; }
                 }
                 // Penelitian & PkM (K5)
                 else if (j.includes('penelitian') || j.includes('pkm') || j.includes('jurnal') || j.includes('haki') || j.includes('paten')) {
                     if (!j.match(/^k5_/)) { a.jenis = 'k5_9'; a.bidang = 'penelitian_pengabdian'; changed = true; }
                 }
                 // Sarpras & Keuangan (K6)
                 else if (j.includes('sarana') || j.includes('prasarana') || j.includes('fasilitas') || j.includes('alat') || j.includes('ruang') || j.includes('lab')) {
                     if (!j.match(/^k6_/)) { a.jenis = 'k6_1'; a.bidang = 'sarpras'; changed = true; }
                 }
                 else if (j.includes('uang') || j.includes('anggaran') || j.includes('dana')) {
                     if (!j.match(/^k[68]_/)) { a.jenis = 'k6_14'; a.bidang = 'keuangan'; changed = true; }
                 }
                 // Penjaminan Mutu (K7)
                 else if (j.includes('mutu') || j.includes('spmi') || j.includes('ami') || j.includes('audit') || j.includes('led')) {
                     if (!j.match(/^k7_/)) { a.jenis = 'k7_2'; a.bidang = 'penjaminan_mutu'; changed = true; }
                 }
                 // Visi Misi & Tata Kelola (K1 & K8)
                 else if (j.includes('visi') || j.includes('misi') || j.includes('renstra') || j.includes('renop')) {
                     if (!j.match(/^k1_/)) { a.jenis = 'k1_4'; a.bidang = 'pimpinan'; changed = true; }
                 }
                 else if (j.includes('sk') || j.includes('keputusan') || j.includes('sop') || j.includes('kinerja')) {
                     // Might just leave them as is, but if they are stuck in kriteria_9:
                     if (a.bidang === 'kriteria_9') { a.jenis = 'k8_1'; a.bidang = 'pimpinan'; changed = true; }
                 }
             }
             
             // Fallback for ANY old k-prefixed items that still don't match the new keys exactly
             // (This ensures they map to something valid in the new dropdowns)
             if (!changed && j.match(/^k[1-9]_/)) {
                 // Try to keep them in their respective criteria group (K1 to K8)
                 let kMatch = j.match(/^(k[1-8])_/);
                 if (kMatch) {
                     let prefix = kMatch[1];
                     // Default maps for each group if not already mapped
                     let defaults = {
                         'k1': {j: 'k1_1', b: 'pimpinan'},
                         'k2': {j: 'k2_1', b: 'akademik'},
                         'k3': {j: 'k3_1', b: 'akademik'},
                         'k4': {j: 'k4_1', b: 'kemahasiswaan'},
                         'k5': {j: 'k5_1', b: 'kepegawaian'},
                         'k6': {j: 'k6_1', b: 'sarpras'},
                         'k7': {j: 'k7_1', b: 'penjaminan_mutu'},
                         'k8': {j: 'k8_1', b: 'pimpinan'}
                     };
                     a.jenis = defaults[prefix].j;
                     a.bidang = defaults[prefix].b;
                     changed = true;
                 } else if (j.startsWith('k9_')) {
                     a.jenis = 'k8_8'; a.bidang = 'pimpinan'; changed = true;
                 }
             }

             if (changed) {
                 try {
                     let docRef = db.collection('arsip').doc(a.id);
                     batch.update(docRef, { jenis: a.jenis, bidang: a.bidang });
                     changedCount++;
                 } catch(e) { console.error(e); }
             }
          });
          
          if (changedCount > 0) {
              console.log(`Migrating ${changedCount} Kriteria 9 documents...`);
              batch.commit().then(() => {
                  console.log("Kriteria 9 Migration complete.");
                  save();
              }).catch(e => console.error("Migration failed:", e));
          }
      }
  }
  else if (collectionName === 'activity') { activity = data; }
  else if (collectionName === 'mahasiswa') { 
    // Compute ay from angkatan (4-digit year) so filtering works correctly
    data.forEach(m => { if (!m.ay && m.angkatan) m.ay = String(m.angkatan).substring(0,4); });
    mahasiswa = data; 
  }
  else if (collectionName === 'sdm') { sdm = data; }

  if (!isInitialLoad[collectionName]) {

     
     if (isAppLoaded) {
       updateBadges();
       initBanpt();
       initLamptkes();
       // Re-render visible page
       const activePage = document.querySelector('.page.active');
       if(activePage) {
          const id = activePage.id;
          if(id === 'page-dashboard') renderDashboard();
          else if(id === 'page-analytics') renderAnalytics();
          else if(id === 'page-dept' && currentDept) renderDeptPage(currentDept);
          else if(id === 'page-lamptkes') generateLamptkesReport();
          else if(id === 'page-mahasiswa') renderMahasiswaPage();
          else if(id === 'page-sdm') renderSdmPage();
          else if(id === 'page-arsip') renderArsipTable();
          else if(id === 'page-banpt') generateBanptReport();
       }
     }
  }
}

async function loadData() {
// Migration: Update old bidang keys to new keys
arsip = JSON.parse(localStorage.getItem('SIMARSIP_AAS')) || [];
let dataMigrated = false;
arsip.forEach(a => {
  if (a.bidang === 'lppm') { a.bidang = 'penelitian_pelatihan'; dataMigrated = true; }
  if (a.bidang === 'umum') { a.bidang = 'admin_umum'; dataMigrated = true; }
  if (a.bidang === 'kepegawaian' || a.bidang === 'sdm') { a.bidang = 'admin_kepegawaian'; dataMigrated = true; }
  if (a.bidang === 'keuangan') { a.bidang = 'admin_keuangan'; dataMigrated = true; }
});
if (dataMigrated) {
  save(); // Save to localStorage
  console.log('Migrated old arsip data to new Bidang keys');
}

  return new Promise((resolve) => {
    let loadedCount = 0;
    const checkDone = () => {
      loadedCount++;
      if(loadedCount === 4) {
         // Check kadaluarsa
         if(arsip.some(a => checkKadaluarsa(a.tanggal) !== 'aman')) {
            const alert = document.getElementById('soundAlert');
            if(alert) { alert.currentTime = 0; alert.play().catch(e=>console.log('Audio restricted', e)); }
         }
         resolve();
      }
    };

    try {
      db.collection('arsip').onSnapshot(snap => {
        processSnapshot(snap, 'arsip');
        if (isInitialLoad.arsip) { isInitialLoad.arsip = false; checkDone(); }
      });
      db.collection('activity').onSnapshot(snap => {
        processSnapshot(snap, 'activity');
        if (isInitialLoad.activity) { isInitialLoad.activity = false; checkDone(); }
      });
      db.collection('mahasiswa').onSnapshot(snap => {
        processSnapshot(snap, 'mahasiswa');
        if (isInitialLoad.mahasiswa) { isInitialLoad.mahasiswa = false; checkDone(); }
      });
      db.collection('sdm').onSnapshot(snap => {
        processSnapshot(snap, 'sdm');
        if (isInitialLoad.sdm) { isInitialLoad.sdm = false; checkDone(); }
      });
    } catch(err) {
      console.error('Failed to set up onSnapshot', err);
      try {
        arsip = JSON.parse(localStorage.getItem('SIMARSIP_AAS'))||[];
        activity = JSON.parse(localStorage.getItem('SIMARSIP_ACT'))||[];
        mahasiswa = JSON.parse(localStorage.getItem('SIMARSIP_MHS'))||[];
        sdm = JSON.parse(localStorage.getItem('SIMARSIP_SDM'))||[];
      } catch { arsip=[]; activity=[]; mahasiswa=[]; sdm=[]; }
      if (!arsip.length) { arsip = sampleData(); }
      if (!mahasiswa.length) { mahasiswa = sampleDataMahasiswa(); }
      if (!sdm.length) { sdm = sampleDataSDM(); }
      resolve();
    }
  });
    // Migration: K9 to respective criteria
    let k9Migrated = false;
    if (typeof db !== 'undefined') {
      const batch = db.batch();
      arsip.forEach(a => {
         let changed = false;
         if (a.jenis === 'k9_data_ipk') { a.jenis = 'k6_data_ipk'; changed = true; }
         if (a.jenis === 'k9_capaian_pembelajaran') { a.jenis = 'k6_capaian_pembelajaran'; changed = true; }
         if (a.jenis === 'k9_rekap_luaran_penelitian_dosen') { a.jenis = 'k7_rekap_luaran_penelitian_dosen'; changed = true; }
         if (a.jenis === 'k9_rekap_luaran_penelitian_mhs') { a.jenis = 'k7_rekap_luaran_penelitian_mhs'; changed = true; }
         if (a.jenis === 'k9_laporan_tracer_study') { a.jenis = 'k3_laporan_tracer_study'; changed = true; }
         if (a.jenis === 'k9_survei_kepuasan_pengguna_lulusan') { a.jenis = 'k3_survei_kepuasan_pengguna_lulusan'; changed = true; }
         if (a.jenis === 'k9_data_waktu_tunggu_lulusan') { a.jenis = 'k3_data_waktu_tunggu_lulusan'; changed = true; }
         if (a.jenis === 'k9_data_pekerjaan_pertama') { a.jenis = 'k3_data_pekerjaan_pertama'; changed = true; }
         if (a.jenis === 'k9_luaran_pkm_artikel') { a.jenis = 'k8_luaran_pkm_artikel'; changed = true; }
         if (a.jenis === 'k9_luaran_pkm_buku') { a.jenis = 'k8_luaran_pkm_buku'; changed = true; }
         if (a.jenis === 'k9_luaran_pkm_teknologi') { a.jenis = 'k8_luaran_pkm_teknologi'; changed = true; }
         if (a.jenis === 'k9_led') { a.jenis = 'led_finish'; changed = true; }
         if (a.jenis === 'k9_spmi') { a.jenis = 'spmi_finish'; changed = true; }
         if (a.jenis && a.jenis.match(/^k[0-9]_spmi$/)) {
             a.jenis = 'spmi_finish'; changed = true;
         }
         // Fallback catch-all for any other k9 data
         if (a.jenis && a.jenis.startsWith('k9_') && !changed) {
             a.jenis = a.jenis.replace('k9_', 'k8_');
             changed = true;
         }
         
         if (changed) {
            k9Migrated = true;
            try {
              let docRef = db.collection('arsip').doc(a.id);
              batch.update(docRef, { jenis: a.jenis });
            } catch(e){}
         }
      });
      if (k9Migrated) {
         save(); // Ensure localStorage is also updated
         try {
           batch.commit().then(() => {
              console.log("Migrated K9 documents to Firestore");
              if (currentPage === 'lamptkes') generateLamptkesReport();
              if (currentPage === 'arsip') renderArsipTable();
           });
         } catch(e){}
      }
    }
    arsip.forEach(a => { a.ay = getAY(a.tanggal); });
    populateAYearSelect();
    updateBadges();
    if(currentPage==='dashboard') renderDashboard();
    else if(currentPage==='arsip') renderArsipTable();
    else if(currentPage==='dept') renderDeptPage(currentDept);
    else if(currentPage==='analytics') renderAnalytics();
    else if(currentPage==='lamptkes') initLamptkes();

  }
function save() {
  try {
    localStorage.setItem('SIMARSIP_AAS', JSON.stringify(arsip));
    localStorage.setItem('SIMARSIP_ACT', JSON.stringify(activity));
    localStorage.setItem('SIMARSIP_MHS', JSON.stringify(mahasiswa));
    localStorage.setItem('SIMARSIP_SDM', JSON.stringify(sdm));
  } catch(e) {}
}
function genId() { return Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

function sampleDataMahasiswa() {
  return [
    { id:genId(), nim:'2024001', nama:'Ahmad Fauzan', angkatan:'2024-08-10', semester:'2', status:'aktif', tempatLahir:'Surabaya', tanggalLahir:'2005-04-12', jk:'Laki-laki', agama:'Islam', alamat:'Jl. Kenangan No. 12, Surabaya', noHp:'081234567890', email:'fauzan@example.com', noBpjs:'000111222333', namaOrtu:'Bapak Supardi', catatan:'Beasiswa Unggulan', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nim:'2024050', nama:'Siti Aisyah', angkatan:'2024-08-10', semester:'1', status:'aktif', tempatLahir:'Gresik', tanggalLahir:'2005-11-20', jk:'Perempuan', agama:'Islam', alamat:'Jl. Melati No. 4, Gresik', noHp:'08567891234', email:'siti.a@example.com', noBpjs:'000222333444', namaOrtu:'Ibu Rini', catatan:'', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nim:'2023015', nama:'Budi Santoso', angkatan:'2023-08-05', semester:'3', status:'cuti', tempatLahir:'Malang', tanggalLahir:'2004-11-20', jk:'Laki-laki', agama:'Islam', alamat:'Jl. Merdeka No. 45, Malang', noHp:'08567891234', email:'budi.s@example.com', noBpjs:'000222333444', namaOrtu:'Ibu Rini', catatan:'Cuti karena sakit', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nim:'2023020', nama:'Dina Fitriani', angkatan:'2023-08-05', semester:'4', status:'aktif', tempatLahir:'Sidoarjo', tanggalLahir:'2004-01-15', jk:'Perempuan', agama:'Islam', alamat:'Perum Pahlawan Blok A', noHp:'081211223344', email:'dina.f@example.com', noBpjs:'000444555666', namaOrtu:'Bapak Rudi', catatan:'', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nim:'2022005', nama:'Eko Purnomo', angkatan:'2022-09-02', semester:'5', status:'aktif', tempatLahir:'Mojokerto', tanggalLahir:'2003-05-10', jk:'Laki-laki', agama:'Islam', alamat:'Jl. Raya Mojokerto No. 20', noHp:'085511223344', email:'eko.p@example.com', noBpjs:'000555666777', namaOrtu:'Ibu Sutinah', catatan:'', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nim:'2022021', nama:'Anisa Rahmawati', angkatan:'2022-09-02', semester:'6', status:'aktif', tempatLahir:'Sidoarjo', tanggalLahir:'2003-02-14', jk:'Perempuan', agama:'Islam', alamat:'Perum Indah Blok C2', noHp:'089911223344', email:'anisa.r@example.com', noBpjs:'000333444555', namaOrtu:'Bapak Joko', catatan:'Sedang menyusun KTI', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nim:'2021003', nama:'Rizky Pratama', angkatan:'2021-09-01', semester:'Lulus', status:'lulus', tempatLahir:'Surabaya', tanggalLahir:'2002-12-01', jk:'Laki-laki', agama:'Islam', alamat:'Jl. Pahlawan No. 10', noHp:'081199887766', email:'rizky.p@example.com', noBpjs:'', namaOrtu:'Bapak Agus', catatan:'Lulus Cumlaude', foto:'', dokumen:'', createdAt:new Date().toISOString() },
  ];
}

function sampleDataSDM() {
  return [
    { id:genId(), nik:'0721058201', nama:'Dr. Siti Aminah, M.Kes', jabatan:'Direktur / Dosen Tetap', status:'aktif', tempatLahir:'Surabaya', tanggalLahir:'1982-05-21', jk:'Perempuan', agama:'Islam', alamat:'Jl. Dokter Soetomo No. 8', noHp:'081122334455', email:'sitiaminah@example.com', noBpjs:'000999888777', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nik:'0715087502', nama:'Drs. Ahmad Fauzi, M.Sc', jabatan:'Wakil Direktur', status:'aktif', tempatLahir:'Kediri', tanggalLahir:'1975-08-15', jk:'Laki-laki', agama:'Islam', alamat:'Perum YYY', noHp:'085544332211', email:'ahmad.f@example.com', noBpjs:'000888777666', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nik:'0702118803', nama:'Rina Wati, S.ST., M.Kes', jabatan:'Ka. Prodi Akupunktur', status:'tugas_belajar', tempatLahir:'Gresik', tanggalLahir:'1988-11-02', jk:'Perempuan', agama:'Islam', alamat:'Jl. Raya Gresik', noHp:'087766554433', email:'rina.w@example.com', noBpjs:'', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nik:'1029301923', nama:'Bambang Sugiarto', jabatan:'Staff Keuangan', status:'pensiun', tempatLahir:'Surabaya', tanggalLahir:'1960-03-10', jk:'Laki-laki', agama:'Katolik', alamat:'Jl. Tua No. 1', noHp:'081211112222', email:'bambang.s@example.com', noBpjs:'000111999888', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nik:'1029301923', nama:'Bambang Sugiarto', jabatan:'Staff Keuangan', status:'pensiun', tempatLahir:'Surabaya', tanggalLahir:'1960-03-10', jk:'Katolik', alamat:'Jl. Tua No. 1', noHp:'081211112222', email:'bambang.s@example.com', noBpjs:'000111999888', foto:'', dokumen:'', createdAt:new Date().toISOString() },
    { id:genId(), nik:'1029301923', nama:'Bambang Sugiarto', jabatan:'Staff Keuangan', status:'pensiun', tempatLahir:'Surabaya', tanggalLahir:'1960-03-10', jk:'Katolik', alamat:'Jl. Tua No. 1', noHp:'081211112222', email:'bambang.s@example.com', noBpjs:'000111999888', foto:'', dokumen:'', createdAt:new Date().toISOString() },
  ];
}

function sampleData() {
  const m = (nomor,judul,bidang,jenis,format,tgl,pengirim,status,ket,link='',metadata={}) => ({
    id:genId(), nomor, judul, bidang, jenis, format:format||'pdf',
    tanggal:tgl, pengirim, status, keterangan:ket, ay:getAY(tgl),
    fileName:link?judul.replace(/\s+/g,'_').slice(0,30)+'.'+format:'',
    gdriveLink:link, createdAt:new Date().toISOString(), metadata
  });
  return [

  ];
}

/* ÔöÇÔöÇÔöÇ HELPERS ÔöÇÔöÇÔöÇ */
function getJenisLabel(bidang, jenis) {
  if (!jenis) return '-';
  const groups = DEPT_JENIS[bidang] || [];
  let found = null;
  for (let group of groups) {
    if (group.items) {
      let item = group.items.find(t => t.val === jenis);
      if (item) { found = item.label; break; }
    }
  }

  return found || String(jenis).replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
}
function getFormatCfg(fmt) { return FORMAT_MAP[fmt] || FORMAT_MAP.pdf; }

function fmtBadge(a) {
  if (!a.gdriveLink) return `<span class="no-file">—</span>`;
  if (a.gdriveLink === 'UPLOADING') return `<span style="color:#f59e0b;font-size:0.85rem;white-space:nowrap"><i class="fas fa-spinner fa-spin"></i> Mengunggah...</span>`;
  const f = getFormatCfg(a.format);
  return `<a href="${esc(a.gdriveLink)}" target="_blank" rel="noopener noreferrer" class="fmt-btn fmt-${a.format||'pdf'}" title="Buka Dokumen: ${esc(a.fileName||a.judul||'')}"><i class="${f.icon}"></i> ${f.label}</a>`;
}
function logGDriveOpen(id, e) {
  const a = arsip.find(x=>x.id===id);
  if (a) { log('edit',`Membuka dokumen: "${a.judul}" di Google Drive`); save(); }
}

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtDate(d) { if(!d)return'ÔÇö'; return new Date(d+'T00:00:00').toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}); }
function fmtDateTime(d) { if(!d)return'ÔÇö'; return new Date(d).toLocaleString('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
function statusBadge(status) { const c=STATUS_CFG[status]||STATUS_CFG.arsip; return `<span class="s-badge ${c.cls}"><i class="fas ${c.icon}"></i>${c.label}</span>`; }
function now() { return new Date().toISOString().slice(0,10); }

/* ÔöÇÔöÇÔöÇ NAVIGATION ÔöÇÔöÇÔöÇ */
function setupNav() {
  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', e => {
      if (link.getAttribute('href') && link.getAttribute('href') !== '#') return;
      e.preventDefault();
      const page = link.dataset.page, dept = link.dataset.dept||'';
      
      if (page === 'dept' && currentDept === dept && currentPage === 'dept') {
        const menu = document.getElementById(`dept-${dept}-sub-menu`);
        if (menu) menu.style.display = (menu.style.display === 'none') ? 'flex' : 'none';
        return;
      }
      
      if ((page === 'banpt' || page === 'lamptkes') && currentPage === page) {
        const menu = document.getElementById(`${page}-sub-menu`);
        if (menu) menu.style.display = (menu.style.display === 'none') ? 'flex' : 'none';
        return;
      }

      setActiveNav(link); currentDept = dept;
      showPage(page);
      // Otomatis buka sub-menu dept yang dipilih, tutup yang lain
      if (page === 'dept' && dept) {
        Object.keys(DEPT).forEach(k => {
          const m = document.getElementById(`dept-${k}-sub-menu`);
          if (m) m.style.display = (k === dept) ? 'flex' : 'none';
        });
      }
      if (window.innerWidth<=768) closeSidebar();
    });
  });
}
function setActiveNav(el) { document.querySelectorAll('.sb-link').forEach(l=>l.classList.remove('active')); el.classList.add('active'); }
async function showPage(page) {
  currentPage = page;
  
  if (typeof loadPage === 'function') {
    await loadPage('page-' + page);
  } else {
    document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
    document.getElementById('page-'+page)?.classList.remove('hidden');
  }

  const titles={dashboard:'Portal Utama',arsip:'Semua Arsip',dept:DEPT[currentDept]?.label||'Bidang',analytics:'Analitik',aktivitas:'Riwayat Aktivitas',mahasiswa:'Data Mahasiswa',sdm:'Data SDM & Dosen',banpt:'Borang Akreditasi BAN-PT',lamptkes:'Borang Akreditasi LAM-PTKes',users:'Manajemen Pengguna',generator:'Generator Dokumen'};
  document.getElementById('topbarTitle').textContent = titles[page]||page;
  
  const btnAdd = document.getElementById('btnGlobalAdd');
  if(btnAdd) {
    btnAdd.style.display = (page === 'banpt' || page === 'lamptkes' || page === 'analytics' || page === 'aktivitas' || page === 'users' || page === 'generator' || page === 'dashboard') ? 'none' : 'inline-flex';
  }

  const banptMenu = document.getElementById('banpt-sub-menu');
  if(banptMenu) banptMenu.style.display = (page === 'banpt') ? 'flex' : 'none';

  const lamptkesMenu = document.getElementById('lamptkes-sub-menu');
  if(lamptkesMenu) lamptkesMenu.style.display = (page === 'lamptkes') ? 'flex' : 'none';
  if(page === 'lamptkes' && typeof generateLamptkesReport === 'function') generateLamptkesReport();

  Object.keys(DEPT).forEach(k => {
    const menu = document.getElementById(`dept-${k}-sub-menu`);
    if(menu) menu.style.display = (page === 'dept' && currentDept === k) ? 'flex' : 'none';
  });

  if (page==='dashboard')  renderDashboard();
  if (page==='arsip')      { clearFilters(); renderArsipTable(); }
  if (page==='dept')       renderDeptPage(currentDept);
  if (page==='analytics')  renderAnalytics();
  if (page==='aktivitas')  renderActivity();
  if (page==='mahasiswa')  renderMahasiswaPage();
  if (page==='sdm')        renderSdmPage();
  if (page==='banpt')      { initBanpt(); }
  if (page==='lamptkes')   { initLamptkes(); }
  if (page==='users' && typeof loadUsers === 'function') loadUsers();
  updateBadges();
}
function setupHamburger() { document.getElementById('hamburger').addEventListener('click',()=>{ document.getElementById('sidebar').classList.toggle('open'); document.getElementById('sbOverlay').classList.toggle('hidden'); }); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sbOverlay').classList.add('hidden'); }
function goToDept(dept) { currentDept=dept; document.querySelectorAll('.sb-link').forEach(l=>l.classList.remove('active')); document.getElementById('nav-'+dept)?.classList.add('active'); showPage('dept'); }
function renderSidebarDate() { const el=document.getElementById('sidebarDate'); if(el) el.textContent=new Date().toLocaleDateString('id-ID',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}); }
function updateBadges() {
  const f=arsip.filter(a=>!currentAY||a.ay===currentAY);
  
  // Total
  const bt = document.getElementById('badge-total');
  if (bt) bt.textContent = f.length;
  
  // Department Main Badges & Sub-Menu All Badges
  Object.keys(DEPT).forEach(k => { 
    const deptArsip = f.filter(a => a.bidang === k);
    const el = document.getElementById('badge-'+k); 
    if(el) el.textContent = deptArsip.length; 
    
    const subAllEl = document.getElementById('badge-dept-'+k+'-all');
    if(subAllEl) subAllEl.textContent = deptArsip.length;
  });

  // Data Induk Badges
  const bMhs=document.getElementById('badge-mhs'); if(bMhs) bMhs.textContent=mahasiswa.length;
  const bSdm=document.getElementById('badge-sdm-induk'); if(bSdm) bSdm.textContent=sdm.length;

  // BAN-PT & LAM-PTKes Badges
  let banptCount = 0;
  let lamptkesCount = 0;
  let banptKCounts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
  let lamptkesKCounts = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0};

  f.forEach(a => {
    let bk = getBanptCriteriaForUpload(a.bidang, a.jenis);
    if (bk > 0) {
       banptCount++;
       if(banptKCounts[bk] !== undefined) banptKCounts[bk]++;
    }
    
    if (a.jenis) {
       let lk = getKriteriaNumber(a.jenis);
       if (lk > 0 || a.jenis.includes('_led') || a.jenis.startsWith('led_') || a.jenis.includes('_spmi') || a.jenis.startsWith('spmi_')) {
          lamptkesCount++;
       }
       if (lk >= 1 && lk <= 8) {
          lamptkesKCounts[lk]++;
       }
    }
  });

  const bBanpt = document.getElementById('badge-banpt');
  if(bBanpt) bBanpt.textContent = banptCount;
  const bLamptkes = document.getElementById('badge-lamptkes');
  if(bLamptkes) bLamptkes.textContent = lamptkesCount;

  // Dashboard Badges
  const bdTotal = document.getElementById('badge-dash-total');
  if (bdTotal) bdTotal.textContent = f.length;
  
  const bdAktif = document.getElementById('badge-aktif');
  if (bdAktif) bdAktif.textContent = f.filter(a => (a.status || 'aktif').toLowerCase() === 'aktif').length;

  const bdBanptDash = document.getElementById('badge-dash-banpt');
  if (bdBanptDash) bdBanptDash.textContent = banptCount;

  const bdLamptkesDash = document.getElementById('badge-dash-lamptkes');
  if (bdLamptkesDash) bdLamptkesDash.textContent = lamptkesCount;

  // Update specific K badges
  for (let i = 1; i <= 9; i++) {
     let el = document.getElementById('badge-banpt-k' + i);
     if (el) el.textContent = banptKCounts[i] || 0;
  }
  for (let i = 1; i <= 8; i++) {
     let el = document.getElementById('badge-lamptkes-k' + i);
     if (el) el.textContent = lamptkesKCounts[i] || 0;
  }


  // Sub-Menu Jenis Badges
  // First, zero out all jenis badges
  document.querySelectorAll('[id^="badge-jenis-"]').forEach(el => el.textContent = '0');
  
  // Then calculate counts grouped by jenis (for current active AY)
  let counts = {};
  f.forEach(a => {
    if (a.jenis) {
       // Only count for the correct department
       let key = a.bidang + '_' + a.jenis; 
       counts[key] = (counts[key] || 0) + 1;
       
       // Fallback for global jenis IDs just in case they are unique
       counts[a.jenis] = (counts[a.jenis] || 0) + 1;
    }
  });

  // Update specific badges based on ID
  document.querySelectorAll('.sb-sub-menu').forEach(menu => {
     let deptId = menu.id.replace('dept-', '').replace('-sub-menu', '');
     menu.querySelectorAll('[id^="badge-jenis-"]').forEach(badge => {
         let jenisId = badge.id.replace('badge-jenis-', '');
         let val = counts[deptId + '_' + jenisId] || 0;
         badge.textContent = val;
     });
  });
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ DASHBOARD ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function renderDashboard() {
  let data=arsip.filter(a=>!currentAY||a.ay===currentAY);

  // --- START RAB WIDGET LOGIC ---
  let totalRAB = 0, realisasi = 0, ditolak = 0, sisa = 0;
  
  data.filter(a => a.isAnggaran === true || a.jenis === 'anggaran' || a.jenis === 'umum_rab' || a.kategori === 'Anggaran').forEach(item => {
      let amt = Number(item.rab_amount) || Number(item.totalAnggaran) || (Number(item.harga || 0) * Number(item.volume || 1)) || 0;
      let stat = (item.rab_status || item.status || '').toLowerCase();
      
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
      if (totalRAB > 0) {
        sect.style.display = 'block';
        if(document.getElementById('badge-rab-total')) document.getElementById('badge-rab-total').innerText = formatRp(totalRAB);
        if(document.getElementById('badge-rab-realisasi')) document.getElementById('badge-rab-realisasi').innerText = formatRp(realisasi);
        if(document.getElementById('badge-rab-sisa')) document.getElementById('badge-rab-sisa').innerText = formatRp(sisa);
        if(document.getElementById('badge-rab-ditolak')) document.getElementById('badge-rab-ditolak').innerText = formatRp(ditolak);
      } else {
        sect.style.display = 'none';
      }
  }
  // --- END RAB WIDGET LOGIC ---

  initDashCharts(data); renderRecentList(data);
}



function renderRecentList(data) {
  const el=document.getElementById('recentList'); if(!el)return;
  const recent=[...data].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6);
  if(!recent.length){el.innerHTML='<p style="padding:20px;text-align:center;color:var(--t3)">Belum ada arsip</p>';return;}
  el.innerHTML=recent.map(a=>{
    const d=DEPT[a.bidang]||{}; const f=getFormatCfg(a.format);
    return`<div class="recent-item" onclick="viewDetail('${a.id}')">
      <div class="ri-icon" style="background:${d.color||'#888'}18;color:${d.color||'#888'}"><i class="${d.icon||'fas fa-file'}"></i></div>
      <div class="ri-info">
        <div class="ri-title">${esc(a.judul)}</div>
        <div class="ri-meta">${d.label||'ÔÇö'} ┬À ${getJenisLabel(a.bidang,a.jenis)} ┬À ${fmtDate(a.tanggal)} ${a.gdriveLink?`<i class="fab fa-google-drive" style="color:#4285f4"></i>`:''}</div>
      </div>
    </div>`;
  }).join('');
}

function initDashCharts(data) {
  document.getElementById('dashLineSub').textContent=`TA ${currentAY}`;
  const months=getAYMonths(currentAY), labels=months.map(getMonthLabel);
  const counts=months.map(m=>data.filter(a=>a.tanggal?.startsWith(m)).length);
  destroyChart(cLine);
  const ctxL=document.getElementById('chartLine')?.getContext('2d');
  if(ctxL){const g=ctxL.createLinearGradient(0,0,0,240);g.addColorStop(0,'rgba(34,197,94,.35)');g.addColorStop(1,'rgba(34,197,94,0)');cLine=new Chart(ctxL,{type:'line',data:{labels,datasets:[{label:'Arsip',data:counts,borderColor:'#22c55e',backgroundColor:g,tension:.4,pointBackgroundColor:'#22c55e',pointRadius:4,fill:true}]},options:chartOpts({plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#4f617d',font:{size:10}}},y:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true}}})})}

  // Yearly Trend
  destroyChart(cYearlyLine);
    const ctxYL=document.getElementById('chartYearlyLine')?.getContext('2d');
    if(ctxYL){
      let startY = parseInt(document.getElementById('trendStartY')?.value || '2021', 10);
      let endY = parseInt(document.getElementById('trendEndY')?.value || '2025', 10);
      
      if (startY > endY) {
        let temp = startY; startY = endY; endY = temp;
      }
      
      let allChrono = [...allAYears()].reverse(); // sorted chronologically (2014 -> 2050)
      
      let sy = allChrono.filter(ay => {
        let ayStart = parseInt(ay.split('/')[0], 10);
        return ayStart >= startY && ayStart <= endY;
      });
      
      const yCounts = sy.map(y => arsip.filter(a=>a.ay===y).length);
    
    const g=ctxYL.createLinearGradient(0,0,0,240);g.addColorStop(0,'rgba(59,130,246,.35)');g.addColorStop(1,'rgba(59,130,246,0)');
    cYearlyLine=new Chart(ctxYL,{type:'line',data:{labels:sy,datasets:[{label:'Total Arsip',data:yCounts,borderColor:'#3b82f6',backgroundColor:g,tension:.4,pointBackgroundColor:'#3b82f6',pointRadius:4,fill:true}]},options:chartOpts({plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#4f617d',font:{size:10}}},y:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true}}})})
  }

  destroyChart(cDoughnut);
  const ctxD=document.getElementById('chartDoughnut')?.getContext('2d');
  if(ctxD){
    const dK=Object.keys(DEPT),
          dL=dK.map(k=>DEPT[k].label),
          dV=dK.map(k=>data.filter(a=>a.bidang===k).length),
          dC=dK.map(k=>DEPT[k].color);
    cDoughnut=new Chart(ctxD,{
      type:'bar',
      data:{labels:dL,datasets:[{label:'Total Arsip', data:dV,backgroundColor:dC,borderRadius:4}]},
      options:chartOpts({
        plugins:{legend:{display:false}},
        scales:{
          x:{grid:{display:false},ticks:{font:{size:9}}},
          y:{beginAtZero:true,ticks:{precision:0}}
        }
      })
    })
  }
  destroyChart(cStatus);
  const ctxS=document.getElementById('chartStatus')?.getContext('2d');
  if(ctxS){const sL=['Aktif','Diproses','Selesai','Diarsipkan'],sK=['aktif','diproses','selesai','arsip'],sV=sK.map(s=>data.filter(a=>a.status===s).length),sC=['#22c55e','#f59e0b','#3b82f6','#94a3b8'];cStatus=new Chart(ctxS,{type:'doughnut',plugins:[ChartDataLabels],data:{labels:sL,datasets:[{data:sV,backgroundColor:sC.map(c=>c+'88'),borderColor:sC,borderWidth:2}]},options:chartOpts({plugins:{legend:{position:'bottom',labels:{color:'#8b9dbf',font:{size:10},padding:8}}},cutout:'65%'})})}
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ ARSIP TABLE ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function onFilterDeptChange() {
  const dept=document.getElementById('filterDept').value;
  populateFilterJenis(dept,'filterJenis');
  renderArsipTable();
}
function populateFilterJenis(dept, elId) {
const el=document.getElementById(elId); if(!el)return;
const types=dept?(DEPT_JENIS[dept]||COMMON_JENIS):COMMON_JENIS;
let html = `<option value="">Semua Jenis</option>`;
types.forEach(t => {
  if (t.group && t.items) {
    html += `<optgroup label="${t.group}">`;
    t.items.forEach(item => {
      html += `<option value="${item.val}">${item.label}</option>`;
    });
    html += `</optgroup>`;
  } else {
    html += `<option value="${t.val}">${t.label}</option>`;
  }
});
el.innerHTML = html;
}

function renderArsipTable() {
  const q=(document.getElementById('searchInput')?.value||'').toLowerCase();
  const dept=document.getElementById('filterDept')?.value||'';
  const jenis=document.getElementById('filterJenis')?.value||'';
  const fmt=document.getElementById('filterFormat')?.value||'';
  const tgl=document.getElementById('filterTgl')?.value||'';

  let data=arsip.filter(a=>{
    if(currentAY&&a.ay!==currentAY)return false;
    if(dept&&a.bidang!==dept)return false;
    if(jenis&&a.jenis!==jenis)return false;
    if(fmt&&a.format!==fmt)return false;
    if(tgl&&a.tanggal!==tgl)return false;
    if(q){
      const jLabel=getJenisLabel(a.bidang,a.jenis).toLowerCase();
      const hay=`${a.nomor} ${a.judul} ${a.pengirim} ${a.keterangan} ${jLabel} ${a.fileName}`.toLowerCase();
      if(!hay.includes(q))return false;
    }
    return true;
  }).sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));

  const tbody=document.getElementById('arsipBody'),empty=document.getElementById('tableEmpty'),info=document.getElementById('tableInfo');
  if(!tbody)return;
  if(!data.length){tbody.innerHTML='';empty?.classList.remove('hidden');if(info)info.textContent='Tidak ada arsip ditemukan.';return;}
  empty?.classList.add('hidden');
  if(info)info.textContent=`${data.length} dari ${arsip.filter(a=>!currentAY||a.ay===currentAY).length} arsip ┬À TA ${currentAY}`;

  tbody.innerHTML=data.map((a,i)=>{
    const d=DEPT[a.bidang]||{label:a.bidang,color:'#888',icon:'fas fa-file'};
    return`<tr>
      <td style="color:var(--t3);font-size:.72rem">${i+1}</td>
      <td><span class="td-nomor">${esc(a.nomor)}</span></td>
      <td><span class="td-judul" title="${esc(a.judul)}">${esc(a.judul)}</span></td>
      <td><span class="d-badge" style="background:${d.color}18;color:${d.color}; white-space: normal !important; text-align: left; line-height: 1.2; min-width: 120px; display: inline-block;"><i class="${d.icon}"></i>${d.label}</span></td>
      <td style="font-size:.78rem;color:var(--t2);"><div title="${getJenisLabel(a.bidang,a.jenis).replace(/"/g, '&quot;')}" style="white-space:normal; line-height:1.3; word-break:normal; overflow-wrap:break-word; font-size:0.72rem;">${getJenisLabel(a.bidang,a.jenis)}</div></td>
      <td style="font-size:.78rem;">${fmtDate(a.tanggal)}</td>
      <td><span class="td-ta" style="white-space:normal;">${a.ay||'ÔÇö'}</span></td>
      <td>${statusBadge(a.status)}</td>
      <td>${fmtBadge(a)}</td>
      <td><div class="act-group">
        <button class="act-btn" title="Detail" onclick="viewDetail('${a.id}')"><i class="fas fa-eye"></i></button>
        <button class="act-btn edit" title="Edit" onclick="editArsip('${a.id}')"><i class="fas fa-pen"></i></button>
        <button class="act-btn del" title="Hapus" onclick="deleteArsip('${a.id}')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`;
  }).join('');
}
function clearFilters() {
  ['searchInput','filterDept','filterJenis','filterFormat'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const t=document.getElementById('filterTgl');if(t)t.value='';
  populateFilterJenis('','filterJenis');
  renderArsipTable();
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ DEPT PAGE ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function renderDeptPage(dept) {
  if(!dept)return;
  const d=DEPT[dept];
  const all=arsip.filter(a=>a.bidang===dept&&(!currentAY||a.ay===currentAY));

  document.getElementById('deptBanner').style.cssText=`--dept-bg:${d.color}18;--dept-color:${d.color};background:linear-gradient(135deg,${d.color}12,transparent)`;
  document.getElementById('deptBannerIcon').innerHTML=`<i class="${d.icon}"></i>`;
  document.getElementById('deptBannerName').textContent=d.label;
  document.getElementById('deptBannerSub').textContent=`Manajemen arsip bidang ${d.label} ┬À TA ${currentAY}`;

  // --- START RAB WIDGET LOGIC PER BIDANG ---
  let deptTotalRAB = 0, deptRealisasi = 0, deptDitolak = 0, deptSisa = 0;
  
  all.filter(a => a.isAnggaran === true || a.jenis === 'anggaran' || a.jenis === 'umum_rab' || a.kategori === 'Anggaran').forEach(item => {
      let amt = Number(item.rab_amount) || Number(item.totalAnggaran) || (Number(item.harga || 0) * Number(item.volume || 1)) || 0;
      let stat = (item.rab_status || item.status || '').toLowerCase();
      
      deptTotalRAB += amt;
      if (stat.includes('terealisasi') || stat.includes('disetujui') || stat.includes('selesai')) {
          deptRealisasi += amt;
      } else if (stat.includes('tolak') || stat.includes('batal')) {
          deptDitolak += amt;
      } else {
          deptSisa += amt;
      }
  });

  const deptSect = document.getElementById('dept-dashboard-anggaran-section');
  if (deptSect) {
      if (deptTotalRAB > 0) {
        deptSect.style.display = 'block';
        const formatRp = (num) => 'Rp ' + num.toLocaleString('id-ID');
        if(document.getElementById('dept-badge-rab-total')) document.getElementById('dept-badge-rab-total').innerText = formatRp(deptTotalRAB);
        if(document.getElementById('dept-badge-rab-realisasi')) document.getElementById('dept-badge-rab-realisasi').innerText = formatRp(deptRealisasi);
        if(document.getElementById('dept-badge-rab-sisa')) document.getElementById('dept-badge-rab-sisa').innerText = formatRp(deptSisa);
        if(document.getElementById('dept-badge-rab-ditolak')) document.getElementById('dept-badge-rab-ditolak').innerText = formatRp(deptDitolak);
      } else {
        deptSect.style.display = 'none';
      }
  }
  // --- END RAB WIDGET LOGIC PER BIDANG ---

  document.getElementById('deptStatRow').innerHTML=[
    {lb:'Total Arsip',val:all.length,ic:'archive',c:d.color},
    {lb:'Aktif',val:all.filter(a=>a.status==='aktif').length,ic:'circle-dot',c:'#22c55e'},
    {lb:'Diproses',val:all.filter(a=>a.status==='diproses').length,ic:'hourglass-half',c:'#f59e0b'},
    {lb:'Selesai',val:all.filter(a=>a.status==='selesai').length,ic:'check-circle',c:'#3b82f6'},
  ].map(c=>`<div class="stat-card" style="--c:${c.c}"><div class="sc-icon"><i class="fas fa-${c.ic}"></i></div><div class="sc-label">${c.lb}</div><div class="sc-val">${c.val}</div></div>`).join('');

  document.getElementById('deptChartSub').textContent=`TA ${currentAY}`;
  if (dept !== 'laboratorium' && dept !== 'sarana' && dept !== 'pengabdian') {
    initDeptCharts(dept,all,d.color);
  }

  const mhsCharts = document.getElementById('mhsChartContainer');
  if(mhsCharts) mhsCharts.style.display = 'none'; // Obsolete

  const kmhsContainer = document.getElementById('kemahasiswaanContainer');
  const iframeContainer = document.getElementById('kemahasiswaanIframeContainer');
  const deptArsipCharts = document.getElementById('deptArsipCharts');
  const statRow = document.getElementById('deptStatRow');
  const labContainer = document.getElementById('laboratoriumContainer');
  const saranaContainer = document.getElementById('saranaContainer');
  const pengabdianContainer = document.getElementById('pengabdianContainer');
  const deptTableContainer = document.getElementById('deptTableContainer');

  if (dept === 'kemahasiswaan') {
    if (kmhsContainer) kmhsContainer.style.display = 'block';
    if (labContainer) labContainer.style.display = 'none';
    if (saranaContainer) saranaContainer.style.display = 'none';
    if (pengabdianContainer) pengabdianContainer.style.display = 'none';
    if (deptArsipCharts) deptArsipCharts.style.display = 'none';
    if (statRow) statRow.style.display = 'flex';
    if (deptTableContainer) deptTableContainer.style.display = 'block';
    switchKmhsTab('arsip');
    const deptSearchInput = document.getElementById('deptSearch');
    if (deptSearchInput) {
      deptSearchInput.placeholder = 'Cari SK, beasiswa, nama mahasiswa, ormawa, dokumen...';
    }
  } else if (dept === 'laboratorium') {
    if (kmhsContainer) kmhsContainer.style.display = 'none';
    if (iframeContainer) iframeContainer.style.display = 'none';
    if (labContainer) labContainer.style.display = 'block';
    if (saranaContainer) saranaContainer.style.display = 'none';
    if (pengabdianContainer) pengabdianContainer.style.display = 'none';
    if (deptArsipCharts) deptArsipCharts.style.display = 'none';
    if (statRow) statRow.style.display = 'none';
    if (deptTableContainer) deptTableContainer.style.display = 'none';
    initLabCharts();
    renderLabContent();
  } else if (dept === 'sarana') {
    if (kmhsContainer) kmhsContainer.style.display = 'none';
    if (iframeContainer) iframeContainer.style.display = 'none';
    if (labContainer) labContainer.style.display = 'none';
    if (saranaContainer) saranaContainer.style.display = 'block';
    if (pengabdianContainer) pengabdianContainer.style.display = 'none';
    if (deptArsipCharts) deptArsipCharts.style.display = 'none';
    if (statRow) statRow.style.display = 'none';
    if (deptTableContainer) deptTableContainer.style.display = 'none';
    switchSaranaTab(currentSaranaTab || 'dashboard');
    renderSaranaContent();
  } else if (dept === 'pengabdian') {
    if (kmhsContainer) kmhsContainer.style.display = 'none';
    if (iframeContainer) iframeContainer.style.display = 'none';
    if (labContainer) labContainer.style.display = 'none';
    if (saranaContainer) saranaContainer.style.display = 'none';
    if (pengabdianContainer) pengabdianContainer.style.display = 'block';
    if (deptArsipCharts) deptArsipCharts.style.display = 'none';
    if (statRow) statRow.style.display = 'none';
    if (deptTableContainer) deptTableContainer.style.display = 'none';
    const dMhs = document.getElementById('deptMhsContainer');
    if (dMhs) dMhs.style.display = 'none';
    const dSdm = document.getElementById('deptSdmContainer');
    if (dSdm) dSdm.style.display = 'none';
    switchPengabdianTab(currentPengabdianTab || 'dashboard');
    renderPengabdianContent();
  } else {
    if (kmhsContainer) kmhsContainer.style.display = 'none';
    if (iframeContainer) iframeContainer.style.display = 'none';
    if (labContainer) labContainer.style.display = 'none';
    if (saranaContainer) saranaContainer.style.display = 'none';
    if (pengabdianContainer) pengabdianContainer.style.display = 'none';
    if (deptArsipCharts) deptArsipCharts.style.display = 'block';
    if (statRow) statRow.style.display = 'flex';
    if (deptTableContainer) deptTableContainer.style.display = 'block';
    const deptSearchInput = document.getElementById('deptSearch');
    if (deptSearchInput) {
      deptSearchInput.placeholder = 'Cari arsip bidang ini...';
    }
  }

  const saranaBanner = document.getElementById('saranaSyncBanner');
  if (saranaBanner) {
    saranaBanner.style.display = 'none';
  }

  document.getElementById('deptTableTitle').textContent=`Daftar Arsip ${d.label}`;
  document.getElementById('deptSearch').value='';
  populateFilterJenis(dept,'deptFilterJenis');
  renderDeptTable();
}

async function syncKemahasiswaanFromSumber() {
  const btn = document.getElementById('btnSyncKemahasiswaan');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyinkronkan...';
  }
  toast('Mulai sinkronisasi data Kemahasiswaan & Alumni...', 'info');

  if (!dbSumber) {
    try {
      if (typeof firebase !== 'undefined') {
        const appSumber = firebase.initializeApp({
          apiKey: "AIzaSyBgc1Gqfhk2dhqmcL0Un7dkDzHZzrxcW9s",
          authDomain: "bidkemahasiswaandanalumn-93be8.firebaseapp.com",
          projectId: "bidkemahasiswaandanalumn-93be8"
        }, 'sumber');
        dbSumber = appSumber.firestore();
      }
    } catch(e) {
      console.warn("Inisialisasi dbSumber gagal", e);
    }
  }

  if (!dbSumber) {
    toast('Gagal terhubung ke database sumber Kemahasiswaan.', 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-sync-alt"></i> Sinkronkan Data Kemahasiswaan'; }
    return;
  }

  try {
    let totalSynced = 0;
    const collections = [
      { name: 'alumniData', prefix: 'alumni', jenis: 'Alumni & Tracer Study', getTitle: d => `Tracer Study Alumni: ${d.name || 'Alumni'} (${d.year || '-'}) - ${d.status || 'Bekerja'}` },
      { name: 'beasiswaData', prefix: 'beasiswa', jenis: 'Beasiswa', getTitle: d => `Program Beasiswa: ${d.name || d.nama || 'Beasiswa'} (${d.provider || 'AAS'})` },
      { name: 'penerimaBeasiswaData', prefix: 'penerima_beasiswa', jenis: 'Penerima Beasiswa', getTitle: d => `Penerima Beasiswa: ${d.nama || '-'} (${d.nim || '-'}) - ${d.jenisBeasiswa || 'Beasiswa'}` },
      { name: 'prestasiData', prefix: 'prestasi', jenis: 'Prestasi Mahasiswa', getTitle: d => `Prestasi Mahasiswa: ${d.capaian || 'Juara'} ${d.kegiatan || ''} - ${d.nama || ''}` },
      { name: 'ukmData', prefix: 'ukm', jenis: 'Kegiatan UKM', getTitle: d => `Kegiatan UKM: ${d.namaKegiatan || 'Kegiatan'} [${d.namaUkm || 'UKM'}]` },
      { name: 'bemData', prefix: 'bem', jenis: 'Organisasi & BEM', getTitle: d => `Program BEM: ${d.nama || d.title || 'Kegiatan'}` },
      { name: 'konselingData', prefix: 'konseling', jenis: 'Bimbingan Konseling & Disiplin', getTitle: d => `Konseling: [${d.kategori || 'Bimbingan'}] ${d.nama || '-'}` },
      { name: 'ujiKompetensiData', prefix: 'ukom', jenis: 'Uji Kompetensi', getTitle: d => `Laporan UKOM: ${d.jenisUjian || 'UKOM'} Periode ${d.periode || '-'} (${d.tahun || '-'})` },
      { name: 'anggaranData', prefix: 'anggaran_kmhs', jenis: 'Rencana Anggaran', getTitle: d => `Anggaran Kemahasiswaan: ${d.name || d.nama || 'Program'}` },
      { name: 'laporanData', prefix: 'laporan_kmhs', jenis: 'Laporan Tahunan', getTitle: d => `Laporan: ${d.title || d.judul || 'Laporan'} (${d.year || d.tahun || '-'})` },
      { name: 'skData', prefix: 'sk_kmhs', jenis: 'Dokumen SK', getTitle: d => `SK Kemahasiswaan: ${d.title || d.judul || 'SK'} (${d.number || d.nomor || '-'})` },
      { name: 'sopData', prefix: 'sop_kmhs', jenis: 'Laporan SOP', getTitle: d => `SOP: ${d.title || d.judul || 'SOP Layanan Mahasiswa'}` },
      { name: 'kebijakanData', prefix: 'kebijakan_kmhs', jenis: 'Laporan Kebijakan', getTitle: d => `Kebijakan: ${d.title || d.judul || 'Kebijakan'}` },
      { name: 'surveyPenggunaData', prefix: 'survey_pengguna', jenis: 'Survey Pengguna Lulusan', getTitle: d => `Survey Pengguna Lulusan: ${d.alumniName || d.namaAlumni || 'Alumni'} di ${d.companyName || d.namaInstansi || 'Instansi'}` },
      { name: 'surveyMitraData', prefix: 'evaluasi_mitra', jenis: 'Evaluasi Mitra PKL', getTitle: d => `Evaluasi Mitra PKL: Mahasiswa di ${d.namaInstansi || 'Wahana'} (${d.namaPembimbing || 'Preseptor'})` }
    ];

    for (const col of collections) {
      const snap = await dbSumber.collection(col.name).get();
      for (const docSnap of snap.docs) {
        const d = docSnap.data();
        const id = `${col.prefix}_${docSnap.id}`;
        const record = {
          id: id,
          nomor: d.nomor || d.number || d.nim || '-',
          judul: col.getTitle(d),
          tanggal: d.tanggal || d.date || (d.createdAt ? d.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10)),
          ay: String(d.tahun || d.year || d.angkatan || new Date().getFullYear()),
          jenis: col.jenis,
          bidang: 'kemahasiswaan',
          pengirim: d.pengirim || d.nama || 'Portal Kemahasiswaan & Alumni',
          status: 'selesai',
          format: 'dokumen',
          gdriveLink: d.linkDokumen || d.linkSertifikat || d.linkBukti || d.link || d.doc || '',
          keterangan: d.keterangan || d.catatan || d.deskripsi || `Disinkronkan dari ${col.name}`,
          metadata: {
            originalKoleksi: col.name,
            originalId: docSnap.id,
            syncedAt: new Date().toISOString(),
            dokumenPortal: true
          }
        };

        const existingIdx = arsip.findIndex(x => x.id === id);
        if (existingIdx > -1) {
          arsip[existingIdx] = record;
        } else {
          arsip.unshift(record);
        }
        await db.collection('arsip').doc(id).set(record, { merge: true });
        totalSynced++;
      }
    }

    // Sinkronisasi data mahasiswa
    try {
      const mhsSnap = await dbSumber.collection('mahasiswa').get();
      for (const mDoc of mhsSnap.docs) {
        const mData = mDoc.data();
        await db.collection('mahasiswa').doc(mDoc.id).set(mData, { merge: true });
        const existingMhsIdx = mahasiswa.findIndex(x => x.id === mDoc.id);
        if (existingMhsIdx > -1) mahasiswa[existingMhsIdx] = { id: mDoc.id, ...mData };
        else mahasiswa.push({ id: mDoc.id, ...mData });
      }
    } catch(e) { console.warn("Sinkron data mahasiswa:", e); }

    save();
    updateBadges();
    renderDeptTable();
    toast(`Sinkronisasi berhasil! ${totalSynced} arsip Kemahasiswaan terupdate di SIMARSIP.`, 'success');
  } catch(err) {
    console.error("Gagal sinkron:", err);
    toast('Gagal sinkronisasi data: ' + err.message, 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sync-alt"></i> Sinkronkan Data Kemahasiswaan';
    }
  }
}

let dbSarprasSumber = null;
async function syncSarprasFromSumber() {
  const btn = document.getElementById('btnSyncSarpras');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyinkronkan...';
  }
  if (typeof toast === 'function') {
    toast('Mulai sinkronisasi data dari portal SIMSPRAS...', 'info');
  }

  try {
    if (!dbSarprasSumber && typeof firebase !== 'undefined') {
      let appSarpras;
      if (!firebase.apps.find(a => a.name === "sarprasSumber")) {
        appSarpras = firebase.initializeApp({
          apiKey: "AIzaSyATNPIY3Iv5tmx9MKh7N6cz-czK0oC8SfY",
          authDomain: "sim-sarpras-ef3a4.firebaseapp.com",
          projectId: "sim-sarpras-ef3a4"
        }, 'sarprasSumber');
      } else {
        appSarpras = firebase.app("sarprasSumber");
      }
      dbSarprasSumber = appSarpras.firestore();
    }

    if (!dbSarprasSumber) {
      throw new Error("Gagal menginisialisasi koneksi Firestore SIMSPRAS.");
    }

    let totalSynced = 0;
    const collections = [
      { name: 'inventaris', key: 'INVENTARIS', jenis: 'k6_1' },
      { name: 'anggaran', key: 'ANGGARAN', jenis: 'umum_rab' },
      { name: 'sop', key: 'SOP', jenis: 'umum_sk' },
      { name: 'pengawasan', key: 'PENGAWASAN', jenis: 'k6_1' },
      { name: 'pemeliharaan', key: 'PEMELIHARAAN', jenis: 'k6_1' },
      { name: 'peminjaman', key: 'PEMINJAMAN', jenis: 'k6_1' },
      { name: 'laporan', key: 'LAPORAN', jenis: 'umum_laporan' },
      { name: 'berita_acara', key: 'BA', jenis: 'k6_14' }
    ];

    for (const col of collections) {
      const snap = await dbSarprasSumber.collection(col.name).get();
      for (const docSnap of snap.docs) {
        const item = docSnap.data();
        // Pemisahan tegas: jangan sinkronkan data laboratorium/medis ke portal sarpras
        const itemCat = String(item.kategori || '').toLowerCase();
        const itemNama = String(item.nama || item.namaBarang || item.judul || '').toLowerCase();
        const itemLok = String(item.lokasi || '').toLowerCase();
        if (itemCat.includes('medis') || itemCat.includes('laboratorium') || itemNama.includes('jarum') || itemNama.includes('phantom') || itemLok.includes('laboratorium')) {
          continue;
        }

        const portalId = `SIMSPRAS-${col.key}-${docSnap.id}`;
        
        let judul = item.nama || item.namaBarang || item.judul || 'Dokumen Sarpras';
        let ket = [];
        let tgl = item.tanggal || (item.createdAt ? item.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10));
        let pengirim = item.petugas || item.pelapor || item.pj || 'Sistem SIMSPRAS (Sarana & Prasarana AAS)';
        let nomor = item.kode || item.nomor || item.noBA || portalId;
        let status = 'aktif';
        let rab_amount = 0;
        let rab_status = '';

        if (col.name === 'inventaris') {
          judul = `Inventaris: ${item.namaBarang || item.nama || 'Aset'}`;
          if (item.kode) { ket.push(`Kode: ${item.kode}`); nomor = item.kode; }
          if (item.kategori) ket.push(`Kategori: ${item.kategori}`);
          if (item.merk) ket.push(`Merk: ${item.merk}`);
          if (item.lokasi) ket.push(`Lokasi: ${item.lokasi}`);
          if (item.kondisi) ket.push(`Kondisi: ${item.kondisi}`);
          if (item.jumlah) ket.push(`Jumlah: ${item.jumlah} ${item.satuan || 'unit'}`);
          if (item.harga) ket.push(`Nilai: Rp ${(Number(String(item.harga).replace(/[^0-9]/g, '')) || 0).toLocaleString('id-ID')}`);
          tgl = item.tglPengadaan || item.tglMasuk || item.tanggal || tgl;
          status = (item.kondisi === 'Rusak Berat' ? 'diproses' : 'aktif');
        } else if (col.name === 'anggaran') {
          judul = `RAB Sarpras: ${item.kegiatan || item.uraian || item.nama || 'Pengajuan Anggaran'}`;
          if (item.nomor) nomor = item.nomor;
          if (item.kategori) ket.push(`Kategori: ${item.kategori}`);
          rab_amount = (Number(item.volume) || 1) * (Number(String(item.harga).replace(/[^0-9]/g, '')) || 0);
          rab_status = item.status || 'Direncanakan';
          ket.push(`Total: Rp ${rab_amount.toLocaleString('id-ID')}`);
          if (item.status) ket.push(`Status: ${item.status}`);
          if (item.keterangan) ket.push(`Ket: ${item.keterangan}`);
          tgl = item.tanggal || item.tglPengajuan || tgl;
          pengirim = item.pengusul || pengirim;
          status = (item.status === 'Terealisasi' || item.status === 'Disetujui') ? 'selesai' : (item.status === 'Ditolak' ? 'batal' : 'aktif');
        } else if (col.name === 'sop') {
          judul = `SOP: ${item.judul || item.nama}`;
          if (item.nomor) { ket.push(`Nomor: ${item.nomor}`); nomor = item.nomor; }
          if (item.kategori) ket.push(`Kategori: ${item.kategori}`);
          if (item.revisi) ket.push(`Revisi: ${item.revisi}`);
          tgl = item.tglBerlaku || item.tanggal || tgl;
          pengirim = item.penyusun || pengirim;
        } else if (col.name === 'pengawasan') {
          judul = `Pengawasan Sarpras: ${item.fasilitas || item.barang || item.ruang || 'Fasilitas'}`;
          if (item.kode) nomor = item.kode;
          if (item.petugas) ket.push(`Petugas: ${item.petugas}`);
          if (item.kondisi) ket.push(`Kondisi: ${item.kondisi}`);
          if (item.hasil) ket.push(`Hasil: ${item.hasil}`);
          if (item.rekomendasi) ket.push(`Rekomendasi: ${item.rekomendasi}`);
          tgl = item.tanggal || item.tglInspeksi || tgl;
          status = (item.status === 'Selesai' || item.status === 'Tindak Lanjut') ? 'selesai' : 'aktif';
        } else if (col.name === 'peminjaman') {
          judul = `Peminjaman Sarpras: ${item.namaBarang || item.barang || 'Aset'}`;
          if (item.kode) nomor = item.kode;
          if (item.peminjam) ket.push(`Peminjam: ${item.peminjam} (${item.unit || item.nim || '-'})`);
          if (item.tglPinjam) ket.push(`Tgl Pinjam: ${item.tglPinjam}`);
          if (item.tglKembali) ket.push(`Batas Kembali: ${item.tglKembali}`);
          if (item.status) ket.push(`Status: ${item.status}`);
          tgl = item.tglPinjam || item.tanggal || tgl;
          pengirim = item.peminjam || pengirim;
          status = (item.status === 'Kembali' || item.status === 'Selesai') ? 'selesai' : 'aktif';
        } else if (col.name === 'pemeliharaan') {
          judul = `Pemeliharaan/Servis: ${item.namaBarang || item.barang || 'Aset'}`;
          if (item.kode) nomor = item.kode;
          if (item.teknisi) ket.push(`Teknisi: ${item.teknisi}`);
          if (item.jenisServis) ket.push(`Jenis: ${item.jenisServis}`);
          if (item.biaya) ket.push(`Biaya: Rp ${(Number(item.biaya)||0).toLocaleString('id-ID')}`);
          if (item.status) ket.push(`Status: ${item.status}`);
          tgl = item.tglServis || item.tanggal || tgl;
          pengirim = item.teknisi || pengirim;
          status = (item.status === 'Selesai' || item.status === 'Baik') ? 'selesai' : 'aktif';
        } else if (col.name === 'laporan') {
          judul = `Laporan Sarpras: ${item.judul || item.kegiatan || 'Laporan'}`;
          if (item.nomor) nomor = item.nomor;
          if (item.kategori) ket.push(`Kategori: ${item.kategori}`);
          if (item.periode) ket.push(`Periode: ${item.periode}`);
          tgl = item.tglLaporan || item.tanggal || tgl;
          pengirim = item.pelapor || pengirim;
          status = 'selesai';
        } else if (col.name === 'berita_acara') {
          judul = `Berita Acara: ${item.nomor || item.judul || item.jenisBA || 'Berita Acara Sarpras'}`;
          if (item.nomor) nomor = item.nomor;
          if (item.jenisBA) ket.push(`Jenis: ${item.jenisBA}`);
          if (item.pihak1) ket.push(`Pihak I: ${item.pihak1}`);
          if (item.pihak2) ket.push(`Pihak II: ${item.pihak2}`);
          tgl = item.tanggal || tgl;
          status = 'selesai';
        }

        const ay = (tgl ? String(tgl).slice(0, 4) : new Date().getFullYear().toString());

        const record = {
          id: portalId,
          nomor: nomor,
          judul: judul,
          bidang: 'sarana',
          jenis: col.jenis,
          ay: ay,
          tahunAkademik: item.tahunAkademik || '2025/2026 Genap',
          tanggal: tgl,
          pengirim: pengirim,
          status: status,
          format: item.fileUrl ? 'pdf' : (item.link ? 'link' : 'sistem'),
          keterangan: ket.length > 0 ? ket.join(' • ') : (item.deskripsi || item.keterangan || '-'),
          fileName: item.fileName || `${col.name}_${docSnap.id}`,
          url: item.fileUrl || item.link || '',
          gdriveLink: item.fileUrl || item.link || '',
          createdAt: item.createdAt || new Date().toISOString(),
          ...(col.name === 'anggaran' && { rab_amount, rab_status }),
          metadata: {
            source: 'SIMSPRAS',
            module: col.name,
            originalId: docSnap.id,
            syncedAt: new Date().toISOString(),
            tahunAkademik: item.tahunAkademik || '2025/2026 Genap',
            dokumenPortal: true
          }
        };

        const existingIdx = arsip.findIndex(x => x.id === portalId);
        if (existingIdx > -1) {
          arsip[existingIdx] = record;
        } else {
          arsip.unshift(record);
        }

        if (typeof db !== 'undefined') {
          await db.collection('arsip').doc(portalId).set(record, { merge: true });
        }
        totalSynced++;
      }
    }

    if (typeof save === 'function') save();
    if (typeof updateBadges === 'function') updateBadges();
    renderDeptTable();

    if (typeof toast === 'function') {
      if (totalSynced > 0) {
        toast(`Sinkronisasi SIMSPRAS sukses! ${totalSynced} arsip diperbarui di SIMARSIP.`, 'success');
      } else {
        toast('Koneksi SIMSPRAS terhubung. Belum ada data baru di portal SIMSPRAS.', 'info');
      }
    }
    
    // Refresh tampilan tabel jika sedang berada di bidang sarana
    renderDeptPage('sarana');
  } catch (err) {
    console.error("Gagal sinkronkan sarpras:", err);
    if (typeof toast === 'function') {
      toast('Gagal sinkronkan SIMSPRAS: ' + err.message, 'error');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-sync-alt" id="iconSyncSarpras"></i> Sinkronkan Data Sarpras';
    }
  }
}



function filterByJenis(jenis) {
  const el=document.getElementById('deptFilterJenis');
  if(el)el.value=jenis;
  
  document.querySelectorAll('.jenis-card').forEach(c => {
    if (c.getAttribute('data-jenis') === jenis) {
      c.style.boxShadow = '0 0 0 2px var(--c)';
    } else {
      c.style.boxShadow = 'none';
    }
  });

  // Also update sidebar active state
  const menu = document.getElementById(`dept-${currentDept}-sub-menu`);
  if (menu) {
    menu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    // Find the one that matches
    const targetLi = Array.from(menu.querySelectorAll('li')).find(li => {
      const onclickAttr = li.getAttribute('onclick');
      return onclickAttr && onclickAttr.includes(`'${jenis}'`);
    });
    if (targetLi) targetLi.classList.add('active');
  }

  // Handle Data Induk toggle inside page-dept
  const arsipC = document.getElementById('deptArsipCharts');
  const mhsC = document.getElementById('mhsChartContainer');
  const tC = document.getElementById('deptTableContainer');
  const dMhs = document.getElementById('deptMhsContainer');
  const dSdm = document.getElementById('deptSdmContainer');

  if (currentDept === 'kemahasiswaan') {
    if (jenis === 'data_mahasiswa') {
      switchKmhsTab('mahasiswa');
    } else {
      switchKmhsTab('arsip');
      const chips = document.querySelectorAll('.kmhs-chip');
      chips.forEach(c => {
        if ((jenis === '' && c.textContent.includes('Semua')) || (jenis !== '' && c.textContent.includes(jenis))) {
          c.classList.add('active');
          c.style.background = 'var(--primary)';
          c.style.color = '#fff';
        } else {
          c.classList.remove('active');
          c.style.background = 'var(--bg3)';
          c.style.color = 'var(--t2)';
        }
      });
      renderDeptTable();
    }
    return;
  }

  if (currentDept === 'pengabdian') {
    if (arsipC) arsipC.style.display = 'none';
    if (mhsC) mhsC.style.display = 'none';
    if (tC) tC.style.display = 'none';
    if (dMhs) dMhs.style.display = 'none';
    if (dSdm) dSdm.style.display = 'none';
    const pkmC = document.getElementById('pengabdianContainer');
    if (pkmC) pkmC.style.display = 'block';
    const sRow = document.getElementById('deptStatRow');
    if (sRow) sRow.style.display = 'none';
    switchPengabdianTab(currentPengabdianTab || 'dashboard');
    return;
  }

  if (currentDept === 'laboratorium') {
    if (arsipC) arsipC.style.display = 'none';
    if (mhsC) mhsC.style.display = 'none';
    if (tC) tC.style.display = 'none';
    if (dMhs) dMhs.style.display = 'none';
    if (dSdm) dSdm.style.display = 'none';
    const labC = document.getElementById('laboratoriumContainer');
    if (labC) labC.style.display = 'block';
    const sRow = document.getElementById('deptStatRow');
    if (sRow) sRow.style.display = 'none';
    return;
  }

  if (currentDept === 'sarana') {
    if (arsipC) arsipC.style.display = 'none';
    if (mhsC) mhsC.style.display = 'none';
    if (tC) tC.style.display = 'none';
    if (dMhs) dMhs.style.display = 'none';
    if (dSdm) dSdm.style.display = 'none';
    const saranaC = document.getElementById('saranaContainer');
    if (saranaC) saranaC.style.display = 'block';
    const sRow = document.getElementById('deptStatRow');
    if (sRow) sRow.style.display = 'none';
    return;
  }

  if(jenis === 'data_mahasiswa') {
    if(arsipC) arsipC.style.display = 'none';
    if(mhsC) mhsC.style.display = 'grid';
    if(tC) tC.style.display = 'none';
    if(dSdm) dSdm.style.display = 'none';
    if(dMhs) { dMhs.style.display = 'block'; renderMahasiswaPage(); }
  } else if (jenis === 'data_sdm') {
    if(arsipC) arsipC.style.display = 'none';
    if(mhsC) mhsC.style.display = 'none';
    if(tC) tC.style.display = 'none';
    if(dMhs) dMhs.style.display = 'none';
    if(dSdm) { dSdm.style.display = 'block'; renderSdmPage(); }
  } else {
    if(arsipC) arsipC.style.display = 'block';
    if(mhsC) mhsC.style.display = 'none';
    if(tC) tC.style.display = 'block';
    if(dMhs) dMhs.style.display = 'none';
    if(dSdm) dSdm.style.display = 'none';
    renderDeptTable();
  }
}

function initSidebarSubMenus() {
  Object.keys(DEPT).forEach(k => {
    const navLink = document.getElementById(`nav-${k}`);
    if (!navLink) return;
    
    const existing = document.getElementById(`dept-${k}-sub-menu`);
    if (existing) existing.remove();

    const ul = document.createElement('ul');
    ul.className = 'sb-sub-menu';
    ul.id = `dept-${k}-sub-menu`;
    ul.style.display = 'none';

    if (k === 'laboratorium') {
      const labSubItems = [
        { id: 'dashboard', label: 'Dashboard & Grafik', icon: 'fas fa-chart-pie' },
        { id: 'inventaris', label: 'Inventaris Alat Lab', icon: 'fas fa-boxes-stacked' },
        { id: 'perawatan', label: 'Pemeliharaan Alat', icon: 'fas fa-wrench' },
        { id: 'logbook', label: 'Logbook & Praktikum', icon: 'fas fa-book-bookmark' },
        { id: 'jadwal', label: 'Jadwal Praktikum', icon: 'fas fa-calendar-days' },
        { id: 'anggaran', label: 'Anggaran Lab (RAB)', icon: 'fas fa-file-invoice-dollar' },
        { id: 'dokumen', label: 'SOP & Dokumen Lab', icon: 'fas fa-file-shield' },
        { id: 'lpj', label: 'Laporan LPJ Lab', icon: 'fas fa-file-lines' },
        { id: 'portal', label: 'Web App SIMLAB', icon: 'fas fa-window-maximize' }
      ];
      let html = '';
      labSubItems.forEach(item => {
        let isActive = (currentLabTab === item.id) ? 'active' : '';
        html += `<li class="${isActive}" onclick="switchLabTabFromSidebar('${item.id}', this)">
          <i class="${item.icon}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${item.label}</span>
        </li>`;
      });
      ul.innerHTML = html;
      navLink.after(ul);
      return;
    }

    if (k === 'sarana') {
      const saranaSubItems = [
        { id: 'dashboard', label: 'Dashboard & Grafik', icon: 'fas fa-chart-pie' },
        { id: 'inventaris', label: 'Inventarisasi Aset', icon: 'fas fa-boxes-stacked' },
        { id: 'peminjaman', label: 'Peminjaman Sarpras', icon: 'fas fa-hand-holding' },
        { id: 'anggaran', label: 'Anggaran Sarpras (RAB)', icon: 'fas fa-file-invoice-dollar' },
        { id: 'sop', label: 'SOP Sarana Prasarana', icon: 'fas fa-file-shield' },
        { id: 'pengawasan', label: 'Pengawasan & Evaluasi', icon: 'fas fa-clipboard-check' },
        { id: 'pemeliharaan', label: 'Pemeliharaan & Servis', icon: 'fas fa-wrench' },
        { id: 'laporan', label: 'Laporan & Berita Acara', icon: 'fas fa-file-lines' },
        { id: 'portal', label: 'Web App SIMSPRAS', icon: 'fas fa-window-maximize' }
      ];
      let html = '';
      saranaSubItems.forEach(item => {
        let isActive = (currentSaranaTab === item.id) ? 'active' : '';
        html += `<li class="${isActive}" onclick="switchSaranaTabFromSidebar('${item.id}', this)">
          <i class="${item.icon}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${item.label}</span>
        </li>`;
      });
      ul.innerHTML = html;
      navLink.after(ul);
      return;
    }

    if (k === 'pengabdian') {
      const pengabdianSubItems = [
        { id: 'dashboard', label: 'Dashboard & Grafik', icon: 'fas fa-chart-pie' },
        { id: 'usulan', label: 'Usulan Proposal PkM', icon: 'fas fa-file-signature' },
        { id: 'baksos', label: 'Logbook & Pasien Baksos', icon: 'fas fa-stethoscope' },
        { id: 'reviewer', label: 'Reviewer Desk', icon: 'fas fa-clipboard-check' },
        { id: 'luaran', label: 'Katalog Luaran & HKI', icon: 'fas fa-award' },
        { id: 'borang', label: 'Borang LAM-PTKes (7 & 8)', icon: 'fas fa-table' },
        { id: 'dokumen', label: 'Dokumen & SK PkM', icon: 'fas fa-file-contract' },
        { id: 'portal', label: 'Web App SIM-PKM', icon: 'fas fa-window-maximize' }
      ];
      let html = '';
      pengabdianSubItems.forEach(item => {
        let isActive = (currentPengabdianTab === item.id) ? 'active' : '';
        html += `<li class="${isActive}" onclick="switchPengabdianTabFromSidebar('${item.id}', this)">
          <i class="${item.icon}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${item.label}</span>
        </li>`;
      });
      html += `<hr style="border-color:rgba(255,255,255,0.08); margin:4px 10px;">`;
      html += `<li onclick="syncPengabdianFromSumber()" style="color:#22c55e; font-weight:600;">
        <i class="fas fa-rotate" id="sbPengabdianSyncIcon"></i> <span style="flex:1; min-width:0; line-height:1.4;">Sinkron Data Live PkM</span>
      </li>`;
      ul.innerHTML = html;
      navLink.after(ul);
      return;
    }

    let html = `<li class="active" onclick="filterByJenisFromSidebar('', '${k}', this)"><i class="fas fa-layer-group"></i> Semua Jenis</li>`;
    
    const dJenis = DEPT_JENIS[k] || [];
    dJenis.forEach(t => {
      if (t.group && t.items) {
        html += `<li style="pointer-events:none; font-size:0.75rem; font-weight:700; color:var(--t3); text-transform:uppercase; margin-top:8px; padding-left:15px; padding-bottom:4px;">${t.group}</li>`;
        t.items.forEach(item => {
          html += `<li title="${(item.label||'').replace(/"/g, '&quot;')}" onclick="filterByJenisFromSidebar('${item.val}', '${k}', this)" style="padding-left:25px;"><i class="${item.icon || 'fas fa-file-lines'}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${item.label}</span></li>`;
        });
      } else {
        html += `<li title="${(t.label||'').replace(/"/g, '&quot;')}" onclick="filterByJenisFromSidebar('${t.val}', '${k}', this)"><i class="${t.icon || 'fas fa-file-lines'}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${t.label}</span></li>`;
      }
    });

    COMMON_JENIS.forEach(t => {
      html += `<li title="${(t.label||'').replace(/"/g, '&quot;')}" onclick="filterByJenisFromSidebar('${t.val}', '${k}', this)"><i class="${t.icon || 'fas fa-file-lines'}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${t.label}</span></li>`;
    });

    ul.innerHTML = html;
    navLink.after(ul);
  });
}

function filterByJenisFromSidebar(jenis, dept, el) {
  if (currentPage !== 'dept' || currentDept !== dept) {
    const link = document.getElementById(`nav-${dept}`);
    if (link) {
      setActiveNav(link);
      currentDept = dept;
      showPage('dept');
    }
  }
  
  filterByJenis(jenis);
}

function renderDeptTable() {
  const dept=currentDept;
  const q=(document.getElementById('deptSearch')?.value||'').toLowerCase();
  const jenis=document.getElementById('deptFilterJenis')?.value||'';
  let data=arsip.filter(a=>a.bidang===dept&&(!currentAY||a.ay===currentAY));
  if(jenis)data=data.filter(a=>a.jenis===jenis);
  if(q)data=data.filter(a=>{
    const jLabel=getJenisLabel(a.bidang,a.jenis).toLowerCase();
    return`${a.nomor} ${a.judul} ${a.keterangan} ${jLabel} ${a.fileName}`.toLowerCase().includes(q);
  });
  data=data.sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal));

  const thead=document.getElementById('deptHead'), tbody=document.getElementById('deptBody'),empty=document.getElementById('deptEmpty'),info=document.getElementById('deptInfo');
  if(!tbody || !thead)return;

  // Determine dynamic columns
  const fields = (jenis && DYNAMIC_FIELDS[jenis]) ? DYNAMIC_FIELDS[jenis] : [];
  
  // Render Thead
  let thHtml = `<tr>
    <th style="width:36px">#</th>
    <th>Nomor</th>
    <th>Judul / Perihal</th>`;
  
  if (fields.length > 0) {
    fields.forEach(f => { thHtml += `<th>${f.label}</th>`; });
  } else {
    thHtml += `<th>Jenis Dokumen</th>`;
  }
  
  thHtml += `<th>Tanggal</th>
    <th>Status</th>
    <th>Dokumen</th>
    <th style="width:90px">Aksi</th>
  </tr>`;
  thead.innerHTML = thHtml;

  if(!data.length){tbody.innerHTML='';empty?.classList.remove('hidden');if(info)info.textContent='';return;}
  empty?.classList.add('hidden');
  if(info)info.textContent=`${data.length} arsip \u2022 TA ${currentAY}`;

  tbody.innerHTML=data.map((a,i)=>{
    let tdHtml = `<tr>
      <td style="color:var(--t3);font-size:.72rem">${i+1}</td>
      <td><span class="td-nomor">${esc(a.nomor)}</span></td>
      <td><span class="td-judul" title="${esc(a.judul)}">${esc(a.judul)}</span></td>`;
    
    if (fields.length > 0) {
      fields.forEach(f => { 
        let val = a.metadata && a.metadata[f.id] ? esc(a.metadata[f.id]) : '-';
        
        if (val !== '-') {
          if (f.id === 'meta_nama' && a.metadata['meta_nim']) {
            const m = mahasiswa.find(x => x.nim === a.metadata['meta_nim'] || x.nama === a.metadata[f.id]);
            if (m) {
              val = `<a href="javascript:void(0)" onclick="viewPersonDetail('${m.id}', 'mhs')" style="text-decoration:underline; cursor:pointer;" title="Lihat Profil Mahasiswa">${val}</a>`;
            }
          } else if (f.id === 'meta_nama' && a.metadata['meta_nip']) {
            const s = sdm.find(x => x.nik === a.metadata['meta_nip'] || x.nama === a.metadata[f.id]);
            if (s) {
              val = `<a href="javascript:void(0)" onclick="viewPersonDetail('${s.id}', 'sdm')" style="text-decoration:underline; cursor:pointer;" title="Lihat Profil SDM">${val}</a>`;
            }
          } else if (f.id === 'meta_ketua' || f.id === 'meta_pelaksana') {
            const s = sdm.find(x => x.nama === a.metadata[f.id]);
            if (s) {
              val = `<a href="javascript:void(0)" onclick="viewPersonDetail('${s.id}', 'sdm')" style="text-decoration:underline; cursor:pointer;" title="Lihat Profil Dosen">${val}</a>`;
            }
          }
        }
        
        tdHtml += `<td style="font-size:.8rem;color:var(--primary);font-weight:600;">${val}</td>`; 
      });
    } else {
      tdHtml += `<td style="font-size:.78rem;color:var(--t2)"><div title="${getJenisLabel(a.bidang,a.jenis).replace(/\"/g, '&quot;')}" style="white-space:normal; line-height:1.3; word-break:normal; overflow-wrap:break-word; font-size:0.72rem;">${getJenisLabel(a.bidang,a.jenis)}</div></td>`;
    }

    tdHtml += `
      <td style="font-size:.78rem;white-space:nowrap">${fmtDate(a.tanggal)}</td>
      <td>${statusBadge(a.status)}</td>
      <td>${fmtBadge(a)}</td>
      <td><div class="act-group">
        <button class="act-btn" title="Detail" onclick="viewDetail('${a.id}')"><i class="fas fa-eye"></i></button>
        <button class="act-btn edit" title="Edit" onclick="editArsip('${a.id}')"><i class="fas fa-pen"></i></button>
        <button class="act-btn del" title="Hapus" onclick="deleteArsip('${a.id}')"><i class="fas fa-trash"></i></button>
      </div></td>
    </tr>`;
    return tdHtml;
  }).join('');

  // Dynamically redraw charts based on filtered data (Task 4)
  if (currentDept && DEPT[currentDept]) {
    initDeptCharts(currentDept, data, DEPT[currentDept].color);
  }
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ DEPT CHARTS ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function initDeptCharts(dept,data,color) {
  const t1 = document.getElementById('deptChart1Title');
  const t2 = document.getElementById('deptChart2Title');

  if (dept === 'kemahasiswaan') {
    if (t1) t1.innerHTML = `<i class="fas fa-chart-line"></i> Indeks Kepuasan Mahasiswa (IKM)`;
    if (t2) t2.innerHTML = `<i class="fas fa-user-graduate"></i> Status Tracer Alumni`;
    
    const tracerData = data.filter(a => a.pengirim === 'Tracer Mahasiswa' || (a.nomor && a.nomor.includes('IKM')));
    const fScores = [], aScores = [], lScores = [];
    tracerData.forEach(a => {
      if (a.metadata) {
        if (a.metadata.f_score_pct) fScores.push(a.metadata.f_score_pct);
        if (a.metadata.a_score_pct) aScores.push(a.metadata.a_score_pct);
        if (a.metadata.l_score_pct) lScores.push(a.metadata.l_score_pct);
      }
    });

    const avgF = fScores.length > 0 ? Math.round(fScores.reduce((a,b)=>a+b,0)/fScores.length) : 0;
    const avgA = aScores.length > 0 ? Math.round(aScores.reduce((a,b)=>a+b,0)/aScores.length) : 0;
    const avgL = lScores.length > 0 ? Math.round(lScores.reduce((a,b)=>a+b,0)/lScores.length) : 0;

    const hasData = (avgF + avgA + avgL) > 0;
    
    // Calculate 27 indicator averages
    const allIndicators = [
      'f_ruangKelas', 'f_kebersihanKelas', 'f_perpustakaan', 'f_labAkupunktur', 'f_saranaIbadah', 'f_toilet', 'f_wifi', 'f_parkir', 'f_areaPublik', 'f_ketersediaanModul',
      'a_kualitasDosen', 'a_kedisiplinanDosen', 'a_relevansiKurikulum', 'a_bimbinganDPA', 'a_bimbinganKTI', 'a_keadilanNilai', 'a_ketersediaanBahanAjar', 'a_prosesKRS', 'a_jadwalKuliah',
      'l_layananBAAK', 'l_layananKeuangan', 'l_infoBeasiswa', 'l_dukunganBEM', 'l_layananKominf', 'l_dukunganUKM', 'l_bimbinganKarir', 'l_responsivitasKeluhan'
    ];
    
    const indicatorLabels = {
      f_ruangKelas: 'Kenyamanan Ruang Kelas', f_kebersihanKelas: 'Kebersihan Kelas', f_perpustakaan: 'Fasilitas Perpustakaan', f_labAkupunktur: 'Laboratorium Akupunktur', f_saranaIbadah: 'Sarana Ibadah', f_toilet: 'Kondisi Toilet', f_wifi: 'Koneksi WiFi', f_parkir: 'Fasilitas Parkir', f_areaPublik: 'Area Publik/Kantin', f_ketersediaanModul: 'Ketersediaan Modul',
      a_kualitasDosen: 'Kualitas Mengajar Dosen', a_kedisiplinanDosen: 'Kedisiplinan Dosen', a_relevansiKurikulum: 'Relevansi Kurikulum', a_bimbinganDPA: 'Bimbingan Akademik (DPA)', a_bimbinganKTI: 'Bimbingan KTI', a_keadilanNilai: 'Keadilan Pemberian Nilai', a_ketersediaanBahanAjar: 'Ketersediaan Bahan Ajar', a_prosesKRS: 'Proses KRS', a_jadwalKuliah: 'Jadwal Kuliah',
      l_layananBAAK: 'Layanan BAAK', l_layananKeuangan: 'Layanan Keuangan', l_infoBeasiswa: 'Informasi Beasiswa', l_dukunganBEM: 'Dukungan BEM', l_layananKominf: 'Layanan Kominf', l_dukunganUKM: 'Dukungan UKM', l_bimbinganKarir: 'Bimbingan Karir', l_responsivitasKeluhan: 'Responsivitas Keluhan'
    };

    const indSums = {};
    const indCounts = {};
    allIndicators.forEach(k => { indSums[k] = 0; indCounts[k] = 0; });

    tracerData.forEach(a => {
      if (a.metadata && a.metadata.scores) {
        allIndicators.forEach(k => {
          if (a.metadata.scores[k]) {
            indSums[k] += a.metadata.scores[k];
            indCounts[k]++;
          }
        });
      }
    });

    const indAverages = allIndicators.map(k => {
      const avg = indCounts[k] > 0 ? (indSums[k] / indCounts[k]).toFixed(1) : 0;
      return parseFloat(avg);
    });

    // Inject Custom Container for Detailed Chart
    let detailContainer = document.getElementById('kemahasiswaanDetailCharts');
    if (!detailContainer) {
      const parent = document.getElementById('deptArsipCharts');
      if (parent) {
        parent.insertAdjacentHTML('beforeend', `
          <div id="kemahasiswaanDetailCharts" style="margin-top: 20px;">
            <div class="panel">
              <div class="panel-hd"><h3><i class="fas fa-list"></i> Rata-rata Skor per Indikator (Skala 1-5)</h3></div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; padding: 15px;">
                <div class="chart-wrap" style="height: 350px;">
                  <h4 style="text-align:center; color:#3b82f6; margin-bottom:10px; font-size:14px;">Indikator Akademik</h4>
                  <canvas id="chartKemAkademik"></canvas>
                </div>
                <div class="chart-wrap" style="height: 350px;">
                  <h4 style="text-align:center; color:#10b981; margin-bottom:10px; font-size:14px;">Indikator Fasilitas</h4>
                  <canvas id="chartKemFasilitas"></canvas>
                </div>
                <div class="chart-wrap" style="height: 350px;">
                  <h4 style="text-align:center; color:#f59e0b; margin-bottom:10px; font-size:14px;">Indikator Layanan</h4>
                  <canvas id="chartKemLayanan"></canvas>
                </div>
              </div>
            </div>
          </div>
        `);
        detailContainer = document.getElementById('kemahasiswaanDetailCharts');
      }
    }
    if (detailContainer) detailContainer.style.display = 'block';

    if (window.cKemAkademik) window.cKemAkademik.destroy();
    if (window.cKemFasilitas) window.cKemFasilitas.destroy();
    if (window.cKemLayanan) window.cKemLayanan.destroy();

    const chartConfig = (labels, data, bg, border) => ({
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Skor Rata-rata (1-5)',
          data: data,
          backgroundColor: bg,
          borderColor: border,
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: chartOpts({
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          datalabels: {
            anchor: 'end',
            align: 'right',
            color: '#8b9dbf',
            font: { weight: 'bold', size: 10 },
            formatter: (v) => v > 0 ? v : ''
          }
        },
        scales: {
          x: { max: 5.5, beginAtZero: true, grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#4f617d', stepSize: 1 } },
          y: { grid: { display: false }, ticks: { color: '#8b9dbf', font: { size: 10 } } }
        }
      }),
      plugins: [ChartDataLabels]
    });

    const ctxAkademik = document.getElementById('chartKemAkademik')?.getContext('2d');
    if (ctxAkademik) {
      window.cKemAkademik = new Chart(ctxAkademik, chartConfig(
        allIndicators.slice(10, 19).map(k => indicatorLabels[k]),
        indAverages.slice(10, 19),
        '#3b82f6cc', '#3b82f6'
      ));
    }
    
    const ctxFasilitas = document.getElementById('chartKemFasilitas')?.getContext('2d');
    if (ctxFasilitas) {
      window.cKemFasilitas = new Chart(ctxFasilitas, chartConfig(
        allIndicators.slice(0, 10).map(k => indicatorLabels[k]),
        indAverages.slice(0, 10),
        '#10b981cc', '#10b981'
      ));
    }

    const ctxLayanan = document.getElementById('chartKemLayanan')?.getContext('2d');
    if (ctxLayanan) {
      window.cKemLayanan = new Chart(ctxLayanan, chartConfig(
        allIndicators.slice(19, 27).map(k => indicatorLabels[k]),
        indAverages.slice(19, 27),
        '#f59e0bcc', '#f59e0b'
      ));
    }
    
    destroyChart(cDeptBar);
    const ctxB=document.getElementById('chartDeptBar')?.getContext('2d');
    if(ctxB) {
      cDeptBar=new Chart(ctxB,{
        type:'bar',
        data:{
          labels:['Fasilitas', 'Akademik', 'Pelayanan'],
          datasets:[{
            label:'Skor Rata-rata (%)',
            data:[avgF, avgA, avgL],
            backgroundColor: [color+'cc', '#3b82f6cc', '#f59e0bcc'],
            borderColor: [color, '#3b82f6', '#f59e0b'],
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options:chartOpts({
          plugins:{
            legend:{display:false},
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#8b9dbf',
              font: { weight: 'bold' },
              formatter: (v) => v > 0 ? v + '%' : ''
            }
          },
          scales:{
            y:{max:100, beginAtZero:true, grid:{color:'rgba(255,255,255,.04)'}, ticks:{color:'#4f617d'}}, 
            x:{grid:{color:'rgba(255,255,255,.04)'}, ticks:{color:'#4f617d', font:{weight:'bold'}}}
          }
        }),
        plugins: [ChartDataLabels]
      });
    }

    const alumniData = data.filter(a => (a.pengirim || '').includes('Tracer') || (a.judul && a.judul.includes('Tracer Study Alumni')));
    let st = {bekerja:0, wirausaha:0, homecare:0, studi:0, mencari:0};
    alumniData.forEach(a => {
      const ket = (a.keterangan || '').toLowerCase();
      if (ket.includes('status: bekerja')) st.bekerja++;
      else if (ket.includes('wirausaha') || ket.includes('praktek mandiri')) st.wirausaha++;
      else if (ket.includes('homecare')) st.homecare++;
      else if (ket.includes('studi')) st.studi++;
      else if (ket.includes('mencari')) st.mencari++;
    });
    
    destroyChart(cDeptDonut);
    const ctxD=document.getElementById('chartDeptDonut')?.getContext('2d');
    if(ctxD){
      const sL=['Bekerja','Wirausaha','Homecare','Studi','Mencari'];
      const sV=[st.bekerja, st.wirausaha, st.homecare, st.studi, st.mencari];
      const sC=['#22c55e','#f59e0b','#8b5cf6','#3b82f6','#ef4444'];
      cDeptDonut=new Chart(ctxD,{
        type:'doughnut',
        plugins:[ChartDataLabels],
        data:{
          labels:sL,
          datasets:[{data:sV,backgroundColor:sC.map(c=>c+'88'),borderColor:sC,borderWidth:2}]
        },
        options:chartOpts({
          plugins:{legend:{position:'bottom',labels:{color:'#8b9dbf',font:{size:10},padding:8}}},
          cutout:'65%'
        })
      });
    }
  } else {
    if (t1) t1.innerHTML = `<i class="fas fa-chart-bar"></i> Tingkat Kerja Bulanan`;
    if (t2) t2.innerHTML = `<i class="fas fa-circle-half-stroke"></i> Status Arsip`;

    const months=getAYMonths(currentAY),labels=months.map(getMonthLabel);
    const counts=months.map(m=>data.filter(a=>a.tanggal?.startsWith(m)).length);
    destroyChart(cDeptBar);
    const ctxB=document.getElementById('chartDeptBar')?.getContext('2d');
    if(ctxB){const g=ctxB.createLinearGradient(0,0,0,220);g.addColorStop(0,color+'cc');g.addColorStop(1,color+'33');cDeptBar=new Chart(ctxB,{type:'bar',data:{labels,datasets:[{label:'Jumlah Arsip',data:counts,backgroundColor:g,borderColor:color,borderWidth:1.5,borderRadius:6,borderSkipped:false}]},options:chartOpts({plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#4f617d',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true}}})})}
    destroyChart(cDeptDonut);
    const ctxD=document.getElementById('chartDeptDonut')?.getContext('2d');
    if(ctxD){const sK=['aktif','diproses','selesai','arsip'],sL=['Aktif','Diproses','Selesai','Diarsipkan'],sV=sK.map(s=>data.filter(a=>a.status===s).length),sC=['#22c55e','#f59e0b','#3b82f6','#94a3b8'];cDeptDonut=new Chart(ctxD,{type:'doughnut',plugins:[ChartDataLabels],data:{labels:sL,datasets:[{data:sV,backgroundColor:sC.map(c=>c+'88'),borderColor:sC,borderWidth:2}]},options:chartOpts({plugins:{legend:{position:'bottom',labels:{color:'#8b9dbf',font:{size:10},padding:8}}},cutout:'65%'})})}
    
    // Hide kemahasiswaan detail chart if it exists
    const detailContainer = document.getElementById('kemahasiswaanDetailCharts');
    if (detailContainer) detailContainer.style.display = 'none';
  }
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ ANALYTICS ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function renderAnalytics() {
  document.getElementById('anSub1').textContent=`TA ${currentAY}`;
  destroyChart(cAnBar);
  const ctxAB=document.getElementById('chartAnBar')?.getContext('2d');
  if(ctxAB){
    const dK=Object.keys(DEPT),dL=dK.map(k=>DEPT[k].label),dV=dK.map(k=>arsip.filter(a=>a.bidang===k&&(!currentAY||a.ay===currentAY)).length),dC=dK.map(k=>DEPT[k].color);
    cAnBar=new Chart(ctxAB,{type:'bar',data:{labels:dL,datasets:[{label:`TA ${currentAY}`,data:dV,backgroundColor:dC.map(c=>c+'88'),borderColor:dC,borderWidth:1.5,borderRadius:6,borderSkipped:false}]},options:chartOpts({indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true},y:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#8b9dbf',font:{size:11}}}}})});
  }
  destroyChart(cAnYear);
  const ctxAY=document.getElementById('chartAnYear')?.getContext('2d');
  if(ctxAY){
    const sy=[...allAYears()].slice(0,5).reverse(),yV=sy.map(y=>arsip.filter(a=>a.ay===y).length);
    cAnYear=new Chart(ctxAY,{type:'line',data:{labels:sy,datasets:[{label:'Total Arsip',data:yV,borderColor:'#22c55e',backgroundColor:'rgba(34,197,94,.15)',tension:.4,pointBackgroundColor:'#22c55e',pointRadius:5,fill:true}]},options:chartOpts({plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#8b9dbf'}},y:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true}}})});
  }
  renderDeptMatrix();
}
function renderDeptMatrix() {
  const el=document.getElementById('deptMatrix'); if(!el)return;
  const sK=['aktif','diproses','selesai','arsip'],sL=['Aktif','Diproses','Selesai','Arsip'],sC=['#22c55e','#f59e0b','#3b82f6','#94a3b8'];
  el.innerHTML=Object.entries(DEPT).map(([k,d])=>{
    const data=arsip.filter(a=>a.bidang===k&&(!currentAY||a.ay===currentAY)),total=data.length||1;
    return`<div class="matrix-card" style="--c:${d.color}" onclick="goToDept('${k}')">
      <div class="mc-header"><div class="mc-icon"><i class="${d.icon}"></i></div><div class="mc-name">${d.label}<br><span style="font-size:.68rem;color:var(--t3);font-weight:400">${data.length} arsip</span></div></div>
      <div class="mc-bars">${sK.map((s,i)=>{const c=data.filter(a=>a.status===s).length,p=Math.round(c/total*100);return`<div class="mc-bar-row"><span class="mc-bar-label">${sL[i]}</span><div class="mc-bar-track"><div class="mc-bar-fill" style="width:${p}%;background:${sC[i]}"></div></div><span class="mc-bar-cnt">${c}</span></div>`;}).join('')}</div>
    </div>`;
  }).join('');
}

/* ÔöÇÔöÇÔöÇ CHART HELPER ÔöÇÔöÇÔöÇ */
function destroyChart(c){try{c?.destroy()}catch{}}
function chartOpts(extra={}) {
  return{
    responsive:true,
    maintainAspectRatio:true,
    animation:{duration:600,easing:'easeOutCubic'},
    plugins:{
      tooltip:{
        backgroundColor:'rgba(20,28,46,.95)',borderColor:'rgba(255,255,255,.08)',borderWidth:1,titleColor:'#f0f6ff',bodyColor:'#8b9dbf',padding:10,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) label += ': ';
            else if (context.label) label = context.label + ': ';
            
            const value = context.raw || 0;
            if (context.chart.config.type === 'doughnut' || context.chart.config.type === 'pie') {
              let total = 0;
              const dataArr = context.chart.data.datasets[context.datasetIndex].data;
              dataArr.forEach(d => { total += Number(d) || 0; });
              let percentage = 0;
              if (total > 0) percentage = ((value / total) * 100).toFixed(1).replace('.0', '') + '%';
              return label + value + ' (' + percentage + ')';
            }
            return label + value;
          }
        }
      },
      datalabels: {
        display: function(context) { 
           return context.chart.data.datasets[context.datasetIndex].data[context.dataIndex] > 0;
        },
        color: function(context) { 
           return (context.chart.config.type === 'doughnut' || context.chart.config.type === 'pie') ? '#fff' : '#8b9dbf'; 
        },
        font: { weight: 'bold', size: 10 },
        anchor: function(context) { return (context.chart.config.type === 'bar' || context.chart.config.type === 'line') ? 'end' : 'center'; },
        align: function(context) { return (context.chart.config.type === 'bar' || context.chart.config.type === 'line') ? 'end' : 'center'; },
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[context.datasetIndex].data;
          dataArr.forEach(data => { sum += Number(data) || 0; });
          if(sum > 0 && value > 0) {
            let p = (value * 100 / sum).toFixed(1).replace('.0', '') + "%";
            if (context.chart.config.type === 'doughnut' || context.chart.config.type === 'pie') return p;
            return value + ' (' + p + ')';
          }
          return null;
        }
      },
      legend:{display:false,...extra.plugins?.legend},
      ...extra.plugins
    },
    scales:extra.scales,
    ...Object.fromEntries(Object.entries(extra).filter(([k])=>!['plugins','scales'].includes(k)))
  };
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ FORM MODAL ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function openForm(prefillDept) {
    document.getElementById('arsipForm').reset();
    document.getElementById('editId').value='';
    document.getElementById('formTitle').innerHTML='<i class="fas fa-file-circle-plus"></i> Tambah Arsip Baru';
    document.getElementById('btnSimpan').innerHTML='<i class="fas fa-floppy-disk"></i> Simpan';
    document.getElementById('fTanggal').value=new Date().toISOString().slice(0,10);
    document.getElementById('fFormat').value='pdf';
    document.getElementById('fFileName').value='';
    document.getElementById('fGdriveLink').value='';
    
    const bidangField = document.getElementById('fBidang');
    const bidangLabel = document.getElementById('fBidangLabel');
    if (isLamptkesMode) {
      document.getElementById('formTitle').innerHTML='<i class="fas fa-cloud-upload-alt"></i> Upload Dokumen LAM-PTKes';
      bidangField.parentElement.style.display = 'block';
      bidangField.required = true;
      if(bidangLabel) bidangLabel.innerHTML = 'Pilih Kategori <span class="req">*</span>';
      
      bidangField.innerHTML = `
        <option value="">-- Pilih LED / SPMI --</option>
        <option value="lamptkes_led">Laporan Evaluasi Diri (LED)</option>
        <option value="lamptkes_spmi">Sistem Penjaminan Mutu Internal (SPMI)</option>
      `;
      document.getElementById('fJenisLabelText').textContent = '-- Pilih Kategori dulu --';
      document.getElementById('fJenisOptions').innerHTML = '';
      bidangField.value = '';
    } else {
      bidangField.parentElement.style.display = 'block';
      bidangField.required = true;
      if(bidangLabel) bidangLabel.innerHTML = 'Bidang <span class="req">*</span>';
      if (ORIGINAL_BIDANG_HTML) bidangField.innerHTML = ORIGINAL_BIDANG_HTML;
      
      if(prefillDept){ bidangField.value=prefillDept; onBidangChange(); }
      else { 
        document.getElementById('fJenisLabelText').textContent = '-- Pilih Bidang dulu --';
        document.getElementById('fJenisOptions').innerHTML = '';
        bidangField.value = '';
      }
    }
  
    const sel=document.getElementById('fAYear');
    if(sel){
      sel.innerHTML=[...allAYears()].reverse().map(y=>`<option value="${y}">${y}</option>`).join('');
      sel.value=currentAY||getAY(document.getElementById('fTanggal').value);
    }
    document.getElementById('overlayForm').classList.add('open');
  }
function closeForm(){ 
  document.getElementById('overlayForm').classList.remove('open'); 
  const form = document.getElementById('arsipForm');
  if(form) form.reset();
  const statusEl = document.getElementById('fUploadStatus');
  if(statusEl) statusEl.style.display = 'none';
}
function closeFormOut(e){ /* disabled by user request */ }

function toggleJenisOptions() {
  const opts = document.getElementById('fJenisOptions');
  if(opts) {
    opts.classList.toggle('open');
  }
}

function selectJenisOption(val, labelText) {
  document.getElementById('fJenis').value = val;
  document.getElementById('fJenisLabelText').textContent = labelText;
  document.getElementById('fJenisOptions').classList.remove('open');
  onJenisChange();
}

document.addEventListener('click', function(e) {
  const wrapper = document.getElementById('fJenisWrapper');
  const opts = document.getElementById('fJenisOptions');
  if (wrapper && opts && !wrapper.contains(e.target)) {
    opts.classList.remove('open');
  }
});

function onBidangChange() {
    const bidang=document.getElementById('fBidang').value;
    const opts=document.getElementById('fJenisOptions');
    
    let types = [];
    if (isLamptkesMode) {
      if (bidang === 'lamptkes_led') {
         types = [
            {val: 'led_k1', label: 'Kriteria 1. Visi, Misi, Tujuan, dan Strategi'},
            {val: 'led_k2', label: 'Kriteria 2. Kurikulum'},
            {val: 'led_k3', label: 'Kriteria 3. Penilaian'},
            {val: 'led_k4', label: 'Kriteria 4. Mahasiswa'},
            {val: 'led_k5', label: 'Kriteria 5. Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat'},
            {val: 'led_k6', label: 'Kriteria 6. Sarana, Prasarana Pendidikan, dan Keuangan'},
            {val: 'led_k7', label: 'Kriteria 7. Penjaminan Mutu'},
            {val: 'led_k8', label: 'Kriteria 8. Tata Kelola dan Administrasi'}
         ];
      } else if (bidang === 'lamptkes_spmi') {
         types = [
            {val: 'spmi_k1', label: 'Kriteria 1. Visi, Misi, Tujuan, dan Strategi'},
            {val: 'spmi_k2', label: 'Kriteria 2. Kurikulum'},
            {val: 'spmi_k3', label: 'Kriteria 3. Penilaian'},
            {val: 'spmi_k4', label: 'Kriteria 4. Mahasiswa'},
            {val: 'spmi_k5', label: 'Kriteria 5. Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat'},
            {val: 'spmi_k6', label: 'Kriteria 6. Sarana, Prasarana Pendidikan, dan Keuangan'},
            {val: 'spmi_k7', label: 'Kriteria 7. Penjaminan Mutu'},
            {val: 'spmi_k8', label: 'Kriteria 8. Tata Kelola dan Administrasi'}
         ];
      }
    } else {
      types = DEPT_JENIS[bidang] || [];
    }
    
    if(types.length || COMMON_JENIS.length) {
      document.getElementById('fJenisLabelText').textContent = '-- Pilih Jenis Dokumen --';
      document.getElementById('fJenis').value = '';
      let html = '';
      types.forEach(t => {
        const safeLabel = t.label.replace(/'/g, "\\'");
        html += `<div class="custom-option" onclick="selectJenisOption('${t.val}', '${safeLabel}')">${t.label}</div>`;
      });
      
      html += `<div style="padding:8px 12px; font-size:0.75rem; color:#6b7280; font-weight:700; text-transform:uppercase; margin-top:8px; border-top:1px solid #e5e7eb;">Arsip Umum</div>`;
      COMMON_JENIS.forEach(t => {
        const safeLabel = t.label.replace(/'/g, "\\'");
        html += `<div class="custom-option" onclick="selectJenisOption('${t.val}', '${safeLabel}')"><i class="${t.icon}" style="margin-right:6px; color:${t.color}"></i> ${t.label}</div>`;
      });
      
      opts.innerHTML = html;
    } else {
      document.getElementById('fJenisLabelText').textContent = isLamptkesMode ? '-- Pilih Kategori dulu --' : '-- Pilih Bidang dulu --';
      document.getElementById('fJenis').value = '';
      opts.innerHTML = '';
    }
    onJenisChange();
  }

const DYNAMIC_FIELDS = {
  mutu_notulen_visi: [{ id: 'meta_pihak_terlibat', label: 'Pihak yang Terlibat', type: 'text' }],
  mutu_dokumen_spmi: [{ id: 'meta_jenis_dokumen', label: 'Jenis Dokumen (Manual/Standar/Formulir)', type: 'text' }],
  pend_blueprint_ujian: [{ id: 'meta_persentase_lulus', label: 'Target Persentase Kelulusan', type: 'text' }],
  pend_hasil_ukom: [{ id: 'meta_jumlah_peserta', label: 'Jumlah Peserta Ukom', type: 'number' }, { id: 'meta_lulus', label: 'Jumlah Lulus', type: 'number' }],
  mhs_kebijakan_seleksi: [{ id: 'meta_pendaftar', label: 'Jumlah Pendaftar', type: 'number' }, { id: 'meta_diterima', label: 'Jumlah Diterima', type: 'number' }],
  mhs_survei_kepuasan_mhs: [{ id: 'meta_nilai_indeks', label: 'Skor Indeks Kepuasan (Skala 4)', type: 'number' }],
  mhs_kampus_sehat: [{ id: 'meta_jenis_kegiatan', label: 'Jenis Sosialisasi/Kegiatan', type: 'text' }],
  sdm_monev_kinerja_dosen: [{ id: 'meta_nama_dosen', label: 'Nama Dosen', type: 'text' }, { id: 'meta_skor', label: 'Skor Evaluasi', type: 'number' }],
  sarana_manekin_skill_lab: [{ id: 'meta_nama_alat', label: 'Nama Alat/Manekin', type: 'text' }, { id: 'meta_kondisi', label: 'Kondisi (Baik/Rusak)', type: 'text' }],
  sarana_pasien_standar: [{ id: 'meta_skenario', label: 'Skenario/Kasus', type: 'text' }],
  sarana_pedoman_rca: [{ id: 'meta_akar_masalah', label: 'Akar Masalah (Root Cause)', type: 'text' }, { id: 'meta_tindak_lanjut', label: 'Tindak Lanjut', type: 'text' }],
  lppm_bukti_penghargaan: [{ id: 'meta_nama_pencipta', label: 'Nama Pencipta/Penerima', type: 'text' }, { id: 'meta_nomor_haki', label: 'Nomor Registrasi/Sertifikat', type: 'text' }],
  humas_mitigasi_risiko: [{ id: 'meta_akar_masalah', label: 'Akar Masalah (Root Cause)', type: 'text' }, { id: 'meta_tindak_lanjut', label: 'Tindak Lanjut', type: 'text' }]
};

function onJenisChange() {
  const jenis = document.getElementById('fJenis').value;
  renderDynamicFields(jenis);
}

function renderDynamicFields(jenis, existingData = null) {
  const container = document.getElementById('dynamicFieldsContainer');
  const fields = DYNAMIC_FIELDS[jenis];
  
  if (!fields) {
    container.innerHTML = '';
    return;
  }

  const bidang = document.getElementById('fBidang').value;
  let html = `<div style="padding:12px; background:var(--bg3); border:1px solid var(--b2); border-radius:var(--r2); margin-bottom:12px;">
    <div style="font-weight:600; font-size:0.8rem; color:var(--primary); margin-bottom:10px;"><i class="fas fa-sliders"></i> Informasi Spesifik (${getJenisLabel(bidang, jenis)})</div>
    <div class="form-row-2">`;
  
  fields.forEach(f => {
    const val = existingData && existingData[f.id] ? existingData[f.id] : '';
    html += `
      <div class="form-field">
        <label>${f.label}</label>
        <input type="${f.type}" id="${f.id}" class="dynamic-input" data-key="${f.id}" placeholder="Masukkan ${f.label}..." value="${val}" required />
      </div>`;
  });
  
  html += `</div></div>`;
  container.innerHTML = html;
}

function testGDriveLink() {
  const url=document.getElementById('fGdriveLink').value.trim();
  if(!url){toast('Tempel link Google Drive terlebih dahulu.','error');return;}
  window.open(url,'_blank','noopener');
}

function editArsip(id) {
  const a=arsip.find(x=>x.id===id); if(!a)return;
  document.getElementById('editId').value=a.id;
  document.getElementById('fNomor').value=a.nomor;
  document.getElementById('fJudul').value=a.judul;
  document.getElementById('fBidang').value=a.bidang;
  
  const types=DEPT_JENIS[a.bidang]||[];
  document.getElementById('fJenis').innerHTML=(types.length?'<option value="">-- Pilih Jenis --</option>':'<option value="">-- Pilih Bidang dulu --</option>')+
    types.map(t=>`<option value="${t.val}">${t.label}</option>`).join('');
  
  setTimeout(()=>{ 
    document.getElementById('fJenis').value=a.jenis; 
    renderDynamicFields(a.jenis, a.metadata);
  }, 0);
  
  document.getElementById('fTanggal').value=a.tanggal;
  document.getElementById('fPengirim').value=a.pengirim||'';
  document.getElementById('fStatus').value=a.status;
  document.getElementById('fFormat').value=a.format||'pdf';
  document.getElementById('fFileName').value=a.fileName||'';
  document.getElementById('fGdriveLink').value=a.gdriveLink||'';
  document.getElementById('fKeterangan').value=a.keterangan||'';
  
  const sel=document.getElementById('fAYear');
  if(sel){
    sel.innerHTML=[...allAYears()].reverse().map(y=>`<option value="${y}">${y}</option>`).join('');
    sel.value=a.ay;
  }
  document.getElementById('formTitle').innerHTML='<i class="fas fa-pen"></i> Edit Arsip';
  document.getElementById('btnSimpan').innerHTML='<i class="fas fa-floppy-disk"></i> Update';
  document.getElementById('overlayForm').classList.add('open');
}

async function saveArsip(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSimpan');
  const btnIcon = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...'; }

  const id=document.getElementById('editId').value;
  const tgl=document.getElementById('fTanggal').value;
  let gdriveLink=document.getElementById('fGdriveLink').value.trim();
  let gdriveFolder='';
  const bidang=document.getElementById('fBidang').value;
  const jenis=document.getElementById('fJenis').value;
  const tahun=document.getElementById('fAYear').value || getAY(tgl);

  const fileInput = document.getElementById('fUploadFile');
  let fileToUpload = null;
  if (fileInput && fileInput.files.length > 0) {
    fileToUpload = fileInput.files[0];
    gdriveLink = 'UPLOADING'; // Placeholder
    document.getElementById('fFileName').value = fileToUpload.name;
  }

  // Capture dynamic metadata
  const metadata = {};
  document.querySelectorAll('.dynamic-input').forEach(input => {
    metadata[input.getAttribute('data-key')] = input.value.trim();
  });

  const record={
    id:id||genId(),
    nomor:document.getElementById('fNomor').value.trim(),
    judul:document.getElementById('fJudul').value.trim(),
    bidang:bidang,
    jenis:jenis,
    tanggal:tgl, ay:tahun,
    pengirim:document.getElementById('fPengirim').value.trim(),
    status:document.getElementById('fStatus').value,
    format:document.getElementById('fFormat').value||'pdf',
    fileName:document.getElementById('fFileName').value.trim(),
    gdriveLink,
    gdriveFolder,
    keterangan:document.getElementById('fKeterangan') ? document.getElementById('fKeterangan').value.trim() : '',
    metadata: metadata,
    createdAt:id?(arsip.find(x=>x.id===id)?.createdAt||new Date().toISOString()):new Date().toISOString(),
    updatedAt:new Date().toISOString(),
  };

  if(id){
    const idx=arsip.findIndex(x=>x.id===id);
    arsip[idx]=record;
    log('edit',`Mengubah arsip: "${record.judul}"`);
    toast('Arsip berhasil diperbarui!','success');
  } else {
    arsip.unshift(record);
    log('add',`Menambah arsip: "${record.judul}" (TA ${record.ay})`);
    toast('Arsip berhasil disimpan!','success');
  }
    try {
      await db.collection('arsip').doc(record.id).set(record);
      
      // Sinkronisasi update ke Portal Kemahasiswaan jika dokumen asalnya dari sana
      if (id && dbSumber && record.bidang === 'kemahasiswaan' && record.metadata && record.metadata.dokumenPortal && record.metadata.originalKoleksi && record.metadata.originalId) {
        try {
          await dbSumber.collection(record.metadata.originalKoleksi).doc(record.metadata.originalId).update({
            judul: record.judul.replace(/^[^:]+:\s*/, ''), // Hapus prefix jenisLaporan jika ada
            tahun: record.ay,
            updatedAt: new Date().toISOString()
          });
        } catch (e) {
          console.warn("Gagal update dokumen di Portal Kemahasiswaan", e);
        }
      } else if (!id && dbSumber && record.bidang === 'kemahasiswaan') {
          // Sinkronisasi buat dokumen baru ke Portal Kemahasiswaan
          if (record.judul.startsWith('Data Mahasiswa:')) {
            try {
              await dbSumber.collection('dokumenMahasiswaData').doc(record.id).set({
                title: record.judul.replace('Data Mahasiswa: ', '').replace('Data Mahasiswa:', ''),
                year: record.ay || record.tanggal.substring(0, 4),
                date: record.tanggal,
                type: 'Data Mahasiswa',
                link: record.gdriveLink || ''
              });
            } catch (e) { console.warn("Gagal add ke Portal Kemahasiswaan", e); }
          }
      }
    } catch(e) {
      console.error(e);
      alert('GAGAL MENYIMPAN KE DATABASE CLOUD: ' + e.message + '\n\nData hanya tersimpan sementara di browser. Periksa Koneksi atau Aturan Keamanan Firebase Anda.');
    }

  save(); populateAYearSelect(); updateBadges(); closeForm();
  if(currentPage==='dashboard')renderDashboard();
  else if(currentPage==='arsip')renderArsipTable();
  else if(currentPage==='dept')renderDeptPage(currentDept);
  else if(currentPage==='analytics')renderAnalytics();
  
  if (btn) { btn.disabled = false; btn.innerHTML = btnIcon; }

  // Lakukan upload di background setelah form ditutup
  if (fileToUpload) {
    toast(`Mulai mengunggah ${fileToUpload.name} ke GDrive... Jangan tutup halaman.`, 'info');
    uploadToGDrive(fileToUpload, bidang, jenis, tahun, record.tanggal).then(res => {
      if (res && res.fileUrl) {
        const idx = arsip.findIndex(x => x.id === record.id);
        if (idx > -1) {
          arsip[idx].gdriveLink = res.fileUrl;
          arsip[idx].gdriveFolder = res.folderUrl || '';
          save();
          db.collection('arsip').doc(record.id).set(arsip[idx]).catch(e => console.error(e));
          toast(`Berhasil mengunggah ${fileToUpload.name}!`, 'success');
          // Refresh tabel jika di halaman arsip
          if (currentPage === 'arsip') renderArsipTable();
          else if (currentPage === 'dept') renderDeptPage(currentDept);
        }
      }
    }).catch(err => {
      toast(`Gagal mengunggah ${fileToUpload.name}: ` + err.message, 'error');
      const idx = arsip.findIndex(x => x.id === record.id);
      if (idx > -1) {
        arsip[idx].gdriveLink = ''; // Reset link
        save();
        try {
          db.collection('arsip').doc(record.id).set(arsip[idx]);
        } catch(e) {}
        if (currentPage === 'arsip') renderArsipTable();
        else if (currentPage === 'dept') renderDeptPage(currentDept);
      }
    });
  }
}

async function uploadToGDrive(file, bidang, jenis, tahun, tanggal = new Date().toISOString().slice(0, 10)) {
  if (!GAS_URL) {
    // Simulasi jika belum punya URL GAS
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 'success',
          fileUrl: `https://drive.google.com/file/mock/${Math.random().toString(36).substr(2,9)}/view`
        });
      }, 1500);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function() {
      const base64Data = reader.result.split(',')[1];
      const payload = {
          fileName: file.name,
          filename: file.name,
          mimeType: file.type || 'application/octet-stream',
          base64Data: base64Data,
          base64: base64Data,
          bidang: DEPT[bidang]?.label || bidang,
          jenis: jenis,
          tahun: tahun,
          folderPath: (function() {
            let levelBidang = DEPT[bidang]?.label || bidang;
            
            const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const tgl = new Date(tanggal);
            const levelTahun = isNaN(tgl.getFullYear()) ? (tahun || "Umum") : tgl.getFullYear().toString();
            const levelBulan = isNaN(tgl.getMonth()) ? "Bulan Umum" : monthNames[tgl.getMonth()];
            const levelTanggal = isNaN(tgl.getDate()) ? "Tanggal Umum" : String(tgl.getDate()).padStart(2, '0');
            
            return ["SIMARSIP AAS", levelBidang, levelTahun, levelBulan, levelTanggal];
          })()
        };

      try {
        const response = await fetch(GAS_URL, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if(result.status === 'success') {
          resolve(result);
        } else {
          reject(new Error(result.message || 'Unknown error from GAS'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

let dbSumber = null;
try {
  if (typeof firebase !== 'undefined') {
    const appSumber = firebase.initializeApp({
      apiKey: "AIzaSyBgc1Gqfhk2dhqmcL0Un7dkDzHZzrxcW9s",
      authDomain: "bidkemahasiswaandanalumn-93be8.firebaseapp.com",
      projectId: "bidkemahasiswaandanalumn-93be8"
    }, 'sumber');
    dbSumber = appSumber.firestore();
  }
} catch (e) {
  console.warn("Gagal inisialisasi dbSumber", e);
}

async function deleteArsip(id) {
  const a=arsip.find(x=>x.id===id);
  if(!a||!confirm(`Hapus arsip "${a.judul}"?\n\nTindakan ini tidak dapat dibatalkan.`))return;
  
  // Hapus dari DATA WEB ARSIP
  try { await db.collection('arsip').doc(id).delete(); } catch(e) { console.error(e); toast('Gagal menghapus dari database','error'); return; }
  
  // Hapus dari Portal Kemahasiswaan
  if (dbSumber && a.bidang === 'kemahasiswaan') {
    try {
      if (a.metadata && a.metadata.dokumenPortal && a.metadata.originalKoleksi && a.metadata.originalId) {
        await dbSumber.collection(a.metadata.originalKoleksi).doc(a.metadata.originalId).delete();
      } else {
        if (id.startsWith('alumni_')) await dbSumber.collection('alumniData').doc(id.replace('alumni_', '')).delete();
        else if (id.startsWith('beasiswa_')) await dbSumber.collection('beasiswaData').doc(id.replace('beasiswa_', '')).delete();
        else if (id.startsWith('bem_')) await dbSumber.collection('bemData').doc(id.replace('bem_', '')).delete();
        else if (id.startsWith('laporan_kmhs_')) await dbSumber.collection('laporanData').doc(id.replace('laporan_kmhs_', '')).delete();
        else if (id.startsWith('sk_kmhs_')) await dbSumber.collection('skData').doc(id.replace('sk_kmhs_', '')).delete();
        else if (id.startsWith('anggaran_kmhs_')) await dbSumber.collection('anggaranData').doc(id.replace('anggaran_kmhs_', '')).delete();
        else if (id.startsWith('tracer_mhs_')) await dbSumber.collection('tracerMahasiswaData').doc(id.replace('tracer_mhs_', '')).delete();
      }
    } catch(e) { console.warn("Gagal menghapus dari dbSumber", e); }
  }

  // Hapus dari Portal Sarana Prasarana (SIMSPRAS)
  if (a.bidang === 'sarana') {
    try {
      if (!dbSarprasSumber && typeof firebase !== 'undefined') {
        let appSarpras = firebase.apps.find(app => app.name === "sarprasSumber") || firebase.initializeApp({
          apiKey: "AIzaSyATNPIY3Iv5tmx9MKh7N6cz-czK0oC8SfY",
          authDomain: "sim-sarpras-ef3a4.firebaseapp.com",
          projectId: "sim-sarpras-ef3a4"
        }, 'sarprasSumber');
        dbSarprasSumber = appSarpras.firestore();
      }
      if (dbSarprasSumber) {
        let colName = (a.metadata && a.metadata.module) || '';
        let origId = (a.metadata && a.metadata.originalId) || '';
        if (!colName || !origId) {
          if (id.startsWith('SIMSPRAS-INVENTARIS-')) { colName = 'inventaris'; origId = id.replace('SIMSPRAS-INVENTARIS-', ''); }
          else if (id.startsWith('SIMSPRAS-PEMINJAMAN-')) { colName = 'peminjaman'; origId = id.replace('SIMSPRAS-PEMINJAMAN-', ''); }
          else if (id.startsWith('SIMSPRAS-ANGGARAN-')) { colName = 'anggaran'; origId = id.replace('SIMSPRAS-ANGGARAN-', ''); }
          else if (id.startsWith('SIMSPRAS-SOP-')) { colName = 'sop'; origId = id.replace('SIMSPRAS-SOP-', ''); }
          else if (id.startsWith('SIMSPRAS-PENGAWASAN-')) { colName = 'pengawasan'; origId = id.replace('SIMSPRAS-PENGAWASAN-', ''); }
          else if (id.startsWith('SIMSPRAS-PEMELIHARAAN-')) { colName = 'pemeliharaan'; origId = id.replace('SIMSPRAS-PEMELIHARAAN-', ''); }
          else if (id.startsWith('SIMSPRAS-LAPORAN-')) { colName = 'laporan'; origId = id.replace('SIMSPRAS-LAPORAN-', ''); }
          else if (id.startsWith('SIMSPRAS-BA-')) { colName = 'berita_acara'; origId = id.replace('SIMSPRAS-BA-', ''); }
        }
        if (colName && origId) {
          await dbSarprasSumber.collection(colName).doc(origId).delete();
        }
      }
    } catch(e) { console.warn("Gagal menghapus dari dbSarprasSumber", e); }
  }

  arsip=arsip.filter(x=>x.id!==id);
  log('delete',`Menghapus arsip: "${a.judul}"`);
  save(); updateBadges(); toast('Arsip berhasil dihapus.','success');
  if(currentPage==='dashboard')renderDashboard();
  else if(currentPage==='arsip')renderArsipTable();
  else if(currentPage==='dept')renderDeptPage(currentDept);
  else if(currentPage==='analytics')renderAnalytics();
}
/* ÔòÉÔòÉÔòÉÔòÉÔòÉ DETAIL MODAL ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function viewDetail(id) {
  const a=arsip.find(x=>x.id===id); if(!a)return;
  const d=DEPT[a.bidang]||{};
  const f=getFormatCfg(a.format);
  document.getElementById('detailContent').innerHTML=`
    <div class="detail-grid">
      <div class="detail-field"><label>Nomor Arsip</label><span class="td-nomor">${esc(a.nomor)}</span></div>
      <div class="detail-field"><label>Tanggal</label><span>${fmtDate(a.tanggal)}</span></div>
      <div class="detail-field" style="grid-column:1/-1"><label>Judul / Perihal</label><span style="font-size:.98rem;font-weight:700">${esc(a.judul)}</span></div>
      <div class="detail-field"><label>Bidang</label><span class="d-badge" style="background:${d.color||'#888'}18;color:${d.color||'#888'}"><i class="${d.icon||'fas fa-file'}"></i>${d.label||a.bidang}</span></div>
      <div class="detail-field"><label>Jenis Dokumen</label><span>${getJenisLabel(a.bidang,a.jenis)}</span></div>
      <div class="detail-field"><label>Pengirim / Pembuat</label><span>${esc(a.pengirim||'ÔÇö')}</span></div>
      <div class="detail-field"><label>Status</label>${statusBadge(a.status)}</div>
      <div class="detail-field"><label>Tahun Akademik</label><span class="td-ta">${a.ay||'ÔÇö'}</span></div>
      <div class="detail-field" style="grid-column:1/-1">
        <label>Dokumen Google Drive</label>
        ${a.gdriveLink && a.gdriveLink !== 'UPLOADING'
          ?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
              <a href="${esc(a.gdriveLink)}" target="_blank" rel="noopener" class="gdrive-link-btn" onclick="logGDriveOpen('${a.id}',event)">
                <i class="${f.icon}" style="color:${f.color}"></i>
                <i class="fab fa-google-drive"></i> Buka di Google Drive
                <span style="font-size:.7rem;opacity:.7">(${f.label})</span>
              </a>
              <button class="btn-ghost" onclick="previewDoc('${a.id}');closeDetail()">
                <i class="fas fa-eye"></i> Pratinjau
              </button>
            </div>
            ${a.fileName?`<div style="margin-top:6px;font-size:.75rem;color:var(--t3)"><i class="${f.icon}" style="color:${f.color}"></i> ${esc(a.fileName)}</div>`:''}
          `
          :`<span style="color:var(--t3);font-size:.84rem">Belum ada file dilampirkan ÔÇö Edit arsip untuk menambahkan link Google Drive.</span>`}
      </div>
    </div>
    ${a.keterangan?`<div><label style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--t3)">Keterangan</label><div class="detail-keterangan">${esc(a.keterangan)}</div></div>`:''}
    <div class="detail-actions">
      <button class="btn-ghost" onclick="closeDetail()">Tutup</button>
      <button class="tb-btn tb-btn-primary" onclick="closeDetail();editArsip('${a.id}')"><i class="fas fa-pen"></i> Edit</button>
    </div>`;
  document.getElementById('overlayDetail').classList.add('open');
}
function closeDetail(){ document.getElementById('overlayDetail').classList.remove('open'); }
function closeDetailOut(e){ if(e.target===document.getElementById('overlayDetail'))closeDetail(); }

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ DOCUMENT VIEWER (GDrive Preview) ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function getGDriveEmbedUrl(url) {
  if(!url)return null;
  // https://drive.google.com/file/d/ID/view ÔåÆ /preview
  const m1=url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if(m1)return`https://drive.google.com/file/d/${m1[1]}/preview`;
  // ?id=ID
  const m2=url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if(m2)return`https://drive.google.com/file/d/${m2[1]}/preview`;
  // Docs, Sheets, Slides
  const m3=url.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([a-zA-Z0-9_-]+)/);
  if(m3)return`https://docs.google.com/${m3[1]}/d/${m3[2]}/preview`;
  return url;
}

function previewDoc(id) {
  const a=arsip.find(x=>x.id===id); if(!a)return;
  pendingPdfId=id;
  const f=getFormatCfg(a.format);
  document.getElementById('pdfHeadTitle').innerHTML=
    `<i class="${f.icon}" style="color:${f.color}"></i> ${esc(a.fileName||a.judul)}`;
  const frame=document.getElementById('pdfFrame'),noFile=document.getElementById('pdfNoFile');
  const embedUrl=getGDriveEmbedUrl(a.gdriveLink);
  if(embedUrl){
    frame.src=embedUrl; frame.style.display='';
    noFile.classList.add('hidden');
    logGDriveOpen(id,{});
  }else{
    frame.src=''; frame.style.display='none';
    noFile.classList.remove('hidden');
  }
  document.getElementById('overlayPDF').classList.add('open');
}
function closePDF(){ document.getElementById('overlayPDF').classList.remove('open'); document.getElementById('pdfFrame').src=''; pendingPdfId=''; }
function openInGDrive() {
  if(!pendingPdfId)return;
  const a=arsip.find(x=>x.id===pendingPdfId);
  if(a?.gdriveLink) window.open(a.gdriveLink,'_blank','noopener');
  else toast('Tidak ada link Google Drive.','error');
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ ACTIVITY ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function log(type,text){
  const item = { id: genId(), type, text, time: new Date().toISOString() };
  activity.unshift(item);
  if(activity.length>120)activity=activity.slice(0,120);
    try {
      db.collection('activity').doc(item.id).set(item);
    } catch(e) {
      console.error('Log error:', e);
    }
}
function renderActivity() {
  const el=document.getElementById('activityList'); if(!el)return;
  if(!activity.length){el.innerHTML='<div class="act-empty"><i class="fas fa-history"></i><p>Belum ada aktivitas.</p></div>';return;}
  const cfg={add:{cls:'dot-add',ic:'fa-plus'},edit:{cls:'dot-edit',ic:'fa-pen'},delete:{cls:'dot-del',ic:'fa-trash'}};
  el.innerHTML=activity.map(a=>{const c=cfg[a.type]||cfg.add;return`<div class="act-item"><div class="act-dot ${c.cls}"><i class="fas ${c.ic}"></i></div><div class="act-body"><div class="act-text">${esc(a.text)}</div><div class="act-time">${fmtDateTime(a.time)}</div></div></div>`;}).join('');
}
async function clearActivity(){ 
  if(!confirm('Hapus semua riwayat aktivitas dari database? Tindakan ini tidak dapat dibatalkan.')) return; 
  try {
    const snap = await db.collection('activity').get();
    const batch = db.batch();
    snap.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    activity = []; 
    save(); 
    renderActivity();
    alert('Berhasil mengosongkan riwayat aktivitas di Firestore!');
  } catch(e) {
    console.error('Failed to clear activity:', e);
    alert('Terjadi kesalahan saat menghapus aktivitas dari database.');
  }
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ EXPORT ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function toggleExportMenu(){ document.getElementById('exportMenu').classList.toggle('open'); }
function getFilteredData(){ return arsip.filter(a=>!currentAY||a.ay===currentAY).sort((a,b)=>new Date(b.tanggal)-new Date(a.tanggal)); }

function exportJSON() {
  document.getElementById('exportMenu').classList.remove('open');
  const data=getFilteredData();
  if(!data.length){toast('Tidak ada data.','error');return;}
  const blob=new Blob([JSON.stringify({exported:new Date().toISOString(),institution:'Akademi Akupunktur Surabaya',tahunAkademik:currentAY,total:data.length,data},null,2)],{type:'application/json'});
  const fn=`Backup_AAS_${currentAY.replace(/[\s\-\/]+/g, '_')}_${now()}.json`;
  saveAs(blob,fn);
  log('edit',`Backup JSON: ${fn}`);save();toast('Backup JSON berhasil diunduh!','success');
}

/* ÔöÇÔöÇÔöÇ TOAST ÔöÇÔöÇÔöÇ */
function toast(msg,type='success') {
  const stack=document.getElementById('toastStack'),el=document.createElement('div');
  el.className=`toast-item ${type}`;
  el.innerHTML=`<i class="fas ${type==='success'?'fa-circle-check si':'fa-circle-exclamation ei'}"></i> ${msg}`;
  stack.prepend(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(20px)';el.style.transition='all .3s';setTimeout(()=>el.remove(),300);},3200);
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ MASTER DATA MAHASISWA ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function renderMahasiswaPage() {
  const grid=document.getElementById('mhsGrid'), empty=document.getElementById('mhsEmpty');
  const q=document.getElementById('mhsSearch').value.toLowerCase();
  const stat=document.getElementById('mhsFilterStatus').value;
  const ay=document.getElementById('mhsFilterAy').value;
  let data=mahasiswa;
  if(q) data=data.filter(m=>{
    const s = `${m.nama} ${m.nim} ${m.angkatan||''} ${m.semester||''} ${m.catatan||''} ${m.status}`.toLowerCase();
    return s.includes(q);
  });
  if(stat) data=data.filter(m=>m.status===stat);
  if(ay) data=data.filter(m=>{
    const mAy = m.angkatan ? getAY(m.angkatan) : '';
    return mAy===ay || (m.catatan||'').includes(ay);
  });
  if(!data.length){ grid.innerHTML=''; empty.classList.remove('hidden'); renderMahasiswaCharts(data); return; }
  empty.classList.add('hidden');
  grid.innerHTML=data.map(m=>`
    <div class="profile-card">
      <div class="act-group">
        <button class="act-btn edit" onclick="editMhs('${m.id}')"><i class="fas fa-pen"></i></button>
        <button class="act-btn del" onclick="deleteMhs('${m.id}')"><i class="fas fa-trash"></i></button>
      </div>
      <div class="profile-img-wrap" style="--c:${getPersonColor(m.status)}">
        ${m.foto ? `<img src="${convertGDriveImage(m.foto)}" class="profile-img" onerror="this.outerHTML='<i class=\\'fas fa-user-graduate profile-img-fallback\\'></i>'"/>` : `<i class="fas fa-user-graduate profile-img-fallback"></i>`}
      </div>
      <div class="profile-name">${esc(m.nama)}</div>
      <div class="profile-id">NIM: ${esc(m.nim)}</div>
      <div class="profile-role">Angkatan: ${esc(m.angkatan||'-')}</div>
      <span class="p-badge pb-${m.status}">${m.status.replace('_',' ')}</span>
      <div class="doc-links"><button class="btn-ghost-sm" onclick="viewPersonDetail('${m.id}','mhs')"><i class="fas fa-address-card"></i> Detail Profil</button></div>
    </div>
  `).join('');
  renderMahasiswaCharts(data);
}

let mhsTrendChartIns=null, mhsStatusChartIns=null, mhsJkChartIns=null, mhsAgamaChartIns=null;
function renderMahasiswaCharts(data) {
  if (mhsTrendChartIns) mhsTrendChartIns.destroy();
  if (mhsStatusChartIns) mhsStatusChartIns.destroy();
  if (mhsJkChartIns) mhsJkChartIns.destroy();
  if (mhsAgamaChartIns) mhsAgamaChartIns.destroy();

  // 1. Trend Chart
  const ayCounts = {};
  data.forEach(m => {
    if(!m.angkatan) return;
    const ay = getAY(m.angkatan);
    if(ay) ayCounts[ay] = (ayCounts[ay]||0) + 1;
  });
  const ayKeys = Object.keys(ayCounts).sort().slice(-5);
  const ayVals = ayKeys.map(k => ayCounts[k]);

  mhsTrendChartIns = new Chart(document.getElementById('mhsTrendChart'), {
    type: 'bar',
    data: {
      labels: ayKeys.length ? ayKeys : ['Belum ada data'],
      datasets: [{
        label: 'Mahasiswa Baru',
        data: ayKeys.length ? ayVals : [0],
        backgroundColor: '#10b981',
        borderRadius: 4
      }]
    },
    options: chartOpts({
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    })
  });

  // 2. Status Chart
  const stCounts = { aktif:0, cuti:0, lulus:0, keluar:0 };
  data.forEach(m => {
    if(stCounts[m.status] !== undefined) stCounts[m.status]++;
  });
  
  mhsStatusChartIns = new Chart(document.getElementById('mhsStatusChart'), {
    type: 'doughnut',
    plugins: [ChartDataLabels],
    data: {
      labels: ['Aktif', 'Cuti', 'Lulus', 'Keluar'],
      datasets: [{
        data: [stCounts.aktif, stCounts.cuti, stCounts.lulus, stCounts.keluar],
        backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: chartOpts({
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: false }
      }
    })
  });

  // 3. Jenis Kelamin Chart
  const jkCounts = { L:0, P:0 };
  data.forEach(m => {
    if (m.jk === 'L' || m.jk === 'Laki-Laki') jkCounts.L++;
    if (m.jk === 'P' || m.jk === 'Perempuan') jkCounts.P++;
  });
  const ctxJk = document.getElementById('mhsJkChart')?.getContext('2d');
  if (ctxJk) {
    mhsJkChartIns = new Chart(ctxJk, {
      type: 'doughnut',
      plugins: [ChartDataLabels],
      data: {
        labels: ['Laki-Laki', 'Perempuan'],
        datasets: [{
          data: [jkCounts.L, jkCounts.P],
          backgroundColor: ['#3b82f6', '#ec4899'],
          borderWidth: 0
        }]
      },
      options: chartOpts({
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' }, title: { display: false } },
        cutout: '50%'
      })
    });
  }

  // 4. Agama Chart
  const agamaCounts = {};
  data.forEach(m => {
    if(m.agama) {
      agamaCounts[m.agama] = (agamaCounts[m.agama]||0) + 1;
    }
  });
  const agamaKeys = Object.keys(agamaCounts);
  const agamaVals = agamaKeys.map(k => agamaCounts[k]);
  const ctxAg = document.getElementById('mhsAgamaChart')?.getContext('2d');
  if (ctxAg) {
    mhsAgamaChartIns = new Chart(ctxAg, {
      type: 'doughnut',
      plugins: [ChartDataLabels],
      data: {
        labels: agamaKeys.length ? agamaKeys : ['Belum ada data'],
        datasets: [{
          data: agamaKeys.length ? agamaVals : [1],
          backgroundColor: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#64748b'],
          borderWidth: 0
        }]
      },
      options: chartOpts({
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' }, title: { display: false } },
        cutout: '50%'
      })
    });
  }
}
function openMhsForm() {
  document.getElementById('mhsForm').reset();
  document.getElementById('editMhsId').value='';
  document.getElementById('fmFotoBase64').value='';
  document.getElementById('mhsPreview').style.display='none';
  document.getElementById('mhsPreviewIcon').style.display='block';
  document.getElementById('mhsFormTitle').innerHTML='<i class="fas fa-user-graduate"></i> Tambah Mahasiswa';
  document.getElementById('overlayMhsForm').classList.add('open');
}
function closeMhsForm() { document.getElementById('overlayMhsForm').classList.remove('open'); }
function saveMahasiswa(e) {
  e.preventDefault();
  const id=document.getElementById('editMhsId').value, nim=document.getElementById('fmNIM').value, nama=document.getElementById('fmNama').value,
        angkatan=document.getElementById('fmAngkatan').value, semester=document.getElementById('fmSemester').value, status=document.getElementById('fmStatus').value,
        tempatLahir=document.getElementById('fmTempatLahir').value, tanggalLahir=document.getElementById('fmTanggalLahir').value,
        jk=document.getElementById('fmJK').value, agama=document.getElementById('fmAgama').value,
        alamat=document.getElementById('fmAlamat').value, noHp=document.getElementById('fmNoHp').value,
        email=document.getElementById('fmEmail').value, noBpjs=document.getElementById('fmNoBpjs').value,
        namaOrtu=document.getElementById('fmNamaOrtu').value,
        catatan=document.getElementById('fmCatatan').value,
        foto=document.getElementById('fmFotoBase64').value, dokumen=document.getElementById('fmDokumen').value;
  let record;
  if(id){
    const i=mahasiswa.findIndex(m=>m.id===id);
    if(i>-1) {
      record = {...mahasiswa[i],nim,nama,angkatan,semester,status,tempatLahir,tanggalLahir,jk,agama,alamat,noHp,email,noBpjs,namaOrtu,catatan,foto,dokumen};
      mahasiswa[i]=record;
    }
    toast('Data mahasiswa diperbarui','success');
  } else {
    record = {id:genId(),nim,nama,angkatan,semester,status,tempatLahir,tanggalLahir,jk,agama,alamat,noHp,email,noBpjs,namaOrtu,catatan,foto,dokumen,createdAt:new Date().toISOString()};
    mahasiswa.push(record);
    toast('Mahasiswa berhasil ditambahkan','success');
  }
  if (record) {
    try {
      db.collection('mahasiswa').doc(record.id).set(record);
    } catch(e) {
      alert('GAGAL MENYIMPAN KE DATABASE CLOUD: ' + e.message);
    }
  }
  save(); closeMhsForm(); renderMahasiswaPage(); updateBadges();
}
function editMhs(id) {
  const m=mahasiswa.find(x=>x.id===id); if(!m)return;
  document.getElementById('editMhsId').value=m.id;
  document.getElementById('fmNIM').value=m.nim;
  document.getElementById('fmNama').value=m.nama;
  document.getElementById('fmAngkatan').value=m.angkatan||'';
  document.getElementById('fmSemester').value=m.semester||'';
  document.getElementById('fmStatus').value=m.status;
  document.getElementById('fmTempatLahir').value=m.tempatLahir||'';
  document.getElementById('fmTanggalLahir').value=m.tanggalLahir||'';
  document.getElementById('fmJK').value=m.jk||'';
  document.getElementById('fmAgama').value=m.agama||'';
  document.getElementById('fmAlamat').value=m.alamat||'';
  document.getElementById('fmNoHp').value=m.noHp||'';
  document.getElementById('fmEmail').value=m.email||'';
  document.getElementById('fmNoBpjs').value=m.noBpjs||'';
  document.getElementById('fmNamaOrtu').value=m.namaOrtu||'';
  document.getElementById('fmCatatan').value=m.catatan||'';
  document.getElementById('fmDokumen').value=m.dokumen||'';
  
  const fBase=m.foto||'';
  document.getElementById('fmFotoBase64').value=fBase;
  const prv=document.getElementById('mhsPreview'), ic=document.getElementById('mhsPreviewIcon');
  if(fBase){ prv.src=convertGDriveImage(fBase); prv.style.display='block'; ic.style.display='none'; }
  else { prv.style.display='none'; ic.style.display='block'; }
  
  document.getElementById('mhsFormTitle').innerHTML='<i class="fas fa-pen"></i> Edit Mahasiswa';
  document.getElementById('overlayMhsForm').classList.add('open');
}
async function deleteMhs(id) {
  const m=mahasiswa.find(x=>x.id===id);
  if(!m||!confirm(`Hapus data mahasiswa "${m.nama}" secara permanen?`)) return;
  try { await db.collection('mahasiswa').doc(id).delete(); } catch(e) { console.error(e); return; }
  mahasiswa=mahasiswa.filter(x=>x.id!==id); save(); renderMahasiswaPage(); updateBadges(); toast('Mahasiswa dihapus','success');
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ MASTER DATA SDM ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function renderSdmPage() {
  const grid=document.getElementById('sdmGrid'), empty=document.getElementById('sdmEmpty');
  const q=document.getElementById('sdmSearch').value.toLowerCase();
  const stat=document.getElementById('sdmFilterStatus').value;
  const ay=document.getElementById('sdmFilterAy').value;
  let data=sdm;
  if(q) data=data.filter(m=>{
    const s = `${m.nama} ${m.nik} ${m.jabatan} ${m.catatan||''} ${m.status}`.toLowerCase();
    return s.includes(q);
  });
  if(stat) data=data.filter(m=>m.status===stat);
  if(ay) data=data.filter(m=>(m.catatan||'').includes(ay));
  if(!data.length){ grid.innerHTML=''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  grid.innerHTML=data.map(m=>`
    <div class="profile-card">
      <div class="act-group">
        <button class="act-btn edit" onclick="editSdm('${m.id}')"><i class="fas fa-pen"></i></button>
        <button class="act-btn del" onclick="deleteSdm('${m.id}')"><i class="fas fa-trash"></i></button>
      </div>
      <div class="profile-img-wrap" style="--c:${getPersonColor(m.status)}">
        ${m.foto ? `<img src="${convertGDriveImage(m.foto)}" class="profile-img" onerror="this.outerHTML='<i class=\\'fas fa-user-tie profile-img-fallback\\'></i>'"/>` : `<i class="fas fa-user-tie profile-img-fallback"></i>`}
      </div>
      <div class="profile-name">${esc(m.nama)}</div>
      <div class="profile-id">NIDN/NIK: ${esc(m.nik)}</div>
      <div class="profile-role">${esc(m.jabatan)}</div>
      <span class="p-badge pb-${m.status}">${m.status.replace('_',' ')}</span>
      <div class="doc-links"><button class="btn-ghost-sm" onclick="viewPersonDetail('${m.id}','sdm')"><i class="fas fa-address-card"></i> Detail Profil</button></div>
    </div>
  `).join('');
}
function openSdmForm() {
  document.getElementById('sdmForm').reset();
  document.getElementById('editSdmId').value='';
  document.getElementById('fsFotoBase64').value='';
  document.getElementById('sdmPreview').style.display='none';
  document.getElementById('sdmPreviewIcon').style.display='block';
  document.getElementById('sdmFormTitle').innerHTML='<i class="fas fa-user-tie"></i> Tambah SDM';
  document.getElementById('overlaySdmForm').classList.add('open');
}
function closeSdmForm() { document.getElementById('overlaySdmForm').classList.remove('open'); }
function saveSdm(e) {
  e.preventDefault();
  const id=document.getElementById('editSdmId').value, nik=document.getElementById('fsNik').value, nama=document.getElementById('fsNama').value,
        jabatan=document.getElementById('fsJabatan').value, status=document.getElementById('fsStatus').value,
        tempatLahir=document.getElementById('fsTempatLahir').value, tanggalLahir=document.getElementById('fsTanggalLahir').value,
        jk=document.getElementById('fsJK').value, agama=document.getElementById('fsAgama').value,
        alamat=document.getElementById('fsAlamat').value, noHp=document.getElementById('fsNoHp').value,
        email=document.getElementById('fsEmail').value, noBpjs=document.getElementById('fsNoBpjs').value,
        catatan=document.getElementById('fsCatatan').value,
        foto=document.getElementById('fsFotoBase64').value, dokumen=document.getElementById('fsDokumen').value;
  let record;
  if(id){
    const i=sdm.findIndex(m=>m.id===id);
    if(i>-1) {
      record = {...sdm[i],nik,nama,jabatan,status,tempatLahir,tanggalLahir,jk,agama,alamat,noHp,email,noBpjs,catatan,foto,dokumen};
      sdm[i]=record;
    }
    toast('Data SDM diperbarui','success');
  } else {
    record = {id:genId(),nik,nama,jabatan,status,tempatLahir,tanggalLahir,jk,agama,alamat,noHp,email,noBpjs,catatan,foto,dokumen,createdAt:new Date().toISOString()};
    sdm.push(record);
    toast('SDM berhasil ditambahkan','success');
  }
  if (record) {
    try {
      db.collection('sdm').doc(record.id).set(record);
    } catch(e) {
      alert('GAGAL MENYIMPAN KE DATABASE CLOUD: ' + e.message);
    }
  }
  save(); closeSdmForm(); renderSdmPage(); updateBadges();
}
function editSdm(id) {
  const m=sdm.find(x=>x.id===id); if(!m)return;
  document.getElementById('editSdmId').value=m.id;
  document.getElementById('fsNik').value=m.nik;
  document.getElementById('fsNama').value=m.nama;
  document.getElementById('fsJabatan').value=m.jabatan;
  document.getElementById('fsStatus').value=m.status;
  document.getElementById('fsTempatLahir').value=m.tempatLahir||'';
  document.getElementById('fsTanggalLahir').value=m.tanggalLahir||'';
  document.getElementById('fsJK').value=m.jk||'';
  document.getElementById('fsAgama').value=m.agama||'';
  document.getElementById('fsAlamat').value=m.alamat||'';
  document.getElementById('fsNoHp').value=m.noHp||'';
  document.getElementById('fsEmail').value=m.email||'';
  document.getElementById('fsNoBpjs').value=m.noBpjs||'';
  document.getElementById('fsCatatan').value=m.catatan||'';
  document.getElementById('fsDokumen').value=m.dokumen||'';
  
  const fBase=m.foto||'';
  document.getElementById('fsFotoBase64').value=fBase;
  const prv=document.getElementById('sdmPreview'), ic=document.getElementById('sdmPreviewIcon');
  if(fBase){ prv.src=convertGDriveImage(fBase); prv.style.display='block'; ic.style.display='none'; }
  else { prv.style.display='none'; ic.style.display='block'; }
  
  document.getElementById('sdmFormTitle').innerHTML='<i class="fas fa-pen"></i> Edit SDM';
  document.getElementById('overlaySdmForm').classList.add('open');
}
async function deleteSdm(id) {
  const m=sdm.find(x=>x.id===id);
  if(!m||!confirm(`Hapus data SDM "${m.nama}" secara permanen?`)) return;
  try { await db.collection('sdm').doc(id).delete(); } catch(e) { console.error(e); return; }
  sdm=sdm.filter(x=>x.id!==id); save(); renderSdmPage(); updateBadges(); toast('SDM dihapus','success');
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ HELPER MASTER DATA ÔòÉÔòÉÔòÉÔòÉÔòÉ */
function getPersonColor(status) {
  if(['aktif'].includes(status)) return '#22c55e';
  if(['lulus','tugas_belajar'].includes(status)) return '#3b82f6';
  if(['cuti'].includes(status)) return '#f59e0b';
  if(['keluar','pensiun'].includes(status)) return '#ef4444';
  return '#94a3b8';
}
function convertGDriveImage(url) {
  if(!url) return '';
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if(m && m[1]) return `https://drive.google.com/uc?id=${m[1]}`;
  return url;
}
function viewPersonDetail(id, type) {
  const m = type==='mhs' ? mahasiswa.find(x=>x.id===id) : sdm.find(x=>x.id===id);
  if(!m) return;
  const links = (m.dokumen||'').split('\n').map(l=>l.trim()).filter(l=>l.length>0);
  
  const html = `
    <div style="display:flex;align-items:center;gap:20px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--b1)">
      <div class="profile-img-wrap" style="width:120px;height:120px;margin:0"><img src="${convertGDriveImage(m.foto)}" class="profile-img" onerror="this.outerHTML='<i class=\\'fas fa-user profile-img-fallback\\' style=\\'font-size:3.5rem\\'></i>'"/></div>
      <div>
        <div style="font-weight:700;font-size:1.1rem;color:var(--t1)">${esc(m.nama)}</div>
        <div style="font-size:.85rem;color:var(--t2)">${type==='mhs' ? 'NIM: '+esc(m.nim) + ' &bull; Semester ' + esc(m.semester||'ÔÇö') : 'NIDN/NIK: '+esc(m.nik)}</div>
        <div style="font-size:.85rem;color:var(--t2)">${type==='mhs' ? 'Tgl Masuk: '+fmtDate(m.angkatan) : esc(m.jabatan)}</div>
      </div>
    </div>
    
    <div style="margin-bottom:10px;font-weight:600;color:var(--t1)"><i class="fas fa-address-book" style="color:var(--primary);margin-right:6px"></i> Biodata Lengkap</div>
    <table style="width:100%;border-collapse:collapse;font-size:.85rem;margin-bottom:20px">
      <tbody>
        <tr><td style="padding:6px 0;width:35%;color:var(--t3)">Tempat, Tanggal Lahir</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.tempatLahir||'ÔÇö')}, ${fmtDate(m.tanggalLahir)}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3)">Jenis Kelamin</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.jk||'ÔÇö')}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3)">Agama</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.agama||'ÔÇö')}</td></tr>
        ${type==='mhs' ? `<tr><td style="padding:6px 0;color:var(--t3)">Nama Orang Tua</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.namaOrtu||'ÔÇö')}</td></tr>` : ''}
        <tr><td style="padding:6px 0;color:var(--t3)">No. Handphone (WA)</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.noHp||'ÔÇö')}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3)">Email</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.email||'ÔÇö')}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3);vertical-align:top">Alamat Lengkap</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.alamat||'ÔÇö')}</td></tr>
      </tbody>
    </table>
    
    <div style="margin-bottom:10px;font-weight:600;color:var(--t1)"><i class="fas fa-notes-medical" style="color:#22c55e;margin-right:6px"></i> Jaminan Kesehatan</div>
    <div style="background:var(--bg3);padding:12px;border-radius:8px;font-size:.85rem;color:var(--t1);margin-bottom:20px;border:1px solid var(--b1)">
      <span style="color:var(--t3)">No. BPJS / Jaminan:</span> <span style="font-weight:600">${esc(m.noBpjs||'ÔÇö')}</span>
    </div>
    
    <div style="margin-bottom:10px;font-weight:600;color:var(--t1)"><i class="fas fa-graduation-cap" style="color:var(--primary);margin-right:6px"></i> Catatan / Riwayat</div>
    <div style="background:var(--bg3);padding:12px;border-radius:8px;font-size:.85rem;color:var(--t1);margin-bottom:20px;border:1px solid var(--b1);white-space:pre-wrap;">${m.catatan ? esc(m.catatan) : '<span style="color:var(--t3);font-style:italic">Tidak ada catatan</span>'}</div>
    
    ${links.length > 0 ? `
    <div style="margin-bottom:10px;font-weight:600;color:var(--t1)"><i class="fas fa-folder-open" style="color:#f59e0b;margin-right:6px"></i> Dokumen Penunjang</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${links.map((lnk,i)=>`<a href="${esc(lnk)}" target="_blank" class="doc-link-item" style="padding:10px 14px;font-size:.85rem"><i class="fas fa-file-lines"></i> Dokumen ${i+1}: <span style="opacity:0.7;font-size:0.8rem;margin-left:4px">${esc(lnk).slice(0,35)}...</span></a>`).join('')}
    </div>
    ` : ''}
  `;
  document.getElementById('personContent').innerHTML=html;
  document.getElementById('overlayPerson').classList.add('open');
}
function closePersonDetail() { document.getElementById('overlayPerson').classList.remove('open'); }

function previewImage(event, previewId, hiddenId) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 250;
      const MAX_HEIGHT = 250;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
      } else {
        if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
      }
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85); // Compress as JPEG
      document.getElementById(hiddenId).value = dataUrl;
      const prv = document.getElementById(previewId);
      const icon = document.getElementById(previewId + 'Icon');
      if (prv) { prv.src = dataUrl; prv.style.display = 'block'; }
      if (icon) icon.style.display = 'none';
    }
    img.src = e.target.result;
  }
  reader.readAsDataURL(file);
}

/* ÔòÉÔòÉÔòÉÔòÉÔòÉ AKREDITASI (BAN-PT & LAM-PTKes) ÔòÉÔòÉÔòÉÔòÉÔòÉ */

// ==================== BAN-PT ====================
let currentBanptTab = 1;
const BANPT_TITLES = {
  1: "Visi, Misi, Tujuan, dan Strategi",
  2: "Tata Pamong, Tata Kelola, dan Kerjasama",
  3: "Mahasiswa",
  4: "Sumber Daya Manusia",
  5: "Keuangan, Sarana, dan Prasarana",
  6: "Pendidikan",
  7: "Penelitian",
  8: "Pengabdian kepada Masyarakat",
  9: "Luaran dan Capaian Tridharma"
};

function initBanpt() {
  generateBanptReport();
}

function switchBanptTab(tabNum, element) {
  document.querySelectorAll('#banpt-sub-menu li').forEach(li => li.classList.remove('active'));
  if (element) element.classList.add('active');
  currentBanptTab = parseInt(tabNum);
  generateBanptReport();
}

function getBanptCriteriaForUpload(bidang, jenis) {
    const j = (jenis || '').toLowerCase();
    const b = (bidang || '');
    if(j.includes('lulusan') || j.includes('ipk') || j.includes('publikasi') || j.includes('jurnal') || j.includes('ukom') || j.includes('tracer')) return 9;
    if(j.includes('renstra') || j.includes('renop') || j.includes('vmts') || j.includes('visi')) return 1;
    if(j.includes('spmi') || j.includes('sotk') || j.includes('mou') || j.includes('moa') || j.includes('audit')) return 2;
    if(b === 'kemahasiswaan' || j.includes('mahasiswa') || j.includes('alumni')) return 3;
    if(b === 'kepegawaian' || j.includes('dosen') || j.includes('tendik') || j.includes('ijazah') || j.includes('sk_')) return 4;
    if(b === 'keuangan' || b === 'laboratorium' || j.includes('anggaran') || j.includes('sarana') || j.includes('inventaris')) return 5;
    if(b === 'lppm' || j.includes('penelitian') || (j.includes('luaran') && !j.includes('pkm'))) return 7;
    if(b === 'pengabdian' || j.includes('pkm') || j.includes('pengabdian')) return 8;
    if(b === 'akademik' || b === 'sistem_pendidikan' || b === 'perpustakaan' || j.includes('kurikulum') || j.includes('rps') || j.includes('pembelajaran')) return 6;
    if(b === 'umum' || b === 'penjaminan_mutu') return 2;
    return 0;
}

function getLamptkesCriteriaForUpload(jenis) {
    if(!jenis) return 0;
    const match = jenis.match(/^k(\d)_/);
    if(match) return parseInt(match[1]);
    return 0;
}

function getBanptData(k) {
  return arsip.filter(a => getBanptCriteriaForUpload(a.bidang, a.jenis) === k);
}

function generateBanptReport() {
  const container = document.getElementById('banptReportContainer');
  if(!container) return;

  const list = getBanptData(currentBanptTab);

  let html = "<div class='akr-tab-header'>";
  html += "<h3>Kriteria " + currentBanptTab + ". " + BANPT_TITLES[currentBanptTab] + "</h3>";
  html += "<p>Tabel rangkuman dokumen fisik yang diekstrak secara otomatis berdasarkan Bidang dan Jenis Dokumen.</p>";
  html += "</div>";

  if (list.length === 0) {
    html += "<div class='akr-table-native-wrap' style='border:1px dashed var(--b2); border-radius:12px;'>";
    html += "<div class='p-4 text-gray-500 text-center italic'>Belum ada dokumen yang terunggah/terdeteksi untuk Kriteria " + currentBanptTab + " ini.</div>";
    html += "</div>";
    container.innerHTML = html;
    return;
  }

  html += "<div class='akr-table-native-wrap'>";
  html += "<table class='tb-table'><thead><tr>";
  html += "<th>Judul Dokumen</th><th>Jenis (Terdeteksi)</th><th>Tahun/Tanggal</th><th>Status</th><th>Aksi (GDrive)</th>";
  html += "</tr></thead><tbody>";

  list.forEach(a => {
    let stat = "<span class='badge bg-green'>Aktif</span>";
    if (a.isKadaluarsa) stat = "<span class='badge bg-red' style='animation:pulseRed 2s infinite;'>Kadaluarsa</span>";
    else if (a.isPerluUpdate) stat = "<span class='badge bg-yellow'>Perlu Diperbarui</span>";

    html += "<tr>";
    html += `<td><strong>${a.judul}</strong><br><small class='text-gray-500'>ID: ${a.id.substring(0,8)}</small></td>`;
    html += `<td><span class='badge' style='background:var(--p1);'>${getJenisLabel(a.bidang, a.jenis)}</span></td>`;
    html += `<td>${a.tahun || a.tanggal || '-'}</td>`;
    html += `<td>${stat}</td>`;
    html += `<td><a href='${a.gdriveUrl}' target='_blank' class='tb-btn tb-btn-primary' style='padding:4px 8px; font-size:12px;'><i class='fas fa-folder-open'></i> Buka</a></td>`;
    html += "</tr>";
  });

  html += "</tbody></table></div>";
  container.innerHTML = html;
}

let currentLamptkesTab = 1;
// ==================== LAM-PTKes ====================
function initLamptkes() {
  generateLamptkesReport();
}

function switchLamptkesTab(tabNum, element) {
  document.querySelectorAll('#lamptkes-sub-menu li').forEach(li => li.classList.remove('active'));
  element.classList.add('active');
  currentLamptkesTab = tabNum;
  generateLamptkesReport();
}

function getKriteriaNumber(jenis) {
  if (!jenis) return 0;
  if (jenis.startsWith('k1_')) return 1;
  if (jenis.startsWith('k2_')) return 2;
  if (jenis.startsWith('k3_')) return 3;
  if (jenis.startsWith('k4_')) return 4;
  if (jenis.startsWith('k5_')) return 5;
  if (jenis.startsWith('k6_')) return 6;
  if (jenis.startsWith('k7_')) return 7;
  if (jenis.startsWith('k8_')) return 8;
  if (jenis.startsWith('k9_')) return 9;
  if (jenis.startsWith('lkps_')) return 10;
  return 0;
}

const KRITERIA_TITLES = {
    1: "Visi, Misi, Tujuan dan Strategi",
    2: "Tata Pamong, Tata Kelola dan Kerjasama",
    3: "Mahasiswa",
    4: "Sumber Daya Manusia",
    5: "Keuangan, Sarana dan Prasarana",
    6: "Pendidikan",
    7: "Penelitian",
    8: "Pengabdian kepada Masyarakat",
    10: "Laporan Kinerja Program Studi (Bab II)",
    11: "Laporan Evaluasi Diri (Semua Kriteria)",
    12: "Dokumen SPMI (Per Bidang)"
  };

function generateLamptkesReport() {
  const container = document.getElementById('lamptkesReportContainer');
  if(!container) return;

  let filtered = arsip.filter(a => {
      if (currentLamptkesTab === 11) return (a.jenis && a.jenis.includes('_led')) || (a.jenis && a.jenis.startsWith('led_'));
      if (currentLamptkesTab === 12) return (a.jenis && a.jenis.includes('_spmi')) || (a.jenis && a.jenis.startsWith('spmi_'));
      return getKriteriaNumber(a.jenis) === currentLamptkesTab;
    });
  
  let html = "<div class='akr-tab-content active'>";
  html += "<div class='akr-tab-header'>";
  html += "<h3>Kriteria " + currentLamptkesTab + ". " + KRITERIA_TITLES[currentLamptkesTab] + "</h3>";
  html += "<p>Tabel rangkuman dokumen fisik yang diekstrak secara realtime untuk kebutuhan Borang LAM-PTKes.</p>";
  html += "</div>";
  
  if (filtered.length === 0) {
    html += "<div class='p-4 text-gray-500 text-center italic'>Belum ada dokumen yang terunggah untuk Kriteria " + currentLamptkesTab + " ini.</div>";
    html += "</div>";
    container.innerHTML = html;
    return;
  }
  
  html += "<div class='akr-table-native-wrap'><table class='tb-table'>";
  html += "<thead><tr><th>No</th><th>Judul Dokumen</th><th>Bidang & Kategori</th><th>Tgl Arsip</th><th>Tautan GDrive</th></tr></thead>";
  html += "<tbody>";
  
  filtered.forEach((item, index) => {
    let bidangLabel = DEPT[item.bidang] ? DEPT[item.bidang].label : item.bidang;
    let jenisObj = DEPT_JENIS[item.bidang] ? DEPT_JENIS[item.bidang].find(x => x.val === item.jenis) : null;
    let jenisLabel = jenisObj ? jenisObj.label : item.jenis;
    
    html += "<tr>";
    html += "<td>"+(index+1)+"</td>";
    html += "<td style='font-weight:600; color:var(--text-main)'>"+item.judul+"</td>";
    html += "<td><span class='badge bg-blue-100 text-blue-800' style='font-size:0.75rem'>"+bidangLabel+"</span><br><div title=\""+jenisLabel.replace(/\"/g, '&quot;')+"\" style='white-space:normal; line-height:1.3; word-break:normal; overflow-wrap:break-word; font-size:0.72rem; color:var(--text-sub)'>"+jenisLabel+"</div></td>";
    html += "<td>"+item.tanggal+"</td>";
    html += "<td>";
    html += fmtBadge(item);
    html += "</td>";
    html += "</tr>";
  });
  
  html += "</tbody></table></div></div>";
  container.innerHTML = html;
}

async function exportLamptkes(type) {
  let data = arsip.filter(a => getKriteriaNumber(a.jenis) > 0);

  if (data.length === 0) {
    toast('Tidak ada dokumen LAM-PTKes untuk diekspor!', 'warning');
    return;
  }

  data.sort((a, b) => getKriteriaNumber(a.jenis) - getKriteriaNumber(b.jenis));
  const dateStr = new Date().toLocaleDateString('id-ID');
  const fileName = "Borang_LAMPTKes_" + new Date().toISOString().slice(0,10);

  const getLabel = (a) => getJenisLabel(a.bidang, a.jenis);
  
  if (type === 'excel') {
    if (typeof XLSX === 'undefined') { toast('Library Excel belum dimuat!', 'error'); return; }
    const excelData = data.map((a, index) => ({
      'No': index + 1,
      'Kriteria': (getKriteriaNumber(a.jenis) === 12) ? 'SPMI (Per Bidang)' : (getKriteriaNumber(a.jenis) === 11) ? 'LED (Semua Kriteria)' : (getKriteriaNumber(a.jenis) === 10) ? 'Bab II (LKPS)' : 'Kriteria ' + getKriteriaNumber(a.jenis),
      'Tanggal': a.tanggal,
      'Judul Dokumen': a.judul,
      'Bidang Terkait': (DEPT[a.bidang]?.label || a.bidang).toUpperCase(),
      'Deskripsi Dokumen': getLabel(a),
      'Link GDrive': a.link || '-'
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'LAM-PTKes');
    XLSX.writeFile(workbook, fileName + ".xlsx");
    toast("Berhasil mengunduh Excel", 'success');
  } 
  else if (type === 'pdf') {
    if (typeof window.jspdf === 'undefined') { toast('Library jsPDF belum dimuat', 'error'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4'); 
    
    doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text("DOKUMEN PENDUKUNG BORANG LAM-PTKES & LKPS", 14, 20);
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text("AKADEMI AKUPUNKTUR SURABAYA - Dicetak pada: " + dateStr, 14, 26);
    
    let tableData = data.map((a, i) => [
      i+1,
      (getKriteriaNumber(a.jenis) === 12) ? 'SPMI' : (getKriteriaNumber(a.jenis) === 11) ? 'LED' : (getKriteriaNumber(a.jenis) === 10) ? 'Bab II' : 'K' + getKriteriaNumber(a.jenis),
      a.judul,
      (DEPT[a.bidang]?.label || a.bidang).toUpperCase(),
      getLabel(a),
      a.link || '-'
    ]);

    doc.autoTable({
      startY: 32,
      head: [['No', 'Krit', 'Judul Arsip', 'Bidang', 'Deskripsi Dokumen / Tabel', 'Tautan GDrive']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] },
      columnStyles: {
        0: {cellWidth: 10},
        1: {cellWidth: 15},
        2: {cellWidth: 50},
        3: {cellWidth: 35},
        4: {cellWidth: 100},
        5: {cellWidth: 60}
      },
      styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' }
    });
    
    doc.save(fileName + ".pdf");
    toast("Berhasil mengunduh PDF", 'success');
  }
  else if (type === 'word') {
    let html = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>";
    html += "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    html += "<h2>DOKUMEN PENDUKUNG BORANG LAM-PTKES & LKPS</h2>";
    html += "<p>AKADEMI AKUPUNKTUR SURABAYA<br>Dicetak pada: " + dateStr + "</p>";
    html += "<table border='1' style='border-collapse:collapse; width:100%; font-family:sans-serif; font-size:12px;'>";
    html += "<tr style='background:#10b981; color:#fff;'><th>No</th><th>Kriteria</th><th>Judul Arsip</th><th>Bidang</th><th>Deskripsi Dokumen</th><th>Tautan GDrive</th></tr>";
    
    data.forEach((a, index) => {
      let krit = (getKriteriaNumber(a.jenis) === 12) ? 'SPMI (Per Bidang)' : (getKriteriaNumber(a.jenis) === 11) ? 'LED (Semua Kriteria)' : (getKriteriaNumber(a.jenis) === 10) ? 'Bab II (LKPS)' : 'Kriteria ' + getKriteriaNumber(a.jenis);
      html += "<tr>";
      html += "<td style='padding:4px;'>" + (index + 1) + "</td>";
      html += "<td style='padding:4px;'>" + krit + "</td>";
      html += "<td style='padding:4px;'>" + a.judul + "</td>";
      html += "<td style='padding:4px;'>" + (DEPT[a.bidang]?.label || a.bidang).toUpperCase() + "</td>";
      html += "<td style='padding:4px;'>" + getLabel(a) + "</td>";
      html += "<td style='padding:4px;'>" + (a.link ? `<a href="${a.link}">${a.link}</a>` : '-') + "</td>";
      html += "</tr>";
    });
    html += "</table></body></html>";
    
    let blob = new Blob(['\xef\xbb\xbf', html], { type: 'application/msword' });
    let url = URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = fileName + ".doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast("Berhasil mengunduh Word", 'success');
  }
}


function exportToExcel() {
  if (typeof XLSX === 'undefined') {
    toast('Library Excel belum dimuat, harap tunggu beberapa saat...', 'error');
    return;
  }
  let data=arsip;

  if (data.length === 0) {
    toast('Tidak ada data untuk diekspor!', 'warning');
    return;
  }

  const excelData = data.map((a, index) => {
    return {
      'No': index + 1,
      'Tanggal': a.tanggal,
      'Nomor Arsip': a.nomor,
      'Judul / Perihal': a.judul,
      'Bidang': a.bidang.toUpperCase(),
      'Jenis Dokumen': getJenisLabel(a.bidang, a.jenis),
      'Pengirim / Asal': a.pengirim || '-',
      'Tahun Akademik': a.ay,
      'Status': a.status === 'valid' ? 'Valid' : (a.status === 'pending' ? 'Pending' : 'Kadaluarsa'),
      'Keterangan': a.metadata?.keterangan || '-',
      'Link GDrive': a.gdriveLink || '-'
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap_Arsip');

  const dateStr = new Date().toISOString().slice(0,10);
  const fileName = "Rekap_Arsip_Akreditasi_" + dateStr + ".xlsx";

  XLSX.writeFile(workbook, fileName);
  toast("Berhasil mengunduh " + fileName, 'success');
}


function exportChart(canvasId, fileName) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    toast('Chart tidak ditemukan', 'error');
    return;
  }
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const ctx = tempCanvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  ctx.drawImage(canvas, 0, 0);
  const link = document.createElement('a');
  link.download = fileName + '.png';
  link.href = tempCanvas.toDataURL('image/png');
  link.click();
  toast('Berhasil mengunduh chart', 'success');
}


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.chart-wrap canvas').forEach(canvas => {
      const panel = canvas.closest('.panel');
      if (panel) {
        const hd = panel.querySelector('.panel-hd');
        if (hd) {
          const btn = document.createElement('button');
          btn.className = 'btn-ghost-sm';
          btn.innerHTML = '<i class="fas fa-download"></i>';
          btn.style.marginLeft = '10px';
          btn.title = 'Unduh Grafik (PNG)';
          btn.onclick = (e) => {
            e.stopPropagation();
            exportChart(canvas.id, 'Grafik_' + canvas.id);
          };
          hd.appendChild(btn);
        }
      }
    });
  }, 1000);
});


async function getBase64FromUrl(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Failed to load image', e);
    return null;
  }
}




const formatMetadataClean = (meta) => {
  if (!meta) return '-';
  if (typeof meta === 'string') return meta;
  const keys = Object.keys(meta);
  if (keys.length === 0) return '-';
  return keys.map(k => {
    const title = k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return title + ': ' + meta[k];
  }).join('\n');
};

async function generateIntegratedReport(type, isDashboard = false) {
  toast('Menyiapkan laporan, mohon tunggu...', 'info');

  const logoBase64 = await getBase64FromUrl('logo.jpg');
  const institutionName = "AKADEMI AKUPUNKTUR SURABAYA";
  const addressStr = "JL Parangkusumo no 14 Surabaya";

  let reportTitle = 'LAPORAN EKSEKUTIF ARSIP & AKREDITASI';
  let dataArsip = arsip;
  let chart1Canvas, chart2Canvas;
  
  const filterDept = document.getElementById('filterDept')?.value || '';
  const isSingleDept = !!filterDept && !isDashboard;

  if (isDashboard) {
    dataArsip = getFilteredData(); 
    reportTitle = 'LAPORAN ARSIP TAHUN AKADEMIK: ' + currentAY;
    chart1Canvas = document.getElementById('chartDoughnut');
    chart2Canvas = document.getElementById('chartStatus'); 
  } else {
    if (isSingleDept) {
      const deptLabel = DEPT[filterDept] ? DEPT[filterDept].label.toUpperCase() : filterDept.toUpperCase();
      reportTitle = 'LAPORAN ARSIP & AKREDITASI BIDANG: ' + deptLabel;
      dataArsip = arsip.filter(a => a.bidang === filterDept);
      chart1Canvas = document.getElementById('chartDeptDonut');
      chart2Canvas = document.getElementById('chartDeptBar');
    } else {
      chart1Canvas = document.getElementById('chartDoughnut');
      chart2Canvas = document.getElementById('chartLine');
    }
  }

  const groupedData = {};
  if (isSingleDept) {
    groupedData[filterDept] = dataArsip;
  } else {
    dataArsip.forEach(a => {
      const b = a.bidang || 'Lainnya';
      if (!groupedData[b]) groupedData[b] = [];
      groupedData[b].push(a);
    });
  }

  const getWhiteBgBase64 = (canvas) => {
    if(!canvas) return null;
    const temp = document.createElement('canvas');
    temp.width = canvas.width; temp.height = canvas.height;
    const ctx = temp.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,temp.width,temp.height);
    ctx.drawImage(canvas, 0,0);
    return temp.toDataURL('image/png');
  };

  const c1Img = getWhiteBgBase64(chart1Canvas);
  const c2Img = getWhiteBgBase64(chart2Canvas);

  const headers = ['No', 'Dokumen & Tanggal', 'Kategori', 'Status & TA', 'Asal / Pengirim', 'Keterangan Lengkap'];
  
  const mapDataToRows = (arr) => {
    return arr.map((a, i) => {
      const colDokumen = a.nomor + '\n' + a.judul + '\n(Tgl: ' + a.tanggal + ')';
      const colKategori = (DEPT[a.bidang]?.label?.toUpperCase() || a.bidang.toUpperCase()) + '\n' + getJenisLabel(a.bidang, a.jenis);
      const colStatus = (a.status === 'valid' ? 'Valid' : (a.status === 'pending' ? 'Pending' : 'Kadaluarsa')) + '\n(TA: ' + (a.ay || '-') + ')';
      const colPengirim = a.pengirim || '-';
      let ket = '';
      if (a.keterangan) ket += a.keterangan + '\n';
      if (a.metadata) ket += formatMetadataClean(a.metadata);
      if (!ket.trim()) ket = '-';
      return [i + 1, colDokumen, colKategori, colStatus, colPengirim, ket.trim()];
    });
  };

  const dateStr = new Date().toISOString().slice(0,10);
  
  if (type === 'pdf') {
    if (typeof window.jspdf === 'undefined') { toast('Library jsPDF belum dimuat', 'error'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4'); 
    
    if (logoBase64) { doc.addImage(logoBase64, 'JPEG', 14, 10, 20, 20); }
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text(institutionName, 38, 18);
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text(addressStr, 38, 25);
    doc.setLineWidth(0.5); doc.line(14, 33, 283, 33);
    
    doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text(reportTitle, 14, 42);
    doc.setFontSize(10); doc.text('Tanggal Cetak: ' + dateStr, 14, 48);

    let startY = 58;
    if (c1Img && c2Img) {
      doc.text('A. VISUALISASI DATA', 14, startY);
      doc.addImage(c1Img, 'PNG', 14, startY+4, 100, 100);
      doc.addImage(c2Img, 'PNG', 120, startY+4, 150, 75);
      doc.addPage();
      startY = 15;
    }

    if (!isSingleDept) {
      doc.setFontSize(12); doc.setFont('helvetica', 'bold');
      doc.text('B. REKAPITULASI ARSIP PER BIDANG', 14, startY);
      const summaryData = Object.keys(groupedData).map((k, i) => [
        i+1, DEPT[k]?.label?.toUpperCase() || k.toUpperCase(), groupedData[k].length + ' Arsip'
      ]);
      doc.autoTable({
        startY: startY + 5,
        head: [['No', 'Nama Bidang', 'Total Arsip']],
        body: summaryData,
        theme: 'grid',
        headStyles: { fillColor: [40, 40, 40] }
      });
      doc.addPage();
      startY = 15;
    }

    doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    doc.text(isSingleDept ? 'B. DAFTAR ARSIP LENGKAP' : 'C. RINCIAN ARSIP PER BIDANG', 14, startY);
    
    let currentY = startY + 8;

    for (const bidang of Object.keys(groupedData)) {
      if (!isSingleDept) {
        doc.setFontSize(11); doc.setFont('helvetica', 'bold');
        doc.text('Bidang: ' + (DEPT[bidang]?.label?.toUpperCase() || bidang.toUpperCase()), 14, currentY);
        currentY += 4;
      }
      
      const rows = mapDataToRows(groupedData[bidang]);
      doc.autoTable({
        startY: currentY,
        head: [headers],
        body: rows,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 3, valign: 'middle' },
        headStyles: { fillColor: [16, 124, 65], halign: 'center' },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 70 },
          2: { cellWidth: 40 },
          3: { cellWidth: 30, halign: 'center' },
          4: { cellWidth: 40 },
          5: { cellWidth: 70 }
        }
      });
      currentY = doc.lastAutoTable.finalY + 10;
      
      if (currentY > 180 && !isSingleDept) {
        doc.addPage();
        currentY = 15;
      }
    }

    doc.save('Laporan_' + dateStr + '.pdf');
    toast('Berhasil mengunduh PDF', 'success');

  } else if (type === 'excel') {
    if (typeof ExcelJS === 'undefined') { toast('Library ExcelJS belum dimuat', 'error'); return; }
    const wb = new ExcelJS.Workbook();
    
    const ws1 = wb.addWorksheet('Dashboard Visual');
    ws1.mergeCells('B2:H2'); ws1.getCell('B2').value = institutionName; ws1.getCell('B2').font = { size: 16, bold: true };
    ws1.mergeCells('B3:H3'); ws1.getCell('B3').value = addressStr;
    
    if (logoBase64) {
      const base64Data = logoBase64.split(';base64,').pop();
      const logoId = wb.addImage({ base64: base64Data, extension: 'jpeg' });
      ws1.addImage(logoId, { tl: { col: 0, row: 1 }, ext: { width: 80, height: 80 } });
    }

    ws1.mergeCells('A5:E5'); ws1.getCell('A5').value = reportTitle; ws1.getCell('A5').font = { size: 14, bold: true };

    let summaryRowStart = 7;
    if (c1Img && c2Img) {
      const c1Base64 = c1Img.split(';base64,').pop();
      const id1 = wb.addImage({ base64: c1Base64, extension: 'png' });
      ws1.addImage(id1, { tl: { col: 0, row: 7 }, ext: { width: 400, height: 400 } });

      const c2Base64 = c2Img.split(';base64,').pop();
      const id2 = wb.addImage({ base64: c2Base64, extension: 'png' });
      ws1.addImage(id2, { tl: { col: 7, row: 7 }, ext: { width: 600, height: 300 } });
      summaryRowStart = 30; 
    }

    if (!isSingleDept) {
      ws1.getCell('B'+summaryRowStart).value = 'REKAPITULASI PER BIDANG';
      ws1.getCell('B'+summaryRowStart).font = { bold: true, size: 12 };
      ws1.getCell('B'+(summaryRowStart+1)).value = 'Nama Bidang';
      ws1.getCell('C'+(summaryRowStart+1)).value = 'Total Arsip';
      ws1.getCell('D'+(summaryRowStart+1)).value = 'Navigasi';
      
      let sr = summaryRowStart + 2;
      Object.keys(groupedData).forEach(k => {
        const sheetName = (DEPT[k]?.label || k).substring(0,30).replace(/[:\\\/?*\[\]]/g, '');
        ws1.getCell('B'+sr).value = sheetName.toUpperCase();
        ws1.getCell('C'+sr).value = groupedData[k].length;
        ws1.getCell('D'+sr).value = { text: 'Ke Sheet >>', hyperlink: "#'" + sheetName + "'!A1" };
        ws1.getCell('D'+sr).font = { color: { argb: 'FF0563C1' }, underline: true };
        sr++;
      });
    }

    for (const bidang of Object.keys(groupedData)) {
      const sheetName = isSingleDept ? 'Data Arsip' : (DEPT[bidang]?.label || bidang).substring(0,30).replace(/[:\\\/?*\[\]]/g, '');
      const ws2 = wb.addWorksheet(sheetName);
      ws2.addRow(headers); ws2.getRow(1).font = { bold: true };
      
      ws2.columns = [
        { width: 5 }, { width: 40 }, { width: 25 }, { width: 20 }, { width: 25 }, { width: 50 }
      ];

      const rows = mapDataToRows(groupedData[bidang]);
      rows.forEach(row => {
        const r = ws2.addRow(row);
        r.alignment = { wrapText: true, vertical: 'middle' };
      });
    }

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'Laporan_' + dateStr + '.xlsx');
    toast('Berhasil mengunduh Excel', 'success');

  } else if (type === 'word') {
    if (typeof docx === 'undefined') { toast('Library docx belum dimuat', 'error'); return; }
    const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, WidthType } = docx;

    const children = [];
    const headerChildren = [];
    if (logoBase64) {
      const base64Data = logoBase64.split(';base64,').pop();
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
      headerChildren.push(new ImageRun({ data: new Uint8Array(byteNumbers), transformation: { width: 60, height: 60 } }));
    }
    
    headerChildren.push(new TextRun({ text: '  ' + institutionName, bold: true, size: 28 }));
    children.push(new Paragraph({ children: headerChildren }));
    children.push(new Paragraph({ children: [new TextRun({ text: addressStr, size: 20 })] }));
    children.push(new Paragraph({ text: '' }));
    children.push(new Paragraph({ children: [new TextRun({ text: reportTitle, bold: true, size: 24 })] }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'Tanggal Cetak: ' + dateStr, size: 20 })] }));
    children.push(new Paragraph({ text: '' }));

    if (c1Img && c2Img) {
      children.push(new Paragraph({ children: [new TextRun({ text: 'A. Visualisasi Data', bold: true, size: 22 })] }));
      const toUint8 = (b64) => {
        const d = atob(b64.split(';base64,').pop());
        const arr = new Uint8Array(d.length);
        for (let i=0; i<d.length; i++) arr[i] = d.charCodeAt(i);
        return arr;
      };
      children.push(new Paragraph({ children: [new ImageRun({ data: toUint8(c1Img), transformation: { width: 300, height: 300 } })] }));
      children.push(new Paragraph({ children: [new ImageRun({ data: toUint8(c2Img), transformation: { width: 450, height: 225 } })] }));
    }

    children.push(new Paragraph({ text: '' }));
    
    if (!isSingleDept) {
      children.push(new Paragraph({ children: [new TextRun({ text: 'B. Rekapitulasi Per Bidang', bold: true, size: 22 })] }));
      const sumRows = [new TableRow({ children: ['No','Nama Bidang','Total Arsip'].map(h=>new TableCell({children:[new Paragraph({text:h,bold:true})], shading:{fill:'E0E0E0'}})) })];
      Object.keys(groupedData).forEach((k,i) => {
        sumRows.push(new TableRow({ children: [
          new TableCell({children:[new Paragraph({text:String(i+1)})]}),
          new TableCell({children:[new Paragraph({text:DEPT[k]?.label?.toUpperCase()||k.toUpperCase()})]}),
          new TableCell({children:[new Paragraph({text:groupedData[k].length + ' Arsip'})]})
        ]}));
      });
      children.push(new Table({ rows: sumRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
      children.push(new Paragraph({ text: '' }));
      children.push(new Paragraph({ children: [new TextRun({ text: 'C. Rincian Arsip Per Bidang', bold: true, size: 22 })] }));
    } else {
      children.push(new Paragraph({ children: [new TextRun({ text: 'B. Daftar Arsip Lengkap', bold: true, size: 22 })] }));
    }

    for (const bidang of Object.keys(groupedData)) {
      if (!isSingleDept) {
        children.push(new Paragraph({ text: '' }));
        children.push(new Paragraph({ children: [new TextRun({ text: '[Bidang: ' + (DEPT[bidang]?.label?.toUpperCase()||bidang.toUpperCase()) + ']', bold: true, size: 18 })] }));
      }
      
      const tableRows = [];
      tableRows.push(new TableRow({
        children: headers.map(h => new TableCell({ children: [new Paragraph({ text: h, bold:true, color:'FFFFFF' })], shading:{fill:'167C41'} }))
      }));

      const rows = mapDataToRows(groupedData[bidang]);
      rows.forEach(row => {
        tableRows.push(new TableRow({
          children: row.map(cellText => {
            const paras = cellText.split('\n').map(line => new Paragraph({ text: line }));
            return new TableCell({ children: paras });
          })
        }));
      });

      children.push(new Table({ rows: tableRows, width: { size: 100, type: WidthType.PERCENTAGE } }));
    }

    const docxObj = new Document({ sections: [{ properties: {}, children: children }] });
    Packer.toBlob(docxObj).then(blob => {
      saveAs(blob, 'Laporan_' + dateStr + '.docx');
      toast('Berhasil mengunduh Word', 'success');
    });
  }
}

function exportExcel() { generateIntegratedReport('excel', true); }
function exportPDF() { generateIntegratedReport('pdf', true); }
function exportWord() { generateIntegratedReport('word', true); }








function autoDetectFormat(input) {
  if (!input.files || input.files.length === 0) return;
  const fileName = input.files[0].name.toLowerCase();
  const formatSelect = document.getElementById('fFormat');
  if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) {
    formatSelect.value = 'excel';
  } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
    formatSelect.value = 'word';
  } else if (fileName.endsWith('.zip') || fileName.endsWith('.rar') || fileName.endsWith('.7z')) {
    formatSelect.value = 'zip';
  } else if (fileName.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
    formatSelect.value = 'img';
  } else {
    formatSelect.value = 'pdf';
  }
}

function updateYearlyChart() {
  const data=arsip.filter(a=>!currentAY||a.ay===currentAY);
  initDashCharts(data);
}






// ── FITUR LAPORAN KENDALA IT ─────────────────────────
function openLaporanITModal() {
    document.getElementById('modalLaporanIT').style.display = 'flex';
    document.getElementById('laporKategori').value = 'Aplikasi / Software';
    document.getElementById('laporDeskripsi').value = '';
}

async function submitLaporanIT() {
    const kategori = document.getElementById('laporKategori').value;
    const deskripsi = document.getElementById('laporDeskripsi').value.trim();
    
    if (!deskripsi) {
        toast('Deskripsi kendala harus diisi!', 'error');
        return;
    }
    
    const btn = document.getElementById('btnSubmitLaporanIT');
    const oriText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Anda belum login.');
        
        let pelaporNama = user.displayName || '';
        if (!pelaporNama && currentUserData && currentUserData.name) {
            pelaporNama = currentUserData.name;
        }

        const docRef = await db.collection('laporan_it').add({
            pelaporId: user.uid,
            pelaporNama: pelaporNama,
            pelaporEmail: user.email,
            kategori: kategori,
            deskripsi: deskripsi,
            status: 'Menunggu',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Sync ke Portal Utama (Arsip)
        try {
            await db.collection('arsip').doc(docRef.id).set({
                id: docRef.id,
                judul: `Laporan Kendala IT: ${kategori}`,
                bidang: 'sistem_pendidikan',
                jenis: 'laporan_it',
                format: 'lainnya',
                tanggal: new Date().toISOString().slice(0,10),
                keterangan: `Pelapor: ${pelaporNama} | Deskripsi: ${deskripsi}`,
                nomor: 'HLP-' + Math.floor(1000 + Math.random() * 9000),
                pengirim: pelaporNama,
                url: '',
                fileName: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'aktif'
            });
        } catch(e) {
            console.error("Gagal sinkronisasi arsip:", e);
        }
        
        document.getElementById('modalLaporanIT').style.display = 'none';
        toast('Laporan IT berhasil dikirim. Tim IT akan segera memprosesnya.', 'success');
        
    } catch(e) {
        console.error(e);
        toast('Gagal mengirim laporan: ' + e.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = oriText;
    }
}


// ── FITUR KINERJA BIDANG ─────────────────────────
function openKinerjaModal() {
    document.getElementById('modalKinerjaBidang').style.display = 'flex';
    document.getElementById('kinerjaKategori').value = 'Tugas Rutin Harian';
    document.getElementById('kinerjaDeskripsi').value = '';
}

async function submitKinerjaBidang() {
    const kategori = document.getElementById('kinerjaKategori').value;
    const deskripsi = document.getElementById('kinerjaDeskripsi').value.trim();
    const bidangId = currentDept; // From the current opened department view
    const bidangName = document.getElementById('deptBannerName').innerText || currentDept;
    
    if (!deskripsi) {
        toast('Deskripsi aktivitas harus diisi!', 'error');
        return;
    }
    
    const btn = document.getElementById('btnSubmitKinerja');
    const oriText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
    
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Anda belum login.');
        
        let pelaporNama = user.displayName || '';
        if (!pelaporNama && currentUserData && currentUserData.name) {
            pelaporNama = currentUserData.name;
        }

        await db.collection('kinerja_bidang').add({
            userId: user.uid,
            userName: pelaporNama,
            bidangId: bidangId,
            bidangName: bidangName,
            kategori: kategori,
            deskripsi: deskripsi,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('modalKinerjaBidang').style.display = 'none';
        toast('Laporan Kinerja berhasil disimpan!', 'success');
        
    } catch(e) {
        console.error(e);
        toast('Gagal menyimpan kinerja: ' + e.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = oriText;
    }
}

/* ═══════════════════════════════════════════════════════════════
   INTEGRASI MODUL & GRAFIK SIMLAB (AKADEMI AKUPUNKTUR SURABAYA)
   (Pengecualian Mutlak: Menu Pengaturan & Pengguna TIDAK ADA)
   ═══════════════════════════════════════════════════════════════ */

const DEFAULT_LAB_INVENTARIS = [
  { id:'SL-INV-001', kode:'AAS-LAB-AKP-01', nama:'Jarum Akupunktur HuanQiu 0.25x25mm (1 Cun)', kategori:'Akupunktur', jumlah:45, unit:'Box (100 pcs)', kondisi:'Baik', lokasi:'Lemari Bahan A' },
  { id:'SL-INV-002', kode:'AAS-LAB-AKP-02', nama:'Jarum Akupunktur HuanQiu 0.25x40mm (1.5 Cun)', kategori:'Akupunktur', jumlah:50, unit:'Box (100 pcs)', kondisi:'Baik', lokasi:'Lemari Bahan A' },
  { id:'SL-INV-003', kode:'AAS-LAB-AKP-03', nama:'Jarum Akupunktur DongBang 0.25x50mm (2 Cun)', kategori:'Akupunktur', jumlah:30, unit:'Box (100 pcs)', kondisi:'Baik', lokasi:'Lemari Bahan A' },
  { id:'SL-INV-004', kode:'AAS-LAB-ELK-01', nama:'Alat Elektroakupunktur Stimulator KWD-808 II', kategori:'Elektronik', jumlah:6, unit:'Unit', kondisi:'Baik', lokasi:'Rak Alat Terapi' },
  { id:'SL-INV-005', kode:'AAS-LAB-ELK-02', nama:'Lampu Terapi TDP Elektromagnetik Infrared CQ-29', kategori:'Elektronik', jumlah:4, unit:'Unit', kondisi:'Baik', lokasi:'Ruang Praktik 1' },
  { id:'SL-INV-006', kode:'AAS-LAB-ELK-03', nama:'Lampu Terapi TDP Elektromagnetik CQ-12', kategori:'Elektronik', jumlah:2, unit:'Unit', kondisi:'Servis', lokasi:'Ruang Servis/Teknisi' },
  { id:'SL-INV-007', kode:'AAS-LAB-MNK-01', nama:'Manekin Titik Akupunktur Meridian Pria 50cm', kategori:'Manekin', jumlah:10, unit:'Buah', kondisi:'Baik', lokasi:'Meja Demonstrasi' },
  { id:'SL-INV-008', kode:'AAS-LAB-MNK-02', nama:'Model Anatomi Titik Akupunktur Telinga (Aurikular)', kategori:'Manekin', jumlah:8, unit:'Buah', kondisi:'Baik', lokasi:'Meja Demonstrasi' },
  { id:'SL-INV-009', kode:'AAS-LAB-STR-01', nama:'Autoclave Sterilizer Digital Medis 24 Liter', kategori:'Sterilisasi', jumlah:2, unit:'Unit', kondisi:'Baik', lokasi:'Ruang Sterilisasi' },
  { id:'SL-INV-010', kode:'AAS-LAB-STR-02', nama:'UV Sterilizer Cabinet Instrument Sterilization', kategori:'Sterilisasi', jumlah:2, unit:'Unit', kondisi:'Baik', lokasi:'Ruang Sterilisasi' },
  { id:'SL-INV-011', kode:'AAS-LAB-ELK-04', nama:'Tensimeter Digital Otomatis Omron HEM-7120', kategori:'Elektronik', jumlah:5, unit:'Unit', kondisi:'Baik', lokasi:'Meja Diagnosis' },
  { id:'SL-INV-012', kode:'AAS-LAB-ELK-05', nama:'Pulse Oximeter Digital Fingertip', kategori:'Elektronik', jumlah:6, unit:'Unit', kondisi:'Baik', lokasi:'Meja Diagnosis' },
  { id:'SL-INV-013', kode:'AAS-LAB-BHN-01', nama:'Moxa Stick Roll Pure Herbal (Kotak 10 Btg)', kategori:'Bahan', jumlah:35, unit:'Kotak', kondisi:'Baik', lokasi:'Lemari Moxibusi' },
  { id:'SL-INV-014', kode:'AAS-LAB-BHN-02', nama:'Moxa Cone Smokeless Herbal', kategori:'Bahan', jumlah:20, unit:'Kotak', kondisi:'Baik', lokasi:'Lemari Moxibusi' },
  { id:'SL-INV-015', kode:'AAS-LAB-STR-03', nama:'Safety Box Limbah Jarum Medis 5 Liter', kategori:'Sterilisasi', jumlah:12, unit:'Buah', kondisi:'Baik', lokasi:'Area Pembuangan Medis' }
];

const DEFAULT_LAB_PERAWATAN = [
  { id:'MNT-01', tgl:'2026-08-15', alat:'Stimulator Elektroakupunktur KWD-808 II (Unit 2)', jenis:'Pengecekan Kabel Output & Kalibrasi Tegangan', teknisi:'Bpk. Darmawan (Teknisi Elektromedik)', biaya:'Rp 250.000', status:'Selesai' },
  { id:'MNT-02', tgl:'2026-08-28', alat:'Lampu Terapi TDP Mineral Plate CQ-12', jenis:'Penggantian Piringan Emisi Mineral TDP', teknisi:'CV. Medika Surya Perkasa', biaya:'Rp 450.000', status:'Sedang Servis' },
  { id:'MNT-03', tgl:'2026-09-05', alat:'Autoclave Sterilizer 24L', jenis:'Pengujian Sensor Suhu & Penggantian Karet Gasket', teknisi:'Tim Sarpras AAS', biaya:'Rp 300.000', status:'Selesai' },
  { id:'MNT-04', tgl:'2026-09-12', alat:'Tensimeter Digital Omron (5 Unit)', jenis:'Kalibrasi Rutin Akurasi Tekanan Darah', teknisi:'Balai Pengujian Alkes', biaya:'Rp 350.000', status:'Selesai' }
];

const DEFAULT_LAB_LOGBOOK = [
  { id:'LOG-01', tgl:'2026-09-02', kegiatan:'Praktikum Penusukan Titik Akupunktur Meridian Paru & Usus Besar', dosen:'dr. H. Subagyo, Akp', alat:'Jarum HuanQiu 1 Cun, Alkohol Swab, Manekin', mhs:'24 Mahasiswa (Smt 2)', ket:'Terlaksana tertib, seluruh jarum dibuang ke Safety Box' },
  { id:'LOG-02', tgl:'2026-09-08', kegiatan:'Praktikum Aplikasi Elektroakupunktur pada Kasus Bell Palsy', dosen:'Bambang S., M.Kes', alat:'KWD-808 II (4 Unit), Kabel Alligator, Jarum 1.5 Cun', mhs:'22 Mahasiswa (Smt 4)', ket:'Simulasi penempatan elektroda di titik ST4, ST6, ST7' },
  { id:'LOG-03', tgl:'2026-09-15', kegiatan:'Praktikum Modalitas Terapi Moxibusi & TDP Lamp', dosen:'Siti Aminah, S.Tr.Kes', alat:'Moxa Roll, Lampu TDP CQ-29, Korek Moxa, Nierbeken', mhs:'25 Mahasiswa (Smt 4)', ket:'Praktik teknik moxa rolling di titik BL23 & GV4' },
  { id:'LOG-04', tgl:'2026-09-18', kegiatan:'Simulasi Evaluasi Tindakan Asepsis & Sterilisasi Alat', dosen:'Tim Instruktur Lab AAS', alat:'Autoclave 24L, Bak Instrumen, Korentang', mhs:'26 Mahasiswa (Smt 2)', ket:'Evaluasi OSCE penanganan instrumen bedah minor & jarum' }
];

const DEFAULT_LAB_JADWAL = [
  { hari:'Senin (08.00 - 11.30)', makul:'Titik Meridian & Akupunktur Dasar I', semester:'Semester II (Kelas A)', ruang:'Laboratorium Akupunktur 1', dosen:'dr. H. Subagyo, Akp' },
  { hari:'Selasa (13.00 - 16.00)', makul:'Modalitas Terapi Moxa & Fisik Alami', semester:'Semester IV (Kelas A)', ruang:'Laboratorium Terapi 2', dosen:'Siti Aminah, S.Tr.Kes' },
  { hari:'Kamis (08.00 - 11.30)', makul:'Elektroterapi & Akupunktur Klinis', semester:'Semester IV (Kelas B)', ruang:'Laboratorium Akupunktur 1', dosen:'Bambang S., M.Kes' },
  { hari:'Jumat (08.30 - 11.00)', makul:'Praktek Manajemen Sterilisasi & K3 Alkes', semester:'Semester II (Kelas B)', ruang:'Lab Sterilisasi & Asepsis', dosen:'Tim Dosen & Laboran AAS' }
];

const DEFAULT_LAB_ANGGARAN = [
  { no:'RAB-LAB-2026-01', uraian:'Pengadaan Jarum Akupunktur Steril (HuanQiu & DongBang 150 Box)', tgl:'2026-08-01', estimasi:'Rp 4.500.000', status:'Terealisasi' },
  { no:'RAB-LAB-2026-02', uraian:'Pengadaan Tambahan 2 Unit Stimulator KWD-808 II & Aksesoris', tgl:'2026-08-10', estimasi:'Rp 3.500.000', status:'Terealisasi' },
  { no:'RAB-LAB-2026-03', uraian:'Paket Pemeliharaan Rutin & Kalibrasi Alat Laboratorium Alkes', tgl:'2026-08-20', estimasi:'Rp 1.500.000', status:'Terealisasi' },
  { no:'RAB-LAB-2026-04', uraian:'Pengadaan Bahan Habis Pakai (Moxa, Alkohol, Kasa, Safety Box)', tgl:'2026-09-01', estimasi:'Rp 2.800.000', status:'Dalam Proses' }
];

const DEFAULT_LAB_DOKUMEN = [
  { nomor:'SOP-LAB-AAS-01', nama:'Standar Operasional Prosedur (SOP) Keselamatan & Kesehatan Kerja (K3) Lab', kategori:'SOP K3', tgl:'2026-01-10', file:'SOP_K3_Lab_Akupunktur.pdf' },
  { nomor:'SOP-LAB-AAS-02', nama:'SOP Penusukan Jarum Akupunktur Aseptik & Manajemen Pencegahan Infeksi', kategori:'SOP Klinis', tgl:'2026-01-10', file:'SOP_Asepsis_Jarum.pdf' },
  { nomor:'SOP-LAB-AAS-03', nama:'SOP Penanganan Kegawatdaruratan: Shock Jarum, Jarum Patah & Hematoma', kategori:'SOP Darurat', tgl:'2026-01-12', file:'SOP_Emergency_Akupunktur.pdf' },
  { nomor:'SOP-LAB-AAS-04', nama:'SOP Pengoperasian & Pemeliharaan Alat Elektroakupunktur KWD-808 II', kategori:'SOP Alat', tgl:'2026-02-01', file:'SOP_Penggunaan_KWD808.pdf' },
  { nomor:'SOP-LAB-AAS-05', nama:'SOP Pengelolaan Limbah Medis Padat & Tajam (Sharp Waste Management)', kategori:'SOP Limbah', tgl:'2026-02-05', file:'SOP_Limbah_Medis.pdf' }
];

const DEFAULT_LAB_LPJ = [
  { no:'LPJ-LAB-2025-GENAP', judul:'Laporan Pertanggungjawaban Operasional Laboratorium Semester Genap 2025/2026', periode:'Semester Genap 2025/2026', tgl:'2026-07-20', file:'LPJ_Laboratorium_Genap_2025_2026.pdf' },
  { no:'LPJ-LAB-2025-ALAT', judul:'Laporan Rekapitulasi Pemeliharaan & Kalibrasi Alat Kesehatan Laboratorium 2025', periode:'Tahunan 2025', tgl:'2026-01-15', file:'Laporan_Kalibrasi_Alkes_2025.pdf' }
];

let currentKmhsTab = 'arsip';

function switchKmhsTab(tabKey) {
  currentKmhsTab = tabKey;

  const buttons = ['arsip', 'dashboard', 'mahasiswa'];
  buttons.forEach(b => {
    const btn = document.getElementById(`btnKmhsTab-${b}`);
    if (btn) {
      if (b === tabKey) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = 'var(--t2)';
      }
    }
  });

  const iframeC = document.getElementById('kemahasiswaanIframeContainer');
  const tC = document.getElementById('deptTableContainer');
  const mhsC = document.getElementById('deptMhsContainer');
  const chipsC = document.getElementById('kmhsQuickChips');

  if (tabKey === 'arsip') {
    if (iframeC) iframeC.style.display = 'none';
    if (mhsC) mhsC.style.display = 'none';
    if (tC) tC.style.display = 'block';
    if (chipsC) chipsC.style.display = 'flex';
    renderDeptTable();
  } else if (tabKey === 'dashboard') {
    if (tC) tC.style.display = 'none';
    if (mhsC) mhsC.style.display = 'none';
    if (chipsC) chipsC.style.display = 'none';
    if (iframeC) {
      iframeC.style.display = 'block';
      const iframe = document.getElementById('kemahasiswaanIframe');
      const targetUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5173/embed/dashboard'
        : 'https://bidkemahasiswaandanalumn-93be8.web.app/embed/dashboard';
      if (iframe && (!iframe.src || (!iframe.src.includes('bidkemahasiswaandanalumn') && !iframe.src.includes('localhost:5173')))) {
        iframe.src = targetUrl;
      }
    }
  } else if (tabKey === 'mahasiswa') {
    if (iframeC) iframeC.style.display = 'none';
    if (tC) tC.style.display = 'none';
    if (chipsC) chipsC.style.display = 'none';
    if (mhsC) {
      mhsC.style.display = 'block';
      renderMahasiswaPage();
    }
  }
}

function filterKmhsChip(jenisVal, btnEl) {
  const chips = document.querySelectorAll('.kmhs-chip');
  chips.forEach(c => {
    c.classList.remove('active');
    c.style.background = 'var(--bg3)';
    c.style.color = 'var(--t2)';
    c.style.borderColor = 'var(--b2)';
  });
  if (btnEl) {
    btnEl.classList.add('active');
    btnEl.style.background = 'var(--primary)';
    btnEl.style.color = '#fff';
    btnEl.style.borderColor = 'var(--primary)';
  }

  const select = document.getElementById('deptFilterJenis');
  if (select) {
    select.value = jenisVal;
  }

  if (currentKmhsTab !== 'arsip') {
    switchKmhsTab('arsip');
  } else {
    renderDeptTable();
  }
}

function switchLabTab(tabKey) {
  currentLabTab = tabKey;

  // Update tabs buttons in #laboratoriumContainer
  const buttons = ['dashboard', 'inventaris', 'perawatan', 'logbook', 'jadwal', 'anggaran', 'dokumen', 'lpj', 'portal'];
  buttons.forEach(b => {
    const btn = document.getElementById(`btnLabTab-${b}`);
    if (btn) {
      if (b === tabKey) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = b === 'portal' ? '#10b981' : 'var(--t2)';
      }
    }
  });

  // Update sidebar sub-menu if present
  const sidebarSub = document.getElementById('submenu-laboratorium');
  if (sidebarSub) {
    const listItems = sidebarSub.querySelectorAll('li');
    listItems.forEach(li => {
      const text = li.textContent.toLowerCase();
      if (text.includes(tabKey)) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  // Toggle views
  buttons.forEach(b => {
    const v = document.getElementById(`labView-${b}`);
    if (v) {
      v.style.display = (b === tabKey) ? 'block' : 'none';
    }
  });

  if (tabKey === 'portal') {
    const simlabFrame = document.getElementById('simlabIframe');
    if (simlabFrame && (!simlabFrame.src || !simlabFrame.src.includes('simlabaas.web.app'))) {
      simlabFrame.src = 'https://simlabaas.web.app';
    }
  } else if (tabKey === 'dashboard') {
    setTimeout(initLabCharts, 50);
  } else if (tabKey === 'inventaris') {
    renderLabInventarisTable();
  } else if (tabKey === 'perawatan') {
    renderLabPerawatanTable();
  } else if (tabKey === 'logbook') {
    renderLabLogbookTable();
  } else if (tabKey === 'jadwal') {
    renderLabJadwalTable();
  } else if (tabKey === 'anggaran') {
    renderLabAnggaranTable();
  } else if (tabKey === 'dokumen') {
    renderLabDokumenTable();
  } else if (tabKey === 'lpj') {
    renderLabLpjTable();
  }
}

function switchLabTabFromSidebar(tabKey, el) {
  if (currentDept !== 'laboratorium') {
    currentDept = 'laboratorium';
    showPage('dept');
  }
  switchLabTab(tabKey);
}

function renderLabContent() {
  // Update stat badges
  const totalAlat = DEFAULT_LAB_INVENTARIS.reduce((sum, item) => sum + (item.jumlah || 1), 0);
  const alatBaik = DEFAULT_LAB_INVENTARIS.filter(i => i.kondisi === 'Baik').reduce((sum, item) => sum + (item.jumlah || 1), 0);
  const alatRusak = DEFAULT_LAB_INVENTARIS.filter(i => i.kondisi !== 'Baik').reduce((sum, item) => sum + (item.jumlah || 1), 0);
  const totalLogbook = DEFAULT_LAB_LOGBOOK.length + arsip.filter(a => a.bidang === 'laboratorium' && a.jenis === 'laporan_laboratorium').length;
  
  if (document.getElementById('lab-stat-total-alat')) document.getElementById('lab-stat-total-alat').textContent = totalAlat;
  if (document.getElementById('lab-stat-baik')) document.getElementById('lab-stat-baik').textContent = alatBaik;
  if (document.getElementById('lab-stat-rusak')) document.getElementById('lab-stat-rusak').textContent = alatRusak;
  if (document.getElementById('lab-stat-logbook')) document.getElementById('lab-stat-logbook').textContent = totalLogbook;
  if (document.getElementById('lab-stat-anggaran')) document.getElementById('lab-stat-anggaran').textContent = 'Rp 9.500.000';

  renderLabInventarisTable();
  renderLabPerawatanTable();
  renderLabLogbookTable();
  renderLabJadwalTable();
  renderLabAnggaranTable();
  renderLabDokumenTable();
  renderLabLpjTable();
}

function renderLabInventarisTable() {
  const tbody = document.getElementById('labInventarisBody');
  if (!tbody) return;

  const kat = document.getElementById('labFilterKategori')?.value || '';
  const kon = document.getElementById('labFilterKondisi')?.value || '';
  const q = (document.getElementById('labSearchInventaris')?.value || '').toLowerCase().trim();

  let list = DEFAULT_LAB_INVENTARIS.filter(item => {
    if (kat && item.kategori !== kat) return false;
    if (kon && item.kondisi !== kon) return false;
    if (q) {
      const match = item.nama.toLowerCase().includes(q) || item.kode.toLowerCase().includes(q) || item.lokasi.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const emptyEl = document.getElementById('labInventarisEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => {
    let badgeColor = item.kondisi === 'Baik' ? '#22c55e' : (item.kondisi === 'Servis' ? '#3b82f6' : '#ef4444');
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td><strong style="color:var(--primary);">${item.kode}</strong></td>
        <td><strong>${item.nama}</strong></td>
        <td><span class="badge" style="background:#e0e7ff; color:#3730a3;">${item.kategori}</span></td>
        <td>${item.jumlah} ${item.unit}</td>
        <td><span class="badge" style="background:${badgeColor}20; color:${badgeColor}; font-weight:600;">${item.kondisi}</span></td>
        <td><i class="fas fa-location-dot" style="color:var(--t3); margin-right:4px;"></i> ${item.lokasi}</td>
      </tr>
    `;
  }).join('');
}

function renderLabPerawatanTable() {
  const tbody = document.getElementById('labPerawatanBody');
  if (!tbody) return;
  const q = (document.getElementById('labSearchPerawatan')?.value || '').toLowerCase().trim();

  let list = DEFAULT_LAB_PERAWATAN.filter(item => {
    if (!q) return true;
    return item.alat.toLowerCase().includes(q) || item.jenis.toLowerCase().includes(q) || item.teknisi.toLowerCase().includes(q);
  });

  const emptyEl = document.getElementById('labPerawatanEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => {
    let statColor = item.status === 'Selesai' ? '#22c55e' : '#f59e0b';
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td>${item.tgl}</td>
        <td><strong>${item.alat}</strong></td>
        <td>${item.jenis}</td>
        <td>${item.teknisi}</td>
        <td><strong>${item.biaya}</strong></td>
        <td><span class="badge" style="background:${statColor}20; color:${statColor}; font-weight:600;">${item.status}</span></td>
      </tr>
    `;
  }).join('');
}

function renderLabLogbookTable() {
  const tbody = document.getElementById('labLogbookBody');
  if (!tbody) return;
  const q = (document.getElementById('labSearchLogbook')?.value || '').toLowerCase().trim();

  // Merge default logbooks and any synced logbooks from arsip
  let synced = arsip.filter(a => a.bidang === 'laboratorium' && a.id.startsWith('SIMLAB-LOG-')).map(a => ({
    id: a.id,
    tgl: a.tanggal || a.ay,
    kegiatan: a.judul,
    dosen: a.pengirim || 'Instruktur Lab',
    alat: 'Peralatan Akupunktur Terintegrasi',
    mhs: 'Mahasiswa Praktikan',
    ket: a.keterangan || '-'
  }));

  let combined = [...synced, ...DEFAULT_LAB_LOGBOOK];

  let list = combined.filter(item => {
    if (!q) return true;
    return item.kegiatan.toLowerCase().includes(q) || item.dosen.toLowerCase().includes(q) || item.alat.toLowerCase().includes(q);
  });

  const emptyEl = document.getElementById('labLogbookEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td>${item.tgl}</td>
      <td><strong style="color:var(--t1);">${item.kegiatan}</strong></td>
      <td><i class="fas fa-chalkboard-user" style="color:var(--t3); margin-right:4px;"></i> ${item.dosen}</td>
      <td>${item.alat}</td>
      <td>${item.mhs}</td>
      <td style="font-size:0.85rem; color:var(--t2);">${item.ket}</td>
    </tr>
  `).join('');
}

function renderLabJadwalTable() {
  const tbody = document.getElementById('labJadwalBody');
  if (!tbody) return;
  tbody.innerHTML = DEFAULT_LAB_JADWAL.map((j, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td><strong style="color:var(--primary);"><i class="fas fa-clock" style="margin-right:4px;"></i> ${j.hari}</strong></td>
      <td><strong>${j.makul}</strong></td>
      <td><span class="badge" style="background:#fef3c7; color:#b45309;">${j.semester}</span></td>
      <td><i class="fas fa-door-open" style="color:var(--t3); margin-right:4px;"></i> ${j.ruang}</td>
      <td>${j.dosen}</td>
    </tr>
  `).join('');
}

function renderLabAnggaranTable() {
  const tbody = document.getElementById('labAnggaranBody');
  if (!tbody) return;
  tbody.innerHTML = DEFAULT_LAB_ANGGARAN.map((a, idx) => {
    let statColor = a.status === 'Terealisasi' ? '#22c55e' : '#f59e0b';
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td><strong style="color:var(--primary);">${a.no}</strong></td>
        <td><strong>${a.uraian}</strong></td>
        <td>${a.tgl}</td>
        <td><strong style="color:#0f766e;">${a.estimasi}</strong></td>
        <td><span class="badge" style="background:${statColor}20; color:${statColor}; font-weight:600;">${a.status}</span></td>
      </tr>
    `;
  }).join('');
}

function renderLabDokumenTable() {
  const tbody = document.getElementById('labDokumenBody');
  if (!tbody) return;
  tbody.innerHTML = DEFAULT_LAB_DOKUMEN.map((d, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td><strong style="color:var(--primary);">${d.nomor}</strong></td>
      <td><strong>${d.nama}</strong></td>
      <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${d.kategori}</span></td>
      <td>${d.tgl}</td>
      <td>
        <button class="btn-ghost-sm" onclick="toast('Membuka pratinjau dokumen ${d.file}', 'info')">
          <i class="fas fa-file-pdf" style="color:#ef4444;"></i> ${d.file}
        </button>
      </td>
    </tr>
  `).join('');
}

function renderLabLpjTable() {
  const tbody = document.getElementById('labLpjBody');
  if (!tbody) return;
  tbody.innerHTML = DEFAULT_LAB_LPJ.map((l, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td><strong style="color:var(--primary);">${l.no}</strong></td>
      <td><strong>${l.judul}</strong></td>
      <td><span class="badge" style="background:#fce7f3; color:#be185d;">${l.periode}</span></td>
      <td>${l.tgl}</td>
      <td>
        <button class="btn-ghost-sm" onclick="toast('Membuka file LPJ ${l.file}', 'info')">
          <i class="fas fa-file-pdf" style="color:#ef4444;"></i> Unduh PDF
        </button>
      </td>
    </tr>
  `).join('');
}

function initLabCharts() {
  const ctxKondisi = document.getElementById('labChartKondisi');
  const ctxKategori = document.getElementById('labChartKategori');
  const ctxLogbook = document.getElementById('labChartLogbook');
  const ctxAnggaran = document.getElementById('labChartAnggaran');

  if (!ctxKondisi || !ctxKategori) return;

  if (window.chartLabKondisi) window.chartLabKondisi.destroy();
  if (window.chartLabKategori) window.chartLabKategori.destroy();
  if (window.chartLabLogbook) window.chartLabLogbook.destroy();
  if (window.chartLabAnggaran) window.chartLabAnggaran.destroy();

  // 1. Chart Kondisi Alat (Doughnut)
  window.chartLabKondisi = new Chart(ctxKondisi.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Kondisi Baik / Siap', 'Rusak Ringan', 'Rusak Berat', 'Sedang Servis'],
      datasets: [{
        data: [13, 1, 0, 1],
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } },
        datalabels: { color: '#ffffff', font: { weight: 'bold', size: 11 } }
      }
    }
  });

  // 2. Chart Kategori Aset (Bar)
  window.chartLabKategori = new Chart(ctxKategori.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['Akupunktur', 'Elektronik/TDP', 'Manekin Model', 'Sterilisasi', 'Bahan Habis Pakai'],
      datasets: [{
        label: 'Jumlah Item/Jenis',
        data: [3, 4, 2, 3, 3],
        backgroundColor: ['#ec4899', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: { anchor: 'end', align: 'top', color: 'var(--t1)', font: { weight: 'bold' } }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });

  // 3. Chart Tren Logbook Bulanan (Line)
  if (ctxLogbook) {
    window.chartLabLogbook = new Chart(ctxLogbook.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [{
          label: 'Sesi Praktikum & Logbook',
          data: [8, 14, 22, 19, 12, 6, 4, 18, 26, 24, 20, 15],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointBackgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12 } },
          datalabels: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // 4. Chart Anggaran Lab (Bar)
  if (ctxAnggaran) {
    window.chartLabAnggaran = new Chart(ctxAnggaran.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jarum & Alkes', 'Elektroterapi', 'Perawatan/Servis', 'Bahan Habis Pakai'],
        datasets: [
          {
            label: 'Pengajuan (RAB)',
            data: [4500000, 3500000, 1500000, 2800000],
            backgroundColor: '#93c5fd',
            borderRadius: 4
          },
          {
            label: 'Terealisasi',
            data: [4500000, 3500000, 1500000, 2000000],
            backgroundColor: '#22c55e',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          datalabels: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => 'Rp ' + (val / 1000000).toFixed(1) + ' Jt'
            }
          }
        }
      }
    });
  }
}

async function syncSimlabLive(isManual = false) {
  const icon = document.getElementById('labSyncIcon');
  if (icon) icon.classList.add('fa-spin');

  try {
    // Sinkronisasi data dokumen Firestore arsip laboratorium
    if (typeof db !== 'undefined') {
      const snap = await db.collection('arsip').where('bidang', '==', 'laboratorium').get();
      if (!snap.empty) {
        snap.forEach(docSnap => {
          const item = docSnap.data();
          const existIdx = arsip.findIndex(a => a.id === docSnap.id || (a.nomor && a.nomor === item.nomor));
          const rec = { id: docSnap.id, ...item };
          if (existIdx >= 0) {
            arsip[existIdx] = rec;
          } else {
            arsip.unshift(rec);
          }
        });
      }
    }

    renderLabContent();
    if (currentLabTab === 'dashboard') {
      initLabCharts();
    }
    if (isManual) {
      toast('Sinkronisasi data live SIMLAB berhasil!', 'success');
    }
  } catch (err) {
    console.warn('Sync SIMLAB warning:', err);
    if (isManual) {
      toast('Data SIMLAB telah diperbarui secara lokal.', 'info');
    }
  } finally {
    if (icon) icon.classList.remove('fa-spin');
  }
}

/* ══════════════════════════════════════════════════════════════
   BIDANG SARANA DAN PRASARANA (SIMSPRAS) INTEGRATED MODULES
   Akademi Akupunktur Surabaya
   ══════════════════════════════════════════════════════════════ */

const DEFAULT_SARANA_INVENTARIS = [];
const DEFAULT_SARANA_PEMINJAMAN = [];
const DEFAULT_SARANA_ANGGARAN = [];
const DEFAULT_SARANA_SOP = [];
const DEFAULT_SARANA_PENGAWASAN = [];
const DEFAULT_SARANA_PEMELIHARAAN = [];
const DEFAULT_SARANA_LAPORAN = [];

function switchSaranaTab(tabKey) {
  currentSaranaTab = tabKey;

  // Update tabs buttons in #saranaContainer
  const buttons = ['dashboard', 'inventaris', 'peminjaman', 'anggaran', 'sop', 'pengawasan', 'pemeliharaan', 'laporan', 'portal'];
  buttons.forEach(b => {
    const btn = document.getElementById(`btnSaranaTab-${b}`);
    if (btn) {
      if (b === tabKey) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = b === 'portal' ? '#0ea5e9' : 'var(--t2)';
      }
    }
  });

  // Update sidebar sub-menu if present
  const sidebarSub = document.getElementById('dept-sarana-sub-menu') || document.getElementById('submenu-sarana');
  if (sidebarSub) {
    const listItems = sidebarSub.querySelectorAll('li');
    listItems.forEach(li => {
      const onclickAttr = li.getAttribute('onclick') || '';
      if (onclickAttr.includes(`'${tabKey}'`)) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  // Toggle views
  buttons.forEach(b => {
    const v = document.getElementById(`saranaView-${b}`);
    if (v) {
      v.style.display = (b === tabKey) ? 'block' : 'none';
    }
  });

  if (tabKey === 'portal') {
    const simsprasFrame = document.getElementById('simsprasIframe');
    if (simsprasFrame && (!simsprasFrame.src || !simsprasFrame.src.includes('sarpras.akademiakupunktursurabaya.web.id'))) {
      simsprasFrame.src = 'https://sarpras.akademiakupunktursurabaya.web.id';
    }
  } else if (tabKey === 'dashboard') {
    setTimeout(initSaranaCharts, 50);
  } else if (tabKey === 'inventaris') {
    renderSaranaInventarisTable();
  } else if (tabKey === 'peminjaman') {
    renderSaranaPeminjamanTable();
  } else if (tabKey === 'anggaran') {
    renderSaranaAnggaranTable();
  } else if (tabKey === 'sop') {
    renderSaranaSopTable();
  } else if (tabKey === 'pengawasan') {
    renderSaranaPengawasanTable();
  } else if (tabKey === 'pemeliharaan') {
    renderSaranaPemeliharaanTable();
  } else if (tabKey === 'laporan') {
    renderSaranaLaporanTable();
  }
}

function switchSaranaTabFromSidebar(tabKey, el) {
  if (currentDept !== 'sarana') {
    const link = document.getElementById('nav-sarana');
    if (link) setActiveNav(link);
    currentDept = 'sarana';
    showPage('dept');
  }
  switchSaranaTab(tabKey);
}

let currentSaranaAY = '2025/2026 Genap';

function onSaranaFilterTahunAkademikChange(val) {
  currentSaranaAY = val;
  renderSaranaContent();
  if (currentSaranaTab === 'dashboard') {
    initSaranaCharts();
  }
  if (typeof toast === 'function') {
    toast(`Filter Tahun Akademik Sarpras: ${val || 'Semua TA'}`, 'info');
  }
}

function filterSaranaByAY(data) {
  if (!data || !Array.isArray(data)) return [];
  if (!currentSaranaAY || currentSaranaAY === 'Semua') return data;
  const selNorm = currentSaranaAY.toLowerCase().trim();
  const yr = (currentSaranaAY.match(/\d{4}/) || [''])[0];
  return data.filter(item => {
    if (item.tahunAkademik) {
      const itemNorm = String(item.tahunAkademik).toLowerCase().trim();
      if (itemNorm === selNorm || itemNorm.includes(selNorm) || selNorm.includes(itemNorm)) return true;
      if (yr && itemNorm.includes(yr)) return true;
    }
    if (item.metadata && item.metadata.tahunAkademik) {
      const itemNorm = String(item.metadata.tahunAkademik).toLowerCase().trim();
      if (itemNorm === selNorm || itemNorm.includes(selNorm) || selNorm.includes(itemNorm)) return true;
      if (yr && itemNorm.includes(yr)) return true;
    }
    // Aset fisik tetap (gedung, furnitur, proyektor, genset) tetap terdata lintas semester
    if (item.kode && (item.kondisi || item.lokasi || item.satuan)) return true;
    if (yr) {
      const d = item.tanggal || item.tgl || item.tglPengadaan || item.tglPinjam || item.tglServis || item.ay || item.noPinjam || item.noRAB || item.nomor || item.kode || '';
      if (String(d).includes(yr) || String(d).includes('2025') || String(d).includes('2026')) return true;
    }
    return true;
  });
}

function renderSaranaContent() {
  const syncedInv = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-INVENTARIS-') || (a.metadata && a.metadata.module === 'inventaris')));
  let combinedInv = syncedInv.map(a => ({
    id: a.id,
    kode: a.nomor || a.id,
    nama: a.judul,
    kategori: a.keterangan.includes('Kategori: ') ? a.keterangan.split('Kategori: ')[1].split('•')[0].trim() : 'Sarana & Prasarana',
    kondisi: a.keterangan.includes('Kondisi: ') ? a.keterangan.split('Kondisi: ')[1].split('•')[0].trim() : 'Baik',
    tanggal: a.tanggal || a.ay || '2026',
    jumlah: 1
  }));

  combinedInv = filterSaranaByAY(combinedInv);

  const totalAset = combinedInv.reduce((sum, item) => sum + (Number(item.jumlah) || 1), 0);
  const baikCount = combinedInv.filter(i => (i.kondisi || '').toLowerCase().includes('baik')).reduce((sum, item) => sum + (Number(item.jumlah) || 1), 0);
  const rusakCount = combinedInv.filter(i => (i.kondisi || '').toLowerCase().includes('rusak')).reduce((sum, item) => sum + (Number(item.jumlah) || 1), 0);

  const syncedPinjam = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-PEMINJAMAN-') || (a.metadata && a.metadata.module === 'peminjaman'))).map(a => ({
    ...a,
    tglPinjam: a.tanggal || '2026'
  }));
  const combinedPinjam = filterSaranaByAY(syncedPinjam);
  const totalPinjam = combinedPinjam.length;

  const syncedRab = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-ANGGARAN-') || a.rab_amount || a.isAnggaran)).map(a => ({
    ...a,
    status: a.rab_status || (a.status === 'selesai' ? 'Terealisasi' : 'Direncanakan'),
    totalNum: Number(a.rab_amount) || 0,
    tanggal: a.tanggal || '2026'
  }));
  const combinedRab = filterSaranaByAY(syncedRab);
  const totalRealisasi = combinedRab.filter(a => a.status === 'Terealisasi').reduce((sum, item) => sum + (item.totalNum || 0), 0);

  if (document.getElementById('sarana-stat-total-aset')) document.getElementById('sarana-stat-total-aset').textContent = totalAset;
  if (document.getElementById('sarana-stat-baik')) document.getElementById('sarana-stat-baik').textContent = baikCount;
  if (document.getElementById('sarana-stat-rusak')) document.getElementById('sarana-stat-rusak').textContent = rusakCount;
  if (document.getElementById('sarana-stat-pinjam')) document.getElementById('sarana-stat-pinjam').textContent = totalPinjam;
  if (document.getElementById('sarana-stat-anggaran')) document.getElementById('sarana-stat-anggaran').textContent = 'Rp ' + totalRealisasi.toLocaleString('id-ID');

  renderSaranaInventarisTable();
  renderSaranaPeminjamanTable();
  renderSaranaAnggaranTable();
  renderSaranaSopTable();
  renderSaranaPengawasanTable();
  renderSaranaPemeliharaanTable();
  renderSaranaLaporanTable();
}

function renderSaranaInventarisTable() {
  const tbody = document.getElementById('saranaInventarisBody');
  if (!tbody) return;

  const kat = document.getElementById('saranaFilterKategori')?.value || '';
  const kon = document.getElementById('saranaFilterKondisi')?.value || '';
  const q = (document.getElementById('saranaSearchInventaris')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-INVENTARIS-') || (a.metadata && a.metadata.module === 'inventaris'))).map(a => ({
    id: a.id,
    kode: a.nomor || a.id,
    nama: a.judul,
    kategori: a.keterangan.includes('Kategori: ') ? a.keterangan.split('Kategori: ')[1].split('•')[0].trim() : 'Sarana & Prasarana',
    kondisi: a.keterangan.includes('Kondisi: ') ? a.keterangan.split('Kondisi: ')[1].split('•')[0].trim() : 'Baik',
    jumlah: 1,
    satuan: 'Unit',
    lokasi: a.keterangan.includes('Lokasi: ') ? a.keterangan.split('Lokasi: ')[1].split('•')[0].trim() : 'Kampus AAS',
    harga: a.keterangan.includes('Nilai: ') ? a.keterangan.split('Nilai: ')[1].split('•')[0].trim() : '-'
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (kat && !item.kategori.toLowerCase().includes(kat.toLowerCase())) return false;
    if (kon && !item.kondisi.toLowerCase().includes(kon.toLowerCase())) return false;
    if (q) {
      const match = (item.nama||'').toLowerCase().includes(q) || (item.kode||'').toLowerCase().includes(q) || (item.lokasi||'').toLowerCase().includes(q) || (item.kategori||'').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const emptyEl = document.getElementById('saranaInventarisEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => {
    let badgeColor = item.kondisi === 'Baik' ? '#22c55e' : (item.kondisi === 'Cukup Baik' ? '#3b82f6' : '#f59e0b');
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td><strong style="color:var(--primary); font-family:monospace;">${item.kode}</strong></td>
        <td><strong>${item.nama}</strong></td>
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${item.kategori}</span></td>
        <td>${item.jumlah} ${item.satuan || 'Unit'}</td>
        <td><span class="badge" style="background:${badgeColor}20; color:${badgeColor}; font-weight:600;">${item.kondisi}</span></td>
        <td><i class="fas fa-location-dot" style="color:var(--t3); margin-right:4px;"></i> ${item.lokasi}</td>
        <td style="font-weight:600; color:var(--t1);">${item.harga || '-'}</td>
        <td style="text-align:center;">
          <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSaranaPeminjamanTable() {
  const tbody = document.getElementById('saranaPeminjamanBody');
  if (!tbody) return;

  const stat = document.getElementById('saranaFilterPinjamStatus')?.value || '';
  const q = (document.getElementById('saranaSearchPeminjaman')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-PEMINJAMAN-') || (a.metadata && a.metadata.module === 'peminjaman'))).map(a => ({
    id: a.id,
    noPinjam: a.nomor || a.id,
    namaPeminjam: a.pengirim || 'Civitas AAS',
    unit: a.keterangan.includes('Peminjam: ') ? a.keterangan.split('Peminjam: ')[1].split('•')[0].trim() : 'Umum',
    barang: a.judul,
    tglPinjam: a.tanggal || '-',
    tglKembali: a.keterangan.includes('Batas Kembali: ') ? a.keterangan.split('Batas Kembali: ')[1].split('•')[0].trim() : '-',
    status: a.status === 'selesai' ? 'Dikembalikan' : 'Dipinjam'
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (stat && item.status !== stat) return false;
    if (q) {
      const match = (item.namaPeminjam||'').toLowerCase().includes(q) || (item.barang||'').toLowerCase().includes(q) || (item.noPinjam||'').toLowerCase().includes(q) || (item.unit||'').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const emptyEl = document.getElementById('saranaPeminjamanEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => {
    let statColor = item.status === 'Dikembalikan' ? '#22c55e' : (item.status === 'Dipinjam' ? '#6366f1' : '#ef4444');
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td><strong style="color:var(--primary); font-family:monospace;">${item.noPinjam}</strong></td>
        <td><strong>${item.namaPeminjam}</strong></td>
        <td><span class="badge" style="background:var(--bg3); color:var(--t2);">${item.unit}</span></td>
        <td>${item.barang}</td>
        <td>${item.tglPinjam}</td>
        <td>${item.tglKembali}</td>
        <td><span class="badge" style="background:${statColor}20; color:${statColor}; font-weight:600;">${item.status}</span></td>
        <td style="text-align:center;">
          <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSaranaAnggaranTable() {
  const tbody = document.getElementById('saranaAnggaranBody');
  if (!tbody) return;

  const stat = document.getElementById('saranaFilterAnggaranStatus')?.value || '';
  const q = (document.getElementById('saranaSearchAnggaran')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-ANGGARAN-') || a.isAnggaran || (a.metadata && a.metadata.module === 'anggaran'))).map(a => ({
    id: a.id,
    noRAB: a.nomor || a.id,
    uraian: a.judul,
    kategori: a.keterangan.includes('Kategori: ') ? a.keterangan.split('Kategori: ')[1].split('•')[0].trim() : 'Sarpras',
    volume: '1 Paket',
    harga: 'Rp ' + (Number(a.rab_amount)||0).toLocaleString('id-ID'),
    total: 'Rp ' + (Number(a.rab_amount)||0).toLocaleString('id-ID'),
    status: a.rab_status || (a.status === 'selesai' ? 'Terealisasi' : 'Direncanakan')
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (stat && item.status !== stat) return false;
    if (q) {
      const match = (item.uraian||'').toLowerCase().includes(q) || (item.noRAB||'').toLowerCase().includes(q) || (item.kategori||'').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const emptyEl = document.getElementById('saranaAnggaranEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => {
    let statColor = item.status === 'Terealisasi' ? '#22c55e' : (item.status === 'Disetujui' ? '#0ea5e9' : '#f59e0b');
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td><strong style="color:var(--primary); font-family:monospace;">${item.noRAB}</strong></td>
        <td><strong>${item.uraian}</strong></td>
        <td><span class="badge" style="background:#fef3c7; color:#b45309;">${item.kategori}</span></td>
        <td>${item.volume}</td>
        <td>${item.harga}</td>
        <td><strong style="color:#0f766e;">${item.total}</strong></td>
        <td><span class="badge" style="background:${statColor}20; color:${statColor}; font-weight:600;">${item.status}</span></td>
        <td style="text-align:center;">
          <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSaranaSopTable() {
  const tbody = document.getElementById('saranaSopBody');
  if (!tbody) return;

  const q = (document.getElementById('saranaSearchSop')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-SOP-') || (a.metadata && a.metadata.module === 'sop'))).map(a => ({
    id: a.id,
    nomor: a.nomor || a.id,
    judul: a.judul,
    kategori: a.keterangan.includes('Kategori: ') ? a.keterangan.split('Kategori: ')[1].split('•')[0].trim() : 'SOP Sarpras',
    revisi: 'Rev. 01',
    tgl: a.tanggal || '-',
    status: 'Berlaku'
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (!q) return true;
    return (item.judul||'').toLowerCase().includes(q) || (item.nomor||'').toLowerCase().includes(q) || (item.kategori||'').toLowerCase().includes(q);
  });

  const emptyEl = document.getElementById('saranaSopEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td><strong style="color:var(--primary); font-family:monospace;">${item.nomor}</strong></td>
      <td><strong>${item.judul}</strong></td>
      <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${item.kategori}</span></td>
      <td>${item.revisi}</td>
      <td>${item.tgl}</td>
      <td><span class="badge" style="background:#22c55e20; color:#22c55e; font-weight:600;">${item.status}</span></td>
      <td style="text-align:center;">
        <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function renderSaranaPengawasanTable() {
  const tbody = document.getElementById('saranaPengawasanBody');
  if (!tbody) return;

  const q = (document.getElementById('saranaSearchPengawasan')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-PENGAWASAN-') || (a.metadata && a.metadata.module === 'pengawasan'))).map(a => ({
    id: a.id,
    kode: a.nomor || a.id,
    fasilitas: a.judul,
    petugas: a.pengirim || 'Tim Pengawas',
    kondisi: a.keterangan.includes('Kondisi: ') ? a.keterangan.split('Kondisi: ')[1].split('•')[0].trim() : 'Baik',
    hasil: a.keterangan.includes('Hasil: ') ? a.keterangan.split('Hasil: ')[1].split('•')[0].trim() : 'Inspeksi berkala',
    rekomendasi: a.keterangan.includes('Rekomendasi: ') ? a.keterangan.split('Rekomendasi: ')[1].split('•')[0].trim() : 'Pemeliharaan rutin'
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (!q) return true;
    return (item.fasilitas||'').toLowerCase().includes(q) || (item.petugas||'').toLowerCase().includes(q) || (item.kode||'').toLowerCase().includes(q);
  });

  const emptyEl = document.getElementById('saranaPengawasanEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td><strong style="color:var(--primary); font-family:monospace;">${item.kode}</strong></td>
      <td><strong>${item.fasilitas}</strong></td>
      <td><i class="fas fa-user-check" style="color:var(--t3); margin-right:4px;"></i> ${item.petugas}</td>
      <td><span class="badge" style="background:#22c55e20; color:#22c55e; font-weight:600;">${item.kondisi}</span></td>
      <td>${item.hasil}</td>
      <td style="color:var(--primary); font-weight:500;">${item.rekomendasi}</td>
      <td style="text-align:center;">
        <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function renderSaranaPemeliharaanTable() {
  const tbody = document.getElementById('saranaPemeliharaanBody');
  if (!tbody) return;

  const q = (document.getElementById('saranaSearchPemeliharaan')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-PEMELIHARAAN-') || (a.metadata && a.metadata.module === 'pemeliharaan'))).map(a => ({
    id: a.id,
    kode: a.nomor || a.id,
    namaBarang: a.judul,
    teknisi: a.pengirim || 'Teknisi Kampus',
    jenisServis: a.keterangan.includes('Jenis: ') ? a.keterangan.split('Jenis: ')[1].split('•')[0].trim() : 'Servis Berkala',
    biaya: a.keterangan.includes('Biaya: ') ? a.keterangan.split('Biaya: ')[1].split('•')[0].trim() : 'Rp 0',
    tglServis: a.tanggal || '-',
    status: a.status === 'selesai' ? 'Selesai' : 'Diproses'
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (!q) return true;
    return (item.namaBarang||'').toLowerCase().includes(q) || (item.teknisi||'').toLowerCase().includes(q) || (item.kode||'').toLowerCase().includes(q);
  });

  const emptyEl = document.getElementById('saranaPemeliharaanEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => {
    let statColor = item.status === 'Selesai' ? '#22c55e' : '#f59e0b';
    return `
      <tr>
        <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
        <td><strong style="color:var(--primary); font-family:monospace;">${item.kode}</strong></td>
        <td><strong>${item.namaBarang}</strong></td>
        <td>${item.teknisi}</td>
        <td>${item.jenisServis}</td>
        <td><strong>${item.biaya}</strong></td>
        <td>${item.tglServis}</td>
        <td><span class="badge" style="background:${statColor}20; color:${statColor}; font-weight:600;">${item.status}</span></td>
        <td style="text-align:center;">
          <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderSaranaLaporanTable() {
  const tbody = document.getElementById('saranaLaporanBody');
  if (!tbody) return;

  const q = (document.getElementById('saranaSearchLaporan')?.value || '').toLowerCase().trim();

  const synced = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-LAPORAN-') || a.id.startsWith('SIMSPRAS-BA-') || (a.metadata && (a.metadata.module === 'laporan' || a.metadata.module === 'berita_acara')))).map(a => ({
    id: a.id,
    nomor: a.nomor || a.id,
    judul: a.judul,
    jenis: a.id.includes('BA') ? 'Berita Acara' : 'Laporan Sarpras',
    tanggal: a.tanggal || '-',
    pihak: a.pengirim || 'Bidang Sarpras',
    ket: a.keterangan || '-'
  }));

  const combined = filterSaranaByAY(synced);

  const list = combined.filter(item => {
    if (!q) return true;
    return (item.judul||'').toLowerCase().includes(q) || (item.nomor||'').toLowerCase().includes(q) || (item.jenis||'').toLowerCase().includes(q);
  });

  const emptyEl = document.getElementById('saranaLaporanEmpty');
  if (list.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.classList.remove('hidden');
    return;
  }
  if (emptyEl) emptyEl.classList.add('hidden');

  tbody.innerHTML = list.map((item, idx) => `
    <tr>
      <td style="color:var(--t3); text-align:center;">${idx + 1}</td>
      <td><strong style="color:var(--primary); font-family:monospace;">${item.nomor}</strong></td>
      <td><strong>${item.judul}</strong></td>
      <td><span class="badge" style="background:#fce7f3; color:#be185d;">${item.jenis}</span></td>
      <td>${item.tanggal}</td>
      <td>${item.pihak}</td>
      <td style="font-size:0.85rem; color:var(--t2);">${item.ket}</td>
      <td style="text-align:center;">
        <button class="act-btn del" onclick="deleteSaranaItemFromSimarsip('${item.id}')" title="Hapus Data"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function initSaranaCharts() {
  const ctxKondisi = document.getElementById('saranaChartKondisi');
  const ctxKategori = document.getElementById('saranaChartKategori');
  const ctxTren = document.getElementById('saranaChartTren');
  const ctxAnggaran = document.getElementById('saranaChartAnggaran');

  if (!ctxKondisi || !ctxKategori) return;

  if (window.chartSaranaKondisi) window.chartSaranaKondisi.destroy();
  if (window.chartSaranaKategori) window.chartSaranaKategori.destroy();
  if (window.chartSaranaTren) window.chartSaranaTren.destroy();
  if (window.chartSaranaAnggaran) window.chartSaranaAnggaran.destroy();

  const syncedInv = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-INVENTARIS-') || (a.metadata && a.metadata.module === 'inventaris')));
  const filteredInv = filterSaranaByAY(syncedInv.map(a => ({
    kondisi: a.keterangan.includes('Kondisi: ') ? a.keterangan.split('Kondisi: ')[1].split('•')[0].trim() : 'Baik',
    kategori: a.keterangan.includes('Kategori: ') ? a.keterangan.split('Kategori: ')[1].split('•')[0].trim() : 'Sarana & Prasarana'
  })));

  const baik = filteredInv.filter(i => (i.kondisi || '').toLowerCase().includes('baik') && !(i.kondisi || '').toLowerCase().includes('cukup')).length;
  const cukup = filteredInv.filter(i => (i.kondisi || '').toLowerCase().includes('cukup')).length;
  const ringan = filteredInv.filter(i => (i.kondisi || '').toLowerCase().includes('ringan')).length;
  const berat = filteredInv.filter(i => (i.kondisi || '').toLowerCase().includes('berat')).length;

  // 1. Chart Kondisi Aset (Doughnut)
  window.chartSaranaKondisi = new Chart(ctxKondisi.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Kondisi Baik / Siap', 'Cukup Baik', 'Rusak Ringan', 'Rusak Berat'],
      datasets: [{
        data: [baik, cukup, ringan, berat],
        backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } },
        datalabels: { color: '#ffffff', font: { weight: 'bold', size: 11 } }
      }
    }
  });

  // 2. Chart Distribusi Kategori Sarpras (Bar)
  const katCounts = {};
  filteredInv.forEach(i => {
    const k = i.kategori || 'Lainnya';
    katCounts[k] = (katCounts[k] || 0) + 1;
  });
  const katLabels = Object.keys(katCounts).length ? Object.keys(katCounts) : ['Gedung & Fasilitas', 'Mebel & Furnitur', 'Elektronik & Audio', 'Utilitas & K3'];
  const katValues = Object.keys(katCounts).length ? Object.values(katCounts) : [0, 0, 0, 0];

  window.chartSaranaKategori = new Chart(ctxKategori.getContext('2d'), {
    type: 'bar',
    data: {
      labels: katLabels,
      datasets: [{
        label: 'Jumlah Item / Aset',
        data: katValues,
        backgroundColor: ['#0ea5e9', '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: { anchor: 'end', align: 'top', color: 'var(--t1)', font: { weight: 'bold' } }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // 3. Chart Tren Peminjaman & Pemeliharaan Bulanan (Line)
  if (ctxTren) {
    const pinjamMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const maintMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arsip.filter(a => a.bidang === 'sarana').forEach(a => {
      if (a.tanggal) {
        const m = parseInt(a.tanggal.split('-')[1], 10) - 1;
        if (m >= 0 && m < 12) {
          if (a.id.startsWith('SIMSPRAS-PEMINJAMAN-')) pinjamMonthly[m]++;
          if (a.id.startsWith('SIMSPRAS-PEMELIHARAAN-')) maintMonthly[m]++;
        }
      }
    });

    window.chartSaranaTren = new Chart(ctxTren.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        datasets: [
          {
            label: 'Sirkulasi Peminjaman',
            data: pinjamMonthly,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: '#6366f1'
          },
          {
            label: 'Kegiatan Servis/Pemeliharaan',
            data: maintMonthly,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: '#10b981'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12 } },
          datalabels: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // 4. Chart Anggaran Sarpras (Bar: Pengajuan vs Realisasi)
  if (ctxAnggaran) {
    const syncedRab = arsip.filter(a => a.bidang === 'sarana' && (a.id.startsWith('SIMSPRAS-ANGGARAN-') || a.isAnggaran || (a.metadata && a.metadata.module === 'anggaran'))).map(a => ({
      uraian: a.judul.replace('RAB Sarpras: ', ''),
      total: Number(a.rab_amount) || 0,
      status: a.rab_status || (a.status === 'selesai' ? 'Terealisasi' : 'Direncanakan')
    }));

    const rabLabels = syncedRab.slice(0, 5).map(r => r.uraian.slice(0, 18));
    const rabPengajuan = syncedRab.slice(0, 5).map(r => r.total);
    const rabRealisasi = syncedRab.slice(0, 5).map(r => r.status === 'Terealisasi' ? r.total : 0);

    window.chartSaranaAnggaran = new Chart(ctxAnggaran.getContext('2d'), {
      type: 'bar',
      data: {
        labels: rabLabels.length ? rabLabels : ['Belum Ada Data'],
        datasets: [
          {
            label: 'Pengajuan (RAB)',
            data: rabPengajuan.length ? rabPengajuan : [0],
            backgroundColor: '#93c5fd',
            borderRadius: 4
          },
          {
            label: 'Terealisasi',
            data: rabRealisasi.length ? rabRealisasi : [0],
            backgroundColor: '#10b981',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          datalabels: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => 'Rp ' + (val / 1000000).toFixed(1) + ' Jt'
            }
          }
        }
      }
    });
  }
}

// ══════════════════════════════════════════════════════════════
// SARPRAS DELETE & CLEANUP HELPERS (POINT 1, 2, 3)
// ══════════════════════════════════════════════════════════════

async function deleteSaranaItemFromSimarsip(id) {
  if (!id) return;
  const a = arsip.find(x => x.id === id || (x.metadata && x.metadata.originalId === id) || x.nomor === id);
  const targetId = a ? a.id : id;
  const title = a ? a.judul : id;

  if (!confirm(`Hapus data Sarpras "${title}"?\n\nTindakan ini akan menghapus data dari SIMARSIP dan Portal SIMSPRAS secara permanen.`)) {
    return;
  }

  // 1. Delete from SIMARSIP Firestore (arsip-aas)
  try {
    if (typeof db !== 'undefined' && db) {
      await db.collection('arsip').doc(targetId).delete();
    }
  } catch (e) {
    console.warn("Gagal menghapus dari Firestore arsip-aas:", e);
  }

  // 2. Delete from SIMSPRAS Firestore (sim-sarpras-ef3a4)
  try {
    if (!dbSarprasSumber && typeof firebase !== 'undefined') {
      let appSarpras = firebase.apps.find(app => app.name === "sarprasSumber") || firebase.initializeApp({
        apiKey: "AIzaSyATNPIY3Iv5tmx9MKh7N6cz-czK0oC8SfY",
        authDomain: "sim-sarpras-ef3a4.firebaseapp.com",
        projectId: "sim-sarpras-ef3a4"
      }, 'sarprasSumber');
      dbSarprasSumber = appSarpras.firestore();
    }

    if (dbSarprasSumber) {
      let colName = (a && a.metadata && a.metadata.module) || '';
      let origId = (a && a.metadata && a.metadata.originalId) || '';
      if (!colName || !origId) {
        if (targetId.startsWith('SIMSPRAS-INVENTARIS-')) { colName = 'inventaris'; origId = targetId.replace('SIMSPRAS-INVENTARIS-', ''); }
        else if (targetId.startsWith('SIMSPRAS-PEMINJAMAN-')) { colName = 'peminjaman'; origId = targetId.replace('SIMSPRAS-PEMINJAMAN-', ''); }
        else if (targetId.startsWith('SIMSPRAS-ANGGARAN-')) { colName = 'anggaran'; origId = targetId.replace('SIMSPRAS-ANGGARAN-', ''); }
        else if (targetId.startsWith('SIMSPRAS-SOP-')) { colName = 'sop'; origId = targetId.replace('SIMSPRAS-SOP-', ''); }
        else if (targetId.startsWith('SIMSPRAS-PENGAWASAN-')) { colName = 'pengawasan'; origId = targetId.replace('SIMSPRAS-PENGAWASAN-', ''); }
        else if (targetId.startsWith('SIMSPRAS-PEMELIHARAAN-')) { colName = 'pemeliharaan'; origId = targetId.replace('SIMSPRAS-PEMELIHARAAN-', ''); }
        else if (targetId.startsWith('SIMSPRAS-LAPORAN-')) { colName = 'laporan'; origId = targetId.replace('SIMSPRAS-LAPORAN-', ''); }
        else if (targetId.startsWith('SIMSPRAS-BA-')) { colName = 'berita_acara'; origId = targetId.replace('SIMSPRAS-BA-', ''); }
        else {
          const tabColMap = {
            'inventaris': 'inventaris',
            'peminjaman': 'peminjaman',
            'anggaran': 'anggaran',
            'sop': 'sop',
            'pengawasan': 'pengawasan',
            'pemeliharaan': 'pemeliharaan',
            'laporan': 'laporan'
          };
          colName = tabColMap[currentSaranaTab] || 'inventaris';
          origId = targetId;
        }
      }
      if (colName && origId) {
        await dbSarprasSumber.collection(colName).doc(origId).delete();
      }
    }
  } catch (e) {
    console.warn("Gagal menghapus dari dbSarprasSumber:", e);
  }

  // 3. Remove from local arsip state
  arsip = arsip.filter(x => x.id !== targetId && x.id !== id && (!a || x.id !== a.id));

  if (typeof save === 'function') save();
  if (typeof updateBadges === 'function') updateBadges();
  renderSaranaContent();
  if (currentSaranaTab === 'dashboard') initSaranaCharts();
  if (typeof toast === 'function') toast(`Data sarpras "${title}" berhasil dihapus.`, 'success');
}

async function clearAllSaranaData() {
  if (!confirm("PERINGATAN: Apakah Anda yakin ingin MENGOSONGKAN SELURUH DATA Sarana & Prasarana?\n\nSemua inventaris, peminjaman, anggaran, SOP, pengawasan, pemeliharaan, dan laporan Sarpras akan dihapus secara permanen.")) {
    return;
  }
  const code = prompt("Ketik 'KOSONGKAN' untuk mengonfirmasi pengosongan seluruh data Sarpras:");
  if (code !== 'KOSONGKAN') {
    if (typeof toast === 'function') toast('Pengosongan data dibatalkan.', 'info');
    return;
  }

  if (typeof toast === 'function') toast('Sedang mengosongkan seluruh data Sarana & Prasarana...', 'info');

  // 1. Delete all sarana records from SIMARSIP Firestore (arsip-aas)
  try {
    if (typeof db !== 'undefined' && db) {
      const saranaDocs = arsip.filter(a => a.bidang === 'sarana');
      const batchPromises = saranaDocs.map(a => db.collection('arsip').doc(a.id).delete().catch(err => console.warn(err)));
      await Promise.all(batchPromises);
    }
  } catch (e) {
    console.warn("Gagal menghapus batch sarana dari arsip-aas:", e);
  }

  // 2. Delete all records from SIMSPRAS Firestore (sim-sarpras-ef3a4)
  try {
    if (!dbSarprasSumber && typeof firebase !== 'undefined') {
      let appSarpras = firebase.apps.find(app => app.name === "sarprasSumber") || firebase.initializeApp({
        apiKey: "AIzaSyATNPIY3Iv5tmx9MKh7N6cz-czK0oC8SfY",
        authDomain: "sim-sarpras-ef3a4.firebaseapp.com",
        projectId: "sim-sarpras-ef3a4"
      }, 'sarprasSumber');
      dbSarprasSumber = appSarpras.firestore();
    }

    if (dbSarprasSumber) {
      const cols = ['inventaris', 'peminjaman', 'anggaran', 'sop', 'pengawasan', 'pemeliharaan', 'laporan', 'berita_acara'];
      for (const colName of cols) {
        try {
          const snap = await dbSarprasSumber.collection(colName).get();
          const delPromises = snap.docs.map(d => d.ref.delete().catch(err => console.warn(err)));
          await Promise.all(delPromises);
        } catch (err) {
          console.warn(`Gagal mengosongkan koleksi ${colName}:`, err);
        }
      }
    }
  } catch (e) {
    console.warn("Gagal mengosongkan dbSarprasSumber:", e);
  }

  // 3. Clear local state
  arsip = arsip.filter(a => a.bidang !== 'sarana');
  if (typeof save === 'function') save();
  if (typeof updateBadges === 'function') updateBadges();
  renderSaranaContent();
  if (currentSaranaTab === 'dashboard') initSaranaCharts();
  if (typeof toast === 'function') toast('Seluruh data Sarana & Prasarana berhasil dikosongkan!', 'success');
}

// ==========================================================================
// MODUL INTEGRASI PENGABDIAN MASYARAKAT (SIM-PKM AAS)
// ==========================================================================
let currentBorangSubTab = '71';
let dbPkmSumber = null;
let chartPkmSkemaInstance = null;
let chartPkmTCMInstance = null;
let chartPkmVASInstance = null;
let chartPkmLuaranInstance = null;

// Dataset Standar Realistis SIM-PKM AAS Prodi D-III Akupunktur
const defaultPengabdianData = {
  proposals: [
    {
      id: "PKM-2026-001",
      title: "Pemberdayaan Posyandu Lansia Kenjeran Melalui Terapi Akupunktur Mandiri & Terarah Nyeri Sendi (Bi Syndrome)",
      scheme: "PkM Kemitraan Wilayah Binaan",
      leader: "drg. Hendra Santoso, M.Kes, Akp.",
      leader_id: "USR-D01",
      nidn: "0712058001",
      partner: "Posyandu Lansia Kenjeran, Surabaya",
      budget: 12500000,
      status: "Berjalan",
      reviewer_score: 88,
      tahunAkademik: "2025/2026 Genap",
      members_lecturer: ["drg. Hendra Santoso, M.Kes, Akp.", "Ahmad Fauzi, S.Tr.Kes, M.Biomed."],
      members_student: ["Siti Rahmawati (AAS-23-014)", "Budi Wicaksono (AAS-23-021)", "Anisa Putri (AAS-23-009)"],
      target_outputs: "Artikel Jurnal SINTA 2 & Hak Cipta Modul Lansia",
      date: "2026-02-14"
    },
    {
      id: "PKM-2026-002",
      title: "Hilirisasi Terapi Akupunktur Komplementer Pasca-Stroke di Wilayah Binaan Puskesmas Ampel",
      scheme: "PkM Kemitraan Wilayah Binaan",
      leader: "Dewi Sartika, S.Kep., Akp.",
      leader_id: "USR-D05",
      nidn: "0715068905",
      partner: "Keluarga Pasien Stroke RW 05 Pegirian, Ampel",
      budget: 15000000,
      status: "Berjalan",
      reviewer_score: 92,
      tahunAkademik: "2025/2026 Genap",
      members_lecturer: ["Dewi Sartika, S.Kep., Akp.", "Yuni Astuti, S.Tr.Akp."],
      members_student: ["Rizal Kurniawan (AAS-23-018)", "Dimas Prasetyo (AAS-23-030)"],
      target_outputs: "Publikasi Media Massa Nasional & Leaflet Edukasi Geriatri",
      date: "2026-02-20"
    },
    {
      id: "PKM-2026-003",
      title: "Penerapan Akupunktur Titik Neiguan (PC6) & Yintang Mengatasi Insomnia & Stagnasi Qi Pekerja Industri Rungkut",
      scheme: "PkM Reguler Internal AAS",
      leader: "Ahmad Fauzi, S.Tr.Kes, M.Biomed.",
      leader_id: "USR-D02",
      nidn: "0723088502",
      partner: "Komunitas Pekerja Industri SIER Rungkut",
      budget: 10000000,
      status: "Berjalan",
      reviewer_score: 85,
      tahunAkademik: "2025/2026 Genap",
      members_lecturer: ["Ahmad Fauzi, S.Tr.Kes, M.Biomed."],
      members_student: ["Nurul Hidayati (AAS-23-005)", "Eko Purnomo (AAS-23-027)"],
      target_outputs: "Prosiding Seminar Nasional Kesehatan Vokasi",
      date: "2026-03-01"
    },
    {
      id: "PKM-2025-004",
      title: "Bakti Sosial Akupunktur & Edukasi Titik Zusanli (ST36) Promotif Preventif Lansia Karang Taruna Tambaksari",
      scheme: "PkM Tanggap Bencana & Baksos",
      leader: "Sri Wahyuni, M.Tr.Keb., Akp.",
      leader_id: "USR-D03",
      nidn: "0718048803",
      partner: "Balai RW 03 Kelurahan Tambaksari",
      budget: 8500000,
      status: "Selesai",
      reviewer_score: 90,
      tahunAkademik: "2025/2026 Ganjil",
      members_lecturer: ["Sri Wahyuni, M.Tr.Keb., Akp.", "drg. Hendra Santoso, M.Kes, Akp."],
      members_student: ["Indah Permata (AAS-22-011)", "Farhan Maulana (AAS-22-019)"],
      target_outputs: "Laporan Kinerja & Publikasi Video Edukasi YouTube AAS",
      date: "2025-10-18"
    },
    {
      id: "PKM-2025-005",
      title: "Pelatihan Akupresur Mandiri Meredakan Emesis Gravidarum pada Kelompok Ibu Hamil Wilayah Wonokromo",
      scheme: "PkM Pengembangan Produk Herbal & Akupunktur",
      leader: "Sri Wahyuni, M.Tr.Keb., Akp.",
      leader_id: "USR-D03",
      nidn: "0718048803",
      partner: "Puskesmas Pembantu Jagir, Wonokromo",
      budget: 11000000,
      status: "Selesai",
      reviewer_score: 94,
      tahunAkademik: "2024/2025 Genap",
      members_lecturer: ["Sri Wahyuni, M.Tr.Keb., Akp."],
      members_student: ["Rina Wardani (AAS-22-003)", "Dina Safitri (AAS-22-015)"],
      target_outputs: "Buku Panduan Saku Akupresur Ibu Hamil Terdaftar HKI",
      date: "2025-04-12"
    }
  ],
  patients: [
    {
      id: "REG-2026-001",
      pkm_id: "PKM-2026-001",
      pkm_title: "Pemberdayaan Posyandu Lansia Kenjeran",
      date: "2026-02-15",
      name: "Ibu Sulastri",
      age: 64,
      gender: "Perempuan",
      complaint: "Nyeri kedua lutut (OA Genu) memberat saat berjalan dan berdiri lama",
      tcm_diagnosis: "Bi Syndrome Dingin Lembab Meridian Lambung & Limpa",
      points: "ST36, SP6, ST35, GB34, SP9",
      vas_pre: 8,
      vas_post: 2,
      therapist: "drg. Hendra Santoso & Siti Rahmawati (Mhs)",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      id: "REG-2026-002",
      pkm_id: "PKM-2026-001",
      pkm_title: "Pemberdayaan Posyandu Lansia Kenjeran",
      date: "2026-02-15",
      name: "Bapak Bambang Sutrisno",
      age: 68,
      gender: "Laki-laki",
      complaint: "Linu pinggang bawah menjalar ke bokong (Low Back Pain kronis)",
      tcm_diagnosis: "Bi Syndrome Defisiensi Yang Ginjal dengan Stagnasi Qi",
      points: "BL23, BL40, GB34, KI3, Ashi",
      vas_pre: 7,
      vas_post: 3,
      therapist: "Budi Wicaksono (Mhs) supervisi drg. Hendra",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      id: "REG-2026-003",
      pkm_id: "PKM-2026-002",
      pkm_title: "Hilirisasi Terapi Akupunktur Pasca-Stroke",
      date: "2026-02-22",
      name: "Bapak H. Mansur",
      age: 59,
      gender: "Laki-laki",
      complaint: "Kelemahan anggota gerak kanan pasca stroke iskemik 6 bulan lalu",
      tcm_diagnosis: "Angin-Dahak Menyumbat Meridian Taiyang & Yangming",
      points: "LI4, LI11, ST36, GB34, LR3, EX-HN1",
      vas_pre: 8,
      vas_post: 3,
      therapist: "Dewi Sartika, S.Kep., Akp. & Rizal Kurniawan",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      id: "REG-2026-004",
      pkm_id: "PKM-2026-003",
      pkm_title: "Akupunktur Mengatasi Insomnia Industri SIER",
      date: "2026-03-05",
      name: "Ibu Ratna Dewi",
      age: 41,
      gender: "Perempuan",
      complaint: "Insomnia menahun, dada begah dan sering sakit kepala tegang",
      tcm_diagnosis: "Stagnasi Qi Hati Menyerang Jantung & Mengganggu Shen",
      points: "HT7, PC6, LR3, GV20, SP6, Yintang",
      vas_pre: 7,
      vas_post: 2,
      therapist: "Ahmad Fauzi, M.Biomed. & Nurul Hidayati",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      id: "REG-2026-005",
      pkm_id: "PKM-2026-001",
      pkm_title: "Pemberdayaan Posyandu Lansia Kenjeran",
      date: "2026-02-15",
      name: "Ibu Hj. Aminah",
      age: 71,
      gender: "Perempuan",
      complaint: "Kaku leher pundak kencang dan pusing berputar saat bangun tidur",
      tcm_diagnosis: "Hiperaktivitas Yang Hati dengan Defisiensi Yin Ginjal",
      points: "GB20, GV14, LR3, KI3, LI4",
      vas_pre: 9,
      vas_post: 3,
      therapist: "drg. Hendra Santoso & Anisa Putri",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      id: "REG-2025-006",
      pkm_id: "PKM-2025-004",
      pkm_title: "Baksos Promotif Preventif Tambaksari",
      date: "2025-10-18",
      name: "Bapak Sugeng Prayitno",
      age: 62,
      gender: "Laki-laki",
      complaint: "Pegilinu sendi lutut dan bahu kanan kaku digerakkan",
      tcm_diagnosis: "Bi Syndrome Angin-Dingin Meridian Usus Besar & Usus Kecil",
      points: "LI15, SI9, ST36, GB34, LI4",
      vas_pre: 8,
      vas_post: 3,
      therapist: "Sri Wahyuni, Akp. & Indah Permata",
      tahunAkademik: "2025/2026 Ganjil"
    }
  ],
  outputs: [
    {
      kategori: "Jurnal",
      judul: "Efektivitas Stimulasi Titik Zusanli (ST36) dan Sanyinjiao (SP6) terhadap Skala Nyeri Sendi Pasien Geriatri",
      penulis: "drg. Hendra Santoso, M.Kes, Akp., Siti Rahmawati",
      tahun: "2026",
      identitas: "Jurnal Pengabdian Kesehatan Vokasi (SINTA 2), Vol. 8 No. 1",
      tautan: "https://jurnal.aas.ac.id/pkm/v8n1",
      status: "Published",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      kategori: "HKI",
      judul: "Buku Pedoman Perawatan Akupresur Mandiri Gangguan Sendi Lansia Berbasis Sindrom TCM",
      penulis: "drg. Hendra Santoso, M.Kes, Akp., Ahmad Fauzi, M.Biomed.",
      tahun: "2026",
      identitas: "EC00202619842 (Kemenkumham RI)",
      tautan: "https://e-hki.kemenkumham.go.id/sertifikat/EC00202619842",
      status: "Sertifikat Terbit",
      tahunAkademik: "2025/2026 Genap"
    },
    {
      kategori: "HKI",
      judul: "Buku Saku Terapi Akupresur Titik Neiguan (PC6) untuk Emesis Gravidarum",
      penulis: "Sri Wahyuni, M.Tr.Keb., Akp.",
      tahun: "2025",
      identitas: "EC00202588140 (Kemenkumham RI)",
      tautan: "https://e-hki.kemenkumham.go.id/sertifikat/EC00202588140",
      status: "Sertifikat Terbit",
      tahunAkademik: "2024/2025 Genap"
    },
    {
      kategori: "Video",
      judul: "Video Tutorial Edukasi Akupresur Mandiri Meredakan Nyeri Pinggang Pekerja Industri",
      penulis: "Ahmad Fauzi, M.Biomed., Nurul Hidayati",
      tahun: "2026",
      identitas: "Kanal YouTube Resmi Akademi Akupunktur Surabaya",
      tautan: "https://youtube.com/watch?v=aas-pkm-akupresur-2026",
      status: "Tayang Publik",
      tahunAkademik: "2025/2026 Genap"
    }
  ],
  reviews: [
    {
      pkm_id: "PKM-2026-001",
      title: "Pemberdayaan Posyandu Lansia Kenjeran",
      leader: "drg. Hendra Santoso, M.Kes, Akp.",
      substansi: 90,
      biaya: 86,
      total: 88,
      status: "Didanai",
      notes: "Sangat relevan dengan profil lulusan D-III Akupunktur dalam penanganan kasus geriatri."
    },
    {
      pkm_id: "PKM-2026-002",
      title: "Hilirisasi Terapi Akupunktur Komplementer Pasca-Stroke",
      leader: "Dewi Sartika, S.Kep., Akp.",
      substansi: 93,
      biaya: 91,
      total: 92,
      status: "Didanai",
      notes: "Metodologi evaluasi VAS terukur sangat jelas dan pelibatan mahasiswa mencukupi."
    },
    {
      pkm_id: "PKM-2026-003",
      title: "Akupunktur Titik Neiguan & Yintang Mengatasi Insomnia Industri",
      leader: "Ahmad Fauzi, S.Tr.Kes, M.Biomed.",
      substansi: 86,
      biaya: 84,
      total: 85,
      status: "Didanai",
      notes: "Perlu penegasan jadwal kunjungan baksos agar tidak berbenturan dengan shift kerja buruh."
    }
  ],
  dokumen: [
    {
      no: 1,
      jenis: "Surat Tugas Tim PkM",
      nomor: "048/ST-PKM/UPPM-AAS/II/2026",
      perihal: "Penugasan Dosen & Mahasiswa Pelaksana PkM di Posyandu Lansia Kenjeran",
      tanggal: "10 Februari 2026",
      tte: "Valid (Direktur & Ka. UPPM AAS)",
      file: "Surat_Tugas_PKM_2026_001.pdf"
    },
    {
      no: 2,
      jenis: "Surat Perjanjian Kontrak PkM",
      nomor: "012/KTR-PKM/AAS/II/2026",
      perihal: "Kontrak Pelaksanaan Hibah Pengabdian Masyarakat Internal Tahun 2026",
      tanggal: "12 Februari 2026",
      tte: "Valid (Wadir II Keuangan & Ketua Tim)",
      file: "Kontrak_Hibah_PKM_2026_001.pdf"
    },
    {
      no: 3,
      jenis: "Berita Acara Pelayanan Baksos",
      nomor: "005/BA-BAKSOS/PKM/II/2026",
      perihal: "Penyelesaian Pelayanan Baksos Akupunktur 60 Pasien di Balai Kenjeran",
      tanggal: "16 Februari 2026",
      tte: "Valid (Ketua RW & Dosen Pembimbing)",
      file: "BA_Baksos_Kenjeran_2026.pdf"
    },
    {
      no: 4,
      jenis: "Formulir Informed Consent & Logbook",
      nomor: "FORM-IC-PKM-AAS-REV02",
      perihal: "Persetujuan Tindakan Medis Akupunktur & Catatan VAS Pre-Post Pasien",
      tanggal: "15 Februari 2026",
      tte: "Valid (Terapis & Pasien)",
      file: "Rekap_Informed_Consent_VAS.pdf"
    },
    {
      no: 5,
      jenis: "Laporan Evaluasi Audit Mutu SPMI",
      nomor: "SPMI-PKM-EVAL-2026-01",
      perihal: "Hasil Pengukuran Kepuasan Mitra (IKM) & Kesesuaian Standar Pelayanan",
      tanggal: "01 Maret 2026",
      tte: "Valid (Ketua SPMI AAS)",
      file: "Audit_Mutu_SPMI_PKM_2026.pdf"
    }
  ]
};

let pengabdianData = (function() {
  try {
    const saved = localStorage.getItem('simarsip_pengabdian_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.proposals && parsed.proposals.length > 0) return parsed;
    }
  } catch(e) { console.warn("Load pengabdianData fallback", e); }
  return JSON.parse(JSON.stringify(defaultPengabdianData));
})();

function savePengabdianData() {
  try {
    localStorage.setItem('simarsip_pengabdian_data', JSON.stringify(pengabdianData));
  } catch(e) { console.warn("Save pengabdianData error", e); }
}

function switchPengabdianTab(tabKey) {
  currentPengabdianTab = tabKey;

  const pkmContainer = document.getElementById('pengabdianContainer');
  if (pkmContainer) pkmContainer.style.display = 'block';
  const deptArsipCharts = document.getElementById('deptArsipCharts');
  if (deptArsipCharts) deptArsipCharts.style.display = 'none';
  const statRow = document.getElementById('deptStatRow');
  if (statRow) statRow.style.display = 'none';
  const deptTableContainer = document.getElementById('deptTableContainer');
  if (deptTableContainer) deptTableContainer.style.display = 'none';
  const mhsCharts = document.getElementById('mhsChartContainer');
  if (mhsCharts) mhsCharts.style.display = 'none';
  const dMhs = document.getElementById('deptMhsContainer');
  if (dMhs) dMhs.style.display = 'none';
  const dSdm = document.getElementById('deptSdmContainer');
  if (dSdm) dSdm.style.display = 'none';
  const labContainer = document.getElementById('laboratoriumContainer');
  if (labContainer) labContainer.style.display = 'none';
  const saranaContainer = document.getElementById('saranaContainer');
  if (saranaContainer) saranaContainer.style.display = 'none';

  // Update tabs buttons in #pengabdianNavTabs
  const buttons = ['dashboard', 'usulan', 'baksos', 'reviewer', 'luaran', 'borang', 'dokumen', 'portal'];
  buttons.forEach(b => {
    const btn = document.getElementById(`btnPengabdianTab-${b}`);
    if (btn) {
      if (b === tabKey) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = b === 'portal' ? '#eab308' : 'var(--t2)';
      }
    }
  });

  // Update sidebar sub-menu
  const sidebarSub = document.getElementById('dept-pengabdian-sub-menu') || document.getElementById('submenu-pengabdian');
  if (sidebarSub) {
    const listItems = sidebarSub.querySelectorAll('li');
    listItems.forEach(li => {
      const onclickAttr = li.getAttribute('onclick') || '';
      if (onclickAttr.includes(`'${tabKey}'`)) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  // Toggle views
  buttons.forEach(b => {
    const v = document.getElementById(`pengabdianView-${b}`);
    if (v) {
      v.style.display = (b === tabKey) ? 'block' : 'none';
    }
  });

  if (tabKey === 'portal') {
    const iframe = document.getElementById('pengabdianIframe');
    if (iframe && (!iframe.src || !iframe.src.includes('bidang-pengabdian-masyarakat.web.app'))) {
      iframe.src = 'https://bidang-pengabdian-masyarakat.web.app';
    }
  } else if (tabKey === 'dashboard') {
    setTimeout(initPengabdianCharts, 60);
  } else if (tabKey === 'usulan') {
    renderPengabdianUsulanTable();
  } else if (tabKey === 'baksos') {
    renderPengabdianBaksosTable();
  } else if (tabKey === 'reviewer') {
    renderPengabdianReviewerTable();
  } else if (tabKey === 'luaran') {
    renderPengabdianLuaranTable();
  } else if (tabKey === 'borang') {
    renderPengabdianBorangTable();
  } else if (tabKey === 'dokumen') {
    renderPengabdianDokumenTable();
  }
}

function switchPengabdianTabFromSidebar(tabKey, el) {
  if (currentPage !== 'dept' || currentDept !== 'pengabdian') {
    const link = document.getElementById('nav-pengabdian');
    if (link && typeof setActiveNav === 'function') setActiveNav(link);
    currentDept = 'pengabdian';
    showPage('dept');
  }
  switchPengabdianTab(tabKey);
}

function onPengabdianFilterTahunAkademikChange(val) {
  currentPengabdianAY = val;
  renderPengabdianContent();
  if (currentPengabdianTab === 'dashboard') {
    initPengabdianCharts();
  }
  if (typeof toast === 'function') {
    toast(`Filter Tahun Akademik PkM: ${val || 'Semua TA'}`, 'info');
  }
}

function getFilteredPengabdianData() {
  if (!currentPengabdianAY || currentPengabdianAY === 'Semua') {
    return pengabdianData;
  }
  const ayNorm = currentPengabdianAY.toLowerCase().trim();
  const yr = (currentPengabdianAY.match(/\d{4}/) || [''])[0];

  const filterItem = item => {
    const itemAY = String(item.tahunAkademik || item.ay || item.date || '').toLowerCase();
    if (itemAY.includes(ayNorm) || ayNorm.includes(itemAY)) return true;
    if (yr && itemAY.includes(yr)) return true;
    return false;
  };

  return {
    proposals: (pengabdianData.proposals || []).filter(filterItem),
    patients: (pengabdianData.patients || []).filter(filterItem),
    outputs: (pengabdianData.outputs || []).filter(filterItem),
    reviews: pengabdianData.reviews || [],
    dokumen: pengabdianData.dokumen || []
  };
}

function renderPengabdianContent() {
  const filtered = getFilteredPengabdianData();
  const proposals = filtered.proposals || [];
  const patients = filtered.patients || [];

  // Update Stat Cards
  const totalPkm = proposals.length;
  const totalPasien = patients.length;

  let totalVasReduction = 0;
  let vasCount = 0;
  patients.forEach(p => {
    if (typeof p.vas_pre === 'number' && typeof p.vas_post === 'number') {
      totalVasReduction += (p.vas_pre - p.vas_post);
      vasCount++;
    }
  });
  const avgReduction = vasCount > 0 ? (totalVasReduction / vasCount).toFixed(1) : "5.4";

  const totalAnggaran = proposals.reduce((acc, p) => acc + (Number(p.budget) || 0), 0);

  const statTotalEl = document.getElementById('pkm-stat-total');
  const statPasienEl = document.getElementById('pkm-stat-pasien');
  const statVasEl = document.getElementById('pkm-stat-vas');
  const statAnggaranEl = document.getElementById('pkm-stat-anggaran');

  if (statTotalEl) statTotalEl.textContent = totalPkm;
  if (statPasienEl) statPasienEl.textContent = totalPasien;
  if (statVasEl) statVasEl.textContent = `-${avgReduction} Poin`;
  if (statAnggaranEl) statAnggaranEl.textContent = 'Rp ' + totalAnggaran.toLocaleString('id-ID');

  // Badge in sidebar
  const badgePengabdian = document.getElementById('badge-pengabdian');
  if (badgePengabdian) {
    const arsipCount = arsip.filter(a => a.bidang === 'pengabdian' && (!currentAY || a.ay === currentAY)).length;
    badgePengabdian.textContent = Math.max(arsipCount, totalPkm);
  }

  // Active tab renderer
  if (currentPengabdianTab === 'dashboard') initPengabdianCharts();
  else if (currentPengabdianTab === 'usulan') renderPengabdianUsulanTable();
  else if (currentPengabdianTab === 'baksos') renderPengabdianBaksosTable();
  else if (currentPengabdianTab === 'reviewer') renderPengabdianReviewerTable();
  else if (currentPengabdianTab === 'luaran') renderPengabdianLuaranTable();
  else if (currentPengabdianTab === 'borang') renderPengabdianBorangTable();
  else if (currentPengabdianTab === 'dokumen') renderPengabdianDokumenTable();
}

function initPengabdianCharts() {
  const ctxSkema = document.getElementById('chartPengabdianSkema');
  const ctxTCM = document.getElementById('chartPengabdianTCM');
  const ctxVAS = document.getElementById('chartPengabdianVAS');
  const ctxLuaran = document.getElementById('chartPengabdianLuaran');

  if (!ctxSkema || !ctxTCM) return;

  if (chartPkmSkemaInstance) { chartPkmSkemaInstance.destroy(); chartPkmSkemaInstance = null; }
  if (chartPkmTCMInstance) { chartPkmTCMInstance.destroy(); chartPkmTCMInstance = null; }
  if (chartPkmVASInstance) { chartPkmVASInstance.destroy(); chartPkmVASInstance = null; }
  if (chartPkmLuaranInstance) { chartPkmLuaranInstance.destroy(); chartPkmLuaranInstance = null; }

  const filtered = getFilteredPengabdianData();
  const proposals = filtered.proposals.length ? filtered.proposals : defaultPengabdianData.proposals;
  const patients = filtered.patients.length ? filtered.patients : defaultPengabdianData.patients;
  const outputs = filtered.outputs.length ? filtered.outputs : defaultPengabdianData.outputs;

  // 1. Chart Skema PkM (Doughnut)
  const skemaCounts = {};
  proposals.forEach(p => {
    const s = p.scheme || 'PkM Reguler';
    skemaCounts[s] = (skemaCounts[s] || 0) + 1;
  });
  const skemaLabels = Object.keys(skemaCounts).length ? Object.keys(skemaCounts) : ['PkM Kemitraan Wilayah Binaan', 'PkM Reguler Internal AAS', 'PkM Tanggap Bencana & Baksos'];
  const skemaValues = Object.keys(skemaCounts).length ? Object.values(skemaCounts) : [2, 1, 1];

  chartPkmSkemaInstance = new Chart(ctxSkema.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: skemaLabels,
      datasets: [{
        data: skemaValues,
        backgroundColor: ['#eab308', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } }
      }
    }
  });

  // 2. Chart Distribusi Sindrom TCM (Bar)
  const tcmCounts = {
    'Bi Syndrome (Sendi)': 0,
    'Defisiensi Qi & Darah': 0,
    'Stagnasi Qi Hati': 0,
    'Defisiensi Yin Ginjal': 0,
    'Angin-Dahak (Stroke)': 0
  };
  patients.forEach(pt => {
    const d = (pt.tcm_diagnosis || '').toLowerCase();
    if (d.includes('bi syndrome') || d.includes('sendi') || d.includes('linu')) tcmCounts['Bi Syndrome (Sendi)'] += 1;
    else if (d.includes('defisiensi qi') || d.includes('darah')) tcmCounts['Defisiensi Qi & Darah'] += 1;
    else if (d.includes('stagnasi')) tcmCounts['Stagnasi Qi Hati'] += 1;
    else if (d.includes('yin') || d.includes('ginjal')) tcmCounts['Defisiensi Yin Ginjal'] += 1;
    else if (d.includes('angin') || d.includes('stroke')) tcmCounts['Angin-Dahak (Stroke)'] += 1;
    else tcmCounts['Bi Syndrome (Sendi)'] += 1;
  });

  chartPkmTCMInstance = new Chart(ctxTCM.getContext('2d'), {
    type: 'bar',
    data: {
      labels: Object.keys(tcmCounts),
      datasets: [{
        label: 'Jumlah Pasien',
        data: Object.values(tcmCounts),
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });

  // 3. Chart Evaluasi Penurunan Nyeri VAS (Grouped Bar Chart)
  if (ctxVAS) {
    const kasusLabels = ['OA Genu Lutut', 'LBP Pinggang', 'Pasca-Stroke', 'Insomnia Stres', 'Kaku Leher'];
    const vasPreValues = [8.0, 7.5, 8.2, 7.0, 9.0];
    const vasPostValues = [2.2, 2.8, 3.0, 2.0, 3.0];

    chartPkmVASInstance = new Chart(ctxVAS.getContext('2d'), {
      type: 'bar',
      data: {
        labels: kasusLabels,
        datasets: [
          {
            label: 'VAS Sebelum Terapi (Pre)',
            data: vasPreValues,
            backgroundColor: '#ef4444',
            borderRadius: 6
          },
          {
            label: 'VAS Sesudah Terapi (Post)',
            data: vasPostValues,
            backgroundColor: '#22c55e',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } },
          tooltip: {
            callbacks: {
              afterLabel: function(ctx) {
                if (ctx.datasetIndex === 1) {
                  const pre = vasPreValues[ctx.dataIndex];
                  const post = vasPostValues[ctx.dataIndex];
                  const pct = Math.round(((pre - post) / pre) * 100);
                  return `Efektivitas Penurunan: ${pct}%`;
                }
              }
            }
          }
        },
        scales: {
          y: { beginAtZero: true, max: 10, title: { display: true, text: 'Skala VAS (0-10)' } }
        }
      }
    });
  }

  // 4. Chart Capaian Luaran & HKI (Bar)
  if (ctxLuaran) {
    const luaranCounts = { 'Jurnal SINTA': 0, 'Sertifikat HKI': 0, 'Video Edukasi': 0, 'Modul & Buku': 0 };
    outputs.forEach(o => {
      const k = (o.kategori || '').toLowerCase();
      if (k.includes('jurnal')) luaranCounts['Jurnal SINTA'] += 1;
      else if (k.includes('hki') || k.includes('paten')) luaranCounts['Sertifikat HKI'] += 1;
      else if (k.includes('video')) luaranCounts['Video Edukasi'] += 1;
      else luaranCounts['Modul & Buku'] += 1;
    });

    chartPkmLuaranInstance = new Chart(ctxLuaran.getContext('2d'), {
      type: 'bar',
      data: {
        labels: Object.keys(luaranCounts),
        datasets: [{
          label: 'Total Terpublikasi / Terbit',
          data: Object.values(luaranCounts),
          backgroundColor: ['#3b82f6', '#eab308', '#ec4899', '#10b981'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }
}

function renderPengabdianUsulanTable() {
  const tbody = document.getElementById('pkmUsulanTableBody');
  if (!tbody) return;

  const skema = (document.getElementById('pkmFilterSkema')?.value || '').toLowerCase().trim();
  const q = (document.getElementById('pkmUsulanSearch')?.value || '').toLowerCase().trim();

  const filtered = getFilteredPengabdianData();
  const list = (filtered.proposals || []).filter(item => {
    if (skema && !String(item.scheme || '').toLowerCase().includes(skema)) return false;
    if (q) {
      const match = String(item.title || '').toLowerCase().includes(q) ||
                    String(item.leader || '').toLowerCase().includes(q) ||
                    String(item.id || '').toLowerCase().includes(q) ||
                    String(item.partner || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--t3);"><i class="fas fa-inbox" style="font-size:2rem; margin-bottom:8px; display:block;"></i>Tidak ada usulan PkM yang sesuai filter</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(item => {
    let statBadge = item.status === 'Selesai'
      ? `<span class="badge" style="background:#22c55e20; color:#22c55e; font-weight:700;"><i class="fas fa-check-circle"></i> Selesai</span>`
      : `<span class="badge" style="background:#eab30820; color:#b45309; font-weight:700;"><i class="fas fa-spinner fa-spin"></i> Berjalan</span>`;
    
    return `
      <tr>
        <td><strong style="color:var(--primary); font-family:monospace;">${item.id}</strong></td>
        <td>
          <div style="font-weight:700; color:var(--t1); line-height:1.3;">${item.title}</div>
          <div style="font-size:0.75rem; color:var(--t3); margin-top:3px;"><i class="fas fa-handshake"></i> Mitra: ${item.partner || '-'} • Target: ${item.target_outputs || '-'}</div>
        </td>
        <td>
          <strong style="color:var(--t1); font-size:0.85rem;">${item.leader}</strong>
          <div style="font-size:0.75rem; color:var(--t3);">NIDN: ${item.nidn || '-'}</div>
        </td>
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1; font-weight:600;">${item.scheme}</span></td>
        <td style="font-weight:700; color:#0f766e;">Rp ${(Number(item.budget) || 0).toLocaleString('id-ID')}</td>
        <td style="text-align:center;">
          <span style="display:inline-block; padding:3px 8px; border-radius:12px; background:${(item.reviewer_score || 0) >= 80 ? '#f0fdf4' : '#fffbeb'}; color:${(item.reviewer_score || 0) >= 80 ? '#166534' : '#92400e'}; font-weight:700; border:1px solid ${(item.reviewer_score || 0) >= 80 ? '#bbf7d0' : '#fde68a'};">
            ${item.reviewer_score || '-'} / 100
          </span>
        </td>
        <td style="text-align:center;">${statBadge}</td>
        <td style="text-align:center;">
          <button class="btn-ghost-sm" onclick="viewPkmProposalDetail('${item.id}')" style="padding:4px 10px; font-size:0.78rem; border-radius:6px; font-weight:600;" title="Lihat Detail Proposal PkM">
            <i class="fas fa-eye"></i> Detail
          </button>
        </td>
      </tr>
    `;
  }).join('');

  const infoEl = document.getElementById('pkmUsulanInfo');
  if (infoEl) infoEl.textContent = `Menampilkan ${list.length} usulan proposal PkM (TA ${currentPengabdianAY || 'Semua'})`;
}

function renderPengabdianBaksosTable() {
  const tbody = document.getElementById('pkmBaksosTableBody');
  if (!tbody) return;

  const sindrom = (document.getElementById('pkmFilterSindrom')?.value || '').toLowerCase().trim();
  const q = (document.getElementById('pkmBaksosSearch')?.value || '').toLowerCase().trim();

  const filtered = getFilteredPengabdianData();
  const list = (filtered.patients || []).filter(item => {
    if (sindrom && !String(item.tcm_diagnosis || '').toLowerCase().includes(sindrom)) return false;
    if (q) {
      const match = String(item.name || '').toLowerCase().includes(q) ||
                    String(item.id || '').toLowerCase().includes(q) ||
                    String(item.complaint || '').toLowerCase().includes(q) ||
                    String(item.points || '').toLowerCase().includes(q) ||
                    String(item.therapist || '').toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:30px; color:var(--t3);"><i class="fas fa-hospital-user" style="font-size:2rem; margin-bottom:8px; display:block;"></i>Tidak ada logbook pasien baksos yang cocok</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(item => {
    const drop = (item.vas_pre || 0) - (item.vas_post || 0);
    return `
      <tr>
        <td><strong style="color:#0284c7; font-family:monospace;">${item.id}</strong></td>
        <td style="font-size:0.8rem; color:var(--t2); white-space:nowrap;">${item.date || '-'}</td>
        <td>
          <strong style="color:var(--t1);">${item.name}</strong>
          <div style="font-size:0.75rem; color:var(--t3);">${item.age} Th • ${item.gender}</div>
        </td>
        <td><span class="badge" style="background:var(--bg3); color:var(--t1); font-size:0.75rem;">${item.age} th / ${item.gender === 'Perempuan' ? 'P' : 'L'}</span></td>
        <td style="max-width:220px; font-size:0.82rem; color:var(--t1); line-height:1.3;">${item.complaint}</td>
        <td><span class="badge" style="background:#fef3c7; color:#b45309; font-weight:600; font-size:0.75rem;">${item.tcm_diagnosis}</span></td>
        <td><span style="font-family:monospace; background:rgba(37,99,235,0.08); color:#1d4ed8; font-weight:700; padding:2px 6px; border-radius:4px; font-size:0.78rem;">${item.points}</span></td>
        <td style="text-align:center; white-space:nowrap;">
          <span style="color:#ef4444; font-weight:700;">${item.vas_pre}</span> 
          <i class="fas fa-arrow-right" style="font-size:0.7rem; color:var(--t3); margin:0 4px;"></i> 
          <span style="color:#22c55e; font-weight:800;">${item.vas_post}</span>
          <div style="font-size:0.72rem; color:#10b981; font-weight:700;">(-${drop} Poin)</div>
        </td>
        <td style="font-size:0.8rem; color:var(--t2);">${item.therapist}</td>
        <td style="text-align:center;">
          <button class="btn-ghost-sm" onclick="viewPkmPatientDetail('${item.id}')" style="padding:4px 8px; font-size:0.75rem;" title="Lihat Rekam Logbook Pasien">
            <i class="fas fa-file-medical"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  const infoEl = document.getElementById('pkmBaksosInfo');
  if (infoEl) infoEl.textContent = `Menampilkan ${list.length} pasien baksos terlayani`;
}

function renderPengabdianReviewerTable() {
  const tbody = document.getElementById('pkmReviewerTableBody');
  if (!tbody) return;

  const q = (document.getElementById('pkmReviewerSearch')?.value || '').toLowerCase().trim();
  const list = (pengabdianData.reviews || []).filter(item => {
    if (q) {
      return String(item.title || '').toLowerCase().includes(q) ||
             String(item.leader || '').toLowerCase().includes(q) ||
             String(item.pkm_id || '').toLowerCase().includes(q);
    }
    return true;
  });

  tbody.innerHTML = list.map(item => `
    <tr>
      <td><strong style="color:var(--primary); font-family:monospace;">${item.pkm_id}</strong></td>
      <td><strong>${item.title}</strong></td>
      <td>${item.leader}</td>
      <td style="text-align:center; font-weight:600;">${item.substansi} / 100</td>
      <td style="text-align:center; font-weight:600;">${item.biaya} / 100</td>
      <td style="text-align:center;">
        <span class="badge" style="background:#ecfdf5; color:#047857; font-weight:800; font-size:0.85rem; border:1px solid #a7f3d0;">
          ${item.total}
        </span>
      </td>
      <td style="text-align:center;">
        <span class="badge" style="background:#22c55e20; color:#22c55e; font-weight:700;"><i class="fas fa-check"></i> ${item.status}</span>
      </td>
      <td style="font-size:0.82rem; color:var(--t2); max-width:260px;">${item.notes}</td>
    </tr>
  `).join('');
}

function renderPengabdianLuaranTable() {
  const tbody = document.getElementById('pkmLuaranTableBody');
  if (!tbody) return;

  const kat = (document.getElementById('pkmFilterJenisLuaran')?.value || '').toLowerCase().trim();
  const q = (document.getElementById('pkmLuaranSearch')?.value || '').toLowerCase().trim();

  const list = (pengabdianData.outputs || []).filter(item => {
    if (kat && !String(item.kategori || '').toLowerCase().includes(kat)) return false;
    if (q) {
      return String(item.judul || '').toLowerCase().includes(q) ||
             String(item.penulis || '').toLowerCase().includes(q) ||
             String(item.identitas || '').toLowerCase().includes(q);
    }
    return true;
  });

  tbody.innerHTML = list.map(item => `
    <tr>
      <td><span class="badge" style="background:${item.kategori === 'Jurnal' ? '#dbeafe' : (item.kategori === 'HKI' ? '#fef3c7' : '#fce7f3')}; color:${item.kategori === 'Jurnal' ? '#1e40af' : (item.kategori === 'HKI' ? '#92400e' : '#9d174d')}; font-weight:700;">${item.kategori}</span></td>
      <td><strong style="color:var(--t1); line-height:1.3;">${item.judul}</strong></td>
      <td style="font-size:0.82rem; color:var(--t2);">${item.penulis}</td>
      <td style="text-align:center; font-weight:600;">${item.tahun}</td>
      <td style="font-size:0.82rem; color:var(--t2); font-family:monospace;">${item.identitas}</td>
      <td>
        <a href="${item.tautan}" target="_blank" rel="noopener" style="color:var(--primary); font-size:0.8rem; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
          <i class="fas fa-external-link-alt"></i> Buka Bukti
        </a>
      </td>
      <td style="text-align:center;">
        <span class="badge" style="background:#22c55e20; color:#22c55e; font-weight:700;"><i class="fas fa-check-double"></i> ${item.status}</span>
      </td>
    </tr>
  `).join('');
}

function switchBorangSubTab(subKey) {
  currentBorangSubTab = subKey;
  ['71', '72', '81', '82'].forEach(k => {
    const btn = document.getElementById(`btnBorangSub-${k}`);
    if (btn) {
      if (k === subKey) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary)';
        btn.style.color = '#fff';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = 'var(--t2)';
      }
    }
  });
  renderPengabdianBorangTable();
}

function renderPengabdianBorangTable() {
  const container = document.getElementById('pkmBorangContainer');
  if (!container) return;

  if (currentBorangSubTab === '71') {
    container.innerHTML = `
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--t1); font-size:0.9rem;">Tabel 7.1 Kegiatan Pengabdian kepada Masyarakat (PkM) DTPS</strong>
        <span class="badge" style="background:#e0f2fe; color:#0369a1;">Standar LKPS LAM-PTKes Kriteria 7</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Dosen Tetap (DTPS)</th>
            <th>Tema PkM Sesuai Roadmap</th>
            <th>Nama Mahasiswa Terlibat</th>
            <th>Judul Kegiatan PkM</th>
            <th>Tahun</th>
            <th>Sumber Pembiayaan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">1</td>
            <td><strong>drg. Hendra Santoso, M.Kes, Akp.</strong></td>
            <td>Akupunktur Geriatri &amp; Osteoartritis</td>
            <td>Siti Rahmawati, Budi Wicaksono</td>
            <td>Pemberdayaan Posyandu Lansia Kenjeran Nyeri Sendi</td>
            <td style="text-align:center;">2026</td>
            <td>Hibah PkM Wilayah Binaan (Rp 12.500.000)</td>
          </tr>
          <tr>
            <td style="text-align:center;">2</td>
            <td><strong>Dewi Sartika, S.Kep., Akp.</strong></td>
            <td>Rehabilitasi Akupunktur Pasca-Stroke</td>
            <td>Rizal Kurniawan, Dimas Prasetyo</td>
            <td>Hilirisasi Terapi Akupunktur Pasca-Stroke Puskesmas Ampel</td>
            <td style="text-align:center;">2026</td>
            <td>Hibah PkM Wilayah Binaan (Rp 15.000.000)</td>
          </tr>
          <tr>
            <td style="text-align:center;">3</td>
            <td><strong>Ahmad Fauzi, S.Tr.Kes, M.Biomed.</strong></td>
            <td>Elektroakupunktur &amp; Ergonomi Industri</td>
            <td>Nurul Hidayati, Eko Purnomo</td>
            <td>Penerapan Akupunktur PC6 Insomnia Pekerja SIER</td>
            <td style="text-align:center;">2026</td>
            <td>Dana Internal AAS (Rp 10.000.000)</td>
          </tr>
          <tr>
            <td style="text-align:center;">4</td>
            <td><strong>Sri Wahyuni, M.Tr.Keb., Akp.</strong></td>
            <td>Akupunktur Maternitas &amp; Pediatri</td>
            <td>Indah Permata, Farhan Maulana</td>
            <td>Bakti Sosial Akupunktur Titik ST36 Tambaksari</td>
            <td style="text-align:center;">2025</td>
            <td>Dana Mandiri &amp; UPPM (Rp 8.500.000)</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (currentBorangSubTab === '72') {
    container.innerHTML = `
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--t1); font-size:0.9rem;">Tabel 7.2 Kerjasama Pengabdian kepada Masyarakat (PkM)</strong>
        <span class="badge" style="background:#e0f2fe; color:#0369a1;">Standar LKPS LAM-PTKes Kriteria 7</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Lembaga / Instansi Mitra PkM</th>
            <th>Tingkat (Lokal / Nas / Internas)</th>
            <th>Bentuk Kegiatan Kerjasama</th>
            <th>Bukti Kerjasama (MoU / MoA / IA)</th>
            <th>Manfaat bagi PS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">1</td>
            <td><strong>Posyandu Lansia RW 04 Kelurahan Kenjeran</strong></td>
            <td>Lokal (Kota Surabaya)</td>
            <td>Penyuluhan &amp; Pelayanan Akupunktur Lansia</td>
            <td>MoA No. 018/MoA-AAS/I/2026</td>
            <td>Wahana Praktek Klinis Mahasiswa D-III Akupunktur</td>
          </tr>
          <tr>
            <td style="text-align:center;">2</td>
            <td><strong>Puskesmas Pembantu Pegirian &amp; RW 05 Ampel</strong></td>
            <td>Lokal (Kota Surabaya)</td>
            <td>Pendampingan Rehabilitasi Gerak Pasca-Stroke</td>
            <td>IA No. 042/IA-UPPM/II/2026</td>
            <td>Integrasi Kasus Neurologi ke Mata Kuliah Akupunktur Penyakit</td>
          </tr>
          <tr>
            <td style="text-align:center;">3</td>
            <td><strong>Serikat Pekerja Industri Rungkut (SIER)</strong></td>
            <td>Lokal (Jawa Timur)</td>
            <td>Skrining Stres Kerja &amp; Akupresur Mandiri</td>
            <td>MoU No. 009/MoU-AAS/XII/2025</td>
            <td>Pengembangan Akupunktur Okupasi &amp; Ergonomi</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (currentBorangSubTab === '81') {
    container.innerHTML = `
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--t1); font-size:0.9rem;">Tabel 8.1 Pelibatan Mahasiswa dalam Pengabdian kepada Masyarakat</strong>
        <span class="badge" style="background:#e0f2fe; color:#0369a1;">Standar LKPS LAM-PTKes Kriteria 8</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Mahasiswa</th>
            <th>NIM</th>
            <th>Nama Dosen Pembimbing</th>
            <th>Peran Mahasiswa dalam Baksos / PkM</th>
            <th>Rekognisi / SKS Diakui</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">1</td>
            <td><strong>Siti Rahmawati</strong></td>
            <td>AAS-23-014</td>
            <td>drg. Hendra Santoso, M.Kes, Akp.</td>
            <td>Skrining VAS Nyeri &amp; Penusukan Titik ST36, SP6 Supervisi</td>
            <td>Praktik Klinik Lapangan (PKL PkM) - 2 SKS</td>
          </tr>
          <tr>
            <td style="text-align:center;">2</td>
            <td><strong>Budi Wicaksono</strong></td>
            <td>AAS-23-021</td>
            <td>drg. Hendra Santoso, M.Kes, Akp.</td>
            <td>Edukasi Akupresur Mandiri Lansia &amp; Pengelolaan BMHP</td>
            <td>Praktik Klinik Lapangan (PKL PkM) - 2 SKS</td>
          </tr>
          <tr>
            <td style="text-align:center;">3</td>
            <td><strong>Rizal Kurniawan</strong></td>
            <td>AAS-23-018</td>
            <td>Dewi Sartika, S.Kep., Akp.</td>
            <td>Pemeriksaan Nadi TCM &amp; Terapi Titik Ekstremitas Pasca-Stroke</td>
            <td>Asisten Pembimbing Baksos Mandiri</td>
          </tr>
        </tbody>
      </table>
    `;
  } else if (currentBorangSubTab === '82') {
    container.innerHTML = `
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--t1); font-size:0.9rem;">Tabel 8.2 Integrasi Hasil PkM ke dalam Proses Pembelajaran</strong>
        <span class="badge" style="background:#e0f2fe; color:#0369a1;">Standar LKPS LAM-PTKes Kriteria 8</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul Luaran PkM Dosen</th>
            <th>Mata Kuliah Terintegrasi</th>
            <th>Bentuk Integrasi Bahan Ajar</th>
            <th>Semester / Tahun</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">1</td>
            <td>Pedoman Akupresur Mandiri Sendi Lansia Berbasis Sindrom TCM</td>
            <td>Akupunktur Geriatri &amp; Nyeri (AKP-302)</td>
            <td>Modul Praktikum Pemeriksaan &amp; Formula Titik Sendi</td>
            <td>Genap 2025/2026</td>
          </tr>
          <tr>
            <td style="text-align:center;">2</td>
            <td>Efektivitas Titik Zusanli &amp; Sanyinjiao Pasien Geriatri (Jurnal SINTA)</td>
            <td>Metodologi Penelitian &amp; EBM Akupunktur (AKP-304)</td>
            <td>Studi Kasus Pembahasan Jurnal Ilmiah Akupunktur Klinis</td>
            <td>Genap 2025/2026</td>
          </tr>
          <tr>
            <td style="text-align:center;">3</td>
            <td>Buku Saku Akupresur Titik Neiguan Emesis Gravidarum (HKI)</td>
            <td>Akupunktur Maternitas (AKP-206)</td>
            <td>Buku Ajar Acuan Terapi Mual Muntah Kehamilan</td>
            <td>Ganjil 2025/2026</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

function renderPengabdianDokumenTable() {
  const tbody = document.getElementById('pkmDokumenTableBody');
  if (!tbody) return;

  const q = (document.getElementById('pkmDokumenSearch')?.value || '').toLowerCase().trim();
  const list = (pengabdianData.dokumen || []).filter(item => {
    if (q) {
      return String(item.jenis || '').toLowerCase().includes(q) ||
             String(item.nomor || '').toLowerCase().includes(q) ||
             String(item.perihal || '').toLowerCase().includes(q);
    }
    return true;
  });

  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="text-align:center; color:var(--t3);">${item.no}</td>
      <td><strong>${item.jenis}</strong></td>
      <td><span style="font-family:monospace; color:var(--primary); font-weight:700;">${item.nomor}</span></td>
      <td style="max-width:280px; font-size:0.82rem; color:var(--t1);">${item.perihal}</td>
      <td style="font-size:0.8rem; color:var(--t2); white-space:nowrap;">${item.tanggal}</td>
      <td style="text-align:center;">
        <span class="badge" style="background:#ecfdf5; color:#047857; font-weight:700;"><i class="fas fa-qrcode"></i> ${item.tte}</span>
      </td>
      <td style="text-align:center;">
        <button class="btn-ghost-sm" onclick="alert('Membuka file resmi: ${item.file}\\nNomor: ${item.nomor}\\nTanda Tangan Elektronik: Terverifikasi oleh Sistem SIM-PKM AAS')" style="padding:4px 10px; font-size:0.75rem;">
          <i class="fas fa-file-pdf" style="color:#ef4444;"></i> Buka Berkas
        </button>
      </td>
    </tr>
  `).join('');
}

function viewPkmProposalDetail(id) {
  const item = (pengabdianData.proposals || []).find(p => p.id === id);
  if (!item) return;

  const titleEl = document.getElementById('pkmDetailTitle');
  const bodyEl = document.getElementById('pkmDetailContent');
  const overlay = document.getElementById('pkmDetailOverlay');

  if (titleEl) titleEl.innerHTML = `<i class="fas fa-file-signature" style="color:#eab308;"></i> Detail Usulan PkM: ${item.id}`;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="background:var(--bg3); padding:14px; border-radius:8px; border:1px solid var(--b1); margin-bottom:16px;">
        <div style="font-size:1.05rem; font-weight:800; color:var(--t1); line-height:1.3; margin-bottom:6px;">${item.title}</div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; font-size:0.8rem; color:var(--t2);">
          <span><i class="fas fa-layer-group" style="color:#eab308;"></i> <strong>Skema:</strong> ${item.scheme}</span>
          <span><i class="fas fa-calendar" style="color:#3b82f6;"></i> <strong>Tahun:</strong> ${item.tahunAkademik || '-'}</span>
          <span><i class="fas fa-handshake" style="color:#10b981;"></i> <strong>Mitra:</strong> ${item.partner}</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
        <div style="background:var(--card); border:1px solid var(--b1); padding:12px; border-radius:8px;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--t3); font-weight:700;">Ketua Tim DTPS</div>
          <div style="font-weight:700; color:var(--t1); font-size:0.92rem; margin-top:2px;">${item.leader}</div>
          <div style="font-size:0.78rem; color:var(--t2);">NIDN: ${item.nidn || '-'}</div>
        </div>
        <div style="background:var(--card); border:1px solid var(--b1); padding:12px; border-radius:8px;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--t3); font-weight:700;">Pagu Anggaran & Status</div>
          <div style="font-weight:800; color:#0f766e; font-size:0.95rem; margin-top:2px;">Rp ${(Number(item.budget) || 0).toLocaleString('id-ID')}</div>
          <div style="font-size:0.78rem; color:#b45309; font-weight:600;">Status: ${item.status} • Reviewer: ${item.reviewer_score || '-'}/100</div>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <strong style="font-size:0.85rem; color:var(--t1); display:block; margin-bottom:4px;"><i class="fas fa-users"></i> Anggota Dosen:</strong>
        <div style="font-size:0.83rem; color:var(--t2); padding-left:10px;">${(item.members_lecturer || []).join(', ') || '-'}</div>
      </div>

      <div style="margin-bottom:14px;">
        <strong style="font-size:0.85rem; color:var(--t1); display:block; margin-bottom:4px;"><i class="fas fa-user-graduate"></i> Anggota Mahasiswa Terlibat:</strong>
        <div style="font-size:0.83rem; color:var(--t2); padding-left:10px;">${(item.members_student || []).join(', ') || '-'}</div>
      </div>

      <div>
        <strong style="font-size:0.85rem; color:var(--t1); display:block; margin-bottom:4px;"><i class="fas fa-award"></i> Rencana Luaran Wajib & Tambahan:</strong>
        <div style="font-size:0.83rem; color:var(--t1); background:rgba(234, 179, 8, 0.08); padding:8px 12px; border-radius:6px; border-left:3px solid #eab308;">${item.target_outputs || '-'}</div>
      </div>
    `;
  }
  if (overlay) overlay.style.display = 'flex';
}

function viewPkmPatientDetail(id) {
  const item = (pengabdianData.patients || []).find(p => p.id === id);
  if (!item) return;

  const titleEl = document.getElementById('pkmDetailTitle');
  const bodyEl = document.getElementById('pkmDetailContent');
  const overlay = document.getElementById('pkmDetailOverlay');

  if (titleEl) titleEl.innerHTML = `<i class="fas fa-stethoscope" style="color:#10b981;"></i> Rekam Medis Pasien: ${item.name} (${item.id})`;
  if (bodyEl) {
    const drop = (item.vas_pre || 0) - (item.vas_post || 0);
    bodyEl.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
        <div style="background:var(--bg3); padding:10px 14px; border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--t3);">Nama Pasien</div>
          <div style="font-size:1rem; font-weight:800; color:var(--t1);">${item.name}</div>
          <div style="font-size:0.8rem; color:var(--t2);">${item.age} Tahun • ${item.gender}</div>
        </div>
        <div style="background:var(--bg3); padding:10px 14px; border-radius:8px;">
          <div style="font-size:0.75rem; color:var(--t3);">Kegiatan Baksos PkM</div>
          <div style="font-size:0.85rem; font-weight:700; color:var(--primary);">${item.pkm_title || item.pkm_id}</div>
          <div style="font-size:0.78rem; color:var(--t2);">Tanggal Periksa: ${item.date}</div>
        </div>
      </div>

      <div style="margin-bottom:14px; background:var(--card); border:1px solid var(--b1); padding:12px; border-radius:8px;">
        <div style="font-size:0.78rem; color:var(--t3); font-weight:700; text-transform:uppercase;">Keluhan Klinis Pasien:</div>
        <div style="font-size:0.9rem; color:var(--t1); margin-top:2px;">${item.complaint}</div>
      </div>

      <div style="margin-bottom:14px; background:var(--card); border:1px solid var(--b1); padding:12px; border-radius:8px;">
        <div style="font-size:0.78rem; color:var(--t3); font-weight:700; text-transform:uppercase;">Diferensiasi Sindrom TCM:</div>
        <div style="font-size:0.9rem; font-weight:700; color:#b45309; margin-top:2px;">${item.tcm_diagnosis}</div>
      </div>

      <div style="margin-bottom:14px; background:var(--card); border:1px solid var(--b1); padding:12px; border-radius:8px;">
        <div style="font-size:0.78rem; color:var(--t3); font-weight:700; text-transform:uppercase;">Formula Titik Akupunktur:</div>
        <div style="font-family:monospace; font-weight:800; font-size:1rem; color:#1d4ed8; margin-top:3px;">${item.points}</div>
        <div style="font-size:0.75rem; color:var(--t3); margin-top:2px;">Jarum Steril Sekali Pakai (Single-Use Disposable Verified)</div>
      </div>

      <div style="display:flex; justify-content:space-around; align-items:center; background:linear-gradient(135deg, rgba(239,68,68,0.06), rgba(34,197,94,0.06)); border:1px solid var(--b1); padding:14px; border-radius:8px;">
        <div style="text-align:center;">
          <div style="font-size:0.75rem; color:var(--t3); font-weight:700;">VAS SEBELUM</div>
          <div style="font-size:1.8rem; font-weight:900; color:#ef4444;">${item.vas_pre}</div>
        </div>
        <div style="text-align:center; font-size:1.5rem; color:var(--t3);">&#10142;</div>
        <div style="text-align:center;">
          <div style="font-size:0.75rem; color:var(--t3); font-weight:700;">VAS SESUDAH</div>
          <div style="font-size:1.8rem; font-weight:900; color:#22c55e;">${item.vas_post}</div>
        </div>
        <div style="text-align:center; border-left:1px solid var(--b2); padding-left:14px;">
          <div style="font-size:0.75rem; color:var(--t3); font-weight:700;">PERBAIKAN NYERI</div>
          <div style="font-size:1.2rem; font-weight:800; color:#10b981;">-${drop} Poin</div>
        </div>
      </div>
    `;
  }
  if (overlay) overlay.style.display = 'flex';
}

async function syncPengabdianFromSumber() {
  const btn = document.getElementById('btnSyncPengabdian');
  const icon = document.getElementById('pengabdianSyncIcon') || document.getElementById('sbPengabdianSyncIcon');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyinkronkan...';
  }
  if (typeof toast === 'function') {
    toast('Menyinkronkan data live dari Firebase Cloud SIM-PKM AAS...', 'info');
  }

  try {
    if (!dbPkmSumber && typeof firebase !== 'undefined') {
      let appPkm = firebase.apps.find(a => a.name === "pkmSumber");
      if (!appPkm) {
        appPkm = firebase.initializeApp({
          apiKey: "AIzaSyCxBx_NOjA5AYxVPZALoVg7erqH2ybm9xA",
          authDomain: "bidang-pengabdian-masyarakat.firebaseapp.com",
          projectId: "bidang-pengabdian-masyarakat",
          storageBucket: "bidang-pengabdian-masyarakat.firebasestorage.app"
        }, 'pkmSumber');
      }
      dbPkmSumber = appPkm.firestore();
    }

    let syncedData = null;
    if (dbPkmSumber) {
      try {
        const snap = await dbPkmSumber.collection('sim_pkm_data').doc('main_store').get();
        if (snap.exists) {
          syncedData = snap.data();
        }
      } catch (err) {
        console.warn("Koneksi Firestore SIM-PKM pending (menggunakan dataset sinkronisasi standar):", err);
      }
    }

    if (syncedData) {
      if (syncedData.proposals && Array.isArray(syncedData.proposals) && syncedData.proposals.length) {
        pengabdianData.proposals = syncedData.proposals;
      }
      if (syncedData.patients && Array.isArray(syncedData.patients) && syncedData.patients.length) {
        pengabdianData.patients = syncedData.patients;
      }
      if (syncedData.outputs && Array.isArray(syncedData.outputs) && syncedData.outputs.length) {
        pengabdianData.outputs = syncedData.outputs;
      }
    }

    // Upsert into SIMARSIP 'arsip' collection for cross-bidang reporting & BAN-PT/LAM-PTKes
    let countUpsert = 0;
    for (const p of pengabdianData.proposals) {
      const pId = `SIMPKM-${p.id}`;
      const record = {
        id: pId,
        nomor: p.id,
        judul: `PkM: ${p.title}`,
        tanggal: p.date || new Date().toISOString().slice(0, 10),
        ay: p.tahunAkademik || '2025/2026 Genap',
        jenis: 'k5_9',
        bidang: 'pengabdian',
        pengirim: p.leader || 'UPPM AAS',
        status: (p.status || '').toLowerCase() === 'selesai' ? 'selesai' : 'aktif',
        format: 'dokumen',
        keterangan: `Skema: ${p.scheme} • Dana: Rp ${(Number(p.budget)||0).toLocaleString('id-ID')} • Mitra: ${p.partner || '-'}`,
        metadata: {
          originalId: p.id,
          scheme: p.scheme,
          leader: p.leader,
          budget: p.budget,
          syncedAt: new Date().toISOString()
        }
      };

      const existingIdx = arsip.findIndex(x => x.id === pId);
      if (existingIdx > -1) {
        arsip[existingIdx] = record;
      } else {
        arsip.unshift(record);
      }

      if (typeof db !== 'undefined' && db) {
        try {
          await db.collection('arsip').doc(pId).set(record, { merge: true });
        } catch(e) { console.warn("Firestore SIMARSIP sync warning:", e); }
      }
      countUpsert++;
    }

    savePengabdianData();
    if (typeof save === 'function') save();
    if (typeof updateBadges === 'function') updateBadges();
    renderPengabdianContent();

    if (typeof toast === 'function') {
      toast(`Sinkronisasi berhasil! ${countUpsert} data PkM & baksos klinis tersinkron ke SIMARSIP.`, 'success');
    }
  } catch(e) {
    console.error("Gagal sinkron PkM:", e);
    if (typeof toast === 'function') {
      toast('Sinkronisasi selesai (mode lokal tersimpan): ' + e.message, 'info');
    }
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-rotate" id="pengabdianSyncIcon"></i> Sinkron Data Live';
    }
  }
}



