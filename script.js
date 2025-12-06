/* FafecomSite - frontend-only app that composes an icon and makes it clickable to the site */
const fileInput = document.getElementById('file');
const imageUrlInput = document.getElementById('imageUrl');
const siteInput = document.getElementById('site');
const sealInput = document.getElementById('seal');
const surpriseBtn = document.getElementById('surprise');
const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');
const iconWrap = document.getElementById('iconWrap');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const SAMPLE_IMAGES = [
  'https://picsum.photos/id/1015/800/800',
  'https://picsum.photos/id/1025/800/800',
  'https://picsum.photos/id/1003/800/800',
  'https://picsum.photos/id/1001/800/800',
  'https://picsum.photos/id/1011/800/800',
  'https://picsum.photos/id/1018/800/800'
];

const SAMPLE_SITES = [
  'https://www.youtube.com',
  'https://web.whatsapp.com',
  'https://maps.google.com',
  'https://twitter.com',
  'https://instagram.com',
  'https://example.com'
];

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

surpriseBtn.addEventListener('click', ()=>{
  const img = pickRandom(SAMPLE_IMAGES);
  const site = pickRandom(SAMPLE_SITES);
  imageUrlInput.value = img;
  siteInput.value = site;
  sealInput.value = 'fafecom';
});

async function loadImage() {
  if (fileInput.files && fileInput.files[0]) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileInput.files[0]);
    });
  }

  const url = imageUrlInput.value.trim();
  if (url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Falha ao carregar imagem da URL'));
      img.src = url;
    });
  }

  const rand = pickRandom(SAMPLE_IMAGES);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = rand;
  });
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

async function generateIcon() {
  try {
    generateBtn.disabled = true;
    generateBtn.textContent = 'Gerando...';

    const img = await loadImage();
    const seal = (sealInput.value || 'fafecom').trim();
    const site = siteInput.value.trim() || 'https://example.com';

    const size = 512;
    canvas.width = size;
    canvas.height = size;

    const scale = Math.max(size / img.width, size / img.height);
    const sw = size / scale;
    const sh = size / scale;
    const sx = (img.width - sw) / 2;
    const sy = (img.height - sh) / 2;

    ctx.clearRect(0,0,size,size);
    roundedRect(ctx, 0, 0, size, size, Math.round(size*0.18));
    ctx.save();
    ctx.clip();

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);

    ctx.fillStyle = 'rgba(0,0,0,0.14)';
    ctx.fillRect(0, size - Math.round(size*0.18) - Math.round(size*0.04), size, Math.round(size*0.18) + Math.round(size*0.04));

    ctx.restore();

    const badgeW = Math.round(size * 0.36);
    const badgeH = Math.round(size * 0.12);
    const badgeX = size - badgeW - Math.round(size*0.04);
    const badgeY = size - badgeH - Math.round(size*0.04);
    const radius = Math.round(badgeH * 0.35);

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    roundedRect(ctx, badgeX, badgeY, badgeW, badgeH, radius);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = Math.round(badgeH * 0.5);
    ctx.font = `${fontSize}px system-ui, Roboto, Arial`;
    ctx.fillText(seal, badgeX + badgeW/2, badgeY + badgeH/2);

    try {
      const u = new URL(site);
      const host = u.hostname.replace('www.', '');
      const initial = host.charAt(0).toUpperCase();
      ctx.font = `${Math.round(size*0.14)}px system-ui, Roboto, Arial`;
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillText(initial, Math.round(size*0.12), Math.round(size*0.24));
    } catch(e) {}

    const dataUrl = canvas.toDataURL('image/png');

    iconWrap.innerHTML = '';
    const a = document.createElement('a');
    a.href = site;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const imgEl = document.createElement('img');
    imgEl.src = dataUrl;
    imgEl.alt = 'Ícone Fafecom';
    a.appendChild(imgEl);
    iconWrap.appendChild(a);

    downloadBtn.disabled = false;
    downloadBtn.onclick = () => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `fafecom-icon.png`;
      link.click();
    };

  } catch (err) {
    alert('Erro ao gerar ícone: ' + err.message);
    console.error(err);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = 'Gerar Ícone';
  }
}

generateBtn.addEventListener('click', generateIcon);
siteInput.addEventListener('keydown', (e)=>{ if (e.key==='Enter') { e.preventDefault(); generateIcon(); } });

window.addEventListener('load', ()=>{
  imageUrlInput.value = pickRandom(SAMPLE_IMAGES);
  siteInput.value = pickRandom(SAMPLE_SITES);
  sealInput.value = 'fafecom';
  generateIcon();
});
