/* 로컬스토리지 */
const enname = new URLSearchParams(window.location.search).get('en_name');
const koname = (() => {
  switch (enname) {
    case 'kim':
      return '김기정';
    case 'park':
      return '박민석';
    case 'yoon':
      return '윤동훈';
    case 'lee':
      return '이재아';
  }
})();
const score = localStorage.getItem(`${enname}_score`);
let tasks = JSON.parse(localStorage.getItem(`${enname}_answerSheet`));
const length = tasks.length;

const ox_title = document.querySelector('.title');

const o_span = document.createElement('span');
o_span.classList.add('title_o');
o_span.style.color = '#1d4ed8';
o_span.textContent = 'O ';

const x_span = document.createElement('span');
x_span.classList.add('title_x');
x_span.style.color = '#ff0000';
x_span.textContent = 'X ';

const title_text = document.createElement('span');
title_text.textContent = `Answer of ${koname}`;

ox_title.appendChild(o_span);
ox_title.appendChild(x_span);
ox_title.appendChild(title_text);

/* ******************************************** */

/* ***************메인****************** */

// 헤더 이름 설정
// document.querySelector('#header-name').innerHTML = `QUIZ ${koname}`;

// SPLIDE
const splideList = document.querySelector('.splide__list');
const splide = new Splide('.splide', {
  type: 'slide',
  padding: '5rem',
  gap: '100px',
  start: 1,
  wheel: true,
  waitForTransition: true,
  wheelSleep: 1000,
  pagination: false,
});
splide.mount();

// 첫번째 태스크 후면 -> 카카오 맵
appendCarouselMapBackItem(tasks[0]);
loadMap();

// 두번째 태스크 후면 -> 이미지 기반
appendCarouselImageBackItem(tasks[1]);

tasks.splice(0, 2);

// 개인 데이터 바인딩
tasks.forEach(task => {
  appendCarouselPersonalItem(task);
});

// 카드 뒤집기
flipCards();

// 모달 오픈
addModal();

/* ******************************************** */

/* 모달 */
function addModal() {
  const modal = document.getElementById('myModal');

  // 모달 외부를 클릭하면 닫는 코드
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  openModal(modal);
  setTimeout(() => {
    closeModal(modal);
  }, 3000);
}

function openModal(modal) {
  modal.style.display = 'block';

  const modal_charactor = document.getElementById('modal_charactor');

  // TODO: 점수에 따른 모달 캐릭터 모양 변경 (눈물)
  const modal_charactor_src = `../image/main/${enname}_char.png`;
  modal_charactor.setAttribute('src', modal_charactor_src);
  modal_charactor.style.width = '70%';

  const showName = document.querySelector('.modal_bottom_text');
  const fontColor = score > 50 ? 'font-blue' : 'font-red';
  showName.innerHTML = `당신의 점수는 <b class="${fontColor}">${score}점</b>`;

  document.querySelector('.modal_bottom_img_area').appendChild(modal_charactor);
}

function closeModal(modal) {
  modal.style.display = 'none';
}

/* 카카오맵 로딩 */
function loadMap() {
  const kakaoMapScript = document.createElement('script');
  kakaoMapScript.src = 'kakao-map.js';
  document.body.appendChild(kakaoMapScript);
}

/* SPLIDE */
function appendCarouselMapBackItem(firstTask) {
  firstTask.isCorrect === true ? '#1d4fd870' : '#ff000070';
  const front = makeFrontCardContent(firstTask);
  const back = `
  <div id="map" class="map"></div>
  <details class="dropdown dropdown-bottom dropdown-end map" id="dropdown">
    <summary id="mapSummary" class="map">정보</summary>
    <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 map" id="mapUl"></ul>
  </details>`;
  appendCarouselItem(front, back, firstTask.isCorrect === true ? '#1d4fd870' : '#ff000070');
}
function appendCarouselImageBackItem(secondTask, imgsrc) {
  const front = makeFrontCardContent(secondTask);
  const back = `
  <div class="card card-side" style="background:${secondTask.isCorrect === true ? '#1d4fd870' : '#ff000070'};">
  <figure><img src="${imgsrc}" alt="개인 이미지" /></figure>
  <div class="card-body">
    <h2 class="card-title">
      ${secondTask.content}
      <div class="badge ${secondTask.isCorrect ? 'bg-blue' : 'bg-red'}">${secondTask.userSelectAnswer}</div>
    </h2>
    <p>${secondTask.answerDesc}</p>
    <div class="card-actions justify-end">
      <div class="badge badge-outline">#태그1</div> 
      <div class="badge badge-outline">#태그2</div>
    </div>
  </div>
</div>`;
  appendCarouselItem(front, back);
}
function appendCarouselPersonalItem(task) {
  const front = makeFrontCardContent(task);
  const back = makeBackCardContent(task);
  appendCarouselItem(front, back);
}

