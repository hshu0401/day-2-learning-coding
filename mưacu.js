console.log('muracu.js loaded'); // để kiểm tra trên Pages

window.addEventListener('DOMContentLoaded', () => {
  const layer = document.getElementById('rain-layer');
  if (!layer) {
    console.error('No #rain-layer found');
    return;
  }

  // cấu hình theo màn hình
  const isMobile = window.matchMedia('(max-width: 599px)').matches;
  const cfg = isMobile
    ? { sizeMin: 8,  sizeMax: 16, interval: 260, durMin: 2.4, durMax: 4.2 }
    : { sizeMin: 10, sizeMax: 22, interval: 180, durMin: 2.0, durMax: 5.0 };

  function createDrop(){
    const drop = document.createElement('div');
    drop.className = 'raindrop';

    drop.style.left = Math.random() * window.innerWidth + 'px';
    drop.style.top = '-120px';

    const size = cfg.sizeMin + Math.random() * (cfg.sizeMax - cfg.sizeMin);
    drop.style.width  = size + 'px';
    drop.style.height = size * 2.5 + 'px';

    const duration = cfg.durMin + Math.random() * (cfg.durMax - cfg.durMin);
    const delay = Math.random() * 1.8;
    drop.style.animation = `fall ${duration}s linear ${delay}s forwards`;

    layer.appendChild(drop);
    setTimeout(() => drop.remove(), (duration + delay) * 1000 + 300);
  }

  // tạo vài giọt ngay để bạn thấy liền
  for (let i = 0; i < 10; i++) createDrop();
  setInterval(createDrop, cfg.interval);
});