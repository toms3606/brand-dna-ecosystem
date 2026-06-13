#bdna-ecosystem,
#bdna-ecosystem * { box-sizing: border-box; }

#bdna-ecosystem {
  --teal:#055671; --teal-dark:#044556; --teal-nucleus:#0F6E56; --teal-deep:#04342C;
  --teal-tint:hsla(180,89%,38%,0.05); --teal-soft:#E1F5EE;
  --teal-border:rgba(15,110,86,0.4); --teal-border-strong:rgba(15,110,86,1);
  --ink:#1a2a30; --ink-soft:#4a5a60; --ink-mute:#7a8a90;
  --paper:#fff; --paper-soft:#f7f9fa;
  --rule:rgba(15,110,86,0.15); --rule-soft:rgba(15,110,86,0.08);
  --radius:10px;
  font-family:"DM Sans", sans-serif;
  font-size:14px;
  line-height:1.55;
  color:var(--ink);
  background:transparent;
  width:100%;
  margin:0 auto;
  text-align:left;
}

#bdna-ecosystem div,
#bdna-ecosystem p,
#bdna-ecosystem h1,
#bdna-ecosystem h2,
#bdna-ecosystem h3,
#bdna-ecosystem section,
#bdna-ecosystem a,
#bdna-ecosystem span {
  margin:0; padding:0; border:0;
  font-family:inherit;
}

#bdna-ecosystem .bdna-page {
  padding-bottom:64px;
  display:block;
  width:100%;
}

#bdna-ecosystem section {
  display:block;
  width:100%;
}

/* Hero */
#bdna-ecosystem .hero { padding:56px 56px 48px; }
#bdna-ecosystem .title-strip {
  font-family:"DM Mono", monospace;
  font-size:11px; font-weight:500; letter-spacing:.24em;
  color:var(--teal); margin-bottom:14px;
  text-transform:uppercase;
}
#bdna-ecosystem h2.hero-title {
  font-size:52px; font-weight:600;
  color:var(--ink);
  line-height:1; letter-spacing:-.02em;
  margin:0 0 18px;
  text-transform:none;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem p.hero-sub {
  font-size:18px;
  color:var(--ink-soft);
  max-width:560px;
  line-height:1.5;
  margin:0 0 40px;
  font-family:"DM Sans", sans-serif;
}

/* Molecule stage */
#bdna-ecosystem .molecule-stage {
  display:grid;
  grid-template-columns:1fr;
  gap:16px; align-items:start; margin-top:8px;
}
#bdna-ecosystem .molecule-wrap {
  background:var(--paper-soft);
  border-radius:var(--radius);
  border:1px solid var(--rule);
  padding:24px;
}
#bdna-ecosystem svg.molecule {
  width:100%; height:auto; display:block;
}

/* Info panel */
#bdna-ecosystem .info-panel {
  background:var(--paper-soft);
  border-radius:var(--radius);
  border:1px solid var(--rule);
  padding:24px 22px;
  min-height:140px;
  transition: border-color .2s ease, background .2s ease;
}
#bdna-ecosystem .info-panel.active {
  border-color:var(--teal-border-strong);
  background:var(--paper);
}
#bdna-ecosystem .info-default {
  display:flex; flex-direction:column; justify-content:center;
  height:100%; min-height:92px;
}
#bdna-ecosystem .info-label {
  font-family:"DM Mono", monospace;
  font-size:11px; font-weight:500; letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:10px;
}
#bdna-ecosystem .info-hint {
  font-size:13px;
  color:var(--ink-mute);
  line-height:1.55;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem .info-node-label {
  font-family:"DM Mono", monospace;
  font-size:11px; font-weight:500; letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:14px;
}
#bdna-ecosystem .info-opener {
  font-size:16px; font-weight:600;
  color:var(--ink);
  line-height:1.4; margin-bottom:14px;
  max-width:720px;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem .info-body {
  font-size:14px;
  color:var(--ink-soft);
  line-height:1.65;
  max-width:720px;
  font-family:"DM Sans", sans-serif;
}

