function init() {
  const decodeRef = {
    a: ' h 1',
    b: ' h 2',
    e: ' h 3',
    g: ' h 4',
    j: ' h 5',
    A: ' v 1',
    B: ' v 2',
    E: ' v 3',
    G: ' v 4',
    J: ' v 5',
    n: 'h -1',
    u: ' h -2',
    k: ' h -3',
    x: ' h -4',
    i: ' h -5',
    N: ' v -1',
    U: ' v -2',
    K: ' v -3',
    X: ' v -4',
    I: ' v -5',
    w: ' v ',
    W: ' h ',
    D: '<path d="M',
    o: '<path fill="pink" d="M',
    F: '<path fill="#fff" d="M',
    '/': '/>',
    d: '<path d="M',
    f: '<path fill="#fff" d="M',
  };
  const decode = arr =>
    arr
      .split('')
      .map(c => (!decodeRef[c] ? c : decodeRef[c]))
      .join('');

  const penguinSvg = {
    up: `d 22 11eAbBaBaEaBaAaAaAbAaExGnBuAaBnAkKnNnAuBxUaNuNnInAuAuKaNaNaNaNaNaIaUaUaNbN"/D 68 12jAaAaBaEaBbAbAaAbBiw6nExUnAxAaBkKuNnInAuAuKaUaNbNaUaIaUaNaN"/D 167 12eAbAaBaJaAaBbAaAaAaBW-6AnEnGkUaNuNuNuAaBxUaNuUnKiUaNbNbNaNaUaKaUaNbN"/D 115 13W6AaAaBaGaAbAbAeAaBnAxNnJnAnAkNnAkAaBnAuNnUaNkUnXnAxKaNbNaNaXaXaNaN"/D 215 13gAbBaGaEaAbAaAaGkNnEnBuGkXkNnAxNnNnKnAuAuKaNaNaNaNaNaNaKaKaNaNbN"/`,
    dUp: `d 22 12eAbAaAaAaJaBbAaAaBaEaBiAnAnAnEkUnNxBuUkUnKkKaNaNaNaNaUaXaKaNbN"/D 69 12jAaAaEaBaBaAaAaAbAaAaExNnGnAnExNxAaBuAuKxUaKnNxUaNaNaUbUaXaKaUbN"/D 116 12jAaAeBnAaBaAaAbAbAbAaAaAnAxNuAaJnAnBuAuNiEkKkw-6nAxUaUbUbNaIaXaNaN"/D 167 13jAaAaAaw7aAaAaAaAaAaAaEiNuBnBuAaBxUnNnNuAkNuUnXaNiUaNeNaNaNaNaUaUaNaNaN"/D 216 13W6AaAaAaw8nAbAaBaAaGkNkAnBnEkUuNuNiNkw-6aUxUaNeNeNaNaNaUaNaNaN"/`,
    side: `d 23 11eAeAaBaBeBnAkBaAaAbAaAaBaEkNnNnNnKnUnNnNnNkAuBnBnBnBnBnEnNnNnUnKaKaNaNaUaUaXaNaNbN"/D 69 12jAbAaAjBnAuAnEaAaAbAbAaEkNkUnKnNuNuAuAuBnAnw7aAaAbEkNnKuNnUaUnAxKaNaUbUaIaKaNbN"/D 117 12W6AaAaAaAeAaBxEbAaAeAaBiNuNnUnUW-6AnAnBnw6aBaAaAaBkUiNnUbNaKnAxKaNaNbNaUaw-6aNaNaN"/D 168 12gAbAaBaAaAeBxAnBaAbAaBaEkNnUnKnNnNnNxAnAnAnAnAnBnGnKnAxKaNaNaNaNaNaNaNaXaNaUbN"/D 216 12gAbAaBbAbBkAnEaAbAaAaAaBxNuXnUnNiAnAnAnAnAnAnEaBuNuUaNaNnAxUaNaNbNaNaNaNaNaKaUaNaN"/F 24 16aBnU"/F 71 16aBnU"/F 119 16aBnU"/F 168 16aBnU"/F 216 16aBnU"/F 24 20eAaAaAaBaEaGnAnAkAW-6NkUnNaUaUaUaUaUbN"/F 73 21bAbAaEaBaBnAnAuAuAuAkNnNnw-7aNaUbNbN"/F 118 21W6BaBaAaGnBuAuAiNnUnw-6aUaNaN"/F 168 21gAaAaAaEaGnBnAW-7NiIaUaNaNaNaNaN"/F 216 21jAaBaw7nAnAnAkNiNnUnKaNaNaNaNaNaN"/D 126 31bBxNbN"/D 76 32gBxU"/D 211 32aAnN"/D 163 33gBxU"/D 212 33eAkN"/D 19 34bAeBiK"/D 27 34gBnAkK"/D 170 34gGuNnNnU"/D 218 34eAaBkNnU"/`,
    dDown: `d 23 12eAbAaAaGaGaAaAaAaAaEkNnUnKnUnNnAnNnNxAnAnAnGnBnAnEnNxUaUaUaNaNaNaUaXaUaNaNbN"/D 168 12eAbAaAaBaw6aAaBaAaAaBxNnKnKnNnNnAnNnNiAnAnBnBnBnGnNnUkKaNaNbNaNaNaUaUaUaNaNbN"/D 215 12jAbBaw7aBbBbBaBxNnKnKnNuNnNxAnAnAnAnBnGnGuNnKaKaNuAxNnNaNaNbNbNbNaNaUaUaNaNaN"/D 68 13W6AaAaAaBaEaAaAaAeAaBiNnNnUnNnNnAuNxAnAnJnBnAnAW-6KaNaNaNaNaNaNaIaKaNaN"/D 115 13jAbAaAnBaUaAaBaBeAeAaBW-6UnNnNnNuAkNnAuAnBnGnEnAuAkXaNaUaNaNaNnIaKaNbN"/F 21 16aBnU"/F 122 16aBnU"/F 215 16aBnU"/F 75 17aBnU"/F 167 17aAnN"/F 68 18aBnU"/F 114 18aBnU"/F 173 18aAnN"/F 22 20gAaAaNaAaBaEaBaAnBnAnAkAnAxNuAnNuNnXaNaUaXaNaNaN"/F 118 20aAeNbAaAaAaBaJnBuAnAnAuAxNkNnw-6aXaUaNbN"/F 165 20jAaAaNaAaAaEaw6nAnAkAiNiUnXaUaUaUaNaN"/F 215 20gAaAbAaEaw6nAnAn3XaXaUaNaNaNaN"/F 69 21gAbNaAaAaBaAaJnAuAnBuAxNnAnNuUnKaUaIaNaN"/D 77 32aAaBkUaN"/D 125 32eEkNnNaN"/D 160 32aAnN"/D 27 34eAaBxK"/D 163 34eAaBkNnU"/D 171 34eAaBkNnU"/D 211 34gBxU"/D 219 34bAbBnAkX"/D 20 35bAaBnAuX"/D 69 35aAbBuAuKaN"/D 116 35aAbAaAnAkX"/`,
    down: `d 22 11eAbBaBaEaBaAaAaAbAaEiUnUnUnNnNuAnAnNnNuAnBnBnBnAnAuAuXaNaNaNaNaNaXaUaUaNbN"/D 68 12jAaAaBaEaAaAaAbAaAbBiNnUnUnNuNnAnBuUuAnAnBnEnAnAuAuKaUaNaNaNaNaIaUaNaN"/D 167 12eAbAaBaJaAaBaAbAaAaBiNnNnKnKuNnAnAnNnNuAuBnBnBuAkNnNaNaNbNaNaNaUaKaUaNbN"/D 115 13W6AaAaBaEaBbAbAbAaAaAnAxNuNnUnNnNnNkBnNnNnAuBnBnBnAxKaNaNaNaNaXaKaNaN"/D 215 13gAbBaGaEaAbAaAaGxNnNnKnUnNnNnAnAnNnNuAnAnBnBnAnAxUaUaNbNaNaKaKaNaNbN"/F 19 16aBnU"/F 26 16aBnU"/F 73 16aBnU"/F 165 16aBnU"/F 67 17aBnU"/F 120 17aAnN"/F 171 17aBnU"/F 213 17aBnU"/F 114 18aAnN"/F 219 18aBnU"/F 73 19aAbAaBaBaw6nAnAkAW-7NnNnUnKaKaUaNaNbBbUaN"/F 20 20bAaAaNaNbAaAaBaBaBaEnAnAnAnAW-7NuNnNnNnXaUaUaUaN"/F 165 20bAaAaNaNaAbEaEaw6nAxNkNxNnNnIaUaUbN"/F 116 21aAaAaUeAaAaAaBaw6nAxAW-6NnNnNnIaUaUbN"/F 213 21bAaAaNaNaAaAaBaEaJnAW-6NkNkNnXaUaUaNaN"/D 77 32aExUeN"/D 163 32bAaBxUaN"/D 211 32bAaAxNaN"/D 122 33eAkN"/D 19 34bAaBxUaN"/D 28 34aAaBnAkKbN"/D 67 34bAaBkK"/D 116 34bAaBnAuNnUaN"/D 171 34bEkUaN"/D 218 34bAaEkX"/`,
    turn: `d 356 11jAaAaAaBbNaNaNaNbEnBnBnAnAnBnNnUnUnNuAnAnNnNnAnBnBnAnUnNnNnNnNnNnKbAbAaAbNaUaNaN"/D 23 12gAbAaBaAbBuEaBaAaBaBaEuNnUnEnAnBaBuNnNnNiBuUnNnUnw-6uNxUbNeNbNaNaKaNaNaN"/D 309 13jAaAaBaAaAaAbAbAbBnAkNuNuNnNnUuAnAnNnNkAnBnAkAuAuNnUaNbNbNbNbUaUbN"/D 71 14jAaAaBaAbAaBW-7AnAnBnBnAnw6aBkUnUuNuUaNaUaKaKaKaUaNaN"/D 120 14jAaAaAaEaGaEaw6uNnw-6nKnNnBnNnNuAuAnAnEnAaBaBaBuNnUnNuNuNaNkNaUbNaNbUaKaUaNbN"/D 167 14gAbBaBaEaAaAaAbAaAaBxNkUnUnNnNnAnAnNnNnAuAnBnAkAnAkNnUbNaNaNbNaNaUaUaUbN"/F 355 14aBnU"/F 361 14aBnU"/F 308 16aBnU"/F 314 16aBnU"/D 214 17W6AaAaEaBaAaAbAeBnAiNnNnUnNkAnAnNnNuAnAnAnAxNuUgNaNaNaUaUaNaN"/F 356 17aAaAaNaNbAaBaBaAaBaEnAuAkNkAkNkNnKaUaNaUaUaN"/F 74 18aBnU"/F 166 18aBnU"/F 172 18aBnU"/F 119 19aBnU"/F 126 19aBnU"/F 307 19eAaAaNaNbBaAaBaBaBnAnAiNuAW-6NnUaUaKaUaN"/D 260 20W6AaAaAaAaBbAgBnAnAuNuUnNuNkAuNxAnAnBuAuNuNnUgNeUaUaNbN"/F 213 21aBnU"/F 219 21aBnU"/F 75 22gBaw7nBnAW-8IaNaUaUaNaN"/F 121 22bAaAaUaAaEaw6nAnAxNnNkNnUnNaKaNaNbN"/F 167 22aAaAaNaNaAaAaBaBaAaEnAnAiNkAxNnNnXaNaNaUaNbN"/F 259 24bAuN"/F 265 24bAuN"/D 80 25aAaBaBaAnAnNnNnI"/F 213 25bAaAaNaNeAaBaAaAaGnAn3NuNnKaNaNaNaNaN"/F 258 26gAbNeAbAaBaAaEnAnAn4NnNnKaNaUaNaN"/D 353 29bBnAkUbN"/D 364 29bAbBkNnU"/D 306 30bBnAuUaN"/D 314 30bAaBuNnU"/D 75 34bAaBkK"/D 124 34bAaBuNnU"/D 164 34bEkUaN"/D 171 34bAaBkK"/D 211 35eBxNaN"/D 219 35eAaAxU"/D 258 36eAkN"/D 266 36eAkN"/`,
  };

  const starSvg = `d 7 0bBaBaAjAeUaNaEbAaAkBnAnKuNuAnAnBaBaBkNnNuNuAuAnAkUaUaUnNnNnUjNaUaU"/D 27 1aEbAaAkBnAnKuNnNeUaN"/D 44 1aBaAaAuAnAnUnNnNbNaN"/D 60 1aBbAuBnUuNbU"/D 35 4aBaAaAuAnAnUnNnNbNaN"/D 50 4aBbAuBnUuNbU"/D 24 8aEbAaAkBnAnKuNnNeUaN"/D 41 10aBaAaAuAnAnUnNnNbNaN"/D 57 11aBbAuBnUuNbU"/`;

  const body = document.querySelector('.wrapper');
  const animationFrames = {
    walk: [0, 1, 2, 1, 3, 4],
    stop: [0],
    celebrate: [5, 6, 7, 6, 3, 4],
    turnFromup: [0, 1, 2, 3, 4],
    turnFromdUp: [1, 2, 3, 4],
    turnFromside: [2, 3, 4],
    turnFromdDown: [3, 4],
    turnFromdown: [4],
  };
  const cellSize = 96;
  const directions = {
    up: 0,
    dUp: 1,
    side: 2,
    dDown: 3,
    down: 4,
    turn: 5,
  };
  const spriteNo = Object.keys(penguinSvg).length;
  const sprites = {
    up: 'up',
    upright: 'dUp',
    right: 'side',
    downright: 'dDown',
    down: 'down',
    downleft: 'dDown',
    left: 'side',
    upleft: 'dUp',
    turn: 'turn',
  };
  const turnDirections = Object.keys(sprites);
  const frameSpeed = 100;
  const control = {
    x: null,
    y: null,
    angle: 360,
  };
  const directionConversions = {
    360: 'up',
    45: 'upright',
    90: 'right',
    135: 'downright',
    180: 'down',
    225: 'downleft',
    270: 'left',
    315: 'upleft',
  };
  const distance = 10;
  let star;
  let starInterval;

  const setPos = (target, x, y, bool = true) => {
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    // if (bool === true) {
    //   checkPos(x, y);
    // }

    // FIXME:
    if (penguinData.isDestination === true) {
      penguinData.isDestination = false;
    }

    if (bool === true) {
      const returnList = checkPos(x, y);

      if (!returnList[0]) {
        return;
      }

      penguinData.isDestination = true;

      openModal(returnList[1], returnList[2]);
    }
  };

  const setMargin = (target, x, y) => {
    target.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reverseDirectionConversions = () => {
    const obj = {};
    Object.keys(directionConversions).forEach(k => {
      obj[directionConversions[k]] = k;
    });
    return obj;
  };

  const animatePenguin = penguin => {
    const { frame: i, animation, frameSpeed } = penguinData;
    const penguinSprite = penguin.childNodes[1].childNodes[1];
    setMargin(penguinSprite, `-${animationFrames[animation][i] * cellSize}`, `-${cellSize * directions[sprites[penguinData.direction]]}`);
    penguinData.frame = i === animationFrames[animation].length - 1 ? 0 : i + 1;
    penguinData.frameTimer = setTimeout(() => animatePenguin(penguin), frameSpeed);
    if (animation === 'celebrate' && i === 0) {
      penguinData.jump ? createJumpMark(penguin) : (penguinData.jump = true);
    }
    if (animation !== 'celebrate') penguinData.jump = false;
    // FIXME:
    if (penguin.isDestination === true) penguinData.jump = false;
  };

  const randomDirection = () => {
    return turnDirections.filter(t => t !== 'turn')[Math.floor(Math.random() * turnDirections.length - 1)];
  };

  const penguinData = {
    penguin: null,
    animation: 'walk',
    frame: 0,
    direction: randomDirection(),
    frameTimer: null,
    moveTimer: null,
    turnIndex: Math.floor(Math.random() * 7),
    frameSpeed,
    moveSpeed: 100,
    stop: true,
    stepLeft: true,
    marginPos: { x: 0, y: 0 },
    pos: { x: 0, y: 0 },
    // FIXME:
    isDestination: false,
  };

  const radToDeg = rad => Math.round(rad * (180 / Math.PI));

  const nearestN = (n, denom) => {
    return n === 0 ? 0 : n - 1 + Math.abs(((n - 1) % denom) - denom);
  };

  const overlap = (a, b) => {
    const buffer = 20;
    return Math.abs(a - b) < buffer;
  };

  const clickedAngle = () => {
    const angle = radToDeg(Math.atan2(penguinData.pos.y - control.y, penguinData.pos.x - control.x)) - 90;
    const adjustedAngle = angle < 0 ? angle + 360 : angle;
    return nearestN(adjustedAngle, 45);
  };

  const animateSvg = ({ target, start, end, interval, speed }) => {
    const startFrame = start || 0;
    let i = startFrame;
    clearInterval(interval);
    interval = setInterval(() => {
      target.style.marginLeft = `${-(i * 100)}%`;
      i = i >= end ? startFrame : i + 1;
    }, speed || 100);
  };

  const changeAnimation = animation => {
    penguinData.frame = 0;
    penguinData.animation = animation;
  };

  const stopPenguin = animation => {
    changeAnimation(animation);
    penguinData.stop = true;
  };

  const startPenguin = penguin => {
    animatePenguin(penguin);
    penguinData.stop = false;
  };

  const checkBoundaryAndUpdatePenguinPos = (x, y, penguin, penguinData) => {
    const lowerLimit = -40; // buffer from window edge
    const upperLimit = 40;

    if (x > lowerLimit && x < body.clientWidth - upperLimit) {
      penguinData.marginPos.x = x;
    }
    if (y > lowerLimit && y < body.clientHeight - upperLimit) {
      penguinData.marginPos.y = y;
    }
    setMargin(penguin, x, y);
  };

  const createMark = (penguin, angle) => {
    const { height, left, top } = penguin.getBoundingClientRect();
    const mark = document.createElement('div');
    penguinData.stepLeft = !penguinData.stepLeft;
    mark.className = 'foot_print';
    mark.style.transform = `rotate(${angle}deg) scale(${penguinData.stepLeft ? -1 : 1}, 1)`;
    penguinData.pos.x = left + 5;
    penguinData.pos.y = top + (height - 20);
    setPos(mark, penguinData.pos.x, penguinData.pos.y, false);
    body.append(mark);
    setTimeout(() => body.removeChild(mark), 10000);
  };

  const createJumpMark = penguin => {
    // FIXME:
    if (penguinData.isDestination === true) {
      return;
    }

    const { left, top } = penguin.childNodes[1].childNodes[3].childNodes[1].getBoundingClientRect();
    const mark = document.createElement('div');
    mark.className = 'jump_print';

    setPos(mark, left + 1, top + 33);
    body.append(mark);
    setTimeout(() => body.removeChild(mark), 10000);
  };

  const touchedTheStar = (x, y) => {
    return (x === penguinData.marginPos.x && y === penguinData.marginPos.y) || (overlap(control.x, penguinData.pos.x) && overlap(control.y, penguinData.pos.y));
  };

  const moveAbout = penguin => {
    const penguinDir = +reverseDirectionConversions()[penguinData.direction];
    const angle = clickedAngle();

    const turnValue = penguinDir === angle ? 0 : penguinDir < angle ? 1 : -1;

    penguinData.turnIndex += turnValue;
    if (penguinData.turnIndex < 0) penguinData.turnIndex = 7;
    if (penguinData.turnIndex > 7) penguinData.turnIndex = 0;
    penguinData.direction = turnDirections[penguinData.turnIndex];
    const { direction: dir } = penguinData;
    penguin.childNodes[1].className = `penguin_inner_wrapper facing_${dir}`;

    createMark(penguin.childNodes[1].childNodes[3].childNodes[1], penguinDir);

    let { x, y } = penguinData.marginPos;

    if (dir !== 'up' && dir !== 'down') x += dir.includes('left') ? -distance : distance;
    if (dir !== 'left' && dir !== 'right') y += dir.includes('up') ? -distance : distance;

    if (touchedTheStar(x, y)) {
      checkBoundaryAndUpdatePenguinPos(control.x, control.y, penguin, penguinData);
      stopPenguin('turnFrom' + sprites[dir]);
      penguinData.direction = 'turn';
      setTimeout(() => {
        if (penguinData.direction === 'turn') {
          stopPenguin('celebrate');
        }
      }, 100 * animationFrames['turnFrom' + sprites[dir]].length);
      star.classList.remove('twinkle');
      animateSvg({
        target: star.childNodes[1],
        end: 3,
        interval: starInterval,
      });
      setTimeout(() => {
        if (touchedTheStar(x, y)) {
          clearInterval(starInterval);
          body.removeChild(star);
          star = null;
        }
      }, 400);
    }

    checkBoundaryAndUpdatePenguinPos(x, y, penguin, penguinData);
    if (!penguinData.stop)
      penguinData.moveTimer = setTimeout(() => {
        moveAbout(penguin);
      }, penguinData.moveSpeed);
  };

  const svgWrapper = ({ content, w, h, frameWidth, spriteNo }) =>
    `<svg x="0px" y="0px" width="${frameWidth}%" height="${100 / spriteNo}%" viewBox="0 0 ${w} ${h}">${content}</svg>`;

  const mapPenguinAssets = () =>
    Object.keys(directions)
      .map(dir => {
        return dir === 'turn'
          ? svgWrapper({
              content: decode(penguinSvg[dir]),
              w: 384,
              h: 48,
              frameWidth: 100,
              spriteNo,
            })
          : svgWrapper({
              content: decode(penguinSvg[dir]),
              w: 240,
              h: 48,
              frameWidth: (100 / 8) * 5,
              spriteNo,
            });
      })
      .join('');

  const createPenguin = (x, y) => {
    const penguin = document.createElement('div');
    penguin.className = 'penguin_wrapper';
    penguin.innerHTML = `
      <div class="penguin_inner_wrapper">
        <div class="penguin_sprite">
          ${mapPenguinAssets()}
        </div>
        <div class="hit_wrapper">
          <div class="hit_area">
          </div>
        </div>
      </div>
      `;
    setMargin(penguin, x, y);
    body.append(penguin);
    const { width, height, left, top } = penguin.getBoundingClientRect();

    Object.assign(penguinData, {
      penguin: penguin,
      marginPos: { x, y },
      pos: {
        x: left + width / 2,
        y: top + height / 2,
      },
    });
    startPenguin(penguin);
    stopPenguin('stop');
  };

  createPenguin(body.clientWidth / 2 - 48, body.clientHeight / 2 - 48);

  const createStar = () => {
    if (star) {
      body.removeChild(star);
      star = null;
    }
    star = document.createElement('div');
    star.className = 'star twinkle';
    star.innerHTML = `
      <div class="star_sprite">
        ${svgWrapper({
          content: decode(starSvg),
          w: 64,
          h: 16,
          frameWidth: 100,
          spriteNo: 1,
        })}
      </div>`;
    setPos(star, control.x - 8, control.y - 8, false);
    body.append(star);
  };

  body.addEventListener('click', e => {
    control.x = e.pageX;
    control.y = e.pageY;
    createStar();

    if (penguinData.stop) {
      changeAnimation('walk');
      penguinData.stop = false;
      moveAbout(penguinData.penguin, penguinData);
    }
  });
}

window.addEventListener('DOMContentLoaded', init);

// enter 입력 시 메인이미지 안보이게
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      document.getElementById('start-gif__content').classList.add('disappear');
      document.getElementById('start-gif__content').setAttribute('class', 'remove');
    }
  });
});
makeStartGifVisible();

