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
  pagination: false,
});
splide.mount();

// 첫번째 태스크 후면 -> 카카오 맵
appendCarouselMapBackItem(tasks[0]);
loadMap();
tasks.splice(0, 1);

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
  const front = makeFrontCardContent(firstTask);
  const back = `
    <div id="map"></div>
    <details class="dropdown dropdown-bottom dropdown-end" id="dropdown">
      <summary id="mapSummary">정보</summary>
      <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" id="mapUl"></ul>
    </details>`;
  appendCarouselItem(front, back);
}
function appendCarouselPersonalItem(task) {
  const front = makeFrontCardContent(task);
  const back = task.answerDesc;
  appendCarouselItem(front, back);
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
          <div class="news_text_${data.isCorrect? 'o' : 'x'}">${data.isCorrect? '맞았습니다!' : '틀렸습니다!'}</div>
          <img class="news_img" src="../image/main/${enname}_${(data.isCorrect)? 'jump.gif' : 'char.png'}" alt="" />
        </div>
        <div class="card_box_main_left_divider"></div>
        <div class="card_box_main_left_text">
          ▲ 자신에 대한 OX 문제를 ${data.isCorrect? ' 맞춘 것에 매우 기뻐 뛰고 있는 모습이다.' : ' 틀린 것에 매우 슬퍼 하고 있는 모습이다.'}
        </div>
      </div>
    </div>
    <div class="card_box_main_divider"></div>
    <div class="card_box_main_right">
      <div class="card_box_main_right_area">
        <div class="card_box_main_right_answer">
          <div class="answer_index">문제 )</div>
          <div class="answer_title">${data.content}</div>
          <div class="user_select_answer">당신이 선택한 답 : <span class="${data.isCorrect? 'font-blue' : 'font-red'}">${data.userSelectAnswer}</span></div>
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
function appendCarouselItem(front, back) {
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

  splideList.addEventListener('mouseup', e => {
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

// 홈으로 보내기
function goHome() {
  window.location.href = '../Main/index.html';
}
