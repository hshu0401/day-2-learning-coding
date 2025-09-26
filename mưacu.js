console.log('rain.js loaded');
const layer = document.getElementById('rain-layer');
// Cấu hình theo kích thước màn hình
function getConfig() {
  const isMobile = window.matchMedia('(max-width: 599px)').matches;
  // Mobile: giọt nhỏ hơn, ít giọt hơn; Desktop: to hơn, dày hơn
  return isMobile
    ? { sizeMin: 8,  sizeMax: 16, interval: 260, durMin: 2.4, durMax: 4.2 }
    : { sizeMin: 10, sizeMax: 22, interval: 180, durMin: 2.0, durMax: 5.0 };
}

let cfg = getConfig();
let timerId = null;

function createDrop(){
  const drop = document.createElement('div');
  drop.className = 'raindrop';

  // vị trí ngang ngẫu nhiên trong màn hình
  drop.style.left = Math.random() * window.innerWidth + 'px';
  drop.style.top = '-120px';

  // kích thước theo cấu hình
  const size = cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
  drop.style.width  = size + 'px';
  drop.style.height = size * 2.5 + 'px';

  // thời lượng & trễ ngẫu nhiên
  const duration = cfg.durMin + Math.random() * (cfg.durMax - cfg.durMin);
  const delay = Math.random() * 1.8; // 0–1.8s
  drop.style.animation = `fall ${duration}s linear ${delay}s forwards`;

  layer.appendChild(drop);
  setTimeout(() => drop.remove(), (duration + delay) * 1000 + 200);
}

function startRain(){
  if (timerId) clearInterval(timerId);
  timerId = setInterval(createDrop, cfg.interval);
}

// Khởi động
startRain();

// Nếu đổi kích thước màn hình, cập nhật cấu hình & mật độ mưa
window.addEventListener('resize', () => {
  const newCfg = getConfig();
  if (newCfg.interval !== cfg.interval ||
      newCfg.sizeMin  !== cfg.sizeMin ||
      newCfg.sizeMax  !== cfg.sizeMax) {
    cfg = newCfg;
    startRain();
  }
});
