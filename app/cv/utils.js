export async function makeQR(url) {
  const QRCode = (await import("qrcode")).default;
  return QRCode.toDataURL(url, {
    margin: 0,
    width: 512,
    errorCorrectionLevel: "M",
    color: { dark: "#0f172a", light: "#ffffff" },
  });
}

// Resize an uploaded image to a small JPEG dataURL (localStorage friendly).
export function resizeImage(file, max = 512) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// react-pdf fetches images itself — relative public/ paths must become absolute.
export function absoluteSrc(src) {
  if (!src) return "";
  if (src.startsWith("data:") || src.startsWith("http")) return src;
  if (typeof window === "undefined") return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return window.location.origin + base + src;
}

export function cvFileName(fullName, ext) {
  const safe = (fullName || "CV").trim().replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
  return `CV_${safe}_${new Date().getFullYear()}.${ext}`;
}
