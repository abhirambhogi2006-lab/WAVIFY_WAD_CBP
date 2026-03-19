let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp3');
const logoSvg = document.getElementById('logoSvg');

function setPlayingState(playing) {
    if (playing) {
        play.classList.replace('fa-circle-play', 'fa-circle-pause');
        logoSvg.classList.add('playing');
    } else {
        play.classList.replace('fa-circle-pause', 'fa-circle-play');
        logoSvg.classList.remove('playing');
    }
}

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
        openNowPlaying();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'Die With A Smile', songDes: 'Lady Gaga & Bruno Mars', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Shape of You', songDes: 'Ed Sheeran', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Stay', songDes: 'The Kid LAROI & Justin Bieber', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Levitating', songDes: 'Dua Lipa ft. DaBaby', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Peaches', songDes: 'Justin Bieber ft. Daniel Caesar', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Good 4 U', songDes: 'Olivia Rodrigo', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Montero', songDes: 'Lil Nas X', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Save Your Tears', songDes: 'The Weeknd & Ariana Grande', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Butter', songDes: 'BTS', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Dynamite', songDes: 'BTS', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Watermelon Sugar', songDes: 'Harry Styles', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'drivers license', songDes: 'Olivia Rodrigo', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Mood', songDes: '24kGoldn ft. iann dior', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Positions', songDes: 'Ariana Grande', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Therefore I Am', songDes: 'Billie Eilish', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Happier Than Ever', songDes: 'Billie Eilish', songImage: 'Images/16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Heat Waves', songDes: 'Glass Animals', songImage: 'Images/17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'As It Was', songDes: 'Harry Styles', songImage: 'Images/18.jpg', songPath: 'Audio/18.mp3' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});


// ── Auth ──────────────────────────────────────────────
const API = 'http://localhost:3000';

const authModal      = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const authTitle      = document.getElementById('authTitle');
const authUsername   = document.getElementById('authUsername');
const authPassword   = document.getElementById('authPassword');
const authSubmit     = document.getElementById('authSubmit');
const authError      = document.getElementById('authError');
const authSwitchLink = document.getElementById('authSwitchLink');
const navLogin       = document.getElementById('navLogin');
const navSignup      = document.getElementById('navSignup');
const userInfo       = document.getElementById('userInfo');
const loggedUsername = document.getElementById('loggedUsername');
const logoutBtn      = document.getElementById('logoutBtn');

let isLoginMode = true;
let currentUser = null;

function openAuthModal(loginMode) {
    isLoginMode = loginMode;
    authTitle.innerText = loginMode ? 'Welcome back' : 'Create account';
    authSubmit.innerText = loginMode ? 'Log in' : 'Sign up';
    document.querySelector('.auth-subtitle').innerText = loginMode
        ? 'Log in to access your playlists'
        : 'Sign up to start building playlists';
    document.querySelector('.auth-switch').innerHTML = loginMode
        ? `Don't have an account? <span id="authSwitchLink">Sign up</span>`
        : `Already have an account? <span id="authSwitchLink">Log in</span>`;
    document.getElementById('authSwitchLink').addEventListener('click', () => openAuthModal(!isLoginMode));
    authUsername.value = ''; authPassword.value = '';
    authError.classList.add('hidden'); authError.innerText = '';
    authModal.classList.add('active');
}

navLogin.addEventListener('click', () => openAuthModal(true));
navSignup.addEventListener('click', () => openAuthModal(false));
closeAuthModal.addEventListener('click', () => authModal.classList.remove('active'));
authModal.addEventListener('click', (e) => { if (e.target === authModal) authModal.classList.remove('active'); });
authSwitchLink.addEventListener('click', () => openAuthModal(!isLoginMode));

authSubmit.addEventListener('click', async () => {
    const username = authUsername.value.trim();
    const password = authPassword.value.trim();
    if (!username || !password) {
        authError.innerText = 'Please fill in all fields.';
        authError.classList.remove('hidden'); return;
    }
    try {
        const res = await fetch(`${API}${isLoginMode ? '/login' : '/signup'}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) {
            authError.innerText = data.error;
            authError.classList.remove('hidden'); return;
        }
        loginUser(data.username);
    } catch {
        authError.innerText = 'Cannot connect to server. Make sure server is running.';
        authError.classList.remove('hidden');
    }
});

function loginUser(username) {
    currentUser = username;
    sessionStorage.setItem('spotify_session', username);
    authModal.classList.remove('active');
    navLogin.classList.add('hidden');
    navSignup.classList.add('hidden');
    userInfo.classList.remove('hidden');
    loggedUsername.innerText = username;
    document.querySelector('.input-box').value = '';
    loadUserPlaylists();
    loadUserTheme(username);
    loadUserAvatar(username);
}

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    sessionStorage.removeItem('spotify_session');
    navLogin.classList.remove('hidden');
    navSignup.classList.remove('hidden');
    userInfo.classList.add('hidden');
    loggedUsername.innerText = '';
    document.querySelectorAll('.playlist-entry').forEach(e => e.remove());
    libGrid.innerHTML = '';
    applyTheme('default');
    applyAvatar('');
    showLibraryGuest();
});

async function saveCurrentPlaylists() {
    if (!currentUser) return;
    const playlists = Array.from(document.querySelectorAll('.playlist-entry')).map(entry => ({
        name: entry.dataset.plName,
        songs: JSON.parse(entry.dataset.plSongs)
    }));
    await fetch(`${API}/playlists/${currentUser}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlists })
    });
}

