const mapHtml = `
  <div id="map"></div>
  <details class="dropdown dropdown-bottom dropdown-end" id="dropdown">
    <summary class="btn" id="mapSummary">I N F O</summary>
    <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52" id="mapUl">
    </ul>
  </details>
  <button id="flipBtn">F L I P</button>`;

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

let urlParams = new URLSearchParams(window.location.search);
let enname = urlParams.get('en_name');
const score = localStorage.getItem(`${enname}_score`);
const taskDetails = memberDetails[enname];
const tasks = JSON.parse(localStorage.getItem(`${enname}_answerSheet`));
const length = tasks.length;
/* ******************************************** */

/* ***************메인****************** */
document.querySelector('#header-name').innerHTML = `QUIZ ${enname}`;
let glideSlides = document.querySelector('.glide__slides');
let glide;
window.addEventListener('load', function () {
  glide = new Glide('.glide', {
    type: 'carousel',
    focusAt: 'center',
    perView: 2,
    gap: 40,
    keyboard: true,
    peek: {
      before: 30,
      after: 30,
    },
  }).mount();

  flipCards();
  handleGlideDrag();

  const kakaoMapScript = document.createElement('script');
  kakaoMapScript.src = 'kakao-map.js';
  document.body.appendChild(kakaoMapScript);

  const modal = document.getElementById('ox_answer_modal');
  modal.querySelector('.modal-box').innerHTML = `
    <h3 class="font-bold text-lg">당신의 ${enname} QUIZ 점수</h3>
    <p class="py-4">${score}/100</p>
  `;
  modal.showModal();

  const modalClose = this.setInterval(() => {
    modal.close();
    this.clearInterval(modalClose);
  }, 2000);
});

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

function appendCarouselItem(idx, data) {
  let item = document.createElement('li');
  item.setAttribute('class', 'glide_slide');
  item.innerHTML = `
        <div class="flip">
          <div id="${idx}" class="card-body front ${data.front.color}">
          ${data.front.color ? `<div class="card-title">${data.front.title}</div>` : data.front.title}
            <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><</button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
            </div>
          </div>
          <div id="${idx}" class="card-body back ${data.back.color}">
              ${data.back.content}
            <div class="glide__arrows" data-glide-el="controls">
              <button class="glide__arrow glide__arrow--left" data-glide-dir="<"><</button>
              <button class="glide__arrow glide__arrow--right" data-glide-dir=">">></button>
            </div>
          </div> 
        </div>
      `;
  glideSlides.appendChild(item);
}

let drag = false;
function flipCards() {
let glideSlides = document.querySelector('.glide__slides');

  const flip = document.querySelectorAll('.flip');

  glideSlides.addEventListener('mousedown', () => drag=false);
  glideSlides.addEventListener('mousemove', () => drag=true);

  flip.forEach(card => {
    card.addEventListener('mouseup', event => {
      console.log(drag);
      if (!card.parentElement.classList.contains('glide__slide--active') || drag) {
        return;
      }
      if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
      } else {
        card.classList.add('flipped');
      }
    }, false);
  });
}

function handleGlideDrag() {
  const glideArrows = document.querySelectorAll('.glide__arrows button');
  const mapElements = ['map', 'mapSummary', 'mapUl', 'mapInfo', 'map-detail-info-div'];
  const allElements = document.querySelectorAll('*');

  glideArrows.forEach(arrow => {
    arrow.addEventListener('click', function (event) {
      event.stopPropagation(); // 이벤트 전파 중지
    });
  });

  mapElements.forEach(elementId => {
    const glideArrows = document.querySelectorAll('.glide__arrows button');
    const mapElements = ['map', 'mapSummary', 'mapUl', 'mapInfo'];
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
