// Design State Store using Zustand
import { create } from 'zustand';

const defaultCard = {
  width: 10,
  height: 15,
  unit: 'cm',
  layout: 'double', // 'single' | 'double'
  background: { type: 'color', value: '#1a1a2e' },
  templateId: null,
};

const defaultColumn = (side = 'left', language = 'en') => ({
  id: side,
  language,
  elements: [],
});

export const useDesignStore = create((set, get) => ({
  // ── Card config ──
  card: { ...defaultCard },
  columns: [
    defaultColumn('left', 'rw'),
    defaultColumn('right', 'en'),
  ],
  selectedElementId: null,
  activeColumnId: 'left',
  history: [],
  historyIndex: -1,

  // ── Template ──
  setTemplate: (template) => {
    const columns = template.defaultLayout === 'double'
      ? [defaultColumn('left', 'rw'), defaultColumn('right', 'en')]
      : [defaultColumn('left', 'en')];
    set({
      card: {
        ...get().card,
        layout: template.defaultLayout,
        background: template.background,
        templateId: template.id,
      },
      columns: columns.map(col => ({
        ...col,
        elements: template.elements.map(el => ({
          ...el,
          id: `${el.role}-${col.id}-${Date.now()}`,
          value: el.placeholder || '',
        })),
      })),
    });
  },

  // ── Card settings ──
  setCardSize: (width, height) =>
    set(s => ({ card: { ...s.card, width, height } })),

  setCardUnit: (unit) =>
    set(s => ({ card: { ...s.card, unit } })),

  setLayout: (layout) => {
    const current = get();
    if (layout === 'single') {
      set(s => ({ card: { ...s.card, layout }, columns: [current.columns[0]] }));
    } else {
      const hasRight = current.columns.find(c => c.id === 'right');
      if (!hasRight) {
        set(s => ({
          card: { ...s.card, layout },
          columns: [...current.columns, defaultColumn('right', 'en')],
        }));
      } else {
        set(s => ({ card: { ...s.card, layout } }));
      }
    }
  },

  setBackground: (bg) =>
    set(s => ({ card: { ...s.card, background: bg } })),

  // ── Elements ──
  selectElement: (id) => set({ selectedElementId: id }),
  deselectElement: () => set({ selectedElementId: null }),

  updateElement: (columnId, elementId, updates) =>
    set(s => ({
      columns: s.columns.map(col =>
        col.id === columnId
          ? {
              ...col,
              elements: col.elements.map(el =>
                el.id === elementId ? { ...el, ...updates } : el
              ),
            }
          : col
      ),
    })),

  addElement: (columnId, element) =>
    set(s => ({
      columns: s.columns.map(col =>
        col.id === columnId
          ? { ...col, elements: [...col.elements, { ...element, id: `el-${Date.now()}` }] }
          : col
      ),
    })),

  removeElement: (columnId, elementId) =>
    set(s => ({
      columns: s.columns.map(col =>
        col.id === columnId
          ? { ...col, elements: col.elements.filter(el => el.id !== elementId) }
          : col
      ),
      selectedElementId: s.selectedElementId === elementId ? null : s.selectedElementId,
    })),

  // ── Column language ──
  setColumnLanguage: (columnId, language) =>
    set(s => ({
      columns: s.columns.map(col =>
        col.id === columnId ? { ...col, language } : col
      ),
    })),

  setActiveColumn: (id) => set({ activeColumnId: id }),

  // ── Reset ──
  resetDesign: () =>
    set({
      card: { ...defaultCard },
      columns: [defaultColumn('left', 'rw'), defaultColumn('right', 'en')],
      selectedElementId: null,
      activeColumnId: 'left',
    }),
}));
