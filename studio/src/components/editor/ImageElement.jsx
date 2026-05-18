import { useDesignStore } from '../../store/designStore';
import './ImageElement.css';

export default function ImageElement({ element, scale }) {
  const { selectedElementId, selectElement } = useDesignStore();
  const isSelected = selectedElementId === element.id;

  const style = {
    position: 'absolute',
    left: `${element.position.x * 100}%`,
    top: `${element.position.y * 100}%`,
    transform: 'translate(-50%, -50%)',
    width: `${element.width * 100}%`,
    height: element.height ? `${element.height * 100}%` : 'auto',
    zIndex: isSelected ? 100 : 1,
    objectFit: element.objectFit || 'cover',
    borderRadius: element.borderRadius || 0,
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  return (
    <div
      className={`image-element ${isSelected ? 'selected' : ''}`}
      style={style}
      onMouseDown={handleMouseDown}
    >
      <img src={element.src} alt="element" style={{ width: '100%', height: '100%', objectFit: style.objectFit, borderRadius: style.borderRadius, display: 'block' }} />
      {isSelected && <div className="selection-border" />}
    </div>
  );
}
