import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toMM } from './units';

/**
 * Export the canvas element as a vector-first PDF.
 * Text is rendered via html2canvas at 3x scale (≈ 300 DPI equivalent for raster content).
 * The PDF dimensions are set to exact card size in mm.
 */
export async function exportToPDF(canvasRef, card, filename = 'invitation.pdf') {
  if (!canvasRef.current) throw new Error('Canvas not found');

  const widthMM = toMM(card.width, card.unit);
  const heightMM = toMM(card.height, card.unit);

  // Render at 3x for high quality
  const scale = 3;
  const canvas = await html2canvas(canvasRef.current, {
    scale,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png', 1.0);

  const pdf = new jsPDF({
    orientation: widthMM > heightMM ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMM, heightMM],
    compress: true,
  });

  pdf.addImage(imgData, 'PNG', 0, 0, widthMM, heightMM);
  pdf.save(filename);
}

/**
 * Export as high-resolution PNG image (3x scale = ~300 DPI for typical screen rendering).
 */
export async function exportToImage(canvasRef, filename = 'invitation.png', format = 'image/png') {
  if (!canvasRef.current) throw new Error('Canvas not found');

  const scale = 3;
  const canvas = await html2canvas(canvasRef.current, {
    scale,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(format, 1.0);
  link.click();
}

/**
 * Generate a print sheet PDF with multiple cards arranged in a grid.
 * @param {HTMLElement} cardEl - The card DOM element
 * @param {object} card - Card config { width, height, unit }
 * @param {object} sheet - { paper: 'A4'|'A3'|'Letter', cols: 2, rows: 3 }
 */
export async function exportPrintSheet(canvasRef, card, sheet = { paper: 'A4', cols: 2, rows: 3 }, filename = 'print-sheet.pdf') {
  if (!canvasRef.current) throw new Error('Canvas not found');

  const PAPER_SIZES = {
    A4:     { w: 210, h: 297 },
    A3:     { w: 297, h: 420 },
    Letter: { w: 215.9, h: 279.4 },
  };

  const paper = PAPER_SIZES[sheet.paper] || PAPER_SIZES.A4;
  const cardW = toMM(card.width, card.unit);
  const cardH = toMM(card.height, card.unit);

  const scale = 3;
  const rendered = await html2canvas(canvasRef.current, {
    scale,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });
  const imgData = rendered.toDataURL('image/png', 1.0);

  const pdf = new jsPDF({
    orientation: paper.w > paper.h ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [paper.w, paper.h],
    compress: true,
  });

  const marginX = (paper.w - cardW * sheet.cols) / (sheet.cols + 1);
  const marginY = (paper.h - cardH * sheet.rows) / (sheet.rows + 1);

  for (let row = 0; row < sheet.rows; row++) {
    for (let col = 0; col < sheet.cols; col++) {
      const x = marginX + col * (cardW + marginX);
      const y = marginY + row * (cardH + marginY);
      pdf.addImage(imgData, 'PNG', x, y, cardW, cardH);
    }
  }

  pdf.save(filename);
}
