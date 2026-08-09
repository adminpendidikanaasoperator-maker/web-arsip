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
