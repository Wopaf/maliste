// ============================================================
//  CONFIGURATION FIREBASE
// ============================================================
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBsjr0peOj1jFPhAA080MWuUGlyYapjxn0",
    authDomain: "moviegame-1b838.firebaseapp.com",
    databaseURL: "https://moviegame-1b838-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "moviegame-1b838",
    storageBucket: "moviegame-1b838.firebasestorage.app",
    messagingSenderId: "448540908211",
    appId: "1:448540908211:web:894cb1e8c38d59c4a9eec6"
};

setTimeout(() => {
  const loader = document.getElementById('page-loader');
  loader.classList.add('fade-out');
  loader.addEventListener('transitionend', () => loader.remove(), { once: true });
}, 500);

firebase.initializeApp(FIREBASE_CONFIG);
const db   = firebase.database();
const auth = firebase.auth();

let currentUser    = null;
let currentViewUid = null;

let films  = [];
let series = [];
let anime  = [];
let _dataReady = false;

function _tryRender() {
  if (_dataReady && typeof render === 'function') render();
}

function sanitizeKey(title) {
  return title.replace(/[.#$\/\[\]]/g, '_');
}

function getStars(title) {
  const item = [...films, ...series, ...anime].find(i => i.title === title);
  return item?.stars || 0;
}

function setRating(title, stars) {
  if (!currentUser || currentViewUid !== currentUser.uid) return;

  let arr, arrName;
  let item = films.find(i => i.title === title);
  if (item) { arr = films; arrName = 'films'; }
  else {
    item = series.find(i => i.title === title);
    if (item) { arr = series; arrName = 'series'; }
    else {
      item = anime.find(i => i.title === title);
      if (item) { arr = anime; arrName = 'anime'; }
    }
  }
  if (!item) return;

  if (stars === 0) delete item.stars;
  else item.stars = stars;

  db.ref(`users/${currentUser.uid}/${arrName}`).set(arr);
}

function loadUserData(uid) {
  _dataReady = false;
  films = []; series = []; anime = [];
  db.ref(`users/${uid}`).once('value', snap => {
    const d = snap.val() || {};
    films  = Object.values(d.films  || {});
    series = Object.values(d.series || {});
    anime  = Object.values(d.anime  || {});
    _dataReady = true;
    buildGenreFilters(currentTab === 'films' ? films : currentTab === 'series' ? series : anime);
    _tryRender();
  });
}

// ── Auth UI ──────────────────────────────────────────────────
const authScreen   = document.getElementById('auth-screen');
const authEmail    = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authError    = document.getElementById('auth-error');
const authSubmit   = document.getElementById('auth-submit');
const authSwitch   = document.getElementById('auth-switch');
let   authMode     = 'login';

authSwitch.addEventListener('click', () => {
  authMode = authMode === 'login' ? 'register' : 'login';
  authError.textContent = '';
  document.getElementById('auth-mode-label').textContent =
    authMode === 'login' ? 'Connexion' : 'Créer un compte';
  authSubmit.textContent =
    authMode === 'login' ? 'Se connecter' : "S'inscrire";
  authSwitch.textContent =
    authMode === 'login' ? 'Créer un compte' : 'Déjà inscrit ? Se connecter';
});

authSubmit.addEventListener('click', async () => {
  authError.textContent = '';
  authSubmit.disabled = true;
  const email    = authEmail.value.trim();
  const password = authPassword.value;
  try {
    if (authMode === 'register') {
      const pseudo = randomPseudo();
      const cred   = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: pseudo });
      await db.ref(`users/${cred.user.uid}/name`).set(pseudo);
      await db.ref(`profiles/${cred.user.uid}/name`).set(pseudo);
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
  } catch (e) {
    authError.textContent = firebaseAuthError(e.code);
    authSubmit.disabled = false;
  }
});

[authEmail, authPassword].forEach(el => {
  el.addEventListener('keydown', e => { if (e.key === 'Enter') authSubmit.click(); });
});

const PSEUDO_ADJ  = ['Rouge','Bleu','Vert','Sombre','Rapide','Sage','Vif','Calme','Grand','Brave','Noble','Fier','Doux','Vieux','Fort'];
const PSEUDO_NOUN = ['Loup','Aigle','Renard','Tigre','Corbeau','Lynx','Panda','Phénix','Dragon','Faucon','Ours','Lion','Requin','Cerf','Hibou'];

function randomPseudo() {
  return PSEUDO_ADJ[Math.random() * PSEUDO_ADJ.length | 0] + PSEUDO_NOUN[Math.random() * PSEUDO_NOUN.length | 0];
}

function firebaseAuthError(code) {
  const map = {
    'auth/user-not-found':       'Aucun compte avec cet email.',
    'auth/wrong-password':       'Mot de passe incorrect.',
    'auth/email-already-in-use': 'Cet email est déjà utilisé.',
    'auth/weak-password':        'Mot de passe trop court (min. 6 caractères).',
    'auth/invalid-email':        'Email invalide.',
    'auth/invalid-credential':   'Email ou mot de passe incorrect.',
  };
  return map[code] || 'Une erreur est survenue.';
}

// ── Menu utilisateur ─────────────────────────────────────────
const userBtn  = document.getElementById('user-btn');
const userMenu = document.getElementById('user-menu');

userBtn.addEventListener('click', e => {
  e.stopPropagation();
  userMenu.classList.toggle('open');
});

document.addEventListener('click', () => userMenu.classList.remove('open'));
userMenu.addEventListener('click', e => e.stopPropagation());

// ── Avatar ───────────────────────────────────────────────────
function setAvatarDisplay(url) {
  const btnAvatar = document.getElementById('user-btn-avatar');
  const initials  = document.getElementById('user-initials');
  btnAvatar.src           = url;
  btnAvatar.style.display = 'block';
  initials.style.display  = 'none';

  const menuImg     = document.getElementById('user-menu-avatar-img');
  const menuInitial = document.getElementById('user-menu-avatar-initial');
  menuImg.src             = url;
  menuImg.style.display   = 'block';
  menuInitial.style.display = 'none';
}

function clearAvatarDisplay() {
  document.getElementById('user-btn-avatar').style.display   = 'none';
  document.getElementById('user-initials').style.display     = '';
  document.getElementById('user-menu-avatar-img').style.display     = 'none';
  document.getElementById('user-menu-avatar-initial').style.display = '';
}

document.getElementById('user-menu-avatar-btn').addEventListener('click', () => {
  const picker = document.getElementById('avatar-picker');
  const isOpen = picker.style.display !== 'none';
  if (isOpen) { picker.style.display = 'none'; return; }

  const grid = document.getElementById('avatar-picker-grid');
  const currentAvatar = document.getElementById('user-menu-avatar-img').src;
  const posters = [...new Set(
    [...films, ...series, ...anime].filter(i => i.poster).map(i => i.poster)
  )];

  if (!posters.length) {
    grid.innerHTML = '<p style="color:#555;font-size:12px">Aucune affiche disponible.</p>';
  } else {
    grid.innerHTML = '';
    posters.forEach(url => {
      const img = document.createElement('img');
      img.src       = url;
      img.className = 'avatar-picker-item' + (url === currentAvatar ? ' selected' : '');
      img.addEventListener('click', () => saveAvatar(url));
      grid.appendChild(img);
    });
  }
  picker.style.display = 'block';
});

async function saveAvatar(url) {
  if (!currentUser) return;
  await db.ref(`users/${currentUser.uid}/avatar`).set(url);
  await db.ref(`profiles/${currentUser.uid}/avatar`).set(url);
  setAvatarDisplay(url);
  document.getElementById('avatar-picker').style.display = 'none';
  document.querySelectorAll('.avatar-picker-item').forEach(el =>
    el.classList.toggle('selected', el.src === url));
}

// ── Édition pseudo ───────────────────────────────────────────
document.getElementById('user-pseudo-edit-btn').addEventListener('click', () => {
  const current = document.getElementById('user-pseudo-display').textContent;
  document.getElementById('user-pseudo-input').value = current;
  document.getElementById('user-pseudo-row').style.display     = 'none';
  document.getElementById('user-pseudo-editing').style.display = 'flex';
  document.getElementById('user-pseudo-input').focus();
});

async function savePseudo() {
  const input  = document.getElementById('user-pseudo-input');
  const pseudo = input.value.trim();
  if (!pseudo || !currentUser) return cancelPseudoEdit();
  await db.ref(`users/${currentUser.uid}/name`).set(pseudo);
  await db.ref(`profiles/${currentUser.uid}/name`).set(pseudo);
  await currentUser.updateProfile({ displayName: pseudo });
  document.getElementById('user-pseudo-display').textContent = pseudo;
  document.getElementById('user-initials').textContent       = pseudo[0].toUpperCase();
  cancelPseudoEdit();
}

function cancelPseudoEdit() {
  document.getElementById('user-pseudo-row').style.display     = 'flex';
  document.getElementById('user-pseudo-editing').style.display = 'none';
}

document.getElementById('user-pseudo-save').addEventListener('click', savePseudo);
document.getElementById('user-pseudo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter')  savePseudo();
  if (e.key === 'Escape') cancelPseudoEdit();
});

