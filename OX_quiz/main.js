let currentuser = JSON.parse(localStorage.getItem('en_name'));
let tasks = JSON.parse(localStorage.getItem(`${currentuser}_task`)) === null ? [] : JSON.parse(localStorage.getItem(`${currentuser}_task`));

// ================================================================================================

//dummy

const AllOXItems = {
  yoon: [
    { id: '1', text: '서울영어마을수유캠프국립재활원 주변에 산다.', answer: 'o', desc: '강북구 수유동 서울영어마을수유캠프국립재활원 근처에 살고 있습니다.' },
    { id: '2', text: '1997년생이다.', backgroundColor: '#d83434', answer: 'x', desc: '1996년에 엄격한 아버지와 다정하신 어머니 아래에서 태어났습니다.' },
    { id: '3', text: '2살 차이나는 여동생이 있다.', backgroundColor: '#38667f', answer: 'x', desc: '저와 2살 차이나는 누나가 있습니다.' },
    {
      id: '4',
      text: '이번에 java를 제대로 처음해본다.',
      backgroundColor: '#38667f',
      answer: 'o',
      desc: '저는 이번 교육을 통해 자바를 제대로 처음 해봤습니다.',
    },
    { id: '5', text: '나는 컴퓨터 공학을 전공했다.', backgroundColor: '#38667f', answer: 'x', desc: '저는 독일어를 못하는 독어독문학과입니다.' },
    { id: '6', text: '나는 React가 익숙하다.', backgroundColor: '#9f7db1', answer: 'x', desc: 'React 로 3번의 프로젝트를 진행해 가장 익숙합니다.' },
    { id: '7', text: '내가 가장 좋아하는 스포츠는 축구다.', backgroundColor: '#ff5722', answer: 'o', desc: '구기종목 다 좋아하지만 축구를 가장 좋아합니다.' },
    { id: '8', text: '나는 응급실을 3회 이상 다녀왔다.', backgroundColor: '#009688', answer: 'o', desc: '머리, 손, 목을 다치면서 3번 다녀왔습니다' },
    { id: '9', text: '나는 혼자 살고 있다.', backgroundColor: '#009688', answer: 'x', desc: '준석이형, 현우와 함께 살고 있습니다.' },
    { id: '10', text: '느끼한 음식은 질색이다.', backgroundColor: '#009688', answer: 'x', desc: '느끼함에 대한 내성이 있어 좋아합니다.' },
  ],
  kim: [
    {
      id: '1',
      text: '가족들과 산다.',
      answer: 'o',
      desc: '경기 토박이지만 현재는 종로 5가역 주변에서 자취를 하고 있다.',
    },
    { id: '2', text: '장발을 해본 적 있다.', backgroundColor: '#d83434', answer: 'x', desc: '자르기 귀찮아하는건 맞지만 장발까진 못버틴다.' },
    {
      id: '3',
      text: '취미가 pixel art 이다.',
      backgroundColor: '#38667f',
      answer: 'x',
      desc: 'pixel 찍기가 재미는 있지만 안타깝게도 취미가 되진 못할거 같다.',
    },
    {
      id: '4',
      text: '이번 교육을 통해 JAVA를 처음 해본다.',
      backgroundColor: '#38667f',
      answer: 'o',
      desc: '스프링을 통한 백엔드를 배워보고싶어서 교육을 들어왔고 자바는 처음이다. ',
    },
    { id: '5', text: '정보처리기사 자격증이 있다.', backgroundColor: '#38667f', answer: 'o', desc: '질문에 대한 답변입니다.' },
    { id: '6', text: '최애 음식은 피자이다.', backgroundColor: '#9f7db1', answer: 'x', desc: '10일 연속으로 치킨을 먹을만큼 치킨을 좋아한다.' },
    {
      id: '7',
      text: 'kpop보다 팝송을 좋아한다.',
      backgroundColor: '#ff5722',
      answer: 'x',
      desc: '어렸을때부터 팝송을 더 많이 들어서 팝송을 팝송을 더 많이 알기 때문에 친구들이 같이 노래방가면 싫어한다.',
    },
    { id: '8', text: '1998년생이다.', backgroundColor: '#009688', answer: 'o', desc: '나는 98년 11월 23일에 해운대에서 태어나 현재 27세 만 25세이다.' },
    { id: '9', text: '외동이다.', backgroundColor: '#009688', answer: 'x', desc: '위로 형이 한명있다.' },
    { id: '10', text: '애니메이션을 좋아한다.', backgroundColor: '#009688', answer: 'o', desc: '나는 애니메이션도 많이 봤지만 도라에몽을 가장 좋아한다.' },
  ],
  park: [
    { id: '1', text: '수원에서 태어나 수원에서 살고 있다.', answer: 'x', desc: '익산에서 태어나 초등학교 때 수원으로 이사와서 지금까지 살고있습니다.' },
    { id: '2', text: '1998년생이다.', backgroundColor: '#d83434', answer: 'o', desc: '98년도 2월 24일에 태어났습니다. 하지만 빠른은 아닙니다.' },
    {
      id: '3',
      text: '나이가 3살 이상 차이나는 형제가 있다.',
      backgroundColor: '#38667f',
      answer: 'o',
      desc: '03년 1월 17일에 태어난 여동생이 있습니다. (여동생도 빠른 아님)',
    },
    { id: '4', text: '클래식 음악을 좋아한다.', backgroundColor: '#38667f', answer: 'x', desc: 'KPOP 제일 좋아합니다. 항상 학원 올 때 KPOP 들으면서 옵니다.' },
    { id: '5', text: '사랑니가 있다.', backgroundColor: '#38667f', answer: 'o', desc: '빼고 아파하는 사진' },
    { id: '6', text: '빵집에서 알바를 해봤다.', backgroundColor: '#9f7db1', answer: 'o', desc: '집 앞 빵집에서 일했습니다. 남는 빵 맛있게 먹었습니다.' },
    { id: '7', text: '마라탕을 좋아한다.', backgroundColor: '#ff5722', answer: 'x', desc: '동생이 배달 시키면 강제로 먹을 수는 있습니다.' },
    { id: '8', text: '휴대폰 보험을 들었다.', backgroundColor: '#009688', answer: 'o', desc: '질문에 대한 답변입니다.' },
    {
      id: '9',
      text: '나는 장발을 해본 적이 있다.',
      backgroundColor: '#009688',
      answer: 'o',
      desc: '머리를 길렀다기 보다는 머리를 6달 넘게 안잘랐던 적이 있습니다.',
    },
<<<<<<< HEAD
    { id: '10', text: '생계형 개발자다.', backgroundColor: '#009688', answer: 'x', desc: '개발과 연관된 대부분의 행위를 좋아합니다.' },
=======
    { id: '3', 
      text: '나이가 3살 이상 차이나는 형제가 있다.', 
      backgroundColor: '#38667f', 
      answer: 'o', 
      desc: '03년 1월 17일에 태어난 여동생이 있습니다. (여동생도 빠른 아님)' 
    },
    { id: '4', 
      text: '클래식 음악을 좋아한다.', 
      backgroundColor: '#38667f', 
      answer: 'x', 
      desc: 'KPOP 제일 좋아합니다. 항상 학원 올 때 KPOP 들으면서 옵니다.' 
    },
    { id: '5', 
      text: '사랑니가 있다.', 
      backgroundColor: '#38667f', 
      answer: 'x', 
      desc: '최근에 4개 다 뽑아버렸습니다.' 
    },
    { id: '6', 
      text: '빵집에서 알바를 해봤다.', 
      backgroundColor: '#9f7db1', 
      answer: 'o', 
      desc: '집 앞 빵집에서 일했습니다. 남는 빵 맛있게 먹었습니다.' 
    },
    { id: '7', 
      text: '마라탕을 좋아한다.', 
      backgroundColor: '#ff5722', 
      answer: 'x', 
      desc: '동생이 배달 시키면 강제로 먹을 수는 있습니다.' 
    },
    { id: '8', 
      text: '휴대폰 보험을 들었다.', 
      backgroundColor: '#009688', 
      answer: 'o', 
      desc: '케이스 대신 보험료 한달 3300원' 
    },
    { id: '9', 
      text: '나는 장발을 해본 적이 있다.', 
      backgroundColor: '#009688', 
      answer: 'o', 
      desc: '머리를 길렀다기 보다는 머리를 6달 넘게 안잘랐던 적이 있습니다.' 
    },
    { id: '10', 
      text: '생계형 개발자다.', 
      backgroundColor: '#009688', 
      answer: 'x', 
      desc: '개발과 연관된 대부분의 행위를 좋아합니다.' },
>>>>>>> e222c09cff195ef7c3a3b5fab44c533560277fcf
  ],
  lee: [
    {
      id: '1',
      text: '서울에서 태어나 서울에서 살고 있다.',
      answer: 'o',
      desc: '서울촌놈입니다. 본가는 서울 동쪽 끝 강동구이고 현재 마포구에서 자취를 하고 있습니다.',
    },
    {
      id: '2',
      text: '한라산 정상에서 백록담을 본 경험이 있다.',
      backgroundColor: '#d83434',
      answer: 'o',
      desc: '나의 버킷리스트 중 하나였는데 날씨 좋은날 가서 선명한 백록담을 볼 수 있었다. 그때의 기분을 아직도 잊지 못한다! 하지만 올라가는 것보다 내려오는걸 싫어하는 나는 내려올 때 진짜 울면서 내려왔다…',
    },
    {
      id: '3',
      text: '동물을 좋아한다.',
      backgroundColor: '#38667f',
      answer: 'x',
      desc: '사람이 아닌 움직이는 것들에 크게 관심이 없다. 물론 강아지나 고양이 같은 동물을 보면 귀엽긴하지만… 관심 없다!!!',
    },
    {
      id: '4',
      text: '운전을 할 수 있다.',
      backgroundColor: '#38667f',
      answer: 'o',
      desc: '나는 절대 운전을 못할 줄 알았지만, 면허증 잉크가 마르지도 않았는데 비가 쏟아지는 날 아빠가 운전연수를 시켜준 이후로 운전실력도 많이 늘고 운전을 좋아하게되었다. 지금은 내가 원하는 곳 어디든 갈 수 있고 혼자 드라이브하는 것을 너무 좋아한다!',
    },
    { id: '5', text: 'SQLD 자격증이 있다.', backgroundColor: '#38667f', answer: 'x', desc: '시험 통과는 했지만 아직 자격증이 정식적으로(?) 나오진 않았다.' },
    { id: '6', text: '1999년생이다.', backgroundColor: '#9f7db1', answer: 'o', desc: '1999년에 태어난 MZ 세대~~' },
    { id: '7', text: '5살 차이나는 언니가 있다.', backgroundColor: '#ff5722', answer: 'x', desc: '질문에 대한 답변입니다.' },
    {
      id: '8',
      text: '웹을 배포해 본 경험이 있다.',
      backgroundColor: '#009688',
      answer: 'o',
      desc: '작년 부트캠프 프로젝트에서 git action과 AWS를 활용한 자동 배포, 무중단 서비스를 제공한 경험이 있다.',
    },
    { id: '9', text: '조에서 괴롭힘을 당하고 있다!🥕🥕🥕 ', backgroundColor: '#009688', answer: 'o', desc: '도와주세요!!!!!' },
    { id: '10', text: '해외여행을 좋아한다.', backgroundColor: '#009688', answer: 'o', desc: '질문에 대한 답변입니다.' },
  ],
};

