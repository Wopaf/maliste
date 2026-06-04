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
}, 800);

firebase.initializeApp(FIREBASE_CONFIG);
const db   = firebase.database();
const auth = firebase.auth();

let currentUser     = null;
let currentViewUid  = null;
let currentViewName = '';

let films     = [];
let series    = [];
let anime     = [];
let watchlist = [];
let recommendations = { films: [null, null, null], series: [null, null, null] };
let _dataReady = false;

let currentRenderData = [];
let gridPage = 1;
let gridColCount = 4;
const GRID_ROWS_PER_PAGE = 6;

const homePage = document.getElementById('home-page');
const mainApp  = document.getElementById('main-app');

function _tryRender() {
  if (_dataReady && typeof render === 'function' && !mainApp.classList.contains('hidden')) render();
}

function sanitizeKey(title) {
  return title.replace(/[.#$\/\[\]]/g, '_');
}

function getStars(title) {
  const item = [...films, ...series, ...anime, ...watchlist].find(i => i.title === title);
  return item?.stars || 0;
}

function refreshViews() {
  if (!mainApp.classList.contains('hidden'))  render();
  if (!homePage.classList.contains('hidden')) populateHomePage();
}

function findItemAndList(title) {
  let item = films.find(i => i.title === title);
  if (item) return { item, arr: films, arrName: 'films' };
  item = series.find(i => i.title === title);
  if (item) return { item, arr: series, arrName: 'series' };
  item = anime.find(i => i.title === title);
  if (item) return { item, arr: anime, arrName: 'anime' };
  return null;
}

function getNote(title) {
  return findItemAndList(title)?.item?.note || '';
}

async function setNote(title, note) {
  if (!currentUser || currentViewUid !== currentUser.uid) return;
  const found = findItemAndList(title);
  if (!found) return;
  const { item, arr, arrName } = found;
  if (note.trim()) item.note = note.trim();
  else delete item.note;
  await db.ref(`users/${currentUser.uid}/${arrName}`).set(arr);
}

// ── Note modal ────────────────────────────────────────────────
let _noteTitleTarget = '';

function updateModalNoteDisplay(title) {
  const note        = getNote(title);
  const noteBtn     = document.getElementById('modal-note-btn');
  const noteExisting = document.getElementById('modal-note-existing');
  const noteDisplay = document.getElementById('modal-note-display');
  if (!noteBtn || !noteExisting || !noteDisplay) return;
  if (note) {
    noteBtn.classList.add('hidden');
    noteDisplay.textContent = note;
    noteExisting.classList.remove('hidden');
  } else {
    noteBtn.classList.remove('hidden');
    noteExisting.classList.add('hidden');
  }
}

function openNoteModal(title) {
  _noteTitleTarget = title;
  const textarea = document.getElementById('note-modal-textarea');
  const count    = document.getElementById('note-modal-count');
  textarea.value = getNote(title);
  count.textContent = `${textarea.value.length} / 200`;
  document.getElementById('note-modal').classList.remove('hidden');
  textarea.focus();
}

function openNoteReadModal(title, note) {
  document.getElementById('note-read-title').textContent = title;
  document.getElementById('note-read-body').textContent = note;
  const modal = document.getElementById('note-read-modal');
  modal.classList.remove('hidden', 'closing');
}
function closeNoteReadModal() {
  const modal = document.getElementById('note-read-modal');
  modal.classList.add('closing');
  modal.addEventListener('animationend', () => {
    modal.classList.add('hidden');
    modal.classList.remove('closing');
  }, { once: true });
}
document.getElementById('note-read-close').addEventListener('click', closeNoteReadModal);
document.getElementById('note-read-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('note-read-modal')) closeNoteReadModal();
});

document.getElementById('note-modal-close').addEventListener('click', () => {
  document.getElementById('note-modal').classList.add('hidden');
});
document.getElementById('note-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('note-modal'))
    document.getElementById('note-modal').classList.add('hidden');
});
document.getElementById('note-modal-textarea').addEventListener('input', e => {
  document.getElementById('note-modal-count').textContent = `${e.target.value.length} / 200`;
});
document.getElementById('note-modal-save').addEventListener('click', async () => {
  const note = document.getElementById('note-modal-textarea').value;
  await setNote(_noteTitleTarget, note);
  document.getElementById('note-modal').classList.add('hidden');
  updateModalNoteDisplay(_noteTitleTarget);
});

function setRating(title, stars) {
  if (!currentUser || currentViewUid !== currentUser.uid) return;
  const found = findItemAndList(title);
  if (!found) return;
  const { item, arr, arrName } = found;
  if (stars === 0) delete item.stars;
  else item.stars = stars;
  db.ref(`users/${currentUser.uid}/${arrName}`).set(arr);
  refreshViews();
}

let currentRecFilm   = null;
let currentRecSeries = null;

// ── Emojis ───────────────────────────────────────────────────
const EMOJI_CATEGORIES = [
  { label: 'Joie', emojis: [
    'Slightly smiling face', 'Smiling face with smiling eyes',
    'Smiling face with tear', 'Face holding back tears',
  ]},
  { label: 'Rire', emojis: [
    'Grinning face', 'Grinning squinting face', 'Rolling on the floor laughing', 'Zany face',
  ]},
  { label: 'Amour', emojis: [
    'Smiling face with heart-eyes', 'Smiling face with hearts',
    'Star-struck', 'Smiling face with open hands',
  ]},
  { label: 'Choc', emojis: [
    'Exploding head', 'Flushed face',
    'Face with open eyes and hand over mouth', 'Face with open mouth',
  ]},
  { label: 'Tristesse', emojis: [
    'Pleading face', 'Disappointed face', 'Sad but relieved face',
    'Loudly crying face',
  ]},
  { label: 'Ennui', emojis: [
    'Expressionless face', 'Yawning face',
    'Unamused face', 'Face with rolling eyes',
  ]},
  { label: 'Dégoût', emojis: [
    'Face vomiting', 'Pile of poo',
  ]},
  { label: 'Colère', emojis: [
    'Face with steam from nose', 'Pouting face', 'Face with symbols on mouth',
    'Face with raised eyebrow',
  ]},
  { label: 'Plus', emojis: [
    'Hot face', 'Face with peeking eye', 'Thinking face',
  ]},
];

let _emojiPickerTitle = '';
let _emojiPickerSelected = [];

function getEmojis(title) {
  const item = [...films, ...series, ...anime].find(i => i.title === title);
  return item?.emojis || [];
}

function openEmojiPicker(title) {
  _emojiPickerTitle    = title;
  _emojiPickerSelected = [...getEmojis(title)];
  renderEmojiPicker();
  document.getElementById('emoji-picker-modal').classList.remove('hidden');
}

function renderEmojiPicker() {
  const body      = document.getElementById('emoji-picker-body');
  const selEl     = document.getElementById('emoji-picker-selection');
  const hintEl    = document.getElementById('emoji-picker-hint');
  const remaining = 3 - _emojiPickerSelected.length;
  hintEl.textContent = remaining > 0
    ? `Choisis jusqu'à ${remaining} emoji${remaining > 1 ? 's' : ''} de plus`
    : 'Maximum atteint (3)';

  body.innerHTML = '';
  EMOJI_CATEGORIES.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'emoji-cat-section';
    const label = document.createElement('p');
    label.className = 'emoji-cat-label';
    label.textContent = cat.label;
    section.appendChild(label);
    const grid = document.createElement('div');
    grid.className = 'emoji-cat-grid';
    cat.emojis.forEach(name => {
      const btn = document.createElement('button');
      btn.className = 'emoji-item' + (_emojiPickerSelected.includes(name) ? ' selected' : '');
      btn.innerHTML = `<img src="medias/${name}.png" alt="${name}" title="${name}" />`;
      btn.addEventListener('click', () => {
        if (_emojiPickerSelected.includes(name)) {
          _emojiPickerSelected = _emojiPickerSelected.filter(e => e !== name);
        } else if (_emojiPickerSelected.length < 3) {
          _emojiPickerSelected.push(name);
        }
        renderEmojiPicker();
      });
      grid.appendChild(btn);
    });
    section.appendChild(grid);
    body.appendChild(section);
  });

  selEl.innerHTML = '';
  _emojiPickerSelected.forEach(name => {
    const img = document.createElement('img');
    img.src = `medias/${name}.png`;
    img.alt = name;
    img.className = 'emoji-selected-item';
    selEl.appendChild(img);
  });
}

async function saveEmojis() {
  if (!currentUser || currentViewUid !== currentUser.uid) return;
  const title = _emojiPickerTitle;
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
  if (_emojiPickerSelected.length) item.emojis = [..._emojiPickerSelected];
  else delete item.emojis;
  await db.ref(`users/${currentUser.uid}/${arrName}`).set(arr);
  updateModalEmojiDisplay(title);
  refreshViews();
}

function updateModalEmojiDisplay(title) {
  const emojis = getEmojis(title);
  const selEl  = document.getElementById('modal-emoji-selected');
  const btnEl  = document.getElementById('modal-emoji-btn');
  if (!selEl || !btnEl) return;
  selEl.innerHTML = '';
  emojis.forEach(name => {
    const img = document.createElement('img');
    img.src = `medias/${name}.png`;
    img.alt = name;
    img.className = 'modal-emoji-chip';
    selEl.appendChild(img);
  });
  if (emojis.length) {
    btnEl.style.display = 'none';
    selEl.style.cursor = 'pointer';
    selEl.onclick = () => openEmojiPicker(title);
  } else {
    btnEl.style.display = '';
    selEl.style.cursor = '';
    selEl.onclick = null;
  }
}

document.getElementById('emoji-picker-close').addEventListener('click', () => {
  document.getElementById('emoji-picker-modal').classList.add('hidden');
});
document.getElementById('emoji-picker-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('emoji-picker-modal'))
    document.getElementById('emoji-picker-modal').classList.add('hidden');
});
document.getElementById('emoji-picker-save').addEventListener('click', async () => {
  await saveEmojis();
  document.getElementById('emoji-picker-modal').classList.add('hidden');
});

function loadUserData(uid) {
  _dataReady = false;
  films = []; series = []; anime = [];
  db.ref(`users/${uid}`).once('value', snap => {
    const d = snap.val() || {};
    films          = Object.values(d.films     || {});
    series         = Object.values(d.series    || {});
    anime          = Object.values(d.anime     || {});
    watchlist      = Object.values(d.watchlist || {});
    const rec = d.recommendations || {};
    const toSlots = (arr) => { const a = Array.isArray(arr) ? arr : Object.values(arr || {}); return [...a, null, null, null].slice(0, 3); };
    recommendations = { films: toSlots(rec.films), series: toSlots(rec.series) };
    currentRecFilm   = d.recommendationFilm   || null;
    currentRecSeries = d.recommendationSeries || null;
    currentViewName  = d.name || '';
    _dataReady = true;
    loadDisplayPrefs(uid);
    buildGenreFilters(currentTab === 'films' ? films : currentTab === 'watchlist' ? watchlist : [...series, ...anime]);
    renderRecommendation();
    if (!homePage.classList.contains('hidden')) populateHomePage();
    _tryRender();
  });
}

async function setRecommendation(title, type) {
  if (!currentUser || currentViewUid !== currentUser.uid) return;
  if (type === 'film') {
    const newVal = currentRecFilm === title ? null : title;
    await db.ref(`users/${currentUser.uid}/recommendationFilm`).set(newVal);
    currentRecFilm = newVal;
  } else {
    const newVal = currentRecSeries === title ? null : title;
    await db.ref(`users/${currentUser.uid}/recommendationSeries`).set(newVal);
    currentRecSeries = newVal;
  }
  renderRecommendation();
  updateModalRecommendBtn(title);
}