function makeStartGifVisible() {
  const startGif = document.querySelector('#start-gif__content');
  const point = localStorage.getItem('point');
  console.log(point);
  if (!point) {
    startGif.style.display = 'block';
  }
}

// testBox 위치 미리 저장

const testBoxList = document.querySelectorAll('.test');

const fourPoint = JSON.parse(localStorage.getItem('point')) || [];

testBoxList.forEach(item => {
  const rect = item.getBoundingClientRect();

  let kName;
  switch (item.id) {
    case 'kim':
      kName = '김기정';
      break;
    case 'park':
      kName = '박민석';
      break;
    case 'yoon':
      kName = '윤동훈';
      break;
    case 'lee':
      kName = '이재아';
      break;
    default:
      break;
  }

  const rectPoint = {
    name: item.id,
    koreanName: kName,
    topLeft: { x: rect.left, y: rect.top },
    bottomRight: { x: rect.right, y: rect.bottom },
  };
  fourPoint.push(rectPoint);
});

updateLocalStoragePoint();

function updateLocalStoragePoint() {
  localStorage.setItem('point', JSON.stringify(fourPoint));
}

// 각 요소의 좌측 상단과 우측 하단 좌표를 가져와서 로컬스토리지에 저장

function checkPos(cur_x, cur_y) {
  const fourBoxPoints = [...fourPoint.slice(-5)];
  let isPosInDestination = false;
  let ko_name = null;
  let en_name = null;
  for (let i = 0; i < fourBoxPoints.length; i++) {
    if (
      fourBoxPoints[i]['topLeft']['x'] <= cur_x &&
      cur_x <= fourBoxPoints[i]['bottomRight']['x'] &&
      fourBoxPoints[i]['topLeft']['y'] <= cur_y &&
      cur_y <= fourBoxPoints[i]['bottomRight']['y']
    ) {
      isPosInDestination = true;
      ko_name = fourBoxPoints[i]['koreanName'];
      en_name = fourBoxPoints[i]['name'];
      break;
    }
  }

  return [isPosInDestination, en_name, ko_name];
}

