const page = window.location.pathname;
let musicsSrcs;
let musicImgSrcs;

console.log(page);
// 페이지별 음악, 사진 목록 위치 지정
switch (page) {
  case '/Main/index.html':
  case '/Main/':
    musicsSrcs = ['../Audio/music/main1.mp3', '../Audio/music/main2.mp3'];
    musicImgSrcs = ['../image/audio/musicimg1.jpeg', '../image/audio/musicimg2.jpeg'];
    break;

  case '/OX_answer/index.html':
    musicsSrcs = ['../Audio/music/OXanswer1.mp3', '../Audio/music/OXanswer2.mp3'];
    musicImgSrcs = ['../image/audio/musicimg3.jpeg', '../image/audio/musicimg4.jpeg'];
    break;

  case '/SignUp/signup.html':
    musicsSrcs = ['../Audio/music/signup.mp3', '../Audio/music/main3.mp3'];
    musicImgSrcs = ['../image/audio/musicimg5.jpeg', '../image/audio/musicimg6.jpeg'];
    break;

  case '/OX_quiz/index.html':
    musicsSrcs = ['../Audio/music/quiz1.mp3', '../Audio/music/quiz2.mp3'];
    musicImgSrcs = ['../image/audio/musicimg7.jpeg', '../image/audio/musicimg8.jpeg'];
    break;
  case '/Board/board.html':
    musicsSrcs = ['../Audio/music/ifvideo.mp3', '../Audio/music/quiz1.mp3'];
    musicImgSrcs = ['../image/audio/musicimg1.jpeg', '../image/audio/musicimg2.jpeg'];
    break;
}

//

function loadMusic() {
  console.log('load music ', musicIndex);
  audioSrc.src = musicsSrcs[musicIndex];
  audio.load();
}

function onMusicLoaded() {
  const title = musicsSrcs[musicIndex].split('/')[2].split('.')[0];

  audioTitle.innerText = title;
  audioImage.src = musicImgSrcs[musicIndex];
  console.log('music loaded ', title);
  audio.muted = false;
  //   playMusic();
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
  audio.addEventListener('loadeddata', () => onMusicLoaded());
  audioBtnPlay.addEventListener('click', () => onPlayButtonClicked());
  audioBtnPrev.addEventListener('click', () => onPrevButtonClicked());
  audioBtnNext.addEventListener('click', () => onNextButtonClicked());
  window.onbeforeunload = function (event) {
    pauseMusic();
  };
}

function createAudioPlayer() {
  const audioPlayer = document.createElement('div');
  audioPlayer.classList.add('audio_player', 'pixel_border');

  const audio = document.createElement('audio');
  audio.muted = true;
  audio.autoplay = 'autoplay';
  const audioSource = document.createElement('source');
  audioSource.id = 'audio_src';
  audioSource.type = 'audio/mpeg'; // Adjust type based on your audio format
  audio.appendChild(audioSource);

  const audioPlayerImageAndTitle = document.createElement('div');
  audioPlayerImageAndTitle.classList.add('audio_player_image_and_title');

  const audioPlayerLp = document.createElement('div');
  audioPlayerLp.classList.add('audio_player_lp');

  const audioPlayerImage = document.createElement('div');
  audioPlayerImage.classList.add('audio_player_image', 'circle', 'spin');

  const audioPlayerImageImg = document.createElement('img');
  audioPlayerImageImg.id = 'audio_player_image';
  audioPlayerImage.appendChild(audioPlayerImageImg);

  const audioPlayerImageCenter = document.createElement('div');
  audioPlayerImageCenter.id = 'audio_player_image_center';
  audioPlayerImageCenter.classList.add('circle');
  audioPlayerImage.appendChild(audioPlayerImageCenter);

  const audioPlayerImageNeedle = document.createElement('img');
  audioPlayerImageNeedle.id = 'audio_player_image_needle';
  audioPlayerImageNeedle.src = '../image/audio/lpneedle.png'; // Adjust path if needed
  audioPlayerLp.appendChild(audioPlayerImageNeedle);

  audioPlayerLp.appendChild(audioPlayerImage);

  const audioPlayerTitle = document.createElement('div');
  audioPlayerTitle.classList.add('audio_player_title');
  audioPlayerTitle.textContent = 'TITLE'; // Replace with your default title
  audioPlayerImageAndTitle.appendChild(audioPlayerLp);
  audioPlayerImageAndTitle.appendChild(audioPlayerTitle);

  const audioPlayerController = document.createElement('div');
  audioPlayerController.classList.add('audio_player_controller');

  const audioPlayerControllerPrev = document.createElement('button');
  audioPlayerControllerPrev.id = 'audio_player_controller_prev';
  const prevImg = document.createElement('img');
  prevImg.src = '../image/audio/btn_prev.png'; // Adjust path if needed
  audioPlayerControllerPrev.appendChild(prevImg);
  audioPlayerController.appendChild(audioPlayerControllerPrev);

  const audioPlayerControllerPlay = document.createElement('label');
  audioPlayerControllerPlay.classList.add('swap', 'swap-rotate');

  const audioPlayerControllerPlayInput = document.createElement('input');
  audioPlayerControllerPlayInput.id = 'audio_player_controller_play';
  audioPlayerControllerPlayInput.type = 'checkbox';
  audioPlayerControllerPlay.appendChild(audioPlayerControllerPlayInput);

  const playOnImg = document.createElement('img');
  playOnImg.src = '../image/audio/btn_play.png'; // Adjust path if needed
  playOnImg.classList.add('swap-on');
  audioPlayerControllerPlay.appendChild(playOnImg);

  const playOffImg = document.createElement('img');
  playOffImg.src = '../image/audio/btn_pause.png'; // Adjust path if needed
  playOffImg.classList.add('swap-off');
  audioPlayerControllerPlay.appendChild(playOffImg);
  audioPlayerController.appendChild(audioPlayerControllerPlay);

  const audioPlayerControllerNext = document.createElement('button');
  audioPlayerControllerNext.id = 'audio_player_controller_next';
  const nextImg = document.createElement('img');
  nextImg.src = '../image/audio/btn_next.png'; // Adjust paths if needed
  audioPlayerControllerNext.appendChild(nextImg);
  audioPlayerController.appendChild(audioPlayerControllerNext);

  audioPlayer.appendChild(audio);
  audioPlayer.appendChild(audioPlayerImageAndTitle);
  audioPlayer.appendChild(audioPlayerController);

  return audioPlayer;
}

//main

// Get the body element
const body = document.body;

// Create the audio player element
const audioPlayer = createAudioPlayer();

// Append the audio player to the body
body.appendChild(audioPlayer);
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
