export function toBase64Image(imgElement) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
    img.onerror = function () {
      reject(new Error('Error loading image'));
    };
    img.src = imgElement.src;
  });
}

export function loadEmblaScriptEmblaCarousel() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/embla-carousel@8.6.0/embla-carousel.umd.min.js';
    script.async = true;
    script.onload = () => resolve(window.EmblaCarousel);
    script.onerror = () => reject(new Error('No se pudo cargar Embla Carousel'));
    document.head.appendChild(script);
  });
}

export function clearText(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}