async function loadUserPlaylists() {
    document.querySelectorAll('.playlist-entry').forEach(e => e.remove());
    libGrid.innerHTML = '';
    const res = await fetch(`${API}/playlists/${currentUser}`);
    const data = await res.json();
    showLibraryLoggedIn();
    (data.playlists || []).forEach(pl => addPlaylistEntry(pl.name, pl.songs));
    updateLibEmpty();
}

// ── Create Playlist ────────────────────────────────────
const playlistModal    = document.getElementById('playlistModal');
const closeModal       = document.getElementById('closeModal');
const confirmCreate    = document.getElementById('confirmCreate');
const songListEl       = document.getElementById('songList');
const playlistNameInput= document.getElementById('playlistName');
const boxContainer     = document.querySelector('.box-container');
const playlistView     = document.getElementById('playlistView');
const playlistViewName = document.getElementById('playlistViewName');
const playlistViewCount= document.getElementById('playlistViewCount');
const playlistViewCover= document.getElementById('playlistViewCover');
const playlistViewSongs= document.getElementById('playlistViewSongs');
const backToMain       = document.getElementById('backToMain');

const libGuest      = document.getElementById('libGuest');
const libPlaylists  = document.getElementById('libPlaylists');
const libEmpty      = document.getElementById('libEmpty');
const libGrid       = document.getElementById('libGrid');
const libraryAddBtn = document.getElementById('libraryAddBtn');
const libLoginBtn   = document.getElementById('libLoginBtn');

function showLibraryGuest() {
    libGuest.classList.remove('hidden');
    libPlaylists.classList.add('hidden');
}
function showLibraryLoggedIn() {
    libGuest.classList.add('hidden');
    libPlaylists.classList.remove('hidden');
}
function updateLibEmpty() {
    const hasCards = libGrid.querySelectorAll('.lib-card').length > 0;
    libEmpty.classList.toggle('hidden', hasCards);
}

libLoginBtn.addEventListener('click', () => openAuthModal(true));
libraryAddBtn.addEventListener('click', () => {
    if (!currentUser) { openAuthModal(true); return; }
    openPlaylistModal();
});

function openPlaylistModal() {
    songListEl.innerHTML = '';
    playlistNameInput.value = '';
    songs.forEach((song, i) => {
        const item = document.createElement('label');
        item.className = 'song-item';
        item.innerHTML = `
            <input type="checkbox" value="${i}">
            <img src="${song.songImage}" alt="">
            <div class="song-item-info">
                <span class="song-item-name">${song.songName}</span>
                <span class="song-item-des">${song.songDes}</span>
            </div>`;
        songListEl.appendChild(item);
    });
    playlistModal.classList.add('active');
}

closeModal.addEventListener('click', () => playlistModal.classList.remove('active'));
playlistModal.addEventListener('click', (e) => { if (e.target === playlistModal) playlistModal.classList.remove('active'); });

confirmCreate.addEventListener('click', () => {
    const name = playlistNameInput.value.trim() || 'My Playlist';
    const checked = Array.from(songListEl.querySelectorAll('input[type="checkbox"]:checked'));
    if (checked.length === 0) { playlistNameInput.placeholder = 'Select at least one song!'; return; }
    const selectedSongs = checked.map(cb => songs[parseInt(cb.value)]);
    addPlaylistEntry(name, selectedSongs);
    if (currentUser) saveCurrentPlaylists();
    playlistModal.classList.remove('active');
});

function addPlaylistEntry(name, selectedSongs) {
    // hidden entry kept for saveCurrentPlaylists compatibility
    const entry = document.createElement('div');
    entry.className = 'playlist-entry hidden';
    entry.dataset.plName = name;
    entry.dataset.plSongs = JSON.stringify(selectedSongs);
    document.body.appendChild(entry);

    const card = document.createElement('div');
    card.className = 'lib-card';
    card.innerHTML = `
        <div class="lib-card-cover">
            <img src="${selectedSongs[0].songImage}" alt="">
            <div class="lib-card-play"><i class="fa-solid fa-circle-play"></i></div>
        </div>
        <div class="lib-card-info">
            <span class="lib-card-name">${name}</span>
            <span class="lib-card-count">${selectedSongs.length} song${selectedSongs.length > 1 ? 's' : ''}</span>
        </div>
        <i class="fa-solid fa-trash lib-card-delete" title="Delete"></i>`;

    card.querySelector('.lib-card-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        card.remove();
        entry.remove();
        if (currentUser) saveCurrentPlaylists();
        updateLibEmpty();
    });
    card.addEventListener('click', () => openPlaylistView(name, selectedSongs, { remove: () => { card.remove(); entry.remove(); updateLibEmpty(); } }));
    libGrid.appendChild(card);
    updateLibEmpty();
}

let currentPlaylistSongs = [];
let currentPlaylistIndex = -1;

