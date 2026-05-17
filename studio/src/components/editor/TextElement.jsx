import { useDesignStore } from '../../store/designStore';
import './TextElement.css';

export default function TextElement({ element, columnId, canvasWidth, canvasHeight, scale }) {
  const { selectedElementId, selectElement, updateElement } = useDesignStore();

  const isSelected = selectedElementId === element.id;

  const style = {
    position: 'absolute',
    left: `${element.position.x * 100}%`,
    top: `${element.position.y * 100}%`,
    transform: 'translate(-50%, -50%)',
    width: `${element.width * 100}%`,
    fontFamily: element.fontFamily || 'Lato',
    fontSize: `${element.fontSize * scale}px`,
    color: element.color || '#ffffff',
    textAlign: element.align || 'center',
    fontWeight: element.fontWeight || 'normal',
    fontStyle: element.fontStyle || 'normal',
    letterSpacing: element.letterSpacing || 'normal',
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
    zIndex: isSelected ? 100 : 1,
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  return (
    <div
      className={`text-element ${isSelected ? 'selected' : ''}`}
      style={style}
      onMouseDown={handleMouseDown}
    >
      {element.value}
      {isSelected && <div className="selection-border" />}
    </div>
  );
}