/* Molecule SVG */
#bdna-ecosystem svg.molecule line.bond {
  stroke:#0F6E56; stroke-width:1; opacity:.6; fill:none;
}

#bdna-ecosystem svg.molecule g.node {
  cursor:pointer;
  transition:opacity .2s ease;
}
#bdna-ecosystem svg.molecule g.node:focus { outline:none; }
#bdna-ecosystem svg.molecule g.node:focus-visible polygon.node-shape {
  stroke-width:2.5;
}
#bdna-ecosystem svg.molecule polygon.node-shape {
  transition:fill .2s ease, stroke .2s ease, stroke-width .2s ease;
}
#bdna-ecosystem svg.molecule g.nucleus polygon.node-shape {
  fill:#0F6E56; stroke:#04342C; stroke-width:1.5;
}
#bdna-ecosystem svg.molecule g.core polygon.node-shape {
  fill:#E1F5EE; stroke:#0F6E56; stroke-width:1;
}
#bdna-ecosystem svg.molecule text.nucleus-label {
  font-family:"DM Mono", monospace;
  font-size:18px; font-weight:700;
  fill:#E1F5EE; letter-spacing:.12em;
  pointer-events:none;
}
#bdna-ecosystem svg.molecule text.core-label {
  font-family:"DM Mono", monospace;
  font-size:16px; font-weight:700;
  fill:#085041; letter-spacing:.10em;
  pointer-events:none;
}
#bdna-ecosystem svg.molecule text.core-label.env { letter-spacing:.03em; }
#bdna-ecosystem svg.molecule g.node:hover polygon.node-shape,
#bdna-ecosystem svg.molecule g.node.active polygon.node-shape {
  stroke-width:2.5;
}
#bdna-ecosystem svg.molecule g.node.dimmed { opacity:.45; }

/* Sub-nodes (24 satellite hexes orbiting the four core nodes) */
#bdna-ecosystem svg.molecule g.sub-node {
  transition:opacity .2s ease;
}
#bdna-ecosystem svg.molecule polygon.sub-node-shape {
  fill:#FFFFFF;
  stroke:#0F6E56;
  stroke-width:1;
  transition:stroke-width .2s ease, fill .2s ease;
}
#bdna-ecosystem svg.molecule g.sub-node.active polygon.sub-node-shape {
  fill:#E1F5EE;
  stroke-width:1.5;
}
#bdna-ecosystem svg.molecule g.sub-node.dimmed { opacity:.35; }
#bdna-ecosystem svg.molecule text.sub-node-label {
  font-family:"DM Mono", monospace;
  font-size:14px;
  font-weight:700;
  fill:#085041;
  letter-spacing:.06em;
  pointer-events:none;
}
#bdna-ecosystem svg.molecule line.sub-bond {
  stroke:#0F6E56;
  stroke-width:0.75;
  opacity:.4;
  transition:opacity .2s ease, stroke-width .2s ease;
}
#bdna-ecosystem svg.molecule line.sub-bond.active {
  opacity:.7;
  stroke-width:1;
}
#bdna-ecosystem svg.molecule line.sub-bond.dimmed { opacity:.25; }

/* Page sections */
#bdna-ecosystem section.page-section {
  padding:48px 56px;
  border-top:1px solid var(--rule);
  display:block !important;
  width:100% !important;
}
#bdna-ecosystem section.page-section > p,
#bdna-ecosystem section.page-section > .section-label,
#bdna-ecosystem section.page-section > .tools-subhead {
  display:block !important;
  width:100% !important;
}
#bdna-ecosystem .section-label {
  font-family:"DM Sans", sans-serif;
  font-size:11px; font-weight:500; letter-spacing:.22em;
  text-transform:uppercase;
  color:var(--teal);
  margin:0 0 28px;
  padding-bottom:14px;
  border-bottom:1px solid var(--rule);
}
#bdna-ecosystem p.prose {
  font-size:15px;
  color:var(--ink);
  line-height:1.7;
  max-width:680px;
  margin:0 0 18px;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem p.prose:last-child { margin-bottom:0; }
