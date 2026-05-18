// Design State Store using Zustand
import { create } from 'zustand';

const defaultCard = {
  width: 12.7,
  height: 17.78,
  unit: 'cm',
  layout: 'single', // 'single' | 'double'
  background: { type: 'color', value: '#ffffff' },
  templateId: 'kinyarwanda-test',
};

const defaultColumn = (side = 'left', language = 'rw') => ({
  id: side,
  language,
  elements: side === 'left' ? [
    {
      id: 'img-1',
      type: 'image',
      src: '/rodrige.jpeg',
      position: { x: 0.5, y: 0.18 },
      width: 0.8,  
      height: 0.28,
      objectFit: 'contain',
      borderRadius: '8px', // Premium slight rounding
    },
    {
      id: 'text-1',
      type: 'text',
      value: '"ubonye umugore mwiza aba abonye ikintu cyiza, akaba agize umugisha ahawe n\'Uwiteka" (Imigani 18:22)',
      position: { x: 0.5, y: 0.36 },
      width: 0.85,
      fontFamily: '"Playfair Display"',
      fontSize: 10,
      color: '#555555',
      align: 'center',
      fontStyle: 'italic'
    },
    {
      id: 'text-2',
      type: 'text',
      value: 'Umuryango wa\nNYABYENDA Maurice\nn\'uwa\nTWAKIZURU Sebastien',
      position: { x: 0.5, y: 0.44 },
      width: 0.9,
      fontFamily: '"Montserrat"',
      fontSize: 11,
      color: '#222222',
      align: 'center',
      fontWeight: '600',
      lineHeight: 1.5
    },
    {
      id: 'text-3',
      type: 'text',
      value: 'Bishimiye kubatumira mu bukwe bw\'abana babo:',
      position: { x: 0.5, y: 0.53 },
      width: 0.9,
      fontFamily: '"Playfair Display"',
      fontSize: 12,
      color: '#555555',
      align: 'center'
    },
    {
      id: 'text-4',
      type: 'text',
      value: 'Alice & Rodrigue',
      position: { x: 0.5, y: 0.60 },
      width: 1.0,
      fontFamily: '"Great Vibes"',
      fontSize: 32,
      color: '#0a4275', // Elegant deep navy blue
      align: 'center',
      fontWeight: 'normal'
    },
    {
      id: 'text-5',
      type: 'text',
      value: 'Buzaba tariki 11/07/2026\n\nGusaba no gutanga ikamba ry\'uburere bwiza 10h00\n📍 Kumunara Park (Mayange)\n\nGusezerana imbere y\'Imana saa 15h00\n📍 Paruwasi Catholique ya Mayange',
      position: { x: 0.5, y: 0.74 },
      width: 0.85,
      fontFamily: '"Montserrat"',
      fontSize: 10,
      color: '#333333',
      align: 'center',
      fontWeight: '400',
      lineHeight: 1.6
    },
    {
      id: 'text-6',
      type: 'text',
      value: 'Kuza kwanyu ni umugisha kuri twe!!',
      position: { x: 0.5, y: 0.87 },
      width: 0.9,
      fontFamily: '"Playfair Display"',
      fontSize: 12,
      color: '#0a4275',
      align: 'center',
      fontStyle: 'italic'
    },
    {
      id: 'text-7',
      type: 'text',
      value: 'A. Alice\n+250785514911\n+250739057601',
      position: { x: 0.25, y: 0.93 }, 
      width: 0.4,
      fontFamily: '"Montserrat"',
      fontSize: 9,
      color: '#555555',
      align: 'center',
      fontWeight: '600'
    },
    {
      id: 'text-8',
      type: 'text',
      value: 'Lt. Rodrigue\n+250780735094\n+250729388813',
      position: { x: 0.75, y: 0.93 }, 
      width: 0.4,
      fontFamily: '"Montserrat"',
      fontSize: 9,
      color: '#555555',
      align: 'center',
      fontWeight: '600'
    }
  ] : [],
});

export const useDesignStore = create((set, get) => ({
  // ── Card config ──
  card: { ...defaultCard },
  columns: [
    defaultColumn('left', 'rw')
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