function renderRecommendation() {
  const wrap    = document.getElementById('rec-card-wrap');
  const section = wrap?.closest('.rec-section');
  if (!wrap) return;
  wrap.innerHTML = '';

  const isOwn   = currentUser && currentViewUid === currentUser.uid;
  const isFilms = currentTab === 'films';
  const isWatchlist = currentTab === 'watchlist';
  if (isWatchlist) { if (section) section.style.display = 'none'; return; }
  const currentRec = isFilms ? currentRecFilm : currentRecSeries;
  const typeLabel  = isFilms ? 'film' : 'série';

  if (!currentRec) {
    if (section) section.style.display = isOwn ? '' : 'none';
    if (!isOwn) return;
    wrap.innerHTML = `
      <div class="rec-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28" opacity="0.3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        <p>Aucun coup de cœur pour le moment</p>
        <span>Ouvre une fiche ${typeLabel} et clique sur "Mettre en recommandation"</span>
      </div>`;
    return;
  }

  if (section) section.style.display = '';

  const item = [...films, ...series, ...anime].find(i => i.title === currentRec);
  if (!item) return;

  const card = document.createElement('div');
  card.className = 'rec-card';
  card.addEventListener('click', () => openModal(item, card));

  if (item.poster) {
    const bg = document.createElement('div');
    bg.className = 'rec-card-bg';
    bg.style.backgroundImage = `url(${item.poster})`;
    card.appendChild(bg);

    const poster = document.createElement('img');
    poster.className = 'rec-card-poster';
    poster.src = item.poster; poster.alt = item.title;
    card.appendChild(poster);
  }

  const info = document.createElement('div');
  info.className = 'rec-card-info';

  const titleEl = document.createElement('p');
  titleEl.className = 'rec-card-title';
  titleEl.textContent = item.title;
  info.appendChild(titleEl);

  if (item.year) {
    const yearEl = document.createElement('p');
    yearEl.className = 'rec-card-meta';
    yearEl.textContent = item.year + (item.director ? ' · ' + item.director : '');
    info.appendChild(yearEl);
  }

  const stars = getStars(item.title);
  if (stars) {
    const starsEl = document.createElement('p');
    starsEl.className = 'rec-card-stars';
    starsEl.textContent = '★ ' + stars + ' / 10';
    info.appendChild(starsEl);
  }

  card.appendChild(info);
  wrap.appendChild(card);
}

function updateModalRecommendBtn(itemTitle) {
  const btn = document.getElementById('modal-recommend-btn');
  if (!btn) return;
  const isOwn = currentUser && currentViewUid === currentUser.uid;
  btn.style.display = (isOwn && currentTab !== 'watchlist') ? '' : 'none';
  if (!isOwn || currentTab === 'watchlist') return;
  const type   = films.some(f => f.title === itemTitle) ? 'film' : 'series';
  const curRec = type === 'film' ? currentRecFilm : currentRecSeries;
  const isRec  = curRec === itemTitle;
  btn.textContent = isRec ? '✓ En recommandation' : '❤ Mettre en recommandation';
  btn.classList.toggle('active', isRec);
  btn.onclick = () => setRecommendation(itemTitle, type);
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
      await db.ref(`profiles/${cred.user.uid}`).set({
        name:        pseudo,
        accentColor: '#097ee5',
        avatar:      'medias/pp.jpg',
      });
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
const userBtn      = document.getElementById('user-btn');
const homeUserBtn  = document.getElementById('home-user-btn');
const userMenu     = document.getElementById('user-menu');
const backHomeBtn  = document.getElementById('back-home-btn');

backHomeBtn.addEventListener('click', () => { if (searchInput.value) searchClear.click(); showHomePage(); });

function toggleUserMenu(anchor, e) {
  e.stopPropagation();
  if (userMenu.classList.contains('open')) {
    userMenu.classList.remove('open');
    return;
  }
  const rect  = anchor.getBoundingClientRect();
  const menuW = 220;
  const top   = rect.bottom + 8;
  let   left  = rect.left + rect.width / 2 - menuW / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - menuW - 12));
  userMenu.style.top   = top  + 'px';
  userMenu.style.left  = left + 'px';
  userMenu.style.right = 'auto';
  userMenu.classList.add('open');
}

userBtn.addEventListener    ('click', e => toggleUserMenu(userBtn,     e));
homeUserBtn.addEventListener('click', e => {
  if (currentViewUid !== currentUser?.uid) return;
  toggleUserMenu(homeUserBtn, e);
});

document.addEventListener('click', () => userMenu.classList.remove('open'));
userMenu.addEventListener('click', e => e.stopPropagation());

// ── Avatar ───────────────────────────────────────────────────
function setHomeHeaderBg(url) {
  const bg = document.getElementById('home-header-bg');
  if (url) { bg.src = url; bg.style.display = 'block'; }
  else bg.style.display = 'none';
}

function setAvatarDisplay(url) {
  const btnAvatar = document.getElementById('user-btn-avatar');
  const initials  = document.getElementById('user-initials');
  btnAvatar.src           = url;
  btnAvatar.style.display = 'block';
  initials.style.display  = 'none';

  const homeAvatar   = document.getElementById('home-user-avatar');
  const homeInitials = document.getElementById('home-user-initials');
  homeAvatar.src           = url;
  homeAvatar.style.display = 'block';
  homeInitials.style.display = 'none';

  setHomeHeaderBg(url);

  const menuImg     = document.getElementById('user-menu-avatar-img');
  const menuInitial = document.getElementById('user-menu-avatar-initial');
  menuImg.src             = url;
  menuImg.style.display   = 'block';
  menuInitial.style.display = 'none';
}

function clearAvatarDisplay() {
  document.getElementById('user-btn-avatar').style.display    = 'none';
  document.getElementById('user-initials').style.display      = '';
  document.getElementById('home-user-avatar').style.display   = 'none';
  document.getElementById('home-user-initials').style.display = '';
  setHomeHeaderBg(null);
  document.getElementById('user-menu-avatar-img').style.display     = 'none';
  document.getElementById('user-menu-avatar-initial').style.display = '';
}


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
            ${isViewing ? 'En cours' : 'Voir son profil'}
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
let epSelectedCover  = null;

function applyAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color);
}

// ── Image picker modal ───────────────────────────────────────
let _imgPickerMode = null; // 'avatar' | 'cover'
let _imgPickerSelected = null;

function openImgPicker(mode) {
  _imgPickerMode = mode;
  _imgPickerSelected = mode === 'cover' ? epSelectedCover : epSelectedAvatar;

  const modal = document.getElementById('img-picker-modal');
  const grid  = document.getElementById('img-picker-grid');
  const title = document.getElementById('img-picker-title');
  const search = document.getElementById('img-picker-search');

  title.textContent = mode === 'cover' ? 'Image de couverture' : 'Photo de profil';
  search.value = '';
  grid.className = 'img-picker-grid ' + (mode === 'cover' ? 'grid-cover' : 'grid-avatar');
  modal.classList.remove('hidden');
  renderImgPickerGrid('');
  search.focus();
}

const IMG_PICKER_PAGE = 10;

function renderImgPickerGrid(query, visibleCount = IMG_PICKER_PAGE) {
  const grid = document.getElementById('img-picker-grid');
  const q = query.toLowerCase();
  grid.innerHTML = '';

  let items;
  if (_imgPickerMode === 'cover') {
    const seen = new Set();
    items = [...films, ...series, ...anime].filter(i => i.backdrop && !seen.has(i.backdrop) && seen.add(i.backdrop))
      .filter(i => !q || i.title?.toLowerCase().includes(q))
      .map(i => ({ url: i.backdrop, label: i.title, ratio: '16/9' }));
  } else {
    const seen = new Set();
    items = [...films, ...series, ...anime].filter(i => i.poster && !seen.has(i.poster) && seen.add(i.poster))
      .filter(i => !q || i.title?.toLowerCase().includes(q))
      .map(i => ({ url: i.poster, label: i.title, ratio: '2/3' }));
  }

  if (!items.length) {
    grid.innerHTML = '<p style="font-size:12px;color:#555;grid-column:1/-1;padding:12px 0">Aucun résultat.</p>';
    return;
  }

  items.slice(0, visibleCount).forEach(({ url, label, ratio }) => {
    const btn = document.createElement('button');
    btn.className = 'ep-cover-item' + (url === _imgPickerSelected ? ' selected' : '');
    btn.style.aspectRatio = ratio;
    btn.title = label || '';
    btn.innerHTML = `<img src="${url}" alt="${label || ''}" loading="lazy" />`;
    btn.addEventListener('click', () => {
      _imgPickerSelected = url;
      grid.querySelectorAll('.ep-cover-item').forEach(el => el.classList.remove('selected'));
      btn.classList.add('selected');
    });
    grid.appendChild(btn);
  });

  if (items.length > visibleCount) {
    const more = document.createElement('button');
    more.className = 'admin-list-more-btn';
    more.style.gridColumn = '1 / -1';
    more.textContent = `Voir ${Math.min(IMG_PICKER_PAGE, items.length - visibleCount)} de plus`;
    more.addEventListener('click', () => renderImgPickerGrid(query, visibleCount + IMG_PICKER_PAGE));
    grid.appendChild(more);
  }
}

function closeImgPicker() {
  document.getElementById('img-picker-modal').classList.add('hidden');
  _imgPickerMode = null;
}

document.getElementById('img-picker-search').addEventListener('input', e => {
  renderImgPickerGrid(e.target.value.trim(), IMG_PICKER_PAGE);
});
document.getElementById('img-picker-close').addEventListener('click', closeImgPicker);
document.getElementById('img-picker-cancel').addEventListener('click', closeImgPicker);
document.getElementById('img-picker-confirm').addEventListener('click', () => {
  if (_imgPickerMode === 'cover') {
    epSelectedCover = _imgPickerSelected;
    const coverImg = document.getElementById('ep-cover-img');
    if (coverImg) coverImg.src = epSelectedCover || '';
  } else {
    epSelectedAvatar = _imgPickerSelected;
    const preview = document.getElementById('ep-avatar-preview');
    if (epSelectedAvatar) {
      preview.innerHTML = `<img src="${epSelectedAvatar}" alt="avatar" />`;
    }
  }
  closeImgPicker();
});

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

    epSelectedCover = p.coverImage || null;
    const coverImg = document.getElementById('ep-cover-img');
    if (coverImg) coverImg.src = epSelectedCover || '';
    renderEpColorSwatches(epSelectedColor);
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
    document.getElementById('user-initials').textContent            = name[0].toUpperCase();
    document.getElementById('home-user-initials').textContent       = name[0].toUpperCase();
    document.getElementById('user-menu-avatar-initial').textContent = name[0].toUpperCase();
    document.getElementById('home-app-title').textContent           = name;
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
  if (epSelectedCover !== undefined) {
    updates[`profiles/${currentUser.uid}/coverImage`] = epSelectedCover || null;
  }

  await db.ref().update(updates);
  saveBtn.disabled = false;

  const coverImg = document.getElementById('home-header-bg');
  if (coverImg && epSelectedCover) {
    coverImg.src = epSelectedCover;
    coverImg.style.display = 'block';
  }

  closeEditProfileModal();
}

function closeEditProfileModal() {
  editProfileModal.classList.remove('open');
}