#bdna-ecosystem p.prose strong { font-weight:600; color:var(--ink); }
#bdna-ecosystem p.prose em { font-style:italic; }

#bdna-ecosystem p.section-opener {
  font-size:17px;
  font-weight:700;
  color:var(--ink);
  line-height:1.4;
  margin:0 0 14px;
  font-family:"DM Sans", sans-serif;
}

#bdna-ecosystem .components-intro {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:32px;
  align-items:center;
  margin:8px 0 28px;
}
#bdna-ecosystem .components-intro-text {
  min-width:0;
}
#bdna-ecosystem .components-intro-text .section-opener {
  margin-top:0;
}
#bdna-ecosystem .components-intro-text .prose {
  max-width:520px;
}
#bdna-ecosystem .components-intro-graphic {
  min-width:0;
  display:flex;
  justify-content:center;
  align-items:center;
}
#bdna-ecosystem svg.component-detail {
  display:block;
  width:100%;
  max-width:520px;
  height:auto;
}

#bdna-ecosystem .components-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));
  gap:16px;
  width:100%;
}

#bdna-ecosystem .component-card {
  background:var(--paper);
  border:1px solid var(--rule);
  border-radius:var(--radius);
  padding:22px 22px 24px;
  display:flex;
  flex-direction:column;
  min-width:0;
}

#bdna-ecosystem .component-card--nucleus {
  background:var(--teal-tint);
  border-color:var(--teal-border);
}

#bdna-ecosystem .component-card-tag {
  font-family:"DM Mono", monospace;
  font-size:10px; font-weight:500; letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:12px;
}

#bdna-ecosystem .component-card-label {
  font-family:"DM Mono", monospace;
  font-size:15px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:14px;
  padding-bottom:12px;
  border-bottom:1px solid var(--rule);
}

#bdna-ecosystem p.component-card-text {
  font-size:14px;
  color:var(--ink);
  line-height:1.6;
  margin:0;
  font-family:"DM Sans", sans-serif;
}

#bdna-ecosystem p.component-card-text strong {
  color:var(--ink);
  font-weight:600;
  display:block;
  margin-bottom:8px;
}

/* Flow cards (Feedback Loop section) */
#bdna-ecosystem .flow-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));
  gap:16px;
  margin-top:28px;
  width:100%;
}
#bdna-ecosystem .flow-card {
  background:var(--paper);
  border:1px solid var(--rule);
  border-radius:var(--radius);
  padding:22px 22px 24px;
  min-width:0;
}
#bdna-ecosystem .flow-card-arrow {
  font-family:"DM Mono", monospace;
  font-size:13px; font-weight:700; letter-spacing:.10em;
  text-transform:uppercase;
  color:var(--teal);
  line-height:1.4;
  margin-bottom:8px;
}
#bdna-ecosystem .flow-card-arrow-mark {
  color:var(--teal-nucleus);
  font-weight:400;
  margin:0 4px;
}
#bdna-ecosystem .flow-card-type {
  font-family:"DM Sans", sans-serif;
  font-size:12px; font-weight:500;
  font-style:italic;
  color:var(--ink-mute);
  margin-bottom:14px;
  padding-bottom:12px;
  border-bottom:1px solid var(--rule);
}
#bdna-ecosystem p.flow-card-text {
  font-size:14px;
  color:var(--ink);
  line-height:1.6;
  margin:0;
  font-family:"DM Sans", sans-serif;
}

/* Lenses (shelved — kept for potential reuse) */
#bdna-ecosystem .lenses-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
  gap:16px;
  margin-top:24px;
  width:100%;
}
#bdna-ecosystem .lens-card {
  background:var(--paper);
  border:1px solid var(--rule);
  border-radius:var(--radius);
  padding:22px 22px 24px;
  min-width:0;
}
#bdna-ecosystem .lens-card-label {
  font-family:"DM Mono", monospace;
  font-size:13px; font-weight:700; letter-spacing:.14em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:12px;
  padding-bottom:10px;
  border-bottom:1px solid var(--rule);
}
#bdna-ecosystem p.lens-card-text {
  font-size:14px;
  color:var(--ink);
  line-height:1.6;
  margin:0;
  font-family:"DM Sans", sans-serif;
}