// ================================================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

function renderTasks() {
  if (!tasks.length) {
    AllOXItems[currentuser].forEach(item => {
      const newTask = {
        id: item.id,
        content: item.text,
        backgroundColor: item.backgroundColor,
        status: 'quiz_items',
        answer: item.answer,
        desc: item.desc,
      };
      tasks.push(newTask);
    });
  }

  const columns = ['quiz_items', 'o_section', 'x_section'];

  columns.forEach(columnId => {
    const column = document.querySelector(`.${columnId}`);
    column.innerHTML = '';

    tasks.forEach(task => {
      if (task.status === columnId) {
        const taskElement = createTaskElement(task.content, task.id, task.backgroundColor);
        taskElement.addEventListener('dragstart', drag);
        column.appendChild(taskElement);
      }
    });
  });
}

// 누구 퀴즈인지 알수 있도록

let koreanFullName;

switch (currentuser) {
  case 'kim':
    koreanFullName = '김기정';
    break;
  case 'park':
    koreanFullName = '박민석';
    break;
  case 'yoon':
    koreanFullName = '윤동훈';
    break;
  case 'lee':
    koreanFullName = '이재아';
    break;
  default:
    break;
}

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
title_text.textContent = `Quiz of ${koreanFullName}`;

ox_title.appendChild(o_span);
ox_title.appendChild(x_span);
ox_title.appendChild(title_text);