const kim_task = JSON.parse(localStorage.getItem('kim_task')) || [];
const park_task = JSON.parse(localStorage.getItem('park_task')) || [];
const yoon_task = JSON.parse(localStorage.getItem('yoon_task')) || [];
const lee_task = JSON.parse(localStorage.getItem('lee_task')) || [];

// 마우스 클릭 시, 해당 위치에 변경
function clickEffect(e) {
  let d = document.createElement('div');
  d.className = 'clickEffect';
  d.style.top = e.clientY + 'px';
  d.style.left = e.clientX + 'px';
  document.body.appendChild(d);
  d.addEventListener(
    'animationend',
    function () {
      d.parentElement.removeChild(d);
    }.bind(this)
  );
}
document.addEventListener('click', clickEffect);

// 압장 확인 모달

const modal = document.getElementById('myModal');
const boardModal = document.getElementById('myBoardModal');

function openModal(en_name, ko_Name) {
  if (en_name !== 'board') {
    modal.style.display = 'block';

    const modal_charactor = document.getElementById('modal_charactor');
    modal_charactor.setAttribute('src', `../image/main/${en_name}_char.png`);

    const modal_charactor_name = document.getElementById('modal_charactor_name');
    modal_charactor_name.setAttribute('src', `../image/main/${en_name}.png`);

    const showName = document.querySelector('.modal_bottom_text');

    if (JSON.parse(localStorage.getItem(`${en_name}_score`)) !== null) {
      showName.textContent = `${ko_Name}님의 소개를 보시겠습니까?`;

      const yesBtn = document.querySelector('.modal_bottom_btn_yes');
      yesBtn.addEventListener('click', () => {
        goToOxAnswerWithParameter(en_name);
      });
    } else {
      showName.textContent = `${ko_Name}님의 퀴즈를 푸시겠습니까?`;

      const yesBtn = document.querySelector('.modal_bottom_btn_yes');
      yesBtn.addEventListener('click', () => {
        goToOxQuizWithParameter(en_name);
      });
    }

    document.querySelector('.modal_bottom_img_area').appendChild(modal_charactor);
    document.querySelector('.modal_bottom_img_area').appendChild(modal_charactor_name);
  } else {
    boardModal.style.display = 'block';
  }
}

