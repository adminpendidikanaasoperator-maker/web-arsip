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
  // Hide all pages first
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  
  let pageEl = document.getElementById(pageId);
  
  if (!pageEl) {
    // Need to fetch it
    try {
      // Map pageId to filename (e.g. 'page-dashboard' -> 'dashboard')
      const viewName = pageId.replace('page-', '');
      const res = await fetch(`views/${viewName}.html`);
      if (!res.ok) throw new Error(`Gagal meload view ${viewName}`);
      
      const html = await res.text();
      const mainContent = document.getElementById('mainContent');
      if (mainContent) {
        mainContent.insertAdjacentHTML('beforeend', html);
        pageEl = document.getElementById(pageId);
        loadedViews.add(pageId);
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }
  
  if (pageEl) {
    pageEl.classList.remove('hidden');
  }
}