function openPlaylistView(name, plSongs, entryEl) {
    currentPlaylistSongs = plSongs;
    playlistViewName.innerText = name;
    playlistViewCount.innerText = `${plSongs.length} song${plSongs.length > 1 ? 's' : ''}`;
    playlistViewCover.src = plSongs[0].songImage;
    playlistViewSongs.innerHTML = '';

    const existingDel = document.getElementById('playlistViewDelete');
    if (existingDel) existingDel.replaceWith(existingDel.cloneNode(true));
    document.getElementById('playlistViewDelete').onclick = () => {
        if (entryEl && typeof entryEl.remove === 'function') entryEl.remove();
        if (currentUser) saveCurrentPlaylists();
        playlistView.classList.add('hidden');
    };

    plSongs.forEach((song, i) => {
        const row = document.createElement('div');
        row.className = 'pl-song-row';
        row.dataset.index = i;
        row.innerHTML = `
            <span class="pl-song-num">${i + 1}</span>
            <i class="fa-solid fa-circle-play pl-play-icon"></i>
            <img src="${song.songImage}" alt="">
            <div class="pl-song-details">
                <span class="pl-song-title">${song.songName}</span>
                <span class="pl-song-desc">${song.songDes}</span>
            </div>`;
        row.addEventListener('click', () => playPlaylistSong(i));
        playlistViewSongs.appendChild(row);
    });
    playlistView.classList.remove('hidden');
}

function playPlaylistSong(i) {
    currentPlaylistIndex = i;
    const song = currentPlaylistSongs[i];
    audio.src = song.songPath;
    audio.currentTime = 0;
    audio.play();
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
    updateNowBar_playlist(song);
    highlightPlaylistRow(i);
}

function highlightPlaylistRow(i) {
    document.querySelectorAll('.pl-song-row').forEach((r, idx) => {
        r.classList.toggle('playing', idx === i);
    });
}

function updateNowBar_playlist(song) {
    nowBar.getElementsByTagName('img')[0].src = song.songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = song.songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = song.songDes;
}

backToMain.addEventListener('click', () => playlistView.classList.add('hidden'));

// ── Visualizer ───────────────────────────────────────────────────────────────
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

let audioCtx, analyser, source, animFrameId;
let visualizerRunning = false;

function initVisualizer() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
}

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function drawVisualizer() {
    animFrameId = requestAnimationFrame(drawVisualizer);
    resizeCanvas();

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;
        const green = 166 + Math.floor((dataArray[i] / 255) * 89);
        ctx.fillStyle = `rgba(33, ${green}, 0, 0.45)`;
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 3);
        ctx.fill();
        x += barWidth;
    }
}

function startVisualizer() {
    initVisualizer();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    canvas.classList.add('active');
    if (!visualizerRunning) {
        visualizerRunning = true;
        drawVisualizer();
    }
}