document.getElementById('edit-profile-btn').addEventListener('click', openEditProfileModal);
document.getElementById('ep-cover-zone').addEventListener('click', () => openImgPicker('cover'));
document.getElementById('ep-change-avatar-btn').addEventListener('click', () => openImgPicker('avatar'));
document.getElementById('ep-avatar-preview').addEventListener('click', () => openImgPicker('avatar'));
document.getElementById('edit-profile-close').addEventListener('click', closeEditProfileModal);
document.getElementById('ep-cancel-btn').addEventListener('click', closeEditProfileModal);
document.getElementById('ep-save-btn').addEventListener('click', saveEditProfile);
editProfileModal.addEventListener('click', e => { if (e.target === editProfileModal) closeEditProfileModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!document.getElementById('img-picker-modal').classList.contains('hidden')) { closeImgPicker(); return; }
    if (editProfileModal.classList.contains('open')) closeEditProfileModal();
  }
});

function switchToUser(uid) {
  currentViewUid   = uid;
  currentTab       = 'films';
  currentGenre     = 'Tous';
  currentStarFilter = 'all';
  adminDataLoaded  = false;
  loadUserData(uid);
  userMenu.classList.remove('open');
  updateViewingBanner();
  if (currentUser && uid !== currentUser.uid) {
    homePage.classList.remove('hidden');
    mainApp.classList.add('hidden');
    updateHomeHeaderForUid(uid);
  }
}

document.getElementById('back-my-list-btn').addEventListener('click', () => {
  if (!currentUser) return;
  if (searchInput.value) searchClear.click();
  switchToUser(currentUser.uid);
});

document.getElementById('home-back-btn').addEventListener('click', () => {
  if (currentUser) {
    switchToUser(currentUser.uid);
    restoreOwnHomeHeader();
  }
  showHomePage();
});

document.getElementById('edit-lists-link')?.addEventListener('click', e => {
  e.preventDefault();
  if (currentUser) openAdminPanel();
});
['sidebar-edit-btn', 'sm-sidebar-edit-btn'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', () => {
    if (currentUser) { closeSideMenu(); openAdminPanel(); }
  });
});

