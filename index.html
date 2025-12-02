document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  const $ = (id) => document.getElementById(id);

  let leftPanel = $('leftPanel');
  let rightPanel = $('rightPanel');
  let navbar = $('navbar');
  let themeBtn = $('themeBtn');

  function switchTab(tabName) {
    const tabs = ['resume', 'darknots'];
    tabs.forEach((t) => {
      const tabEl = $(`tab-${t}`);
      if (tabEl) tabEl.classList.add('hidden');
      const btn = $(`btn-${t}`);
      if (btn) {
        btn.classList.replace('opacity-100', 'opacity-60');
        btn.classList.remove('font-bold');
      }
    });
    const activeTab = $(`tab-${tabName}`);
    const activeBtn = $(`btn-${tabName}`);
    if (activeTab) activeTab.classList.remove('hidden');
    if (activeBtn) {
      activeBtn.classList.replace('opacity-60', 'opacity-100');
      activeBtn.classList.add('font-bold');
    }
  }
  window.switchTab = switchTab;

  let isDarkMode = true;
  function applyTheme() {
    if (isDarkMode) {
      document.body.classList.remove('bg-white', 'text-black');
      document.body.classList.add('bg-black', 'text-white');
    } else {
      document.body.classList.remove('bg-black', 'text-white');
      document.body.classList.add('bg-white', 'text-black');
    }
    if (leftPanel) {
      if (isDarkMode) leftPanel.classList.add('bg-black', 'text-white');
      else leftPanel.classList.add('bg-white', 'text-black');
    }
    if (rightPanel) {
      if (isDarkMode) rightPanel.classList.add('bg-black');
      else rightPanel.classList.add('bg-white');
    }
    if (navbar) {
      if (isDarkMode) {
        navbar.classList.remove('border-black/10', 'bg-white/80');
        navbar.classList.add('border-white/10', 'bg-black/80');
      } else {
        navbar.classList.remove('border-white/10', 'bg-black/80');
        navbar.classList.add('border-black/10', 'bg-white/80');
      }
    }
    if (themeBtn) {
      if (isDarkMode) themeBtn.innerHTML = '<i data-lucide="sun"></i>';
      else themeBtn.innerHTML = '<i data-lucide="moon"></i>';
      if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    }
  }
  function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme();
  }
  window.toggleTheme = toggleTheme;

  function copyEmail() {
    const email = "Hirentank70@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(()=>{});
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly','');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch(e){}
      document.body.removeChild(ta);
    }
    const btnText = $('copyText');
    if (!btnText) return;
    const original = btnText.innerText;
    btnText.innerText = "Copied!";
    setTimeout(()=>{ btnText.innerText = original; }, 2000);
  }
  window.copyEmail = copyEmail;

  function initDithering(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    const w = 64, h = 64;
    canvas.width = w; canvas.height = h;
    let time = 0;
    const bayerMatrix = [
      [0,8,2,10],
      [12,4,14,6],
      [3,11,1,9],
      [15,7,13,5],
    ];
    function smoothstep(min, max, value) {
      var x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    }
    function animate() {
      time += 0.015;
      let backColor = isDarkMode ? {r:5,g:5,b:5} : {r:245,g:245,b:245};
      let frontColor = isDarkMode ? {r:255,g:255,b:255} : {r:100,g:149,b:237};
      const imgData = ctx.createImageData(w,h);
      const data = imgData.data;
      for (let y=0;y<h;y++){
        for (let x=0;x<w;x++){
          const nx = (x / w) * 2 - 1;
          const ny = (y / h) * 2 - 1;
          const cx = Math.sin(time * 1.2) * 0.3;
          const cy = Math.cos(time * 0.9) * 0.3;
          const dist = Math.sqrt((nx - cx)*(nx - cx) + (ny - cy)*(ny - cy));
          const radius = 0.6 + Math.sin(Math.atan2(ny, nx) * 5 + time * 2) * 0.1;
          let value = 1.0 - smoothstep(radius - 0.2, radius + 0.2, dist);
          const threshold = bayerMatrix[y % 4][x % 4] / 16.0;
          const isFront = (value + (threshold - 0.5) * 0.5) > 0.5;
          const index = (y * w + x) * 4;
          if (isFront) {
            data[index] = frontColor.r;
            data[index + 1] = frontColor.g;
            data[index + 2] = frontColor.b;
          } else {
            data[index] = backColor.r;
            data[index + 1] = backColor.g;
            data[index + 2] = backColor.b;
          }
          data[index + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(animate);
    }
    animate();
  }

  applyTheme();
  initDithering('ditherCanvas');
  initDithering('ditherCanvasMobile');
});