function closeModal() {
  modal.style.display = 'none';
}

// 모달 외부를 클릭하면 닫는 코드
window.onclick = function (event) {
  let modal = document.getElementById('myModal');
  let boardModal = document.getElementById('myBoardModal');

  if (event.target == modal) {
    modal.style.display = 'none';
  }

  if (event.target == boardModal) {
    boardModal.style.display = 'none';
  }
};

// 이동 link

function goToAnotherPage(folder, filename) {
  window.location.href = `../${folder}/${filename}.html`;
}

function goToOxQuizWithParameter(en_name) {
  const queryString = `en_name=${encodeURIComponent(en_name)}`;
  const oxUrl = `../OX_quiz/index.html?${queryString}`;
  window.location.href = oxUrl;
  localStorage.setItem('en_name', JSON.stringify(en_name));
}

function goToOxAnswerWithParameter(en_name) {
  const queryString = `en_name=${encodeURIComponent(en_name)}`;
  const oxUrl = `../OX_answer/index.html?${queryString}`;
  window.location.href = oxUrl;
}

function goBack() {
  window.history.back();
}

// 문제 풀이 여부에 따라 3가지로 변경

// 다 푼거 ox_quiz_score_complete
// 풀이 증 ox_quiz_score_ing
// 시작 전 ox_quiz_score_not_start

