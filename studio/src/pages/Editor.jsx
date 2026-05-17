import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDesignStore } from '../store/designStore';
import { toPx, toMM } from '../utils/units';
import { exportToPDF, exportToImage, exportPrintSheet } from '../utils/pdf';
import CardCanvas from '../components/editor/CardCanvas';
import SidePanel from '../components/editor/SidePanel';
import Toolbar from '../components/editor/Toolbar';
import ExportModal from '../components/editor/ExportModal';
import './Editor.css';

export default function Editor() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const { card } = useDesignStore();

  const [showExport, setShowExport] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState('');

  const handleExport = async ({ type, printSheet }) => {
    setExporting(true);
    setExportMsg('Generating...');
    try {
      if (type === 'pdf') {
        await exportToPDF(canvasRef, card, 'invitation.pdf');
        setExportMsg('✓ PDF downloaded!');
      } else if (type === 'png') {
        await exportToImage(canvasRef, 'invitation.png', 'image/png');
        setExportMsg('✓ PNG downloaded!');
      } else if (type === 'jpg') {
        await exportToImage(canvasRef, 'invitation.jpg', 'image/jpeg');
        setExportMsg('✓ JPG downloaded!');
      } else if (type === 'sheet') {
        await exportPrintSheet(canvasRef, card, printSheet, 'print-sheet.pdf');
        setExportMsg('✓ Print sheet downloaded!');
      }
    } catch (err) {
      setExportMsg('✗ Export failed. Try again.');
      console.error(err);
    } finally {
      setExporting(false);
      setTimeout(() => setExportMsg(''), 3000);
    }
  };

  return (
    <div className="editor-layout">
      {/* Top Toolbar */}
      <Toolbar
        onBack={() => navigate('/')}
        onExport={() => setShowExport(true)}
        exportMsg={exportMsg}
        exporting={exporting}
      />

      <div className="editor-body">
        {/* Left Side Panel */}
        <SidePanel />

        {/* Canvas Area */}
        <main className="editor-canvas-area">
          <CardCanvas canvasRef={canvasRef} />
        </main>
      </div>

      {/* Export Modal */}
      {showExport && (
        <ExportModal
          card={card}
          onClose={() => setShowExport(false)}
          onExport={handleExport}
          exporting={exporting}
        />
      )}
    </div>
  );
}
