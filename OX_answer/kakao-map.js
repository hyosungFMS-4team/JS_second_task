/* ============= 개인별 커스텀 필요 항목 ====================*/
// 1. 집 위치
let destCoord = {
  latitude: 37.2526,
  longtitude: 127.0723,
};

// 2. 캐릭터 및 발자국 이미지
let characterImgSrc = '../image/map/rabbit.gif';
let characterFootprintImgSrc = '../image/map/footprint.png';

// TODO: distance에 따라 자동 설정 -> 어려울듯? 그냥 각자 해보고 넣는게 좋아보임
// 3. 캐릭터 이동속도 (ms)
let moveSpeed = 50;

// 4. 발자국 간격
let moveInterval = 0.03;
/*========================================================== */

/* ====== localstorage ======*/
const player = new URLSearchParams(window.location.search).get('en_name');
characterImgSrc = `../image/main/${player}_jump.gif`;
switch (player) {
  case 'park':
    destCoord = { latitude: 37.2906, longtitude: 127.0506 };
    break;
  case 'kim':
    destCoord = { latitude: 37.5731, longtitude: 126.9986 };
    moveInterval = 0;
    moveSpeed = 1000;
    break;
  case 'yoon':
    destCoord = { latitude: 37.6388, longtitude: 127.009 };
    break;
  case 'lee':
    destCoord = { latitude: 37.5434, longtitude: 126.9521 };
    break;
}

/* ============= MAIN ====================*/
const mapContainer = document.getElementById('map');
const mapUl = document.getElementById('mapUl');
let animationStarted = false;
(async () => {
  // 시작(현재), 종료 좌표
  const curCoord = await getCurCoord();

  // 카카오맵
  const map = new kakao.maps.Map(mapContainer, {
    center: new kakao.maps.LatLng(curCoord.latitude, curCoord.longtitude),
    level: 3,
  });

  const animations = setInterval(() => {
    if (animationStarted) {
      clearInterval(animations);
      return;
    }
    if (!mapContainer.parentElement.parentElement.classList.contains('flipped')) {
      return;
    }
    startAnimations(map, curCoord, destCoord);
    animationStarted = true;
  }, 100);
})();
/* =======================================*/

async function getCurCoord() {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return {
    longtitude: pos.coords.longitude,
    latitude: pos.coords.latitude,
  };
}

function setMarkersOnMap(map, coords) {
  const imageSrc = '../image/map/marker.png';
  const imageSize = new kakao.maps.Size(30, 30);
  const imageOption = { offset: new kakao.maps.Point(0, 0) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

  const mapBounds = new kakao.maps.LatLngBounds();
  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const point = new kakao.maps.LatLng(coord.latitude, coord.longtitude);

    const marker = new kakao.maps.Marker({ position: point, image: markerImage });
    marker.setMap(map);
    mapBounds.extend(point);
  }
  map.setBounds(mapBounds);
}

