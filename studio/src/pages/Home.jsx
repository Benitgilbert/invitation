import { useNavigate } from 'react-router-dom';
import { useDesignStore } from '../store/designStore';
import { TEMPLATES } from '../templates';
import './Home.css';

const CATEGORIES = ['All', 'Wedding', 'Birthday', 'Graduation', 'Anniversary'];

const STYLE_TAGS = {
  'dark-floral': ['Floral', 'Luxury', 'Dark'],
  'minimalist': ['Clean', 'Elegant', 'Simple'],
  'luxury-gold': ['Gold', 'Premium', 'Royal'],
};

export default function Home() {
  const navigate = useNavigate();
  const { setTemplate } = useDesignStore();

  const handleSelect = (template) => {
    setTemplate(template);
    navigate('/editor');
  };

  const handleBlank = () => {
    navigate('/editor');
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">InviteStudio</span>
        </div>
        <nav className="home-nav">
          <a href="#templates">Templates</a>
          <a href="#features">Features</a>
          <button className="btn btn-primary" onClick={handleBlank}>
            Start from Scratch
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section className="home-hero">
        <div className="hero-badge badge badge-gold">Professional Invitation Designer</div>
        <h1 className="hero-title">
          Design Beautiful Invitations
          <br />
          <span className="hero-accent">Print-Ready. Always Crisp.</span>
        </h1>
        <p className="hero-sub">
          No Photoshop. No blurry text. Just stunning invitations exported as
          high-quality PDFs — perfect for any printer.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })}>
            Browse Templates
          </button>
          <button className="btn btn-ghost btn-lg" onClick={handleBlank}>
            Start Blank
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>300 DPI</strong><span>Print Quality</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Vector PDF</strong><span>Always Sharp</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Bilingual</strong><span>Multi-language</span></div>
          <div className="stat-divider" />
          <div className="stat"><strong>Multi-up</strong><span>Print Sheets</span></div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="home-templates">
        <div className="section-header">
          <h2>Choose a Template</h2>
          <p>Start with a professionally designed template, then customize every detail.</p>
        </div>

        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-tab ${cat === 'All' ? 'active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="templates-grid">
          {/* Blank card */}
          <div className="template-card blank-card" onClick={handleBlank}>
            <div className="template-preview blank-preview">
              <span className="blank-plus">+</span>
              <span className="blank-label">Blank Canvas</span>
            </div>
            <div className="template-info">
              <h3>Start from Scratch</h3>
              <p>Build your own design</p>
            </div>
          </div>

          {TEMPLATES.map(template => (
            <div key={template.id} className="template-card" onClick={() => handleSelect(template)}>
              <div
                className="template-preview"
                style={{ background: template.background.type === 'gradient' ? template.background.value : template.background.value }}
              >
                <div className="template-preview-content">
                  <p className="tpl-name-preview" style={{ color: template.palette[1], fontFamily: 'Great Vibes', fontSize: '1.4rem' }}>
                    Pascaline
                  </p>
                  <p style={{ color: template.palette[2], fontFamily: 'Lato', fontSize: '0.65rem', opacity: 0.8 }}>
                    & Audace
                  </p>
                  <p style={{ color: template.palette[1], fontFamily: 'Lato', fontSize: '0.55rem', marginTop: '6px' }}>
                    July 25, 2026
                  </p>
                </div>
                <div className="template-layout-badge">
                  {template.defaultLayout === 'double' ? '⟺ Bilingual' : '▣ Single'}
                </div>
                <div className="template-overlay">
                  <button className="btn btn-primary">Use Template</button>
                </div>
              </div>
              <div className="template-info">
                <h3>{template.name}</h3>
                <div className="template-tags">
                  {(STYLE_TAGS[template.id] || []).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="home-features">
        <h2>Why InviteStudio?</h2>
        <div className="features-grid">
          {[
            { icon: '🖨️', title: 'Print-Perfect Quality', desc: 'Exports at 300 DPI — text is always razor-sharp on paper.' },
            { icon: '🌍', title: 'Bilingual Layouts', desc: 'Side-by-side dual columns for any language combination.' },
            { icon: '📐', title: 'Custom Card Sizes', desc: 'Set any dimensions in cm, mm or inches — not hardcoded.' },
            { icon: '📋', title: 'Multi-up Print Sheets', desc: 'Auto-generate 2-up, 3-up layouts to cut paper efficiently.' },
            { icon: '🎨', title: 'Live Preview', desc: 'See every change instantly as you type and customize.' },
            { icon: '📸', title: 'Photo Integration', desc: 'Upload couple photos with stylish frame options.' },
          ].map(f => (
            <div key={f.title} className="feature-card card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <p>✦ InviteStudio — Professional Invitation Designer</p>
      </footer>
    </div>
  );
}