['export-letterboxd-btn', 'sm-export-letterboxd-btn'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', () => { exportToLetterboxd(); closeSideMenu(); });
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

// ── Navigation home ↔ app ────────────────────────────────────
async function updateHomeHeaderForUid(uid) {
  const snap = await db.ref(`profiles/${uid}`).once('value');
  const p = snap.val() || {};
  const name = p.name || 'Utilisateur';
  document.getElementById('home-app-title').textContent = name;
  const initials = document.getElementById('home-user-initials');
  const avatar   = document.getElementById('home-user-avatar');
  initials.textContent = name[0]?.toUpperCase() || '?';
  if (p.avatar) {
    avatar.src = p.avatar;
    avatar.style.display = 'block';
    initials.style.display = 'none';
  } else {
    avatar.style.display = 'none';
    initials.style.display = '';
  }
  document.getElementById('home-viewing-name').textContent = name;
  const descElGuest = document.getElementById('home-app-desc');
  if (descElGuest) descElGuest.textContent = p.description || '';
  applyAccentColor(p.accentColor || ACCENT_COLORS[0]);
  updateHomeViewingBanner();
  const filmsTitle    = document.getElementById('home-strip-films-title');
  const seriesTitle   = document.getElementById('home-strip-series-title');
  const watchTitle    = document.getElementById('home-strip-watchlist-title');
  if (filmsTitle)  filmsTitle.textContent  = 'Ses Films';
  if (seriesTitle) seriesTitle.textContent = 'Ses Séries';
  if (watchTitle)  watchTitle.textContent  = 'Sa Watchlist';
}

function restoreOwnHomeHeader() {
  if (!currentUser) return;
  db.ref(`users/${currentUser.uid}`).once('value').then(snap => {
    const d = snap.val() || {};
    const name = d.name || currentUser.displayName || '?';
    document.getElementById('home-app-title').textContent = name;
    const initials = document.getElementById('home-user-initials');
    const avatar   = document.getElementById('home-user-avatar');
    initials.textContent = name[0]?.toUpperCase() || '?';
    if (d.avatar) {
      avatar.src = d.avatar;
      avatar.style.display = 'block';
      initials.style.display = 'none';
    } else {
      avatar.style.display = 'none';
      initials.style.display = '';
    }
    const descElOwn = document.getElementById('home-app-desc');
    if (descElOwn) descElOwn.textContent = d.description || '';
    applyAccentColor(d.accentColor || ACCENT_COLORS[0]);
    const filmsTitle  = document.getElementById('home-strip-films-title');
    const seriesTitle = document.getElementById('home-strip-series-title');
    const watchTitle  = document.getElementById('home-strip-watchlist-title');
    if (filmsTitle)  filmsTitle.textContent  = 'Films';
    if (seriesTitle) seriesTitle.textContent = 'Séries';
    if (watchTitle)  watchTitle.textContent  = 'Ma Watchlist';
  });
}

function updateHomeViewingBanner() {
  const banner = document.getElementById('home-viewing-banner');
  if (!banner) return;
  banner.style.display = (currentUser && currentViewUid !== currentUser.uid) ? 'flex' : 'none';
}

function showHomePage() {
  mainApp.classList.add('sliding-out');
  setTimeout(() => {
    mainApp.classList.remove('sliding-out');
    mainApp.classList.add('hidden');
    homePage.classList.remove('hidden');
    homePage.classList.remove('slide-in');
    void homePage.offsetWidth;
    homePage.classList.add('slide-in');
    updateHomeViewingBanner();
    populateHomePage();
  }, 300);
}

function switchTab(tab) {
  currentTab = tab;
  currentGenre = 'Tous';
  currentStarFilter = 'all';
  searchInput.value = '';
  const data = currentTab === 'films' ? films : currentTab === 'watchlist' ? watchlist : [...series, ...anime];
  buildGenreFilters(data);
  renderRecommendation();
  render();
}

function navigateToApp(tab) {
  homePage.classList.add('hidden');
  mainApp.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (tab) switchTab(tab);
  else render();
}

function populateHomePage() {
  fillStrip('home-strip-films',     [...films].sort((a, b) => (b.stars || 0) - (a.stars || 0)), films.length);
  fillStrip('home-strip-series',    [...series, ...anime].sort((a, b) => (b.stars || 0) - (a.stars || 0)), series.length + anime.length);
  fillStrip('home-strip-watchlist', [...watchlist], watchlist.length, true, 10, 2);
  fillCommunityStrip();
  fillActivitySection();
  fillRecoSection();

  const setBadge = (id, count) => { const el = document.getElementById(id); if (el) el.textContent = count; };
  setBadge('home-badge-films',     films.length);
  setBadge('home-badge-series',    series.length + anime.length);
  setBadge('home-badge-watchlist', watchlist.length);

  const coverImg = document.getElementById('home-header-bg');
  if (coverImg) {
    db.ref(`profiles/${currentViewUid}/coverImage`).once('value').then(snap => {
      const saved = snap.val();
      if (saved) {
        coverImg.src = saved;
        coverImg.style.display = 'block';
      } else {
        coverImg.style.display = 'none';
      }
    });
  }

  const statsEl = document.getElementById('home-profile-stats');
  if (statsEl) {
    const fc = films.length;
    const sc = series.length + anime.length;
    const wc = watchlist.length;
    statsEl.innerHTML = `
      <div class="home-stat"><strong>${fc}</strong><span>Films</span></div>
      <div class="home-stat"><strong>${sc}</strong><span>Séries</span></div>
      <div class="home-stat"><strong>${wc}</strong><span>Watchlist</span></div>
    `;
  }
}

function fillActivitySection() {
  const container = document.getElementById('home-activity-list');
  const section   = document.getElementById('home-section-activity');
  if (!container) return;

  const recent = [...films, ...series, ...anime]
    .filter(i => i.addedAt)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 10);

  if (section) section.style.display = '';
  if (!recent.length) {
    container.innerHTML = '<p class="activity-empty">Aucune activité récente</p>';
    return;
  }

  container.innerHTML = '';
  recent.forEach(item => {
    const isSeries = !!(item.seasons || item.episodes);
    const typeLabel = isSeries ? 'Série' : 'Film';
    const el = document.createElement('div');
    el.className = 'activity-item';
    const dateStr = new Date(item.addedAt).toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric' });
    const isOwn = currentUser && currentViewUid === currentUser.uid;
    const starSvg = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="3"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`;
    const starsHtml = item.stars ? `<div class="activity-stars">${Array.from({length:10}, (_,i) =>
      `<span class="activity-star${i < item.stars ? ' filled' : ''}">${starSvg}</span>`
    ).join('')}</div>` : '';
    el.innerHTML = `
      ${item.poster ? `<img class="activity-poster" src="${item.poster}" alt="" />` : `<div class="activity-poster activity-poster-empty"></div>`}
      <div class="activity-info">
        <p class="activity-watched">A visionné</p>
        <p class="activity-title">${item.title}</p>
        ${starsHtml}
        <p class="activity-date">le ${dateStr}</p>
        ${isOwn ? `<button class="activity-delete-btn" title="Retirer de l'activité">✕</button>` : ''}
      </div>
    `;
    el.style.cursor = 'pointer';
    el.addEventListener('click', e => {
      if (e.target.closest('.activity-delete-btn')) return;
      const found = [...films, ...series, ...anime].find(i => i.title === item.title);
      if (found) openModal(found, el);
    });
    if (isOwn) {
      el.querySelector('.activity-delete-btn').addEventListener('click', e => {
        e.stopPropagation();
        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'activity-confirm-btn';
        confirmBtn.textContent = 'Supprimer cette activité';
        el.querySelector('.activity-delete-btn').replaceWith(confirmBtn);

        confirmBtn.addEventListener('click', async e => {
          e.stopPropagation();
          let arr, arrName;
          if (films.find(i => i.title === item.title))       { arr = films;  arrName = 'films'; }
          else if (series.find(i => i.title === item.title)) { arr = series; arrName = 'series'; }
          else                                               { arr = anime;  arrName = 'anime'; }
          const idx = arr.findIndex(i => i.title === item.title);
          if (idx !== -1) {
            delete arr[idx].addedAt;
            await db.ref(`users/${currentUser.uid}/${arrName}`).set(arr);
            fillActivitySection();
          }
        });

        const onClickOutside = e => {
          if (!el.contains(e.target)) {
            fillActivitySection();
            document.removeEventListener('click', onClickOutside);
          }
        };
        setTimeout(() => document.addEventListener('click', onClickOutside), 0);
      });
    }
    container.appendChild(el);
  });
}

// ── Recommandations ──────────────────────────────────────────
let _recoPickerSlot = null;
let _recoPickerType = 'films';

function buildRecoSlots(container, type, isOwn) {
  const group = document.createElement('div');
  group.className = 'reco-group';

  const slots = document.createElement('div');
  slots.className = 'reco-slots-row';

  for (let i = 0; i < 3; i++) {
    const item = recommendations[type][i];
    const slot = document.createElement('div');
    slot.className = 'reco-slot' + (item ? ' reco-slot-filled' : ' reco-slot-ghost');

    if (item) {
      slot.innerHTML = `
        ${item.poster ? `<img class="reco-poster" src="${item.poster}" alt="" />` : `<div class="reco-poster reco-poster-empty"></div>`}
        ${isOwn ? `<button class="reco-remove-btn">✕</button>` : ''}
      `;
      slot.style.cursor = 'pointer';
      slot.addEventListener('click', e => {
        if (e.target.closest('.reco-remove-btn')) return;
        const found = [...films, ...series, ...anime].find(f => f.title === item.title);
        if (found) openModal(found, slot);
      });
      if (isOwn) {
        slot.querySelector('.reco-remove-btn').addEventListener('click', async e => {
          e.stopPropagation();
          recommendations[type][i] = null;
          await saveRecommendations();
          fillRecoSection();
        });
      }
    } else if (isOwn) {
      slot.innerHTML = `<span class="reco-add-label">+</span>`;
      slot.style.cursor = 'pointer';
      slot.addEventListener('click', () => openRecoPicker(i, type));
    } else {
      slot.innerHTML = `<span class="reco-empty-label">—</span>`;
    }

    const wrap = document.createElement('div');
    wrap.className = 'reco-slot-wrap';
    wrap.appendChild(slot);

    if (item) {
      const note = getNote(item.title);
      if (note) {
        const noteEl = document.createElement('div');
        noteEl.className = 'reco-slot-note';
        noteEl.style.cursor = 'pointer';
        noteEl.addEventListener('click', e => {
          e.stopPropagation();
          openNoteReadModal(item.title, note);
        });
        const stars = getStars(item.title);
        if (stars) {
          const starsEl = document.createElement('p');
          starsEl.className = 'reco-slot-note-stars';
          starsEl.textContent = '★ ' + stars + ' / 10';
          noteEl.appendChild(starsEl);
        }
        const textEl = document.createElement('p');
        textEl.className = 'reco-slot-note-text';
        textEl.textContent = note;
        noteEl.appendChild(textEl);
        wrap.appendChild(noteEl);
      }
    }

    slots.appendChild(wrap);
  }

  group.appendChild(slots);
  container.appendChild(group);
}

function fillRecoSection() {
  const container = document.getElementById('home-reco-list');
  if (!container) return;
  const isOwn = currentUser && currentViewUid === currentUser.uid;

  const titleEl = document.querySelector('#home-section-reco .home-carousel-title');
  if (titleEl) {
    titleEl.textContent = currentViewName ? `Recommandations de ${currentViewName}` : 'Recommandations';
  }

  container.innerHTML = '';
  buildRecoSlots(container, 'films', isOwn);
  buildRecoSlots(container, 'series', isOwn);
}

function openRecoPicker(slotIndex, type) {
  _recoPickerSlot = slotIndex;
  _recoPickerType = type;
  const modal = document.getElementById('reco-picker-modal');
  const input = document.getElementById('reco-search-input');
  modal.classList.remove('hidden');
  input.value = '';
  renderRecoPickerResults('');
  setTimeout(() => input.focus(), 50);
}

function renderRecoPickerResults(query) {
  const resultsEl = document.getElementById('reco-picker-results');
  const pool = _recoPickerType === 'films' ? films : [...series, ...anime];
  const q = query.toLowerCase().trim();
  const filtered = (q ? pool.filter(i => i.title.toLowerCase().includes(q)) : pool).slice(0, 10);

  if (!filtered.length) { resultsEl.innerHTML = '<p class="tmdb-msg">Aucun résultat.</p>'; return; }

  resultsEl.innerHTML = '';
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'reco-picker-card';
    card.innerHTML = `
      ${item.poster ? `<img src="${item.poster}" alt="" />` : `<div class="reco-picker-card-no-poster"></div>`}
      <div class="reco-picker-card-info">
        <p class="reco-picker-card-title">${item.title}</p>
        <p class="reco-picker-card-year">${item.year || ''}</p>
      </div>
    `;
    card.addEventListener('click', async () => {
      recommendations[_recoPickerType][_recoPickerSlot] = { title: item.title, poster: item.poster || null, year: item.year || null };
      document.getElementById('reco-picker-modal').classList.add('hidden');
      await saveRecommendations();
      fillRecoSection();
    });
    resultsEl.appendChild(card);
  });
}

async function saveRecommendations() {
  if (!currentUser) return;
  await db.ref(`users/${currentUser.uid}/recommendations`).set(recommendations);
}

document.getElementById('reco-picker-close').addEventListener('click', () => {
  document.getElementById('reco-picker-modal').classList.add('hidden');
});
document.getElementById('reco-search-input').addEventListener('input', e => {
  renderRecoPickerResults(e.target.value);
});
document.getElementById('reco-picker-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('reco-picker-modal')) {
    document.getElementById('reco-picker-modal').classList.add('hidden');
  }
});

function fillCommunityStrip() {
  const strip = document.getElementById('home-strip-community');
  if (!strip) return;
  strip.innerHTML = '<span class="home-strip-empty">Chargement…</span>';

  db.ref('profiles').once('value').then(async profilesSnap => {
    const profiles = profilesSnap.val() || {};
    const uids = Object.keys(profiles);

    const entries = await Promise.all(uids.map(async uid => {
      const p    = profiles[uid];
      const snap = await db.ref(`users/${uid}`).once('value');
      const u    = snap.val() || {};
      const count = Object.values(u.films  || {}).length
                  + Object.values(u.series || {}).length
                  + Object.values(u.anime  || {}).length;
      return { uid, name: p.name || '?', avatar: p.avatar || null, accentColor: p.accentColor || null, count };
    }));

    entries.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      if (a.uid === currentUser?.uid) return -1;
      if (b.uid === currentUser?.uid) return 1;
      return 0;
    });

    strip.innerHTML = '';
    entries.forEach(({ uid, name, avatar, accentColor, count }) => {
      const card = document.createElement('div');
      card.className = 'home-community-card';

      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'home-community-avatar';
      if (accentColor) avatarDiv.style.borderColor = accentColor;
      if (avatar) {
        const img = document.createElement('img');
        img.src = avatar; img.alt = name;
        avatarDiv.appendChild(img);
      } else {
        const span = document.createElement('span');
        span.className = 'home-community-initials';
        span.textContent = name[0].toUpperCase();
        if (accentColor) avatarDiv.style.background = accentColor + '33';
        avatarDiv.appendChild(span);
      }

      const nameEl  = document.createElement('span');
      nameEl.className   = 'home-community-name';
      nameEl.textContent = name;

      const countEl = document.createElement('span');
      countEl.className   = 'home-community-count';
      countEl.textContent = count + ' film' + (count > 1 ? 's' : '');

      card.appendChild(avatarDiv);
      card.appendChild(nameEl);
      card.appendChild(countEl);

      card.addEventListener('click', () => {
        switchToUser(uid);
      });

      strip.appendChild(card);
    });

    if (!entries.length) strip.innerHTML = '<span class="home-strip-empty">Aucun utilisateur</span>';
  });
}

function fillStrip(stripId, items, total, showAddBtn = false, maxItems = 7, extraOverlap = 2.5) {
  const strip = document.getElementById(stripId);
  if (!strip) return;
  strip.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'home-carousel-row';

  const displayed = items.slice(0, maxItems);

  displayed.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'home-carousel-card';
    card.style.zIndex = displayed.length - i;
    if (item.poster) {
      const img = document.createElement('img');
      img.src = item.poster; img.alt = item.title; img.loading = 'lazy';
      card.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'home-carousel-empty';
      ph.textContent = item.title;
      card.appendChild(ph);
    }
    row.appendChild(card);
  });

  const MIN_SLOTS = maxItems;
  for (let i = displayed.length; i < MIN_SLOTS; i++) {
    const ghost = document.createElement('div');
    ghost.className = 'home-carousel-card home-carousel-ghost';
    ghost.style.zIndex = displayed.length - i;
    row.appendChild(ghost);
  }

  if (showAddBtn) {
    const wrap = document.createElement('div');
    wrap.className = 'home-carousel-add-wrap';
    const addBtn = document.createElement('button');
    addBtn.className = 'home-carousel-add-btn';
    addBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
    addBtn.addEventListener('click', quickAddToWatchlist);
    wrap.appendChild(row);
    wrap.appendChild(addBtn);
    strip.appendChild(wrap);
  } else {
    strip.appendChild(row);
  }

  attachCarouselOverlap(row, extraOverlap);
}

function attachCarouselOverlap(row, extraOverlap = 2.5) {
  const compute = () => {
    const cards = row.querySelectorAll('.home-carousel-card');
    if (cards.length < 2) return;
    const containerW = row.offsetWidth;
    const cardW = cards[0].offsetWidth;
    const n = cards.length;
    const overlap = Math.max(4, (n * cardW - containerW) / (n - 1)) + extraOverlap;
    row.style.setProperty('--carousel-overlap', `${overlap}px`);
  };
  requestAnimationFrame(compute);
  new ResizeObserver(compute).observe(row);
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
      document.getElementById('home-user-initials').textContent       = pseudo[0].toUpperCase();
      document.getElementById('home-app-title').textContent           = pseudo;
      const descEl = document.getElementById('home-app-desc');
      if (descEl) descEl.textContent = d.description || '';
      if (d.avatar) setAvatarDisplay(d.avatar);
      if (d.accentColor) applyAccentColor(d.accentColor);
    });
    loadUserData(user.uid);
    updateViewingBanner();
    showHomePage();
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
    homePage.classList.add('hidden');
    mainApp.classList.add('hidden');
    authSubmit.disabled = false;
  }
});









// ============================================================
//  LOGIQUE
// ============================================================

let currentTab = "films";
let currentGenre = "Tous";
let currentSort = localStorage.getItem("sort") ?? "alpha-asc";
let currentStarFilter = 'all';

// ── Préférences d'affichage ───────────────────────────────────
const displayPrefs = { showTitles: false, showDates: false, showRatings: false };

function applyDisplayPrefs() {
  grid.classList.toggle('show-titles',  displayPrefs.showTitles);
  grid.classList.toggle('show-dates',   displayPrefs.showDates);
  grid.classList.toggle('show-ratings', displayPrefs.showRatings);
  ['pref-titles', 'sm-pref-titles'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = displayPrefs.showTitles; });
  ['pref-dates',  'sm-pref-dates' ].forEach(id => { const el = document.getElementById(id); if (el) el.checked = displayPrefs.showDates; });
  ['pref-ratings','sm-pref-ratings'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = displayPrefs.showRatings; });
  ['pref-compact','sm-pref-compact'].forEach(id => { const el = document.getElementById(id); if (el) el.checked = grid.classList.contains('compact'); });
}

async function saveDisplayPrefs() {
  if (!currentUser) return;
  await db.ref(`users/${currentUser.uid}/displayPrefs`).set(displayPrefs);
}

async function loadDisplayPrefs(uid) {
  const snap = await db.ref(`users/${uid}/displayPrefs`).once('value');
  const saved = snap.val();
  if (saved) {
    displayPrefs.showTitles  = saved.showTitles  ?? false;
    displayPrefs.showDates   = saved.showDates   ?? false;
    displayPrefs.showRatings = saved.showRatings ?? false;
  } else {
    displayPrefs.showTitles  = false;
    displayPrefs.showDates   = false;
    displayPrefs.showRatings = true;
  }
  applyDisplayPrefs();
}

const prefKeyMap = { 'pref-titles': 'showTitles', 'pref-dates': 'showDates', 'pref-ratings': 'showRatings',
                     'sm-pref-titles': 'showTitles', 'sm-pref-dates': 'showDates', 'sm-pref-ratings': 'showRatings' };
Object.keys(prefKeyMap).forEach(id => {
  document.getElementById(id)?.addEventListener('change', e => {
    displayPrefs[prefKeyMap[id]] = e.target.checked;
    applyDisplayPrefs();
    saveDisplayPrefs();
  });
});
['pref-compact', 'sm-pref-compact'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', e => setCompactLayout(e.target.checked));
});

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const tabs = document.querySelectorAll(".tab");

const sortDropdown = document.getElementById("sort-dropdown");
const genreDropdown = document.getElementById("genre-dropdown");
const compactSideBtn = document.getElementById("compact-side-btn");

function setCompactLayout(compact) {
  grid.classList.toggle("compact", compact);
  compactSideBtn.classList.toggle("active", compact);
  const cb = document.getElementById("pref-compact");
  if (cb) cb.checked = compact;
  localStorage.setItem("compactLayout", compact ? "1" : "0");
}

const savedCompact = localStorage.getItem("compactLayout");
setCompactLayout(savedCompact === null ? true : savedCompact === "1");

compactSideBtn.addEventListener("click", () => { setCompactLayout(!grid.classList.contains("compact")); closeSideMenu(); });
document.getElementById("pref-compact").addEventListener("change", e => setCompactLayout(e.target.checked));

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
  buildFilterMenu();
}

document.addEventListener("click", closeAllDropdowns);

initDropdown(sortDropdown);
initDropdown(genreDropdown);

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
  genreDropdown.querySelector(".dropdown-label").textContent =
    currentGenre !== "Tous" ? currentGenre : "Tous";
}

function buildFilterMenu() {
  const data = currentFilterData;
  const list = genreDropdown.querySelector(".dropdown-list");
  list.innerHTML = "";

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

function buildGenreFilters(data) {
  currentFilterData = data;
  buildFilterMenu();
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
    if (currentSort === "added-desc") return (b.addedAt ?? '').localeCompare(a.addedAt ?? '');
    if (currentSort === "added-asc")  return (a.addedAt ?? '').localeCompare(b.addedAt ?? '');
  });
}



function render() {
  const query = searchInput.value.trim().toLowerCase();
  const raw = currentTab === "films" ? films : currentTab === "watchlist" ? watchlist : [...series, ...anime];

  let data = sortData(raw);

  if (currentGenre !== "Tous") {
    data = data.filter(item => (item.genre ?? []).includes(currentGenre));
  }

  if (currentStarFilter !== 'all') {
    data = data.filter(item => (item.stars ?? 0) === currentStarFilter);
  }

  if (query) {
    data = data.filter(item =>
      item.title.toLowerCase().includes(query) ||
      (item.director ?? "").toLowerCase().includes(query) ||
      (item.cast ?? []).some(actor => actor.toLowerCase().includes(query))
    );
  }

  const setCount = (id, text, show = true) => {
    const el = document.getElementById(id);
    if (el) { el.textContent = text; el.style.display = show ? '' : 'none'; }
  };
  if (currentTab === "watchlist") {
    const wFilms  = data.filter(i => !(i.seasons || i.episodes)).length;
    const wSeries = data.filter(i => !!(i.seasons || i.episodes)).length;
    setCount('result-count', `${wFilms} film${wFilms > 1 ? 's' : ''}`);
    setCount('sm-result-count', `${wFilms} film${wFilms > 1 ? 's' : ''}`);
    setCount('time-count', `${wSeries} série${wSeries > 1 ? 's' : ''}`);
    setCount('sm-time-count', `${wSeries} série${wSeries > 1 ? 's' : ''}`);
  } else {
    const label = currentTab === "films" ? "film" : currentTab === "series" ? "série" : "animé";
    setCount('result-count', `${data.length} ${label}${data.length > 1 ? "s" : ""}`);
    setCount('sm-result-count', `${data.length} ${label}${data.length > 1 ? "s" : ""}`);
    if (currentTab !== 'films') {
      setCount('time-count', '', false);
      setCount('sm-time-count', '', false);
    } else {
      const totalMin = data.reduce((sum, item) => sum + parseTime(item.time), 0);
      const h = Math.round(totalMin / 60);
      setCount('time-count', `Estimation : ${h}h`);
      setCount('sm-time-count', `Estimation : ${h}h`);
    }
  }
  const topSection = document.getElementById('top-section');
  if (topSection) topSection.style.display = (query || currentTab === 'watchlist') ? 'none' : '';

  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = '<p class="empty">Aucun résultat.</p>';
    updateLoadMoreBtn(0, 0);
    return;
  }

  currentRenderData = data;
  gridPage = 1;
  data.forEach((item, index) => grid.appendChild(createCardWrapper(item, index)));
  requestAnimationFrame(applyGridPagination);
  updateStatsSidebar();
}

function createCardWrapper(item, index) {
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

  let longPressTimer = null;
  let longPressFired = false;
  a.addEventListener('pointerdown', () => {
    longPressFired = false;
    longPressTimer = setTimeout(() => {
      if (item.poster) {
        longPressFired = true;
        openPosterZoom(item.poster);
      }
    }, 450);
  });
  a.addEventListener('pointerup', () => clearTimeout(longPressTimer));
  a.addEventListener('pointercancel', () => clearTimeout(longPressTimer));
  a.addEventListener('pointermove', () => clearTimeout(longPressTimer));

  a.addEventListener('click', e => {
    if (longPressFired) { e.preventDefault(); longPressFired = false; return; }
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
    starsDiv.innerHTML = `<span class="card-stars-icon"><svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-linejoin="round" stroke-width="3"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg></span>${rating}`;
    a.appendChild(starsDiv);
  }

  const info = document.createElement("div");
  info.className = "card-info";
  info.innerHTML = `<span class="card-title">${item.title}</span>${item.year ? `<span class="card-year">${item.year}</span>` : ''}`;

  wrapper.appendChild(a);
  wrapper.appendChild(info);
  return wrapper;
}

function applyGridPagination() {
  grid.querySelectorAll('.ghost-card').forEach(g => g.remove());
  const cards = Array.from(grid.querySelectorAll('.card-wrapper'));
  if (cards.length === 0) { updateLoadMoreBtn(0, 0); return; }

  const computedCols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  let cols = computedCols || 1;
  gridColCount = cols;

  const limit = GRID_ROWS_PER_PAGE * cols;
  for (let i = cards.length - 1; i >= limit; i--) {
    cards[i].remove();
  }

  const shown = Math.min(limit, cards.length);
  if (currentRenderData.length <= limit) {
    const ghostCount = limit - shown;
    for (let i = 0; i < ghostCount; i++) {
      const ghost = document.createElement('div');
      ghost.className = 'card-wrapper ghost-card';
      grid.appendChild(ghost);
    }
  }

  updateLoadMoreBtn(currentRenderData.length, shown);
}

function updateLoadMoreBtn(total, shown) {
  const wrap = document.getElementById('load-more-wrap');
  if (!wrap) return;
  if (shown >= total) {
    wrap.innerHTML = '';
    wrap.style.display = 'none';
    return;
  }
  const remaining = total - shown;
  wrap.style.display = '';
  wrap.innerHTML = `<button class="load-more-btn" id="load-more-btn">Voir plus <span class="load-more-count">${remaining} de plus</span></button>`;
  document.getElementById('load-more-btn').addEventListener('click', loadMoreItems);
}

function loadMoreItems() {
  gridPage++;
  const start = GRID_ROWS_PER_PAGE * gridColCount * (gridPage - 1);
  const end   = GRID_ROWS_PER_PAGE * gridColCount * gridPage;
  currentRenderData.slice(start, end).forEach((item, i) => {
    grid.appendChild(createCardWrapper(item, i));
  });
  updateLoadMoreBtn(currentRenderData.length, end);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    currentGenre = "Tous";
    searchInput.value = "";
    const data = currentTab === "films" ? films : currentTab === "watchlist" ? watchlist : [...series, ...anime];
    buildGenreFilters(data);
    renderRecommendation();
    render();
  });
});

// ── Search suggestions ──────────────────────────────────────
const suggestionList = document.createElement("ul");
suggestionList.className = "search-suggestions";
document.body.appendChild(suggestionList);

function positionSuggestions() {
  const rect = searchInput.parentElement.getBoundingClientRect();
  suggestionList.style.top = (rect.bottom + 6) + 'px';
  if (window.innerWidth <= 700) {
    suggestionList.style.left  = '0px';
    suggestionList.style.right = '0px';
    suggestionList.style.width = '';
  } else {
    suggestionList.style.left  = rect.left + 'px';
    suggestionList.style.right = (window.innerWidth - rect.right) + 'px';
    suggestionList.style.width = '';
  }
}
window.addEventListener('resize', () => {
  if (suggestionList.style.display === 'block') positionSuggestions();
});

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
  positionSuggestions();
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
  updatePersonBadge('');
  const recSection = document.querySelector('.rec-section');
  if (recSection) recSection.style.display = '';
  render();
  searchInput.focus();
});

function updatePersonBadge(query) {
  const q = query?.toLowerCase();
  const all = [...films, ...series, ...anime];
  const seen = new Set();
  if (q && q.length >= 2) {
    for (const item of all) {
      if (item.director && item.director.toLowerCase().includes(q)) seen.add(item.director);
      for (const name of (item.cast || [])) { if (name.toLowerCase().includes(q)) seen.add(name); }
    }
  }
  const matches = [...seen].slice(0, 4);

  [['sidebar-person-badges', 'sidebar-person-section'], ['sm-sidebar-person-badges', 'sm-sidebar-person-section']].forEach(([wrapId, secId]) => {
    const wrap = document.getElementById(wrapId);
    const section = document.getElementById(secId);
    if (!wrap || !section) return;
    wrap.innerHTML = '';
    if (!matches.length) { section.style.display = 'none'; return; }
    section.style.display = '';
    for (const name of matches) {
      const a = document.createElement('a');
      a.className = 'person-badge';
      a.href = `https://www.google.com/search?q=${encodeURIComponent(name + ' allociné')}`;
      a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>${name}`;
      wrap.appendChild(a);
    }
  });
}

searchInput.addEventListener("input", () => {
  updateSearchClear();
  showSuggestions(searchInput.value.trim());
  const q = searchInput.value.trim();
  const recSection = document.querySelector('.rec-section');
  if (recSection) recSection.style.display = q ? 'none' : '';
  updatePersonBadge(q);
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

function openModal(item, triggerEl) {
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-year').textContent = item.year ?? '';

  const RATING_LABELS = ['Pas de note','Catastrophique','Vraiment Mauvais','Bof','Oubliable','Moyen','Bon film','Mérite d\'être vu','Excellent','Chef-d\'œuvre','Immense Chef-d\'œuvre'];
  const starsEl      = document.getElementById('modal-stars');
  const ratingLabel  = document.getElementById('modal-rating-label');

  function refreshStars(rating) {
    starsEl.querySelectorAll('.star').forEach(s => {
      const v = parseInt(s.dataset.value);
      s.classList.toggle('active', rating > 0 && v <= rating);
    });
    if (ratingLabel) ratingLabel.textContent = RATING_LABELS[rating] ?? '';
  }
  refreshStars(getStars(item.title));
  starsEl.querySelectorAll('.star').forEach(s => {
    s.addEventListener('mouseover', () => {
      const v = parseInt(s.dataset.value);
      starsEl.querySelectorAll('.star').forEach(st => {
        st.classList.toggle('active', parseInt(st.dataset.value) <= v);
      });
      if (ratingLabel) ratingLabel.textContent = RATING_LABELS[v] ?? '';
    });
    s.addEventListener('mouseleave', () => refreshStars(getStars(item.title)));
    s.onclick = () => {
      const v = parseInt(s.dataset.value);
      const newRating = getStars(item.title) === v ? 0 : v;
      setRating(item.title, newRating);
      refreshStars(newRating);
    };
  });

  const personLink = name =>
    `<span class="modal-person" data-search="${name.replace(/"/g, '&quot;')}">${name}</span>`;

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
      ? `Casting: ${item.cast.map(personLink).join(' ')}`
      : '';
  }

  document.querySelectorAll('.modal-person[data-search]').forEach(el => {
    el.addEventListener('click', () => {
      closeModal();
      searchInput.value = el.dataset.search;
      updateSearchClear();
      const recSection = document.querySelector('.rec-section');
      if (recSection) recSection.style.display = 'none';
      const topSection = document.getElementById('top-section');
      if (topSection) topSection.style.display = 'none';
      updatePersonBadge(el.dataset.search);
      render();
    });
  });

  document.getElementById('modal-link').href =
    `https://www.google.com/search?q=${encodeURIComponent(item.title + ' allociné')}`;
  const trailerEl = document.getElementById('modal-trailer');
  trailerEl.onclick = null;
  trailerEl.href = item.youtubeId
    ? `https://www.youtube.com/watch?v=${item.youtubeId}`
    : `https://www.google.com/search?q=${encodeURIComponent(item.title + ' bande annonce youtube')}`;

  const isWatchlistItem = currentTab === 'watchlist';
  const isGuest = currentUser && currentViewUid !== currentUser.uid;

  // Stars / rating: hide for watchlist (not yet seen)
  starsEl.style.display = isWatchlistItem ? 'none' : '';
  if (ratingLabel) ratingLabel.style.display = isWatchlistItem ? 'none' : '';

  const emojiRow = document.getElementById('modal-emoji-row');
  const emojiBtn = document.getElementById('modal-emoji-btn');
  const isOwn    = currentUser && currentViewUid === currentUser.uid;
  if (emojiRow) emojiRow.style.display = (!isWatchlistItem && isOwn) ? '' : 'none';
  if (emojiBtn) {
    emojiBtn.onclick = () => openEmojiPicker(item.title);
  }
  updateModalEmojiDisplay(item.title);

  const noteBtn      = document.getElementById('modal-note-btn');
  const noteExisting = document.getElementById('modal-note-existing');
  const noteEditBtn  = document.getElementById('modal-note-edit-btn');
  const reviewCard   = document.getElementById('modal-review-card');
  if (noteBtn) {
    noteBtn.style.display      = isOwn ? '' : 'none';
    if (noteExisting) noteExisting.style.display = isOwn ? '' : 'none';
    noteBtn.onclick    = () => openNoteModal(item.title);
    if (noteEditBtn) noteEditBtn.onclick = () => openNoteModal(item.title);
    updateModalNoteDisplay(item.title);
  }

  updateModalRecommendBtn(item.title);

  const copyBtn = document.getElementById('modal-copy-btn');
  copyBtn.classList.toggle('hidden', !isGuest || isWatchlistItem);
  if (isGuest && !isWatchlistItem) {
    copyBtn.textContent = 'Copier dans ma liste';
    copyBtn.classList.remove('copied');
    copyBtn.onclick = () => copyItemToMyList(item, copyBtn);
  }

  const watchlistBtn = document.getElementById('modal-watchlist-btn');
  watchlistBtn.classList.add('hidden');
  watchlistBtn.classList.remove('copied');
  if (isGuest && !isWatchlistItem && currentUser) {
    db.ref(`users/${currentUser.uid}`).once('value').then(snap => {
      const d = snap.val() || {};
      const myLists = [
        ...Object.values(d.films  || {}),
        ...Object.values(d.series || {}),
        ...Object.values(d.anime  || {}),
      ];
      const myWatchlist = Object.values(d.watchlist || {});
      const inLists     = myLists.some(i => i.title === item.title);
      const inWatchlist = myWatchlist.some(i => i.title === item.title);

      if (inLists) copyBtn.classList.add('hidden');

      if (!inLists && !inWatchlist) {
        watchlistBtn.classList.remove('hidden');
        watchlistBtn.textContent = 'Ajouter à ma Watchlist';
        watchlistBtn.onclick = () => addToMyWatchlist(item, watchlistBtn);
      }
    });
  }

  const transferActions = document.getElementById('modal-transfer-actions');
  const isOwnWatchlist = !isGuest && isWatchlistItem;
  transferActions.classList.toggle('hidden', !isOwnWatchlist);
  if (isOwnWatchlist) {
    const isFilm   = !!(item.time);
    const isSeries = !isFilm;
    const filmsBtn  = document.getElementById('modal-transfer-films');
    const seriesBtn = document.getElementById('modal-transfer-series');
    filmsBtn.style.display  = isSeries ? 'none' : '';
    seriesBtn.style.display = isFilm   ? 'none' : '';
    filmsBtn.onclick  = () => transferFromWatchlist(item, 'films');
    seriesBtn.onclick = () => transferFromWatchlist(item, 'series');
  }

  const posterImg    = document.getElementById('modal-poster-img');
  const posterHeader = document.getElementById('modal-poster-header');
  const filmPoster   = document.getElementById('modal-film-poster');
  posterImg.src = item.backdrop || item.poster || '';
  posterHeader.style.display = (item.backdrop || item.poster) ? '' : 'none';
  if (filmPoster) filmPoster.src = item.poster || '';

  modalBackdrop.classList.add('open', 'film-modal');
  modalEl.classList.add('open');
}