// ── Modal profils ─────────────────────────────────────────────
const profilesModal = document.getElementById('profiles-modal');
const AVATAR_COLORS = ['#e05555','#e07a35','#c9b830','#4caf6a','#097ee5','#7c5ce5','#e0559a'];

function avatarColor(uid) {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = (hash * 31 + uid.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function openProfilesModal() {
  userMenu.classList.remove('open');
  profilesModal.classList.add('open');
  const searchInput = document.getElementById('profiles-search');
  searchInput.value = '';
  const list = document.getElementById('profiles-grid');
  list.innerHTML = '<p style="color:#555;padding:20px 16px">Chargement…</p>';

  db.ref('profiles').once('value').then(snap => {
    const profiles = snap.val() || {};
    list.innerHTML = '';

    const entries = Object.entries(profiles).sort(([a], [b]) => {
      if (a === currentUser?.uid) return -1;
      if (b === currentUser?.uid) return 1;
      return 0;
    });

    entries.forEach(([uid, p]) => {
      const name      = p.name || '?';
      const desc      = p.description || '';
      const initial   = name[0].toUpperCase();
      const isSelf    = uid === currentUser?.uid;
      const isViewing = uid === currentViewUid;

      const accentBorder = p.accentColor ? `box-shadow:0 0 0 3px ${p.accentColor};` : '';
      const avatarHtml = p.avatar
        ? `<img class="profile-avatar" src="${p.avatar}" style="object-fit:cover;${accentBorder}" alt="${name}" />`
        : `<div class="profile-avatar" style="background:${avatarColor(uid)};${accentBorder}">${initial}</div>`;

      const row = document.createElement('div');
      row.className = 'profile-row' + (isSelf ? ' profile-row-self' : '');

      if (isSelf) {
        row.innerHTML = `
          ${avatarHtml}
          <div class="profile-info">
            <span class="profile-name">${name}</span>
            ${desc ? `<span class="profile-desc">${desc}</span>` : ''}
          </div>
          <span class="profile-self-label">Moi</span>
        `;
      } else {
        row.innerHTML = `
          ${avatarHtml}
          <div class="profile-info">
            <span class="profile-name">${name}</span>
            ${desc ? `<span class="profile-desc">${desc}</span>` : ''}
          </div>
          <button class="profile-view-btn${isViewing ? ' viewing' : ''}" data-uid="${uid}">
            ${isViewing ? 'En cours' : 'Voir sa liste'}
          </button>
        `;
      }

      list.appendChild(row);
    });

    list.querySelectorAll('.profile-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchToUser(btn.dataset.uid);
        closeProfilesModal();
      });
    });

    searchInput.oninput = () => {
      const q = searchInput.value.trim().toLowerCase();
      list.querySelectorAll('.profile-row').forEach(row => {
        const name = row.querySelector('.profile-name')?.textContent.toLowerCase() || '';
        row.style.display = (!q || name.includes(q)) ? '' : 'none';
      });
    };
  }).catch(() => {
    list.innerHTML = '<p style="color:#e05555;padding:20px 16px">Accès refusé — vérifie les règles Firebase.</p>';
  });
}

function closeProfilesModal() {
  profilesModal.classList.remove('open');
  document.getElementById('profiles-search').value = '';
}

document.getElementById('profiles-open-btn').addEventListener('click', openProfilesModal);
document.getElementById('profiles-modal-close').addEventListener('click', closeProfilesModal);
profilesModal.addEventListener('click', e => { if (e.target === profilesModal) closeProfilesModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && profilesModal.classList.contains('open')) closeProfilesModal(); });

// ── Modal édition profil ──────────────────────────────────────
const editProfileModal = document.getElementById('edit-profile-modal');
const ACCENT_COLORS = [
  '#097ee5', '#e05555', '#e07a35', '#c9b830',
  '#4caf6a', '#7c5ce5', '#e0559a', '#17b8b0'
];
let epSelectedColor  = null;
let epSelectedAvatar = null;

function applyAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color);
}

function openEditProfileModal() {
  userMenu.classList.remove('open');
  if (!currentUser) return;
  db.ref(`profiles/${currentUser.uid}`).once('value').then(snap => {
    const p = snap.val() || {};
    document.getElementById('ep-name-input').value = p.name || '';
    document.getElementById('ep-desc-input').value = p.description || '';

    epSelectedAvatar = p.avatar || null;
    epSelectedColor  = p.accentColor || ACCENT_COLORS[0];

    const preview = document.getElementById('ep-avatar-preview');
    if (p.avatar) {
      preview.innerHTML = `<img src="${p.avatar}" alt="avatar" />`;
    } else {
      const initial = (p.name || '?')[0].toUpperCase();
      preview.innerHTML = `<div class="ep-avatar-initial" style="background:${avatarColor(currentUser.uid)}">${initial}</div>`;
    }
    preview.style.borderColor = epSelectedColor;

    renderEpColorSwatches(epSelectedColor);
    renderEpAvatarPicker(p.avatar);
    document.getElementById('ep-avatar-picker').classList.add('hidden');
    editProfileModal.classList.add('open');
  });
}

function renderEpColorSwatches(selectedColor) {
  const container = document.getElementById('ep-color-swatches');
  container.innerHTML = '';
  ACCENT_COLORS.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'ep-color-swatch' + (color === selectedColor ? ' selected' : '');
    btn.style.background = color;
    btn.title = color;
    btn.addEventListener('click', () => {
      epSelectedColor = color;
      container.querySelectorAll('.ep-color-swatch').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('ep-avatar-preview').style.borderColor = color;
    });
    container.appendChild(btn);
  });
}