// item_btn 이라는 클래스를 가지는 요소를 전부 가져와서
const itemBtnList = document.querySelectorAll('.item_btn');

// 돔이 Load 될 떄, 해당 아이템들에게 drag 이벤트 걸어줌
window.addEventListener('DOMContentLoaded', () => {
  itemBtnList.forEach(item => {
    item.addEventListener('dragstart', drag);
  });
});

function drag(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
  event.preventDefault();

  const sectionClass = event.target.classList;

  if (sectionClass.contains('o_drop_main')) {
    event.target.style.background = '#1d4ed8bf';
  } else if (sectionClass.contains('x_drop_main')) {
    event.target.style.background = '#ff0000bf';
  }
}

function handleDragLeave(event) {
  // 해당 영역의 스타일을 초기화
  if (event.target.tagName === 'BUTTON') {
    return;
  }
  event.target.style.backgroundColor = '';
}

function drop(event, columnId) {
  event.preventDefault();

  // 드롭된 섹션의 스타일을 되돌림
  if (event.target.tagName === 'BUTTON') {
  } else {
    event.target.style.backgroundColor = '';
  }

  const data = event.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(data);

  const taskStatus = columnId;
  if (draggedElement) {
    // 이벤트 발생 타겟이 button 이면 button의 부모태그에 append => 이거 안해주면 버튼안에 버튼 들어감
    if (event.target.tagName === 'BUTTON') {
      updateTaskStatus(data, taskStatus);
      event.target.parentNode.appendChild(draggedElement);
      return;
    }
    updateTaskStatus(data, taskStatus);
    event.target.appendChild(draggedElement);
  }
}