/* Callout (used in Feedback Loop section) */
#bdna-ecosystem .callout {
  margin-top:24px;
  background:var(--teal-tint);
  border-left:3px solid var(--teal);
  border-radius:0 var(--radius) var(--radius) 0;
  padding:22px 28px;
  max-width:760px;
}
#bdna-ecosystem .callout-label {
  font-family:"DM Mono", monospace;
  font-size:11px; font-weight:500; letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:10px;
}
#bdna-ecosystem p.callout-text {
  font-size:16px;
  color:var(--ink);
  line-height:1.55;
  margin:0;
  font-family:"DM Sans", sans-serif;
  font-weight:500;
}

/* Tools */
#bdna-ecosystem .tools-subhead {
  font-family:"DM Mono", monospace;
  font-size:11px; font-weight:500; letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--ink-mute);
  margin:32px 0 12px;
}
#bdna-ecosystem .tools-grid {
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));
  gap:18px;
  margin-top:0;
  width:100%;
}
#bdna-ecosystem .tool-card {
  border:1px solid var(--teal-border-strong);
  border-radius:var(--radius);
  padding:24px;
  background:var(--paper);
}
#bdna-ecosystem .tool-card-tag {
  font-family:"DM Mono", monospace;
  font-size:10px; font-weight:500; letter-spacing:.16em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:14px;
}
#bdna-ecosystem .tool-card-name {
  font-size:20px; font-weight:600;
  color:var(--ink);
  margin-bottom:10px;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem .tool-card-body {
  font-size:13.5px;
  color:var(--ink-soft);
  line-height:1.6;
  margin-bottom:18px;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem a.tool-card-link {
  font-family:"DM Mono", monospace;
  font-size:11px; font-weight:600; letter-spacing:.10em;
  text-transform:uppercase;
  color:var(--teal);
  text-decoration:none;
}
#bdna-ecosystem a.tool-card-link:hover { color:var(--teal-dark); }

/* CTA */
#bdna-ecosystem .cta {
  background:var(--teal-tint);
  border:1px solid var(--teal-border);
  border-radius:var(--radius);
  padding:32px 36px;
  margin:32px 56px 0;
  display:grid;
  grid-template-columns:1fr auto;
  gap:32px;
  align-items:center;
}
#bdna-ecosystem .cta-tag {
  font-family:"DM Sans", sans-serif;
  font-size:10px; font-weight:500; letter-spacing:.20em;
  text-transform:uppercase;
  color:var(--teal);
  margin-bottom:10px;
}
#bdna-ecosystem .cta-headline {
  font-size:18px; font-weight:600;
  color:var(--ink);
  margin-bottom:8px;
  line-height:1.35;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem .cta-body {
  font-size:13.5px;
  color:var(--ink-soft);
  line-height:1.6;
  max-width:560px;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem a.cta-btn {
  display:inline-block;
  background:var(--teal);
  color:#fff;
  padding:12px 28px;
  border-radius:5px;
  text-decoration:none;
  font-weight:700;
  font-size:14px;
  white-space:nowrap;
  font-family:"DM Sans", sans-serif;
}
#bdna-ecosystem a.cta-btn:hover { background:var(--teal-dark); }

/* Responsive */
@media (max-width:880px) {
  #bdna-ecosystem .hero,
  #bdna-ecosystem section.page-section { padding-left:28px; padding-right:28px; }
  #bdna-ecosystem .cta {
    margin-left:28px; margin-right:28px;
    padding:24px;
    grid-template-columns:1fr;
  }
  #bdna-ecosystem h2.hero-title { font-size:36px; }
  #bdna-ecosystem p.hero-sub { font-size:16px; }
  #bdna-ecosystem .molecule-stage { grid-template-columns:1fr; }
  #bdna-ecosystem .info-panel { min-height:auto; }
  #bdna-ecosystem .components-intro { grid-template-columns:1fr; gap:20px; }
  #bdna-ecosystem .tools-grid { grid-template-columns:1fr; }
}