const scoreList = document.querySelectorAll('.ox_score');
const taskList = [{ ...kim_task }, { ...park_task }, { ...yoon_task }, { ...lee_task }];

scoreList.forEach((item, idx) => {
  let user;
  switch (idx) {
    case 0:
      user = 'kim';
      break;
    case 1:
      user = 'park';
      break;
    case 2:
      user = 'yoon';
      break;
    case 3:
      user = 'lee';
      break;

    default:
      break;
  }

  const taskLength = Object.keys(taskList[idx]).length;
  const doneCnt = statusCheck(taskList[idx]);

  if (taskLength === 0 || taskLength - doneCnt === taskLength) {
    item.textContent = 'Play it !';
    item.classList.add('ox_quiz_score_not_start');
  } else {
    if (JSON.parse(localStorage.getItem(`${user}_score`)) !== null) {
      item.textContent = 'Complete';
      item.classList.add('ox_quiz_score_complete');
    } else {
      item.textContent = `${doneCnt} / ${taskLength}`;
      item.classList.add('ox_quiz_score_ing');
    }
  }
});

function statusCheck(taskObj) {
  let cnt = 0;
  for (let key in taskObj) {
    if (taskObj[key]['status'] === 'quiz_items') {
      cnt++;
    }
  }

  return Object.keys(taskObj).length - cnt;
}