function renderEpAvatarPicker(currentAvatarUrl) {
  const picker = document.getElementById('ep-avatar-picker');
  const posters = [...new Set(
    [...films, ...series, ...anime].filter(i => i.poster).map(i => i.poster)
  )];
  if (!posters.length) {
    picker.innerHTML = '<p style="color:#555;font-size:12px;padding:4px 0">Aucune affiche disponible.</p>';
    return;
  }
  picker.innerHTML = '';
  posters.forEach(url => {
    const img = document.createElement('img');
    img.src       = url;
    img.className = 'ep-avatar-item' + (url === currentAvatarUrl ? ' selected' : '');
    img.addEventListener('click', () => {
      epSelectedAvatar = url;
      const preview = document.getElementById('ep-avatar-preview');
      preview.innerHTML = `<img src="${url}" alt="avatar" />`;
      picker.querySelectorAll('.ep-avatar-item').forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
    });
    picker.appendChild(img);
  });
}

async function saveEditProfile() {
  if (!currentUser) return;
  const saveBtn = document.getElementById('ep-save-btn');
  saveBtn.disabled = true;

  const name = document.getElementById('ep-name-input').value.trim();
  const desc = document.getElementById('ep-desc-input').value.trim();
  const updates = {};

  if (name) {
    updates[`users/${currentUser.uid}/name`]    = name;
    updates[`profiles/${currentUser.uid}/name`] = name;
    document.getElementById('user-pseudo-display').textContent = name;
    document.getElementById('user-initials').textContent       = name[0].toUpperCase();
    document.getElementById('user-menu-avatar-initial').textContent = name[0].toUpperCase();
    try { await currentUser.updateProfile({ displayName: name }); } catch(_) {}
  }
  updates[`users/${currentUser.uid}/description`]    = desc || null;
  updates[`profiles/${currentUser.uid}/description`] = desc || null;

  if (epSelectedAvatar) {
    updates[`users/${currentUser.uid}/avatar`]    = epSelectedAvatar;
    updates[`profiles/${currentUser.uid}/avatar`] = epSelectedAvatar;
    setAvatarDisplay(epSelectedAvatar);
  }
  if (epSelectedColor) {
    updates[`users/${currentUser.uid}/accentColor`]    = epSelectedColor;
    updates[`profiles/${currentUser.uid}/accentColor`] = epSelectedColor;
    applyAccentColor(epSelectedColor);
  }

  await db.ref().update(updates);
  saveBtn.disabled = false;
  closeEditProfileModal();
}

function closeEditProfileModal() {
  editProfileModal.classList.remove('open');
}

document.getElementById('edit-profile-btn').addEventListener('click', openEditProfileModal);
document.getElementById('edit-profile-close').addEventListener('click', closeEditProfileModal);
document.getElementById('ep-cancel-btn').addEventListener('click', closeEditProfileModal);
document.getElementById('ep-save-btn').addEventListener('click', saveEditProfile);
const _toggleEpPicker = () => document.getElementById('ep-avatar-picker').classList.toggle('hidden');
document.getElementById('ep-change-avatar-btn').addEventListener('click', _toggleEpPicker);
document.getElementById('ep-avatar-preview').addEventListener('click', _toggleEpPicker);
editProfileModal.addEventListener('click', e => { if (e.target === editProfileModal) closeEditProfileModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && editProfileModal.classList.contains('open')) closeEditProfileModal(); });

function switchToUser(uid) {
  currentViewUid   = uid;
  currentTab       = 'films';
  currentGenre     = 'Tous';
  currentStarFilter = 'all';
  document.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === 'films'));
  loadUserData(uid);
  userMenu.classList.remove('open');
  updateViewingBanner();
}

document.getElementById('back-my-list-btn').addEventListener('click', () => {
  if (!currentUser) return;
  switchToUser(currentUser.uid);
});

document.getElementById('edit-lists-link').addEventListener('click', e => {
  e.preventDefault();
  if (currentUser) openAdminPanel();
});

document.getElementById('logout-btn').addEventListener('click', async () => {
  userMenu.classList.remove('open');
  await auth.signOut();
});

function updateViewingBanner() {
  const banner = document.getElementById('viewing-banner');
  if (!banner) return;
  if (!currentUser || currentViewUid === currentUser.uid) {
    banner.style.display = 'none';
    return;
  }
  db.ref(`profiles/${currentViewUid}/name`).once('value', snap => {
    banner.querySelector('.viewing-banner-name').textContent = snap.val() || '?';
    banner.style.display = 'flex';
  });
}

// ── État d'authentification ───────────────────────────────────
auth.onAuthStateChanged(user => {
  authSubmit.disabled = false;
  if (user) {
    currentUser    = user;
    currentViewUid = user.uid;
    authScreen.classList.add('hidden');
    document.getElementById('user-menu-email').textContent = user.email || '';
    db.ref(`users/${user.uid}`).once('value', snap => {
      const d      = snap.val() || {};
      const pseudo = d.name || user.displayName || user.email || '?';
      document.getElementById('user-pseudo-display').textContent = pseudo;
      document.getElementById('user-menu-avatar-initial').textContent = pseudo[0].toUpperCase();
      document.getElementById('user-initials').textContent            = pseudo[0].toUpperCase();
      if (d.avatar) setAvatarDisplay(d.avatar);
      if (d.accentColor) applyAccentColor(d.accentColor);
    });
    loadUserData(user.uid);
    updateViewingBanner();
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname);
      setTimeout(() => openAdminPanel(), 0);
    }
  } else {
    currentUser    = null;
    currentViewUid = null;
    films = []; series = []; anime = [];
    _dataReady = false;
    authScreen.classList.remove('hidden');
    authSubmit.disabled = false;
  }
});









// ============================================================
//  LOGIQUE
// ============================================================

let currentTab = "films";
let currentGenre = "Tous";
let currentSort = localStorage.getItem("sort") ?? "alpha-asc";
let currentStarFilter = "all";

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const tabs = document.querySelectorAll(".tab");

const sortDropdown = document.getElementById("sort-dropdown");
const genreDropdown = document.getElementById("genre-dropdown");
const compactFbarBtn = document.getElementById("compact-fbar-btn");
const compactSideBtn = document.getElementById("compact-side-btn");

function setCompactLayout(compact) {
  grid.classList.toggle("compact", compact);
  compactFbarBtn.classList.toggle("active", compact);
  compactSideBtn.classList.toggle("active", compact);
  localStorage.setItem("compactLayout", compact ? "1" : "0");
}

if (localStorage.getItem("compactLayout") === "1") setCompactLayout(true);

compactFbarBtn.addEventListener("click", () => setCompactLayout(!grid.classList.contains("compact")));
compactSideBtn.addEventListener("click", () => { setCompactLayout(!grid.classList.contains("compact")); closeSideMenu(); });

const fBarToggle = document.getElementById("f-bar-toggle");
const fBarControls = document.getElementById("f-bar-controls");
const fBar = fBarToggle?.closest(".f-bar");

fBarToggle?.addEventListener("click", () => {
  const isOpen = fBarControls.classList.toggle("open");
  fBar.classList.toggle("controls-open", isOpen);
});

// ── Dropdown toggle ──
function initDropdown(dropdown) {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  toggle.addEventListener("click", e => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");
    closeAllDropdowns();
    if (!isOpen) dropdown.classList.add("open");
  });
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
  buildFilterMenu("main");
}

document.addEventListener("click", closeAllDropdowns);

initDropdown(sortDropdown);
initDropdown(genreDropdown);

const starLabels = { all: "Tous", "3": "★★★", "2": "★★", "1": "★", "0": "Non classé", "-1": "💩 Caca" };

