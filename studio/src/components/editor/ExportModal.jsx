import { useState } from 'react';
import { X, FileText, Image as ImageIcon, Copy, Printer } from 'lucide-react';
import './ExportModal.css';

export default function ExportModal({ card, onClose, onExport, exporting }) {
  const [sheetConfig, setSheetConfig] = useState({ paper: 'A4', cols: 2, rows: 3 });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box export-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Export Invitation</h3>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="export-grid">
          {/* Single PDF */}
          <div className="export-option card" onClick={() => onExport({ type: 'pdf' })}>
            <div className="export-icon"><FileText size={24} /></div>
            <div className="export-info">
              <h4>Single PDF</h4>
              <p>Best for professional single-card printing. Vector text.</p>
            </div>
            <div className="badge badge-gold">Pro</div>
          </div>

          {/* PNG Image */}
          <div className="export-option card" onClick={() => onExport({ type: 'png' })}>
            <div className="export-icon"><ImageIcon size={24} /></div>
            <div className="export-info">
              <h4>PNG Image</h4>
              <p>Best for WhatsApp and social media. High res.</p>
            </div>
          </div>

          {/* Print Sheet */}
          <div className="export-option card sheet-option">
            <div className="export-header">
              <div className="export-icon"><Printer size={24} /></div>
              <div className="export-info">
                <h4>Print Sheet</h4>
                <p>Multi-up layout for cutting (like land.pdf).</p>
              </div>
            </div>

            <div className="sheet-settings">
              <div className="form-row">
                <div>
                  <label className="label">Paper</label>
                  <select
                    className="select"
                    value={sheetConfig.paper}
                    onChange={e => setSheetConfig(p => ({ ...p, paper: e.target.value }))}
                  >
                    <option value="A4">A4 Paper</option>
                    <option value="A3">A3 Paper</option>
                    <option value="Letter">US Letter</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div>
                    <label className="label">Cols</label>
                    <input
                      type="number" className="input" min="1" max="5"
                      value={sheetConfig.cols}
                      onChange={e => setSheetConfig(p => ({ ...p, cols: +e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="label">Rows</label>
                    <input
                      type="number" className="input" min="1" max="8"
                      value={sheetConfig.rows}
                      onChange={e => setSheetConfig(p => ({ ...p, rows: +e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={() => onExport({ type: 'sheet', printSheet: sheetConfig })}
                disabled={exporting}
              >
                Download Sheet
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <p>Exporting at 300 DPI equivalent for professional results.</p>
        </div>
      </div>
    </div>
  );
}
