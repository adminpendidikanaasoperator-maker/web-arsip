# 📋 DOKUMENTASI LENGKAP & CATATAN PERCAKAPAN PENGEMBANGAN
## SIPENAS (Sistem Informasi & Arsip Digital Bidang Pendidikan) & Integrasi SIMARSIP
### Akademi Akupunktur Surabaya (AAS)
**Terakhir Diperbarui:** 26 September 2026

---

## 📌 1. Ikhtisar Proyek & Tujuan
Sistem Informasi dan Repositori Digital **Bidang Pendidikan (SIPENAS)** dikembangkan untuk mendigitalkan, mengarsipkan, dan memvisualisasikan seluruh tata kelola pendidikan vokasi D-III Akupunktur di Akademi Akupunktur Surabaya. Sistem ini terintegrasi penuh secara realtime dua arah dengan sistem induk arsip kampus **SIMARSIP** di [https://arsip.akademiakupunktursurabaya.web.id/](https://arsip.akademiakupunktursurabaya.web.id/).

---

## 📜 2. Kronologi Lengkap Riwayat Permintaan & Solusi

### 1. Pembuatan Web App Bidang Pendidikan (SIPENAS)
- **Kebutuhan**: Membangun portal mandiri penyimpanan berkas pendidikan AAS berbasis cloud.
- **Implementasi**:
  - Stack teknologi: React 19, Vite, Tailwind CSS, Lucide React, Chart.js.
  - Implementasi 10 kategori resmi pendidikan vokasi kesehatan:
    1. Kurikulum & RPS OBE
    2. Modul & Bahan Ajar
    3. Kalender & Jadwal Kuliah
    4. Soal Ujian & OSCE
    5. SK Beban Mengajar Dosen
    6. Berita Acara & Presensi Kuliah
    7. Panduan Praktik Klinik & RS
    8. Akreditasi & Dokumen LAM-PTKes
    9. Evaluasi & Notulen Rapat Monev
    10. Dokumen Lainnya / Kebijakan

### 2. Manajemen Pengguna (Users) & Pengaturan Sistem (Settings)
- **Kebutuhan**: Panel otorisasi pengguna dan panel konfigurasi kuota cloud.
- **Implementasi**:
  - `UsersView.jsx`: Pengelolaan akun pengguna, penetapan peran (*Super Admin*, *Admin Pendidikan*, *Dosen Pengampu*, *Staf Akademik*), filter pencarian, dan modal tambah/edit pengguna.
  - `SettingsView.jsx`: Monitoring kapasitas penyimpanan cloud, pengaturan integrasi multi-cloud, cadangan data JSON, dan parameter institusi.

### 3. Pembersihan Data Dummy Awal (Production Ready)
- **Kebutuhan**: Memastikan sistem beroperasi tanpa data pura-pura/contoh.
- **Implementasi**:
  - Seluruh mock data dinonaktifkan (`INITIAL_ARCHIVE_FILES = []`).
  - Sistem disiapkan dalam status siap pakai (*clean slate*) murni membaca database.

### 4. Konfigurasi Autentikasi Firebase & Multi-Cloud Deployment
- **Kebutuhan**:
  - Akun login admin resmi: `adminpendidikanaas.operator@gmail.com`
  - Deployment ke Firebase Hosting (`bidang-pendidikan.web.app`) & Cloudflare Pages/Workers (`bidang-pendidikan.adminpendidikanaas-operator.workers.dev`).
  - Push ke GitHub: `https://github.com/adminpendidikanaasoperator-maker/Bidang-Pendidikan`.

### 5. Penomoran Dokumen Otomatis & Atribut Tahun Akademik
- **Kebutuhan**: Format penomoran dokumen resmi unik dan pencatatan tahun akademik berstandar akreditasi.
- **Implementasi**:
  - Generator format ID unik: `DOC-PEND-[TAHUN]-[RANDOM]` (contoh: `DOC-PEND-2026-8492`).
  - Atribut `academicYear` (misal: `2026/2027 Ganjil`, `2025/2026 Genap`) terintegrasi pada seluruh form upload, filter, tabel, dan cetak PDF.

### 6. Grafik & Visualisasi Statistik di Setiap Modul
- **Kebutuhan**: Visualisasi analitik interaktif di dashboard, repositori berkas, dan manajemen pengguna.
- **Implementasi**:
  - Visualisasi 10 Kategori, Tren Tahun Akademik, Proporsi Semester I-VI, Format Berkas, Rasio Peran Dosen/Tendik, dan Bar Kuota Cloud.

### 7. Integrasi Penuh ke Portal Induk (SIMARSIP)
- **Kebutuhan**: Menampilkan menu Pendidikan, grafik analitik, submenu sidebar, dan sinkronisasi realtime pada website master [https://arsip.akademiakupunktursurabaya.web.id/](https://arsip.akademiakupunktursurabaya.web.id/).
- **Implementasi**:
  - Pembuatan dropdown menu sidebar 14 item untuk Pendidikan.
  - Pembuatan 4 sub-tab utama di halaman Pendidikan SIMARSIP:
    1. *Dashboard & Grafik*
    2. *Kelola Berkas Arsip (10 Kategori)*
    3. *Struktur Kurikulum OBE & RPS*
    4. *Web App SIPENAS Utuh (Embedded Iframe)*
  - Terhubung langsung ke Firestore collection `sipenas_archive_files`.

### 8. Sinkronisasi Realtime Lintas Komputer / Perangkat
- **Kebutuhan**: Memastikan setiap berkas yang diunggah/diubah di satu komputer langsung terbaca seketika di komputer lain tanpa perlu refresh halaman.
- **Implementasi**:
  - Implementasi listener Firestore aktif (`onSnapshot`).
  - Indikator status koneksi hijau berkedip *"⚡ Realtime Live (Firestore)"* pada antarmuka.

### 9. Penghapusan Data Dummy Kurikulum & Penegasan Tombol Sidebar
- **Kebutuhan Pengguna**:
  - *"Di simarsip kenapa bidang pendidikan ada datanya padahal di portal bidang pendidikan datanya kosong, hapus data dumy. pastikan data bidang pendidikan kosong sesuai dengan portal pendidikan."*
  - *"Maksud saya yang dihapus kurikulum dumynyabukan tombol disidebarnya"*
- **Akar Masalah**:
  - Di `DATA WEB ARSIP/app.js` sebelumnya terdapat konstanta `FALLBACK_PENDIDIKAN_COURSES` berisikan 12 baris mata kuliah statis (`AKP101` - `AKP601`). Hal ini menyebabkan tab *Struktur Kurikulum OBE & RPS* menampilkan 12 baris data meskipun database riil kosong.
- **Solusi yang Diterapkan**:
  - **Tombol Sidebar Tetap Utuh**: Menu sidebar **"Struktur Mata Kuliah & RPS"** dan kategori **"Kurikulum & RPS OBE"** tetap dipertahankan dan aktif 100%.
  - **Tab Navigasi Tetap Utuh**: Tab **"Struktur Kurikulum OBE & RPS"** tetap tersedia dan berfungsi.
  - **Data Dummy Dihapus Total**: `FALLBACK_PENDIDIKAN_COURSES` dihapus dari `app.js`. Tabel kurikulum kini secara murni menampilkan status kosong bersih (*0 data*):
    `"Belum Ada Dokumen Kurikulum & RPS - Data kosong (0 berkas) murni sesuai database Portal Bidang Pendidikan."`
  - Tabel baru akan terisi otomatis apabila berkas RPS/Kurikulum asli diunggah ke dalam sistem.
  - Dilakukan cache-busting `app.js?v=20260926_kurikulum_clean`, git commit, git push, dan deploy ke Firebase Hosting `arsip-aas`.

---

## 🔑 3. Kredensial & Konfigurasi Teknis

### A. Akun Administrator Utama
- **Email**: `adminpendidikanaas.operator@gmail.com`
- **Password**: `B@gus18081992`
- **Peran**: Super Administrator / Penanggung Jawab Bidang Pendidikan AAS

### B. Proyek Firebase Cloud
- **Portal Bidang Pendidikan**:
  - Project ID: `bidang-pendidikan`
  - Storage Bucket: `bidang-pendidikan.firebasestorage.app`
  - Koleksi Firestore Utama: `sipenas_archive_files`
- **Portal Master SIMARSIP**:
  - Project ID: `arsip-aas`
  - Hosting: `https://arsip-aas.web.app` $\rightarrow$ `https://arsip.akademiakupunktursurabaya.web.id/`

### C. Repositori GitHub
1. **SIPENAS (App Bidang Pendidikan)**:
   - Git: `https://github.com/adminpendidikanaasoperator-maker/Bidang-Pendidikan.git`
   - Branch: `main`
2. **SIMARSIP (DATA WEB ARSIP)**:
   - Git: `https://github.com/adminpendidikanaasoperator-maker/web-arsip.git`
   - Branch: `main`

### D. Alamat Akses Live (Produksi)
- **Sistem Master SIMARSIP**: [https://arsip.akademiakupunktursurabaya.web.id/](https://arsip.akademiakupunktursurabaya.web.id/)
- **Portal Web App SIPENAS (Firebase)**: [https://bidang-pendidikan.web.app](https://bidang-pendidikan.web.app)
- **Portal Web App SIPENAS (Cloudflare)**: [https://bidang-pendidikan.adminpendidikanaas-operator.workers.dev](https://bidang-pendidikan.adminpendidikanaas-operator.workers.dev)

---

## 📂 4. 10 Kategori Resmi Arsip Bidang Pendidikan
| No | Nama Kategori | Kode Arsip | Deskripsi Dokumen |
|:---:|:---|:---:|:---|
| 1 | **Kurikulum & RPS OBE** | `KUR` | Naskah kurikulum, pemetaan CPL-CPMK, RPS OBE Teori & Praktikum |
| 2 | **Modul & Bahan Ajar** | `MDL` | Modul praktikum meridian, diktat kuliah akupresur & moksibusi |
| 3 | **Kalender & Jadwal Kuliah** | `JAD` | Kalender akademik tahunan, jadwal kuliah, jadwal ujian blok |
| 4 | **Soal Ujian & OSCE** | `SOAL` | Blueprint ujian, bank soal UTS/UAS, rubrik stase OSCE klinis |
| 5 | **SK Beban Mengajar Dosen** | `SK` | SK Direktur penugasan beban mengajar dosen tetap & tidak tetap |
| 6 | **Berita Acara & Presensi** | `BAP` | BAP perkuliahan, lembar presensi mahasiswa dan dosen |
| 7 | **Praktik Klinik & RS** | `KLN` | Logbook stase RS jejaring, penilaian pembimbing klinis CI |
| 8 | **Akreditasi LAM-PTKes** | `AKR` | Bukti fisik borang akreditasi Kriteria 2 (Kurikulum) & Kriteria 3 |
| 9 | **Evaluasi & Notulen Monev** | `MNV` | Notulen rapat tim kurikulum, laporan monev pembelajaran berkala |
| 10 | **Dokumen Lainnya / Kebijakan** | `LAIN` | Panduan Tugas Akhir/KTI, kode etik akademik, surat edaran |

---

## 💡 5. Panduan Operasional & Pemeliharaan Cepat

1. **Mengunggah Dokumen Baru**:
   - Buka SIPENAS atau SIMARSIP $\rightarrow$ Tab *Kelola Berkas Arsip*.
   - Klik tombol **+ Upload Berkas**.
   - Masukkan judul, pilih kategori (1 dari 10 kategori), tahun akademik, semester, dan unggah file PDF/dokumen atau masukkan link Google Drive.
   - Data otomatis tersimpan di cloud Firestore dan muncul seketika di semua perangkat.

2. **Mengecek Status Kosong vs Terisi**:
   - Jika belum ada dokumen yang diunggah, dashboard dan tabel menampilkan angka 0 secara rapi dan bersih.
   - Begitu dokumen diunggah, grafik visual, tabel repositori, dan tab kurikulum akan otomatis menghitung dan menampilkan datanya secara realtime.

3. **Cara Hard Refresh Browser**:
   - Jika tampilan browser pengguna belum terupdate karena cache:
     - Windows: Tekan **`Ctrl + F5`** atau **`Ctrl + Shift + R`**.
     - Mac: Tekan **`Cmd + Shift + R`**.

---
*Catatan dokumentasi ini telah tersimpan aman di repositori proyek dan arsip sistem.*