// ── Sort dropdown items ──
sortDropdown.querySelectorAll(".dropdown-item").forEach(item => {
  if (item.dataset.value === currentSort) {
    sortDropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    sortDropdown.querySelector(".dropdown-label").textContent = item.textContent;
  }
  item.addEventListener("click", () => {
    currentSort = item.dataset.value;
    sortDropdown.querySelectorAll(".dropdown-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    sortDropdown.querySelector(".dropdown-label").textContent = item.textContent;
    localStorage.setItem("sort", currentSort);
    closeAllDropdowns();
    render();
  });
});

// ── Genre filter dropdown ──
let currentFilterData = [];

function updateGenreDropdownLabel() {
  const starPart  = currentStarFilter !== "all" ? starLabels[currentStarFilter] : null;
  const genrePart = currentGenre !== "Tous" ? currentGenre : null;
  genreDropdown.querySelector(".dropdown-label").textContent =
    [starPart, genrePart].filter(Boolean).join(" · ") || "Tous";
}

function buildFilterMenu(view) {
  const data = currentFilterData;
  const list = genreDropdown.querySelector(".dropdown-list");
  list.innerHTML = "";

  if (view === "main") {
    [
      { key: "note",  label: "Par note" },
      { key: "genre", label: "Par genre" },
    ].forEach(({ key, label }) => {
      const li = document.createElement("li");
      li.className = "dropdown-item dropdown-item-nav";
      li.innerHTML = `<span>${label}</span><span class="dropdown-nav-arrow">›</span>`;
      li.addEventListener("click", e => {
        e.stopPropagation();
        buildFilterMenu(key);
      });
      list.appendChild(li);
    });

  } else if (view === "note") {
    const back = document.createElement("li");
    back.className = "dropdown-item dropdown-item-back";
    back.innerHTML = `<span>‹ Par note</span>`;
    back.addEventListener("click", e => { e.stopPropagation(); buildFilterMenu("main"); });
    list.appendChild(back);

    const sep = document.createElement("li");
    sep.className = "dropdown-separator";
    list.appendChild(sep);

    ["all", "3", "2", "1", "0", "-1"].forEach(val => {
      const li = document.createElement("li");
      li.className = "dropdown-item" + (val === currentStarFilter ? " active" : "");
      li.dataset.stars = val;
      li.innerHTML = `<span>${starLabels[val]}</span>`;
      li.addEventListener("click", () => {
        currentStarFilter = val;
        updateGenreDropdownLabel();
        closeAllDropdowns();
        render();
      });
      list.appendChild(li);
    });

  } else if (view === "genre") {
    const back = document.createElement("li");
    back.className = "dropdown-item dropdown-item-back";
    back.innerHTML = `<span>‹ Par genre</span>`;
    back.addEventListener("click", e => { e.stopPropagation(); buildFilterMenu("main"); });
    list.appendChild(back);

    const sep = document.createElement("li");
    sep.className = "dropdown-separator";
    list.appendChild(sep);

    const genres = [...new Set(data.flatMap(item => item.genre ?? []))].sort();
    const genreCounts = {};
    data.forEach(item => (item.genre ?? []).forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; }));

    ["Tous", ...genres].forEach(genre => {
      const count = genre === "Tous" ? data.length : (genreCounts[genre] || 0);
      const li = document.createElement("li");
      li.className = "dropdown-item" + (genre === currentGenre ? " active" : "");
      li.innerHTML = `<span>${genre}</span><span class="genre-count">${count}</span>`;
      li.addEventListener("click", () => {
        currentGenre = genre;
        updateGenreDropdownLabel();
        closeAllDropdowns();
        render();
      });
      list.appendChild(li);
    });
  }
}

function buildGenreFilters(data) {
  currentFilterData = data;
  buildFilterMenu("main");
  updateGenreDropdownLabel();
}

function parseTime(t) {
  if (!t) return 0;
  const m = t.match(/(\d+)h(\d*)/);
  return m ? parseInt(m[1]) * 60 + (m[2] ? parseInt(m[2]) : 0) : 0;
}

function sortData(data) {
  return [...data].sort((a, b) => {
    if (currentSort === "alpha-asc")   return a.title.localeCompare(b.title, "fr");
    if (currentSort === "alpha-desc")  return b.title.localeCompare(a.title, "fr");
    if (currentSort === "year-desc")   return (b.year ?? 0) - (a.year ?? 0);
    if (currentSort === "year-asc")    return (a.year ?? 0) - (b.year ?? 0);
    if (currentSort === "stars-desc") {
      const diff = getStars(b.title) - getStars(a.title);
      return diff !== 0 ? diff : (b.year ?? 0) - (a.year ?? 0);
    }
    if (currentSort === "stars-asc") {
      const diff = getStars(a.title) - getStars(b.title);
      return diff !== 0 ? diff : (b.year ?? 0) - (a.year ?? 0);
    }
  });
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const raw = currentTab === "films" ? films : currentTab === "series" ? series : anime;

  let data = sortData(raw);

  if (currentGenre !== "Tous") {
    data = data.filter(item => (item.genre ?? []).includes(currentGenre));
  }

  if (currentStarFilter !== "all") {
    const sv = parseInt(currentStarFilter);
    data = data.filter(item => getStars(item.title) === sv);
  }

  if (query) {
    data = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.director ?? "").toLowerCase().includes(query) ||
      (item.cast ?? []).some(actor => actor.toLowerCase().includes(query))
    );
  }

  const countEl = document.getElementById("result-count");
  const timeEl  = document.getElementById("time-count");
  if (countEl) {
    const label = currentTab === "films" ? "film" : currentTab === "series" ? "série" : "animé";
    countEl.textContent = `${data.length} ${label}${data.length > 1 ? "s" : ""}`;
  }
  if (timeEl) {
    const totalMin = data.reduce((sum, item) => {
      if (item.episodes && item.duration) return sum + item.episodes * item.duration;
      return sum + parseTime(item.time);
    }, 0);
    const h = Math.round(totalMin / 60);
    timeEl.textContent = `Estimation : ${h}h`;
  }

  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = '<p class="empty">Aucun résultat.</p>';
    return;
  }

  data.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "card-wrapper";
    wrapper.style.animationDelay = `${index * 15}ms`;
    wrapper.addEventListener('animationend', () => {
      wrapper.style.animation = 'none';
      wrapper.style.opacity = '1';
    }, { once: true });

    const a = document.createElement("a");
    a.className = "card";
    a.href = item.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.addEventListener('click', e => {
      if (!e.ctrlKey && !e.metaKey && e.button !== 1) {
        e.preventDefault();
        openModal(item, a);
      }
    });
    if (item.bgColor)     a.style.setProperty("--card-bg",      item.bgColor);
    if (item.borderColor) a.style.setProperty("--card-border",  item.borderColor);
    if (item.accentColor) a.style.setProperty("--card-accent",  item.accentColor);

    a.innerHTML = item.poster
      ? `<img src="${item.poster}" alt="${item.title}" loading="lazy" />`
      : `<div class="card-no-poster"></div>`;

    const rating = getStars(item.title);
    if (rating !== 0) {
      const starsDiv = document.createElement('div');
      starsDiv.className = 'card-stars';
      if (rating === -1) {
        starsDiv.innerHTML = `<svg viewBox="0 0 24 24" fill="#8b5e3c" style="width:11px;height:11px"><path d="M12 2c-1.1 0-2 .9-2 2 0 .6.3 1.1.7 1.5C8.7 6.3 7.5 7.9 7.5 9.8c0 .4.1.8.2 1.2C5.9 11.8 5 13.3 5 15c0 2.8 2.2 5 5 5h8c2.8 0 5-2.2 5-5 0-1.7-.9-3.2-2.7-3.9.1-.4.2-.8.2-1.2 0-1.9-1.2-3.5-3.2-4.3.4-.4.7-.9.7-1.5 0-1.1-.9-2-2-2z"/></svg>`;
      } else {
        const starSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="3"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
        starsDiv.innerHTML = starSvg.repeat(rating);
      }
      a.appendChild(starsDiv);
    }

    const info = document.createElement("div");
    info.className = "card-info";
    info.innerHTML = `<span class="card-title">${item.title}</span>${item.year ? `<span class="card-year">${item.year}</span>` : ''}`;

    wrapper.appendChild(a);
    wrapper.appendChild(info);
    grid.appendChild(wrapper);
  });
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    currentGenre = "Tous";
    currentStarFilter = "all";
    searchInput.value = "";
    const data = currentTab === "films" ? films : currentTab === "series" ? series : anime;
    buildGenreFilters(data);
    render();
  });
});

