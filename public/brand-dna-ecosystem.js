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

  // ---- Molecule layout -----------------------------------------------------

  // Geometry overview:
  //   - Brand DNA nucleus at canvas center.
  //   - Four core nodes pulled in close to the nucleus.
  //   - Each core has 6 sub-nodes that fan out, with ALL sub-bonds converging
  //     at a single "anchor" vertex of the core hex.
  //   - Anchor vertex is the hex vertex adjacent to (but offset from) where
  //     the BDNA bond terminates:
  //       Top cores:    anchor = vertex directly above the BDNA connection.
  //       Bottom cores: anchor = vertex directly below the BDNA connection.
  //   - Sub-nodes spread in a 150° arc around the fan center direction,
  //     which is the direction from the anchor toward open canvas.
  var MOLECULE = {
    nucleus: { cx: 650, cy: 435 },
    cores: {
      execution: {
        cx: 400, cy: 280,
        anchor: { x: 475, y: 257 }, // top-right vertex of core hex
        fanCenterDeg: 200,           // slightly above due-West
        subs: ['CONTENT', 'PAID MEDIA', 'SEO/GEO', 'EMAIL', 'SOCIAL', 'AI']
      },
      goals: {
        cx: 900, cy: 280,
        anchor: { x: 825, y: 257 }, // top-left vertex of core hex
        fanCenterDeg: -20,           // slightly above due-East
        subs: ['REVENUE', 'MARKET\nSHARE', 'ACQUISITION', 'RETENTION', 'GROWTH', 'AUTHORITY']
      },
      strategies: {
        cx: 400, cy: 590,
        anchor: { x: 475, y: 613 }, // bottom-right vertex of core hex
        fanCenterDeg: 160,           // slightly below due-West
        subs: ['CHANNELS', 'TARGETING', 'POSITIONING', 'CONTENT\nPLAN', 'PRICING', 'PRODUCT/\nSERVICE']
      },
      environment: {
        cx: 900, cy: 590,
        anchor: { x: 825, y: 613 }, // bottom-left vertex of core hex
        fanCenterDeg: 20,            // slightly below due-East
        subs: ['MARKET', 'COMPETITORS', 'AUDIENCES', 'AI/SEARCH', 'INDUSTRY\nTRENDS', 'REGULATORY']
      }
    },
    coreW: 150, coreH: 93,
    subW: 90,  subH: 56,
    subFanSpanDeg: 150,
    subDistance: 180
  };

  // Build a hexagon polygon points string centered at (cx, cy)
  function hexPoints(cx, cy, w, h) {
    var hw = w / 2, qh = h / 4, hh = h / 2;
    return [
      cx + ',' + (cy - hh),         // top
      (cx + hw) + ',' + (cy - qh),  // top-right
      (cx + hw) + ',' + (cy + qh),  // bottom-right
      cx + ',' + (cy + hh),         // bottom
      (cx - hw) + ',' + (cy + qh),  // bottom-left
      (cx - hw) + ',' + (cy - qh)   // top-left
    ].join(' ');
  }

  // Compute sub-node position: distance from the anchor vertex, angle within
  // the fan arc centered on fanCenterDeg. Position 0 is the topmost sub-node
  // (lowest y), position 5 is the bottommost. To achieve this, we iterate
  // from the angle that produces the smallest y to the angle that produces
  // the largest y.
  function subPosition(core, idx, count) {
    var halfSpan = MOLECULE.subFanSpanDeg / 2;
    // Generate all candidate angles in the fan, then sort by resulting y
    var candidates = [];
    for (var k = 0; k < count; k++) {
      var t = k / (count - 1);
      var deg = (core.fanCenterDeg - halfSpan) + t * MOLECULE.subFanSpanDeg;
      var rad = deg * Math.PI / 180;
      candidates.push({
        x: core.anchor.x + MOLECULE.subDistance * Math.cos(rad),
        y: core.anchor.y + MOLECULE.subDistance * Math.sin(rad)
      });
    }
    candidates.sort(function (a, b) { return a.y - b.y; }); // top to bottom
    return candidates[idx];
  }

  // Render a sub-node label as one or two <tspan> lines.
  function subLabelTspans(label, cx, cy) {
    if (label.indexOf('\n') === -1) {
      // single-line label; use a smaller font on extra-long single words
      var tightWord = (label.length >= 11);
      var fontAttr = tightWord ? ' style="font-size:8px;letter-spacing:.04em"' : '';
      return '<tspan x="' + cx + '" dy="0"' + fontAttr + '>' + esc(label) + '</tspan>';
    }
    // two-line label
    var parts = label.split('\n');
    return '<tspan x="' + cx + '" dy="-4">' + esc(parts[0]) + '</tspan>' +
           '<tspan x="' + cx + '" dy="12">' + esc(parts[1]) + '</tspan>';
  }

  function moleculeSVG() {
    var m = MOLECULE;
    var parts = [];

    parts.push('<svg viewBox="0 0 1300 870" role="img" aria-labelledby="mol-title mol-desc" class="molecule">');
    parts.push('<title id="mol-title">The Brand DNA Ecosystem</title>');
    parts.push('<desc id="mol-desc">An interactive diagram with Brand DNA at the nucleus, surrounded by four core nodes — Goals, Environment, Strategies, and Execution — each with six sub-nodes representing the domains that compose it. Hover or click any node to highlight it and its sub-nodes.</desc>');

    // Bond lines: nucleus vertices → core node inner vertices
    // Nucleus hex at (650, 435), width 150, height 93:
    //   top-right vertex = (725, 412), bottom-right = (725, 458)
    //   bottom-left = (575, 458), top-left = (575, 412)
    // Core inner vertices (the vertex facing the nucleus):
    //   Goals (900, 280):       bottom-left  = (825, 303)
    //   Environment (900, 590): top-left     = (825, 567)
    //   Strategies (400, 590):  top-right    = (475, 567)
    //   Execution (400, 280):   bottom-right = (475, 303)
    parts.push('<g class="bonds" aria-hidden="true">');
    parts.push('<line x1="725" y1="412" x2="825" y2="303" class="bond"/>');
    parts.push('<line x1="725" y1="458" x2="825" y2="567" class="bond"/>');
    parts.push('<line x1="575" y1="458" x2="475" y2="567" class="bond"/>');
    parts.push('<line x1="575" y1="412" x2="475" y2="303" class="bond"/>');
    parts.push('</g>');

    // Sub-bond lines: anchor vertex → sub-node center
    parts.push('<g class="sub-bonds" aria-hidden="true">');
    Object.keys(m.cores).forEach(function (key) {
      var core = m.cores[key];
      for (var i = 0; i < core.subs.length; i++) {
        var p = subPosition(core, i, core.subs.length);
        parts.push('<line x1="' + core.anchor.x + '" y1="' + core.anchor.y + '" x2="' + p.x.toFixed(1) + '" y2="' + p.y.toFixed(1) + '" class="sub-bond" data-parent="' + key + '"/>');
      }
    });
    parts.push('</g>');

    // Nucleus
    parts.push('<g class="node nucleus" data-node="nucleus" tabindex="0" role="button" aria-label="Brand DNA">');
    parts.push('<polygon points="' + hexPoints(m.nucleus.cx, m.nucleus.cy, m.coreW, m.coreH) + '" class="node-shape"/>');
    parts.push('<text x="' + m.nucleus.cx + '" y="' + (m.nucleus.cy + 8) + '" text-anchor="middle" class="node-label nucleus-label">BRAND DNA</text>');
    parts.push('</g>');

    // Core nodes
    Object.keys(m.cores).forEach(function (key) {
      var core = m.cores[key];
      var label = key.toUpperCase();
      var labelClass = (label === 'ENVIRONMENT') ? 'node-label core-label env' : 'node-label core-label';
      parts.push('<g class="node core" data-node="' + key + '" tabindex="0" role="button" aria-label="' + esc(label.charAt(0) + label.slice(1).toLowerCase()) + '">');
      parts.push('<polygon points="' + hexPoints(core.cx, core.cy, m.coreW, m.coreH) + '" class="node-shape"/>');
      parts.push('<text x="' + core.cx + '" y="' + (core.cy + 6) + '" text-anchor="middle" class="' + labelClass + '">' + label + '</text>');
      parts.push('</g>');
    });

    // Sub-nodes
    Object.keys(m.cores).forEach(function (key) {
      var core = m.cores[key];
      for (var i = 0; i < core.subs.length; i++) {
        var label = core.subs[i];
        var p = subPosition(core, i, core.subs.length);
        var px = p.x, py = p.y;
        parts.push('<g class="sub-node" data-parent="' + key + '" aria-hidden="true">');
        parts.push('<polygon points="' + hexPoints(px, py, m.subW, m.subH) + '" class="sub-node-shape"/>');
        parts.push('<text x="' + px.toFixed(1) + '" y="' + (py + 3).toFixed(1) + '" text-anchor="middle" class="sub-node-label">');
        parts.push(subLabelTspans(label, px.toFixed(1), py.toFixed(1)));
        parts.push('</text>');
        parts.push('</g>');
      }
    });

    parts.push('</svg>');
    return parts.join('');
  }

  // ---- Interactions --------------------------------------------------------

  function wireInteractions(root) {
    var svg = root.querySelector('.molecule');
    var panel = root.querySelector('#info-panel');
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
      // Core nodes: active vs dimmed based on data-node
      svg.querySelectorAll('.node').forEach(function (g) {
        g.classList.toggle('active', g.getAttribute('data-node') === key);
        g.classList.toggle('dimmed', g.getAttribute('data-node') !== key);
      });
      // Sub-nodes: active if parent matches, dimmed otherwise
      svg.querySelectorAll('.sub-node').forEach(function (g) {
        g.classList.toggle('active', g.getAttribute('data-parent') === key);
        g.classList.toggle('dimmed', g.getAttribute('data-parent') !== key);
      });
      // Sub-bond lines: same as sub-nodes
      svg.querySelectorAll('.sub-bond').forEach(function (g) {
        g.classList.toggle('active', g.getAttribute('data-parent') === key);
        g.classList.toggle('dimmed', g.getAttribute('data-parent') !== key);
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
      svg.querySelectorAll('.node, .sub-node, .sub-bond').forEach(function (g) {
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