function closeModal() {
  modalBackdrop.classList.remove('open', 'film-modal');
  modalEl.classList.remove('open');
}

const posterZoomModal = document.getElementById('poster-zoom-modal');
const posterZoomImg   = document.getElementById('poster-zoom-img');
const posterZoomWrap  = document.getElementById('poster-zoom-wrap');
const posterZoomShine = document.getElementById('poster-zoom-shine');

function openPosterZoom(src) {
  posterZoomImg.src = src;
  posterZoomWrap.style.transition = 'transform 0.28s cubic-bezier(0.34,1.2,0.64,1), opacity 0.22s';
  posterZoomModal.classList.add('open');
}
function closePosterZoom() {
  posterZoomModal.classList.remove('open');
  posterZoomWrap.style.transform = '';
  posterZoomShine.style.opacity = '0';
}
posterZoomModal.addEventListener('click', closePosterZoom);

let posterGrabbed = false;
posterZoomWrap.addEventListener('pointerdown', e => {
  posterGrabbed = true;
  posterZoomWrap.style.cursor = 'grabbing';
  posterZoomWrap.setPointerCapture(e.pointerId);
});
posterZoomWrap.addEventListener('pointerup', () => {
  if (!posterGrabbed) return;
  posterGrabbed = false;
  posterZoomWrap.style.cursor = 'grab';
  posterZoomWrap.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
  posterZoomWrap.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
  posterZoomShine.style.opacity = '0';
});
posterZoomWrap.addEventListener('pointermove', e => {
  if (!posterGrabbed) return;
  const rect = posterZoomWrap.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / (rect.width / 2);
  const dy = (e.clientY - cy) / (rect.height / 2);
  posterZoomWrap.style.transition = 'none';
  posterZoomWrap.style.transform = `perspective(700px) rotateX(${-dy * 14}deg) rotateY(${dx * 18}deg) scale(1)`;
  const px = ((e.clientX - rect.left) / rect.width) * 100;
  const py = ((e.clientY - rect.top) / rect.height) * 100;
  posterZoomShine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 45%, transparent 70%)`;
  posterZoomShine.style.opacity = '1';
});
posterZoomWrap.addEventListener('click', e => e.stopPropagation());
posterZoomImg.addEventListener('dragstart', e => e.preventDefault());

async function addToMyWatchlist(item, btn) {
  if (!currentUser) return;
  const snap = await db.ref(`users/${currentUser.uid}/watchlist`).once('value');
  const existing = Object.values(snap.val() || {});
  if (existing.find(i => i.title === item.title)) {
    btn.textContent = 'Déjà dans ta Watchlist';
    btn.classList.add('copied');
    return;
  }
  const copy = { ...item };
  delete copy.stars;
  existing.push(copy);
  await db.ref(`users/${currentUser.uid}/watchlist`).set(existing);
  btn.textContent = '✓ Ajouté !';
  btn.classList.add('copied');
  btn.onclick = null;
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

async function transferFromWatchlist(item, targetList) {
  if (!currentUser) return;
  const filmsBtn  = document.getElementById('modal-transfer-films');
  const seriesBtn = document.getElementById('modal-transfer-series');
  filmsBtn.disabled = true;
  seriesBtn.disabled = true;

  const targetSnap = await db.ref(`users/${currentUser.uid}/${targetList}`).once('value');
  const targetItems = Object.values(targetSnap.val() || {});
  if (!targetItems.find(i => i.title === item.title)) {
    const copy = { ...item };
    delete copy.stars;
    copy.addedAt = new Date().toISOString();
    targetItems.push(copy);
    await db.ref(`users/${currentUser.uid}/${targetList}`).set(targetItems);
  }

  watchlist = watchlist.filter(i => i.title !== item.title);
  const newWatchlist = watchlist;
  await db.ref(`users/${currentUser.uid}/watchlist`).set(newWatchlist.length ? newWatchlist : null);

  if (targetList === 'films') films = [...films, { ...item }];
  else series = [...series, { ...item }];

  closeModal();
  render();
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target !== modalBackdrop) return;
  if (topPopupOpen) closeTopPopup();
  else closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
window.addEventListener('scroll', closeModal, { passive: true });

// ── Top Réal. / Top Cast. ────────────────────────────────────
const topPopup      = document.getElementById('top-popup');
const topPopupTitle = document.getElementById('top-popup-title');
const topPopupList  = document.getElementById('top-popup-list');
let   topPopupOpen  = null;

function computeTop(key, limit = 10) {
  const counts = {};
  const source = currentTab === 'films' ? films : [...series, ...anime];
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

function closeTopPopup() {
  topPopup.classList.remove('open');
  modalBackdrop.classList.remove('open');
  topPopupOpen = null;
}

function showTopPopup(type) {
  if (topPopupOpen === type) {
    closeTopPopup();
    return;
  }
  const top = computeTop(type === 'real' ? 'director' : 'cast', 50);
  topPopupTitle.textContent = type === 'real' ? 'Top Réalisateurs' : 'Top Acteurs';
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
      closeTopPopup();
      render();
    });
  });
  topPopup.classList.remove('open');
  void topPopup.offsetWidth;
  topPopup.classList.add('open');
  modalBackdrop.classList.add('open');
  topPopupOpen = type;
}

document.getElementById('top-section-real-btn')?.addEventListener('click', e => { e.stopPropagation(); showTopPopup('real'); });
document.getElementById('top-section-cast-btn')?.addEventListener('click', e => { e.stopPropagation(); showTopPopup('cast'); });
document.getElementById('top-popup-close')?.addEventListener('click', e => { e.stopPropagation(); closeTopPopup(); });

// ── Stats Sidebar ─────────────────────────────────────────────
function renderSidebarList(elId, items) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = items.map(([name, count], i) =>
    `<li class="sidebar-item">
      <span class="sidebar-rank">${i + 1}</span>
      <span class="sidebar-name" data-search="${name.replace(/"/g, '&quot;')}">${name}</span>
      <span class="sidebar-count">${count}</span>
    </li>`
  ).join('');
  el.querySelectorAll('.sidebar-name').forEach(el => {
    el.addEventListener('click', () => {
      searchInput.value = el.dataset.search;
      updateSearchClear();
      closeSideMenu();
      render();
    });
  });
}

function populateSidebarPair(id, smId, fn) {
  fn(id); fn(smId);
}

function updateStatsSidebar() {
  const isWatchlist = currentTab === 'watchlist';
  const isSeries    = currentTab === 'series';
  const hideTopSections = isSeries || isWatchlist;
  const isOwn = !currentUser || currentViewUid === currentUser.uid;

  document.querySelectorAll('.sidebar-btn-group').forEach(el => {
    el.style.display = isOwn ? '' : 'none';
  });

  ['sidebar-section-ratings', 'sm-sidebar-section-ratings'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isWatchlist ? 'none' : '';
  });
  ['sidebar-section-directors', 'sm-sidebar-section-directors'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = hideTopSections ? 'none' : '';
  });
  ['sidebar-section-actors', 'sm-sidebar-section-actors'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = hideTopSections ? 'none' : '';
  });

  if (!hideTopSections) {
    const topDirs   = computeTop('director', 50);
    const topActors = computeTop('cast', 50);
    ['sidebar-directors', 'sm-sidebar-directors'].forEach(id => renderSidebarList(id, topDirs.slice(0, 10)));
    ['sidebar-actors',    'sm-sidebar-actors'   ].forEach(id => renderSidebarList(id, topActors.slice(0, 10)));

    ['sidebar-directors-more', 'sm-sidebar-directors-more'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) { btn.style.display = topDirs.length > 5 ? '' : 'none'; btn.onclick = () => showTopPopup('real'); }
    });
    ['sidebar-actors-more', 'sm-sidebar-actors-more'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) { btn.style.display = topActors.length > 5 ? '' : 'none'; btn.onclick = () => showTopPopup('cast'); }
    });
  }

  const source   = currentTab === 'films' ? films : [...series, ...anime];
  const rated    = source.filter(i => i.stars >= 0 && i.stars <= 10);
  const total    = rated.length;
  const counts   = Array(11).fill(0);
  rated.forEach(i => { counts[Math.round(i.stars)]++; });
  const maxCount = Math.max(...counts, 1);

  const ratingsHtml = `
    <div class="sidebar-ratings-header">
      <span class="sidebar-ratings-label">Notes</span>
      <span class="sidebar-ratings-total">${total}</span>
    </div>
    <div class="sidebar-ratings-chart">
      ${counts.map((c, note) =>
        `<div class="sidebar-bar-col${currentStarFilter === note ? ' active' : ''}" data-note="${note}" title="${note}/10 · ${c} film${c !== 1 ? 's' : ''}">
          <div class="sidebar-bar" style="height:${c > 0 ? Math.max(Math.round((c / maxCount) * 100), 4) : 0}%"></div>
        </div>`
      ).join('')}
    </div>
    <div class="sidebar-ratings-stars"><span>0</span><span>10</span></div>
  `;

  ['sidebar-ratings', 'sm-sidebar-ratings'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = ratingsHtml;
    el.querySelectorAll('.sidebar-bar-col').forEach(col => {
      col.addEventListener('click', () => {
        const note = parseInt(col.dataset.note, 10);
        currentStarFilter = currentStarFilter === note ? 'all' : note;
        render();
      });
    });
  });
}

// ============================================================
//  SIDE MENU MOBILE
// ============================================================

const sideMenuEl       = document.getElementById('side-menu');
const sideMenuBackdrop = document.getElementById('side-menu-backdrop');

const SORT_LABELS = {
  'alpha-asc':   'A → Z',
  'alpha-desc':  'Z → A',
  'year-desc':   'Récent',
  'year-asc':    'Ancien',
  'added-desc':  'Ajouté récemment',
  'added-asc':   'Ajouté anciennement',
  'stars-desc':  'Mieux notés',
  'stars-asc':   'Moins notés',
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

document.getElementById('side-nav-home').addEventListener('click', () => {
  closeSideMenu();
  showHomePage();
});

document.getElementById('side-nav-community').addEventListener('click', () => {
  closeSideMenu();
  openProfilesModal();
});

function renderSideMenu() {
  renderSideTabs();
  renderSideSort();
  renderSideGenre();
  renderSideStats();
}

function renderSideTabs() {
  const TAB_DEFS = [
    { key: 'films',     label: 'Films' },
    { key: 'series',    label: 'Séries' },
    { key: 'watchlist', label: 'Watchlist' },
  ];
  const container = document.getElementById('side-tabs');
  container.innerHTML = '';
  TAB_DEFS.forEach(({ key, label }) => {
    const btn = document.createElement('button');
    btn.className = 'side-tab-btn' + (currentTab === key ? ' active' : '');
    btn.textContent = label;
    btn.addEventListener('click', () => {
      navigateToApp(key);
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
  if (!container) return;
  container.innerHTML = '';
  const genres = [...new Set(currentFilterData.flatMap(item => item.genre ?? []))].sort();
  ['Tous', ...genres].forEach(genre => {
    const el = document.createElement('button');
    el.className = 'side-genre-chip' + (currentGenre === genre ? ' active' : '');
    el.textContent = genre;
    el.addEventListener('click', () => {
      currentGenre = genre;
      updateGenreDropdownLabel();
      render();
      renderSideGenre();
      renderSideStats();
    });
    container.appendChild(el);
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

document.getElementById('home-strip-films')    .addEventListener('click', () => navigateToApp('films'));
document.getElementById('home-strip-series')   .addEventListener('click', () => navigateToApp('series'));
document.getElementById('home-strip-watchlist').addEventListener('click', () => navigateToApp('watchlist'));

function exportToLetterboxd() {
  if (!films.length) { alert('Aucun film à exporter.'); return; }
  const rows = [['Title', 'Year', 'Directors', 'Rating10']];
  films.forEach(f => {
    rows.push([
      `"${(f.title    || '').replace(/"/g, '""')}"`,
      f.year      || '',
      `"${(f.director || '').replace(/"/g, '""')}"`,
      f.stars     || '',
    ]);
  });
  const csv  = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'letterboxd-import.csv';
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('export-letterboxd-btn').addEventListener('click', () => {
  exportToLetterboxd();
  closeSideMenu();
});