// ── Search suggestions ──────────────────────────────────────
const suggestionList = document.createElement("ul");
suggestionList.className = "search-suggestions";
searchInput.parentElement.appendChild(suggestionList);

function buildSuggestions(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  const all = [...films, ...series, ...anime];
  const seen = new Set();
  const results = [];

  for (const item of all) {
    if (item.title.toLowerCase().includes(q) && !seen.has(item.title)) {
      seen.add(item.title);
      results.push({ text: item.title, type: "film" });
    }
  }
  for (const item of all) {
    const dir = item.director ?? "";
    if (dir && dir.toLowerCase().includes(q) && !seen.has(dir)) {
      seen.add(dir);
      results.push({ text: dir, type: "réalisateur" });
    }
  }
  for (const item of all) {
    for (const actor of (item.cast ?? [])) {
      if (actor.toLowerCase().includes(q) && !seen.has(actor)) {
        seen.add(actor);
        results.push({ text: actor, type: "acteur" });
      }
    }
  }
  return results.slice(0, 8);
}

function showSuggestions(query) {
  const items = buildSuggestions(query);
  if (!items.length) {
    suggestionList.style.display = "none";
    return;
  }
  suggestionList.innerHTML = items.map(item =>
    `<li class="suggestion-item" data-value="${item.text.replace(/"/g, "&quot;")}">
      <span>${item.text}</span>
      <span class="suggestion-type">${item.type}</span>
    </li>`
  ).join("");
  suggestionList.style.display = "block";

  suggestionList.querySelectorAll(".suggestion-item").forEach(el => {
    el.addEventListener("mousedown", e => {
      e.preventDefault();
      searchInput.value = el.dataset.value;
      suggestionList.style.display = "none";
      render();
    });
  });
}

const searchClear = document.getElementById('search-clear');

function updateSearchClear() {
  searchInput.closest('.search-bar').classList.toggle('has-value', searchInput.value.length > 0);
}

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  updateSearchClear();
  suggestionList.style.display = 'none';
  render();
  searchInput.focus();
});

searchInput.addEventListener("input", () => {
  updateSearchClear();
  showSuggestions(searchInput.value.trim());
  render();
});

searchInput.addEventListener("blur", () => {
  setTimeout(() => { suggestionList.style.display = "none"; }, 150);
});

searchInput.addEventListener("focus", () => {
  if (searchInput.value.trim()) showSuggestions(searchInput.value.trim());
});

// ── Modal ──────────────────────────────────────────────────
const modalBackdrop = document.getElementById('modal-backdrop');
const modalEl       = document.getElementById('modal-card');
const modalClose    = document.getElementById('modal-close');
let   activeWrapper = null;

function openModal(item, triggerEl) {
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-year').textContent = item.year ?? '';

  const starsEl = document.getElementById('modal-stars');
  function refreshStars(rating) {
    starsEl.querySelectorAll('.star').forEach(s => {
      const v = parseInt(s.dataset.value);
      if (v === -1) {
        s.classList.toggle('active', rating === -1);
        s.style.display = rating > 0 ? 'none' : '';
      } else {
        s.classList.toggle('active', rating > 0 && v <= rating);
      }
    });
  }
  refreshStars(getStars(item.title));
  starsEl.querySelectorAll('.star').forEach(s => {
    s.onclick = () => {
      const v = parseInt(s.dataset.value);
      const newRating = getStars(item.title) === v ? 0 : v;
      setRating(item.title, newRating);
      refreshStars(newRating);
    };
  });

  const personLink = name =>
    `<a class="modal-person" href="https://www.google.com/search?q=${encodeURIComponent(name + ' allociné')}" target="_blank" rel="noopener noreferrer">${name}</a>`;

  const dirEl = document.getElementById('modal-director');
  const castEl = document.getElementById('modal-cast');
  const seriesInfoEl = document.getElementById('modal-series-info');

  if (item.episodes) {
    dirEl.style.display = 'none';
    castEl.style.display = 'none';
    seriesInfoEl.style.display = '';
    const lines = [];
    if (item.seasons) lines.push(`${item.seasons} saison${item.seasons > 1 ? 's' : ''}`);
    lines.push(`<span class="series-info-label">Nombre total d'épisodes :</span> ${item.episodes}`);
    lines.push(`<span class="series-info-label">Durée moy. estimée des épisodes :</span> ${item.duration} min`);
    const totalH = Math.round(item.episodes * item.duration / 60);
    lines.push(`<span class="series-info-label">Durée totale estimée :</span> ${totalH}h`);
    seriesInfoEl.innerHTML = lines.join('<br>');
  } else {
    dirEl.style.display = '';
    castEl.style.display = '';
    seriesInfoEl.style.display = 'none';
    dirEl.innerHTML = item.director
      ? `Réalisateur: ${personLink(item.director)}`
      : '';
    castEl.innerHTML = item.cast && item.cast.length
      ? `Casting: ${item.cast.map(personLink).join(', ')}`
      : '';
  }

  document.getElementById('modal-link').href =
    `https://www.google.com/search?q=${encodeURIComponent(item.title + ' allociné')}`;
  document.getElementById('modal-trailer').href =
    `https://www.google.com/search?q=${encodeURIComponent(item.title + ' bande annonce youtube')}`;

  const copyBtn = document.getElementById('modal-copy-btn');
  const isGuest = currentUser && currentViewUid !== currentUser.uid;
  copyBtn.classList.toggle('hidden', !isGuest);
  if (isGuest) {
    copyBtn.textContent = 'Copier dans ma liste';
    copyBtn.classList.remove('copied');
    copyBtn.onclick = () => copyItemToMyList(item, copyBtn);
  }

  const rect = triggerEl.getBoundingClientRect();
  const gap  = 10;
  const mw   = 360;
  const mh   = rect.width * (3 / 2.5);
  const vw   = window.innerWidth;
  const vh   = window.innerHeight;

  modalEl.style.height = 'auto';
  modalEl.style.minHeight = `${mh}px`;

  if (vw <= 700) {
    modalEl.style.left      = '50%';
    modalEl.style.top       = '50%';
    modalEl.style.transform = 'translate(-50%, -50%)';
    modalEl.style.transformOrigin = 'center center';
    modalEl.style.width     = `${Math.min(mw, vw - 24)}px`;
  } else {
    modalEl.style.transform = '';
    modalEl.style.width     = `${mw}px`;

    let left, top;
    if (rect.right + gap + mw <= vw - 8) {
      left = rect.right + gap;
      modalEl.style.transformOrigin = 'left center';
    } else {
      left = Math.max(8, rect.left - mw - gap);
      modalEl.style.transformOrigin = 'right center';
    }
    top = rect.top;
    if (top + mh > vh - 8) top = Math.max(8, vh - mh - 8);
    modalEl.style.left = `${left}px`;
    modalEl.style.top  = `${top}px`;
  }

  // Élever la card cliquée au-dessus du backdrop
  activeWrapper = triggerEl.closest('.card-wrapper');
  activeWrapper.style.position = 'relative';
  activeWrapper.style.zIndex   = '595';
  triggerEl.classList.add('card--active');

  modalBackdrop.classList.add('open');
  modalEl.classList.add('open');
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalEl.classList.remove('open');
  if (activeWrapper) {
    activeWrapper.querySelector('.card')?.classList.remove('card--active');
    activeWrapper.style.position = '';
    activeWrapper.style.zIndex   = '';
    activeWrapper = null;
  }
}

