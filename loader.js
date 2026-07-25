const loadedViews = new Set();
const loadedModals = new Set();

async function loadModal(modalName) {
  if (loadedModals.has(modalName)) return;
  try {
    const res = await fetch(`views/modals/${modalName}.html`);
    if (!res.ok) throw new Error(`Gagal meload modal ${modalName}`);
    const html = await res.text();
    const container = document.getElementById('modalsContainer');
    if(container) {
      container.insertAdjacentHTML('beforeend', html);
      loadedModals.add(modalName);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loadAllModals() {
  await Promise.all([
    loadModal('arsip'),
    loadModal('user'),
    loadModal('sdm_mhs')
  ]);
}

async function loadPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  let pageEl = document.getElementById(pageId);
  if (pageEl) {
    pageEl.classList.remove('hidden');
  }
}