document.getElementById('menu-btn').addEventListener('click', openSideMenu);
document.getElementById('side-menu-close').addEventListener('click', closeSideMenu);
sideMenuBackdrop.addEventListener('click', closeSideMenu);



// ============================================================
//  ADMIN PANEL
// ============================================================

const TMDB_KEY = '528e49ad32fae0daa4734b34d9a758af';
const TMDB_IMG = 'https://image.tmdb.org/t/p/w500';

let adminData        = { films: [], series: [], anime: [], watchlist: [] };
let adminDataLoaded  = false;
let adminTab         = 'films';
let adminEditingIdx  = null;

let _adminFromHome = false;
let _quickAddMode  = false;

function openAdminPanel(fromHome = false) {
  _adminFromHome = fromHome;
  userMenu.classList.remove('open');
  document.getElementById('admin-panel').classList.remove('hidden');
  adminTab = ['films', 'series', 'anime', 'watchlist'].includes(currentTab) ? currentTab : 'films';
  adminLoadData(currentUser.uid);
}

function closeAdminPanel() {
  document.getElementById('admin-panel').classList.add('hidden');
  document.getElementById('admin-filter').value = '';
  document.getElementById('admin-search-bar').classList.remove('has-value');
  if (currentUser) loadUserData(currentUser.uid);
  if (_adminFromHome) { _adminFromHome = false; showHomePage(); }
}