function makeBackCardContent(data) {
  console.log(data);
  return `
    <div style="width:100%; height:120%; display:flex; justify-content:center; align-items:center; margin-bottom:-8%; background:${
      data.isCorrect === true ? '#1d4fd870' : '#ff000070'
    };">
      <div style="width:70%; font-size:xx-large">${data.answerDesc}</div>
    </div>
  `;
}

function makeFrontCardContent(data) {
  return `
  <div class="card_box_top">
    <div class="card_box_top_main">
      <div class="card_box_top_main_title">NEW FOUR TIMES</div>
    </div>
  </div>
  <div class="card_box_main">
    <div class="card_box_main_left">
      <div class="card_box_main_left_area">
        <div class="card_box_main_left_img">
          <div class="black_wrapper"></div>
          <div class="news_text_${data.isCorrect ? 'o' : 'x'}">${data.isCorrect ? '맞았습니다!' : '틀렸습니다!'}</div>
          <img class="news_img" src="../image/${data.isCorrect ? `main/${enname}_jump.gif` : `ox_answer/${enname}_x.png`}" alt="" />
        </div>
        <div class="card_box_main_left_divider"></div>
        <div class="card_box_main_left_text">
          ▲ 자신에 대한 OX 문제를 ${data.isCorrect ? ' 맞춘 것에 매우 기뻐 뛰고 있는 모습이다.' : ' 틀린 것에 매우 슬퍼 하고 있는 모습이다.'}
        </div>
      </div>
    </div>
    <div class="card_box_main_divider"></div>
    <div class="card_box_main_right">
      <div class="card_box_main_right_area">
        <div class="card_box_main_right_answer">
          <div class="answer_index">문제 )</div>
          <div class="answer_title">${data.content}</div>
          <div class="user_select_answer">당신이 선택한 답 : <span class="${data.userSelectAnswer == 'o' ? 'font-blue' : 'font-red'}">${
    data.userSelectAnswer
  }</span></div>
        </div>
        <div class="card_box_main_right_divider">
          <div class="divider_line"></div>
        </div>
        <div class="card_box_main_right_dummy">
          <div class="dummy_title"><b>Opinion: This album brings ‘Taylor math’ to a whole new level</b></div>
            <div class="dummy_text">
            Friday’s midnight release of “The Tortured Poets Department,” Taylor Swift’s 11th album, means that yet another era has begun and a
            record-breaking one at that. Swifties, who are now more than familiar with football jargon (at least when it comes to Kansas City
            Chiefs’ tight end Travis Kelce, Taylor’s beau) can finally put away the grill and the drinks, lock the car, and leave the parking lot
            for the stadium. The tailgate is over: it’s game on for Taylor Nation.
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="card_deco" src="../image/ox_answer/card_deco1.png" alt="" />
  </div>`;
}
function appendCarouselItem(front, back, color = null) {
  const li = document.createElement('li');
  li.classList.add('splide__slide');

  const flidDiv = document.createElement('div');
  flidDiv.classList.add('flip');

  const boxFront = document.createElement('div');
  boxFront.classList.add('card_box', 'front');
  boxFront.innerHTML = front;
  flidDiv.appendChild(boxFront);

  const boxBack = document.createElement('div');
  boxBack.classList.add('card_box', 'back');
  if (color) boxBack.style.backgroundColor = color;
  boxBack.innerHTML = back;
  flidDiv.appendChild(boxBack);

  li.appendChild(flidDiv);
  splide.add(li);
}

