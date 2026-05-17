import { useState } from 'react';
import { useDesignStore } from '../../store/designStore';
import { toPx } from '../../utils/units';
import { TEMPLATES } from '../../templates';
import {
  LayoutTemplate, Type, Settings, ChevronDown, ChevronRight,
  AlignLeft, AlignCenter, AlignRight, Trash2
} from 'lucide-react';
import './SidePanel.css';

const FONTS = [
  'Inter', 'Lato', 'Playfair Display', 'Great Vibes',
  'Roboto', 'Merriweather', 'Georgia', 'Arial'
];

const FONT_SIZES = [7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 44, 52, 60];

const SECTIONS = [
  { id: 'canvas', label: 'Canvas', icon: Settings },
  { id: 'elements', label: 'Elements', icon: Type },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
];

export default function SidePanel() {
  const [activeSection, setActiveSection] = useState('elements');
  const [openCols, setOpenCols] = useState({ left: true, right: true });

  const {
    card, columns, selectedElementId, setCardSize, setCardUnit,
    setLayout, setBackground, updateElement, removeElement,
    setTemplate, setColumnLanguage,
  } = useDesignStore();

  const selectedEl = columns.flatMap(c =>
    c.elements.map(el => ({ ...el, columnId: c.id }))
  ).find(el => el.id === selectedElementId);

  const handleUpdate = (field, value) => {
    if (!selectedEl) return;
    updateElement(selectedEl.columnId, selectedEl.id, { [field]: value });
  };

  return (
    <aside className="side-panel">
      {/* Section tabs */}
      <div className="panel-tabs">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            className={`panel-tab ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            <s.icon size={15} />
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      <div className="panel-body">

        {/* ── CANVAS SETTINGS ── */}
        {activeSection === 'canvas' && (
          <div className="panel-section fade-in">
            <h4 className="panel-title">Card Size</h4>
            <div className="form-row">
              <div>
                <label className="label">Width</label>
                <input
                  type="number" className="input" step="0.5" min="4"
                  value={card.width}
                  onChange={e => setCardSize(+e.target.value, card.height)}
                />
              </div>
              <div>
                <label className="label">Height</label>
                <input
                  type="number" className="input" step="0.5" min="4"
                  value={card.height}
                  onChange={e => setCardSize(card.width, +e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label className="label">Unit</label>
              <select
                className="select"
                value={card.unit}
                onChange={e => setCardUnit(e.target.value)}
              >
                <option value="cm">Centimeters (cm)</option>
                <option value="mm">Millimeters (mm)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>

            <div className="divider" style={{ marginBottom: 16 }} />

            <h4 className="panel-title">Layout</h4>
            <div className="layout-toggle">
              <button
                className={`layout-btn ${card.layout === 'single' ? 'active' : ''}`}
                onClick={() => setLayout('single')}
              >
                <span className="layout-icon single-icon" />
                Single
              </button>
              <button
                className={`layout-btn ${card.layout === 'double' ? 'active' : ''}`}
                onClick={() => setLayout('double')}
              >
                <span className="layout-icon double-icon" />
                Double
              </button>
            </div>

            <div className="divider" style={{ margin: '16px 0' }} />

            <h4 className="panel-title">Background</h4>
            <div className="form-row">
              <input
                type="color"
                className="color-input"
                value={card.background.value.startsWith('#') ? card.background.value : '#1a2e1a'}
                onChange={e => setBackground({ type: 'color', value: e.target.value })}
              />
              <input
                type="text"
                className="input"
                value={card.background.value}
                onChange={e => setBackground({ type: 'color', value: e.target.value })}
                placeholder="#1a2e1a"
              />
            </div>

            {/* Column languages */}
            <div className="divider" style={{ margin: '16px 0' }} />
            <h4 className="panel-title">Column Languages</h4>
            {columns.map(col => (
              <div key={col.id} className="col-lang-row">
                <span className="col-label">{col.id === 'left' ? 'Left' : 'Right'}</span>
                <select
                  className="select"
                  value={col.language}
                  onChange={e => setColumnLanguage(col.id, e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="fr">French</option>
                  <option value="sw">Swahili</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            ))}
          </div>
        )}

        {/* ── ELEMENTS (Text Editor) ── */}
        {activeSection === 'elements' && (
          <div className="panel-section fade-in">
            {selectedEl ? (
              <>
                <div className="selected-el-header">
                  <div>
                    <h4 className="panel-title" style={{ marginBottom: 2 }}>Editing Text</h4>
                    <span className="el-role-tag">{selectedEl.role}</span>
                  </div>
                  <button
                    className="btn-icon"
                    onClick={() => removeElement(selectedEl.columnId, selectedEl.id)}
                  >
                    <Trash2 size={15} style={{ color: '#f87171' }} />
                  </button>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label className="label">Text Content</label>
                  <textarea
                    className="input"
                    style={{ minHeight: 80, resize: 'vertical' }}
                    value={selectedEl.value || ''}
                    onChange={e => handleUpdate('value', e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label className="label">Font Family</label>
                  <select className="select" value={selectedEl.fontFamily || 'Lato'} onChange={e => handleUpdate('fontFamily', e.target.value)}>
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div className="form-row" style={{ marginBottom: 12 }}>
                  <div>
                    <label className="label">Size (px)</label>
                    <select className="select" value={selectedEl.fontSize || 12} onChange={e => handleUpdate('fontSize', +e.target.value)}>
                      {FONT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Color</label>
                    <input type="color" className="color-input" value={selectedEl.color || '#ffffff'} onChange={e => handleUpdate('color', e.target.value)} />
                  </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                  <label className="label">Alignment</label>
                  <div className="align-btns">
                    {['left','center','right'].map(a => (
                      <button
                        key={a}
                        className={`btn-icon ${selectedEl.align === a ? 'active' : ''}`}
                        onClick={() => handleUpdate('align', a)}
                      >
                        {a === 'left' && <AlignLeft size={15} />}
                        {a === 'center' && <AlignCenter size={15} />}
                        {a === 'right' && <AlignRight size={15} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row" style={{ marginBottom: 12 }}>
                  <div>
                    <label className="label">Style</label>
                    <div className="align-btns">
                      <button className={`btn-icon ${selectedEl.fontWeight === 'bold' ? 'active' : ''}`} onClick={() => handleUpdate('fontWeight', selectedEl.fontWeight === 'bold' ? 'normal' : 'bold')}>
                        <strong style={{ fontSize: 13 }}>B</strong>
                      </button>
                      <button className={`btn-icon ${selectedEl.fontStyle === 'italic' ? 'active' : ''}`} onClick={() => handleUpdate('fontStyle', selectedEl.fontStyle === 'italic' ? 'normal' : 'italic')}>
                        <em style={{ fontSize: 13 }}>I</em>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-selection">
                <Type size={28} style={{ color: 'var(--text-muted)', marginBottom: 8 }} />
                <p>Click on any text on the card to edit it</p>
              </div>
            )}

            {/* All elements list */}
            <div className="divider" style={{ margin: '20px 0 16px' }} />
            <h4 className="panel-title">All Layers</h4>
            {columns.map(col => (
              <div key={col.id} className="col-group">
                <button
                  className="col-group-header"
                  onClick={() => setOpenCols(p => ({ ...p, [col.id]: !p[col.id] }))}
                >
                  {openCols[col.id] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                  <span>{col.id === 'left' ? '← Left' : '→ Right'} Column</span>
                  <span className="col-lang-badge">{col.language.toUpperCase()}</span>
                </button>
                {openCols[col.id] && col.elements.map(el => (
                  <button
                    key={el.id}
                    className={`layer-item ${selectedElementId === el.id ? 'selected' : ''}`}
                    onClick={() => useDesignStore.getState().selectElement(el.id)}
                  >
                    <Type size={11} />
                    <span>{el.role}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── TEMPLATES ── */}
        {activeSection === 'templates' && (
          <div className="panel-section fade-in">
            <h4 className="panel-title">Change Template</h4>
            <p className="panel-desc">Switching template will reset element positions.</p>
            <div className="mini-templates">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  className={`mini-tpl ${card.templateId === t.id ? 'active' : ''}`}
                  onClick={() => setTemplate(t)}
                  style={{ background: t.background.type === 'gradient' ? t.background.value : t.background.value }}
                >
                  <span style={{ color: t.palette[1], fontFamily: 'Great Vibes', fontSize: '0.9rem' }}>P&A</span>
                  <span className="mini-tpl-name">{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