const dropSections = document.querySelectorAll('.o_drop_main, .x_drop_main');
dropSections.forEach(section => {
  section.addEventListener('dragenter', allowDrop);
  section.addEventListener('dragover', allowDrop);
  section.addEventListener('dragleave', handleDragLeave);
});

function updateTaskStatus(taskId, newStatus) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, status: newStatus };
    }
    return task;
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem(`${currentuser}_task`, JSON.stringify(tasks));
}

function createTaskElement(content, id, backgroundColor) {
  const button = document.createElement('button');
  button.id = id;
  button.textContent = content;
  button.className = 'item_btn';
  button.draggable = true;
  if (backgroundColor) {
    button.style.backgroundColor = backgroundColor;
  }

  return button;
}

// 채점 - 제출 로직

const submitBtn = document.querySelector('.submit_btn');
submitBtn.addEventListener('click', submitAnswer);

function submitAnswer() {
  if (!isAllItemDrop()) {
    openModal();
    return;
  }

  const oneScore = Math.floor(100 / tasks.length);
  let score = 0;
  let answerSheet = [];

  tasks.forEach(item => {
    const newAnswer = {
      id: item.id,
      content: item.content,
      isCorrect: null,
      userSelectAnswer: null,
      answerDesc: item.desc,
      realAnswer: item.answer,
    };
    if (item.status[0] === item.answer) {
      score += oneScore;
      newAnswer.isCorrect = true;
    } else {
      newAnswer.isCorrect = false;
    }

    if (newAnswer.isCorrect) {
      newAnswer.userSelectAnswer = item.answer;
    } else {
      item.answer === 'o' ? (newAnswer.userSelectAnswer = 'x') : (newAnswer.userSelectAnswer = 'o');
    }

    answerSheet.push(newAnswer);
  });

  localStorage.setItem(`${currentuser}_score`, score);
  localStorage.setItem(`${currentuser}_answerSheet`, JSON.stringify(answerSheet));

  goToOxAnswerPage();
}

function isAllItemDrop() {
  let flag = true;
  for (const item of tasks) {
    if (item.status === 'quiz_items') {
      flag = false;
      break;
    }
  }

  return flag;
}

// Modal

const modal = document.getElementById('myModal');

function openModal() {
  modal.style.display = 'block';

  let cnt = 0;
  tasks.forEach(item => {
    if (item.status === 'quiz_items') {
      cnt++;
    }
  });

  const showLeftTask = document.querySelector('.modal_bottom div');
  showLeftTask.innerHTML = `남은 문항 ( <span style="color: #ff0000;">${cnt}</span> / ${tasks.length} )`;

  document.querySelector('.modal_bottom').appendChild(showLeftTask);
  setTimeout(() => {
    closeModal();
  }, 3000);
}

function closeModal() {
  modal.style.display = 'none';
}

// 모달 외부를 클릭하면 닫는 코드
window.onclick = function (event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// 페이지 이동

function goToOxAnswerPage() {
  const queryString = `en_name=${encodeURIComponent(currentuser)}`;
  const oxUrl = `../OX_answer/index.html?${queryString}`;
  window.location.href = oxUrl;
}

function goBack() {
  window.location.href = '../Main/index.html';
  localStorage.setItem('tasks', JSON.stringify([]));
}
