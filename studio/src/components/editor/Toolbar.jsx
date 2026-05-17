import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Eye, Undo2, Redo2, LayoutTemplate } from 'lucide-react';
import './Toolbar.css';

export default function Toolbar({ onBack, onExport, exportMsg, exporting }) {
  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <button className="btn-icon tooltip-wrap" onClick={onBack}>
          <ArrowLeft size={18} />
          <span className="tooltip">Back to templates</span>
        </button>

        <div className="toolbar-logo">
          <span className="logo-icon">✦</span>
          <span>InviteStudio</span>
        </div>
      </div>

      <div className="toolbar-center">
        <button className="btn-icon tooltip-wrap" disabled>
          <Undo2 size={16} />
          <span className="tooltip">Undo</span>
        </button>
        <button className="btn-icon tooltip-wrap" disabled>
          <Redo2 size={16} />
          <span className="tooltip">Redo</span>
        </button>
      </div>

      <div className="toolbar-right">
        {exportMsg && (
          <span className={`export-msg ${exportMsg.startsWith('✓') ? 'success' : 'error'}`}>
            {exportMsg}
          </span>
        )}
        <button className="btn btn-ghost" onClick={onExport} disabled={exporting}>
          {exporting ? <span className="spinner" /> : <Download size={16} />}
          Export
        </button>
      </div>
    </header>
  );
}