async function copyItemToMyList(item, btn) {
  if (!currentUser) return;
  let arrName = 'films';
  if (series.find(i => i.title === item.title)) arrName = 'series';
  else if (anime.find(i => i.title === item.title)) arrName = 'anime';

  const snap = await db.ref(`users/${currentUser.uid}/${arrName}`).once('value');
  const existing = Object.values(snap.val() || {});
  if (existing.find(i => i.title === item.title)) {
    btn.textContent = 'Déjà dans ta liste';
    btn.classList.add('copied');
    return;
  }
  const copy = { ...item };
  delete copy.stars;
  existing.push(copy);
  await db.ref(`users/${currentUser.uid}/${arrName}`).set(existing);
  btn.textContent = '✓ Copié !';
  btn.classList.add('copied');
  btn.onclick = null;
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
window.addEventListener('scroll', closeModal, { passive: true });

// ── Top Réal. / Top Cast. ────────────────────────────────────
const topRealBtn    = document.getElementById('top-real-btn');
const topCastBtn    = document.getElementById('top-cast-btn');
const topPopup      = document.getElementById('top-popup');
const topPopupTitle = document.getElementById('top-popup-title');
const topPopupList  = document.getElementById('top-popup-list');
let   topPopupOpen  = null;

function computeTop(key, limit = 10) {
  const counts = {};
  const source = currentTab === 'films' ? films : currentTab === 'series' ? series : anime;
  for (const item of source) {
    if (key === 'director') {
      if (item.director) counts[item.director] = (counts[item.director] || 0) + 1;
    } else {
      for (const person of (item.cast ?? [])) {
        counts[person] = (counts[person] || 0) + 1;
      }
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function showTopPopup(type) {
  if (topPopupOpen === type) {
    topPopup.classList.remove('open');
    topPopupOpen = null;
    return;
  }
  const top = computeTop(type === 'real' ? 'director' : 'cast', type === 'real' ? 10 : 30);
  topPopupTitle.textContent = type === 'real' ? 'Top Réalisateurs' : 'Top Casting';
  topPopupList.innerHTML = top.map(([name, count], i) =>
    `<li class="top-popup-item">
      <span class="top-popup-rank">${i + 1}.</span>
      <span class="top-popup-name top-popup-name--link" data-search="${name.replace(/"/g, '&quot;')}">${name}</span>
      <span class="top-popup-count">${count} film${count > 1 ? 's' : ''}</span>
    </li>`
  ).join('');

  topPopupList.querySelectorAll('.top-popup-name--link').forEach(el => {
    el.addEventListener('click', () => {
      searchInput.value = el.dataset.search;
      updateSearchClear();
      topPopup.classList.remove('open');
      topPopupOpen = null;
      render();
    });
  });
  topPopup.classList.remove('open');
  void topPopup.offsetWidth;
  topPopup.classList.add('open');
  topPopupOpen = type;
}

topRealBtn.addEventListener('click', e => { e.stopPropagation(); showTopPopup('real'); });
topCastBtn.addEventListener('click', e => { e.stopPropagation(); showTopPopup('cast'); });
document.addEventListener('click', e => {
  if (!topPopup.contains(e.target)) {
    topPopup.classList.remove('open');
    topPopupOpen = null;
  }
});

// ============================================================
//  SIDE MENU MOBILE
// ============================================================

const sideMenuEl       = document.getElementById('side-menu');
const sideMenuBackdrop = document.getElementById('side-menu-backdrop');

const SORT_LABELS = {
  'alpha-asc':  'A → Z',
  'alpha-desc': 'Z → A',
  'year-desc':  'Récent',
  'year-asc':   'Ancien',
  'stars-desc': 'Mieux notés',
  'stars-asc':  'Moins notés',
};

function openSideMenu() {
  sideMenuEl.classList.add('open');
  sideMenuBackdrop.classList.add('open');
  renderSideMenu();
}

function closeSideMenu() {
  sideMenuEl.classList.remove('open');
  sideMenuBackdrop.classList.remove('open');
}

function renderSideMenu() {
  renderSideTabs();
  renderSideSort();
  renderSideGenre();
  renderSideStats();
}

function renderSideTabs() {
  const TAB_DEFS = [
    { key: 'films',  label: 'Films' },
    { key: 'series', label: 'Séries' },
    { key: 'anime',  label: 'Animés' },
  ];
  const container = document.getElementById('side-tabs');
  container.innerHTML = '';
  TAB_DEFS.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = 'side-tab-btn' + (currentTab === key ? ' active' : '');
    btn.textContent = label;
    btn.addEventListener('click', () => {
      document.querySelector(`.tab[data-tab="${key}"]`)?.click();
      closeSideMenu();
    });
    container.appendChild(btn);
  });
}

function renderSideSort() {
  const container = document.getElementById('side-sort-list');
  container.innerHTML = '';
  Object.entries(SORT_LABELS).forEach(([value, label]) => {
    const item = document.createElement('div');
    item.className = 'side-sort-item' + (currentSort === value ? ' active' : '');
    item.innerHTML = `<span>${label}</span>${currentSort === value ? '<span class="side-sort-check">✓</span>' : ''}`;
    item.addEventListener('click', () => {
      document.querySelector(`#sort-dropdown .dropdown-item[data-value="${value}"]`)?.click();
      closeSideMenu();
    });
    container.appendChild(item);
  });
}

function renderSideGenre() {
  const container = document.getElementById('side-genre-list');
  container.innerHTML = '';
  document.querySelectorAll('#genre-dropdown .dropdown-item').forEach(li => {
    const genre = li.querySelector('span')?.textContent?.trim() || '';
    if (!genre) return;
    const chip = document.createElement('div');
    chip.className = 'side-genre-chip' + (currentGenre === genre ? ' active' : '');
    chip.textContent = genre;
    chip.addEventListener('click', () => {
      li.click();
      renderSideGenre();
      renderSideStats();
    });
    container.appendChild(chip);
  });
}

function renderSideStats() {
  const container = document.getElementById('side-menu-stats');
  const countText = document.getElementById('result-count')?.textContent || '';
  const timeText  = document.getElementById('time-count')?.textContent  || '';
  container.innerHTML = `
    ${countText ? `<div class="side-stat"><span>${countText}</span></div>` : ''}
    ${timeText  ? `<div class="side-stat"><span class="side-stat-value">${timeText}</span></div>` : ''}
  `;
}

document.getElementById('menu-btn').addEventListener('click', openSideMenu);
document.getElementById('side-menu-close').addEventListener('click', closeSideMenu);
sideMenuBackdrop.addEventListener('click', closeSideMenu);


// ============================================================
//  ADMIN PANEL
// ============================================================

const TMDB_KEY = '528e49ad32fae0daa4734b34d9a758af';
const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

let adminData       = { films: [], series: [], anime: [] };
let adminTab        = 'films';
let adminEditingIdx = null;

function openAdminPanel() {
  userMenu.classList.remove('open');
  document.getElementById('admin-panel').classList.remove('hidden');
  document.querySelectorAll('.a-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'films'));
  adminTab = 'films';
  adminLoadData(currentUser.uid);
}

function closeAdminPanel() {
  document.getElementById('admin-panel').classList.add('hidden');
  document.getElementById('admin-filter').value = '';
  document.getElementById('admin-search-bar').classList.remove('has-value');
  if (currentUser) loadUserData(currentUser.uid);
}

document.getElementById('admin-back-btn').addEventListener('click', closeAdminPanel);

// ── Load / Save ───────────────────────────────────────────────
async function adminLoadData(uid) {
  const snap = await db.ref(`users/${uid}`).once('value');
  const d = snap.val() || {};
  adminData = {
    films:  Object.values(d.films  || {}),
    series: Object.values(d.series || {}),
    anime:  Object.values(d.anime  || {}),
  };
  adminRenderList();
}

async function adminSaveData() {
  const btn   = document.getElementById('admin-save-btn');
  const label = document.getElementById('admin-save-label');
  label.textContent = 'Sauvegarde…';
  btn.disabled = true;
  try {
    await db.ref(`users/${currentUser.uid}`).update({
      films:  adminData.films,
      series: adminData.series,
      anime:  adminData.anime,
    });
    label.textContent = '✓ Sauvegardé';
    setTimeout(() => { label.textContent = 'Sauvegarder'; btn.disabled = false; }, 2500);
  } catch(e) {
    alert('Erreur sauvegarde : ' + e.message);
    label.textContent = 'Sauvegarder';
    btn.disabled = false;
  }
}

document.getElementById('admin-save-btn').addEventListener('click', adminSaveData);

// ── Tabs ──────────────────────────────────────────────────────
document.querySelectorAll('.a-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.a-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    adminTab = tab.dataset.tab;
    adminRenderList();
  });
});

