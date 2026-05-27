// src/utils/cloudinary.js
export function optimizeCloudinaryImage(url, width, height, options = {}) {
  if (!url?.includes('cloudinary.com')) return url;
  
  const {
    crop = 'fill',      // fill, fit, limit, pad
    quality = 'auto',   // auto, auto:best, auto:low
    format = 'auto',    // auto, webp, avif, png
    dpr = 'auto'        // auto, 1, 1.5, 2
  } = options;
  
  // Buduj parametry transformacji
  const transformations = [
    `c_${crop}`,
    `w_${width}`,
    `h_${height}`,
    `q_${quality}`,
    `f_${format}`,
    `dpr_${dpr}`
  ].join(',');
  
  // Wstaw parametry przed /upload/
  const [base, path] = url.split('/upload/');
  return `${base}/upload/${transformations}/${path}`;
}
