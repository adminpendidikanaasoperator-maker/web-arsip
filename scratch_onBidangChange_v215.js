function onBidangChange() {
    const bidang=document.getElementById('fBidang').value;
    const opts=document.getElementById('fJenisOptions');
    
    let types = [];
    if (isLamptkesMode) {
      if (bidang === 'lamptkes_led') {
         types = [{ group: 'Laporan Evaluasi Diri (LED)', items: [
            {val: 'led_k1', label: 'Kriteria 1. Visi, Misi, Tujuan, dan Strategi'},
            {val: 'led_k2', label: 'Kriteria 2. Kurikulum'},
            {val: 'led_k3', label: 'Kriteria 3. Penilaian'},
            {val: 'led_k4', label: 'Kriteria 4. Mahasiswa'},
            {val: 'led_k5', label: 'Kriteria 5. Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat'},
            {val: 'led_k6', label: 'Kriteria 6. Sarana, Prasarana Pendidikan, dan Keuangan'},
            {val: 'led_k7', label: 'Kriteria 7. Penjaminan Mutu'},
            {val: 'led_k8', label: 'Kriteria 8. Tata Kelola dan Administrasi'}
         ]}];
      } else if (bidang === 'lamptkes_spmi') {
         types = [{ group: 'Sistem Penjaminan Mutu Internal (SPMI)', items: [
            {val: 'spmi_k1', label: 'Kriteria 1. Visi, Misi, Tujuan, dan Strategi'},
            {val: 'spmi_k2', label: 'Kriteria 2. Kurikulum'},
            {val: 'spmi_k3', label: 'Kriteria 3. Penilaian'},
            {val: 'spmi_k4', label: 'Kriteria 4. Mahasiswa'},
            {val: 'spmi_k5', label: 'Kriteria 5. Dosen, Tenaga Kependidikan, Penelitian, dan Pengabdian kepada Masyarakat'},
            {val: 'spmi_k6', label: 'Kriteria 6. Sarana, Prasarana Pendidikan, dan Keuangan'},
            {val: 'spmi_k7', label: 'Kriteria 7. Penjaminan Mutu'},
            {val: 'spmi_k8', label: 'Kriteria 8. Tata Kelola dan Administrasi'}
         ]}];
      }
    } else if (isBanptMode) {
      if (bidang === 'banpt_led') {
         types = [{ group: 'Laporan Evaluasi Diri (LED)', items: [
            {val: 'banpt_led_k1', label: 'Kriteria 1. Visi, Misi, Tujuan, dan Strategi'},
            {val: 'banpt_led_k2', label: 'Kriteria 2. Tata Pamong, Tata Kelola, dan Kerjasama'},
            {val: 'banpt_led_k3', label: 'Kriteria 3. Mahasiswa'},
            {val: 'banpt_led_k4', label: 'Kriteria 4. Sumber Daya Manusia'},
            {val: 'banpt_led_k5', label: 'Kriteria 5. Keuangan, Sarana, dan Prasarana'},
            {val: 'banpt_led_k6', label: 'Kriteria 6. Pendidikan'},
            {val: 'banpt_led_k7', label: 'Kriteria 7. Penelitian'},
            {val: 'banpt_led_k8', label: 'Kriteria 8. Pengabdian kepada Masyarakat'},
            {val: 'banpt_led_k9', label: 'Kriteria 9. Luaran dan Capaian Tridharma'}
         ]}];
      } else if (bidang === 'banpt_spmi') {
         types = [{ group: 'Sistem Penjaminan Mutu Internal (SPMI)', items: [
            {val: 'banpt_spmi_k1', label: 'Kriteria 1. Visi, Misi, Tujuan, dan Strategi'},
            {val: 'banpt_spmi_k2', label: 'Kriteria 2. Tata Pamong, Tata Kelola, dan Kerjasama'},
            {val: 'banpt_spmi_k3', label: 'Kriteria 3. Mahasiswa'},
            {val: 'banpt_spmi_k4', label: 'Kriteria 4. Sumber Daya Manusia'},
            {val: 'banpt_spmi_k5', label: 'Kriteria 5. Keuangan, Sarana, dan Prasarana'},
            {val: 'banpt_spmi_k6', label: 'Kriteria 6. Pendidikan'},
            {val: 'banpt_spmi_k7', label: 'Kriteria 7. Penelitian'},
            {val: 'banpt_spmi_k8', label: 'Kriteria 8. Pengabdian kepada Masyarakat'},
            {val: 'banpt_spmi_k9', label: 'Kriteria 9. Luaran dan Capaian Tridharma'}
         ]}];
      }
    } else {
      types = DEPT_JENIS[bidang] || [];
    }
    
    if(types.length > 0) {
      document.getElementById('fJenisLabelText').textContent = '-- Pilih Jenis Dokumen --';
      document.getElementById('fJenis').value = '';
      let html = '';
      
      // Jika types adalah array object item (bukan group), buat group 'Umum'
      if (!types[0].group) {
        types = [{ group: 'Kategori Dokumen', items: types }];
      }
      
      types.forEach(group => {
        html += `<div style="padding:8px 12px; font-size:0.75rem; color:#6b7280; font-weight:700; text-transform:uppercase; margin-top:8px; border-top:1px solid #e5e7eb;">${group.group}</div>`;
        group.items.forEach(t => {
          const safeLabel = t.label.replace(/'/g, "\\'");
          html += `<div class="custom-option" onclick="selectJenisOption('${t.val}', '${safeLabel}')">${t.label}</div>`;
        });
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

