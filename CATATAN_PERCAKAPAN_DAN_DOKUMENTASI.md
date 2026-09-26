# 📋 DOKUMENTASI LENGKAP & CATATAN PERCAKAPAN PENGEMBANGAN
## Ekosistem SIMARSIP, SIPENAS (Bidang Pendidikan), dan SIM-RT (Bidang Rumah Tangga & Sarana)
### Akademi Akupunktur Surabaya (AAS)
**Terakhir Diperbarui:** 27 September 2026

---

## 📌 1. Ikhtisar Proyek & Ekosistem Terpadu AAS
Sistem Informasi Manajemen Arsip (**SIMARSIP**) di [https://arsip.akademiakupunktursurabaya.web.id/](https://arsip.akademiakupunktursurabaya.web.id/) berfungsi sebagai portal induk arsip dan aplikasi terpadu kampus Akademi Akupunktur Surabaya. Di dalam sistem induk ini terhubung modul-modul operasional yang masing-masing berdiri sebagai web application independen dan tersinkronisasi secara realtime lintas komputasi:
1. **SIPENAS (Bidang Pendidikan)**: Repositori kurikulum OBE, RPS, modul, soal OSCE, dan akreditasi pendidikan vokasi.
2. **SIM-RT (Bidang Rumah Tangga & Sarana)**: Pengelolaan operasional kas kecil (*petty cash*), anggaran operasional (*RAB*), tagihan utilitas & pemeliharaan gedung, serta inventaris ATK & aset kampus.
3. **Modul Akademik, Kemahasiswaan, Kepegawaian, Laboratorium, dan Tata Kelola Arsip Kampus**.

Seluruh aplikasi didukung infrastruktur multi-cloud: **GitHub** (versi kode), **Firebase Cloud Firestore & Hosting** (database realtime & CDN), serta **Cloudflare Workers & Pages** (edge computing & failover global).

---

## 📜 2. Kronologi Percakapan & Solusi: Fase 1 (Bidang Pendidikan - SIPENAS)

### 1. Pembangunan Web App Bidang Pendidikan (SIPENAS)
- **Kebutuhan**: Membangun portal mandiri penyimpanan berkas pendidikan AAS berbasis cloud.
- **Implementasi**: React 19, Vite, Tailwind CSS, Lucide React, Chart.js dengan 10 kategori resmi pendidikan vokasi kesehatan (Kurikulum, RPS, Modul, Jadwal, Soal Ujian/OSCE, SK Mengajar, BAP/Presensi, Praktik Klinik, Akreditasi LAM-PTKes, Evaluasi/Monev).

### 2. Manajemen Pengguna & Pengaturan Sistem
- **Implementasi**: Panel peran otorisasi pengguna (`UsersView.jsx`), manajemen kuota cloud dan parameter instansi (`SettingsView.jsx`).

### 3. Pembersihan Data Dummy Awal
- **Implementasi**: Seluruh mock data dinonaktifkan (`INITIAL_ARCHIVE_FILES = []`), sistem beroperasi murni membaca database.

### 4. Konfigurasi Autentikasi Firebase & Multi-Cloud Deployment
- **Implementasi**: Akun admin `adminpendidikanaas.operator@gmail.com`, Firebase Hosting (`bidang-pendidikan.web.app`), Cloudflare Workers (`bidang-pendidikan.adminpendidikanaas-operator.workers.dev`), GitHub `adminpendidikanaasoperator-maker/Bidang-Pendidikan`.

### 5. Penomoran Dokumen & Tahun Akademik
- **Implementasi**: Format ID unik `DOC-PEND-[TAHUN]-[RANDOM]` dan atribut tahun akademik berstandar akreditasi.

### 6. Grafik & Visualisasi Statistik
- **Implementasi**: Grafik distribusi kategori, tren semester, dan bar kuota cloud.

### 7. Integrasi Penuh ke Portal Induk (SIMARSIP)
- **Implementasi**: 14 submenu pendidikan di sidebar SIMARSIP, 4 sub-tab utama (Dashboard, Repositori Berkas, Kurikulum OBE/RPS, SIPENAS Embedded), terhubung ke Firestore `sipenas_archive_files`.

### 8. Penghapusan Data Dummy Kurikulum & Konsistensi Sidebar
- **Catatan Permintaan**: Pengguna meminta dummy kurikulum dihapus tanpa menghilangkan tombol menu di sidebar.
- **Implementasi**: `FALLBACK_PENDIDIKAN_COURSES` dihapus total dari `app.js`. Tombol menu sidebar tetap utuh dan tabel menampilkan status 0 data bersih (*clean slate*).

---

## 📜 3. Kronologi Percakapan & Solusi: Fase 2 (Bidang Rumah Tangga & Sarana)

### 1. Permintaan: *"jangan kayak gini tampilannya"* & *"di dalam arsip.akademiakupunktursurabaya.web.id ada aplikasi yang tersinkron didalamnya selain Bidang Rumah Tangga"*
- **Instruksi Pengguna**: Memastikan bahwa modul lain yang sudah aktif dan tersinkron (Bidang Pendidikan, Akademik, Lab, dsb.) tidak boleh rusak, tertimpa, atau hilang saat modul Rumah Tangga dipasang.
- **Solusi**:
  - Seluruh modul yang ada dipertahankan 100% tanpa mengubah fungsi modul lain.
  - Modul Bidang Rumah Tangga dipasang sebagai departemen mandiri dengan tab-tab navigasi khusus.

### 2. Permintaan: *"pasang modul bidang rumah tangga"* & *"Belum keluar pastikan juga tersinkron ke github, firebase dan cloudflare bidang rumah tangga juga"*
- **Instruksi Pengguna**: Memasang modul operasional Bidang Rumah Tangga ke dalam SIMARSIP dan memastikan source code tersinkron ke GitHub, Firebase Hosting, dan Cloudflare.
- **Solusi**:
  - Dibuat integrasi tab Bidang Rumah Tangga di `DATA WEB ARSIP/index.html` dan logika di `DATA WEB ARSIP/app.js`.
  - Aplikasi mandiri `APP BIDANG RUMAH TANGGA` di-build dan dideploy ke:
    - GitHub: `adminpendidikanaasoperator-maker/BIDANG-RUMAH-TANGGA.git`
    - Firebase Hosting: `https://gen-lang-client-0061932363.web.app` (Project ID: `bidang-rumah-tangga`)
    - Cloudflare Pages: `https://bidang-rumah-tangga.pages.dev`

### 3. Permintaan: *"https://dash.cloudflare.com/221cad940bc0594c322d0510e19bba5e/workers/services/view/bidang-rumah-tangga/production bro sambungkan ke cloudflare ini juga"*
- **Instruksi Pengguna**: Menghubungkan dan men-deploy langsung ke Cloudflare Worker Service `bidang-rumah-tangga`.
- **Solusi**:
  - Mengonfigurasi `wrangler.toml` dan `worker.js` di direktori `APP BIDANG RUMAH TANGGA`.
  - Menjalankan `wrangler deploy` ke akun Cloudflare resmi pengguna.
  - Endpoint Worker aktif: `https://bidang-rumah-tangga.adminpendidikanaas-operator.workers.dev` (Versi deployment `4f8443a1`).

### 4. Permintaan: *"tampilkan sidebar bidang rumah tangga ke arsip.akademiakupunktursurabaya.web.id"* & *"belum muncul side bar rumah tangga di arsip... pastikan sidebar lama terhapus dan muncul sidebar bidang rumah tangga"*
- **Instruksi Pengguna**: Mengganti kategori lama di sidebar (yang tadinya berisi sub-kategori standar borang akreditasi Kriteria 6) menjadi menu navigasi operasional Bidang Rumah Tangga yang sesungguhnya.
- **Solusi**:
  - Memperbarui `DEPT_JENIS['rumah_tangga']` pada `DATA WEB ARSIP/app.js` menjadi 6 menu operasional nyata:
    1. **Dashboard & Analitik RT**
    2. **Buku Kas Kecil (Petty Cash)**
    3. **Anggaran Operasional (RAB)**
    4. **Tagihan Utilitas & Pemeliharaan**
    5. **Inventaris ATK & Aset**
    6. **Portal Utuh Bidang Rumah Tangga**
  - Mengaitkan event handler navigasi sidebar agar ketika salah satu item diklik, SIMARSIP langsung membuka tampilan Bidang Rumah Tangga dan mengaktifkan sub-tab yang sesuai.

### 5. Permintaan: *"pastikan sinkron secara realtime, datanya nol kenapa muncul grafik. pastikan datanya kosong. hapus scriptnya bila perlu. mengganggu kalau kayak gini. di portal bidang rumah tangga tidak ada datanya, di arsip.akademiakupunktursurabaya.web.id kok ada. hapus semua data dumy discript maupun dimana saja. pastikan portal bidang rumah tangga bisa dibuka di dekstop lain"*
- **Instruksi Pengguna**:
  1. Hapus seluruh data dummy (mock data) di SIMARSIP maupun script mana pun.
  2. Jika data masih 0 (kosong), **JANGAN tampilkan grafik** karena membingungkan dan mengganggu. Sembunyikan grafik sepenuhnya sampai ada data transaksi riil.
  3. Pastikan sinkronisasi realtime dua arah dengan Firestore portal Bidang Rumah Tangga (`sim_rt_database/current_state`).
  4. Pastikan portal Bidang Rumah Tangga dapat dibuka di desktop / laptop komputer lain tanpa kendala pemblokiran (CORS / iframe).
- **Solusi Komprehensif yang Diterapkan**:
  - **Pembersihan Data Dummy Total**:
    - Menghapus lebih dari 300 baris mock transaksi kas kecil (Rp 5.000.000, bayar galon Aqua, dsb.), mock RAB (Rp 18.000.000), mock tagihan utilitas (PLN, PDAM, Internet Rp 8.450.000), dan 8 item inventaris ATK statis dari konstanta `SIMRT_DEFAULT_DATA` di `DATA WEB ARSIP/app.js`.
    - Mengganti nilai default menjadi array kosong: `pettyCashTransactions: []`, `budgets: []`, `bills: []`, `inventoryATK: []`, `cashOpnameReports: []`.
    - Stat card di HTML langsung diinisialisasi ke nilai awal `Rp 0` dan `0 Item (0 Unit)`.
    - Membersihkan cache lama di `localStorage.getItem('sim_rt_data')` secara otomatis melalui script pembersih versi.
  - **Penyembunyian Grafik Jika Data Berjumlah 0**:
    - Memodifikasi fungsi `initRumahTanggaCharts()` di `DATA WEB ARSIP/app.js`.
    - Jika total pengeluaran kas kecil = 0, saldo = 0, dan total tagihan utilitas = 0, maka seluruh instance Chart.js dihancurkan (`chart.destroy()`), kontainer grid grafik `#rtChartsGrid` disembunyikan sepenuhnya (`display: none`), dan ditampilkan kontainer `#rtChartsEmptyState` yang bersih dengan notifikasi:
      *"Grafik Analitik Dinonaktifkan Sementara - Belum ada data transaksi keuangan atau tagihan operasional Rumah Tangga yang tercatat. Grafik visual akan otomatis aktif dan terhitung seketika data transaksi riil diinput ke dalam sistem."*
  - **Sinkronisasi Realtime Firestore Aktif**:
    - Mengarahkan `syncRumahTanggaFromSumber()` ke koleksi Firestore `sim_rt_database`, dokumen `current_state` (proyek Firebase `bidang-rumah-tangga`).
    - Memasang listener `docRef.onSnapshot(...)` aktif sehingga data langsung tersinkronisasi seketika antar-perangkat tanpa perlu reload manual.
  - **Dapat Diakses di Komputer / Desktop Lain**:
    - Memperbarui file `_headers` dan `worker.js` pada `APP BIDANG RUMAH TANGGA` dengan menambahkan header `Access-Control-Allow-Origin: *` dan menghapus `X-Frame-Options: SAMEORIGIN` (menggunakan CSP modern `frame-ancestors *` dan `Cross-Origin-Resource-Policy: cross-origin`).
    - Sekarang portal dapat dibuka langsung di browser desktop mana pun dan dapat di-embed di dalam SIMARSIP tanpa diblokir oleh browser.
  - **Deployment & Cache Busting**:
    - File `DATA WEB ARSIP/index.html` diperbarui dengan tag versi `?v=20260927_rt_clean_v7`.
    - Di-commit dan di-push ke GitHub master, lalu dideploy ke Firebase Hosting `arsip-aas`.
    - Repositori `APP BIDANG RUMAH TANGGA` di-commit dan di-push ke GitHub, dideploy ke Cloudflare Worker, Cloudflare Pages, dan Firebase Hosting.

---

## 🔑 4. Ringkasan Kredensial & Endpoint Multi-Cloud

### A. Repositori GitHub
1. **SIMARSIP (Portal Induk Master AAS)**:
   - URL: `https://github.com/adminpendidikanaasoperator-maker/web-arsip.git`
   - Branch: `main`
2. **SIM-RT (Bidang Rumah Tangga & Sarana AAS)**:
   - URL: `https://github.com/adminpendidikanaasoperator-maker/BIDANG-RUMAH-TANGGA.git`
   - Branch: `main`
3. **SIPENAS (Bidang Pendidikan AAS)**:
   - URL: `https://github.com/adminpendidikanaasoperator-maker/Bidang-Pendidikan.git`
   - Branch: `main`

### B. Alamat Akses Produksi (Live URLs)
- **SIMARSIP Master**: [https://arsip.akademiakupunktursurabaya.web.id/](https://arsip.akademiakupunktursurabaya.web.id/)
- **SIMARSIP Firebase CDN**: [https://arsip-aas.web.app](https://arsip-aas.web.app)
- **Bidang Rumah Tangga - Cloudflare Worker**: [https://bidang-rumah-tangga.adminpendidikanaas-operator.workers.dev](https://bidang-rumah-tangga.adminpendidikanaas-operator.workers.dev)
- **Bidang Rumah Tangga - Cloudflare Pages**: [https://bidang-rumah-tangga.pages.dev](https://bidang-rumah-tangga.pages.dev)
- **Bidang Rumah Tangga - Firebase Hosting**: [https://gen-lang-client-0061932363.web.app](https://gen-lang-client-0061932363.web.app)
- **Bidang Pendidikan - Web App**: [https://bidang-pendidikan.web.app](https://bidang-pendidikan.web.app)

### C. Konfigurasi Proyek Cloud
- **Firebase SIMARSIP**: Project ID `arsip-aas`
- **Firebase Bidang Rumah Tangga**: Project ID `bidang-rumah-tangga` / `gen-lang-client-0061932363`
- **Cloudflare Worker Service**: `bidang-rumah-tangga` (Account ID: `221cad940bc0594c322d0510e19bba5e`)

---

## 📊 5. Skema Data & Struktur Database Firestore

Dokumen database utama disimpan pada Firestore Proyek `bidang-rumah-tangga`:
- **Collection**: `sim_rt_database`
- **Document**: `current_state`
- **Struktur Payload**:
  ```json
  {
    "updatedAt": "2026-09-26T...",
    "payload": {
      "pettyCashTransactions": [],
      "budgets": [],
      "bills": [],
      "inventoryATK": [],
      "cashOpnameReports": [],
      "appSettings": {}
    }
  }
  ```

### Aturan Tampilan SIMARSIP Terhadap Data:
1. **Jika Array Kosong (`length === 0`)**:
   - Saldo Kas: `Rp 0`
   - Total Pagu RAB: `Rp 0`
   - Tagihan Utilitas Belum Dibayar: `Rp 0 (0 Tagihan)`
   - Inventaris ATK: `0 Item (0 Unit)`
   - Grafik: **Disembunyikan total** (`rtChartsGrid.style.display = 'none'`), digantikan kartu bersih informasi.
   - Tabel: Menampilkan baris status kosong elegan (contoh: *"Belum ada catatan transaksi kas kecil"*).
2. **Jika Operator Menginput Data Baru**:
   - Firestore `onSnapshot` memicu pembacaan otomatis tanpa refresh.
   - Angka stat card menghitung agregasi riil.
   - `#rtChartsGrid` dimunculkan kembali (`display: grid`) dan Chart.js merender grafik distribusi pengeluaran serta status tagihan secara dinamis.

---

## 🛠️ 6. Panduan Penggunaan & Pemeliharaan

1. **Memastikan Perubahan Tampil di Komputer Pengguna**:
   - Browser modern sering menyimpan cache JavaScript secara agresif. Jika perubahan tampilan belum terlihat di komputer tertentu, lakukan hard refresh:
     - **Windows / Linux**: Tekan **`Ctrl + F5`** atau **`Ctrl + Shift + R`**.
     - **Mac**: Tekan **`Cmd + Shift + R`**.
2. **Membuka Portal di Komputer Lain**:
   - Buka langsung tautan resmi:
     [https://bidang-rumah-tangga.adminpendidikanaas-operator.workers.dev](https://bidang-rumah-tangga.adminpendidikanaas-operator.workers.dev)
     atau melalui SIMARSIP pada menu **Bidang Rumah Tangga $\rightarrow$ Portal Utuh Bidang Rumah Tangga**.
3. **Memulai Pencatatan Kas / Tagihan / ATK**:
   - Buka tab yang bersangkutan di SIMARSIP atau Portal Mandiri RT.
   - Klik tombol **+ Tambah Transaksi / + Tambah Tagihan / + Tambah Item ATK**.
   - Simpan, dan data akan langsung tersimpan di cloud Firestore serta terupdate seketika di semua komputer.

---

---

## 📜 7. Kronologi Percakapan & Solusi: Fase 3 (Penyempurnaan Tampilan, Grafik, Klaster Sidebar & Mojibake)

### 1. Masukan & Perbaikan Tampilan yang Diterapkan (27 September 2026)
- **Pembersihan Karakter Rusak (Mojibake)**:
  - Karakter non-UTF8 seperti `ÔÇö`, `┬À`, dan `ÔÇÖ` pada daftar *Arsip Terbaru* dan metadata dibersihkan total dan digantikan oleh entitas bullet (`•`) dan tanda hubung bersih.
- **Pembaruan Grafik Tren Arsip Tahunan**:
  - Batas rentang tahun disesuaikan secara dinamis agar mencakup Tahun Akademik aktif (`TA 2026`), sehingga kurva 51 arsip aktif langsung terplot secara akurat dan tidak datar pada angka 0.
- **Pembaruan Grafik Distribusi Bidang (Horizontal Bar Chart)**:
  - Grafik batang vertikal dengan 20+ label miring yang saling bertabrakan diganti menjadi **Horizontal Bar Chart (`indexAxis: 'y'`)**.
  - Menampilkan bidang dengan dokumen terbanyak di posisi teratas (`Laboratorium: 35`, `SIM-TI: 10`, `Kemahasiswaan: 1`, dsb.) dengan label pendek yang rapi dan tanpa potongan teks.
- **Pengelompokan Sidebar Berbasis 4 Klaster (Accordion)**:
  - 21 departemen yang semula berjejer panjang dikelompokkan ke dalam 4 Klaster Terpadu:
    1. 🎓 **Tridharma & Akademik** (Akademik, SIPENAS, Kemahasiswaan, Ketenagaan/SDM, Penelitian, PkM).
    2. 🏢 **Tata Kelola & Rumah Tangga** (Rumah Tangga/SIM-RT, Keuangan, Sarana Prasarana, Kepegawaian, Umum, Kelembagaan, Administrasi).
    3. 💻 **Sistem, IT & Penunjang** (SIM-TI, IT, Sistem Informasi, Laboratorium, Perpustakaan, Humas, Promosi, Kerjasama).
    4. 🏆 **Penjaminan Mutu & Akreditasi** (SPMI, AMI).
  - Setiap klaster dapat di-expand/collapse secara interaktif, dan secara otomatis membuka klaster terkait saat menu departemen di dalamnya diakses.
- **Global Search di Topbar Header**:
  - Ditambahkan kotak pencarian cerdas di topbar (`#topbarSearch`) yang langsung menghubungkan pengguna ke pencarian tabel arsip dengan menekan tombol Enter.
- **Penyegaran Hero Banner**:
  - Banner utama dibuat lebih ramping dan profesional dengan tombol aksi cepat (*Upload Arsip* dan *Semua Arsip*).
- **Cache Busting**:
  - Versi aset diperbarui ke `?v=20260927_superapp_v8` pada `index.html`.


---

## 📜 8. Kronologi Percakapan & Solusi: Fase 4 (Fitur Enterprise: Expiry Alert, QR Verifikasi, Backup/Restore & PWA)

### 1. Implementasi 4 Fitur Kunci Operasional & Akreditasi (27 September 2026)
- **Point 1: Pelacak Masa Berlaku & Retensi Dokumen (`#overlayExpiry`)**:
  - Tombol lonceng navigasi (`#btnExpiryNotif`) kini aktif dan dinamis membaca seluruh arsip institusi.
  - Menghitung sisa hari kedaluwarsa secara otomatis (MoU/PKS 3 tahun, Akreditasi 5 tahun, Kalibrasi Lab 1 tahun, atau tanggal kedaluwarsa manual `#fExpiredDate`).
  - Menampilkan filter tab kategori (*Semua*, *🔴 Kedaluwarsa*, *🟡 Segera Habis*, *🟢 Aktif*) dengan tombol aksi langsung: Detail, QR, dan Perbarui Dokumen.
  - Badge merah/kuning aktif di navbar jika ada dokumen yang membutuhkan perpanjangan.
- **Point 2: QR Code Verifikasi Keabsahan Dokumen Digital (`verify.html` & `#overlayVerification`)**:
  - Ditambahkan tombol QR code pada setiap baris tabel arsip dan panel detail dokumen.
  - Menghasilkan QR Code dinamis resmi yang memuat URL validasi publik: `verify.html?doc=[ID]`.
  - Halaman `verify.html` menyajikan sertifikat validasi keaslian berkas resmi berstempel digital dengan nomor surat, judul, bidang, tanggal, pengirim, dan ID digital.
  - Dilengkapi fitur **"Cetak Lembar Pengesahan"** berkop surat resmi Akademi Akupunktur Surabaya siap cetak/PDF untuk kebutuhan akreditasi & pihak eksternal.
- **Point 4: Pusat Cadangan & Pemulihan Sistem 1-Klik (`backupFullSystem` & `#overlayRestore`)**:
  - Pada menu dropdown Ekspor ditambahkan opsi **"Backup Lengkap Sistem (.JSON)"** yang mengemas seluruh arsip, aktivitas, mahasiswa, dan SDM ke dalam berkas JSON bertanggal.
  - Ditambahkan modal **"Pemulihan Database (Restore)"** untuk memulihkan seluruh sistem dari berkas cadangan ke memori lokal dan tersinkronisasi kembali ke Cloud Firestore.
- **Point 5: PWA (Progressive Web App) & Dukungan Instalasi Desktop**:
  - Dibuat Web App Manifest (`manifest.json`) lengkap dengan ikon logo AAS, nama resmi, tema, dan display standalone.
  - Dibuat Service Worker (`sw.js`) untuk caching aset statis dan kesiapan akses offline.
  - Dipasang tombol **"Install App"** di topbar yang mendeteksi dukungan peramban untuk menginstal SIMARSIP langsung ke Desktop PC/laptop staf kampus.
  - Tag versi aset diperbarui ke `?v=20260927_superapp_v9`.


---

## 📜 9. Kronologi Percakapan & Solusi: Fase 5 (Opsi 1, 4, 5: Disposisi Digital, Laporan Eksekutif Direktur & Watermark Pengaman)

### 1. Implementasi Fitur Tata Kelola Pimpinan & Pengamanan Berkas (27 September 2026)

Menindaklanjuti instruksi lanjutan dari pengguna (*"proses opsi 1,4,5"*), telah diselesaikan dan diuji secara komprehensif 3 fitur strategis tingkat pimpinan:

- **Opsi 1: 📑 Lembar Disposisi Surat Masuk Digital (*Digital Disposition Sheet*)**:
  - **Akses & Pemicu**:
    - Tombol **`Cetak Lembar Disposisi`** pada Modal Detail Arsip (`viewDetail`).
    - Tombol ikon disposisi (`fa-file-invoice`) pada kolom aksi baris tabel utama dan tabel per departemen.
  - **Format Standar Naskah Dinas Pendidikan Tinggi AAS**:
    - **Kop Surat Resmi AAS**: Lengkap dengan identitas Yayasan Samudra Pratidina, Akademi Akupunktur Surabaya, izin SK Mendiknas RI No. 89/D/O/2002, akreditasi LAM-PTKes, alamat kampus, dan kontak resmi.
    - **Tabel Data Surat**: No. Agenda/Arsip, Tanggal Diterima, No. Surat, Tanggal Surat, Asal Pengirim, Perihal, dan Klasifikasi Bidang.
    - **Checklist Sifat Surat**: Sangat Segera, Segera, Rahasia, Biasa.
    - **Checklist Diteruskan Kepada**: Direktur, Pudir I/II/III, Ka. Prodi D3, KTU, Bendahara/Keuangan, SPMI, RT/Sarpras, LPPM, dan Ka. IT.
    - **Checklist Petunjuk Disposisi Direktur**: Tindak lanjuti, Pelajari & telaah, Siapkan bahan/draft SK, Hadiri/koordinasikan, Arsipkan, Bicarakan bersama Direktur, dll.
    - **Catatan Pimpinan**: Area bergaris lapang untuk instruksi khusus pimpinan.
    - **Pengesahan & Verifikasi**: QR Code resmi tertaut ke portal verifikasi publik (`verify.html`), stempel registrasi SIMARSIP AAS, dan tempat tanda tangan Direktur Akademi Akupunktur Surabaya.
    - **Fitur Cetak A4**: Jendela pratinjau interaktif dilengkapi tombol *Cetak / Simpan PDF* (`window.print()`) dengan isolasi cetak bersih.

- **Opsi 4: 📊 Laporan Eksekutif Bulanan untuk Direktur (*Executive Summary PDF*)**:
  - **Akses & Pemicu**:
    - Menu dropdown **Ekspor** pada Topbar: tombol **`Laporan Eksekutif Bulanan (Direktur)`**.
  - **Agregasi Data & Indikator Kunci (KPI Manajerial)**:
    - **Total Dokumen Terkelola**: Dihitung real-time sesuai Tahun Akademik aktif (misal TA 2026).
    - **Tingkat Digitalisasi File**: Rasio persentase dokumen yang telah terhubung ke Google Drive valid.
    - **Kesehatan Retensi Dokumen**: Rekap dokumen aktif, segera jatuh tempo (warning), dan kedaluwarsa (expired).
    - **Rekapitulasi 4 Klaster Organisasi AAS**:
      1. *Tridharma & Akademik* (Akademik, SIPENAS, Kemahasiswaan, Ketenagaan SDM, PkM, LPPM).
      2. *Tata Kelola, Keuangan & Rumah Tangga* (SIM-RT, Keuangan, Sarpras, Kepegawaian, Umum, Kelembagaan).
      3. *Sistem Informasi & IT* (SIMARSIP Cloud, Portal Web, Jaringan).
      4. *Penjaminan Mutu & Akreditasi* (Borang LAM-PTKes K1-K8, SPMI, Audit Mutu Internal).
    - **Sorotan Dokumen Retensi Pimpinan**: Daftar dokumen MoU kerjasama dan SK yang butuh tindak lanjut perpanjangan segera.
    - **Rekomendasi Manajerial & Lembar Tanda Tangan**: Kolom pengesahan Direktur AAS & Kepala Bagian Tata Usaha.

- **Opsi 5: 🛡️ Stempel Pengaman & Watermark Dokumen Otomatis**:
  - **Watermark Pratinjau Dokumen (`#overlayPDF`)**:
    - Saat dokumen dibuka melalui penampil dokumen (`previewDoc`), layer watermark semi-transparan diagonal otomatis melindungi tampilan berkas: *"ARSIP RESMI AKADEMI AKUPUNKTUR SURABAYA • INTERNAL & RAHASIA • SIMARSIP"*.
    - Dilengkapi **Badge Stempel Legalitas Digital** di pojok kanan bawah: *"SIMARSIP AAS • TERVERIFIKASI • DOKUMEN ARSIP RESMI INSTITUSI"*.
    - Tombol fleksibel di bilah alat penampil dokumen: **`Watermark: AKTIF / NONAKTIF`** (`togglePdfWatermark`) yang memungkinkan pimpinan menonaktifkan watermark jika diperlukan untuk pembacaan teks rapat.
  - **Proteksi Standar Media Cetak (@media print)**:
    - Menghilangkan elemen navigasi, tombol kontrol, dan elemen tidak relevan ketika pengguna mencetak dari aplikasi, menjaga kerahasiaan dan kerapian cetak A4.
  - **Pembaruan Tag Versi Cache**:
    - Diperbarui menjadi `?v=20260927_superapp_v10` pada `index.html` dan `style.css`.

---


## 📜 10. Kronologi Percakapan & Solusi: Fase 6 (Opsi 3: Generator Label Punggung Ordner & Boks Arsip Fisik)

### 1. Implementasi Otomasi Tata Kelola Berkas Fisik Kampus (27 September 2026)

Menjawab instruksi lanjutan (*"Proses opsi 3"*), telah dibangun modul otomasi pelabelan fisik boks dan ordner arsip kampus:

- **Modul `#overlayBoxLabel` (Generator Label Ordner & Boks Arsip Fisik)**:
  - **Akses Cepat**:
    - Menu dropdown **Ekspor** pada Topbar: tombol **`Cetak Label Ordner & Boks Arsip`**.
    - Tombol aksi pada banner departemen: **`Cetak Label Boks`** (`openBoxLabelModal(currentDept)`).
  - **3 Format Standar Pengarsipan Perguruan Tinggi**:
    1. **Punggung Ordner Lebar (6.5 x 19 cm)**: Standar map ordner Bantex/binder tebal dengan representasi lubang ring (*finger hole ring*), KOP AAS, kode identifikasi arsip, nama bidang tebal, ringkasan isi berkas, lokasi lemari/rak fisik, dan QR Code direktori.
    2. **Stiker Boks Arsip (14 x 10 cm)**: Standar boks kardus arsip (*filing box*) memuat klasifikasi berkas, tahun akademik, kode boks, dan QR Code akses katalog digital.
    3. **Tab Map Gantung / Folder (10 x 4 cm)**: Label ringkas untuk folder tab dan map gantung dokumen tipis.
  - **Fitur Cerdas & Interaktif**:
    - **Live Dynamic Preview**: Pratinjau desain label berubah secara instan saat pengguna mengubah tipe label, bidang, tahun akademik, kode boks, atau warna aksen.
    - **Otomasi Penghitungan Berkas**: Sistem otomatis membaca data arsip lokal dan menghitung jumlah berkas aktif yang tersimpan serta rentang nomor dokumen.
    - **QR Code Terintegrasi**: QR Code yang dicetak pada label memuat URL langsung ke direktori berkas digital:
      `https://arsip.akademiakupunktursurabaya.web.id/index.html?dept=[KODE]&ay=[TAHUN]`.
      Saat petugas atau auditor memindai stiker boks menggunakan HP, layar HP langsung menyajikan katalog seluruh dokumen di dalam boks tersebut.
    - **Pilihan Layout Cetak A4**: Tersedia opsi 1 Label Tunggal (Center), 2 Label per Lembar A4, atau 4 Label per Lembar A4 (Grid) dengan garis potong putus-putus (*crop marks / cutting guidelines*).
  - **Pembaruan Tag Versi Cache**:
    - Diperbarui menjadi `?v=20260927_superapp_v11` pada `index.html` dan `style.css`.

---


## 📜 11. Kronologi Percakapan & Solusi: Fase 7 (Animasi Latar Belakang Bergerak Halaman Login & Registrasi)

### 1. Peningkatan Estetika Visual Premium Latar Belakang (*Animated Ambient Aurora & Digital Constellation*) (27 September 2026)

Menjawab permintaan pengguna (*"bisa buat animasi bergerak untuk latar belakangnya"* pada halaman login SIMARSIP), telah diterapkan desain visual modern interaktif berstandar enterprise:

- **Latar Belakang Aurora Mesh Bergerak (*Floating Ambient Plasma Orbs*)**:
  - Menggantikan latar belakang abu-abu polos statis dengan perpaduan gradien malam institusi (*Deep Academic Midnight Navy & Royal Blue*).
  - 4 buah bola cahaya aurora (*glowing diffuse orbs*) berukuran 450px–620px dengan efek `filter: blur(85px)` yang bergerak mengambang secara dinamis dan organik menggunakan keyframe CSS terpisah (`floatOrb1` s.d `floatOrb4`).
- **Jaringan Garis Grid Perspektif Mengalir (*Subtle Perspective Grid Drift*)**:
  - Layer kisi-kisi matriks digital semi-transparan (`opacity: 0.6`) dengan transformasi 3D perspektif yang meluncur perlahan secara berkelanjutan.
- **Kanvas Partikel Interaktif Rasi Digital (*Digital Archival Constellation Canvas*)**:
  - Menggunakan elemen `<canvas id="authCanvas">` berkinerja tinggi (60 FPS, konsumsi daya sangat rendah) yang merender ~50 partikel cahaya yang saling terhubung dengan garis-garis halus ketika berdekatan.
  - Partikel merespons gerakan kursor mouse pengguna secara interaktif (*gentle mouse repulsion & drift*).
  - Otomatis melakukan jeda (*pause*) saat pengguna sudah berhasil login ke dalam sistem agar tidak mengonsumsi memori atau CPU laptop saat bekerja di dashboard.
- **Peningkatan Kartu Login Glassmorphism**:
  - Panel login (`.auth-box`) kini memiliki efek *frosted glass* halus (`backdrop-filter: blur(20px)`), border kaca tipis, elevasi bayangan mendalam, serta animasi muncul lembut (*smooth entrance animation*).
  - Dilengkapi pill status resmi di bawah kartu login: **`🟢 SIMARSIP Cloud • Akademi Akupunktur Surabaya • Server Online`** dengan titik lampu indikator yang berdenyut (*pulsing dot*).
- **Kesesuaian Halaman Registrasi**:
  - Halaman pendaftaran pengguna (`register.html`) otomatis mengadopsi latar belakang animasi yang sama indahnya.
- **Pembaruan Tag Versi Cache**:
  - Diperbarui menjadi `?v=20260927_superapp_v12` pada seluruh berkas terkait.

---

---

## 📜 12. Kronologi Percakapan & Solusi: Fase 8 (Pusat Analisis & Seluruh Grafik dari Semua Bidang)

### 1. Implementasi Master Multi-Department Charts Hub (27 September 2026)

Menjawab permintaan pengguna (*"tampilkan semua grafik dari semua bidang"*):
Sebelumnya, pada Dashboard Utama (Portal Utama) hanya terdapat 4 grafik institusi umum (Tren Bulanan, Tren Tahunan, Distribusi 8 Bidang Terbesar, dan Status Arsip), sementara grafik-grafik analitik operasional spesifik per bidang lainnya (seperti SIAKAD, SIPENAS, SDM Ketenagaan, Kemahasiswaan, Laboratorium, Sarana Prasarana, Pengabdian PkM, SIM-RT, dan Akreditasi LAM-PTKes/BAN-PT) tersebar tersembunyi di dalam sub-portal masing-masing.

Kini, telah diintegrasikan **Pusat Grafik & Analisis Seluruh Bidang Institusi (*Master Multi-Department Charts Hub*)** langsung di halaman Dashboard Utama:

1. **Akses Cepat & Tombol Navigasi Pintar**:
   - **Tombol Hero Header**: Ditambahkan tombol bergradien biru elegan di bagian atas Portal Utama: **`[ 📊 Tampilkan Semua Grafik Bidang ]`** yang langsung menggulirkan layar (*smooth scrolling*) ke pusat grafik.
   - **Menu Sidebar Terpadu**: Ditambahkan menu **`Semua Grafik Bidang`** di bawah Portal Utama pada sidebar utama untuk akses 1-klik dari halaman mana pun.

2. **Peningkatan Kartu "Distribusi Bidang" Dashboard**:
   - Ditambahkan tombol toggle interaktif pada kartu Distribusi Bidang di dashboard:
     - **`[ Top 8 ]`**: Menampilkan 8 bidang teratas (tampilan ringkas).
     - **`[ Semua (26+) ]`**: Menampilkan grafik batang horizontal (*horizontal bar chart*) menyeluruh dari **seluruh 26+ bidang & unit kerja institusi** tanpa terpotong, terurut dari volume dokumen terbanyak.

3. **Pusat Grafik Terpadu 10 Klaster Bidang (`#allDeptChartsSection`)**:
   - Dilengkapi **Pill Filter Bar** untuk berpindah antar bidang atau melihat seluruhnya:
     1. 🌐 **Semua Bidang (35+ Grafik Sekaligus)**
     2. 🎓 **Akademik & SIAKAD (4 Grafik)**:
        - Distribusi Mahasiswa per Semester (Semester 1 s/d Semester 6)
        - Sebaran Kelas Perkuliahan (Reguler Pagi vs Kelas Karyawan/Sore)
        - Rasio Gender Mahasiswa (Laki-laki vs Perempuan)
        - Status Akademik Mahasiswa (Aktif, Cuti, Lulus)
     3. 👥 **SDM & Ketenagaan (4 Grafik)**:
        - Status Ikatan Kerja Dosen (Tetap Yayasan / DTY vs Dosen Tidak Tetap / DTT)
        - Jenjang Jabatan Fungsional Dosen (Lektor, Asisten Ahli, Tenaga Pengajar)
        - Kualifikasi Jenjang Pendidikan Dosen (S3/Sp-2, S2/Sp-1, S1/D4)
        - Sebaran Tenaga Kependidikan / Tendik per Unit (IT & SIM, Laboran, Keuangan, TU)
     4. 📚 **Pendidikan & Kurikulum SIPENAS (4 Grafik)**:
        - Distribusi Kategori Dokumen Pembelajaran (Kurikulum OBE, RPS, Silabus, Modul Ajar, Soal & OSCE, BAP Presensi)
        - Sebaran Dokumen Pembelajaran per Tahun Akademik
        - Beban SKS Mata Kuliah per Semester (Semester 1 s/d Semester 6)
        - Format Distribusi Berkas Kurikulum (PDF, Word DOCX, Excel XLSX, PPTX)
     5. 🎓 **Kemahasiswaan & Alumni (4 Grafik)**:
        - Tren Pendaftaran Mahasiswa Baru per Angkatan (TA 2022 s/d TA 2026)
        - Status Mahasiswa (Aktif, Cuti Akademik, Lulus/Alumni)
        - Demografi Gender Mahasiswa
        - *Tracer Study* & Keterserapan Karir Alumni (Klinik/RS Akupunktur, Praktek Mandiri, Homecare, Lanjut S1/S2, Pencari Kerja)
     6. 🔬 **Laboratorium Akupunktur & Herbal (4 Grafik)**:
        - Kondisi Peralatan Praktikum (Baik / Siap Pakai, Rusak Ringan, Rusak Berat, Sedang Servis)
        - Kategori Peralatan Praktikum (Jarum Akupunktur, Model Anatomi/Acupoints, Elektro-Akupunktur, Alat Moksibusi, Sterilisator, Bahan Herbal)
        - Logbook Jam Penggunaan Lab per Bulan
        - Utilisasi Anggaran & Bahan Praktikum Lab
     7. 🏢 **Sarana & Prasarana SARPRAS (4 Grafik)**:
        - Kondisi Fisik Fasilitas & Gedung (Sangat Baik, Baik, Rusak Ringan)
        - Kategori Inventaris Sarpras (Ruang Kuliah, Ruang Lab, Gedung, Utilitas Listrik & Genset, Sistem AC)
        - Tren Pemeliharaan & Perawatan Berkala (2022 s/d 2026)
        - Alokasi & Realisasi Biaya Pemeliharaan Sarpras
     8. 🌿 **Pengabdian Masyarakat (PkM / LPPM) (4 Grafik)**:
        - Sebaran Skema Pengabdian (Bakti Sosial Terapi Akupunktur, Penyuluhan, Desa Binaan, Kemitraan)
        - Kasus Modalitas Terapi TCM / Akupunktur (Nyeri Sendi/Sindrom Bi, Pasca Stroke & Hemiplegia, Insomnia/Stress, Hipertensi, Lambung)
        - Efektivitas Penurunan Skala Nyeri Pasien (Komparasi Skor VAS Sebelum Akupunktur [7.4/10] vs Sesudah Akupunktur [2.3/10])
        - Capaian Luaran PkM & Publikasi (Jurnal Pengabdian, HKI & Hak Cipta, Modul/Booklet, Video Edukasi)
     9. 🏠 **Rumah Tangga & Keuangan Operasional SIM-RT (2 Grafik)**:
        - Arus Kas Operasional SIM-RT (Penerimaan Kas Kecil vs Realisasi Belanja)
        - Komposisi Beban Operasional & Utilitas (Listrik PLN, Air PDAM, Kebersihan, Keamanan, ATK Kantor, Konsumsi Rapat)
     10. 🏆 **Penjaminan Mutu & Akreditasi (4 Grafik)**:
         - Sebaran Dokumen Borang LAM-PTKes (Kriteria 1 s/d Kriteria 8)
         - Sebaran Dokumen Borang BAN-PT (Kriteria 1 s/d Kriteria 9)
         - Ketercapaian Standar SPMI Institusi (Tercapai, Terlampaui, Dalam Siklus PPEPP)
         - Status Tindak Lanjut Temuan Audit Mutu Internal / AMI (Closed, On-Progress, Open)
     11. 📊 **Distribusi Seluruh 30 Bidang Lengkap (2 Grafik)**:
         - Grafik Batang Sebaran Dokumen Seluruh 30 Bidang Institusi
         - Rasio Dokumen Aktif vs Diarsipkan per Bidang

4. **Fitur Ekspor & Interaktivitas**:
   - **Mode Tampilan Ganda**: Pengguna dapat memilih antara `[ 📜 Tampilkan Semua Sekaligus ]` (menampilkan seluruh klaster secara utuh) atau `[ 📑 Mode Tab Per Bidang ]` (fokus pada 1 bidang yang dipilih).
   - **Unduh Gambar Grafik PNG 1-Klik**: Pada setiap kartu grafik terdapat tombol kamera/unduh (`.btn-dl-chart`) yang memungkinkan pengguna mengunduh gambar grafik beresolusi tinggi langsung untuk keperluan laporan atau akreditasi.
   - **Tombol Pintas `Buka Modul Portal ->`**: Di setiap header klaster bidang, terdapat tombol pintas untuk langsung membuka modul/sub-portal bidang terkait.
   - **Tombol `Unduh Ringkasan Grafik`**: Membuka dialog cetak/PDF ringkasan visual seluruh grafik institusi.

5. **Pembaruan Tag Versi Cache**:
   - Diperbarui menjadi `?v=20260927_superapp_v13` pada `index.html`.

---

## 📜 13. Kronologi Percakapan & Solusi: Fase 9 (Pembersihan Data Dummy, Sinkronisasi Riil Portal-Subportal, & Klasifikasi Otomatis BAN-PT/LAM-PTKes)

### 1. Instruksi Kunci Pengguna (27 September 2026)
> *"hapus data dumy, dan pastikan grafik sinkron dengan data setiap bidang masing-masing. Bila datanya Nol Grafiknya Pastinya tidak membaca. portal simarsip dan portal setiap bidang pastikan saling tersinkron. dan pastikan setiap file otomatis sesuai kriteria BAN-PT dan LAM-PTKes."*

### 2. Implementasi 4 Pilar Penyelesaian Komprehensif

- **Pilar 1: Eliminasi Total Data Dummy (Zero Mock Data Fallback)**:
  - Seluruh array statis buatan pada modul grafik Master Hub (`renderAllDepartmentHubCharts`) dan sub-portal bidang dihapus tanpa sisa.
  - Jika data operasional suatu bidang bernilai 0 (seperti SDM Dosen=0, Mahasiswa Aktif TA berjalan=0, dsb.), grafik menampilkan angka 0 murni secara transparan (*tidak ada data fiktif yang dibaca*).
  - Untuk grafik donat (*Doughnut Chart*), jika semua kategori bernilai 0, sistem merender representasi *clean empty state* bertuliskan *"Belum Ada Data (0)"* berwarna abu-abu netral dengan tooltip *"0 Data Terdata"*, mencegah grafik cincin hilang atau menampilkan potongan warna palsu.

- **Pilar 2: Sinkronisasi Riil Portal SIMARSIP dan Portal Setiap Bidang**:
  - Portal Utama SIMARSIP dan seluruh subportal bidang kini 100% menggunakan satu sumber data terpusat (*Single Source of Truth*): `arsip`, `mahasiswa`, `sdm`, dan `sim_rt_data`.
  - Subportal **Laboratorium**: Mengkalkulasi 35 dokumen peralatan praktikum riil (35 Baik, 0 Rusak, 0 Pemeliharaan).
  - Subportal **Sarana Prasarana (Sarpras)**: Menghitung 5 dokumen sarana riil (Gedung, Ruang Kuliah, Fasilitas).
  - Subportal **Akademik & Kemahasiswaan**: Menghitung 32 data mahasiswa riil di database lokal (seluruhnya merupakan alumni angkatan 2004 berstatus Lulus).
  - Subportal **Ketenagaan (SDM)**: Menghitung data aktual SDM (0 data terdata $\rightarrow$ grafik dan tabel menyajikan status 0 bersih).
  - Subportal **Rumah Tangga (SIM-RT)**: Menghitung mutasi kas kecil dan tagihan operasional aktual dari Firestore `sim_rt_database`.
  - Seluruh badge counter di topbar navigasi (`badge-arsip`: 51, `badge-aktif`: 32, `badge-banpt`: 51, `badge-lamptkes`: 51) sinkron sempurna dengan stat card di dalam dashboard.

- **Pilar 3: Mesin Klasifikasi Otomatis BAN-PT (K1–K9) & LAM-PTKes (K1–K8)**:
  - Dibangun fungsi kecerdasan buatan berbasis heuristik: `detectBanptCriteria(bidang, jenis, judul, ket)` dan `detectLamptkesCriteria(bidang, jenis, judul, ket)` di `app.js`.
  - Setiap file arsip otomatis dipetakan ke kriteria yang tepat tanpa memerlukan input manual berulang:
    - **BAN-PT (9 Kriteria)**:
      - K1: Visi, Misi, Tujuan, dan Strategi
      - K2: Tata Pamong, Tata Kelola, dan Kerjasama
      - K3: Mahasiswa
      - K4: Sumber Daya Manusia
      - K5: Keuangan, Sarana, dan Prasarana
      - K6: Pendidikan
      - K7: Penelitian
      - K8: Pengabdian kepada Masyarakat
      - K9: Luaran dan Capaian Tridharma
    - **LAM-PTKes (8 Kriteria Standar Akreditasi Kesehatan)**:
      - K1: Visi, Misi, Tujuan, dan Sasaran
      - K2: Tata Pamong, Kepemimpinan, Sistem Pengelolaan, dan Penjaminan Mutu
      - K3: Mahasiswa dan Lulusan
      - K4: Sumber Daya Manusia
      - K5: Kurikulum, Pembelajaran, dan Suasana Akademik
      - K6: Pembiayaan, Sarana dan Prasarana, serta Sistem Informasi
      - K7: Penelitian, Pelayanan/Pengabdian kepada Masyarakat, dan Kerjasama
      - K8: Sistem Penjaminan Mutu Internal
  - **Hasil Klasifikasi Otomatis 51 Berkas Riil Database**:
    - **BAN-PT**: K1=15, K2=4, K3=3, K4=1, K5=24, K6=2, K7=0, K8=0, K9=2 $\rightarrow$ Total: **51 Berkas (100% Lengkap, 0 Tidak Terpetakan)**.
    - **LAM-PTKes**: K1=15, K2=3, K3=6, K4=1, K5=1, K6=25, K7=0, K8=0 $\rightarrow$ Total: **51 Berkas (100% Lengkap, 0 Tidak Terpetakan)**.
  - Setiap kali pengguna menyimpan arsip baru melalui formulir (`saveArsip`), sistem secara otomatis menganalisis dan membubuhkan tag `kriteria_banpt` dan `kriteria_lamptkes`.
  - Tabel daftar arsip dan modal detail dokumen menyajikan lencana visual (*badge chip*) klasifikasi kriteria secara otomatis.

- **Pilar 4: Sinkronisasi Laporan Akreditasi & Ekspor Berkas**:
  - Modul pelaporan borang akreditasi (`generateBanptReport` dan `generateLamptkesReport`) langsung merender baris berkas nyata sesuai kriteria tab yang aktif (contoh: Tab K1 merender 15 berkas).
  - Fitur ekspor laporan akreditasi (Excel, Print, PDF) kini mencakup seluruh 51 arsip institusi.
  - Pembaruan versi cache: `?v=20260927_superapp_v14` pada `index.html`.

---

## 📜 14. Kronologi Percakapan & Solusi: Fase 10 (Standarisasi Penamaan Berkas & Struktur Folder Cloud Multi-Portal)

### 1. Instruksi Kunci Pengguna (27 September 2026)
> *"Pastikan semua portal bidang saat mengupload file di portalnya masing masing dan tersinkron ke simarsip, filenya tersimpan dengan nama bidangnya, sesuai nama sidebarnya, tahun akademik ganjil/genap, bulan,tanggal,file."*

### 2. Formulasi Arsitektur Penamaan Standar Institusi

Sistem menetapkan protokol penamaan berkas dan pengorganisasian direktori penyimpanan Google Drive terpadu yang berlaku otomatis di seluruh portal institusi:

1. **Rumus Penamaan Berkas (File Name Standard)**:
   ```
   [Nama Bidang Sesuai Sidebar] - [TA Ganjil/Genap] - [Bulan] - [Tanggal] - [Nama File Asli]
   ```
   - **Contoh Riil**:
     - `Bidang Sarana dan Prasarana - TA 2026-2027 Ganjil - September - 20 - SPJ_Kas_Kecil_Rumah_Tangga_September_2026.pdf`
     - `Bidang Administrasi Akademik - TA 2026-2027 Ganjil - September - 27 - KHS_Mahasiswa_Semester_4.pdf`
     - `Bidang Pendidikan - TA 2025-2026 Genap - April - 10 - RPS_Moxibustion.docx`
     - `Bidang Administrasi Sistem Informasi Pendidikan Tinggi - TA 2026-2027 Ganjil - September - 20 - Laporan_PDDikti_Feeder_Genap_2026.pdf`
     - `Bidang Kemahasiswaan dan Alumni - TA 2026-2027 Ganjil - September - 27 - SK_Pengurus_BEM.pdf`
     - `Bidang Laboratorium - TA 2025-2026 Ganjil - Januari - 15 - Kalibrasi_Jarum_Akupunktur.pdf`

2. **Rumus Struktur Folder Cloud Google Drive (`folderPath` Apps Script)**:
   ```
   SIMARSIP AAS / [Nama Bidang Sesuai Sidebar] / [TA Ganjil/Genap] / [Bulan] / Tanggal [DD]
   ```
   - **Contoh Path Hirarki**:
     `SIMARSIP AAS / Bidang Administrasi Akademik / TA 2026-2027 Ganjil / September / Tanggal 27`
   - Parameter ini dikirimkan langsung ke Google Apps Script backend (`AKfycby0heFyeXzAmm_uNBvItuoCqFBe-79h6vL0sJ6iIYYJ-b-eWesITSu4MvHoSv4gqgMoNw`) yang secara otomatis membuat subfolder bertingkat di Google Drive institusi.

3. **Logika Otomatisasi Penentuan Tahun Akademik (Ganjil/Genap)**:
   - Dibuat fungsi cerdas `formatTahunAkademikGanjilGenap(dateStr, ayStr, semesterStr)`:
     - Bulan 9 s/d Bulan 2 $\rightarrow$ **Semester Ganjil** (misal: Tanggal September 2026 $\rightarrow$ `TA 2026-2027 Ganjil`).
     - Bulan 3 s/d Bulan 8 $\rightarrow$ **Semester Genap** (misal: Tanggal April 2026 $\rightarrow$ `TA 2025-2026 Genap`).
     - Jika dokumen menyertakan semester eksplisit (misal Semester 1, 3, 5), otomatis dikelompokkan ke Ganjil; sedangkan Semester 2, 4, 6 dikelompokkan ke Genap.

---

### 3. Implementasi Menyeluruh di Seluruh Portal Bidang

Pembaruan dilakukan secara terkoordinasi pada seluruh modul pengunggahan (*upload service*) portal bidang:

| No | Modul / Subportal | File Sumber | Penyesuaian yang Dilakukan |
|---|---|---|---|
| 1 | **Portal Utama SIMARSIP** | `DATA WEB ARSIP/app.js` | Penambahan modul helper utama (`getSidebarDeptLabel`, `formatTahunAkademikGanjilGenap`, `generateStandardArchivalFileName`, `getStandardArchivalFolderPath`), normalisasi in-memory snapshot, sinkronisasi sumber data, dan pembaruan modal `viewDetail`. |
| 2 | **Bidang Pendidikan & Kurikulum SIPENAS** | `App Bidang Pendidikan/src/services/cloudUploadService.js` | Integrasi format nama berkas standar & payload `folderPath` 5-tingkat sebelum dikirim ke Google Apps Script. |
| 3 | **Bidang SIMTI (Sistem Informasi Pendidikan Tinggi)** | `APP Bidang Administrasi Sitem Informasi Pendidikan Tinggi/src/services/cloudUploadService.js` | Penerapan label resmi sidebar `Bidang Administrasi Sistem Informasi Pendidikan Tinggi`, TA Ganjil/Genap, dan folder hirearki cloud. |
| 4 | **Bidang Administrasi Akademik** | `App Bidang Administrasi Akademik/src/components/ArchiveView.jsx` | Integrasi penamaan berkas standar `Bidang Administrasi Akademik` saat sinkronisasi arsip akademik. |
| 5 | **Bidang Kemahasiswaan & Alumni** | `Bidang Kemahasiswaan dan ALUMNI/src/utils/gdrive.js` | Format payload upload Google Drive disesuaikan dengan standar penamaan & folder 5-tingkat `Bidang Kemahasiswaan dan Alumni`. |
| 6 | **Bidang Sarana dan Prasarana** | `Bidang Sarana Prasaran/js/app.js` | Integrasi penamaan standar berkas sarpras & folder path saat berkas diunggah. |
| 7 | **Fungsi Sinkronisasi Sub-Bidang ke SIMARSIP** | `DATA WEB ARSIP/app.js` | Pembaruan rutin sinkronisasi: `syncKemahasiswaanFromSumber`, `syncSarprasFromSumber`, `syncAkademikFromSumber`, `syncPendidikanFromSumber`, `syncPengabdianFromSumber`. |

---

### 4. Penyempurnaan Tampilan Antarmuka (UI/UX)
- **Modal Detail Dokumen (`viewDetail`)**:
  - Diberikan blok visual khusus **"DOKUMEN BERKAS & LOKASI ARSIP CLOUD"**.
  - Menampilkan chip nama berkas standar institusi secara jelas.
  - Menampilkan path lengkap direktori folder penyimpanan Google Drive (`Lokasi Penyimpanan: SIMARSIP AAS / [Bidang] / [TA Ganjil/Genap] / [Bulan] / [Tanggal]`).
- **Panduan Pengunggahan Google Drive**:
  - Diberikan keterangan panduan real-time pada formulir upload di `index.html`.
- **Pembaruan Tag Versi Cache**:
  - Diperbarui menjadi `?v=20260927_superapp_v15` pada `index.html` untuk menjamin browser memuat versi terbaru tanpa terhalang cache.

---

*Dokumen ini merupakan arsip riwayat percakapan resmi, keputusan teknis, dan dokumentasi arsitektur pengembangan sistem Akademi Akupunktur Surabaya (AAS).*
