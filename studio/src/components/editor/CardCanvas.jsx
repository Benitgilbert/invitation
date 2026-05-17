import { useDesignStore } from '../../store/designStore';
import { toPx } from '../../utils/units';
import TextElement from './TextElement';
import './CardCanvas.css';

const CANVAS_SCALE = 2.2; // display scale multiplier for comfortable editing

export default function CardCanvas({ canvasRef }) {
  const { card, columns } = useDesignStore();

  const widthPx = toPx(card.width, card.unit) * CANVAS_SCALE;
  const heightPx = toPx(card.height, card.unit) * CANVAS_SCALE;

  const getBackground = () => {
    const bg = card.background;
    if (bg.type === 'gradient') return bg.value;
    return bg.value;
  };

  return (
    <div
      className="canvas-outer"
      style={{ width: widthPx, height: heightPx }}
    >
      {/* Shadow/depth ring */}
      <div className="canvas-shadow" style={{ width: widthPx + 20, height: heightPx + 20 }} />

      {/* The actual printable card */}
      <div
        ref={canvasRef}
        className="canvas-card"
        style={{
          width: widthPx,
          height: heightPx,
          background: getBackground(),
        }}
      >
        {/* Divider line for double layout */}
        {card.layout === 'double' && (
          <div className="canvas-divider">
            <div className="divider-diamond top" />
            <div className="divider-line" />
            <div className="divider-diamond bottom" />
          </div>
        )}

        {/* Render columns */}
        {columns.map(col => (
          <div
            key={col.id}
            className={`canvas-column ${card.layout === 'single' ? 'full-width' : col.id}`}
          >
            {col.elements.map(el => (
              <TextElement
                key={el.id}
                element={el}
                columnId={col.id}
                canvasWidth={widthPx / (card.layout === 'double' ? 2 : 1)}
                canvasHeight={heightPx}
                scale={CANVAS_SCALE}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
