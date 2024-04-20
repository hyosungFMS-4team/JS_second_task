// TODO: localstorage 확인
// 개인별 음악, 사진 목록 위치 지정
const musicsSrcs = [
    '../Audio/first.mp3',
    '../Audio/second.mp3',
    '../Audio/thirdlonglonglong.mp3'
];
const musicImgSrcs = [
    '../image/audio/first.jpg',
    '../image/audio/second.png'
]

function loadMusic() {
    console.log('load music ', musicIndex);
    audioSrc.src = musicsSrcs[musicIndex];
    audio.load();
}

function onMusicLoaded() {
    const title = musicsSrcs[musicIndex].split('/')[1].split('.')[0];

    audioTitle.innerText = title;
    audioImage.src = musicImgSrcs[musicIndex];
    console.log('music loaded ', title);
    playMusic();
}

function playMusic() {
    console.log('music played');
    isPlaying = true;
    audioImageContainer.classList.add('spin');
    audio.play();
}
function pauseMusic() {
    console.log('music paused');
    isPlaying = false;
    audioImageContainer.classList.remove('spin');
    audio.pause();
}

function onPlayButtonClicked() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}
function onPrevButtonClicked() {
    musicIndex -= 1;
    if (musicIndex < 0) {
        musicIndex = musicsSrcs.length - 1;
    }
    loadMusic(musicIndex);
}
function onNextButtonClicked() {
    musicIndex = (musicIndex + 1) % musicsSrcs.length;
    loadMusic(musicIndex);
}

function addEventListeners() {
    audio.addEventListener("loadeddata", () => onMusicLoaded());
    audioBtnPlay.addEventListener('click', () => onPlayButtonClicked());
    audioBtnPrev.addEventListener('click', () => onPrevButtonClicked());
    audioBtnNext.addEventListener('click', () => onNextButtonClicked());
}

function addAudioPlayerToBody() {
    document.body.innerHTML += `
    <div class="audio_player pixel_border">
        <audio>
            <source id="audio_src" src="" type="audio/mpeg">
        </audio>

        <div class="audio_player_image_and_title">
            <div class="audio_player_lp">
                <div class="audio_player_image circle spin">
                    <img id="audio_player_image" class="" src="../image/audio/first.jpg"/>
                    <div id="audio_player_image_center" class="circle"></div>
                </div>
                <img id="audio_player_image_needle" class=" " src="../image/audio/lpneedle.png"/>
            </div>
            <div class="audio_player_title">TITLE</div>
        </div>

        <div class="audio_player_controller">
            <button id="audio_player_controller_prev">
                <img src="../image/audio/btn_prev.png"/>
            </button>
            <label class="swap swap-rotate">
                <input id="audio_player_controller_play" type="checkbox" />
                <img src="../image/audio/btn_play.png" class="swap-on"/>
                <img src="../image/audio/btn_pause.png" class="swap-off"/>
            </label>
            <button id="audio_player_controller_next">
                <img src="../image/audio/btn_next.png"/>
            </button>
        </div>
    </div> `;
}

//main
addAudioPlayerToBody();
let musicIndex = 0;

const audio = document.querySelector('audio');
const audioSrc = document.getElementById('audio_src');
let isPlaying = true;

const audioBtnPlay = document.getElementById('audio_player_controller_play');
const audioBtnPrev = document.getElementById('audio_player_controller_prev');
const audioBtnNext = document.getElementById('audio_player_controller_next');

const audioImageContainer = document.querySelector('.audio_player_image');
const audioImage = document.getElementById('audio_player_image');
const audioTitle = document.querySelector('.audio_player_title');

addEventListeners();
loadMusic(musicIndex);