function hasParentWithClass(element, className) {
  // 부모 노드가 없을 때까지 && li가 아닐때까지 반복
  while (element.parentElement && element.tagName !== 'LI') {
    element = element.parentElement;

    // 부모 요소의 클래스에 className이 포함되어 있는지 확인
    if (element.classList.contains(className)) {
      return true; // 클래스가 포함되어 있다면 true 반환
    }
  }
  return false; // 부모 요소 중에 해당 클래스가 없으면 false 반환
}

function flipCards() {
  //drag & click 구분 이벤트
  let isDragging = false;
  splideList.addEventListener('mousedown', () => {
    isDragging = false;
  });

  splideList.addEventListener('mousemove', () => {
    isDragging = true;
  });

  splideList.addEventListener('wheel', e => {
    if (hasParentWithClass(e.target, 'map')) {
      e.stopPropagation();
    }
  });

  splideList.addEventListener('mouseup', e => {
    if (hasParentWithClass(e.target, 'map')) {
      e.stopPropagation();
      return;
    }
    let isactive = hasParentWithClass(e.target, 'is-active');
    if (!isDragging) {
      for (const slide of e.currentTarget.children) {
        if (slide.classList.contains('is-active') && isactive) {
          let card = slide.children.item(0);
          if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
          } else {
            card.classList.add('flipped');
          }
        }
      }
    }
  });
}

const leftBtn = document.querySelector('.splide__arrow--prev');
const rightBtn = document.querySelector('.splide__arrow--next');

leftBtn.addEventListener('click', () => {
  leftBtn.style.opacity = 0;
  rightBtn.style.opacity = 0;

  setTimeout(() => {
    leftBtn.style.opacity = 1;
    rightBtn.style.opacity = 1;
  }, 500);
});

rightBtn.addEventListener('click', () => {
  leftBtn.style.opacity = 0;
  rightBtn.style.opacity = 0;

  setTimeout(() => {
    leftBtn.style.opacity = 1;
    rightBtn.style.opacity = 1;
  }, 500);
});

function handleSplideDrag() {
  const mapElements = ['map', 'mapSummary', 'mapUl', 'mapInfo'];
  const allElements = document.querySelectorAll('*');

  mapElements.forEach(x => {
    const element = document.getElementById(x);
    if (element) {
      console.log(element);
      element.addEventListener('click', handleMapClick);
      element.addEventListener('mousedown', handleMapMouseDown);
      element.addEventListener('wheel', handleMapwheel);
    }
  });

  document.getElementById('dropdown').addEventListener('click', function (event) {
    event.stopPropagation();
  });

  function handleMapClick(event) {
    console.log(event);

    event.stopPropagation();
    splide.options = {
      drag: false,
      wheel: false,
      wheelMinThreshold: 0,
    };
  }

  function handleMapMouseDown(event) {
    console.log(event);
    splide.options = {
      drag: false,
      wheel: false,
    };
  }
  function handleMapwheel(event) {
    event.stopPropagation();
    console.log(event);
    splide.options = {
      drag: false,
      wheel: false,
    };
  }

  document.getElementById('dropdown').addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // map과 dropdown 요소 제외한 모든 요소에 대해 이벤트 리스너 추가
  allElements.forEach(element => {
    let id = element.id;
    if (id !== 'map' && id !== 'dropdown' && id !== 'mapSummary' && id !== 'mapUl' && id !== 'mapInfo') {
      // 마우스가 요소 위에 있을 때 glide.enable() 실행
      element.addEventListener('mouseenter', function () {
        splide.options = {
          drag: true,
          wheel: true,
        };
      });
      // 요소를 클릭했을 때 glide.enable() 실행
      element.addEventListener('click', function () {
        splide.options = {
          drag: true,
          wheel: true,
        };
      });
    }
  });
}

splide.on('updated', e => {
  console.log(e);
});
// 홈으로 보내기
function goHome() {
  window.location.href = '../Main/index.html';
}
