# 🚀 Impressa Studio SaaS Implementation Plan

This document outlines the precise technical steps required to take the current Impressa Studio React prototype and transform it into a fully functional, production-ready SaaS platform.

## Phase 1: Core Editor Perfection (Quality & Interaction)
*The goal of this phase is to ensure the editor is 100% interactive and exports professional, print-ready vector files.*

- [ ] **1.1 Interactive Text Editing:** Refactor `TextElement.jsx` to use `contentEditable` or an inline `<textarea>` so users can type directly on the canvas without relying on side-panel forms.
- [ ] **1.2 Drag-and-Drop Positioning:** Implement pointer events (`onMouseDown`, `onMouseMove`) in `TextElement.jsx` to update the `position.x` and `position.y` values in `designStore` in real-time.
- [ ] **1.3 True Vector PDF Export:** Rewrite `exportToPDF` in `pdf.js` to stop using `html2canvas`. Instead, iterate through the `designStore` JSON and use `pdf.text()` to inject true vector fonts, guaranteeing 100% crisp printing at any resolution.
- [ ] **1.4 Editor History (Undo/Redo):** Implement the undo/redo logic in `designStore.js` to save snapshots of the `card` and `columns` states upon every modification.

## Phase 2: Template Marketplace & UI
*The goal of this phase is to present a "Canva-like" experience for users choosing a design.*

- [ ] **2.1 Design Assets:** Create/export 5-10 blank, high-quality template background images (without text) and store them in the `public/` directory.
- [ ] **2.2 JSON Template Definitions:** Map the text elements for these new backgrounds inside `src/templates/index.js`.
- [ ] **2.3 Gallery Interface (`Home.jsx`):** Build the responsive grid layout to display template thumbnails, categorized by style (Wedding, Minimalist, Floral).
- [ ] **2.4 Font Loading Strategy:** Ensure all Google Fonts referenced in the templates are dynamically loaded using Web Font Loader to prevent layout shifts.

## Phase 3: Backend Integration (Supabase)
*The goal of this phase is to add a database so designs and templates are saved persistently.*

- [ ] **3.1 Supabase Setup:** Create a Supabase project and install the `@supabase/supabase-js` client in the React app.
- [ ] **3.2 Database Schema:** Create the core PostgreSQL tables:
    - `templates` (id, name, category, background_url, elements_json, is_premium)
    - `user_designs` (id, user_id, template_id, modified_elements_json, created_at)
- [ ] **3.3 Storage Setup:** Configure Supabase Storage buckets for user uploads (e.g., couple photos) and template backgrounds.
- [ ] **3.4 Fetch Templates:** Update `Home.jsx` to fetch the template list from the Supabase database instead of the hardcoded `index.js` file.

## Phase 4: User Accounts & Monetization (SaaS)
*The goal of this phase is to manage users and generate revenue.*

- [ ] **4.1 Authentication UI:** Implement Signup, Login, and Password Reset flows using Supabase Auth.
- [ ] **4.2 User Dashboard:** Build a "My Designs" page where users can view and resume their saved `user_designs`.
- [ ] **4.3 Stripe Integration:** Set up Stripe Checkout. 
- [ ] **4.4 Access Control:** Enforce rules so only authenticated users with an active "Premium" subscription flag in Supabase can access templates marked `is_premium: true` or export without a watermark.

## Phase 5: Optimization & Deployment
*The goal of this phase is to push the app live to the internet.*

- [ ] **5.1 Performance Audit:** Implement code splitting (`React.lazy`) for the heavy PDF generation libraries so the initial page load is lightning fast.
- [ ] **5.2 SEO & Meta Tags:** Add OpenGraph tags, semantic HTML, and descriptive titles to the Gallery page to ensure templates rank well on Google.
- [ ] **5.3 Environment Variables:** Securely configure `.env` files for production (Supabase URL, Anon Key, Stripe Public Key).
- [ ] **5.4 Vercel Deployment:** Connect the GitHub repository to Vercel for continuous integration and deploy the React frontend to a custom domain (e.g., `impressastudio.com`).

---

**Next Action:** We are currently at **Phase 1**. We need to decide whether to tackle **Live Interactive Editing** or **Vector PDF Export** first.
