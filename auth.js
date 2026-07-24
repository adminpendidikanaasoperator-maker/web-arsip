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

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let currentRole = null;
let currentBidang = [];
let currentName = '';

auth.onAuthStateChanged(async (user) => {
  if (user) {
    currentUser = user;
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data();
        if (data.status === 'pending') {
          alert('Akun Anda masih berstatus PENDING. Silakan hubungi Admin/Direktur untuk persetujuan.');
          auth.signOut();
          return;
        }
        currentRole = data.role;
        currentBidang = data.bidang || [];
        currentName = data.name || user.email;
        showAppBasedOnRole();
      } else {
        alert('Data pengguna tidak ditemukan di database.');
        auth.signOut();
      }
    } catch(err) {
      console.error(err);
      alert('Terjadi kesalahan saat mengecek data profil.');
      auth.signOut();
    }
  } else {
    currentUser = null;
    currentRole = null;
    currentBidang = [];
    currentName = '';
    document.getElementById('appWrapper').style.display = 'none';
    document.getElementById('authWrapper').style.display = 'flex';
  }
});

async function doLogin() {
  const email = document.getElementById('loginUsername').value.trim(); 
  const pass = document.getElementById('loginPassword').value;
  if(!email || !pass) return alert('Masukkan Email dan Password!');
  
  const btn = document.querySelector('#loginForm .btn-auth');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch(e) {
    alert('Gagal login: ' + e.message);
    btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Masuk';
  }
}

async function doRegister() {
  const email = document.getElementById('regUsername').value.trim(); 
  const pass = document.getElementById('regPassword').value;
  let nameEl = document.getElementById('regName');
  const name = nameEl ? nameEl.value.trim() : email.split('@')[0];
  
  const checkboxes = document.querySelectorAll('input[name="regBidang"]:checked');
  const selectedBidang = Array.from(checkboxes).map(cb => cb.value);
  
  if(!email || !pass) return alert('Email dan password wajib diisi!');
  if(selectedBidang.length === 0) return alert('Pilih minimal satu bidang!');
  
  const btn = document.querySelector('#registerForm .btn-auth');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection('users').doc(cred.user.uid).set({
      email: email,
      name: name,
      role: 'staff',
      bidang: selectedBidang,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    alert('Registrasi berhasil! Akun berstatus PENDING. Hubungi Direktur / Admin Utama untuk persetujuan.');
    auth.signOut();
    showLogin();
  } catch(e) {
    alert('Gagal mendaftar: ' + e.message);
  } finally {
    btn.innerHTML = '<i class="fas fa-user-plus"></i> Daftar Akun';
  }
}

function showAppBasedOnRole() {
  document.getElementById('authWrapper').style.display = 'none';
  document.getElementById('appWrapper').style.display = 'block';
  
  const tbTitle = document.getElementById('topbarTitle');
  if(tbTitle) tbTitle.innerHTML = `Portal: ${currentName} (${currentRole.toUpperCase()})`;
  
  document.querySelectorAll('.sb-link.dept').forEach(el => el.style.display = 'none');
  const adminSection = document.getElementById('sb-admin-section');
  const navUsers = document.getElementById('nav-users');
  if(adminSection) adminSection.style.display = 'none';
  if(navUsers) navUsers.style.display = 'none';

  if (currentRole === 'admin') {
    document.querySelectorAll('.sb-link.dept').forEach(el => el.style.display = 'flex');
    if(adminSection) adminSection.style.display = 'block';
    if(navUsers) navUsers.style.display = 'flex';
  } else if (currentRole === 'wadir1') {
    ['akademik', 'sistem_pendidikan', 'laboratorium', 'perpustakaan'].forEach(b => {
      let el = document.getElementById('nav-'+b);
      if(el) el.style.display = 'flex';
    });
  } else if (currentRole === 'wadir2') {
    ['umum', 'kepegawaian', 'keuangan', 'rumah_tangga', 'sarana', 'sistem_informasi', 'humas', 'kerjasama'].forEach(b => {
      let el = document.getElementById('nav-'+b);
      if(el) el.style.display = 'flex';
    });
  } else if (currentRole === 'wadir3') {
    ['kemahasiswaan', 'lppm', 'pengabdian'].forEach(b => {
      let el = document.getElementById('nav-'+b);
      if(el) el.style.display = 'flex';
    });
  } else if (currentRole === 'staff') {
    currentBidang.forEach(b => {
      let el = document.getElementById('nav-'+b);
      if(el) el.style.display = 'flex';
    });
  }
  
  if (typeof loadData === 'function') loadData();
}

function doLogout() {
  auth.signOut();
}

function showLogin() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function showRegister() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
}

