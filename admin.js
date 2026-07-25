// admin.js - User Management Logic

const BIDANG_OPTIONS = {
  akademik: "Akademik & Pendidikan",
  sistem_pendidikan: "Sistem Informasi Pendidikan",
  laboratorium: "Laboratorium",
  perpustakaan: "Perpustakaan",
  umum: "Umum & Kelembagaan",
  kepegawaian: "Administrasi Kepegawaian (Ketenagaan)",
  keuangan: "Keuangan & Institusi",
  rumah_tangga: "Rumah Tangga",
  sarana: "Sarana Prasarana",
  sistem_informasi: "Sistem Informasi",
  humas: "HUMAS",
  kerjasama: "Kerjasama",
  kemahasiswaan: "Kemahasiswaan & Alumni",
  lppm: "Penelitian & Pelatihan (LPPM)",
  pengabdian: "Pengabdian Masyarakat"
};

let allUsersData = [];

// Populate users table
async function loadUsers() {
  const tbody = document.getElementById('usersTableBody');
  if(!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading users...</td></tr>';
  
  try {
    const snapshot = await db.collection('users').get();
    allUsersData = [];
    snapshot.forEach(doc => {
      allUsersData.push({ id: doc.id, ...doc.data() });
    });
    
    renderUsersTable();
  } catch(e) {
    console.error("Error loading users:", e);
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:red;">Error loading users</td></tr>';
  }
}

function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  if(!tbody) return;
  
  if(allUsersData.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Tidak ada pengguna ditemukan.</td></tr>';
    return;
  }
  
  let html = '';
  allUsersData.forEach(user => {
    let statusBadge = '';
    if(user.status === 'active') statusBadge = '<span class="badge" style="background:#107c41;color:white;">Active</span>';
    else if(user.status === 'pending') statusBadge = '<span class="badge" style="background:#f59e0b;color:white;">Pending</span>';
    else statusBadge = '<span class="badge" style="background:#dc2626;color:white;">Disabled</span>';
    
    let bidangLabels = (user.bidang || []).map(b => BIDANG_OPTIONS[b] || b).join(', ');
    if(!bidangLabels) bidangLabels = '-';
    
    html += `
      <tr>
        <td><strong>${user.name || '-'}</strong></td>
        <td>${user.email}</td>
        <td><span style="text-transform:uppercase;font-size:0.8rem;font-weight:600;color:var(--primary-d);">${user.role || 'staff'}</span></td>
        <td style="font-size:0.8rem;">${bidangLabels}</td>
        <td>${statusBadge}</td>
        <td>
          <button class="tb-btn tb-btn-outline" style="font-size:0.8rem;padding:4px 8px;" onclick="openUserForm('${user.id}')">
            <i class="fas fa-edit"></i> Edit
          </button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
}

function openUserForm(userId) {
  const user = allUsersData.find(u => u.id === userId);
  if(!user) return;
  
  document.getElementById('editUserId').value = user.id;
  document.getElementById('fmUserName').value = user.name || '';
  document.getElementById('fmUserEmail').value = user.email || '';
  document.getElementById('fmUserRole').value = user.role || 'staff';
  document.getElementById('fmUserStatus').value = user.status || 'pending';
  
  // Render checkboxes
  const listContainer = document.getElementById('fmUserBidangList');
  let cbHtml = '';
  Object.keys(BIDANG_OPTIONS).forEach(key => {
    const isChecked = (user.bidang || []).includes(key) ? 'checked' : '';
    cbHtml += `<label style="display:block; margin-bottom:5px; font-size:0.85rem;"><input type="checkbox" name="editUserBidang" value="${key}" ${isChecked}> ${BIDANG_OPTIONS[key]}</label>`;
  });
  listContainer.innerHTML = cbHtml;
  
  document.getElementById('overlayUserForm').style.display = 'flex';
  setTimeout(() => { document.getElementById('overlayUserForm').style.opacity = '1'; }, 10);
}

function closeUserForm() {
  document.getElementById('overlayUserForm').style.opacity = '0';
  setTimeout(() => { document.getElementById('overlayUserForm').style.display = 'none'; }, 300);
}

async function saveUser(e) {
  e.preventDefault();
  const userId = document.getElementById('editUserId').value;
  const name = document.getElementById('fmUserName').value;
  const role = document.getElementById('fmUserRole').value;
  const status = document.getElementById('fmUserStatus').value;
  
  const checkboxes = document.querySelectorAll('input[name="editUserBidang"]:checked');
  const selectedBidang = Array.from(checkboxes).map(cb => cb.value);
  
  try {
    await db.collection('users').doc(userId).update({
      name: name,
      role: role,
      status: status,
      bidang: selectedBidang
    });
    alert('Data pengguna berhasil diperbarui!');
    closeUserForm();
    loadUsers(); // refresh table
  } catch(err) {
    alert('Gagal memperbarui pengguna: ' + err.message);
  }
}

// Ensure loadUsers runs when navigating to user management
document.addEventListener('DOMContentLoaded', () => {
  const navUsers = document.getElementById('nav-users');
  if(navUsers) {
    navUsers.addEventListener('click', () => {
      loadUsers();
    });
  }
});