function stopVisualizer() {
    canvas.classList.remove('active');
    cancelAnimationFrame(animFrameId);
    visualizerRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

audio.addEventListener('play', startVisualizer);
audio.addEventListener('pause', stopVisualizer);
audio.addEventListener('ended', stopVisualizer);
audio.addEventListener('play',  () => setPlayingState(true));
audio.addEventListener('pause', () => setPlayingState(false));
audio.addEventListener('ended', () => setPlayingState(false));

// ── Search ────────────────────────────────────────────────────────────────────
const searchInput = document.querySelector('.input-box');
const searchDropdown = document.createElement('div');
searchDropdown.className = 'search-dropdown';
document.querySelector('.search-bar').appendChild(searchDropdown);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchDropdown.innerHTML = '';
    if (!query) { searchDropdown.classList.remove('active'); return; }

    const matches = songs.filter(s =>
        s.songName.toLowerCase().includes(query) ||
        s.songDes.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        searchDropdown.innerHTML = '<div class="search-no-result">No results found</div>';
        searchDropdown.classList.add('active');
        return;
    }

    matches.forEach(song => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
            <img src="${song.songImage}" alt="">
            <div class="search-result-info">
                <span class="search-result-name">${song.songName}</span>
                <span class="search-result-des">${song.songDes}</span>
            </div>
            <i class="fa-solid fa-circle-play search-play-icon"></i>`;
        item.addEventListener('click', () => {
            const idx = songs.indexOf(song);
            currentSong = idx + 1;
            audio.src = song.songPath;
            audio.currentTime = 0;
            audio.play();
            play.classList.remove('fa-circle-play');
            play.classList.add('fa-circle-pause');
            updateNowBar_playlist(song);
            searchInput.value = '';
            searchDropdown.classList.remove('active');
        });
        searchDropdown.appendChild(item);
    });
    searchDropdown.classList.add('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) searchDropdown.classList.remove('active');
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { searchDropdown.classList.remove('active'); searchInput.value = ''; }
});
// ── Theme & Avatar Logic ──
const themeModal      = document.getElementById('themeModal');
const themeClose      = document.getElementById('themeClose');
const premiumBtn      = document.getElementById('premiumBtn');
const userAvatarIcon  = document.getElementById('userAvatarIcon');
const userAvatarImg   = document.getElementById('userAvatarImg');

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme === 'default' ? '' : theme);
    document.querySelectorAll('.theme-card').forEach(c => {
        c.classList.toggle('selected', c.dataset.theme === theme);
    });
}

function getUserThemeKey(username) { return `wavify_theme_${username}`; }
function getUserAvatarKey(username) { return `wavify_avatar_${username}`; }

function loadUserTheme(username) {
    const saved = localStorage.getItem(getUserThemeKey(username)) || 'default';
    applyTheme(saved);
}

function applyAvatar(avatarId) {
    if (!avatarId) {
        userAvatarIcon.classList.remove('hidden');
        userAvatarImg.classList.add('hidden');
        return;
    }
    const [style, seed] = avatarId.split('/');
    const bgMap = {
        'adventurer/Aneka': 'b6e3f4', 'adventurer/Felix': 'c0aede',
        'adventurer/Mia': 'ffd5dc', 'adventurer/Zoe': 'd1f4d1',
        'adventurer/Leo': 'ffdfbf', 'adventurer/Luna': 'e8d5f5',
        'lorelei/Jasper': 'b6e3f4', 'lorelei/Nova': 'ffd5dc', 'lorelei/Orion': 'c0aede'
    };
    const bg = bgMap[avatarId] ? `&backgroundColor=${bgMap[avatarId]}` : '';
    userAvatarImg.src = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}${bg}`;
    userAvatarImg.classList.remove('hidden');
    userAvatarIcon.classList.add('hidden');
    document.querySelectorAll('.avatar-option').forEach(o => {
        o.classList.toggle('selected', o.dataset.avatar === avatarId);
    });
}

function loadUserAvatar(username) {
    const saved = localStorage.getItem(getUserAvatarKey(username)) || '';
    applyAvatar(saved);
}

premiumBtn.addEventListener('click', () => {
    if (!currentUser) { openAuthModal(true); return; }
    const savedTheme = localStorage.getItem(getUserThemeKey(currentUser)) || 'default';
    applyTheme(savedTheme);
    const savedAvatar = localStorage.getItem(getUserAvatarKey(currentUser)) || '';
    applyAvatar(savedAvatar);
    themeModal.classList.add('active');
});

themeClose.addEventListener('click', () => themeModal.classList.remove('active'));
themeModal.addEventListener('click', e => { if (e.target === themeModal) themeModal.classList.remove('active'); });

document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', () => {
        const theme = card.dataset.theme;
        applyTheme(theme);
        if (currentUser) localStorage.setItem(getUserThemeKey(currentUser), theme);
        setTimeout(() => themeModal.classList.remove('active'), 400);
    });
});

document.querySelectorAll('.avatar-option').forEach(opt => {
    opt.addEventListener('click', () => {
        const avatarId = opt.dataset.avatar;
        applyAvatar(avatarId);
        if (currentUser) localStorage.setItem(getUserAvatarKey(currentUser), avatarId);
        setTimeout(() => themeModal.classList.remove('active'), 400);
    });
});

(function checkSession() {
    const saved = sessionStorage.getItem('spotify_session');
    if (saved) { loginUser(saved); loadUserTheme(saved); loadUserAvatar(saved); }
    else { showLibraryGuest(); }
})();

// ── Now Playing Page ────────────────────────────────────
const npOverlay  = document.getElementById('npOverlay');
const npClose    = document.getElementById('npClose');
const npArt      = document.getElementById('npArt');
const npGlow     = document.getElementById('npGlow');
const npSongName = document.getElementById('npSongName');
const npSongDes  = document.getElementById('npSongDes');
const npProgress = document.getElementById('npProgress');
const npCurrent  = document.getElementById('npCurrent');
const npDuration = document.getElementById('npDuration');
const npPlay     = document.getElementById('npPlay');
const npNext     = document.getElementById('npNext');
const npPrev     = document.getElementById('npPrev');
const npShuffle  = document.getElementById('npShuffle');
const npRepeat   = document.getElementById('npRepeat');
const npVolume   = document.getElementById('npVolume');
const npCanvas   = document.getElementById('npVisualizer');
const npCtx      = npCanvas.getContext('2d');
const npNotes    = document.getElementById('npNotes');

let npAnimId, npVisualizerRunning = false, noteInterval;

function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}

function openNowPlaying() {
    const song = order[currentSong - 1];
    npArt.src      = song.songImage;
    npSongName.innerText = song.songName;
    npSongDes.innerText  = song.songDes;
    npGlow.style.background = `radial-gradient(circle, var(--accent) 0%, transparent 70%)`;
    npOverlay.classList.remove('hidden', 'slide-out');
    npOverlay.classList.add('slide-in');
    syncNpPlayBtn();
    syncNpShuffleRepeat();
    startNpVisualizer();
    startFloatingNotes();
}

function closeNowPlaying() {
    npOverlay.classList.add('slide-out');
    npOverlay.addEventListener('animationend', () => {
        npOverlay.classList.add('hidden');
        npOverlay.classList.remove('slide-out', 'slide-in');
    }, { once: true });
    stopNpVisualizer();
    stopFloatingNotes();
}

function syncNpPlayBtn() {
    if (audio.paused) {
        npPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
        npOverlay.classList.add('paused');
    } else {
        npPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
        npOverlay.classList.remove('paused');
    }
}

