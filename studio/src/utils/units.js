// Unit conversion utilities
// Internal unit for canvas rendering is pixels at 96 PPI screen
// PDF export uses points (1 pt = 1/72 inch)

const PPI = 96; // screen pixels per inch
const DPI_PRINT = 300;

const CM_PER_INCH = 2.54;
const MM_PER_INCH = 25.4;

export function toPx(value, unit) {
  switch (unit) {
    case 'cm': return (value / CM_PER_INCH) * PPI;
    case 'mm': return (value / MM_PER_INCH) * PPI;
    case 'in': return value * PPI;
    default: return value;
  }
}

export function toMM(value, unit) {
  switch (unit) {
    case 'cm': return value * 10;
    case 'mm': return value;
    case 'in': return value * MM_PER_INCH;
    default: return value; // assume mm already
  }
}

export function toCM(value, unit) {
  switch (unit) {
    case 'cm': return value;
    case 'mm': return value / 10;
    case 'in': return value * CM_PER_INCH;
    default: return value;
  }
}

// Convert px (96ppi screen) to mm (for jsPDF)
export function pxToMM(px) {
  return (px / PPI) * MM_PER_INCH;
}

// Scale factor for print-quality canvas rendering (3x for approx 300dpi)
export const PRINT_SCALE = 3;

// Canvas display size (fits in editor viewport)
export const CANVAS_DISPLAY_MAX_H = 600;

export function getCanvasDisplayScale(widthPx, heightPx) {
  const scaleW = (window.innerWidth * 0.5) / widthPx;
  const scaleH = CANVAS_DISPLAY_MAX_H / heightPx;
  return Math.min(scaleW, scaleH, 1);
}

export function formatUnit(value, unit) {
  return `${parseFloat(value).toFixed(1)} ${unit}`;
}