const adminFilterInput = document.getElementById('admin-filter');
const adminSearchBarEl = document.getElementById('admin-search-bar');
const adminFilterClear = document.getElementById('admin-filter-clear');

adminFilterInput.addEventListener('input', () => {
  adminSearchBarEl.classList.toggle('has-value', adminFilterInput.value.length > 0);
  adminRenderList();
});
adminFilterClear.addEventListener('click', () => {
  adminFilterInput.value = '';
  adminSearchBarEl.classList.remove('has-value');
  adminRenderList();
  adminFilterInput.focus();
});

// ── Render list ───────────────────────────────────────────────
function adminRenderList() {
  const items    = adminData[adminTab] || [];
  const query    = adminFilterInput.value.toLowerCase();
  const filtered = query ? items.filter(i => i.title.toLowerCase().includes(query)) : items;
  const list     = document.getElementById('entry-list');
  list.innerHTML = '';

  const label = { films: 'film', series: 'série', anime: 'animé' }[adminTab];
  const countEl = document.getElementById('admin-count-label');
  countEl.textContent = query
    ? `${filtered.length} / ${items.length} ${label}${items.length > 1 ? 's' : ''}`
    : `${items.length} ${label}${items.length > 1 ? 's' : ''}`;

  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">Aucune entrée</div>';
    return;
  }

  filtered.forEach(item => {
    const realIdx = items.indexOf(item);
    const el = document.createElement('div');
    el.className = 'entry-item';

    const meta = [
      item.year,
      item.time,
      item.seasons  ? item.seasons + ' saison' + (item.seasons > 1 ? 's' : '') : null,
      item.episodes ? item.episodes + ' ép.' : null,
    ].filter(Boolean).join(' · ');

    el.innerHTML = `
      ${item.poster
        ? `<img class="entry-poster" src="${item.poster}" alt="" onerror="this.outerHTML='<div class=\\'entry-poster-placeholder\\'></div>'" />`
        : `<div class="entry-poster-placeholder"></div>`}
      <div class="entry-info">
        <span class="entry-title">${item.title}</span>
        <span class="entry-meta">${meta}</span>
      </div>
      <div class="entry-actions">
        <button class="btn-ghost btn-sm btn-edit" data-idx="${realIdx}">Éditer</button>
        <button class="btn-danger btn-sm btn-del"  data-idx="${realIdx}">✕</button>
      </div>
    `;
    list.appendChild(el);
  });

  list.querySelectorAll('.btn-edit').forEach(btn =>
    btn.addEventListener('click', () => openAdminModal(parseInt(btn.dataset.idx))));
  list.querySelectorAll('.btn-del').forEach(btn =>
    btn.addEventListener('click', () => adminDeleteEntry(parseInt(btn.dataset.idx))));
}

// ── Delete ────────────────────────────────────────────────────
function adminDeleteEntry(idx) {
  const modal = document.getElementById('confirm-modal');
  document.getElementById('confirm-modal-title').textContent = adminData[adminTab][idx].title;
  modal.classList.remove('hidden');

  const onOk = () => {
    adminData[adminTab].splice(idx, 1);
    adminRenderList();
    adminSaveData();
    cleanup();
  };
  const onCancel = cleanup;

  function cleanup() {
    modal.classList.add('hidden');
    document.getElementById('confirm-ok').removeEventListener('click', onOk);
    document.getElementById('confirm-cancel').removeEventListener('click', onCancel);
  }

  document.getElementById('confirm-ok').addEventListener('click', onOk);
  document.getElementById('confirm-cancel').addEventListener('click', onCancel);
}

// ── Add / Edit modal ──────────────────────────────────────────
function openAdminModal(idx = null) {
  adminEditingIdx  = idx;
  const isFilm     = adminTab === 'films';

  document.getElementById('film-fields').classList.toggle('hidden', !isFilm);
  document.getElementById('series-fields').classList.toggle('hidden', isFilm);
  document.getElementById('tmdb-section').classList.toggle('hidden', idx !== null);
  document.getElementById('modal-title-label').textContent = idx === null ? 'Ajouter' : 'Éditer';
  document.getElementById('form-submit').textContent       = idx === null ? 'Ajouter' : 'Mettre à jour';

  if (idx !== null) {
    const item = adminData[adminTab][idx];
    document.getElementById('f-title').value   = item.title   || '';
    document.getElementById('f-year').value    = item.year    || '';
    document.getElementById('f-genre').value   = (item.genre  || []).join(', ');
    document.getElementById('f-poster').value  = item.poster  || '';
    adminUpdatePosterPreview(item.poster);
    if (isFilm) {
      document.getElementById('f-director').value = item.director || '';
      document.getElementById('f-cast').value     = (item.cast || []).join(', ');
      document.getElementById('f-time').value     = item.time || '';
    } else {
      document.getElementById('f-seasons').value  = item.seasons  || '';
      document.getElementById('f-episodes').value = item.episodes || '';
      document.getElementById('f-duration').value = item.duration || '';
    }
  } else {
    document.getElementById('entry-form').reset();
    document.getElementById('tmdb-results').innerHTML = '';
    document.getElementById('tmdb-query').value       = '';
    document.getElementById('poster-preview').classList.add('hidden');
  }

  document.getElementById('entry-modal').classList.remove('hidden');
  setTimeout(() => {
    const first = idx === null ? document.getElementById('tmdb-query') : document.getElementById('f-title');
    first.focus();
  }, 50);
}

function closeAdminModal() {
  document.getElementById('entry-modal').classList.add('hidden');
  document.getElementById('entry-dup-error').classList.add('hidden');
}