async function getCarDirection(start, end) {
  const url = 'https://apis-navi.kakaomobility.com/v1/directions';
  const REST_API_KEY = 'e639f9820bd9dfd6a0627ecb6b06f5f3';

  const origin = `${start.longtitude},${start.latitude}`;
  const destination = `${end.longtitude},${end.latitude}`;
  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destination,
  });

  const headers = {
    Authorization: `KakaoAK ${REST_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const requestUrl = `${url}?${queryParams}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

function directionToPath(direction) {
  const linePath = [];
  direction.routes[0].sections[0].roads.forEach(router => {
    router.vertexes.forEach((_, index) => {
      if (index % 2 === 0) {
        linePath.push(new kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
      }
    });
  });

  return linePath;
}

async function startAnimations(map, startPos, destPos) {
  // 출발지 목표지 애니메이션
  await setShowLocAnimation(map, startPos, destPos);

  // 시작, 종료 마커
  setMarkersOnMap(map, [startPos, destPos]);

  // 시작 -> 종료 경로
  const carDirection = await getCarDirection(startPos, destPos);
  const pathPositions = directionToPath(carDirection);

  // 이동 애니메이션
  setSpeedAndInterval(carDirection);
  setMovingAnimation(map, pathPositions, carDirection);
}

async function setShowLocAnimation(map, startPos, destPos) {
  const marker = new kakao.maps.Marker();

  const imageSrc = characterImgSrc;
  const imageSize = new kakao.maps.Size(100, 100);
  const imageOption = { offset: new kakao.maps.Point(0, 0) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  const charMarker = new kakao.maps.Marker({
    image: markerImage,
  });

  const infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

  const customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    xAnchor: 1,
    yAnchor: 1,
    zindex: 10,
  });

  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.coord2Address(startPos.longtitude, startPos.latitude, (result, status) => {
    if (status != kakao.maps.services.Status.OK) return;

    const pos = new kakao.maps.LatLng(startPos.latitude, startPos.longtitude);
    map.panTo(pos);
    marker.setPosition(pos);
    marker.setMap(map);

    charMarker.setPosition(pos);
    charMarker.setMap(map);

    infowindow.setContent(`<div class="map-char-info-window">${result[0].address.address_name}</div>`);
    infowindow.open(map, marker);
  });

  await new Promise(r => setTimeout(r, 2000));

  geocoder.coord2Address(destPos.longtitude, destPos.latitude, (result, status) => {
    if (status != kakao.maps.services.Status.OK) return;

    const pos = new kakao.maps.LatLng(destPos.latitude, destPos.longtitude);
    map.panTo(pos);
    marker.setPosition(pos);
    marker.setMap(map);

    charMarker.setPosition(pos);
    charMarker.setMap(map);

    infowindow.setContent(`<div class="map-char-info-window">${result[0].address.address_name}</div>`);
    infowindow.open(map, marker);
  });

  await new Promise(r => setTimeout(r, 2000));

  infowindow.close();
  marker.setMap(null);
  charMarker.setMap(null);
  customOverlay.setMap(null);
}

function setSpeedAndInterval(direction) {
  const directionInfo = direction.routes[0].summary;
  const duration = directionInfo.duration;
  const distance = directionInfo.distance;

  moveSpeed = duration / 500;
  moveInterval = duration / 500000;

  console.log('speed: ', moveSpeed, ' interval: ', moveInterval);
}

function setMovingAnimation(map, pathPositions, carDirection) {
  const content = document.createElement('div');
  content.classList.add('map-animation-marker');
  content.style.backgroundImage = `url("${characterImgSrc}")`;

  const customOverlay = new kakao.maps.CustomOverlay({
    position: pathPositions[0],
    content: content,
    map: map,
  });

  let index = 1;
  let footPrintIndex = 0;
  let increment = 3;
  let firstEnd = true;

  let prevPosition = null;

  const imageSrc = characterFootprintImgSrc;
  const imageSize = new kakao.maps.Size(15, 15);
  const imageOption = { offset: new kakao.maps.Point(0, 0) };
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  const footMarkers = [];
  const moveAnimation = setInterval(() => {
    index += increment;
    footPrintIndex += 1;
    if (index >= pathPositions.length || index <= 0) {
      increment *= -1;
      index = increment < 0 ? pathPositions.length - 1 : 0;
      footPrintIndex = 0;

      // 발자국 지우기
      // footMarkers.forEach((item) => item.setVisible(false));

      if (firstEnd) {
        clearInterval(moveAnimation);
        showDirectionInfo(mapUl, carDirection);
        firstEnd = false;
        prevPosition = null;
      }
    }
    // console.log((Math.abs(prevPosition.La - pathPositions[index].La) + Math.abs(prevPosition.Ma - pathPositions[index].Ma)));

    // 발자국 표시
    if (prevPosition == null || Math.abs(prevPosition.La - pathPositions[index].La) + Math.abs(prevPosition.Ma - pathPositions[index].Ma) >= moveInterval) {
      const marker = new kakao.maps.Marker({ position: pathPositions[index], image: markerImage });
      marker.setZIndex(-1);
      marker.setMap(map);
      footMarkers.push(marker);
      prevPosition = pathPositions[index];
    }

    customOverlay.setPosition(pathPositions[index]);
  }, moveSpeed);
}

function showDirectionInfo(container, direction) {
  const directionInfo = direction.routes[0].summary;

  container.innerHTML = `
        <li>거리 - ${Math.round(directionInfo.distance / 1000)}KM</li>
        <li>시간 - ${Math.round(directionInfo.duration / 60)}분</li>
        <li>택시로오면 ${directionInfo.fare.taxi}원</li>`;

  document.getElementById('dropdown').open = true;
}

function onDetailCloseClicked(event) {
  const infoDiv = document.getElementById('map-detail-info-div');
  infoDiv.parentElement.removeChild(infoDiv);
  event.stopPropagation();
}