// MANAJEMEN PENGGUNA
async function loadUsers() {
  if (currentRole !== 'admin') return;
  const tbody = document.getElementById('usersTableBody');
  if(!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6" class="text-center"><i class="fas fa-spinner fa-spin"></i> Memuat...</td></tr>';
  
  try {
    const snap = await db.collection('users').orderBy('createdAt', 'desc').get();
    tbody.innerHTML = '';
    snap.forEach(doc => {
      const u = doc.data();
      const id = doc.id;
      
      const roleBadge = u.role === 'admin' ? '<span class="badge-k3">Admin Utama</span>' :
                        u.role === 'wadir1' ? '<span class="badge-k4">Wadir I</span>' :
                        u.role === 'wadir2' ? '<span class="badge-k5">Wadir II</span>' :
                        u.role === 'wadir3' ? '<span class="badge-k6">Wadir III</span>' :
                        '<span class="badge-k9">Staf</span>';
                        
      const statusBadge = u.status === 'active' ? '<span class="badge-k3">Aktif</span>' : '<span class="badge-k4">Pending</span>';
      const bidangStr = (u.bidang || []).join(', ');
      
      let actionBtns = '';
      if (u.status === 'pending') {
        actionBtns += `<button class="btn-arsip btn-approve" onclick="approveUser('${id}')" style="background:#10b981; color:#fff; border-radius:4px; padding:4px 8px; font-size:12px; margin-right:5px;"><i class="fas fa-check"></i> Setujui</button>`;
      }
      actionBtns += `<button class="btn-arsip btn-edit" onclick="editUserRole('${id}', '${u.role}')" style="background:#3b82f6; color:#fff; border-radius:4px; padding:4px 8px; font-size:12px;"><i class="fas fa-edit"></i> Jabatan</button>`;
      
      tbody.innerHTML += `
        <tr>
          <td><strong>${u.name || '-'}</strong></td>
          <td>${u.email}</td>
          <td>${roleBadge}</td>
          <td>${bidangStr}</td>
          <td>${statusBadge}</td>
          <td>${actionBtns}</td>
        </tr>
      `;
    });
  } catch(e) {
    console.error(e);
    tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="color:red;">Gagal memuat pengguna.</td></tr>';
  }
}

window.approveUser = async function(uid) {
  if(!confirm('Setujui akun ini?')) return;
  await db.collection('users').doc(uid).update({ status: 'active' });
  alert('Akun disetujui!');
  loadUsers();
};

window.editUserRole = async function(uid, currentRole) {
  const newRole = prompt('Masukkan Role baru (admin / wadir1 / wadir2 / wadir3 / staff):', currentRole);
  if(!newRole) return;
  if(!['admin','wadir1','wadir2','wadir3','staff'].includes(newRole)) return alert('Role tidak valid!');
  
  await db.collection('users').doc(uid).update({ role: newRole });
  alert('Jabatan berhasil diubah!');
  loadUsers();
};

document.addEventListener('DOMContentLoaded', () => {
  const navUsers = document.getElementById('nav-users');
  if(navUsers) {
    navUsers.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
      document.getElementById('page-users').classList.remove('hidden');
      loadUsers();
      
      // Update sidebar active states
      document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
      navUsers.classList.add('active');
    });
  }
});
