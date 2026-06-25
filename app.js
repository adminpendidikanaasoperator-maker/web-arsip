
const firebaseConfig = {
  apiKey: "AIzaSyCdOtyCix06Cty82u7ls1YT-WhKcUMpjIo",
  authDomain: "arsip-aas.firebaseapp.com",
  projectId: "arsip-aas",
  storageBucket: "arsip-aas.firebasestorage.app",
  messagingSenderId: "958092839381",
  appId: "1:958092839381:web:ba6936a7a4fccc11bfd55c"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

/* ═══════════════════════════════════════════════════════════════
   SIMARSIP  —  app.js  v3.0
   Akademi Akupunktur Surabaya
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ─── STORAGE KEYS ─── */
const SK  = 'aas_arsip_v3';
const SAK = 'aas_activity_v3';
const SK_MHS = 'aas_mhs_v3';
const SK_SDM = 'aas_sdm_v3';

/* ─── GOOGLE APPS SCRIPT URL ─── */
// Paste URL "Web app" dari Google Apps Script di sini setelah melakukan Deployment.
// Contoh: 'https://script.google.com/macros/s/AKfycby.../exec'
const GAS_URL = 'https://script.google.com/macros/s/AKfycbygsAY90lqF2Ax1SzWZ7NGMpPPWMhYa8kwwvzFJn9hVJVmY8BqWXhC1v-SpRTTuqHfSzA/exec'; 

/* ─── DEPARTEMEN ─── */
const DEPT = {
  keuangan:     { label:'Keuangan',          icon:'fas fa-coins',          color:'#f59e0b' },
  pendidikan:   { label:'Pendidikan',         icon:'fas fa-graduation-cap', color:'#3b82f6' },
  perpustakaan: { label:'Perpustakaan',       icon:'fas fa-book',           color:'#8b5cf6' },
  kemahasiswaan:{ label:'Kemahasiswaan',      icon:'fas fa-users',          color:'#10b981' },
  sdm:          { label:'SDM & Kepegawaian',  icon:'fas fa-user-tie',       color:'#ec4899' },
  sarana:       { label:'Sarana & Prasarana', icon:'fas fa-building',       color:'#f97316' },
  humas:        { label:'Humas',              icon:'fas fa-bullhorn',       color:'#06b6d4' },
  lppm:         { label:'LPPM (Penelitian & PkM)', icon:'fas fa-flask',     color:'#14b8a6' },
};

/* ─── JENIS DOKUMEN PER BIDANG (tidak ada "Lainnya") ─── */
const DEPT_JENIS = {
  keuangan: [
    { val:'rencana_anggaran', label:'Rencana Anggaran (RAB / RKA)' },
    { val:'realisasi_anggaran', label:'Realisasi Anggaran' },
    { val:'laporan_keuangan', label:'Laporan Keuangan' },
    { val:'spj', label:'SPJ - Surat Pertanggungjawaban' },
    { val:'dipa', label:'DIPA / RKAKL' },
    { val:'nota_dinas', label:'Nota Dinas Keuangan' },
    { val:'sk', label:'SK / Keputusan Keuangan' },
    { val:'kontrak', label:'Kontrak / SPK' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
    { val:'k6_14', label:'Dokumen audit: keuangan dan sarana prasarana.' },
    { val:'k8_2', label:'Prosedur operasional standar pengalokasian anggaran.' },
    { val:'lkps_33', label:'[LKPS] Tabel 33. Jumlah Penerimaan Dana di Unit Pengelola Program Studi' },
    { val:'lkps_34', label:'[LKPS] Tabel 34. Jumlah Penggunaan Dana di Unit Pengelola Program Studi' },
  ],
  pendidikan: [
    { val:'kurikulum', label:'Kurikulum Program Studi' },
    { val:'silabus', label:'Silabus / RPS Mata Kuliah' },
    { val:'jadwal', label:'Jadwal Perkuliahan' },
    { val:'sk_mengajar', label:'SK Beban Mengajar Dosen' },
    { val:'nilai', label:'Daftar Nilai Mahasiswa' },
    { val:'laporan_akademik', label:'Laporan Akademik' },
    { val:'absensi', label:'Absensi / Presensi' },
    { val:'sk', label:'SK / Keputusan Akademik' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
    { val:'k1_1', label:'Laporan kegiatan atau notulen rapat pada saat perumusan visi, misi, dan unggulan Program Studi yang berasal dari visi, misi, dan unggulan fakultas dan universitas. Visi, misi, dan unggulan tersebut mencakup peran UPPS dalam meningkatkan derajat kesehatan masyarakat.' },
    { val:'k1_2', label:'Bukti kegiatan keterlibatan pemangku kepentingan internal (mahasiswa, dosen, tendik, pengelola) dan eksternal (lulusan, pengguna lulusan, mitra, pakar, organisasi profesi dan pemerintah) seperti daftar hadir, rekaman foto/video pada saat pertemuan.' },
    { val:'k1_3', label:'Media yang digunakan untuk publikasi/sosialisasi visi, misi, dan unggulan.' },
    { val:'k1_4', label:'Dokumen rencana strategi (renstra) dan rencana operasional (renop)' },
    { val:'k2_1', label:'Notulen rapat komite kurikulum untuk merumuskan capaian pembelajaran lulusan setiap mata kuliah (termasuk pengetahuan, keterampilan, dan perilaku) berdasarkan visi, misi, dan unggulan program studi dengan pelibatan pemangku kepentingan internal dan eksternal.' },
    { val:'k2_2', label:'Buku kurikulum (kurikulum: prinsip, struktur, isi, urutan), peta kompetensi, rencana pembelajaran semester (RPS), hasil pembelajaran, metode pendidikan, penilaian.' },
    { val:'k2_3', label:'Daftar departemen klinis untuk penempatan mahasiswa Daftar penempatan mahasiswa untuk orientasi pembelajaran klinik profesional  (early clinical exposure) pada tahap akademik dan praktek klinik profesional  tahap profesi.' },
    { val:'k2_4', label:'Daftar rumah sakit pendidikan Daftar wahana praktek yang digunakan dan memenuhi persyaratan praktek klinik profesional mahasiswa' },
    { val:'k2_5', label:'Notulen rapat komite kurikulum tentang metode pendidikan, telaah kurikulum, evaluasi dan peninjauan kurikulum.' },
    { val:'k2_6', label:'Modul dan Panduan praktek klinik profesional mahasiswa' },
    { val:'k2_7', label:'Risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem manajemen mutu dan strategi keselamatan pasien' },
    { val:'k2_8', label:'Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut' },
    { val:'k2_9', label:'Kebijakan dan prosedur mitigasi kasus risiko kecelakaan' },
    { val:'k3_1', label:'Prosedur operasional standar penilaian' },
    { val:'k3_4', label:'Cetak biru (blueprint) penilaian' },
    { val:'k3_5', label:'Prosedur mekanisme banding' },
    { val:'k3_6', label:'Dokumen sistem Penjaminan Mutu: perencanaan dan pelaksanaan' },
    { val:'k3_7', label:'Kebijakan dan prosedur penilaian sesuai tempat pembelajaran' },
    { val:'k3_8', label:'Lampiran hasil Uji Kompetensi CBT dan OSCE' },
    { val:'k6_1', label:'Daftar infrastruktur fisik/sarana dan prasarana' },
    { val:'k6_2', label:'Daftar sistem pendukung pembelajaran lainnya. Sistem manajemen pembelajaran dan dukungan internet' },
    { val:'k6_3', label:'Daftar rumah sakit pendidikan dan wahana praktek klinik.' },
    { val:'k6_4', label:'Daftar fasilitas di rumah sakit pendidikan dan pengajaran klinik (ruang diskusi, ruang shift malam, perpustakaan, dll.)' },
    { val:'k6_5', label:'Daftar manekin yang tersedia untuk pelatihan keterampilan klinis mahasiswa.' },
    { val:'k6_6', label:'Kebijakan mengenai keselamatan dan kesehatan kerja civitas akademika.' },
    { val:'k6_7', label:'Daftar pasien standar dan laporan pelatihannya.' },
    { val:'k6_8', label:'Daftar pelatihan dan laporannya dari dosen klinis dan pembimbing' },
    { val:'k6_9', label:'Daftar database jurnal yang tersedia' },
    { val:'k6_10', label:'Formulir evaluasi dan umpan balik dari mahasiswa dan staf akademik serta administrasi untuk sumber informasi yang tersedia' },
    { val:'k7_1', label:'Sistem penjaminan mutu: struktur dan tupoksi.' },
    { val:'k7_2', label:'Dokumen mutu: kebijakan, standar, manual, formulir, dan dokumen pendukung lainnya.' },
    { val:'k7_3', label:'Laporan audit mutu internal.' },
    { val:'k7_4', label:'Laporan rapat tinjauan manajemen.' },
    { val:'k7_5', label:'Sumber daya yang dialokasikan untuk penjaminan mutu.' },
    { val:'k7_6', label:'Notulen/risalah rapat dan laporan keterlibatan pemangku kepentingan eksternal dalam sistem penjaminan mutu dan strategi keselamatan pasien.' },
    { val:'k7_7', label:'Dokumen tindak lanjut atas umpan balik penjaminan mutu untuk peningkatan mutu berkelanjutan.' },
    { val:'k7_8', label:'Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut' },
    { val:'k7_9', label:'Kebijakan dan prosedur mitigasi kasus risiko.' },
    { val:'lkps_1', label:'[LKPS] Tabel 1. Substansi Kurikulum (kuliah/praktikum/praktik) di Tahap Akademik dan Tahap Profesi di Program Studi' },
    { val:'lkps_2', label:'[LKPS] Tabel 2. Persentase Keberhasilan Studi' },
    { val:'lkps_3', label:'[LKPS] Tabel 3. Data IPK Lulusan Tahap Akademik di Program Studi' },
    { val:'lkps_4', label:'[LKPS] Tabel 4. Data IPK Lulusan Tahap Profesi di Program Studi' },
    { val:'lkps_5', label:'[LKPS] Tabel 5. Data Lulusan Tepat Waktu Tahap Akademik di Program Studi' },
    { val:'lkps_6', label:'[LKPS] Tabel 6. Data Lulusan Tepat Waktu Tahap Profesi di Program Studi' },
    { val:'lkps_7', label:'[LKPS] Tabel 7. Uji Kompetensi Mahasiswa Program Studi (UKMPS-CBT)' },
    { val:'lkps_8', label:'[LKPS] Tabel 8. Uji Kompetensi Mahasiswa Program Studi (UKMPS-OSCE)' },
    { val:'lkps_9', label:'[LKPS] Tabel 9. Data Total Mahasiswa pada Unit Pengelola Program Studi' },
    { val:'lkps_10', label:'[LKPS] Tabel 10. Data Mahasiswa Tahap Akademik pada Program Studi' },
    { val:'lkps_11', label:'[LKPS] Tabel 11. Data Mahasiswa Tahap Profesi pada Program Studi' },
    { val:'lkps_13', label:'[LKPS] Tabel 13. Masa Tunggu Lulusan Mendapatkan Pekerjaan' },
    { val:'lkps_15', label:'[LKPS] Tabel 15. Dosen Tetap pada Unit Pengelola Program Studi' },
    { val:'lkps_16', label:'[LKPS] Tabel 16. Dosen Tetap Tahap Akademik dan Profesi pada Program Studi' },
    { val:'lkps_17', label:'[LKPS] Tabel 17. Aktivitas Dosen Tetap pada Program Studi' },
    { val:'lkps_18a_18b', label:'[LKPS] Tabel 18a & 18b Kegiatan seminar ilmiah/lokakarya/penataran/pameran Dosen dan Tendik Tetap pada Program Studi' },
    { val:'lkps_19', label:'[LKPS] Tabel 19. Data Dosen Tidak Tetap pada Program Studi' },
    { val:'lkps_20', label:'[LKPS] Tabel 20. Kegiatan tenaga ahli/pakar pada program studi' },
    { val:'lkps_22', label:'[LKPS] Tabel 22. Data Kegiatan Penelitian Dosen Tetap Program Studi' },
    { val:'lkps_23', label:'[LKPS] Tabel 23. Data Kegiatan Pengabdian kepada Masyarakat (PkM) Dosen Tetap Program Studi' },
    { val:'lkps_25', label:'[LKPS] Tabel 25. Jumlah Karya Dosen dan Atau Mahasiswa Program Studi' },
    { val:'lkps_26', label:'[LKPS] Tabel 26. Jumlah Pengabdian kepada Masyarakat yang relevan dengan Program Studi' },
    { val:'lkps_27', label:'[LKPS] Tabel 27. Penghargaan Dosen Tetap Program Studi' },
    { val:'lkps_28', label:'[LKPS] Tabel 28. Jumlah Karya Mahasiswa di Program Studi' },
    { val:'lkps_29', label:'[LKPS] Tabel 29. Prasarana dan Peralatan Utama Laboratorium di Program Studi' },
    { val:'lkps_30', label:'[LKPS] Tabel 30. Wahana Praktik Profesi: Rumah Sakit dan Sarana Pelayanan Kesehatan Lain di Program Studi' },
    { val:'lkps_31', label:'[LKPS] Tabel 31. Rekapitulasi jumlah ketersediaan pustaka yang relevan dengan bidang program studi, baik dalam format cetak maupun elektronik.' },
    { val:'lkps_33', label:'[LKPS] Tabel 33. Jumlah Penerimaan Dana di Unit Pengelola Program Studi' },
    { val:'lkps_34', label:'[LKPS] Tabel 34. Jumlah Penggunaan Dana di Unit Pengelola Program Studi' },
    { val:'lkps_38', label:'[LKPS] Tabel 38. Kerja sama Unit Pengelola Program Studi yang Relevan dengan  Program Studi yang sedang diakreditasi' },
  ],
  perpustakaan: [
    { val:'tugas_akhir', label:'Tugas Akhir / KTI / Skripsi' },
    { val:'jurnal_mahasiswa', label:'Jurnal Mahasiswa' },
    { val:'jurnal_dosen', label:'Jurnal Dosen / Hasil Penelitian' },
    { val:'pengadaan_buku', label:'Pengadaan Buku / Referensi' },
    { val:'katalog', label:'Katalog Koleksi Perpustakaan' },
    { val:'laporan_kunjungan', label:'Laporan Kunjungan Perpustakaan' },
    { val:'sk', label:'SK / Keputusan Perpustakaan' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
  ],
  kemahasiswaan: [
    { val:'sk_beasiswa', label:'SK Penerima Beasiswa' },
    { val:'permohonan_beasiswa', label:'Permohonan / Pengajuan Beasiswa' },
    { val:'laporan_ukm', label:'Laporan Kegiatan UKM / Organisasi' },
    { val:'data_mahasiswa', label:'Data / Biodata Mahasiswa' },
    { val:'surat_keterangan', label:'Surat Keterangan Mahasiswa' },
    { val:'sk', label:'SK / Keputusan Kemahasiswaan' },
    { val:'laporan', label:'Laporan Kemahasiswaan' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
    { val:'k3_2', label:'Buku catatan mahasiswa (logbook), dokumen revisi strategi pengajaran: penilaian mahasiswa (evaluasi dan pemantauan kemajuan mahasiswa) dan umpan balik dosen (strategi mengajar dosen)' },
    { val:'k3_3', label:'Mekanisme remedial dan konseling' },
    { val:'k4_1', label:'Peraturan tentang kebijakan seleksi dan penerimaan: penyelarasan dengan misi dan akreditasi/persyaratan, publisitas/sosialisasi, peninjauan, dan revisi.' },
    { val:'k4_2', label:'Kebijakan, peraturan, prosedur dukungan/layanan mahasiswa, dan keselamatan lingkungan kerja' },
    { val:'k4_3', label:'Kebijakan, peraturan, dan prosedur konseling mahasiswa.' },
    { val:'k4_4', label:'Pendukung sumber daya manusia, fasilitas, dan keuangan untuk sistem pendukung/layanan mahasiswa.' },
    { val:'k4_5', label:'Monitoring dan evaluasi penerapan sistem pendukung/layanan kemahasiswaan.' },
    { val:'k4_6', label:'Dokumen hasil survey kepuasaan mahasiswa terhadap layanan mahasiswa.' },
    { val:'k4_7', label:'Dokumen hasil survey kepuasaan mahasiswa terhadap layanan manajemen' },
    { val:'k4_8', label:'Kebijakan, peraturan mengenai ‘kampus sehat’ termasuk bebas dari kekerasan seksual, perundungan, intoleransi, bebas dari rokok dan narkotika.' },
    { val:'k4_9', label:'Pedoman pelaksanaan RCA (Root Cause Analysis) meliputi a. Identifikasi Masalah, b. Pengumpulan Data, c. Analisis Penyebab, d. Identifikasi Akar Penyebab, e. Pengembangan Solusi, f. Implementasi Solusi, g. Pemantauan dan Tindak Lanjut' },
    { val:'k4_10', label:'Pemantauan dan evaluasi penerapan sistem pendukung mahasiswa dan keselamatan lingkungan kerja.' },
    { val:'k4_11', label:'Pedoman RCA (Root Cause Analysis).' },
    { val:'k6_11', label:'Fasilitas untuk mengakses sumber informasi dan sumber belajar.' },
    { val:'k6_12', label:'Data hasil survei kepuasan atas pelayanan yang diberikan manajemen kepada seluruh pemangku kepentingan (mahasiswa, dosen, pegawai, rekanan, dan pemberi kerja alumni).' },
    { val:'lkps_3', label:'[LKPS] Tabel 3. Data IPK Lulusan Tahap Akademik di Program Studi' },
    { val:'lkps_4', label:'[LKPS] Tabel 4. Data IPK Lulusan Tahap Profesi di Program Studi' },
    { val:'lkps_5', label:'[LKPS] Tabel 5. Data Lulusan Tepat Waktu Tahap Akademik di Program Studi' },
    { val:'lkps_6', label:'[LKPS] Tabel 6. Data Lulusan Tepat Waktu Tahap Profesi di Program Studi' },
    { val:'lkps_7', label:'[LKPS] Tabel 7. Uji Kompetensi Mahasiswa Program Studi (UKMPS-CBT)' },
    { val:'lkps_8', label:'[LKPS] Tabel 8. Uji Kompetensi Mahasiswa Program Studi (UKMPS-OSCE)' },
    { val:'lkps_9', label:'[LKPS] Tabel 9. Data Total Mahasiswa pada Unit Pengelola Program Studi' },
    { val:'lkps_10', label:'[LKPS] Tabel 10. Data Mahasiswa Tahap Akademik pada Program Studi' },
    { val:'lkps_11', label:'[LKPS] Tabel 11. Data Mahasiswa Tahap Profesi pada Program Studi' },
    { val:'lkps_12', label:'[LKPS] Tabel 12. Kepuasan Mahasiswa' },
    { val:'lkps_13', label:'[LKPS] Tabel 13. Masa Tunggu Lulusan Mendapatkan Pekerjaan' },
    { val:'lkps_25', label:'[LKPS] Tabel 25. Jumlah Karya Dosen dan Atau Mahasiswa Program Studi' },
    { val:'lkps_28', label:'[LKPS] Tabel 28. Jumlah Karya Mahasiswa di Program Studi' },
  ],
  sdm: [
    { val:'sk_pengangkatan', label:'SK Pengangkatan Pegawai' },
    { val:'sk_jabatan', label:'SK Jabatan / Penugasan' },
    { val:'penilaian_kinerja', label:'Penilaian Kinerja (BKD / P2KP)' },
    { val:'data_dosen', label:'Data Kepegawaian Dosen' },
    { val:'data_pegawai', label:'Data Kepegawaian Staff / Tendik' },
    { val:'kontrak_kerja', label:'Kontrak Kerja / Perjanjian' },
    { val:'surat_izin', label:'Surat Izin / Cuti Pegawai' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
    { val:'k5_1', label:'Rencana pengembangan sumber daya manusia (SDM) sesuai dengan kebutuhan masing-masing disiplin ilmu dan perkembangan ilmu pengetahuan.' },
    { val:'k5_2', label:'Kebijakan dan prosedur pengembangan SDM (dosen dan tendik).' },
    { val:'k5_3', label:'Notulen/risalah rapat dan daftar kehadiran terkait kegiatan pengembangan SDM.' },
    { val:'k5_4', label:'Pemetaan disiplin kurikulum (kesesuaian bidang ilmu dengan mata kuliah yang diampu dan beban kerja).' },
    { val:'k5_5', label:'Formulir monitoring dan evaluasi kinerja dosen, sampel formulir yang sudah diisi dari beberapa dosen, hasil penilaian kinerja setiap semester.' },
    { val:'k5_6', label:'Laporan program pelatihan orientasi.' },
    { val:'k5_7', label:'Laporan program pelatihan untuk dosen baru dan lama.' },
    { val:'lkps_15', label:'[LKPS] Tabel 15. Dosen Tetap pada Unit Pengelola Program Studi' },
    { val:'lkps_16', label:'[LKPS] Tabel 16. Dosen Tetap Tahap Akademik dan Profesi pada Program Studi' },
    { val:'lkps_17', label:'[LKPS] Tabel 17. Aktivitas Dosen Tetap pada Program Studi' },
    { val:'lkps_18a_18b', label:'[LKPS] Tabel 18a & 18b Kegiatan seminar ilmiah/lokakarya/penataran/pameran Dosen dan Tendik Tetap pada Program Studi' },
    { val:'lkps_19', label:'[LKPS] Tabel 19. Data Dosen Tidak Tetap pada Program Studi' },
    { val:'lkps_20', label:'[LKPS] Tabel 20. Kegiatan tenaga ahli/pakar pada program studi' },
    { val:'lkps_22', label:'[LKPS] Tabel 22. Data Kegiatan Penelitian Dosen Tetap Program Studi' },
    { val:'lkps_23', label:'[LKPS] Tabel 23. Data Kegiatan Pengabdian kepada Masyarakat (PkM) Dosen Tetap Program Studi' },
    { val:'lkps_25', label:'[LKPS] Tabel 25. Jumlah Karya Dosen dan Atau Mahasiswa Program Studi' },
    { val:'lkps_27', label:'[LKPS] Tabel 27. Penghargaan Dosen Tetap Program Studi' },
  ],
  sarana: [
    { val:'pengadaan', label:'Pengadaan Barang / Jasa' },
    { val:'inventaris', label:'Daftar Inventaris Aset' },
    { val:'pemeliharaan', label:'Pemeliharaan / Perbaikan Fasilitas' },
    { val:'berita_acara', label:'Berita Acara Serah Terima' },
    { val:'kontrak', label:'Kontrak / SPK Pengadaan' },
    { val:'sk', label:'SK / Keputusan Sarana' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
    { val:'k5_8', label:'Roadmap penelitian, dan Pengabdian kepada Masyarakat dosen.' },
    { val:'k5_9', label:'Laporan penelitian dosen dan PkM  dosen serta publikasinya.' },
    { val:'k5_10', label:'Bukti penghargaan atau pengakuan atas hasil penelitian (termasuk menerima: Hibah penelitian, HaKi, dan Paten).' },
    { val:'k5_11', label:'Kebijakan penelitian dan PkM serta integrasinya.' },
    { val:'k5_12', label:'Sertifikat Pendidik/Dosen, Sertifikat Kompetensi, dan Ijazah' },
    { val:'k5_13', label:'HaKI atau surat pengakuan/penghargaan dari lembaga nasional/internasional' },
    { val:'k5_14', label:'Formulir monitoring dan evaluasi kinerja tendik.' },
    { val:'k5_15', label:'Laporan program pelatihan tendik.' },
    { val:'k6_13', label:'Data hasil survei kepuasan terhadap kecukupan, kualitas dan akses terhadap fasilitas dan peralatan fisik serta sumber informasi pendidikan dan pelatihan klinis.' },
    { val:'lkps_29', label:'[LKPS] Tabel 29. Prasarana dan Peralatan Utama Laboratorium di Program Studi' },
    { val:'lkps_30', label:'[LKPS] Tabel 30. Wahana Praktik Profesi: Rumah Sakit dan Sarana Pelayanan Kesehatan Lain di Program Studi' },
    { val:'lkps_31', label:'[LKPS] Tabel 31. Rekapitulasi jumlah ketersediaan pustaka yang relevan dengan bidang program studi, baik dalam format cetak maupun elektronik.' },
    { val:'lkps_32', label:'[LKPS] Tabel 32. Jurnal yang tersedia/yang diterima secara teratur (lengkap), terbitan tiga tahun terakhir' },
  ],
  humas: [
    { val:'mou', label:'MOU / Perjanjian Kerjasama' },
    { val:'undangan', label:'Undangan (Masuk / Keluar)' },
    { val:'laporan_kerjasama', label:'Laporan Kerjasama Institusi' },
    { val:'press_release', label:'Press Release / Siaran Pers' },
    { val:'liputan', label:'Liputan / Dokumentasi Media' },
    { val:'sk', label:'SK / Keputusan Humas' },
    { val:'surat_masuk', label:'Surat Masuk' },
    { val:'surat_keluar', label:'Surat Keluar' },
    { val:'k8_1', label:'Bagan organisasi pengelolaan dan administrasi beserta tupoksi.' },
    { val:'k8_3', label:'Laporkan tinjauan kinerja institusi/UPPS' },
    { val:'k8_4', label:'Dokumen identifikasi dan mitigasi risiko.' },
    { val:'k8_5', label:'Laporan/risalah rapat keterlibatan mahasiswa dan dosen dalam pengambilan keputusan dan fungsi UPPS' },
    { val:'k8_6', label:'Standar prosedur operasional (SPO) untuk proses pengambilan keputusan.' },
    { val:'k8_8', label:'Dokumen indikator kinerja utama dan kinerja tambahan.' },
    { val:'lkps_14', label:'[LKPS] Tabel 14. Tingkat Kepuasan Pengguna' },
    { val:'lkps_38', label:'[LKPS] Tabel 38. Kerja sama Unit Pengelola Program Studi yang Relevan dengan  Program Studi yang sedang diakreditasi' },
  ],
  lppm: [
    { val:'k8_7', label:'Standar prosedur operasional (SPO) pelaporan pembelajaran, penelitian, dan pengabdian kepada masyarakat.' },
    { val:'lkps_22', label:'[LKPS] Tabel 22. Data Kegiatan Penelitian Dosen Tetap Program Studi' },
    { val:'lkps_23', label:'[LKPS] Tabel 23. Data Kegiatan Pengabdian kepada Masyarakat (PkM) Dosen Tetap Program Studi' },
    { val:'lkps_24', label:'[LKPS] Tabel 24. Artikel Ilmiah/Karya Ilmiah/Buku Tiga Tahun Terakhir' },
    { val:'lkps_26', label:'[LKPS] Tabel 26. Jumlah Pengabdian kepada Masyarakat yang relevan dengan Program Studi' },
    { val:'lkps_27', label:'[LKPS] Tabel 27. Penghargaan Dosen Tetap Program Studi' },
  ],
};




const COMMON_JENIS = [
  { val:'surat_masuk',  label:'Surat Masuk' },
  { val:'surat_keluar', label:'Surat Keluar' },
  { val:'sk',           label:'SK / Keputusan / Peraturan' },
  { val:'nota_dinas',   label:'Nota Dinas / Memo Internal' },
  { val:'dokumentasi',  label:'Dokumentasi Kegiatan / Notulen' }
];

/* Format file */
const FORMAT_MAP = {
  pdf:   { icon:'fas fa-file-pdf',   color:'#ef4444', label:'PDF' },
  excel: { icon:'fas fa-file-excel', color:'#22c55e', label:'Excel' },
  word:  { icon:'fas fa-file-word',  color:'#3b82f6', label:'Word' },
  image: { icon:'fas fa-file-image', color:'#f59e0b', label:'Gambar' },
};

const STATUS_CFG = {
  aktif:    { cls:'s-aktif',    icon:'fa-circle-dot',     label:'Aktif' },
  diproses: { cls:'s-diproses', icon:'fa-hourglass-half', label:'Diproses' },
  selesai:  { cls:'s-selesai',  icon:'fa-check-circle',   label:'Selesai' },
  arsip:    { cls:'s-arsip',    icon:'fa-box-archive',    label:'Diarsipkan' },
};

/* ─── STATE ─── */
let arsip    = [];
let activity = [];
let mahasiswa = [];
let sdm = [];
let currentPage = 'dashboard';
let currentDept = '';
let currentAY   = '';
let pendingPdfId = '';
let cLine, cYearlyLine, cDoughnut, cStatus, cDeptBar, cDeptDonut, cAnBar, cAnYear;

/* ════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  currentAY = getAY(new Date().toISOString().slice(0,10));
  populateAYearSelect();
  renderSidebarDate();
  setupNav();
  setupHamburger();
  document.addEventListener('click', e => {
    if (!e.target.closest('.export-box'))
      document.getElementById('exportMenu').classList.remove('open');
  });
  initSidebarSubMenus();
  showPage('dashboard');
});

/* ─── ACADEMIC YEAR ─── */
function getAY(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const m = d.getMonth() + 1, y = d.getFullYear();
  let ay = '', sem = '';
  if (m >= 8) { ay = `${y} - ${y+1}`; sem = 'GANJIL'; }
  else if (m === 1) { ay = `${y-1} - ${y}`; sem = 'GANJIL'; }
  else { ay = `${y-1} - ${y}`; sem = 'GENAP'; }
  return `${ay} ${sem}`;
}
function getAYMonths(ay) {
  const parts = ay.split(' ');
  const y1 = Number(parts[0]), y2 = Number(parts[2]), sem = parts[3];
  const ms = [];
  if (sem === 'GANJIL') {
    for (let m=8;m<=12;m++) ms.push(`${y1}-${String(m).padStart(2,'0')}`);
    ms.push(`${y2}-01`);
  } else {
    for (let m=2; m<=7; m++) ms.push(`${y2}-${String(m).padStart(2,'0')}`);
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
  s.add(currentAY);
  for(let y=2014; y<=2026; y++) {
    s.add(`${y} - ${y+1} GANJIL`);
    s.add(`${y} - ${y+1} GENAP`);
  }
  return [...s].sort().reverse();
}
function populateAYearSelect() {
  const sel = document.getElementById('globalAYear');
  const mhsAy = document.getElementById('mhsFilterAy');
  const sdmAy = document.getElementById('sdmFilterAy');
  
  const yrs = allAYears();
  
  const globalHtml = '<option value="">Semua Tahun Akademik</option>' + yrs.map(y=>`<option value="${y}"${y===currentAY?' selected':''}>${y}</option>`).join('');
  if (sel) sel.innerHTML = globalHtml;
  
  const filterHtml = '<option value="">Semua Tahun Akademik</option>' + yrs.map(y=>`<option value="${y}">${y}</option>`).join('');
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
}

/* ─── DATA ─── */
async function loadData() {
  try {
    const [arsipSnap, activitySnap, mhsSnap, sdmSnap] = await Promise.all([
      db.collection('arsip').get(),
      db.collection('activity').get(),
      db.collection('mahasiswa').get(),
      db.collection('sdm').get()
    ]);
    
    arsip = arsipSnap.docs.map(d => d.data());
    activity = activitySnap.docs.map(d => d.data());
    mahasiswa = mhsSnap.docs.map(d => d.data());
    sdm = sdmSnap.docs.map(d => d.data());
    
    arsip.forEach(a => { a.ay = getAY(a.tanggal); });
    populateAYearSelect();
    updateBadges();
    if(currentPage==='dashboard') renderDashboard();
    else if(currentPage==='arsip') renderArsipTable();
    else if(currentPage==='dept') renderDeptPage(currentDept);
    else if(currentPage==='analytics') renderAnalytics();
  } catch(err) {
    console.error('Failed to load from Firestore', err);
    try {
      arsip = JSON.parse(localStorage.getItem('SIMARSIP_AAS'))||[];
      activity = JSON.parse(localStorage.getItem('SIMARSIP_ACT'))||[];
      mahasiswa = JSON.parse(localStorage.getItem('SIMARSIP_MHS'))||[];
      sdm = JSON.parse(localStorage.getItem('SIMARSIP_SDM'))||[];
    } catch { arsip=[]; activity=[]; mahasiswa=[]; sdm=[]; }
    if (!arsip.length) { arsip = sampleData(); }
    if (!mahasiswa.length) { mahasiswa = sampleDataMahasiswa(); }
    if (!sdm.length) { sdm = sampleDataSDM(); }
  }
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

/* ─── HELPERS ─── */
function getJenisLabel(bidang, jenis) {
  const list = [...(DEPT_JENIS[bidang]||[]), ...COMMON_JENIS];
  return list.find(t=>t.val===jenis)?.label || jenis.replace(/_/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
}
function getFormatCfg(fmt) { return FORMAT_MAP[fmt] || FORMAT_MAP.pdf; }

function fmtBadge(a) {
  if (!a.gdriveLink) return `<span class="no-file">—</span>`;
  const f = getFormatCfg(a.format);
  return `<a href="${esc(a.gdriveLink)}" target="_blank" rel="noopener noreferrer"
    class="fmt-btn fmt-${a.format||'pdf'}"
    title="Buka di Google Drive: ${esc(a.fileName||'')}"
    onclick="logGDriveOpen('${a.id}',event)">
    <i class="${f.icon}"></i> ${f.label}
  </a>`;
}
function logGDriveOpen(id, e) {
  const a = arsip.find(x=>x.id===id);
  if (a) { log('edit',`Membuka dokumen: "${a.judul}" di Google Drive`); save(); }
}

function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtDate(d) { if(!d)return'—'; return new Date(d+'T00:00:00').toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}); }
function fmtDateTime(d) { if(!d)return'—'; return new Date(d).toLocaleString('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}); }
function statusBadge(status) { const c=STATUS_CFG[status]||STATUS_CFG.arsip; return `<span class="s-badge ${c.cls}"><i class="fas ${c.icon}"></i>${c.label}</span>`; }
function now() { return new Date().toISOString().slice(0,10); }

/* ─── NAVIGATION ─── */
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
      if (window.innerWidth<=768) closeSidebar();
    });
  });
}
function setActiveNav(el) { document.querySelectorAll('.sb-link').forEach(l=>l.classList.remove('active')); el.classList.add('active'); }
function showPage(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
  document.getElementById('page-'+page)?.classList.remove('hidden');
  const titles={dashboard:'Portal Utama',arsip:'Semua Arsip',dept:DEPT[currentDept]?.label||'Bidang',analytics:'Analitik',aktivitas:'Riwayat Aktivitas',mahasiswa:'Data Mahasiswa',sdm:'Data SDM & Dosen',banpt:'Borang Akreditasi BAN-PT',lamptkes:'Borang Akreditasi LAM-PTKes'};
  document.getElementById('topbarTitle').textContent = titles[page]||page;
  
  const btnAdd = document.getElementById('btnGlobalAdd');
  if(btnAdd) {
    btnAdd.style.display = (page === 'banpt' || page === 'lamptkes' || page === 'analytics' || page === 'aktivitas') ? 'none' : 'inline-flex';
  }

  const banptMenu = document.getElementById('banpt-sub-menu');
  if(banptMenu) banptMenu.style.display = (page === 'banpt') ? 'flex' : 'none';

  const lamptkesMenu = document.getElementById('lamptkes-sub-menu');
  if(lamptkesMenu) lamptkesMenu.style.display = (page === 'lamptkes') ? 'flex' : 'none';

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
  updateBadges();
}
function setupHamburger() { document.getElementById('hamburger').addEventListener('click',()=>{ document.getElementById('sidebar').classList.toggle('open'); document.getElementById('sbOverlay').classList.toggle('hidden'); }); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sbOverlay').classList.add('hidden'); }
function goToDept(dept) { currentDept=dept; document.querySelectorAll('.sb-link').forEach(l=>l.classList.remove('active')); document.getElementById('nav-'+dept)?.classList.add('active'); showPage('dept'); }
function renderSidebarDate() { const el=document.getElementById('sidebarDate'); if(el) el.textContent=new Date().toLocaleDateString('id-ID',{weekday:'short',day:'2-digit',month:'short',year:'numeric'}); }
function updateBadges() {
  const f=arsip.filter(a=>!currentAY||a.ay===currentAY);
  document.getElementById('badge-total').textContent=f.length;
  Object.keys(DEPT).forEach(k=>{ const el=document.getElementById('badge-'+k); if(el) el.textContent=f.filter(a=>a.bidang===k).length; });
  const bMhs=document.getElementById('badge-mhs'); if(bMhs) bMhs.textContent=mahasiswa.length;
  const bSdm=document.getElementById('badge-sdm-induk'); if(bSdm) bSdm.textContent=sdm.length;
}

/* ═════ DASHBOARD ═════ */
function renderDashboard() {
  const data=arsip.filter(a=>!currentAY||a.ay===currentAY);
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
        <div class="ri-meta">${d.label||'—'} · ${getJenisLabel(a.bidang,a.jenis)} · ${fmtDate(a.tanggal)} ${a.gdriveLink?`<i class="fab fa-google-drive" style="color:#4285f4"></i>`:''}</div>
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
    const currY = new Date().getFullYear();
    const yLabels = [currY-4, currY-3, currY-2, currY-1, currY].map(String);
    const yCounts = yLabels.map(y => arsip.filter(a=>a.tanggal?.startsWith(y)).length);
    const g=ctxYL.createLinearGradient(0,0,0,240);g.addColorStop(0,'rgba(59,130,246,.35)');g.addColorStop(1,'rgba(59,130,246,0)');
    cYearlyLine=new Chart(ctxYL,{type:'line',data:{labels:yLabels,datasets:[{label:'Arsip Tahunan',data:yCounts,borderColor:'#3b82f6',backgroundColor:g,tension:.4,pointBackgroundColor:'#3b82f6',pointRadius:4,fill:true}]},options:chartOpts({plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#4f617d',font:{size:10}}},y:{grid:{color:'rgba(255,255,255,.05)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true}}})})
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
  if(ctxS){const sL=['Aktif','Diproses','Selesai','Diarsipkan'],sK=['aktif','diproses','selesai','arsip'],sV=sK.map(s=>data.filter(a=>a.status===s).length),sC=['#22c55e','#f59e0b','#3b82f6','#94a3b8'];cStatus=new Chart(ctxS,{type:'doughnut',data:{labels:sL,datasets:[{data:sV,backgroundColor:sC.map(c=>c+'88'),borderColor:sC,borderWidth:2}]},options:chartOpts({plugins:{legend:{position:'bottom',labels:{color:'#8b9dbf',font:{size:10},padding:8}}},cutout:'65%'})})}
}

/* ═════ ARSIP TABLE ═════ */
function onFilterDeptChange() {
  const dept=document.getElementById('filterDept').value;
  populateFilterJenis(dept,'filterJenis');
  renderArsipTable();
}
function populateFilterJenis(dept, elId) {
  const el=document.getElementById(elId); if(!el)return;
  const types=dept?(DEPT_JENIS[dept]||COMMON_JENIS):COMMON_JENIS;
  el.innerHTML=`<option value="">Semua Jenis</option>`+types.map(t=>`<option value="${t.val}">${t.label}</option>`).join('');
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
  if(info)info.textContent=`${data.length} dari ${arsip.filter(a=>!currentAY||a.ay===currentAY).length} arsip · TA ${currentAY}`;

  tbody.innerHTML=data.map((a,i)=>{
    const d=DEPT[a.bidang]||{label:a.bidang,color:'#888',icon:'fas fa-file'};
    return`<tr>
      <td style="color:var(--t3);font-size:.72rem">${i+1}</td>
      <td><span class="td-nomor">${esc(a.nomor)}</span></td>
      <td><span class="td-judul" title="${esc(a.judul)}">${esc(a.judul)}</span></td>
      <td><span class="d-badge" style="background:${d.color}18;color:${d.color}"><i class="${d.icon}"></i>${d.label}</span></td>
      <td style="font-size:.78rem;color:var(--t2);"><div title="${getJenisLabel(a.bidang,a.jenis).replace(/"/g, '&quot;')}" style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${getJenisLabel(a.bidang,a.jenis)}</div></td>
      <td style="font-size:.78rem;">${fmtDate(a.tanggal)}</td>
      <td><span class="td-ta" style="white-space:normal;">${a.ay||'—'}</span></td>
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

/* ═════ DEPT PAGE ═════ */
function renderDeptPage(dept) {
  if(!dept)return;
  const d=DEPT[dept];
  const all=arsip.filter(a=>a.bidang===dept&&(!currentAY||a.ay===currentAY));

  document.getElementById('deptBanner').style.cssText=`--dept-bg:${d.color}18;--dept-color:${d.color};background:linear-gradient(135deg,${d.color}12,transparent)`;
  document.getElementById('deptBannerIcon').innerHTML=`<i class="${d.icon}"></i>`;
  document.getElementById('deptBannerName').textContent=d.label;
  document.getElementById('deptBannerSub').textContent=`Manajemen arsip bidang ${d.label} · TA ${currentAY}`;

  document.getElementById('deptStatRow').innerHTML=[
    {lb:'Total Arsip',val:all.length,ic:'archive',c:d.color},
    {lb:'Aktif',val:all.filter(a=>a.status==='aktif').length,ic:'circle-dot',c:'#22c55e'},
    {lb:'Diproses',val:all.filter(a=>a.status==='diproses').length,ic:'hourglass-half',c:'#f59e0b'},
    {lb:'Selesai',val:all.filter(a=>a.status==='selesai').length,ic:'check-circle',c:'#3b82f6'},
  ].map(c=>`<div class="stat-card" style="--c:${c.c}"><div class="sc-icon"><i class="fas fa-${c.ic}"></i></div><div class="sc-label">${c.lb}</div><div class="sc-val">${c.val}</div></div>`).join('');

  document.getElementById('deptChartSub').textContent=`TA ${currentAY}`;
  initDeptCharts(dept,all,d.color);

  const mhsCharts = document.getElementById('mhsChartContainer');
  if(mhsCharts) mhsCharts.style.display = (dept === 'kemahasiswaan') ? 'grid' : 'none';
  if(dept === 'kemahasiswaan') {
    initMhsCharts(mahasiswa.filter(m=>!currentAY||m.ay===currentAY));
  }


  document.getElementById('deptTableTitle').textContent=`Daftar Arsip ${d.label}`;
  document.getElementById('deptSearch').value='';
  populateFilterJenis(dept,'deptFilterJenis');
  renderDeptTable();
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
    if(mhsC) mhsC.style.display = (currentDept === 'kemahasiswaan') ? 'grid' : 'none';
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
    const ul = document.createElement('ul');
    ul.className = 'sb-sub-menu';
    ul.id = `dept-${k}-sub-menu`;
    ul.style.display = 'none';

    const types = [...(DEPT_JENIS[k] || []), ...COMMON_JENIS];
    
    let html = `<li class="active" onclick="filterByJenisFromSidebar('', '${k}', this)"><i class="fas fa-layer-group"></i> Semua Jenis</li>`;
    types.forEach(t => {
      html += `<li title="${t.label.replace(/"/g, '&quot;')}" onclick="filterByJenisFromSidebar('${t.val}', '${k}', this)"><i class="${t.icon || 'fas fa-file-lines'}"></i> <span style="flex:1; min-width:0; line-height:1.4;">${t.label}</span></li>`;
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
      tdHtml += `<td style="font-size:.78rem;color:var(--t2)"><div title="${getJenisLabel(a.bidang,a.jenis).replace(/\"/g, '&quot;')}" style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${getJenisLabel(a.bidang,a.jenis)}</div></td>`;
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

/* ═════ DEPT CHARTS ═════ */
function initDeptCharts(dept,data,color) {
  const months=getAYMonths(currentAY),labels=months.map(getMonthLabel);
  const counts=months.map(m=>data.filter(a=>a.tanggal?.startsWith(m)).length);
  destroyChart(cDeptBar);
  const ctxB=document.getElementById('chartDeptBar')?.getContext('2d');
  if(ctxB){const g=ctxB.createLinearGradient(0,0,0,220);g.addColorStop(0,color+'cc');g.addColorStop(1,color+'33');cDeptBar=new Chart(ctxB,{type:'bar',data:{labels,datasets:[{label:'Jumlah Arsip',data:counts,backgroundColor:g,borderColor:color,borderWidth:1.5,borderRadius:6,borderSkipped:false}]},options:chartOpts({plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#4f617d',font:{size:9}}},y:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#4f617d',precision:0},beginAtZero:true}}})})}
  destroyChart(cDeptDonut);
  const ctxD=document.getElementById('chartDeptDonut')?.getContext('2d');
  if(ctxD){const sK=['aktif','diproses','selesai','arsip'],sL=['Aktif','Diproses','Selesai','Diarsipkan'],sV=sK.map(s=>data.filter(a=>a.status===s).length),sC=['#22c55e','#f59e0b','#3b82f6','#94a3b8'];cDeptDonut=new Chart(ctxD,{type:'doughnut',data:{labels:sL,datasets:[{data:sV,backgroundColor:sC.map(c=>c+'88'),borderColor:sC,borderWidth:2}]},options:chartOpts({plugins:{legend:{position:'bottom',labels:{color:'#8b9dbf',font:{size:10},padding:8}}},cutout:'65%'})})}
}

/* ═════ ANALYTICS ═════ */
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

/* ─── CHART HELPER ─── */
function destroyChart(c){try{c?.destroy()}catch{}}
function chartOpts(extra={}) {
  return{responsive:true,maintainAspectRatio:true,animation:{duration:600,easing:'easeOutCubic'},
    plugins:{tooltip:{backgroundColor:'rgba(20,28,46,.95)',borderColor:'rgba(255,255,255,.08)',borderWidth:1,titleColor:'#f0f6ff',bodyColor:'#8b9dbf',padding:10},legend:{display:false,...extra.plugins?.legend},...extra.plugins},
    scales:extra.scales,...Object.fromEntries(Object.entries(extra).filter(([k])=>!['plugins','scales'].includes(k)))};
}

/* ═════ FORM MODAL ═════ */
function openForm(prefillDept) {
  document.getElementById('arsipForm').reset();
  document.getElementById('editId').value='';
  document.getElementById('formTitle').innerHTML='<i class="fas fa-file-circle-plus"></i> Tambah Arsip Baru';
  document.getElementById('btnSimpan').innerHTML='<i class="fas fa-floppy-disk"></i> Simpan';
  document.getElementById('fTanggal').value=new Date().toISOString().slice(0,10);
  document.getElementById('fFormat').value='pdf';
  document.getElementById('fFileName').value='';
  document.getElementById('fGdriveLink').value='';
  if(prefillDept){ document.getElementById('fBidang').value=prefillDept; onBidangChange(); }
  else { document.getElementById('fJenis').innerHTML='<option value="">-- Pilih Bidang dulu --</option>'; }
  onFormDateChange();
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
  const types=DEPT_JENIS[bidang]||[];
  
  if(types.length) {
    document.getElementById('fJenisLabelText').textContent = '-- Pilih Jenis --';
    document.getElementById('fJenis').value = '';
    let html = '';
    types.forEach(t => {
      const safeLabel = t.label.replace(/'/g, "\'");
      html += `<div class="custom-option" onclick="selectJenisOption('${t.val}', '${safeLabel}')">${t.label}</div>`;
    });
    opts.innerHTML = html;
  } else {
    document.getElementById('fJenisLabelText').textContent = '-- Pilih Bidang dulu --';
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
function onFormDateChange() {
  const tgl=document.getElementById('fTanggal').value;
  document.getElementById('ayearPillVal').textContent=tgl?getAY(tgl):'—';
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
  onFormDateChange();
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
  const tahun=getAY(tgl);

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
  db.collection('arsip').doc(record.id).set(record).catch(e => console.error(e));

  save(); populateAYearSelect(); updateBadges(); closeForm();
  if(currentPage==='dashboard')renderDashboard();
  else if(currentPage==='arsip')renderArsipTable();
  else if(currentPage==='dept')renderDeptPage(currentDept);
  else if(currentPage==='analytics')renderAnalytics();
  
  if (btn) { btn.disabled = false; btn.innerHTML = btnIcon; }

  // Lakukan upload di background setelah form ditutup
  if (fileToUpload) {
    toast(`Mulai mengunggah ${fileToUpload.name} ke GDrive... Jangan tutup halaman.`, 'info');
    uploadToGDrive(fileToUpload, bidang, jenis, tahun).then(res => {
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
        db.collection('arsip').doc(record.id).set(arsip[idx]).catch(e => console.error(e));
        if (currentPage === 'arsip') renderArsipTable();
        else if (currentPage === 'dept') renderDeptPage(currentDept);
      }
    });
  }
}

async function uploadToGDrive(file, bidang, jenis, tahun) {
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
        mimeType: file.type || 'application/octet-stream',
        base64Data: base64Data,
        bidang: DEPT[bidang]?.label || bidang,
        jenis: jenis,
        tahun: tahun
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

async function deleteArsip(id) {
  const a=arsip.find(x=>x.id===id);
  if(!a||!confirm(`Hapus arsip "${a.judul}"?\n\nTindakan ini tidak dapat dibatalkan.`))return;
  try { await db.collection('arsip').doc(id).delete(); } catch(e) { console.error(e); toast('Gagal menghapus dari database','error'); return; }
  arsip=arsip.filter(x=>x.id!==id);
  log('delete',`Menghapus arsip: "${a.judul}"`);
  save(); updateBadges(); toast('Arsip berhasil dihapus.','success');
  if(currentPage==='dashboard')renderDashboard();
  else if(currentPage==='arsip')renderArsipTable();
  else if(currentPage==='dept')renderDeptPage(currentDept);
  else if(currentPage==='analytics')renderAnalytics();
}

/* ═════ DETAIL MODAL ═════ */
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
      <div class="detail-field"><label>Pengirim / Pembuat</label><span>${esc(a.pengirim||'—')}</span></div>
      <div class="detail-field"><label>Status</label>${statusBadge(a.status)}</div>
      <div class="detail-field"><label>Tahun Akademik</label><span class="td-ta">${a.ay||'—'}</span></div>
      <div class="detail-field" style="grid-column:1/-1">
        <label>Dokumen Google Drive</label>
        ${a.gdriveLink
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
          :`<span style="color:var(--t3);font-size:.84rem">Belum ada file dilampirkan — Edit arsip untuk menambahkan link Google Drive.</span>`}
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

/* ═════ DOCUMENT VIEWER (GDrive Preview) ═════ */
function getGDriveEmbedUrl(url) {
  if(!url)return null;
  // https://drive.google.com/file/d/ID/view → /preview
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

/* ═════ ACTIVITY ═════ */
function log(type,text){
  const item = { id: genId(), type, text, time: new Date().toISOString() };
  activity.unshift(item);
  if(activity.length>120)activity=activity.slice(0,120);
  db.collection('activity').doc(item.id).set(item).catch(e => console.error(e));
}
function renderActivity() {
  const el=document.getElementById('activityList'); if(!el)return;
  if(!activity.length){el.innerHTML='<div class="act-empty"><i class="fas fa-history"></i><p>Belum ada aktivitas.</p></div>';return;}
  const cfg={add:{cls:'dot-add',ic:'fa-plus'},edit:{cls:'dot-edit',ic:'fa-pen'},delete:{cls:'dot-del',ic:'fa-trash'}};
  el.innerHTML=activity.map(a=>{const c=cfg[a.type]||cfg.add;return`<div class="act-item"><div class="act-dot ${c.cls}"><i class="fas ${c.ic}"></i></div><div class="act-body"><div class="act-text">${esc(a.text)}</div><div class="act-time">${fmtDateTime(a.time)}</div></div></div>`;}).join('');
}
function clearActivity(){ if(!confirm('Hapus semua riwayat aktivitas?'))return; activity=[]; save(); renderActivity(); }

/* ═════ EXPORT ═════ */
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

/* ─── TOAST ─── */
function toast(msg,type='success') {
  const stack=document.getElementById('toastStack'),el=document.createElement('div');
  el.className=`toast-item ${type}`;
  el.innerHTML=`<i class="fas ${type==='success'?'fa-circle-check si':'fa-circle-exclamation ei'}"></i> ${msg}`;
  stack.prepend(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(20px)';el.style.transition='all .3s';setTimeout(()=>el.remove(),300);},3200);
}

/* ═════ MASTER DATA MAHASISWA ═════ */
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
      <div class="profile-role">Tgl Masuk: ${fmtDate(m.angkatan)}</div>
      <span class="p-badge pb-${m.status}">${m.status.replace('_',' ')}</span>
      <div class="doc-links"><button class="btn-ghost-sm" onclick="viewPersonDetail('${m.id}','mhs')"><i class="fas fa-address-card"></i> Detail Profil</button></div>
    </div>
  `).join('');
  renderMahasiswaCharts(data);
}

let mhsTrendChartIns=null, mhsStatusChartIns=null;
function renderMahasiswaCharts(data) {
  if (mhsTrendChartIns) mhsTrendChartIns.destroy();
  if (mhsStatusChartIns) mhsStatusChartIns.destroy();

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
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
      }
    }
  });

  // 2. Status Chart
  const stCounts = { aktif:0, cuti:0, lulus:0, keluar:0 };
  data.forEach(m => {
    if(stCounts[m.status] !== undefined) stCounts[m.status]++;
  });
  
  mhsStatusChartIns = new Chart(document.getElementById('mhsStatusChart'), {
    type: 'doughnut',
    data: {
      labels: ['Aktif', 'Cuti', 'Lulus', 'Keluar'],
      datasets: [{
        data: [stCounts.aktif, stCounts.cuti, stCounts.lulus, stCounts.keluar],
        backgroundColor: ['#22c55e', '#f59e0b', '#3b82f6', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        title: { display: false }
      }
    }
  });
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
  if (record) db.collection('mahasiswa').doc(record.id).set(record).catch(e => console.error(e));
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

/* ═════ MASTER DATA SDM ═════ */
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
  if (record) db.collection('sdm').doc(record.id).set(record).catch(e => console.error(e));
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

/* ═════ HELPER MASTER DATA ═════ */
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
        <div style="font-size:.85rem;color:var(--t2)">${type==='mhs' ? 'NIM: '+esc(m.nim) + ' &bull; Semester ' + esc(m.semester||'—') : 'NIDN/NIK: '+esc(m.nik)}</div>
        <div style="font-size:.85rem;color:var(--t2)">${type==='mhs' ? 'Tgl Masuk: '+fmtDate(m.angkatan) : esc(m.jabatan)}</div>
      </div>
    </div>
    
    <div style="margin-bottom:10px;font-weight:600;color:var(--t1)"><i class="fas fa-address-book" style="color:var(--primary);margin-right:6px"></i> Biodata Lengkap</div>
    <table style="width:100%;border-collapse:collapse;font-size:.85rem;margin-bottom:20px">
      <tbody>
        <tr><td style="padding:6px 0;width:35%;color:var(--t3)">Tempat, Tanggal Lahir</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.tempatLahir||'—')}, ${fmtDate(m.tanggalLahir)}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3)">Jenis Kelamin</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.jk||'—')}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3)">Agama</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.agama||'—')}</td></tr>
        ${type==='mhs' ? `<tr><td style="padding:6px 0;color:var(--t3)">Nama Orang Tua</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.namaOrtu||'—')}</td></tr>` : ''}
        <tr><td style="padding:6px 0;color:var(--t3)">No. Handphone (WA)</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.noHp||'—')}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3)">Email</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.email||'—')}</td></tr>
        <tr><td style="padding:6px 0;color:var(--t3);vertical-align:top">Alamat Lengkap</td><td style="padding:6px 0;color:var(--t1);font-weight:500">${esc(m.alamat||'—')}</td></tr>
      </tbody>
    </table>
    
    <div style="margin-bottom:10px;font-weight:600;color:var(--t1)"><i class="fas fa-notes-medical" style="color:#22c55e;margin-right:6px"></i> Jaminan Kesehatan</div>
    <div style="background:var(--bg3);padding:12px;border-radius:8px;font-size:.85rem;color:var(--t1);margin-bottom:20px;border:1px solid var(--b1)">
      <span style="color:var(--t3)">No. BPJS / Jaminan:</span> <span style="font-weight:600">${esc(m.noBpjs||'—')}</span>
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

/* ═════ AKREDITASI (BAN-PT & LAM-PTKes) ═════ */

// ==================== BAN-PT ====================
function initBanpt() {
  generateBanptOverview();
  generateBanptKeuangan();
  generateBanptKebijakan();
  generateBanptLppm();
}
function switchBanptTab(tabId, el) {
  if (el) {
    document.querySelectorAll('#banpt-sub-menu li').forEach(li => li.classList.remove('active'));
    el.classList.add('active');
  }
  document.getElementById('page-banpt').querySelectorAll('.akr-tab-content').forEach(div => div.classList.add('hidden'));
  document.getElementById('banpt_tab_' + tabId).classList.remove('hidden');
}
function generateBanptOverview() {
  const tbody = document.querySelector('#tableBanptMaba tbody');
  if(!tbody) return;
  const stats = {};
  mahasiswa.forEach(m => {
    if(!stats[m.angkatan]) stats[m.angkatan] = { aktif:0, lulus:0, do:0, total:0 };
    stats[m.angkatan].total++;
    if(m.status === 'Aktif') stats[m.angkatan].aktif++;
    else if(m.status === 'Lulus') stats[m.angkatan].lulus++;
    else stats[m.angkatan].do++;
  });
  const years = Object.keys(stats).sort((a,b)=>b.localeCompare(a));
  let html = '';
  years.forEach(y => {
    html += `<tr>
      <td class="font-bold">${y}/${parseInt(y)+1}</td>
      <td>${stats[y].total * 3}</td><td>${stats[y].total * 2}</td>
      <td>${stats[y].total}</td><td>0</td>
      <td><span class="badge bg-blue-100 text-blue-700">${stats[y].aktif}</span></td>
    </tr>`;
  });
  if(years.length===0) html = '<tr><td colspan="6" class="text-center text-t3">Belum ada data pendaftar.</td></tr>';
  tbody.innerHTML = html;
  
  if (window.chartBanptMabaInstance) window.chartBanptMabaInstance.destroy();
  const ctx = document.getElementById('chartBanptMaba');
  if (ctx && years.length>0) {
    window.chartBanptMabaInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years.slice(0,5).reverse(),
        datasets: [{ label:'Maba Aktif', data:years.slice(0,5).reverse().map(y=>stats[y].aktif), backgroundColor:'#3b82f6', borderRadius:4 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}} }
    });
  }
}
function generateBanptKeuangan() {
  const tbody = document.querySelector('#tableBanptKeuangan tbody');
  if(!tbody) return;
  const list = arsip.filter(a => a.bidang === 'keuangan');
  tbody.innerHTML = list.length===0 ? '<tr><td colspan="4" class="text-center text-t3">Belum ada dokumen Keuangan.</td></tr>' : list.map(a => {
    const fileLink = a.gdriveLink ? `<a href="${a.gdriveLink}" target="_blank" class="text-blue-600"><i class="fas fa-file-pdf"></i> Dokumen</a>` : '-';
    return `<tr><td class="font-bold">${esc(a.judul)}</td><td>${esc(a.tahun || getAY(a.tanggal))}</td><td><span class="badge bg-blue-50 text-blue-600">${a.status}</span></td><td>${fileLink}</td></tr>`;
  }).join('');
}
function generateBanptKebijakan() {
  const tbody = document.querySelector('#tableBanptKebijakan tbody');
  if(!tbody) return;
  const list = arsip.filter(a => a.jenis === 'sk' || a.jenis === 'sop' || a.jenis === 'kebijakan');
  tbody.innerHTML = list.length===0 ? '<tr><td colspan="4" class="text-center text-t3">Belum ada dokumen Kebijakan.</td></tr>' : list.map(a => {
    const fileLink = a.gdriveLink ? `<a href="${a.gdriveLink}" target="_blank" class="text-blue-600"><i class="fas fa-file-pdf"></i> Lihat SK</a>` : '-';
    return `<tr><td class="font-bold">${esc(a.nomor)}</td><td>${esc(a.judul)}</td><td>${formatDate(a.tanggal)}</td><td>${fileLink}</td></tr>`;
  }).join('');
}
function generateBanptLppm() {
  const tbody = document.querySelector('#tableBanptLppm tbody');
  if(!tbody) return;
  const list = arsip.filter(a => a.bidang === 'lppm');
  tbody.innerHTML = list.length===0 ? '<tr><td colspan="4" class="text-center text-t3">Belum ada dokumen Penelitian & PkM.</td></tr>' : list.map(a => {
    const fileLink = a.gdriveLink ? `<a href="${a.gdriveLink}" target="_blank" class="text-blue-600"><i class="fas fa-file-pdf"></i> Lihat File</a>` : '-';
    return `<tr><td class="font-bold">${esc(a.judul)}</td><td>${esc(a.jenis.toUpperCase())}</td><td>${esc(a.tahun || getAY(a.tanggal))}</td><td>${fileLink}</td></tr>`;
  }).join('');
}
function exportBanptExcel() { alert('Export BAN-PT sedang dalam pengembangan API.'); }

// ==================== LAM-PTKes ====================
let currentLamptkesTab = 1;

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
  9: "Luaran dan Capaian Tridharma",
  10: "Laporan Kinerja Program Studi (Bab II)"
};

function generateLamptkesReport() {
  const container = document.getElementById('lamptkesReportContainer');
  if(!container) return;

  let filtered = arsip.filter(a => getKriteriaNumber(a.jenis) === currentLamptkesTab);
  
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
    html += "<td><span class='badge bg-blue-100 text-blue-800' style='font-size:0.75rem'>"+bidangLabel+"</span><br><div title=\""+jenisLabel.replace(/\"/g, '&quot;')+"\" style='max-width:250px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:0.75rem; color:var(--text-sub)'>"+jenisLabel+"</div></td>";
    html += "<td>"+item.tanggal+"</td>";
    html += "<td>";
    if (item.link) {
      html += "<a href='"+item.link+"' target='_blank' class='btn-action btn-edit text-xs' style='text-decoration:none'><i class='fas fa-external-link-alt'></i> Lihat Dokumen</a>";
    } else {
      html += "<span class='text-red-500 text-xs'>-</span>";
    }
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
      'Kriteria': (getKriteriaNumber(a.jenis) === 10) ? 'Bab II (LKPS)' : 'Kriteria ' + getKriteriaNumber(a.jenis),
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
      (getKriteriaNumber(a.jenis) === 10) ? 'Bab II' : 'K' + getKriteriaNumber(a.jenis),
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
      let krit = (getKriteriaNumber(a.jenis) === 10) ? 'Bab II (LKPS)' : 'Kriteria ' + getKriteriaNumber(a.jenis);
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
