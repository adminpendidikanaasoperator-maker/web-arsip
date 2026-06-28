
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
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyVPovygRvN1B-JMWtXpCxMvvI-f2qJHJqjm9ENsGO2-mAV711VWhBd7sLGEAUGtqGY/exec'; 

/* ─── DEPARTEMEN ─── */
const DEPT = {
  // Wadir I
  akademik: { label:'Bidang Administrasi Akademik & Pendidikan', icon:'fas fa-graduation-cap', color:'#3b82f6' },
  sistem_pendidikan: { label:'Bidang Administrasi Sistem Informasi Pendidikan Tinggi', icon:'fas fa-laptop-code', color:'#6366f1' },
  laboratorium: { label:'Bidang Laboratorium', icon:'fas fa-vials', color:'#8b5cf6' },
  perpustakaan: { label:'Bidang Perpustakaan', icon:'fas fa-book', color:'#a855f7' },
  lppm: { label:'Bidang Penelitian & Pelatihan (LPPM)', icon:'fas fa-microscope', color:'#d946ef' },
  kemahasiswaan: { label:'Bidang Kemahasiswaan & Alumni', icon:'fas fa-users', color:'#ec4899' },
  pengabdian: { label:'Bidang Pengabdian Masyarakat', icon:'fas fa-hands-helping', color:'#f43f5e' },
  
  // Wadir II
  umum: { label:'Bidang Administrasi Umum & Kelembagaan', icon:'fas fa-building', color:'#f97316' },
  kepegawaian: { label:'Bidang Administrasi Kepegawaian', icon:'fas fa-user-tie', color:'#f59e0b' },
  keuangan: { label:'Bidang Administrasi Keuangan Institusi & Pendidikan', icon:'fas fa-coins', color:'#eab308' },
  rumah_tangga: { label:'Bidang Rumah Tangga', icon:'fas fa-home', color:'#84cc16' },
  sarana: { label:'Bidang Sarana Prasarana', icon:'fas fa-tools', color:'#22c55e' },
  sistem_informasi: { label:'Bidang Sistem Informasi', icon:'fas fa-network-wired', color:'#10b981' },
  humas: { label:'Bidang HUMAS', icon:'fas fa-bullhorn', color:'#14b8a6' },
  kerjasama: { label:'Bidang Kerjasama', icon:'fas fa-handshake', color:'#06b6d4' },

  // Backward compatibility keys (if they existed previously, they'll fall back gracefully or just display their label)
  pendidikan: { label:'Pendidikan', icon:'fas fa-graduation-cap', color:'#3b82f6' },
  sdm: { label:'SDM & Kepegawaian', icon:'fas fa-user-tie', color:'#ec4899' }
};

/* ─── JENIS DOKUMEN PER BIDANG (tidak ada "Lainnya") ─── */


