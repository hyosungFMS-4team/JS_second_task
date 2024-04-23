const mapHtml = `
  <div id="map"></div>
  <details class="dropdown dropdown-bottom dropdown-end" id="dropdown">
    <summary id="mapSummary">정보</summary>
    <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" id="mapUl"></ul>
  </details>`;

/* ***************후면 설명 데이터****************** */
const memberDetails = {
  park: [
    {
      title: 'PARK',
      content: mapHtml,
    },
    {
      title: 'PARK',
      content: 'content2',
    },
    {
      title: 'title3',
      content: 'content3',
    },
    {
      title: 'title4',
      content: 'content4',
    },
    {
      title: 'title5',
      content: 'content5',
    },
    {
      title: 'title6',
      content: 'content6',
    },
    {
      title: 'title7',
      content: 'content7',
    },
    {
      title: 'title8',
      content: 'content8',
    },
    {
      title: 'title9',
      content: 'content9',
    },
    {
      title: 'title10',
      content: 'content10',
    },
  ],
  kim: [
    {
      title: 'YOON',
      content: mapHtml,
    },
    {
      title: 'YOON',
      content: 'content2',
    },
    {
      title: 'title3',
      content: 'content3',
    },
    {
      title: 'title4',
      content: 'content4',
    },
    {
      title: 'title5',
      content: 'content5',
    },
    {
      title: 'title6',
      content: 'content6',
    },
    {
      title: 'title7',
      content: 'content7',
    },
    {
      title: 'title8',
      content: 'content8',
    },
    {
      title: 'title9',
      content: 'content9',
    },
    {
      title: 'title10',
      content: 'content10',
    },
  ],
  yoon: [
    {
      title: 'YOON',
      content: mapHtml,
    },
    {
      title: 'YOON',
      content: 'content2',
    },
    {
      title: 'title3',
      content: 'content3',
    },
    {
      title: 'title4',
      content: 'content4',
    },
    {
      title: 'title5',
      content: 'content5',
    },
    {
      title: 'title6',
      content: 'content6',
    },
    {
      title: 'title7',
      content: 'content7',
    },
    {
      title: 'title8',
      content: 'content8',
    },
    {
      title: 'title9',
      content: 'content9',
    },
    {
      title: 'title10',
      content: 'content10',
    },
  ],
  lee: [
    {
      title: 'YOON',
      content: mapHtml,
    },
    {
      title: 'YOON',
      content: 'content2',
    },
    {
      title: 'title3',
      content: 'content3',
    },
    {
      title: 'title4',
      content: 'content4',
    },
    {
      title: 'title5',
      content: 'content5',
    },
    {
      title: 'title6',
      content: 'content6',
    },
    {
      title: 'title7',
      content: 'content7',
    },
    {
      title: 'title8',
      content: 'content8',
    },
    {
      title: 'title9',
      content: 'content9',
    },
    {
      title: 'title10',
      content: 'content10',
    },
  ],
};
/* ************************************************** */

/* ***************로컬 스토리지****************** */
// const enname = localStorage.getItem('en_name').replaceAll('"', '');

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
const taskDetails = memberDetails[enname];
const tasks = JSON.parse(localStorage.getItem(`${enname}_answerSheet`));
const length = tasks.length;
/* ******************************************** */

/* ***************메인****************** */
// document.querySelector('#header-name').innerHTML = `QUIZ ${koname}`;
// test();
const splideList = document.querySelector('.splide__list');
const splide = new Splide('.splide', {
  type: 'slide',
  // perPage: 2,
  padding: '5rem',
  gap: '100px',
  start: 1,
  wheel: true,
  pagination: false,
});

splide.mount();
flipCards();
tasks.forEach((task, idx) => {
  appendCarouselItem(idx, {
    front: {
      title: task.content,
      color: 'bg-blue',
    },
    back: {
      title: taskDetails[idx].title,
      content: taskDetails[idx].content,
      color: 'bg-red',
    },
  });
});

/* ******************************************** */

// 압장 확인 모달
function openModal(modal) {
  modal.style.display = 'block';

  const modal_charactor = document.getElementById('modal_charactor');
  modal_charactor.setAttribute('src', `../image/main/${enname}_char.png`);

  const showName = document.querySelector('.modal_bottom_text');
  const fontColor = score > 50 ? 'font-blue' : 'font-red';
  showName.innerHTML = `당신의 점수는 <b class="${fontColor}">${score}점</b>`;

  document.querySelector('.modal_bottom_img_area').appendChild(modal_charactor);
}