document.getElementById('admin-back-btn').addEventListener('click', closeAdminPanel);

async function quickAddToWatchlist() {
  if (!currentUser) return;
  _quickAddMode = true;
  if (!adminDataLoaded) {
    const snap = await db.ref(`users/${currentUser.uid}`).once('value');
    const d = snap.val() || {};
    adminData = {
      films:     Object.values(d.films     || {}),
      series:    Object.values(d.series    || {}),
      anime:     Object.values(d.anime     || {}),
      watchlist: Object.values(d.watchlist || {}),
    };
    adminDataLoaded = true;
  }
  adminTab = 'watchlist';
  openAdminModal(null);
}

// ── Load / Save ───────────────────────────────────────────────
async function adminLoadData(uid) {
  const snap = await db.ref(`users/${uid}`).once('value');
  const d = snap.val() || {};
  adminData = {
    films:     Object.values(d.films     || {}),
    series:    Object.values(d.series    || {}),
    anime:     Object.values(d.anime     || {}),
    watchlist: Object.values(d.watchlist || {}),
  };
  adminDataLoaded = true;
  adminRenderList();
}

async function adminSaveData() {
  const btn   = document.getElementById('admin-save-btn');
  const label = document.getElementById('admin-save-label');
  label.textContent = 'Sauvegarde…';
  btn.disabled = true;
  try {
    await db.ref(`users/${currentUser.uid}`).update({
      films:     adminData.films,
      series:    adminData.series,
      anime:     adminData.anime,
      watchlist: adminData.watchlist,
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
const ADMIN_PAGE_SIZE = 50;

function adminRenderList(visibleCount = ADMIN_PAGE_SIZE) {
  const list    = document.getElementById('entry-list');
  const countEl = document.getElementById('admin-count-label');
  if (!list || !countEl) return;

  const items    = adminData[adminTab] || [];
  const query    = adminFilterInput?.value.toLowerCase() ?? '';
  const filtered = query ? items.filter(i => i.title.toLowerCase().includes(query)) : items;
  list.innerHTML = '';

  const label = { films: 'film', series: 'série', anime: 'animé', watchlist: 'titre' }[adminTab];
  countEl.textContent = query
    ? `${filtered.length} / ${items.length} ${label}${items.length > 1 ? 's' : ''}`
    : `${items.length} ${label}${items.length > 1 ? 's' : ''}`;

  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">Aucune entrée</div>';
    return;
  }

  const toShow = filtered.slice(0, visibleCount);

  toShow.forEach(item => {
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
        <button class="btn-danger btn-sm btn-del"  data-idx="${realIdx}">✕</button>
      </div>
    `;
    list.appendChild(el);
  });

  list.querySelectorAll('.btn-del').forEach(btn =>
    btn.addEventListener('click', () => adminDeleteEntry(parseInt(btn.dataset.idx))));

  if (filtered.length > visibleCount) {
    const remaining = filtered.length - visibleCount;
    const moreBtn = document.createElement('button');
    moreBtn.className = 'admin-list-more-btn';
    moreBtn.textContent = `Voir ${remaining} de plus`;
    moreBtn.addEventListener('click', () => adminRenderList(visibleCount + ADMIN_PAGE_SIZE));
    list.appendChild(moreBtn);
  }
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
  const isFilm     = adminTab === 'films' || adminTab === 'watchlist';

  document.getElementById('film-fields').classList.toggle('hidden', !isFilm);
  document.getElementById('series-fields').classList.toggle('hidden', isFilm);
  document.getElementById('tmdb-section').classList.toggle('hidden', idx !== null);
  document.getElementById('modal-title-label').textContent = idx === null ? 'Ajouter' : 'Éditer';
  document.getElementById('form-submit').textContent       = idx === null ? 'Ajouter' : 'Mettre à jour';

  const fieldsWrap = document.getElementById('form-fields-wrap');
  const submitBtn  = document.getElementById('form-submit');

  if (idx !== null) {
    fieldsWrap.classList.remove('hidden');
    submitBtn.disabled = false;
    const item = adminData[adminTab][idx];
    document.getElementById('f-title').value    = item.title    || '';
    document.getElementById('f-year').value     = item.year     || '';
    document.getElementById('f-genre').value    = (item.genre   || []).join(', ');
    document.getElementById('f-poster').value   = item.poster   || '';
    document.getElementById('f-backdrop').value = item.backdrop || '';
    adminUpdatePosterPreview(item.poster);
    if (isFilm) {
      document.getElementById('f-director').value = item.director || '';
      document.getElementById('f-cast').value     = (item.cast || []).join(', ');
      document.getElementById('f-time').value     = item.time || '';
    }
  } else {
    fieldsWrap.classList.add('hidden');
    submitBtn.disabled = true;
    document.getElementById('entry-form').reset();
    document.getElementById('tmdb-results').innerHTML = '';
    document.getElementById('tmdb-query').value       = '';
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
  const isFilm = adminTab === 'films' || adminTab === 'watchlist';

  const backdropVal  = document.getElementById('f-backdrop').value.trim();
  const youtubeIdVal = document.getElementById('f-youtube-id').value.trim();
  const entry = {
    title:    document.getElementById('f-title').value.trim(),
    genre:    document.getElementById('f-genre').value.split(',').map(g => g.trim()).filter(Boolean),
    poster:   document.getElementById('f-poster').value.trim(),
    url:      '#',
    year:     parseInt(document.getElementById('f-year').value) || null,
    ...(backdropVal  ? { backdrop:   backdropVal  } : {}),
    ...(youtubeIdVal ? { youtubeId: youtubeIdVal } : {}),
  };

  if (isFilm) {
    entry.director = document.getElementById('f-director').value.trim();
    entry.cast     = document.getElementById('f-cast').value.split(',').map(c => c.trim()).filter(Boolean);
    entry.time     = document.getElementById('f-time').value.trim();
  } else {
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
    entry.addedAt = new Date().toISOString();
    adminData[adminTab].push(entry);
  }

  closeAdminModal();
  adminRenderList();

  if (_quickAddMode) {
    _quickAddMode = false;
    document.getElementById('admin-panel').classList.add('hidden');
    adminSaveData().then(() => loadUserData(currentUser.uid));
  }
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

async function adminTmdbFetchVideos(tmdbType, tmdbId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${tmdbType}/${tmdbId}/videos?api_key=${TMDB_KEY}&include_video_language=fr,en,null`
  );
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
    const isWatch  = adminTab === 'watchlist';
    const endpoint = isFilm
      ? `/search/movie?query=${encodeURIComponent(query)}`
      : isWatch
        ? `/search/multi?query=${encodeURIComponent(query)}`
        : `/search/tv?query=${encodeURIComponent(query)}`;
    const json     = await adminTmdbFetch(endpoint);
    const results  = (json.results || [])
      .filter(r => !isWatch || r.media_type === 'movie' || r.media_type === 'tv')
      .slice(0, 8).map(r => {
        const isMov = isFilm || (isWatch && r.media_type === 'movie');
        return {
          id:     r.id,
          title:  isMov ? r.title : r.name,
          year:   isMov ? r.release_date?.slice(0, 4) : r.first_air_date?.slice(0, 4),
          poster: r.poster_path ? TMDB_IMG + r.poster_path : null,
          type:   isMov ? 'movie' : 'tv',
        };
      });

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
    }

    const genres = (details.genres || []).slice(0, 2).map(g => adminTranslateGenre(g.name));
    document.getElementById('f-genre').value    = genres.join(', ');
    document.getElementById('f-backdrop').value = details.backdrop_path ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}` : '';
    const videosData = await adminTmdbFetchVideos(type, id);
    const trailer = (videosData.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube') || (videosData.results || []).find(v => v.site === 'YouTube');
    document.getElementById('f-youtube-id').value = trailer?.key || '';
    adminUpdatePosterPreview(document.getElementById('f-poster').value);
    const _poster = document.getElementById('f-poster').value;
    const _title  = document.getElementById('f-title').value;
    const _year   = document.getElementById('f-year').value;
    resultsEl.innerHTML = `
      <div class="tmdb-selection-card">
        ${_poster ? `<img class="tmdb-selection-poster" src="${_poster}" alt="" />` : ''}
        <div class="tmdb-selection-info">
          <p class="tmdb-selection-title">${_title}</p>
          ${_year ? `<p class="tmdb-selection-year">${_year}</p>` : ''}
          <p class="tmdb-msg tmdb-success" style="margin-top:6px">✓ Prêt à ajouter</p>
        </div>
      </div>`;
    document.getElementById('form-submit').disabled = false;
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

// ── Import CSV ────────────────────────────────────────────────
function parseCsv(text) {
  const lines = text.trim().split('\n');
  const header = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  return lines.slice(1).map(line => {
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
      else cur += c;
    }
    cols.push(cur.trim());
    const row = {};
    header.forEach((h, i) => row[h] = cols[i] || '');
    return row;
  }).filter(r => r.Title);
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

document.getElementById('admin-import-csv-btn').addEventListener('click', () => {
  document.getElementById('admin-csv-input').click();
});

document.getElementById('admin-csv-input').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file || !currentUser) return;
  e.target.value = '';
  const text = await file.text();
  const rows = parseCsv(text);
  if (!rows.length) return;
  await runCsvImport(rows);
});

async function runCsvImport(rows) {
  const overlay    = document.getElementById('import-overlay');
  const barEl      = document.getElementById('import-progress-bar');
  const statusEl   = document.getElementById('import-status');
  const currentEl  = document.getElementById('import-current');
  const logEl      = document.getElementById('import-log');
  const doneBtn    = document.getElementById('import-done-btn');

  overlay.classList.remove('hidden');
  logEl.innerHTML = '';
  doneBtn.classList.add('hidden');

  const imported = [];
  const errors   = [];
  const total    = rows.length;

  function logLine(msg, type = '') {
    const p = document.createElement('p');
    p.className = type ? `import-log-${type}` : '';
    p.textContent = msg;
    logEl.appendChild(p);
    logEl.scrollTop = logEl.scrollHeight;
  }

  for (let i = 0; i < total; i++) {
    const row = rows[i];
    const title  = row['Title']     || '';
    const year   = row['Year']      || '';
    const director = row['Directors'] || '';
    const rating = parseInt(row['Rating10']) || null;

    barEl.style.width = `${Math.round((i / total) * 100)}%`;
    statusEl.textContent = `${i + 1} / ${total} films traités`;
    currentEl.textContent = title;

    try {
      // Search TMDB
      const searchRes = await adminTmdbFetch(
        `/search/movie?query=${encodeURIComponent(title)}&year=${year}&include_adult=false`
      );
      await delay(150);

      const match = (searchRes.results || []).find(r =>
        r.release_date?.startsWith(year)
      ) || searchRes.results?.[0];

      if (!match) {
        logLine(`✕ Non trouvé : ${title} (${year})`, 'err');
        errors.push(title);
        continue;
      }

      // Fetch full details with credits
      const details = await adminTmdbFetch(`/movie/${match.id}?append_to_response=credits`);
      await delay(150);

      const h = Math.floor((details.runtime || 0) / 60);
      const m = (details.runtime || 0) % 60;
      const timeStr = details.runtime ? (m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`) : '';
      const genres  = (details.genres || []).slice(0, 2).map(g => adminTranslateGenre(g.name));
      const cast     = (details.credits?.cast || []).slice(0, 8).map(c => c.name);
      const poster   = details.poster_path   ? TMDB_IMG + details.poster_path : '';
      const backdrop = details.backdrop_path ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}` : '';

      const entry = {
        title:    details.title || title,
        year:     parseInt(details.release_date?.slice(0, 4) || year) || null,
        genre:    genres,
        poster,
        ...(backdrop ? { backdrop } : {}),
        url:      '#',
        director: director || (details.credits?.crew?.find(c => c.job === 'Director')?.name || ''),
        cast,
        time:     timeStr,
      };
      if (rating) entry.stars = rating;

      imported.push(entry);
      logLine(`✓ ${entry.title} (${entry.year})`, 'ok');

    } catch(err) {
      logLine(`✕ Erreur : ${title} — ${err.message}`, 'err');
      errors.push(title);
    }
  }

  // Save to Firebase
  barEl.style.width = '100%';
  statusEl.textContent = 'Sauvegarde dans Firebase…';
  currentEl.textContent = '';
  try {
    if (!adminDataLoaded) await adminLoadData(currentUser.uid);
    adminData.films = imported;
    await adminSaveData();
    await loadUserData(currentUser.uid);
    statusEl.textContent = `✓ Import terminé — ${imported.length} films importés, ${errors.length} erreurs.`;
  } catch(err) {
    statusEl.textContent = `Erreur de sauvegarde : ${err.message}`;
  }

  doneBtn.classList.remove('hidden');
}

document.getElementById('import-done-btn').addEventListener('click', () => {
  document.getElementById('import-overlay').classList.add('hidden');
});

// ── Fetch Trailers ────────────────────────────────────────────

async function runFetchTrailers() {
  if (!currentUser) return;

  const overlay   = document.getElementById('trailers-overlay');
  const barEl     = document.getElementById('trailers-progress-bar');
  const statusEl  = document.getElementById('trailers-status');
  const currentEl = document.getElementById('trailers-current');
  const logEl     = document.getElementById('trailers-log');
  const doneBtn   = document.getElementById('trailers-done-btn');

  overlay.classList.remove('hidden');
  logEl.innerHTML = '';
  doneBtn.classList.add('hidden');
  barEl.style.width = '0%';

  function log(msg, type = '') {
    const p = document.createElement('p');
    p.className = type ? `import-log-${type}` : '';
    p.textContent = msg;
    logEl.appendChild(p);
    logEl.scrollTop = logEl.scrollHeight;
  }

  const snap = await db.ref(`users/${currentUser.uid}`).once('value');
  const d = snap.val() || {};
  const lists = {
    films:  Object.entries(d.films  || {}),
    series: Object.entries(d.series || {}),
    anime:  Object.entries(d.anime  || {}),
  };

  const allEntries = [
    ...lists.films.map(([k, v])  => ({ key: k, item: v, list: 'films',  isSeries: false })),
    ...lists.series.map(([k, v]) => ({ key: k, item: v, list: 'series', isSeries: true  })),
    ...lists.anime.map(([k, v])  => ({ key: k, item: v, list: 'anime',  isSeries: true  })),
  ].filter(e => e.item && e.item.title && !e.item.youtubeId);

  const total = allEntries.length;
  if (total === 0) {
    statusEl.textContent = '✓ Tous les titres ont déjà une bande-annonce.';
    doneBtn.classList.remove('hidden');
    return;
  }

  statusEl.textContent = `0 / ${total} titres traités`;
  let updated = 0, failed = 0;

  for (let i = 0; i < allEntries.length; i++) {
    const { key, item, list, isSeries } = allEntries[i];
    barEl.style.width = `${Math.round((i / total) * 100)}%`;
    statusEl.textContent = `${i + 1} / ${total} titres traités`;
    currentEl.textContent = item.title;

    try {
      const q = encodeURIComponent(item.title);
      let tmdbId = null, tmdbType = null;

      if (isSeries) {
        const tv = await adminTmdbFetch(`/search/tv?query=${q}`);
        if (tv.results?.length) { tmdbId = tv.results[0].id; tmdbType = 'tv'; }
        else {
          const mv = await adminTmdbFetch(`/search/movie?query=${q}`);
          if (mv.results?.length) { tmdbId = mv.results[0].id; tmdbType = 'movie'; }
        }
      } else {
        const mv = await adminTmdbFetch(`/search/movie?query=${q}`);
        if (mv.results?.length) { tmdbId = mv.results[0].id; tmdbType = 'movie'; }
        else {
          const tv = await adminTmdbFetch(`/search/tv?query=${q}`);
          if (tv.results?.length) { tmdbId = tv.results[0].id; tmdbType = 'tv'; }
        }
      }

      if (!tmdbId) { log(`⚠ Non trouvé : ${item.title}`, 'err'); failed++; await delay(250); continue; }

      const videos = await adminTmdbFetchVideos(tmdbType, tmdbId);
      const trailer = (videos.results || []).find(v => v.type === 'Trailer' && v.site === 'YouTube')
                   || (videos.results || []).find(v => v.site === 'YouTube');

      if (!trailer) { log(`⚠ Pas de trailer : ${item.title}`, 'err'); failed++; await delay(250); continue; }

      await db.ref(`users/${currentUser.uid}/${list}/${key}/youtubeId`).set(trailer.key);
      log(`✓ ${item.title}`, 'ok');
      updated++;
      await delay(280);
    } catch (err) {
      log(`✕ Erreur : ${item.title} — ${err.message}`, 'err');
      failed++;
      await delay(280);
    }
  }

  barEl.style.width = '100%';
  statusEl.textContent = `✓ Terminé — ${updated} ajoutés, ${failed} échecs.`;
  currentEl.textContent = '';
  doneBtn.classList.remove('hidden');
  await loadUserData(currentUser.uid);
}

document.getElementById('trailers-done-btn').addEventListener('click', () => {
  document.getElementById('trailers-overlay').classList.add('hidden');
});