document.getElementById('admin-add-btn').addEventListener('click',        () => openAdminModal(null));
document.getElementById('admin-modal-close-btn').addEventListener('click', closeAdminModal);
document.getElementById('form-cancel').addEventListener('click',           closeAdminModal);

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const panel = document.getElementById('admin-panel');
  if (panel.classList.contains('hidden')) return;
  if (!document.getElementById('entry-modal').classList.contains('hidden')) {
    closeAdminModal();
  } else if (!document.getElementById('confirm-modal').classList.contains('hidden')) {
    document.getElementById('confirm-modal').classList.add('hidden');
  } else {
    closeAdminPanel();
  }
});

// ── Form submit ───────────────────────────────────────────────
document.getElementById('entry-form').addEventListener('submit', e => {
  e.preventDefault();
  const isFilm = adminTab === 'films';

  const entry = {
    title:  document.getElementById('f-title').value.trim(),
    genre:  document.getElementById('f-genre').value.split(',').map(g => g.trim()).filter(Boolean),
    poster: document.getElementById('f-poster').value.trim(),
    url:    '#',
    year:   parseInt(document.getElementById('f-year').value) || null,
  };

  if (isFilm) {
    entry.director = document.getElementById('f-director').value.trim();
    entry.cast     = document.getElementById('f-cast').value.split(',').map(c => c.trim()).filter(Boolean);
    entry.time     = document.getElementById('f-time').value.trim();
  } else {
    entry.seasons  = parseInt(document.getElementById('f-seasons').value)  || null;
    entry.episodes = parseInt(document.getElementById('f-episodes').value) || null;
    entry.duration = parseInt(document.getElementById('f-duration').value) || null;
  }

  if (adminEditingIdx !== null) {
    const existing = adminData[adminTab][adminEditingIdx];
    if (existing.stars) entry.stars = existing.stars;
    adminData[adminTab][adminEditingIdx] = entry;
  } else {
    const titleLow = entry.title.toLowerCase();
    const isDup = adminData[adminTab].some(item => item.title.toLowerCase() === titleLow);
    if (isDup) {
      document.getElementById('entry-dup-error').classList.remove('hidden');
      return;
    }
    adminData[adminTab].push(entry);
  }

  closeAdminModal();
  adminRenderList();
});

// ── Poster preview ────────────────────────────────────────────
document.getElementById('f-poster').addEventListener('input', e => adminUpdatePosterPreview(e.target.value));
document.getElementById('f-title').addEventListener('input', () => document.getElementById('entry-dup-error').classList.add('hidden'));

function adminUpdatePosterPreview(url) {
  const img = document.getElementById('poster-preview');
  if (url) { img.src = url; img.classList.remove('hidden'); }
  else     { img.classList.add('hidden'); }
}

// ── TMDB ──────────────────────────────────────────────────────
async function adminTmdbFetch(endpoint) {
  const sep = endpoint.includes('?') ? '&' : '?';
  const res = await fetch(`https://api.themoviedb.org/3${endpoint}${sep}api_key=${TMDB_KEY}&language=fr-FR`);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  return res.json();
}

document.getElementById('tmdb-search-btn').addEventListener('click', adminTmdbSearch);
document.getElementById('tmdb-query').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); adminTmdbSearch(); }
});

async function adminTmdbSearch() {
  const query     = document.getElementById('tmdb-query').value.trim();
  const resultsEl = document.getElementById('tmdb-results');
  if (!query) return;

  resultsEl.innerHTML = '<p class="tmdb-msg">Recherche…</p>';
  try {
    const isFilm   = adminTab === 'films';
    const endpoint = isFilm
      ? `/search/movie?query=${encodeURIComponent(query)}`
      : `/search/tv?query=${encodeURIComponent(query)}`;
    const json     = await adminTmdbFetch(endpoint);
    const results  = (json.results || []).slice(0, 8).map(r => ({
      id:     r.id,
      title:  isFilm ? r.title : r.name,
      year:   isFilm ? r.release_date?.slice(0, 4) : r.first_air_date?.slice(0, 4),
      poster: r.poster_path ? TMDB_IMG + r.poster_path : null,
      type:   isFilm ? 'movie' : 'tv',
    }));

    if (!results.length) { resultsEl.innerHTML = '<p class="tmdb-msg">Aucun résultat.</p>'; return; }

    resultsEl.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'tmdb-results-grid';
    results.forEach(r => {
      const card = document.createElement('div');
      card.className = 'tmdb-card';
      card.innerHTML = `
        <img src="${r.poster || ''}" alt="" onerror="this.style.background='#222';this.src=''" />
        <div class="tmdb-card-info">
          <p class="tmdb-card-title">${r.title}</p>
          <p class="tmdb-card-year">${r.year || ''}</p>
        </div>
      `;
      card.addEventListener('click', () => adminTmdbAutoFill(r.id, r.type));
      grid.appendChild(card);
    });
    resultsEl.appendChild(grid);
  } catch(e) {
    resultsEl.innerHTML = '<p class="tmdb-msg">Erreur de recherche.</p>';
  }
}

async function adminTmdbAutoFill(id, type) {
  const resultsEl = document.getElementById('tmdb-results');
  resultsEl.innerHTML = '<p class="tmdb-msg">Chargement…</p>';
  try {
    const details = await adminTmdbFetch(`/${type}/${id}?append_to_response=credits`);

    if (type === 'movie') {
      document.getElementById('f-title').value  = details.title || '';
      document.getElementById('f-year').value   = details.release_date?.slice(0, 4) || '';
      document.getElementById('f-poster').value = details.poster_path ? TMDB_IMG + details.poster_path : '';
      if (details.runtime) {
        const h = Math.floor(details.runtime / 60);
        const m = details.runtime % 60;
        document.getElementById('f-time').value = m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
      }
      const director = details.credits?.crew?.find(c => c.job === 'Director');
      document.getElementById('f-director').value = director?.name || '';
      const cast = (details.credits?.cast || []).slice(0, 8).map(c => c.name);
      document.getElementById('f-cast').value = cast.join(', ');
    } else {
      document.getElementById('f-title').value    = details.name || '';
      document.getElementById('f-year').value     = details.first_air_date?.slice(0, 4) || '';
      document.getElementById('f-poster').value   = details.poster_path ? TMDB_IMG + details.poster_path : '';
      document.getElementById('f-seasons').value  = details.number_of_seasons  || '';
      document.getElementById('f-episodes').value = details.number_of_episodes || '';
      document.getElementById('f-duration').value = details.episode_run_time?.[0] || '';
    }

    const genres = (details.genres || []).slice(0, 2).map(g => adminTranslateGenre(g.name));
    document.getElementById('f-genre').value = genres.join(', ');
    adminUpdatePosterPreview(document.getElementById('f-poster').value);
    resultsEl.innerHTML = '<p class="tmdb-msg tmdb-success">✓ Données importées — vérifie et complète les champs.</p>';
  } catch(e) {
    resultsEl.innerHTML = '<p class="tmdb-msg">Erreur lors du chargement.</p>';
  }
}

const ADMIN_GENRE_MAP = {
  'Action':'Action','Adventure':'Aventure','Animation':'Animation','Comedy':'Comédie',
  'Crime':'Policier','Documentary':'Documentaire','Drama':'Drame','Family':'Famille',
  'Fantasy':'Fantasy','History':'Histoire','Horror':'Horreur','Music':'Musique',
  'Mystery':'Mystère','Romance':'Romance','Science Fiction':'Science-Fiction',
  'Thriller':'Thriller','War':'Guerre','Western':'Western',
  'Sci-Fi & Fantasy':'Science-Fiction','Action & Adventure':'Action',
  'Kids':'Jeunesse','Reality':'Réalité','War & Politics':'Politique',
};
function adminTranslateGenre(name) { return ADMIN_GENRE_MAP[name] || name; }