const LAMPTKES_KRITERIA_JENIS = {
  lamptkes_k1: [
    {val: 'k1_1', label: '1. Laporan kegiatan atau notulen rapat perumusan visi, misi, dan unggulan'},
    {val: 'k1_2', label: '2. Bukti kegiatan keterlibatan pemangku kepentingan internal dan eksternal'},
    {val: 'k1_3', label: '3. Media yang digunakan untuk publikasi/sosialisasi visi, misi, dan unggulan'},
    {val: 'k1_4', label: '4. Dokumen rencana strategi (renstra) dan rencana operasional (renop)'}
  ],
  lamptkes_k2: [
    {val: 'k2_1', label: '1. Notulen rapat komite kurikulum untuk merumuskan capaian pembelajaran'},
    {val: 'k2_2', label: '2. Buku kurikulum (prinsip, struktur, isi, urutan, kompetensi, RPS, dll)'},
    {val: 'k2_3', label: '3. Daftar departemen klinik untuk penempatan mahasiswa'},
    {val: 'k2_4', label: '4. Daftar rumah sakit pendidikan dan wahana praktik'},
    {val: 'k2_5', label: '5. Notulen rapat komite kurikulum tentang metode pendidikan, evaluasi'},
    {val: 'k2_6', label: '6. Modul dan Panduan praktik klinik profesional mahasiswa'},
    {val: 'k2_7', label: '7. Risalah rapat keterlibatan pemangku kepentingan eksternal'},
    {val: 'k2_8', label: '8. Pedoman pelaksanaan RCA (Root Cause Analysis)'},
    {val: 'k2_9', label: '9. Kebijakan dan prosedur mitigasi/manajemen risiko'}
  ],
  lamptkes_k3: [
    {val: 'k3_1', label: '1. Prosedur operasional standar penilaian'},
    {val: 'k3_2', label: '2. Buku catatan mahasiswa (logbook), revisi strategi pengajaran'},
    {val: 'k3_3', label: '3. Mekanisme remedial dan konseling'},
    {val: 'k3_4', label: '4. Cetak biru (blueprint) penilaian'},
    {val: 'k3_5', label: '5. Prosedur mekanisme banding'},
    {val: 'k3_6', label: '6. Dokumen sistem Penjaminan Mutu: perencanaan dan pelaksanaan'},
    {val: 'k3_7', label: '7. Kebijakan dan prosedur penilaian sesuai tempat pembelajaran'},
    {val: 'k3_8', label: '8. Laporan hasil Uji Kompetensi CBT dan OSCE'}
  ],
  lamptkes_k4: [
    {val: 'k4_1', label: '1. Peraturan tentang kebijakan seleksi dan penerimaan'},
    {val: 'k4_2', label: '2. Kebijakan, peraturan, prosedur dukungan layanan mahasiswa'},
    {val: 'k4_3', label: '3. Kebijakan, peraturan, dan prosedur konseling mahasiswa'},
    {val: 'k4_4', label: '4. Pendukung SDM, fasilitas, keuangan untuk layanan mahasiswa'},
    {val: 'k4_5', label: '5. Monitoring dan evaluasi penerapan sistem pendukung mahasiswa'},
    {val: 'k4_6', label: '6. Dokumen hasil survey kepuasan mahasiswa terhadap layanan mahasiswa'},
    {val: 'k4_7', label: '7. Dokumen hasil survey kepuasan mahasiswa terhadap layanan manajemen'},
    {val: 'k4_8', label: '8. Kebijakan, peraturan mengenai kampus sehat'},
    {val: 'k4_9', label: '9. Pedoman pelaksanaan RCA (Root Cause Analysis)'},
    {val: 'k4_10', label: '10. Pemantauan dan evaluasi penerapan sistem pendukung mahasiswa'},
    {val: 'k4_11', label: '11. Pedoman RCA (Root Cause Analysis) (11)'}
  ],
  lamptkes_k5: [
    {val: 'k5_1', label: '1. Rencana pengembangan SDM sesuai disiplin ilmu'},
    {val: 'k5_2', label: '2. Kebijakan dan prosedur pengembangan SDM (dosen dan tendik)'},
    {val: 'k5_3', label: '3. Notulen/risalah rapat dan daftar kehadiran kegiatan pengembangan SDM'},
    {val: 'k5_4', label: '4. Pemetaan disiplin kurikulum (kesesuaian bidang ilmu)'},
    {val: 'k5_5', label: '5. Formulir monitoring dan evaluasi kinerja dosen'},
    {val: 'k5_6', label: '6. Laporan program pelatihan orientasi'},
    {val: 'k5_7', label: '7. Laporan program pelatihan untuk dosen baru dan lama'},
    {val: 'k5_8', label: '8. Roadmap penelitian dan PkM dosen'},
    {val: 'k5_9', label: '9. Laporan penelitian dan PkM dosen serta publikasinya'},
    {val: 'k5_10', label: '10. Bukti penghargaan atau pengakuan hasil penelitian (HaKI/Paten)'},
    {val: 'k5_11', label: '11. Kebijakan penelitian dan PkM serta integrasinya'},
    {val: 'k5_12', label: '12. Sertifikat Pendidik/Dosen, Kompetensi, dan Ijazah'},
    {val: 'k5_13', label: '13. HaKI atau surat pengakuan/penghargaan dari lembaga nasional/internasional'},
    {val: 'k5_14', label: '14. Formulir monitoring dan evaluasi kinerja tendik'},
    {val: 'k5_15', label: '15. Laporan program pelatihan tendik'}
  ],
  lamptkes_k6: [
    {val: 'k6_1', label: '1. Daftar infrastruktur fisik/sarana dan prasarana'},
    {val: 'k6_2', label: '2. Daftar sistem pendukung pembelajaran lainnya (internet dll)'},
    {val: 'k6_3', label: '3. Daftar rumah sakit pendidikan dan wahana praktik klinik'},
    {val: 'k6_4', label: '4. Daftar fasilitas di rumah sakit pendidikan dan pengajaran klinik'},
    {val: 'k6_5', label: '5. Daftar manekin yang tersedia untuk pelatihan keterampilan klinik'},
    {val: 'k6_6', label: '6. Kebijakan mengenai keselamatan dan kesehatan kerja civitas akademika'},
    {val: 'k6_7', label: '7. Daftar pasien standar dan laporan pelatihannya'},
    {val: 'k6_8', label: '8. Daftar pelatihan dan laporannya dari dosen klinis'},
    {val: 'k6_9', label: '9. Daftar database jurnal yang tersedia'},
    {val: 'k6_10', label: '10. Formulir evaluasi dan umpan balik dari mahasiswa dan staf'},
    {val: 'k6_11', label: '11. Fasilitas untuk mengakses sumber informasi dan sumber belajar'},
    {val: 'k6_12', label: '12. Data hasil survei kepuasan pelayanan dari pemangku kepentingan'},
    {val: 'k6_13', label: '13. Data hasil survei kepuasan kualitas dan akses fasilitas fisik'},
    {val: 'k6_14', label: '14. Dokumen audit keuangan dan sarana prasarana'}
  ],
  lamptkes_k7: [
    {val: 'k7_1', label: '1. Sistem penjaminan mutu: struktur dan tupoksi'},
    {val: 'k7_2', label: '2. Dokumen mutu: kebijakan, standar, manual, formulir, dokumen lain'},
    {val: 'k7_3', label: '3. Laporan audit mutu internal'},
    {val: 'k7_4', label: '4. Laporan rapat tinjauan manajemen'},
    {val: 'k7_5', label: '5. Sumber daya yang dialokasikan untuk penjaminan mutu'},
    {val: 'k7_6', label: '6. Notulen/risalah rapat keterlibatan pemangku kepentingan eksternal'},
    {val: 'k7_7', label: '7. Dokumen tindak lanjut atas umpan balik penjaminan mutu'},
    {val: 'k7_8', label: '8. Pedoman pelaksanaan RCA (Root Cause Analysis)'},
    {val: 'k7_9', label: '9. Kebijakan dan prosedur mitigasi risiko'}
  ],
  lamptkes_k8: [
    {val: 'k8_1', label: '1. Bagan organisasi pengelolaan dan administrasi beserta tupoksi'},
    {val: 'k8_2', label: '2. Prosedur operasional standar pengalokasian anggaran'},
    {val: 'k8_3', label: '3. Laporan tinjauan kinerja institusi/UPPS'},
    {val: 'k8_4', label: '4. Dokumen identifikasi dan mitigasi risiko'},
    {val: 'k8_5', label: '5. Laporan rapat keterlibatan mahasiswa dan dosen dalam fungsi UPPS'},
    {val: 'k8_6', label: '6. Standar prosedur operasional (SPO) proses pengambilan keputusan'},
    {val: 'k8_7', label: '7. SPO pelaporan pembelajaran, penelitian, dan pengabdian masyarakat'},
    {val: 'k8_8', label: '8. Dokumen indikator kinerja utama dan kinerja tambahan'}
  ],
  lamptkes_spmi: [
    {val: 'spmi_akademik', label: 'SPMI Bidang Akademik'},
    {val: 'spmi_kemahasiswaan', label: 'SPMI Bidang Kemahasiswaan'},
    {val: 'spmi_umum', label: 'SPMI Bidang Umum & Rumah Tangga'},
    {val: 'spmi_keuangan', label: 'SPMI Bidang Keuangan'},
    {val: 'spmi_sdm', label: 'SPMI Bidang SDM'},
    {val: 'spmi_kerjasama', label: 'SPMI Bidang Kerjasama'}
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
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Kurikulum & Perkuliahan",
      "items": [
        {
          "val": "k2_dokumen_kurikulum",
          "label": "Dokumen Kurikulum"
        },
        {
          "val": "k2_peta_kompetensi",
          "label": "Peta Kompetensi"
        },
        {
          "val": "k2_silabus",
          "label": "Silabus"
        },
        {
          "val": "k2_rps",
          "label": "Rencana Pembelajaran Semester (RPS)"
        },
        {
          "val": "k2_rapat_kurikulum",
          "label": "Notulen Rapat Peninjauan Kurikulum"
        },
        {
          "val": "k2_modul_klinik",
          "label": "Modul Praktik Klinik Profesi"
        },
        {
          "val": "k2_panduan_klinik",
          "label": "Panduan Praktik Klinik Profesi"
        },
        {
          "val": "k6_jadwal_kuliah",
          "label": "Jadwal Perkuliahan"
        },
        {
          "val": "k6_jadwal_praktik",
          "label": "Jadwal Praktik"
        }
      ]
    },
    {
      "group": "Ujian & Penilaian",
      "items": [
        {
          "val": "k3_kebijakan_penilaian",
          "label": "Kebijakan Penilaian Mahasiswa"
        },
        {
          "val": "k3_pedoman_penilaian",
          "label": "Pedoman Penilaian Mahasiswa"
        },
        {
          "val": "k3_spo_penilaian",
          "label": "Prosedur Operasional Standar (SPO) Penilaian"
        },
        {
          "val": "k3_blueprint",
          "label": "Cetak Biru (Blueprint) Ujian / Penilaian"
        },
        {
          "val": "k3_bank_soal",
          "label": "Bank Soal Ujian"
        },
        {
          "val": "k3_analisis_soal",
          "label": "Hasil Analisis Soal Ujian"
        },
        {
          "val": "k3_logbook",
          "label": "Buku Catatan Praktik Mahasiswa (Logbook)"
        },
        {
          "val": "k3_laporan_remedial",
          "label": "Laporan Remedial"
        },
        {
          "val": "k3_mekanisme_remedial",
          "label": "Mekanisme Remedial / Pengayaan"
        }
      ]
    },
    {
      "group": "Laporan & Evaluasi",
      "items": [
        {
          "val": "k2_evaluasi_kurikulum",
          "label": "Laporan Evaluasi Kurikulum"
        },
        {
          "val": "k3_hasil_ukom",
          "label": "Lampiran Hasil Uji Kompetensi CBT & OSCE"
        },
        {
          "val": "k7_evaluasi_pembelajaran",
          "label": "Laporan Evaluasi Mutu Pembelajaran"
        },
        {
          "val": "k6_data_ipk",
          "label": "Data IPK Lulusan"
        },
        {
          "val": "k6_capaian_pembelajaran",
          "label": "Data Capaian Pembelajaran Lulusan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "sistem_pendidikan": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Sistem & E-Learning",
      "items": [
        {
          "val": "k6_sistem_pembelajaran",
          "label": "Sistem Pendukung Pembelajaran (LMS/E-Learning)"
        },
        {
          "val": "k6_sistem_internet",
          "label": "Sistem Pendukung Akses Internet"
        },
        {
          "val": "k6_kebijakan_siakad",
          "label": "Kebijakan Penggunaan SIAKAD"
        },
        {
          "val": "k6_sop_siakad",
          "label": "SOP Penggunaan SIAKAD"
        },
        {
          "val": "k6_panduan_elearning_dosen",
          "label": "Panduan E-Learning untuk Dosen"
        },
        {
          "val": "k6_panduan_elearning_mhs",
          "label": "Panduan E-Learning untuk Mahasiswa"
        }
      ]
    },
    {
      "group": "Evaluasi",
      "items": [
        {
          "val": "k6_formulir_evaluasi_sumber",
          "label": "Formulir Evaluasi Sumber Informasi"
        },
        {
          "val": "k7_evaluasi_sistem",
          "label": "Laporan Evaluasi Keandalan Sistem Pendidikan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "laboratorium": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Inventaris & K3",
      "items": [
        {
          "val": "k6_inventaris_alat_lab",
          "label": "Daftar Inventaris Alat Laboratorium"
        },
        {
          "val": "k6_inventaris_bahan_lab",
          "label": "Daftar Inventaris Bahan Laboratorium"
        },
        {
          "val": "k6_daftar_manekin",
          "label": "Daftar Manekin Pelatihan Keterampilan Klinis"
        },
        {
          "val": "k6_dokumen_k3_lab",
          "label": "Dokumen Keselamatan & Kesehatan Kerja (K3) Lab"
        }
      ]
    },
    {
      "group": "Praktikum & Pelayanan",
      "items": [
        {
          "val": "k6_sop_peralatan_lab",
          "label": "SOP Penggunaan Peralatan Laboratorium"
        },
        {
          "val": "k6_jadwal_penggunaan_lab",
          "label": "Jadwal Penggunaan Laboratorium"
        },
        {
          "val": "k6_jadwal_praktikum",
          "label": "Jadwal Praktikum Laboratorium"
        },
        {
          "val": "k7_evaluasi_pelayanan_lab",
          "label": "Laporan Evaluasi Pelayanan Laboratorium"
        },
        {
          "val": "k7_evaluasi_kondisi_lab",
          "label": "Laporan Evaluasi Kondisi Laboratorium"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "perpustakaan": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Katalog & Koleksi",
      "items": [
        {
          "val": "k6_katalog_buku_teks",
          "label": "Daftar Katalog Buku Teks"
        },
        {
          "val": "k6_katalog_referensi",
          "label": "Daftar Katalog Buku Referensi"
        },
        {
          "val": "k6_langganan_jurnal_nasional",
          "label": "Bukti Langganan Database Jurnal Nasional"
        },
        {
          "val": "k6_langganan_jurnal_internasional",
          "label": "Bukti Langganan Database Jurnal Internasional"
        }
      ]
    },
    {
      "group": "Layanan & Laporan",
      "items": [
        {
          "val": "k6_rekap_kunjungan_perpus",
          "label": "Rekapitulasi Kunjungan Perpustakaan"
        },
        {
          "val": "k6_rekap_peminjaman_buku",
          "label": "Rekapitulasi Peminjaman Pustaka"
        },
        {
          "val": "k6_sop_layanan_perpus",
          "label": "SOP Layanan Perpustakaan"
        },
        {
          "val": "k7_survei_kepuasan_perpus",
          "label": "Laporan Survei Kepuasan Layanan Perpustakaan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "lppm": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Kebijakan & Roadmap",
      "items": [
        {
          "val": "k5_roadmap_penelitian_prodi",
          "label": "Roadmap Penelitian Program Studi"
        },
        {
          "val": "k5_roadmap_penelitian_institusi",
          "label": "Roadmap Penelitian Institusi"
        },
        {
          "val": "k5_buku_pedoman_penelitian",
          "label": "Buku Pedoman Pelaksanaan Penelitian"
        },
        {
          "val": "k5_kebijakan_dana_penelitian",
          "label": "Kebijakan Dana Internal Penelitian"
        }
      ]
    },
    {
      "group": "Luaran & Publikasi",
      "items": [
        {
          "val": "k5_laporan_akhir_penelitian",
          "label": "Laporan Akhir Penelitian Dosen"
        },
        {
          "val": "k5_bukti_publikasi_nasional",
          "label": "Bukti Publikasi Ilmiah (Jurnal Nasional)"
        },
        {
          "val": "k5_bukti_publikasi_internasional",
          "label": "Bukti Publikasi Ilmiah (Jurnal Internasional)"
        },
        {
          "val": "k5_bukti_penghargaan",
          "label": "Bukti Penghargaan"
        },
        {
          "val": "k5_bukti_hki",
          "label": "Bukti Hak Kekayaan Intelektual (HKI)"
        },
        {
          "val": "k5_bukti_paten",
          "label": "Bukti Paten"
        },
        {
          "val": "k7_rekap_luaran_penelitian_dosen",
          "label": "Rekapitulasi Luaran Penelitian Dosen"
        },
        {
          "val": "k7_rekap_luaran_penelitian_mhs",
          "label": "Rekapitulasi Luaran Penelitian Mahasiswa"
        }
      ]
    },
    {
      "group": "Audit & Kinerja",
      "items": [
        {
          "val": "k7_audit_kinerja_lppm",
          "label": "Laporan Audit Kinerja LPPM"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "kemahasiswaan": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Penerimaan & Layanan",
      "items": [
        {
          "val": "k4_kebijakan_seleksi_maba",
          "label": "Kebijakan Seleksi Penerimaan Mahasiswa Baru"
        },
        {
          "val": "k4_pedoman_seleksi_maba",
          "label": "Pedoman Seleksi Penerimaan Mahasiswa Baru"
        },
        {
          "val": "k4_laporan_kinerja_pmb",
          "label": "Laporan Kinerja Panitia PMB"
        },
        {
          "val": "k4_pedoman_layanan_mhs",
          "label": "Pedoman Layanan Mahasiswa"
        },
        {
          "val": "k4_pedoman_rca",
          "label": "Pedoman RCA (Root Cause Analysis) Mahasiswa"
        }
      ]
    },
    {
      "group": "Pembinaan & Ormawa",
      "items": [
        {
          "val": "k4_pembinaan_minat_bakat",
          "label": "Pedoman Pembinaan Minat & Bakat Mahasiswa"
        },
        {
          "val": "k4_kebijakan_kampus_sehat",
          "label": "Kebijakan Kampus Sehat"
        },
        {
          "val": "k4_kebijakan_bebas_kekerasan",
          "label": "Kebijakan Bebas Kekerasan / Anti Perundungan Mhs"
        },
        {
          "val": "k4_kebijakan_anti_narkoba",
          "label": "Kebijakan Anti Narkoba"
        },
        {
          "val": "k4_sk_ormawa",
          "label": "SK Kepengurusan Organisasi Kemahasiswaan"
        },
        {
          "val": "k4_laporan_kegiatan_ormawa",
          "label": "Laporan Kegiatan Organisasi Kemahasiswaan"
        }
      ]
    },
    {
      "group": "Prestasi, Beasiswa & Bimbingan",
      "items": [
        {
          "val": "k4_bukti_prestasi_akademik",
          "label": "Bukti Prestasi Akademik Mahasiswa"
        },
        {
          "val": "k4_bukti_prestasi_non_akademik",
          "label": "Bukti Prestasi Non-Akademik Mahasiswa"
        },
        {
          "val": "k4_daftar_penerima_beasiswa",
          "label": "Daftar Penerima Beasiswa"
        },
        {
          "val": "k4_laporan_penyaluran_beasiswa",
          "label": "Laporan Penyaluran Beasiswa"
        },
        {
          "val": "k4_catatan_bimbingan_akademik",
          "label": "Catatan Pelaksanaan Bimbingan Akademik (PA)"
        },
        {
          "val": "k4_catatan_konseling",
          "label": "Catatan Pelaksanaan Bimbingan Konseling"
        }
      ]
    },
    {
      "group": "Lulusan & Tracer Study",
      "items": [
        {
          "val": "k7_laporan_survei_kepuasan_mhs",
          "label": "Laporan Survei Kepuasan Mahasiswa"
        },
        {
          "val": "k3_laporan_tracer_study",
          "label": "Laporan Tracer Study"
        },
        {
          "val": "k3_survei_kepuasan_pengguna_lulusan",
          "label": "Laporan Kepuasan Pengguna Lulusan"
        },
        {
          "val": "k3_data_waktu_tunggu_lulusan",
          "label": "Data Waktu Tunggu Lulusan"
        },
        {
          "val": "k3_data_pekerjaan_pertama",
          "label": "Data Kesesuaian Bidang Kerja Lulusan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "pengabdian": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Pelaksanaan PkM",
      "items": [
        {
          "val": "k5_roadmap_pkm",
          "label": "Roadmap Pengabdian kepada Masyarakat (PkM)"
        },
        {
          "val": "k5_buku_pedoman_pkm",
          "label": "Buku Pedoman Pelaksanaan PkM"
        },
        {
          "val": "k5_laporan_akhir_pkm",
          "label": "Laporan Akhir Pengabdian kepada Masyarakat"
        },
        {
          "val": "k5_bukti_keterlibatan_mhs_pkm",
          "label": "Bukti Keterlibatan Mahasiswa dalam PkM"
        }
      ]
    },
    {
      "group": "Luaran PkM",
      "items": [
        {
          "val": "k8_luaran_pkm_artikel",
          "label": "Luaran PkM (Artikel Ilmiah/Media Massa)"
        },
        {
          "val": "k8_luaran_pkm_buku",
          "label": "Luaran PkM (Buku/Modul)"
        },
        {
          "val": "k8_luaran_pkm_teknologi",
          "label": "Luaran PkM (Teknologi Tepat Guna / HKI)"
        }
      ]
    },
    {
      "group": "Evaluasi",
      "items": [
        {
          "val": "k7_laporan_mutu_pkm",
          "label": "Laporan Mutu Pelaksanaan PkM"
        },
        {
          "val": "k7_evaluasi_pelaksanaan_pkm",
          "label": "Evaluasi Pelaksanaan PkM"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "umum": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Visi, Misi & Rencana",
      "items": [
        {
          "val": "k1_dokumen_visi",
          "label": "Dokumen Rumusan Visi"
        },
        {
          "val": "k1_dokumen_misi",
          "label": "Dokumen Rumusan Misi"
        },
        {
          "val": "k1_dokumen_tujuan",
          "label": "Dokumen Tujuan Institusi"
        },
        {
          "val": "k1_dokumen_strategi",
          "label": "Dokumen Strategi Pencapaian"
        },
        {
          "val": "k1_renstra",
          "label": "Rencana Strategis (RENSTRA)"
        },
        {
          "val": "k1_renop",
          "label": "Rencana Operasional (RENOP)"
        },
        {
          "val": "k1_bukti_sosialisasi_vmts",
          "label": "Bukti Sosialisasi VMTS"
        },
        {
          "val": "k1_laporan_pemahaman_vmts",
          "label": "Laporan Tingkat Pemahaman VMTS"
        }
      ]
    },
    {
      "group": "Tata Kelola (SOTK)",
      "items": [
        {
          "val": "k8_statuta",
          "label": "Dokumen Statuta Institusi"
        },
        {
          "val": "k8_sotk",
          "label": "Susunan Organisasi Tata Kerja (SOTK)"
        },
        {
          "val": "k8_deskripsi_tupoksi",
          "label": "Deskripsi Tugas Pokok dan Fungsi (Tupoksi)"
        },
        {
          "val": "k8_notulen_rapat_pimpinan",
          "label": "Notulen Rapat Pimpinan"
        },
        {
          "val": "k8_notulen_senat_akademik",
          "label": "Notulen Rapat Senat Akademik"
        },
        {
          "val": "k8_laporan_tinjauan_kinerja",
          "label": "Laporan Tinjauan Kinerja Institusi"
        },
        {
          "val": "k8_dokumen_identifikasi_risiko",
          "label": "Dokumen Identifikasi Risiko"
        },
        {
          "val": "k8_dokumen_mitigasi_risiko",
          "label": "Dokumen Mitigasi Manajemen Risiko"
        }
      ]
    },
    {
      "group": "Sistem Penjaminan Mutu Internal (SPMI)",
      "items": [
        {
          "val": "k7_kebijakan_spmi",
          "label": "Dokumen Kebijakan SPMI"
        },
        {
          "val": "k7_manual_spmi",
          "label": "Dokumen Manual SPMI"
        },
        {
          "val": "k7_standar_mutu_spmi",
          "label": "Dokumen Standar Mutu SPMI"
        },
        {
          "val": "k7_buku_formulir_spmi",
          "label": "Buku Formulir Mutu SPMI"
        },
        {
          "val": "k7_laporan_ami_institusi",
          "label": "Laporan Audit Mutu Internal (AMI) Tingkat Institusi"
        },
        {
          "val": "k7_laporan_ami_prodi",
          "label": "Laporan Audit Mutu Internal (AMI) Tingkat Prodi"
        },
        {
          "val": "k7_laporan_rtm",
          "label": "Laporan Rapat Tinjauan Manajemen (RTM)"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "kepegawaian": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "SDM & Formasi",
      "items": [
        {
          "val": "k5_rip_sdm",
          "label": "Rencana Induk Pengembangan (RIP) SDM"
        },
        {
          "val": "k5_pedoman_rekrutmen_sdm",
          "label": "Pedoman Rekrutmen SDM"
        },
        {
          "val": "k5_pedoman_penempatan_sdm",
          "label": "Pedoman Penempatan SDM"
        },
        {
          "val": "k5_pedoman_pemberhentian_sdm",
          "label": "Pedoman Pemberhentian SDM"
        },
        {
          "val": "k5_pemetaan_formasi_dosen",
          "label": "Pemetaan Formasi Dosen"
        },
        {
          "val": "k5_rasio_dosen_mhs",
          "label": "Data Rasio Dosen-Mahasiswa"
        }
      ]
    },
    {
      "group": "Kinerja & Penilaian",
      "items": [
        {
          "val": "k5_laporan_bkd",
          "label": "Laporan Beban Kerja Dosen (BKD)"
        },
        {
          "val": "k5_hasil_dp3_dosen",
          "label": "Hasil Penilaian Kinerja Dosen (DP3 / SKP)"
        },
        {
          "val": "k5_hasil_dp3_tendik",
          "label": "Hasil Penilaian Kinerja Tendik (DP3 / SKP)"
        }
      ]
    },
    {
      "group": "Dokumen Personal",
      "items": [
        {
          "val": "k5_arsip_ijazah_dosen",
          "label": "Arsip Ijazah Dosen"
        },
        {
          "val": "k5_sertifikat_pendidik",
          "label": "Sertifikat Pendidik (Serdos)"
        },
        {
          "val": "k5_str_dosen",
          "label": "STR / SIP Dosen Klinis"
        },
        {
          "val": "k5_sertifikat_pelatihan_sdm",
          "label": "Sertifikat Pelatihan / Pengembangan Diri SDM"
        },
        {
          "val": "k5_laporan_pengembangan_sdm",
          "label": "Laporan Kegiatan Pengembangan SDM"
        },
        {
          "val": "k5_sk_mengajar",
          "label": "SK Mengajar Dosen"
        },
        {
          "val": "k5_surat_tugas_dosen",
          "label": "Surat Tugas Dosen"
        }
      ]
    },
    {
      "group": "Survei & Lainnya",
      "items": [
        {
          "val": "k5_dokumen_pencegahan_perundungan",
          "label": "Dokumen Pencegahan Perundungan & Kekerasan"
        },
        {
          "val": "k7_laporan_survei_kepuasan_dosen",
          "label": "Laporan Survei Kepuasan Dosen"
        },
        {
          "val": "k7_laporan_survei_kepuasan_tendik",
          "label": "Laporan Survei Kepuasan Tendik"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "keuangan": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Kebijakan & RKAT",
      "items": [
        {
          "val": "k6_kebijakan_penggalian_dana",
          "label": "Kebijakan Penggalian Dana"
        },
        {
          "val": "k6_kebijakan_pengelolaan_dana",
          "label": "Kebijakan Pengelolaan Dana"
        },
        {
          "val": "k6_rkat",
          "label": "Rencana Kerja dan Anggaran Tahunan (RKAT)"
        }
      ]
    },
    {
      "group": "Laporan & SOP",
      "items": [
        {
          "val": "k8_sop_pengajuan_anggaran",
          "label": "SOP Pengajuan Anggaran"
        },
        {
          "val": "k8_sop_pencairan_anggaran",
          "label": "SOP Pencairan Anggaran"
        },
        {
          "val": "k8_sop_pelaporan_anggaran",
          "label": "SOP Pelaporan Anggaran"
        },
        {
          "val": "k6_laporan_realisasi_keuangan",
          "label": "Laporan Realisasi Keuangan Tahunan"
        },
        {
          "val": "k6_laporan_audit_keuangan_eksternal",
          "label": "Laporan Hasil Audit Keuangan Eksternal"
        },
        {
          "val": "k7_laporan_evaluasi_pendanaan",
          "label": "Laporan Evaluasi Kelayakan Pendanaan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "rumah_tangga": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Inventaris & SOP",
      "items": [
        {
          "val": "k6_daftar_inventaris_bmi",
          "label": "Daftar Inventaris Barang Milik Institusi (BMI)"
        },
        {
          "val": "k6_sop_pemeliharaan_kebersihan",
          "label": "SOP Pemeliharaan Kebersihan Lingkungan"
        },
        {
          "val": "k6_sop_pemeliharaan_keamanan",
          "label": "SOP Pemeliharaan Keamanan Kampus"
        }
      ]
    },
    {
      "group": "Laporan & K3",
      "items": [
        {
          "val": "k6_logbook_perbaikan_barang",
          "label": "Logbook Perbaikan Barang / Sarana"
        },
        {
          "val": "k6_laporan_kerusakan_barang",
          "label": "Laporan Kerusakan Barang / Fasilitas"
        },
        {
          "val": "k7_laporan_penilaian_k3",
          "label": "Laporan Penilaian K3 Lingkungan Kampus"
        },
        {
          "val": "k7_laporan_mutu_lingkungan",
          "label": "Laporan Penilaian Mutu Lingkungan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "sarana": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Fasilitas & Lahan",
      "items": [
        {
          "val": "k6_masterplan_sarpras",
          "label": "Masterplan Pengembangan Sarana Prasarana"
        },
        {
          "val": "k6_sertifikat_tanah",
          "label": "Bukti Kepemilikan Lahan (Sertifikat Tanah)"
        },
        {
          "val": "k6_dokumen_imb",
          "label": "Dokumen Izin Mendirikan Bangunan (IMB)"
        },
        {
          "val": "k6_daftar_ruang_kuliah",
          "label": "Daftar Ketersediaan Ruang Kuliah"
        },
        {
          "val": "k6_daftar_ruang_dosen",
          "label": "Daftar Ketersediaan Ruang Dosen"
        }
      ]
    },
    {
      "group": "Rumah Sakit Pendidikan",
      "items": [
        {
          "val": "k6_daftar_rs_pendidikan",
          "label": "Daftar Profil RS Pendidikan / Wahana Praktik"
        },
        {
          "val": "k6_daftar_fasilitas_klinik",
          "label": "Daftar Fasilitas Alat di RS Pendidikan / Lahan Praktik"
        },
        {
          "val": "k7_laporan_evaluasi_sarpras",
          "label": "Laporan Evaluasi Kecukupan Sarana Prasarana"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "sistem_informasi": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Infrastruktur & Jaringan",
      "items": [
        {
          "val": "k8_blueprint_ti",
          "label": "Rencana Strategis Pengembangan TI (Blueprint TI)"
        },
        {
          "val": "k8_profil_bandwidth",
          "label": "Profil Ketersediaan Bandwidth"
        },
        {
          "val": "k8_infrastruktur_jaringan",
          "label": "Profil Infrastruktur Jaringan TI"
        }
      ]
    },
    {
      "group": "Keamanan & Laporan",
      "items": [
        {
          "val": "k8_sop_keamanan_siber",
          "label": "SOP Keamanan Siber / Data"
        },
        {
          "val": "k8_sop_backup_data",
          "label": "SOP Backup & Pemulihan Data (Disaster Recovery)"
        },
        {
          "val": "k8_dokumen_lisensi_software",
          "label": "Dokumen Lisensi Perangkat Lunak Asli"
        },
        {
          "val": "k7_laporan_audit_kinerja_it",
          "label": "Laporan Audit Kinerja Layanan IT"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "humas": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Promosi & Publikasi",
      "items": [
        {
          "val": "k8_dokumen_profil_institusi",
          "label": "Dokumen Buku Profil Institusi"
        },
        {
          "val": "k8_materi_promosi",
          "label": "Brosur / Materi Promosi Kampus"
        },
        {
          "val": "k8_press_release",
          "label": "Press Release & Kliping Berita Media Massa"
        }
      ]
    },
    {
      "group": "Stakeholder & Evaluasi",
      "items": [
        {
          "val": "k8_risalah_rapat_stakeholder",
          "label": "Risalah Rapat dengan Pemangku Kepentingan (Stakeholder)"
        },
        {
          "val": "k4_laporan_kepuasan_stakeholder",
          "label": "Laporan Survei Kepuasan Stakeholder terhadap Manajemen"
        },
        {
          "val": "k7_evaluasi_efektivitas_promosi",
          "label": "Laporan Evaluasi Efektivitas Promosi & Publikasi"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "kerjasama": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "MoU & Perjanjian",
      "items": [
        {
          "val": "k8_dokumen_mou_dalam_negeri",
          "label": "Dokumen MoU Kerjasama Dalam Negeri"
        },
        {
          "val": "k8_dokumen_mou_luar_negeri",
          "label": "Dokumen MoU Kerjasama Luar Negeri"
        },
        {
          "val": "k8_dokumen_moa_pendidikan",
          "label": "Perjanjian Kerja Sama Pelaksanaan (MoA/PKS) Bidang Pendidikan"
        },
        {
          "val": "k8_dokumen_moa_penelitian",
          "label": "Perjanjian Kerja Sama Pelaksanaan (MoA/PKS) Bidang Penelitian"
        },
        {
          "val": "k8_dokumen_moa_pkm",
          "label": "Perjanjian Kerja Sama Pelaksanaan (MoA/PKS) Bidang PkM"
        },
        {
          "val": "k8_dokumen_ia",
          "label": "Dokumen Implementasi Kerjasama (Implementation Arrangement / IA)"
        }
      ]
    },
    {
      "group": "Laporan & Evaluasi",
      "items": [
        {
          "val": "k8_laporan_realisasi_kerjasama",
          "label": "Laporan Realisasi Kinerja Kerjasama Institusi"
        },
        {
          "val": "k7_hasil_survei_kepuasan_mitra",
          "label": "Laporan Hasil Survei Kepuasan Mitra Kerjasama"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "pendidikan": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ],
  "sdm": [
    {
      "group": "Arsip Umum",
      "items": [
        {
          "val": "surat_masuk",
          "label": "Surat Masuk"
        },
        {
          "val": "surat_keluar",
          "label": "Surat Keluar"
        },
        {
          "val": "sk",
          "label": "Surat Keputusan (SK)"
        },
        {
          "val": "surat_tugas",
          "label": "Surat Tugas"
        },
        {
          "val": "sop",
          "label": "Standar Operasional Prosedur (SOP)"
        },
        {
          "val": "notulen",
          "label": "Notulensi Rapat"
        },
        {
          "val": "laporan_kegiatan",
          "label": "Laporan Kegiatan"
        }
      ]
    },
    {
      "group": "Lainnya",
      "items": [
        {
          "val": "lainnya",
          "label": "Lainnya"
        }
      ]
    }
  ]
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
  for(let y=2014; y<=2050; y++) {
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

function processSnapshot(snapshot, collectionName) {
  const data = snapshot.docs.map(d => d.data());
  
  if (collectionName === 'arsip') { arsip = data; }
  else if (collectionName === 'activity') { activity = data; }
  else if (collectionName === 'mahasiswa') { mahasiswa = data; }
  else if (collectionName === 'sdm') { sdm = data; }

  if (!isInitialLoad[collectionName]) {
     const ping = document.getElementById('soundPing');
     if(ping) { ping.currentTime = 0; ping.play().catch(e=>console.log(e)); }
     
     if (typeof isAppLoaded !== 'undefined' && isAppLoaded) {
       populateAYFilters();
       if(typeof populateMhsAyFilters === 'function') populateMhsAyFilters();
       
       if(currentUser) {
         if(currentUser.role==='admin') renderTable(arsip);
         else renderTable(arsip.filter(a=>a.bidang===currentUser.bidang));
       }
       updateStats();
       
       renderDeptSubmenus();
       // Re-render visible page
       const activePage = document.querySelector('.page.active');
       if(activePage) {
          const id = activePage.id;
          if(id === 'page-dashboard') renderDashboard();
          else if(id === 'page-analytics') renderAnalytics();
          else if(id === 'page-dept') renderDeptPage(document.getElementById('deptBannerName').dataset.dept);
          else if(id === 'page-lamptkes') generateLamptkesReport();
          else if(id === 'page-mahasiswa') renderMahasiswaPage();
          else if(id === 'page-sdm') renderSdmPage();
          else if(id === 'page-arsip') renderArsipTable();
       }
     }
  }
}

async function loadData() {
// Migration: Update old bidang keys to new keys
let dataMigrated = false;
arsip.forEach(a => {
  if (a.bidang === 'pendidikan') { a.bidang = 'akademik'; dataMigrated = true; }
  if (a.bidang === 'sdm') { a.bidang = 'kepegawaian'; dataMigrated = true; }
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
  if (a.gdriveLink === 'UPLOADING') return `<span style="color:#f59e0b;font-size:0.85rem;white-space:nowrap"><i class="fas fa-spinner fa-spin"></i> Mengunggah...</span>`;
  const f = getFormatCfg(a.format);
  return `<a href="${esc(a.gdriveLink)}" target="_blank" rel="noopener noreferrer" class="fmt-btn fmt-${a.format||'pdf'}" title="Buka Dokumen: ${esc(a.fileName||'')}"><i class="${f.icon}"></i> ${f.label}</a>`;
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
    if(page === 'lamptkes') generateLamptkesReport();

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
      <td><span class="d-badge" style="background:${d.color}18;color:${d.color}; white-space: normal !important; text-align: left; line-height: 1.2; min-width: 120px; display: inline-block;"><i class="${d.icon}"></i>${d.label}</span></td>
      <td style="font-size:.78rem;color:var(--t2);"><div title="${getJenisLabel(a.bidang,a.jenis).replace(/"/g, '&quot;')}" style="white-space:normal; line-height:1.3; word-break:normal; overflow-wrap:break-word; font-size:0.72rem;">${getJenisLabel(a.bidang,a.jenis)}</div></td>
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
        try {
          db.collection('arsip').doc(record.id).set(arsip[idx]);
        } catch(e) {}
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
          filename: file.name,
          mimeType: file.type || 'application/octet-stream',
          base64Data: base64Data,
          base64: base64Data,
          bidang: DEPT[bidang]?.label || bidang,
          jenis: jenis,
          tahun: tahun,
          folderPath: (function() {
            let level2 = DEPT[bidang]?.label || bidang;
            let level3 = tahun ? "TA " + tahun : "TA Umum";
            let level4 = "Umum";
            const kMatch = getJenisLabel(bidang, jenis).match(/\[?(Kriteria \d+)\]?/i);
            
            if (bidang === 'lamptkes_led') {
               level2 = 'Akreditasi LAM-PTKes';
               level3 = 'Laporan Evaluasi Diri (LED)';
               level4 = kMatch ? kMatch[1] : "Umum";
            } else if (bidang === 'lamptkes_spmi') {
               level2 = 'Akreditasi LAM-PTKes';
               level3 = 'Sistem Penjaminan Mutu Internal (SPMI)';
               level4 = kMatch ? kMatch[1] : "Umum";
            } else {
               level4 = getJenisLabel(bidang, jenis) || "Umum";
            }
            return ["SIMARSIP AAS", level2, level3, level4];
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




