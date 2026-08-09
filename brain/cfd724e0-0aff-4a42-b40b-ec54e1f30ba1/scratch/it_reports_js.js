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
