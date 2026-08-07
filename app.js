

/* ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ
   SIMARSIP  ÔÇö  app.js  v3.0
   Akademi Akupunktur Surabaya
   ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */
'use strict';

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
            "group": "Mahasiswa",
            "items": [
                {
                    "val": "k4_1",
                    "label": "Peraturan tentang kebijakan seleksi dan penerimaan: penyelarasan dengan misi dan akreditasi/persyaratan, publisitas/sosialisasi, peninjauan, dan revisi."
                },
                {
                    "val": "k4_2",
                    "label": "Kebijakan, peraturan, prosedur dukungan/layanan mahasiswa, dan keselamatan lingkungan kerja"
                },
                {
                    "val": "k4_3",
                    "label": "Kebijakan, peraturan, dan prosedur konseling mahasiswa."
                },
                {
                    "val": "k4_4",
                    "label": "Pendukung sumber daya manusia, fasilitas, dan keuangan untuk sistem pendukung/layanan mahasiswa."
                },
                {
                    "val": "k4_5",
                    "label": "Monitoring dan evaluasi penerapan sistem pendukung/layanan kemahasiswaan."
                },
                {
                    "val": "k4_6",
                    "label": "Dokumen hasil survey kepuasaan mahasiswa terhadap layanan mahasiswa."
                },
                {
                    "val": "k4_8",
                    "label": "Kebijakan, peraturan mengenai \u2018kampus sehat\u2019 termasuk bebas dari kekerasan seksual, perundungan, intoleransi, bebas dari rokok dan narkotika."
                },
                {
                    "val": "k4_10",
                    "label": "Pemantauan dan evaluasi penerapan sistem pendukung mahasiswa dan keselamatan lingkungan kerja."
                }
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

/* ÔöÇÔöÇÔöÇ STATE ÔöÇÔöÇÔöÇ */
let arsip    = [];
let currentDeptSub = 'all';

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
    
    if (DEPT_JENIS[deptId]) {
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
  renderDeptPage(deptId);
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
  else if (collectionName === 'mahasiswa') { mahasiswa = data; }
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
  const groups = DEPT_JENIS[bidang] || [];
  let found = null;
  for (let group of groups) {
    if (group.items) {
      let item = group.items.find(t => t.val === jenis);
      if (item) { found = item.label; break; }
    }
  }

  return found || jenis.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
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

        await db.collection('laporan_it').add({
            pelaporId: user.uid,
            pelaporNama: pelaporNama,
            pelaporEmail: user.email,
            kategori: kategori,
            deskripsi: deskripsi,
            status: 'Menunggu',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
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
