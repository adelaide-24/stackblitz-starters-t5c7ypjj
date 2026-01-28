/**
 * MaterialStock - Main Application
 * Complete JavaScript for handling authentication, materials CRUD, and UI
 */

 (function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  
  const CONFIG = {
      STORAGE_KEYS: {
          USERS: 'materialstock_users',
          CURRENT_USER: 'materialstock_current_user',
          MATERIALS_PREFIX: 'materialstock_materials_'
      },
      MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
      IMAGE_QUALITY: 0.8,
      IMAGE_MAX_WIDTH: 800
  };

  // Default admin account
  const DEFAULT_ADMIN = {
      name: 'Adelaide Penzo',
      email: 'adelaide.penzo.ar24@itsmarcopolo.it',
      password: 'admin1234',
      organization: 'ITS Marco Polo'
  };

  // 7 Default materials with real images from Unsplash
  const DEFAULT_MATERIALS = [
      {
          name: 'Travi in legno di abete 300×15×15cm',
          quantity: 24,
          condition: 'buono',
          location: 'Magazzino A - Scaffale 1',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Da assegnare',
          notes: 'Travi strutturali utilizzate per l\'installazione principale. Alcune presentano lievi segni di montaggio (fori per viti). Legno trattato, adatto per riutilizzo in nuovi allestimenti sia interni che esterni.',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80'
      },
      {
          name: 'Mattoni in terracotta artigianali',
          quantity: 450,
          condition: 'ottimo',
          location: 'Magazzino A - Area esterna coperta',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Mostra "Architettura Sostenibile" Milano 2024',
          notes: 'Mattoni fatti a mano da fornace tradizionale toscana. Dimensioni circa 25×12×6cm. Superficie irregolare con bella patina. Perfetti per installazioni artistiche e rivestimenti.',
          image: 'https://images.unsplash.com/photo-1590075865003-e48b568c0443?w=600&h=400&fit=crop&q=80'
      },
      {
          name: 'Blocchi in terra cruda compressa',
          quantity: 35,
          condition: 'buono',
          location: 'Magazzino B - Container climatizzato',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Da assegnare',
          notes: 'Blocchi BTC (Compressed Earth Blocks) 40×20×20cm. Materiale 100% naturale e riciclabile. IMPORTANTE: conservare in ambiente asciutto, evitare umidità. Peso circa 18kg/blocco.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&q=80'
      },
      {
          name: 'Pannelli OSB 244×122cm spessore 18mm',
          quantity: 48,
          condition: 'discreto',
          location: 'Magazzino A - Scaffale 3',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Workshop Fondazione Arte Contemporanea',
          notes: 'Pannelli OSB3 per uso strutturale. Alcuni presentano fori da montaggi precedenti e lievi danni sui bordi. Utilizzabili per strutture temporanee, scenografie teatrali.',
          image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=400&fit=crop&q=80'
      },
      {
          name: 'Corde in canapa naturale ø20mm',
          quantity: 12,
          condition: 'ottimo',
          location: 'Magazzino B - Scaffale 1',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Da assegnare',
          notes: 'Rotoli da 50 metri ciascuno. Corda in fibra naturale di canapa, alta resistenza (carico rottura 800kg). Utilizzata per sospensioni artistiche. Conservare in luogo asciutto.',
          image: 'https://images.unsplash.com/photo-1516562309708-05f3b2b2c238?w=600&h=400&fit=crop&q=80'
      },
      {
          name: 'Lastre in sughero pressato 100×50cm',
          quantity: 80,
          condition: 'buono',
          location: 'Magazzino A - Scaffale 4',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Allestimento Museo Arte Contemporanea Torino',
          notes: 'Lastre spessore 3cm in sughero portoghese pressato. Materiale fonoassorbente e termoisolante. Superficie con texture naturale, ideale per rivestimenti e pannelli espositivi.',
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&q=80'
      },
      {
          name: 'Strutture tubolari in acciaio zincato',
          quantity: 16,
          condition: 'da verificare',
          location: 'Magazzino C - Area esterna',
          origin: 'Padiglione Italia, Biennale di Venezia 2023',
          destination: 'Da assegnare',
          notes: 'Elementi modulari per strutture espositive (sistema a incastro rapido). NECESSARIA VERIFICA: controllare integrità giunti, bulloneria e eventuali segni di ruggine prima del riutilizzo.',
          image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop&q=80'
      }
  ];

  // ============================================
  // STATE
  // ============================================
  
  const state = {
      currentMaterialId: null,
      sortField: 'name',
      sortDirection: 'asc',
      searchQuery: ''
  };

  // ============================================
  // DOM ELEMENTS CACHE
  // ============================================
  
  let elements = {};

  function cacheElements() {
      elements = {
          // Screens
          authScreen: document.getElementById('auth-screen'),
          dashboardScreen: document.getElementById('dashboard-screen'),
          
          // Auth
          loginForm: document.getElementById('login-form'),
          registerForm: document.getElementById('register-form'),
          loginEmail: document.getElementById('login-email'),
          loginPassword: document.getElementById('login-password'),
          loginError: document.getElementById('login-error'),
          registerName: document.getElementById('register-name'),
          registerEmail: document.getElementById('register-email'),
          registerPassword: document.getElementById('register-password'),
          registerOrg: document.getElementById('register-org'),
          registerError: document.getElementById('register-error'),
          tabBtns: document.querySelectorAll('.tab-btn'),
          
          // Dashboard
          userName: document.getElementById('user-name'),
          userOrg: document.getElementById('user-org'),
          logoutBtn: document.getElementById('logout-btn'),
          searchInput: document.getElementById('search-input'),
          addMaterialBtn: document.getElementById('add-material-btn'),
          emptyAddBtn: document.getElementById('empty-add-btn'),
          
          // Stats
          statTotal: document.getElementById('stat-total'),
          statPieces: document.getElementById('stat-pieces'),
          statGood: document.getElementById('stat-good'),
          
          // Table & Cards
          tableContainer: document.getElementById('table-container'),
          tableBody: document.getElementById('table-body'),
          cardsContainer: document.getElementById('cards-container'),
          emptyState: document.getElementById('empty-state'),
          noResultsState: document.getElementById('no-results-state'),
          
          // Detail Modal
          detailModal: document.getElementById('detail-modal'),
          detailImage: document.getElementById('detail-image'),
          detailPlaceholder: document.getElementById('detail-placeholder'),
          detailName: document.getElementById('detail-name'),
          detailCondition: document.getElementById('detail-condition'),
          detailQuantity: document.getElementById('detail-quantity'),
          detailLocation: document.getElementById('detail-location'),
          detailOrigin: document.getElementById('detail-origin'),
          detailDestination: document.getElementById('detail-destination'),
          detailNotesSection: document.getElementById('detail-notes-section'),
          detailNotes: document.getElementById('detail-notes'),
          detailCreated: document.getElementById('detail-created'),
          detailUpdated: document.getElementById('detail-updated'),
          editBtn: document.getElementById('edit-btn'),
          deleteBtn: document.getElementById('delete-btn'),
          
          // Form Modal
          formModal: document.getElementById('form-modal'),
          formTitle: document.getElementById('form-title'),
          materialForm: document.getElementById('material-form'),
          formId: document.getElementById('form-id'),
          formName: document.getElementById('form-name'),
          formQuantity: document.getElementById('form-quantity'),
          formCondition: document.getElementById('form-condition'),
          formLocation: document.getElementById('form-location'),
          formOrigin: document.getElementById('form-origin'),
          formDestination: document.getElementById('form-destination'),
          formNotes: document.getElementById('form-notes'),
          formImageInput: document.getElementById('form-image-input'),
          imagePreview: document.getElementById('image-preview'),
          imageUploaded: document.getElementById('image-uploaded'),
          previewImg: document.getElementById('preview-img'),
          removeImageBtn: document.getElementById('remove-image-btn'),
          cancelFormBtn: document.getElementById('cancel-form-btn'),
          
          // Delete Modal
          deleteModal: document.getElementById('delete-modal'),
          deleteName: document.getElementById('delete-name'),
          cancelDeleteBtn: document.getElementById('cancel-delete-btn'),
          confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
          
          // Toast
          toast: document.getElementById('toast'),
          toastMessage: document.getElementById('toast-message')
      };
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  function getStorage(key) {
      try {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
      } catch (e) {
          console.error('Storage read error:', e);
          return null;
      }
  }

  function setStorage(key, value) {
      try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
      } catch (e) {
          console.error('Storage write error:', e);
          return false;
      }
  }

  function hash(str) {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
          h = ((h << 5) - h) + str.charCodeAt(i);
          h = h & h;
      }
      return Math.abs(h).toString(36);
  }

  function generateId() {
      return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  function formatDate(timestamp) {
      if (!timestamp) return '-';
      return new Date(timestamp).toLocaleDateString('it-IT', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      });
  }

  function escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
  }

  function debounce(func, wait) {
      let timeout;
      return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
      };
  }

  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
      console.log('🚀 MaterialStock - Initializing...');
      
      cacheElements();
      initializeData();
      bindEvents();
      checkAuth();
      
      console.log('✅ MaterialStock - Ready!');
  }

  function initializeData() {
      // Create default admin if not exists
      let users = getStorage(CONFIG.STORAGE_KEYS.USERS) || [];
      const adminEmail = DEFAULT_ADMIN.email.toLowerCase();
      let admin = users.find(u => u.email === adminEmail);
      
      if (!admin) {
          console.log('👤 Creating default admin account...');
          
          admin = {
              id: generateId(),
              name: DEFAULT_ADMIN.name,
              email: adminEmail,
              passwordHash: hash(DEFAULT_ADMIN.password),
              organization: DEFAULT_ADMIN.organization,
              createdAt: Date.now()
          };
          
          users.push(admin);
          setStorage(CONFIG.STORAGE_KEYS.USERS, users);
          
          // Create default materials with images
          const materials = DEFAULT_MATERIALS.map((m, index) => ({
              id: generateId(),
              ...m,
              createdAt: Date.now() - (index * 86400000 * 3),
              updatedAt: Date.now() - (index * 86400000)
          }));
          
          setStorage(CONFIG.STORAGE_KEYS.MATERIALS_PREFIX + admin.id, materials);
          console.log('📦 Default materials with images loaded');
      }
  }

  // ============================================
  // EVENT BINDING
  // ============================================
  
  function bindEvents() {
      // Auth tabs
      elements.tabBtns.forEach(btn => {
          btn.addEventListener('click', () => switchAuthTab(btn.dataset.tab));
      });
      
      // Auth forms
      elements.loginForm.addEventListener('submit', handleLogin);
      elements.registerForm.addEventListener('submit', handleRegister);
      
      // Logout
      elements.logoutBtn.addEventListener('click', handleLogout);
      
      // Search
      elements.searchInput.addEventListener('input', debounce(handleSearch, 250));
      
      // Add material
      elements.addMaterialBtn.addEventListener('click', openAddModal);
      if (elements.emptyAddBtn) {
          elements.emptyAddBtn.addEventListener('click', openAddModal);
      }
      
      // Table sorting
      document.querySelectorAll('.sortable').forEach(th => {
          th.addEventListener('click', () => handleSort(th.dataset.sort));
      });
      
      // Modal overlays and close buttons
      document.querySelectorAll('.modal-overlay, .modal-close').forEach(el => {
          el.addEventListener('click', () => {
              const modalId = el.dataset.modal || el.closest('.modal').id.replace('-modal', '');
              closeModal(modalId);
          });
      });
      
      // Detail modal actions
      elements.editBtn.addEventListener('click', openEditModal);
      elements.deleteBtn.addEventListener('click', openDeleteConfirmation);
      
      // Form modal
      elements.materialForm.addEventListener('submit', handleFormSubmit);
      elements.cancelFormBtn.addEventListener('click', () => closeModal('form'));
      
      // Image upload
      elements.imagePreview.addEventListener('click', () => elements.formImageInput.click());
      elements.formImageInput.addEventListener('change', handleImageUpload);
      elements.removeImageBtn.addEventListener('click', removeFormImage);
      
      // Delete modal
      elements.cancelDeleteBtn.addEventListener('click', () => closeModal('delete'));
      elements.confirmDeleteBtn.addEventListener('click', confirmDelete);
      
      // Keyboard
      document.addEventListener('keydown', handleKeyboard);
  }

  // ============================================
  // AUTHENTICATION
  // ============================================
  
  function checkAuth() {
      const user = getStorage(CONFIG.STORAGE_KEYS.CURRENT_USER);
      if (user) {
          showDashboard(user);
      } else {
          showAuthScreen();
      }
  }

  function showAuthScreen() {
      elements.authScreen.classList.add('active');
      elements.dashboardScreen.classList.remove('active');
  }

  function showDashboard(user) {
      elements.authScreen.classList.remove('active');
      elements.dashboardScreen.classList.add('active');
      
      elements.userName.textContent = user.name;
      elements.userOrg.textContent = user.organization || '';
      
      renderMaterials();
      updateStats();
  }

  function switchAuthTab(tab) {
      elements.tabBtns.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.tab === tab);
      });
      
      elements.loginForm.classList.toggle('active', tab === 'login');
      elements.registerForm.classList.toggle('active', tab === 'register');
      
      elements.loginError.textContent = '';
      elements.registerError.textContent = '';
  }

  function handleLogin(e) {
      e.preventDefault();
      
      const email = elements.loginEmail.value.trim().toLowerCase();
      const password = elements.loginPassword.value;
      
      const users = getStorage(CONFIG.STORAGE_KEYS.USERS) || [];
      const user = users.find(u => u.email === email);
      
      if (!user || user.passwordHash !== hash(password)) {
          elements.loginError.textContent = 'Email o password non corretti';
          return;
      }
      
      const sessionUser = { ...user };
      delete sessionUser.passwordHash;
      setStorage(CONFIG.STORAGE_KEYS.CURRENT_USER, sessionUser);
      
      elements.loginForm.reset();
      showDashboard(sessionUser);
      showToast(`Benvenuto, ${sessionUser.name}!`);
  }

  function handleRegister(e) {
      e.preventDefault();
      
      const name = elements.registerName.value.trim();
      const email = elements.registerEmail.value.trim().toLowerCase();
      const password = elements.registerPassword.value;
      const org = elements.registerOrg.value.trim();
      
      let users = getStorage(CONFIG.STORAGE_KEYS.USERS) || [];
      
      if (users.find(u => u.email === email)) {
          elements.registerError.textContent = 'Email già registrata';
          return;
      }
      
      const newUser = {
          id: generateId(),
          name,
          email,
          passwordHash: hash(password),
          organization: org,
          createdAt: Date.now()
      };
      
      users.push(newUser);
      setStorage(CONFIG.STORAGE_KEYS.USERS, users);
      setStorage(CONFIG.STORAGE_KEYS.MATERIALS_PREFIX + newUser.id, []);
      
      const sessionUser = { ...newUser };
      delete sessionUser.passwordHash;
      setStorage(CONFIG.STORAGE_KEYS.CURRENT_USER, sessionUser);
      
      elements.registerForm.reset();
      showDashboard(sessionUser);
      showToast('Account creato con successo!');
  }

  function handleLogout() {
      localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER);
      state.searchQuery = '';
      elements.searchInput.value = '';
      showAuthScreen();
      showToast('Logout effettuato');
  }

  // ============================================
  // MATERIALS MANAGEMENT
  // ============================================
  
  function getMaterials() {
      const user = getStorage(CONFIG.STORAGE_KEYS.CURRENT_USER);
      if (!user) return [];
      return getStorage(CONFIG.STORAGE_KEYS.MATERIALS_PREFIX + user.id) || [];
  }

  function saveMaterials(materials) {
      const user = getStorage(CONFIG.STORAGE_KEYS.CURRENT_USER);
      if (!user) return false;
      return setStorage(CONFIG.STORAGE_KEYS.MATERIALS_PREFIX + user.id, materials);
  }

  function getMaterialById(id) {
      return getMaterials().find(m => m.id === id);
  }

  function renderMaterials() {
      let materials = getMaterials();
      
      // Filter by search
      if (state.searchQuery) {
          const query = state.searchQuery.toLowerCase();
          materials = materials.filter(m =>
              m.name.toLowerCase().includes(query) ||
              m.location.toLowerCase().includes(query) ||
              (m.origin && m.origin.toLowerCase().includes(query)) ||
              (m.destination && m.destination.toLowerCase().includes(query)) ||
              (m.notes && m.notes.toLowerCase().includes(query)) ||
              m.condition.toLowerCase().includes(query)
          );
      }
      
      // Sort
      materials.sort((a, b) => {
          let valA = a[state.sortField] || '';
          let valB = b[state.sortField] || '';
          
          if (state.sortField === 'quantity') {
              valA = parseInt(valA) || 0;
              valB = parseInt(valB) || 0;
          } else {
              valA = valA.toString().toLowerCase();
              valB = valB.toString().toLowerCase();
          }
          
          if (valA < valB) return state.sortDirection === 'asc' ? -1 : 1;
          if (valA > valB) return state.sortDirection === 'asc' ? 1 : -1;
          return 0;
      });
      
      const allMaterials = getMaterials();
      const isEmpty = allMaterials.length === 0;
      const noResults = !isEmpty && materials.length === 0;
      
      // Toggle visibility
      elements.tableContainer.style.display = isEmpty || noResults ? 'none' : '';
      elements.cardsContainer.style.display = isEmpty || noResults ? 'none' : '';
      elements.emptyState.classList.toggle('visible', isEmpty);
      elements.noResultsState.classList.toggle('visible', noResults);
      
      if (!isEmpty && !noResults) {
          renderTable(materials);
          renderCards(materials);
      }
  }

  function renderTable(materials) {
      const html = materials.map(m => `
          <tr data-id="${m.id}">
              <td>
                  ${m.image 
                      ? `<img src="${m.image}" class="table-image" alt="${escapeHtml(m.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                         <div class="table-image-placeholder" style="display:none;">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4B49A" stroke-width="1.5">
                                 <rect x="3" y="3" width="18" height="18" rx="2"/>
                             </svg>
                         </div>`
                      : `<div class="table-image-placeholder">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4B49A" stroke-width="1.5">
                                 <rect x="3" y="3" width="18" height="18" rx="2"/>
                             </svg>
                         </div>`
                  }
              </td>
              <td>
                  <div class="material-info">
                      <div class="material-name">${escapeHtml(m.name)}</div>
                      <div class="material-location-sub">${escapeHtml(m.location)}</div>
                  </div>
              </td>
              <td style="text-align: center; font-weight: 600;">${m.quantity}</td>
              <td>
                  <span class="condition-badge ${m.condition.replace(/\s+/g, '-')}">${m.condition}</span>
              </td>
              <td class="col-location">${escapeHtml(m.location)}</td>
              <td>
                  <div class="actions-cell">
                      <button class="action-btn edit-btn" data-action="edit" title="Modifica">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                      </button>
                      <button class="action-btn delete-btn" data-action="delete" title="Elimina">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="3,6 5,6 21,6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                      </button>
                  </div>
              </td>
          </tr>
      `).join('');
      
      elements.tableBody.innerHTML = html;
      
      // Add click handlers
      elements.tableBody.querySelectorAll('tr').forEach(row => {
          row.addEventListener('click', (e) => {
              const action = e.target.closest('[data-action]');
              const id = row.dataset.id;
              
              if (action) {
                  e.stopPropagation();
                  if (action.dataset.action === 'edit') {
                      state.currentMaterialId = id;
                      openEditModal();
                  } else if (action.dataset.action === 'delete') {
                      state.currentMaterialId = id;
                      openDeleteConfirmation();
                  }
              } else {
                  openDetailModal(id);
              }
          });
      });
  }

  function renderCards(materials) {
      const html = materials.map(m => `
          <div class="material-card" data-id="${m.id}">
              ${m.image 
                  ? `<img src="${m.image}" class="card-image" alt="${escapeHtml(m.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                     <div class="card-image-placeholder" style="display:none;">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4B49A" stroke-width="1">
                             <rect x="3" y="3" width="18" height="18" rx="2"/>
                         </svg>
                     </div>`
                  : `<div class="card-image-placeholder">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C4B49A" stroke-width="1">
                             <rect x="3" y="3" width="18" height="18" rx="2"/>
                         </svg>
                     </div>`
              }
              <div class="card-content">
                  <div class="card-header">
                      <h3 class="card-title">${escapeHtml(m.name)}</h3>
                      <span class="condition-badge ${m.condition.replace(/\s+/g, '-')}">${m.condition}</span>
                  </div>
                  <div class="card-details">
                      <div>
                          <div class="card-detail-label">Quantità</div>
                          <div class="card-detail-value">${m.quantity} pezzi</div>
                      </div>
                      <div>
                          <div class="card-detail-label">Collocazione</div>
                          <div class="card-detail-value">${escapeHtml(m.location)}</div>
                      </div>
                  </div>
              </div>
          </div>
      `).join('');
      
      elements.cardsContainer.innerHTML = html;
      
      // Add click handlers
      elements.cardsContainer.querySelectorAll('.material-card').forEach(card => {
          card.addEventListener('click', () => openDetailModal(card.dataset.id));
      });
  }

  function updateStats() {
      const materials = getMaterials();
      elements.statTotal.textContent = materials.length;
      elements.statPieces.textContent = materials.reduce((sum, m) => sum + (parseInt(m.quantity) || 0), 0);
      elements.statGood.textContent = materials.filter(m => 
          m.condition === 'ottimo' || m.condition === 'buono'
      ).length;
  }

  // ============================================
  // SEARCH & SORT
  // ============================================
  
  function handleSearch() {
      state.searchQuery = elements.searchInput.value.trim();
      renderMaterials();
  }

  function handleSort(field) {
      if (state.sortField === field) {
          state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
          state.sortField = field;
          state.sortDirection = 'asc';
      }
      
      // Update UI
      document.querySelectorAll('.sortable').forEach(th => {
          th.classList.remove('asc', 'desc');
          if (th.dataset.sort === field) {
              th.classList.add(state.sortDirection);
          }
      });
      
      renderMaterials();
  }

  // ============================================
  // MODALS
  // ============================================
  
  function openModal(modalId) {
      document.getElementById(`${modalId}-modal`).classList.add('active');
      document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
      document.getElementById(`${modalId}-modal`).classList.remove('active');
      document.body.style.overflow = '';
  }

  function openDetailModal(id) {
      const m = getMaterialById(id);
      if (!m) return;
      
      state.currentMaterialId = id;
      
      // Image
      if (m.image) {
          elements.detailImage.src = m.image;
          elements.detailImage.style.display = 'block';
          elements.detailPlaceholder.style.display = 'none';
          elements.detailImage.onerror = () => {
              elements.detailImage.style.display = 'none';
              elements.detailPlaceholder.style.display = 'flex';
          };
      } else {
          elements.detailImage.style.display = 'none';
          elements.detailPlaceholder.style.display = 'flex';
      }
      
      // Content
      elements.detailName.textContent = m.name;
      elements.detailCondition.textContent = m.condition;
      elements.detailCondition.className = `condition-badge ${m.condition.replace(/\s+/g, '-')}`;
      elements.detailQuantity.textContent = `${m.quantity} ${m.quantity === 1 ? 'pezzo' : 'pezzi'}`;
      elements.detailLocation.textContent = m.location || '-';
      elements.detailOrigin.textContent = m.origin || '-';
      elements.detailDestination.textContent = m.destination || '-';
      
      // Notes
      if (m.notes) {
          elements.detailNotes.textContent = m.notes;
          elements.detailNotesSection.style.display = 'block';
      } else {
          elements.detailNotesSection.style.display = 'none';
      }
      
      // Meta
      elements.detailCreated.textContent = `Creato: ${formatDate(m.createdAt)}`;
      elements.detailUpdated.textContent = `Modificato: ${formatDate(m.updatedAt)}`;
      
      openModal('detail');
  }

  function openAddModal() {
      state.currentMaterialId = null;
      elements.formTitle.textContent = 'Nuovo Materiale';
      elements.materialForm.reset();
      elements.formId.value = '';
      elements.formQuantity.value = '1';
      elements.formCondition.value = 'buono';
      resetFormImage();
      openModal('form');
  }

  function openEditModal() {
      const m = getMaterialById(state.currentMaterialId);
      if (!m) return;
      
      closeModal('detail');
      
      elements.formTitle.textContent = 'Modifica Materiale';
      elements.formId.value = m.id;
      elements.formName.value = m.name;
      elements.formQuantity.value = m.quantity;
      elements.formCondition.value = m.condition;
      elements.formLocation.value = m.location;
      elements.formOrigin.value = m.origin || '';
      elements.formDestination.value = m.destination || '';
      elements.formNotes.value = m.notes || '';
      
      if (m.image) {
          elements.previewImg.src = m.image;
          elements.imagePreview.style.display = 'none';
          elements.imageUploaded.hidden = false;
      } else {
          resetFormImage();
      }
      
      setTimeout(() => openModal('form'), 150);
  }

  function openDeleteConfirmation() {
      const m = getMaterialById(state.currentMaterialId);
      if (!m) return;
      
      elements.deleteName.textContent = m.name;
      closeModal('detail');
      setTimeout(() => openModal('delete'), 150);
  }

  // ============================================
  // FORM HANDLING
  // ============================================
  
  function handleFormSubmit(e) {
      e.preventDefault();
      
      const id = elements.formId.value;
      const data = {
          name: elements.formName.value.trim(),
          quantity: parseInt(elements.formQuantity.value) || 0,
          condition: elements.formCondition.value,
          location: elements.formLocation.value.trim(),
          origin: elements.formOrigin.value.trim(),
          destination: elements.formDestination.value.trim(),
          notes: elements.formNotes.value.trim(),
          image: elements.imageUploaded.hidden ? null : elements.previewImg.src
      };
      
      let materials = getMaterials();
      
      if (id) {
          // Update existing
          const index = materials.findIndex(m => m.id === id);
          if (index !== -1) {
              materials[index] = {
                  ...materials[index],
                  ...data,
                  updatedAt: Date.now()
              };
              showToast('Materiale aggiornato con successo!');
          }
      } else {
          // Create new
          materials.push({
              id: generateId(),
              ...data,
              createdAt: Date.now(),
              updatedAt: Date.now()
          });
          showToast('Materiale aggiunto con successo!');
      }
      
      saveMaterials(materials);
      closeModal('form');
      renderMaterials();
      updateStats();
  }

  function handleImageUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      if (!file.type.startsWith('image/')) {
          showToast('Seleziona un file immagine valido', true);
          return;
      }
      
      if (file.size > CONFIG.MAX_IMAGE_SIZE) {
          showToast('Immagine troppo grande (max 5MB)', true);
          return;
      }
      
      const reader = new FileReader();
      reader.onload = (evt) => {
          compressImage(evt.target.result, (compressedImage) => {
              elements.previewImg.src = compressedImage;
              elements.imagePreview.style.display = 'none';
              elements.imageUploaded.hidden = false;
          });
      };
      reader.readAsDataURL(file);
  }

  function compressImage(dataUrl, callback) {
      const img = new Image();
      img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          if (width > CONFIG.IMAGE_MAX_WIDTH) {
              height = (height * CONFIG.IMAGE_MAX_WIDTH) / width;
              width = CONFIG.IMAGE_MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          
          callback(canvas.toDataURL('image/jpeg', CONFIG.IMAGE_QUALITY));
      };
      img.src = dataUrl;
  }

  function removeFormImage() {
      resetFormImage();
  }

  function resetFormImage() {
      elements.formImageInput.value = '';
      elements.previewImg.src = '';
      elements.imagePreview.style.display = 'flex';
      elements.imageUploaded.hidden = true;
  }

  // ============================================
  // DELETE
  // ============================================
  
  function confirmDelete() {
      if (!state.currentMaterialId) return;
      
      let materials = getMaterials();
      materials = materials.filter(m => m.id !== state.currentMaterialId);
      saveMaterials(materials);
      
      state.currentMaterialId = null;
      closeModal('delete');
      renderMaterials();
      updateStats();
      showToast('Materiale eliminato');
  }

  // ============================================
  // TOAST
  // ============================================
  
  function showToast(message, isError = false) {
      elements.toastMessage.textContent = message;
      elements.toast.classList.toggle('error', isError);
      elements.toast.classList.add('visible');
      
      setTimeout(() => {
          elements.toast.classList.remove('visible');
      }, 3000);
  }

  // ============================================
  // KEYBOARD
  // ============================================
  
  function handleKeyboard(e) {
      if (e.key === 'Escape') {
          document.querySelectorAll('.modal.active').forEach(modal => {
              modal.classList.remove('active');
          });
          document.body.style.overflow = '';
      }
  }

  // ============================================
  // START APPLICATION
  // ============================================
  
  document.addEventListener('DOMContentLoaded', init);

})();