function closeModal(modal) {
  modal.style.display = 'none';
}

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

function loadMap() {
  const kakaoMapScript = document.createElement('script');
  kakaoMapScript.src = 'kakao-map.js';
  document.body.appendChild(kakaoMapScript);
}

function appendCarouselItem(idx, data) {
  console.log(data);

  const li = document.createElement('li');
  li.classList.add('splide__slide');
  const mHtml = `
  <div class="flip">
  <div class="card_box front">
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
          <!-- TODO 1 -->
          <div class="news_text_o">맞았습니다!</div>
          <img class="news_img" src="../image/main/lee_jump.gif" alt="" />
        </div>
        <div class="card_box_main_left_divider"></div>
        <div class="card_box_main_left_text">▲ 자신에 대한 OX 문제를 맞춘 것에 매우 기뻐 뛰고 있는 모습이다.</div>
      </div>
    </div>
    <div class="card_box_main_divider"></div>
    <div class="card_box_main_right">
      <div class="card_box_main_right_area">
        <div class="card_box_main_right_answer">
          <div class="answer_index">문제 )</div>
          <!-- TODO 2 -->
          <div class="answer_title">"제 이름은 윤동훈입니다"</div>
          <!-- TODO 3 -->
          <div class="user_select_answer">당신이 선택한 답 : <span style="color: #1d4ed8">O</span></div>
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
    </div>  
    <div class="card_box back">
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
            <!-- TODO 1 -->
            <div class="news_text_o">틀렸습니다!</div>
            <img class="news_img" src="../image/main/lee_jump.gif" alt="" />
          </div>
          <div class="card_box_main_left_divider"></div>
          <div class="card_box_main_left_text">▲ 자신에 대한 OX 문제를 맞춘 것에 매우 기뻐 뛰고 있는 모습이다.</div>
        </div>
      </div>
      <div class="card_box_main_divider"></div>
      <div class="card_box_main_right">
        <div class="card_box_main_right_area">
          <div class="card_box_main_right_answer">
            <div class="answer_index">문제 )</div>
            <!-- TODO 2 -->
            <div class="answer_title">"제 이름은 윤동훈입니다"</div>
            <!-- TODO 3 -->
            <div class="user_select_answer">당신이 선택한 답 : <span style="color: #1d4ed8">O</span></div>
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
      </div>  
  
</div>
`;
  li.innerHTML = mHtml;
  splide.add(li);
}

function hasParentWithClass(element, className) {
  // 부모 노드가 없을 때까지 && li가 아닐때까지 반복
  while (element.parentElement && element.tagName !== 'LI') {
    element = element.parentElement;
    // console.log(element.tagName);
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

function handleGlideDrag() {
  const glideArrows = document.querySelectorAll('.glide__arrows button');
  const mapElements = ['map', 'mapSummary', 'mapUl', 'mapInfo', 'map-detail-info-div'];

  glideArrows.forEach(arrow => {
    arrow.addEventListener('click', function (event) {
      event.stopPropagation(); // 이벤트 전파 중지
    });
  });

  mapElements.forEach(elementId => {
    const glideArrows = document.querySelectorAll('.glide__arrows button');
    const allElements = document.querySelectorAll('*');

    glideArrows.forEach(arrow => {
      arrow.addEventListener('click', function (event) {
        event.stopPropagation(); // 이벤트 전파 중지
      });
    });

    mapElements.forEach(x => {
      const element = document.getElementById(x);
      if (element) {
        element.addEventListener('click', handleMapClick);
        element.addEventListener('mousedown', handleMapMouseDown);
      }
    });

    function handleMapClick(event) {
      event.stopPropagation();
      glide.disable();
    }

    function handleMapMouseDown(event) {
      event.stopPropagation();
      glide.disable();
    }

    // map과 dropdown 요소 제외한 모든 요소에 대해 이벤트 리스너 추가
    allElements.forEach(element => {
      let id = element.id;
      if (id !== 'map' && id !== 'dropdown' && id !== 'mapSummary' && id !== 'mapUl' && id !== 'map-detail-info-div') {
        // 마우스가 요소 위에 있을 때 glide.enable() 실행
        element.addEventListener('mouseenter', function () {
          glide.enable();
        });
        // 요소를 클릭했을 때 glide.enable() 실행
        // element.addEventListener('click', function () {
        //   glide.enable();
        // });
      }
    });
  });
}

// 홈으로 보내기

function goHome() {
  window.location.href = '../Main/index.html';
}
