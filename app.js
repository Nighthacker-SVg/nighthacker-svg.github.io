// app.js - safe DOM-ready version with correct dithering logic and theme toggle

document.addEventListener('DOMContentLoaded', () => {
  // initialize lucide if available
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  const $ = (id) => document.getElementById(id);

  // Elements (may be null)
  const leftPanel = $('leftPanel');
  const rightPanel = $('rightPanel');
  const navbar = $('navbar');
  const themeBtn = $('themeBtn');

  // Tab switching
  function switchTab(tabName) {
    const tabs = ['resume', 'darknots'];
    tabs.forEach(t => {
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

  // Theme state
  let isDarkMode = true;

  function applyTheme() {
    if (isDarkMode) {
      document.body.style.background = '#0b0b0b';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.background = '#ffffff';
      document.body.style.color = '#000000';
    }

    if (leftPanel) {
      leftPanel.style.background = isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)';
      leftPanel.style.color = isDarkMode ? '#fff' : '#000';
    }
    if (rightPanel) {
      rightPanel.style.background = isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.02)';
    }
    if (navbar) {
      navbar.style.border = isDarkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)';
      navbar.style.background = isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)';
    }
    if (themeBtn) {
      themeBtn.innerHTML = isDarkMode ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    }
  }

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    applyTheme();
  }
  window.toggleTheme = toggleTheme;

  // Copy email
  function copyEmail() {
    const email = 'Hirentank70@gmail.com';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }

    const btnText = $('copyText');
    if (!btnText) return;
    const original = btnText.innerText;
    btnText.innerText = 'Copied!';
    setTimeout(() => { btnText.innerText = original; }, 2000);
  }
  window.copyEmail = copyEmail;

  // Dithering canvas visual
  function initDithering(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const w = 64, h = 64;
    canvas.width = w; canvas.height = h;

    let time = 0;
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];

    function smoothstep(min, max, value) {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    }

    function animate() {
      time += 0.015;
      const backColor = isDarkMode ? { r: 5, g: 5, b: 5 } : { r: 245, g: 245, b: 245 };
      const frontColor = isDarkMode ? { r: 255, g: 255, b: 255 } : { r: 100, g: 149, b: 237 };

      const imgData = ctx.createImageData(w, h);
      const data = imgData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const nx = (x / w) * 2 - 1;
          const ny = (y / h) * 2 - 1;

          const cx = Math.sin(time * 1.2) * 0.3;
          const cy = Math.cos(time * 0.9) * 0.3;

          const dist = Math.sqrt((nx - cx) * (nx - cx) + (ny - cy) * (ny - cy));
          const radius = 0.6 + Math.sin(Math.atan2(ny, nx) * 5 + time * 2) * 0.1;

          const value = 1.0 - smoothstep(radius - 0.2, radius + 0.2, dist);
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

  // initial apply and start
  applyTheme();
  initDithering('ditherCanvas');
  initDithering('ditherCanvasMobile');
});
