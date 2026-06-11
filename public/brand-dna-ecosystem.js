/* brand-dna-ecosystem.js — The Brand DNA Ecosystem
 *
 * v3 — CSS extracted to a Squarespace Code block. This file only injects
 * markup, fonts, and interactions. CSS lives in the page itself so it
 * wins specificity against Squarespace defaults without needing !important.
 *
 * Squarespace embed:
 *   <style>...contents of brand-dna-ecosystem.css...</style>
 *   <div id="bdna-ecosystem"></div>
 *   <script src="https://brand-dna-ecosystem.vercel.app/brand-dna-ecosystem.js"></script>
 *
 * Interaction model (per Tom's spec):
 *   - Default state: clean five-hex molecule. Nothing else around it.
 *   - Hover any node OR click any node: that node's short paragraph appears
 *     in a side panel. The feedback loop becomes more prominent.
 *   - Click anywhere outside a node or the panel: returns to default state.
 *   - Feedback loop is always present as a faint dashed background ring.
 */

(function () {
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

  var NODES = {
    nucleus: {
      label: 'Brand DNA',
      opener: 'What your brand actually is.',
      body: 'Your Brand DNA is the source — all marketing is an expression of it. Define the source, and every channel, campaign, and AI-generated reply reinforces the same brand. Skip it, and you scale the drift.'
    },
    goals: {
      label: 'Goals',
      opener: 'What your brand strives to achieve.',
      body: 'Goals define the destination — quantitative targets, qualitative shifts, the outcomes that DNA work is in service of. Without Goals, every other node lacks direction.'
    },
    environment: {
      label: 'Environment',
      opener: 'Where your brand operates.',
      body: 'The market, the audience, the competitive landscape, the AI-search environment. Environment is what you measure against — and what shifts under you while you work.'
    },
    strategies: {
      label: 'Strategies',
      opener: 'How your brand plans to achieve goals.',
      body: 'Strategies translate DNA into plans — the chosen paths, the prioritized moves, the decisions about what gets resources and what doesn\'t.'
    },
    execution: {
      label: 'Execution',
      opener: 'What actions your brand takes to implement the strategy.',
      body: 'Execution is where DNA meets the world — content, campaigns, channels, automations, conversations. Every output either reinforces the brand or erodes it.'
    }
  };

  // ---- Page HTML -----------------------------------------------------------

  function pageHTML() {
    return [
      '<div class="bdna-page">',
        heroHTML(),
        componentsHTML(),
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
        '<h2 class="hero-title">Brand DNA Ecosystem Model</h2>',
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
    var cards = keys.map(function (k) {
      var n = NODES[k];
      var isNucleus = k === 'nucleus';
      return [
        '<div class="component-card' + (isNucleus ? ' component-card--nucleus' : '') + '">',
          '<div class="component-card-tag">' + esc(isNucleus ? 'Nucleus' : 'Core Node') + '</div>',
          '<div class="component-card-label">' + esc(n.label) + '</div>',
          '<p class="component-card-text"><strong>' + esc(n.opener) + '</strong> ' + esc(n.body) + '</p>',
        '</div>'
      ].join('');
    }).join('');
    return [
      '<section class="page-section">',
        '<div class="section-label">The Five Components</div>',
        '<div class="components-grid">' + cards + '</div>',
      '</section>'
    ].join('');
  }

  function feedbackHTML() {
    var flows = [
      {
        from: 'Execution', to: 'Strategies', type: 'Continuous loop',
        body: 'Performance data and audience signal teach us which strategies are working. Strategy mix gets adjusted continuously to favor what delivers.'
      },
      {
        from: 'Environment', to: 'Strategies', type: 'Exogenous shift',
        body: 'When the world moves — competitor, platform, audience, regulation — the right strategies may change even when execution is fine. Environment is the input we respond to, not control.'
      },
      {
        from: 'Strategies + Environment', to: 'Goals', type: 'Recalibration',
        body: 'Goals don\'t shift on a bad week. But when Environment has moved significantly or Strategies can\'t deliver against current Goals, the Goals themselves get recalibrated. Quarterly or semi-annually.'
      },
      {
        from: 'Business decisions', to: 'Goals', type: 'Resetting',
        body: 'Comes from outside the system. Leadership decides on growth phase, revenue targets, market expansion. The marketing system operates against these — it doesn\'t set them.'
      }
    ];
    var cards = flows.map(function (f) {
      return [
        '<div class="flow-card">',
          '<div class="flow-card-arrow">' + esc(f.from) + ' <span class="flow-card-arrow-mark">→</span> ' + esc(f.to) + '</div>',
          '<div class="flow-card-type">' + esc(f.type) + '</div>',
          '<p class="flow-card-text">' + esc(f.body) + '</p>',
        '</div>'
      ].join('');
    }).join('');
    return [
      '<section class="page-section">',
        '<div class="section-label">The Feedback Loop</div>',
        '<p class="section-opener">How your Brand DNA model learns.</p>',
        '<p class="prose">The four orbital nodes iterate. Execution teaches Strategies. Environment shifts reshape both Strategies and Goals. Brand DNA at the center holds — it\'s the filter every change passes through, not something that updates with each cycle. The DNA is revisited only on major business events: new market, new leadership, true repositioning.</p>',
        '<div class="flow-grid">' + cards + '</div>',
        '<div class="callout">',
          '<div class="callout-label">The operating difference</div>',
          '<p class="callout-text">The system gets sharper with every iterative cycle. This is what separates a one-off audit from a Westward engagement — the work compounds because the model keeps teaching itself.</p>',
        '</div>',
      '</section>'
    ].join('');
  }

  function toolsHTML() {
    return [
      '<section class="page-section">',
        '<div class="section-label">How Tools Fit</div>',
        '<p class="prose">Every Westward tool maps to a specific node in the Ecosystem. The free audits are entry points; the paid engagements are full traversals of the system.</p>',
        '<div class="tools-subhead">Available now</div>',
        '<div class="tools-grid">',
          toolCard('Brand DNA Audit', 'nucleus', 'A free snapshot of current DNA versus ideal — surfaces drift and triggers the alignment conversation.', '/brand-dna-audit'),
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
        '<desc id="mol-desc">An interactive diagram with Brand DNA at the nucleus, surrounded by four core nodes: Goals, Environment, Strategies, and Execution. Hover or click any node to see its description.</desc>',

        '<g class="feedback-loop" aria-hidden="true">',
          '<path d="M 540,90 Q 660,230 615,373" class="loop-arc" fill="none"/>',
          '<path d="M 540,510 Q 340,640 140,510" class="loop-arc" fill="none"/>',
          '<path d="M 65,373 Q 20,230 140,90" class="loop-arc" fill="none"/>',
          '<path d="M 215,90 Q 340,30 465,90" class="loop-arc" fill="none"/>',
        '</g>',

        '<g class="bonds" aria-hidden="true">',
          '<line x1="415" y1="280" x2="465" y2="230" class="bond"/>',
          '<line x1="415" y1="323" x2="465" y2="373" class="bond"/>',
          '<line x1="265" y1="323" x2="215" y2="373" class="bond"/>',
          '<line x1="265" y1="280" x2="215" y2="230" class="bond"/>',
        '</g>',

        '<g class="node nucleus" data-node="nucleus" tabindex="0" role="button" aria-label="Brand DNA">',
          '<polygon points="340,255 415,278 415,325 340,348 265,325 265,278" class="node-shape"/>',
          '<text x="340" y="308" text-anchor="middle" class="node-label nucleus-label">BRAND DNA</text>',
        '</g>',

        '<g class="node core" data-node="goals" tabindex="0" role="button" aria-label="Goals">',
          '<polygon points="540,160 615,183 615,230 540,253 465,230 465,183" class="node-shape"/>',
          '<text x="540" y="214" text-anchor="middle" class="node-label core-label">GOALS</text>',
        '</g>',

        '<g class="node core" data-node="environment" tabindex="0" role="button" aria-label="Environment">',
          '<polygon points="540,350 615,373 615,420 540,443 465,420 465,373" class="node-shape"/>',
          '<text x="540" y="404" text-anchor="middle" class="node-label core-label env">ENVIRONMENT</text>',
        '</g>',

        '<g class="node core" data-node="strategies" tabindex="0" role="button" aria-label="Strategies">',
          '<polygon points="140,350 215,373 215,420 140,443 65,420 65,373" class="node-shape"/>',
          '<text x="140" y="404" text-anchor="middle" class="node-label core-label">STRATEGIES</text>',
        '</g>',

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
        if (lockedNode) return;
        showNode(key);
      });

      g.addEventListener('mouseleave', function () {
        if (lockedNode) return;
        clearNode();
      });

      g.addEventListener('click', function (e) {
        e.stopPropagation();
        if (lockedNode === key) {
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
})();
