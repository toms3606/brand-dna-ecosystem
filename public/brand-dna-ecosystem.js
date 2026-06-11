/* brand-dna-ecosystem.js — The Brand DNA Ecosystem
 *
 * Hosted on Vercel, embedded into the Squarespace /brand-dna-ecosystem page
 * via a single <script src="…/brand-dna-ecosystem.js"></script> tag.
 *
 * The page only needs an empty <div id="bdna-ecosystem"></div> — this file
 * injects styles, the interactive molecule SVG, and all surrounding sections.
 *
 * Interaction model (per Tom's spec):
 *   - Default state: clean five-hex molecule. Nothing else around it.
 *   - Hover any node OR click any node: that node's short paragraph appears
 *     in a side panel. The feedback loop becomes more prominent.
 *   - Click anywhere outside a node or the panel: returns to default state.
 *   - Feedback loop is always present as a faint dashed background ring.
 */

(function () {
  injectStyles();
  injectFonts();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    var root = document.getElementById('bdna-ecosystem');
    if (!root) return;
    root.innerHTML = pageHTML();
    wireInteractions(root);
  }

  // ---- Content -------------------------------------------------------------

  var CONTACT_URL = 'https://www.westwardmarketinglab.com/contact-westward-marketing-lab';

  // Each node's content. Opening sentence is bold; rest is body.
  var NODES = {
    nucleus: {
      label: 'Brand DNA',
      opener: 'Your Brand DNA is the source.',
      body: 'All marketing is an expression of it. Define the source, and every channel, campaign, and AI-generated reply reinforces the same brand. Skip it, and you scale the drift.'
    },
    goals: {
      label: 'Goals',
      opener: 'What the brand strives to achieve.',
      body: 'Goals define the destination — quantitative targets, qualitative shifts, the outcomes that DNA work is in service of. Without Goals, every other node lacks direction.'
    },
    environment: {
      label: 'Environment',
      opener: 'Where the brand operates.',
      body: 'The market, the audience, the competitive landscape, the AI-search environment. Environment is what you measure against — and what shifts under you while you work.'
    },
    strategies: {
      label: 'Strategies',
      opener: 'How the brand plans to achieve goals.',
      body: 'Strategies translate DNA into plans — the chosen paths, the prioritized moves, the decisions about what gets resources and what doesn\'t.'
    },
    execution: {
      label: 'Execution',
      opener: 'What actions the brand takes to implement the strategy.',
      body: 'Execution is where DNA meets the world — content, campaigns, channels, automations, conversations. Every output either reinforces the brand or erodes it.'
    }
  };

  // ---- Page HTML -----------------------------------------------------------

  function pageHTML() {
    return [
      '<div class="bdna-page">',
        heroHTML(),
        componentsHTML(),
        lensesHTML(),
        feedbackHTML(),
        toolsHTML(),
        ctaHTML(),
      '</div>'
    ].join('');
  }

  function heroHTML() {
    return [
      '<section class="hero">',
        '<div class="title-strip">THE</div>',
        '<h1 class="hero-title">Brand DNA Ecosystem</h1>',
        '<p class="hero-sub">Five components. One source. Every engagement starts at the nucleus.</p>',
        '<div class="molecule-stage">',
          '<div class="molecule-wrap">',
            moleculeSVG(),
          '</div>',
          '<div class="info-panel" id="info-panel">',
            '<div class="info-default">',
              '<div class="info-label">Hover or click a node</div>',
              '<div class="info-hint">Each component reveals its role in the system.</div>',
            '</div>',
          '</div>',
        '</div>',
      '</section>'
    ].join('');
  }

  function componentsHTML() {
    var keys = ['nucleus', 'goals', 'environment', 'strategies', 'execution'];
    var rows = keys.map(function (k) {
      var n = NODES[k];
      return [
        '<div class="component-row">',
          '<div class="component-label">' + esc(n.label) + '</div>',
          '<div class="component-text">',
            '<p><strong>' + esc(n.opener) + '</strong> ' + esc(n.body) + '</p>',
          '</div>',
        '</div>'
      ].join('');
    }).join('');
    return [
      '<section class="page-section">',
        '<div class="section-label">The Five Components</div>',
        rows,
      '</section>'
    ].join('');
  }

  function lensesHTML() {
    return [
      '<section class="page-section">',
        '<div class="section-label">How the Lenses Work</div>',
        '<p class="prose">Every core node is evaluated through three lenses: <strong>Audience</strong>, <strong>Competitors</strong>, and <strong>Product</strong>. These are the recurring dimensions every diagnostic, strategy, and execution decision passes through — what your audience needs, where your competitors are positioned, and what your product actually does.</p>',
        '<p class="prose">The lenses are why the system holds together: Goals get set <em>for</em> a specific audience, against a specific competitive landscape, with a specific product in mind. Environment is read <em>through</em> all three. Strategies and Execution are scored against them. The same three lenses apply at every node — which is what makes the model expandable in a principled way.</p>',
      '</section>'
    ].join('');
  }

  function feedbackHTML() {
    return [
      '<section class="page-section">',
        '<div class="section-label">The Feedback Loop</div>',
        '<p class="prose">The Ecosystem is not a one-way pipeline. Each node feeds into the next — Goals shape Environment scanning, Environment shapes Strategies, Strategies shape Execution — and every node feeds back to the nucleus. What Execution learns about the world refines the DNA. What Environment surfaces changes the Goals. The system gets sharper with every cycle.</p>',
        '<p class="prose">This is the operational difference between a one-off audit and a Westward engagement: the work compounds because the model keeps teaching itself.</p>',
      '</section>'
    ].join('');
  }

  function toolsHTML() {
    return [
      '<section class="page-section">',
        '<div class="section-label">How Tools Fit</div>',
        '<p class="prose">Every Westward tool maps to a specific node in the Ecosystem. The free audits are entry points; the paid engagements are full traversals of the system.</p>',
        '<div class="tools-grid">',
          toolCard('Brand DNA Audit', 'nucleus', 'A free diagnostic at the nucleus — measures whether your public-facing brand expresses a coherent DNA.', '/brand-dna-audit'),
          toolCard('GEO Audit', 'environment', 'A free diagnostic at Environment — measures how AI engines find, interpret, and recommend your brand.', '/geo-audit'),
        '</div>',
      '</section>'
    ].join('');
  }

  function toolCard(name, node, body, href) {
    return [
      '<div class="tool-card">',
        '<div class="tool-card-tag">' + esc(NODES[node].label) + ' node</div>',
        '<div class="tool-card-name">' + esc(name) + '</div>',
        '<div class="tool-card-body">' + esc(body) + '</div>',
        '<a class="tool-card-link" href="' + href + '">Run the audit →</a>',
      '</div>'
    ].join('');
  }

  function ctaHTML() {
    return [
      '<div class="cta">',
        '<div>',
          '<div class="cta-tag">Next Step</div>',
          '<div class="cta-headline">Run the full Ecosystem on your brand.</div>',
          '<div class="cta-body">The free audits are the starting point. We partner with you to define your Brand DNA, set Goals against your real Environment, choose the Strategies that follow from your DNA, and execute alongside your team — with the feedback loop refining the system every step.</div>',
        '</div>',
        '<a href="' + CONTACT_URL + '" class="cta-btn">Contact the Lab</a>',
      '</div>'
    ].join('');
  }

  // ---- Molecule SVG --------------------------------------------------------

  function moleculeSVG() {
    return [
      '<svg viewBox="0 0 680 560" role="img" aria-labelledby="mol-title mol-desc" class="molecule">',
        '<title id="mol-title">The Brand DNA Ecosystem</title>',
        '<desc id="mol-desc">An interactive diagram with Brand DNA at the nucleus, surrounded by four core nodes: Goals, Environment, Strategies, and Execution. Hover or click any node to see its description. A subtle feedback loop encircles the molecule.</desc>',

        // Feedback loop — always present, faded by default
        '<g class="feedback-loop" aria-hidden="true">',
          '<path d="M 540,90 Q 660,230 615,373" class="loop-arc" fill="none"/>',
          '<path d="M 540,510 Q 340,640 140,510" class="loop-arc" fill="none"/>',
          '<path d="M 65,373 Q 20,230 140,90" class="loop-arc" fill="none"/>',
          '<path d="M 215,90 Q 340,30 465,90" class="loop-arc" fill="none"/>',
        '</g>',

        // Bond lines — nucleus to each core node
        '<g class="bonds" aria-hidden="true">',
          '<line x1="415" y1="280" x2="465" y2="230" class="bond"/>',
          '<line x1="415" y1="323" x2="465" y2="373" class="bond"/>',
          '<line x1="265" y1="323" x2="215" y2="373" class="bond"/>',
          '<line x1="265" y1="280" x2="215" y2="230" class="bond"/>',
        '</g>',

        // Nucleus
        '<g class="node nucleus" data-node="nucleus" tabindex="0" role="button" aria-label="Brand DNA">',
          '<polygon points="340,255 415,278 415,325 340,348 265,325 265,278" class="node-shape"/>',
          '<text x="340" y="308" text-anchor="middle" class="node-label nucleus-label">BRAND DNA</text>',
        '</g>',

        // Goals (top-right)
        '<g class="node core" data-node="goals" tabindex="0" role="button" aria-label="Goals">',
          '<polygon points="540,160 615,183 615,230 540,253 465,230 465,183" class="node-shape"/>',
          '<text x="540" y="214" text-anchor="middle" class="node-label core-label">GOALS</text>',
        '</g>',

        // Environment (bottom-right)
        '<g class="node core" data-node="environment" tabindex="0" role="button" aria-label="Environment">',
          '<polygon points="540,350 615,373 615,420 540,443 465,420 465,373" class="node-shape"/>',
          '<text x="540" y="404" text-anchor="middle" class="node-label core-label env">ENVIRONMENT</text>',
        '</g>',

        // Strategies (bottom-left)
        '<g class="node core" data-node="strategies" tabindex="0" role="button" aria-label="Strategies">',
          '<polygon points="140,350 215,373 215,420 140,443 65,420 65,373" class="node-shape"/>',
          '<text x="140" y="404" text-anchor="middle" class="node-label core-label">STRATEGIES</text>',
        '</g>',

        // Execution (top-left)
        '<g class="node core" data-node="execution" tabindex="0" role="button" aria-label="Execution">',
          '<polygon points="140,160 215,183 215,230 140,253 65,230 65,183" class="node-shape"/>',
          '<text x="140" y="214" text-anchor="middle" class="node-label core-label">EXECUTION</text>',
        '</g>',

      '</svg>'
    ].join('');
  }

  // ---- Interactions --------------------------------------------------------

  function wireInteractions(root) {
    var svg = root.querySelector('.molecule');
    var panel = root.querySelector('#info-panel');
    var loop = root.querySelector('.feedback-loop');
    if (!svg || !panel) return;

    var lockedNode = null;

    function showNode(key) {
      var n = NODES[key];
      if (!n) return;
      panel.innerHTML = [
        '<div class="info-node-label">' + esc(n.label) + '</div>',
        '<div class="info-opener">' + esc(n.opener) + '</div>',
        '<div class="info-body">' + esc(n.body) + '</div>'
      ].join('');
      panel.classList.add('active');
      loop.classList.add('engaged');
      // Mark active node visually
      svg.querySelectorAll('.node').forEach(function (g) {
        g.classList.toggle('active', g.getAttribute('data-node') === key);
        g.classList.toggle('dimmed', g.getAttribute('data-node') !== key);
      });
    }

    function clearNode() {
      panel.innerHTML = [
        '<div class="info-default">',
          '<div class="info-label">Hover or click a node</div>',
          '<div class="info-hint">Each component reveals its role in the system.</div>',
        '</div>'
      ].join('');
      panel.classList.remove('active');
      loop.classList.remove('engaged');
      svg.querySelectorAll('.node').forEach(function (g) {
        g.classList.remove('active', 'dimmed');
      });
    }

    svg.querySelectorAll('.node').forEach(function (g) {
      var key = g.getAttribute('data-node');

      g.addEventListener('mouseenter', function () {
        if (lockedNode) return; // don't override a click-locked node on hover
        showNode(key);
      });

      g.addEventListener('mouseleave', function () {
        if (lockedNode) return;
        clearNode();
      });

      g.addEventListener('click', function (e) {
        e.stopPropagation();
        if (lockedNode === key) {
          // Clicking the same node again unlocks
          lockedNode = null;
          clearNode();
        } else {
          lockedNode = key;
          showNode(key);
        }
      });

      g.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          g.click();
        }
      });
    });

    // Click outside any node clears the lock
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.node') && !e.target.closest('.info-panel')) {
        lockedNode = null;
        clearNode();
      }
    });
  }

  // ---- Helpers -------------------------------------------------------------

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function injectFonts() {
    if (document.querySelector('link[data-bdna-fonts]')) return;
    var pre1 = document.createElement('link');
    pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
    pre1.setAttribute('data-bdna-fonts', '1');
    document.head.appendChild(pre1);
    var pre2 = document.createElement('link');
    pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com'; pre2.crossOrigin = 'anonymous';
    pre2.setAttribute('data-bdna-fonts', '1');
    document.head.appendChild(pre2);
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
    f.setAttribute('data-bdna-fonts', '1');
    document.head.appendChild(f);
  }

  function injectStyles() {
    if (document.getElementById('bdna-ecosystem-styles')) return;
    var s = document.createElement('style');
    s.id = 'bdna-ecosystem-styles';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  // ---- Styles --------------------------------------------------------------

  var STYLES = [
    // Container reset — neutralize Squarespace's inherited styles
    '#bdna-ecosystem,#bdna-ecosystem *{box-sizing:border-box;}',
    '#bdna-ecosystem{',
    '  --teal:#055671;--teal-dark:#044556;--teal-nucleus:#0F6E56;--teal-deep:#04342C;',
    '  --teal-tint:hsla(180,89%,38%,0.05);--teal-soft:#E1F5EE;',
    '  --teal-border:rgba(15,110,86,0.4);--teal-border-strong:rgba(15,110,86,1);',
    '  --ink:#1a2a30;--ink-soft:#4a5a60;--ink-mute:#7a8a90;--paper:#fff;--paper-soft:#f7f9fa;',
    '  --rule:rgba(15,110,86,0.15);--rule-soft:rgba(15,110,86,0.08);',
    '  --radius:10px;',
    '  font-family:"DM Sans",sans-serif !important;font-size:14px;line-height:1.55;color:var(--ink);',
    '  background:var(--paper);max-width:1080px;margin:0 auto;',
    '  text-align:left;',
    '}',
    '#bdna-ecosystem,#bdna-ecosystem div,#bdna-ecosystem p,#bdna-ecosystem h1,#bdna-ecosystem h2,#bdna-ecosystem h3,#bdna-ecosystem section,#bdna-ecosystem a,#bdna-ecosystem span{margin:0;padding:0;border:0;font-family:inherit;}',
    '#bdna-ecosystem .bdna-page{padding-bottom:64px;}',
    // Hero
    '#bdna-ecosystem .hero{padding:56px 56px 48px;}',
    '#bdna-ecosystem .title-strip{font-family:"DM Mono",monospace !important;font-size:11px;font-weight:500;letter-spacing:.24em;color:var(--teal) !important;margin-bottom:14px;text-transform:uppercase;}',
    '#bdna-ecosystem h1.hero-title{font-size:52px !important;font-weight:600 !important;color:var(--ink) !important;line-height:1 !important;letter-spacing:-.02em;margin:0 0 18px;text-transform:none;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem p.hero-sub{font-size:18px !important;color:var(--ink-soft) !important;max-width:560px;line-height:1.5 !important;margin:0 0 40px;font-family:"DM Sans",sans-serif !important;}',
    // Molecule stage
    '#bdna-ecosystem .molecule-stage{display:grid !important;grid-template-columns:1fr 280px;gap:32px;align-items:start;margin-top:8px;}',
    '#bdna-ecosystem .molecule-wrap{background:var(--paper-soft);border-radius:var(--radius);border:1px solid var(--rule);padding:24px;}',
    '#bdna-ecosystem svg.molecule{width:100% !important;height:auto !important;display:block !important;}',
    // Info panel
    '#bdna-ecosystem .info-panel{background:var(--paper-soft);border-radius:var(--radius);border:1px solid var(--rule);padding:24px 22px;min-height:260px;transition:border-color .2s ease,background .2s ease;}',
    '#bdna-ecosystem .info-panel.active{border-color:var(--teal-border-strong);background:var(--paper);}',
    '#bdna-ecosystem .info-default{display:flex;flex-direction:column;justify-content:center;height:100%;min-height:212px;}',
    '#bdna-ecosystem .info-label{font-family:"DM Mono",monospace !important;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--teal) !important;margin-bottom:10px;}',
    '#bdna-ecosystem .info-hint{font-size:13px;color:var(--ink-mute) !important;line-height:1.55;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem .info-node-label{font-family:"DM Mono",monospace !important;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--teal) !important;margin-bottom:14px;}',
    '#bdna-ecosystem .info-opener{font-size:16px;font-weight:600;color:var(--ink) !important;line-height:1.4;margin-bottom:14px;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem .info-body{font-size:14px;color:var(--ink-soft) !important;line-height:1.65;font-family:"DM Sans",sans-serif !important;}',
    // Molecule SVG — explicit fills to defeat Squarespace
    '#bdna-ecosystem svg.molecule line.bond{stroke:#0F6E56 !important;stroke-width:1 !important;opacity:.6;fill:none !important;}',
    '#bdna-ecosystem svg.molecule path.loop-arc{stroke:#0F6E56 !important;stroke-width:1 !important;stroke-dasharray:4 4 !important;opacity:.18;fill:none !important;transition:opacity .25s ease;}',
    '#bdna-ecosystem svg.molecule .feedback-loop.engaged path.loop-arc{opacity:.55;}',
    '#bdna-ecosystem svg.molecule g.node{cursor:pointer;transition:opacity .2s ease;}',
    '#bdna-ecosystem svg.molecule g.node:focus{outline:none;}',
    '#bdna-ecosystem svg.molecule g.node:focus-visible polygon.node-shape{stroke-width:2.5 !important;}',
    '#bdna-ecosystem svg.molecule polygon.node-shape{transition:fill .2s ease,stroke .2s ease,stroke-width .2s ease;}',
    '#bdna-ecosystem svg.molecule g.nucleus polygon.node-shape{fill:#0F6E56 !important;stroke:#04342C !important;stroke-width:1.5 !important;}',
    '#bdna-ecosystem svg.molecule g.core polygon.node-shape{fill:#E1F5EE !important;stroke:#0F6E56 !important;stroke-width:1 !important;}',
    '#bdna-ecosystem svg.molecule text.nucleus-label{font-family:"DM Mono",monospace !important;font-size:16px !important;font-weight:700 !important;fill:#E1F5EE !important;letter-spacing:.12em;pointer-events:none;}',
    '#bdna-ecosystem svg.molecule text.core-label{font-family:"DM Mono",monospace !important;font-size:14px !important;font-weight:700 !important;fill:#085041 !important;letter-spacing:.12em;pointer-events:none;}',
    '#bdna-ecosystem svg.molecule text.core-label.env{letter-spacing:.04em;}',
    '#bdna-ecosystem svg.molecule g.node:hover polygon.node-shape,#bdna-ecosystem svg.molecule g.node.active polygon.node-shape{stroke-width:2.5 !important;}',
    '#bdna-ecosystem svg.molecule g.node.dimmed{opacity:.45;}',
    // Page sections
    '#bdna-ecosystem section.page-section{padding:48px 56px;border-top:1px solid var(--rule);}',
    '#bdna-ecosystem .section-label{font-family:"DM Sans",sans-serif !important;font-size:11px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--teal) !important;margin:0 0 28px;padding-bottom:14px;border-bottom:1px solid var(--rule);}',
    '#bdna-ecosystem p.prose{font-size:15px !important;color:var(--ink) !important;line-height:1.7 !important;max-width:680px;margin:0 0 18px;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem p.prose:last-child{margin-bottom:0;}',
    '#bdna-ecosystem p.prose strong{font-weight:600 !important;color:var(--ink) !important;}',
    '#bdna-ecosystem p.prose em{font-style:italic !important;}',
    '#bdna-ecosystem .component-row{display:grid !important;grid-template-columns:180px 1fr;gap:32px;padding:20px 0;border-bottom:1px dashed var(--rule);align-items:start;}',
    '#bdna-ecosystem .component-row:last-child{border-bottom:0;}',
    '#bdna-ecosystem .component-label{font-family:"DM Mono",monospace !important;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--teal) !important;padding-top:2px;}',
    '#bdna-ecosystem .component-text p{font-size:15px !important;color:var(--ink) !important;line-height:1.65 !important;max-width:560px;margin:0;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem .component-text p strong{color:var(--ink) !important;font-weight:600 !important;}',
    // Tools
    '#bdna-ecosystem .tools-grid{display:grid !important;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:24px;}',
    '#bdna-ecosystem .tool-card{border:1px solid var(--teal-border-strong);border-radius:var(--radius);padding:24px;background:var(--paper);}',
    '#bdna-ecosystem .tool-card-tag{font-family:"DM Mono",monospace !important;font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--teal) !important;margin-bottom:14px;}',
    '#bdna-ecosystem .tool-card-name{font-size:20px !important;font-weight:600 !important;color:var(--ink) !important;margin-bottom:10px;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem .tool-card-body{font-size:13.5px !important;color:var(--ink-soft) !important;line-height:1.6;margin-bottom:18px;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem a.tool-card-link{font-family:"DM Mono",monospace !important;font-size:11px !important;font-weight:600 !important;letter-spacing:.10em;text-transform:uppercase;color:var(--teal) !important;text-decoration:none !important;}',
    '#bdna-ecosystem a.tool-card-link:hover{color:var(--teal-dark) !important;}',
    // CTA
    '#bdna-ecosystem .cta{background:var(--teal-tint);border:1px solid var(--teal-border);border-radius:var(--radius);padding:32px 36px;margin:32px 56px 0;display:grid !important;grid-template-columns:1fr auto;gap:32px;align-items:center;}',
    '#bdna-ecosystem .cta-tag{font-family:"DM Sans",sans-serif !important;font-size:10px;font-weight:500;letter-spacing:.20em;text-transform:uppercase;color:var(--teal) !important;margin-bottom:10px;}',
    '#bdna-ecosystem .cta-headline{font-size:18px !important;font-weight:600 !important;color:var(--ink) !important;margin-bottom:8px;line-height:1.35;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem .cta-body{font-size:13.5px !important;color:var(--ink-soft) !important;line-height:1.6;max-width:560px;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem a.cta-btn{display:inline-block !important;background:var(--teal) !important;color:#fff !important;padding:12px 28px;border-radius:5px;text-decoration:none !important;font-weight:700 !important;font-size:14px !important;white-space:nowrap;font-family:"DM Sans",sans-serif !important;}',
    '#bdna-ecosystem a.cta-btn:hover{background:var(--teal-dark) !important;}',
    // Responsive
    '@media (max-width:880px){',
    '  #bdna-ecosystem .hero,#bdna-ecosystem section.page-section{padding-left:28px;padding-right:28px;}',
    '  #bdna-ecosystem .cta{margin-left:28px;margin-right:28px;padding:24px;grid-template-columns:1fr;}',
    '  #bdna-ecosystem h1.hero-title{font-size:36px !important;}',
    '  #bdna-ecosystem p.hero-sub{font-size:16px !important;}',
    '  #bdna-ecosystem .molecule-stage{grid-template-columns:1fr;}',
    '  #bdna-ecosystem .info-panel{min-height:auto;}',
    '  #bdna-ecosystem .component-row{grid-template-columns:1fr;gap:8px;}',
    '  #bdna-ecosystem .tools-grid{grid-template-columns:1fr;}',
    '}'
  ].join('\n');
})();