function syncNpShuffleRepeat() {
    npShuffle.classList.toggle('active', songOnShuffle);
    npRepeat.classList.toggle('active', songOnRepeat);
}

function updateNpBar() {
    const song = order[currentSong - 1];
    npArt.src = song.songImage;
    npSongName.innerText = song.songName;
    npSongDes.innerText  = song.songDes;
}

// sync progress
audio.addEventListener('timeupdate', () => {
    npProgress.value = (audio.currentTime / audio.duration) * 100 || 0;
    npCurrent.innerText  = fmtTime(audio.currentTime);
    npDuration.innerText = fmtTime(audio.duration);
    const pct = npProgress.value;
    npProgress.style.background = `linear-gradient(to right, var(--accent) ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;
});

npProgress.addEventListener('input', () => {
    audio.currentTime = (npProgress.value / 100) * audio.duration;
});

npVolume.addEventListener('input', () => {
    audio.volume = npVolume.value / 100;
    const pct = npVolume.value;
    npVolume.style.background = `linear-gradient(to right, var(--accent) ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;
});

npPlay.addEventListener('click', () => {
    if (audio.paused) { audio.play(); } else { audio.pause(); }
});
npNext.addEventListener('click', () => { playNextSong(); updateNpBar(); });
npPrev.addEventListener('click', () => { playPrevSong(); updateNpBar(); });
npShuffle.addEventListener('click', () => { shuffle.click(); syncNpShuffleRepeat(); });
npRepeat.addEventListener('click',  () => { repeat.click();  syncNpShuffleRepeat(); });

audio.addEventListener('play',  () => { syncNpPlayBtn(); startNpVisualizer(); });
audio.addEventListener('pause', () => { syncNpPlayBtn(); stopNpVisualizer(); });
audio.addEventListener('ended', () => { syncNpPlayBtn(); updateNpBar(); });

npClose.addEventListener('click', closeNowPlaying);

// open when clicking a music card image or title
document.querySelectorAll('.music-card').forEach((card, i) => {
    card.addEventListener('dblclick', () => {
        currentSong = i + 1;
        audio.src = songs[i].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
        openNowPlaying();
    });
});

// also open via now-bar click
document.querySelector('.now-bar').addEventListener('click', () => {
    if (audio.src) openNowPlaying();
});

// ── NP Visualizer ──
function startNpVisualizer() {
    if (!npOverlay.classList.contains('hidden')) {
        initVisualizer();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        npCanvas.classList.add('active');
        if (!npVisualizerRunning) {
            npVisualizerRunning = true;
            drawNpVisualizer();
        }
    }
}

function stopNpVisualizer() {
    npCanvas.classList.remove('active');
    cancelAnimationFrame(npAnimId);
    npVisualizerRunning = false;
    npCtx.clearRect(0, 0, npCanvas.width, npCanvas.height);
}

function drawNpVisualizer() {
    npAnimId = requestAnimationFrame(drawNpVisualizer);
    npCanvas.width  = npCanvas.offsetWidth;
    npCanvas.height = npCanvas.offsetHeight;

    if (!analyser) return;
    const bufLen = analyser.frequencyBinCount;
    const data   = new Uint8Array(bufLen);
    analyser.getByteFrequencyData(data);

    npCtx.clearRect(0, 0, npCanvas.width, npCanvas.height);

    // bottom bars
    const bw = (npCanvas.width / bufLen) * 2.5;
    let x = 0;
    for (let i = 0; i < bufLen; i++) {
        const bh = (data[i] / 255) * npCanvas.height * 0.55;
        const alpha = 0.25 + (data[i] / 255) * 0.35;
        npCtx.fillStyle = `rgba(var(--accent-rgb, 29,185,84), ${alpha})`;
        // use CSS var accent color via a trick
        const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#1db954';
        npCtx.fillStyle = hexToRgba(accent, alpha);
        npCtx.beginPath();
        if (npCtx.roundRect) npCtx.roundRect(x, npCanvas.height - bh, bw - 2, bh, 3);
        else npCtx.rect(x, npCanvas.height - bh, bw - 2, bh);
        npCtx.fill();

        // mirror top
        npCtx.fillStyle = hexToRgba(accent, alpha * 0.4);
        npCtx.beginPath();
        if (npCtx.roundRect) npCtx.roundRect(x, 0, bw - 2, bh * 0.4, 3);
        else npCtx.rect(x, 0, bw - 2, bh * 0.4);
        npCtx.fill();

        x += bw;
    }
}

function hexToRgba(hex, alpha) {
    hex = hex.replace('#','');
    if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
    const r = parseInt(hex.slice(0,2),16);
    const g = parseInt(hex.slice(2,4),16);
    const b = parseInt(hex.slice(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// ── Floating Notes ──
const noteChars = ['♪','♫','♬','♩'];
function startFloatingNotes() {
    stopFloatingNotes();
    noteInterval = setInterval(() => {
        const note = document.createElement('span');
        note.className = 'np-note';
        note.innerText = noteChars[Math.floor(Math.random() * noteChars.length)];
        note.style.left = Math.random() * 95 + '%';
        const dur = 4 + Math.random() * 5;
        note.style.animationDuration = dur + 's';
        note.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        note.style.animationDelay = (Math.random() * 1) + 's';
        npNotes.appendChild(note);
        setTimeout(() => note.remove(), (dur + 1) * 1000);
    }, 600);
}
function stopFloatingNotes() {
    clearInterval(noteInterval);
    npNotes.innerHTML = '';
}


// ── Music Assistant ──────────────────────────────────────────────────────────
const assistantBtn      = document.getElementById('assistantBtn');
const assistantOverlay  = document.getElementById('assistantOverlay');
const assistantClose    = document.getElementById('assistantClose');
const assistantMessages = document.getElementById('assistantMessages');
const assistantInput    = document.getElementById('assistantInput');
const assistantSend     = document.getElementById('assistantSend');
const assistantSuggestions = document.getElementById('assistantSuggestions');

const ASSISTANT_KB = [
    {
        keys: ['popular','top songs','trending','right now','chart','billboard','hot 100'],
        reply: `Here are the 🔥 <strong>hottest songs right now</strong>:<ul>
            <li><strong>Die With A Smile</strong> – Lady Gaga & Bruno Mars</li>
            <li><strong>APT.</strong> – ROSÉ & Bruno Mars</li>
            <li><strong>Espresso</strong> – Sabrina Carpenter</li>
            <li><strong>Please Please Please</strong> – Sabrina Carpenter</li>
            <li><strong>Good Luck, Babe!</strong> – Chappell Roan</li>
            <li><strong>Birds of a Feather</strong> – Billie Eilish</li>
            <li><strong>Taste</strong> – Sabrina Carpenter</li>
            <li><strong>LUTHER</strong> – Kendrick Lamar & SZA</li></ul>`
    },
    {
        keys: ['chill','relax','calm','study','sleep','lofi','lo-fi','peaceful','soft'],
        reply: `Here are some 😌 <strong>chill songs</strong> to vibe to:<ul>
            <li><strong>Heather</strong> – Conan Gray</li>
            <li><strong>Golden Hour</strong> – JVKE</li>
            <li><strong>Falling</strong> – Harry Styles</li>
            <li><strong>Liability</strong> – Lorde</li>
            <li><strong>Skinny Love</strong> – Bon Iver</li>
            <li><strong>The Night We Met</strong> – Lord Huron</li>
            <li><strong>Bloom</strong> – The Paper Kites</li></ul>`
    },
    {
        keys: ['workout','gym','energy','pump','run','running','exercise','hype','motivation'],
        reply: `💪 <strong>Workout bangers</strong> to keep you going:<ul>
            <li><strong>POWER</strong> – Kanye West</li>
            <li><strong>Till I Collapse</strong> – Eminem</li>
            <li><strong>Eye of the Tiger</strong> – Survivor</li>
            <li><strong>Lose Yourself</strong> – Eminem</li>
            <li><strong>Can't Hold Us</strong> – Macklemore</li>
            <li><strong>Stronger</strong> – Kanye West</li>
            <li><strong>Blinding Lights</strong> – The Weeknd</li></ul>`
    },
    {
        keys: ['road trip','drive','driving','car','travel','journey'],
        reply: `🚗 <strong>Road trip playlist</strong> essentials:<ul>
            <li><strong>Life is a Highway</strong> – Tom Cochrane</li>
            <li><strong>Mr. Brightside</strong> – The Killers</li>
            <li><strong>Take Me Home, Country Roads</strong> – John Denver</li>
            <li><strong>Africa</strong> – Toto</li>
            <li><strong>Don't Stop Believin'</strong> – Journey</li>
            <li><strong>Bohemian Rhapsody</strong> – Queen</li>
            <li><strong>Sweet Home Alabama</strong> – Lynyrd Skynyrd</li></ul>`
    },
    {
        keys: ['party','dance','club','night out','banger','edm','electronic'],
        reply: `🎉 <strong>Party anthems</strong> to get the floor moving:<ul>
            <li><strong>Levitating</strong> – Dua Lipa</li>
            <li><strong>As It Was</strong> – Harry Styles</li>
            <li><strong>Blinding Lights</strong> – The Weeknd</li>
            <li><strong>Dynamite</strong> – BTS</li>
            <li><strong>Uptown Funk</strong> – Bruno Mars</li>
            <li><strong>Shape of You</strong> – Ed Sheeran</li>
            <li><strong>Bad Guy</strong> – Billie Eilish</li></ul>`
    },
    {
        keys: ['sad','heartbreak','cry','emotional','breakup','miss','lonely','melancholy'],
        reply: `💔 <strong>Songs for the feels</strong>:<ul>
            <li><strong>drivers license</strong> – Olivia Rodrigo</li>
            <li><strong>Happier Than Ever</strong> – Billie Eilish</li>
            <li><strong>Someone Like You</strong> – Adele</li>
            <li><strong>The Night We Met</strong> – Lord Huron</li>
            <li><strong>Skinny Love</strong> – Bon Iver</li>
            <li><strong>Liability</strong> – Lorde</li>
            <li><strong>Fix You</strong> – Coldplay</li></ul>`
    },
    {
        keys: ['pop','pop songs','pop music','best pop','pop classics'],
        reply: `🎵 <strong>Best pop songs of all time</strong>:<ul>
            <li><strong>Thriller</strong> – Michael Jackson</li>
            <li><strong>Baby One More Time</strong> – Britney Spears</li>
            <li><strong>Rolling in the Deep</strong> – Adele</li>
            <li><strong>Shape of You</strong> – Ed Sheeran</li>
            <li><strong>Uptown Funk</strong> – Bruno Mars</li>
            <li><strong>Bad Guy</strong> – Billie Eilish</li>
            <li><strong>Blinding Lights</strong> – The Weeknd</li></ul>`
    },
    {
        keys: ['hip hop','rap','rapper','hiphop','trap'],
        reply: `🎤 <strong>Top Hip-Hop tracks</strong>:<ul>
            <li><strong>God's Plan</strong> – Drake</li>
            <li><strong>HUMBLE.</strong> – Kendrick Lamar</li>
            <li><strong>Sicko Mode</strong> – Travis Scott</li>
            <li><strong>Rockstar</strong> – Post Malone</li>
            <li><strong>Lucid Dreams</strong> – Juice WRLD</li>
            <li><strong>Sunflower</strong> – Post Malone & Swae Lee</li>
            <li><strong>Not Like Us</strong> – Kendrick Lamar</li></ul>`
    },
    {
        keys: ['artist','artists','top artist','best artist','2024','2025'],
        reply: `⭐ <strong>Top artists dominating right now</strong>:<ul>
            <li><strong>Sabrina Carpenter</strong> – Pop queen of 2024</li>
            <li><strong>Kendrick Lamar</strong> – Rap's biggest name</li>
            <li><strong>Chappell Roan</strong> – Breakout star</li>
            <li><strong>Billie Eilish</strong> – Alt-pop icon</li>
            <li><strong>Bruno Mars</strong> – Timeless hitmaker</li>
            <li><strong>Taylor Swift</strong> – Global phenomenon</li>
            <li><strong>The Weeknd</strong> – R&B legend</li></ul>`
    },
    {
        keys: ['taylor','taylor swift','swiftie'],
        reply: `🩵 <strong>Taylor Swift essentials</strong>:<ul>
            <li><strong>Anti-Hero</strong> – Midnights</li>
            <li><strong>Cruel Summer</strong> – Lover</li>
            <li><strong>Shake It Off</strong> – 1989</li>
            <li><strong>All Too Well (10 Min)</strong> – Red (TV)</li>
            <li><strong>cardigan</strong> – folklore</li>
            <li><strong>Love Story</strong> – Fearless (TV)</li></ul>`
    },
    {
        keys: ['billie','billie eilish'],
        reply: `🖤 <strong>Billie Eilish must-listens</strong>:<ul>
            <li><strong>Bad Guy</strong></li>
            <li><strong>Happier Than Ever</strong></li>
            <li><strong>Therefore I Am</strong></li>
            <li><strong>Birds of a Feather</strong></li>
            <li><strong>Ocean Eyes</strong></li>
            <li><strong>Lovely</strong> (ft. Khalid)</li></ul>`
    },
    {
        keys: ['weeknd','the weeknd','abel'],
        reply: `🌙 <strong>The Weeknd's best tracks</strong>:<ul>
            <li><strong>Blinding Lights</strong></li>
            <li><strong>Save Your Tears</strong></li>
            <li><strong>Starboy</strong></li>
            <li><strong>Can't Feel My Face</strong></li>
            <li><strong>Die For You</strong></li>
            <li><strong>After Hours</strong></li></ul>`
    },
    {
        keys: ['rock','rock music','classic rock','guitar'],
        reply: `🎸 <strong>Rock anthems you need</strong>:<ul>
            <li><strong>Bohemian Rhapsody</strong> – Queen</li>
            <li><strong>Hotel California</strong> – Eagles</li>
            <li><strong>Stairway to Heaven</strong> – Led Zeppelin</li>
            <li><strong>Smells Like Teen Spirit</strong> – Nirvana</li>
            <li><strong>Sweet Child O' Mine</strong> – Guns N' Roses</li>
            <li><strong>Mr. Brightside</strong> – The Killers</li></ul>`
    },
    {
        keys: ['love','romantic','romance','date','wedding','couple'],
        reply: `💕 <strong>Perfect love songs</strong>:<ul>
            <li><strong>Perfect</strong> – Ed Sheeran</li>
            <li><strong>All of Me</strong> – John Legend</li>
            <li><strong>Thinking Out Loud</strong> – Ed Sheeran</li>
            <li><strong>Make You Feel My Love</strong> – Adele</li>
            <li><strong>Can't Help Falling in Love</strong> – Elvis</li>
            <li><strong>Golden Hour</strong> – JVKE</li></ul>`
    },
    {
        keys: ['hello','hi','hey','what can you do','help','who are you'],
        reply: `👋 Hey! I'm <strong>Wavify AI</strong>, your personal music assistant! 🎵<br><br>
            I can help you with:<ul>
            <li>🔥 Trending & popular songs</li>
            <li>🎭 Mood-based recommendations</li>
            <li>🎤 Artist discographies</li>
            <li>🎸 Genre playlists</li>
            <li>💡 Music facts & trivia</li></ul>
            Just ask me anything about music!`
    },
    {
        keys: ['fact','trivia','did you know','interesting','music fact'],
        reply: `🎵 <strong>Fun music facts!</strong><ul>
            <li>🎸 <strong>Blinding Lights</strong> by The Weeknd spent 57 weeks in the Billboard Hot 100 top 10 — a record!</li>
            <li>🎤 <strong>Shape of You</strong> by Ed Sheeran is Spotify's most-streamed song ever with 4B+ streams</li>
            <li>🌟 <strong>BTS</strong> became the first K-pop act to top the Billboard Hot 100</li>
            <li>🎹 <strong>Bohemian Rhapsody</strong> took 3 weeks to record in 1975</li>
            <li>🎧 The average person listens to <strong>32 minutes</strong> of music per day</li></ul>`
    },
    {
        keys: ['genre','genres','type of music','music type','what genre'],
        reply: `🎼 <strong>Popular music genres to explore</strong>:<ul>
            <li>🎵 <strong>Pop</strong> – Taylor Swift, Dua Lipa, Sabrina Carpenter</li>
            <li>🎤 <strong>Hip-Hop/Rap</strong> – Drake, Kendrick Lamar, Travis Scott</li>
            <li>🎸 <strong>Rock</strong> – Queen, The Killers, Arctic Monkeys</li>
            <li>🌙 <strong>R&B</strong> – The Weeknd, SZA, Frank Ocean</li>
            <li>🎹 <strong>Indie</strong> – Bon Iver, Phoebe Bridgers, Hozier</li>
            <li>⚡ <strong>EDM</strong> – Calvin Harris, Marshmello, Zedd</li></ul>`
    }
];

function getAssistantReply(input) {
    const q = input.toLowerCase();
    for (const entry of ASSISTANT_KB) {
        if (entry.keys.some(k => q.includes(k))) return entry.reply;
    }
    return `🎵 Great question! I'm not sure about that specifically, but here are some <strong>universally loved songs</strong> you might enjoy:<ul>
        <li><strong>Bohemian Rhapsody</strong> – Queen</li>
        <li><strong>Blinding Lights</strong> – The Weeknd</li>
        <li><strong>Shape of You</strong> – Ed Sheeran</li>
        <li><strong>Bad Guy</strong> – Billie Eilish</li>
        <li><strong>Levitating</strong> – Dua Lipa</li></ul>
        Try asking me about a <strong>mood, genre, artist, or activity</strong>! 🎧`;
}

function addMessage(text, isUser) {
    const row = document.createElement('div');
    row.className = `msg-row ${isUser ? 'user' : 'bot'}`;

    const av = document.createElement('div');
    av.className = `msg-avatar ${isUser ? 'user-av' : ''}`;
    av.innerHTML = isUser ? '👤' : `<svg viewBox="0 0 48 48" style="width:1.1rem;height:1.1rem"><circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.2)"/><path d="M14 26 Q14 16 24 16 Q34 16 34 26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="10" y="25" width="6" height="9" rx="3" fill="white"/><rect x="32" y="25" width="6" height="9" rx="3" fill="white"/></svg>`;

    const bubble = document.createElement('div');
    bubble.className = `msg-bubble ${isUser ? 'user' : 'bot'}`;
    bubble.innerHTML = text;

    row.appendChild(av);
    row.appendChild(bubble);
    assistantMessages.appendChild(row);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function showTyping() {
    const row = document.createElement('div');
    row.className = 'msg-row bot';
    row.id = 'typingRow';
    row.innerHTML = `<div class="msg-avatar"><svg viewBox="0 0 48 48" style="width:1.1rem;height:1.1rem"><circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.2)"/><path d="M14 26 Q14 16 24 16 Q34 16 34 26" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="10" y="25" width="6" height="9" rx="3" fill="white"/><rect x="32" y="25" width="6" height="9" rx="3" fill="white"/></svg></div>
    <div class="msg-bubble bot"><div class="typing-bubble"><span></span><span></span><span></span></div></div>`;
    assistantMessages.appendChild(row);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('typingRow');
    if (t) t.remove();
}

function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, true);
    assistantInput.value = '';
    assistantSuggestions.style.display = 'none';
    showTyping();
    setTimeout(() => {
        removeTyping();
        addMessage(getAssistantReply(text), false);
    }, 900 + Math.random() * 400);
}

assistantSend.addEventListener('click', () => sendMessage(assistantInput.value));
assistantInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(assistantInput.value); });

document.querySelectorAll('.sugg-btn').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.q));
});

assistantBtn.addEventListener('click', () => {
    assistantOverlay.classList.remove('hidden');
    assistantOverlay.classList.add('visible');
    if (assistantMessages.children.length === 0) {
        setTimeout(() => addMessage(`👋 Hey! I'm <strong>Wavify AI</strong> — your personal music guide! 🎵<br>Ask me about trending songs, moods, artists, or genres. What are you in the mood for?`, false), 300);
    }
});

assistantClose.addEventListener('click', () => {
    assistantOverlay.classList.add('hidden');
    assistantOverlay.classList.remove('visible');
});
