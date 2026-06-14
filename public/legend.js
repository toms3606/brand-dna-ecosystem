/* ============================================================================
 *  Brand DNA Ecosystem — Legend
 *  Renders a compact visualization of the 5-component Ecosystem with one node
 *  highlighted. Drop into any tool/page to position that tool inside the
 *  larger Brand DNA Ecosystem model.
 *
 *  Usage:
 *
 *    <script src="https://brand-dna-ecosystem.vercel.app/legend.js"></script>
 *    <div
 *      data-bdna-ecosystem-legend
 *      data-highlight="nucleus"
 *      data-caption="This audit assesses your Brand DNA — the source of the system."
 *    ></div>
 *
 *  Highlights:  nucleus | goals | environment | strategies | execution
 *  Options:     data-caption (text), data-linkback ("false" to disable),
 *               data-linkurl (override default URL)
 *
 *  Or call programmatically:
 *    window.bdnaEcosystemLegend.render(targetEl, { highlight: 'nucleus', ... });
 * ========================================================================== */

(function () {
  'use strict';

  // Geometry. Coordinates relative to nucleus at (650, 510). Cores sit at
  // offset (±285, ±210) from the nucleus — 50% further out than the prior
  // legend tuning, giving each hex more visual breathing room from the core.
  var COORDS = {
    nucleus: { cx: 650, cy: 510 },
    cores: {
      execution:   { cx: 365, cy: 300, label: 'EXECUTION',   number: '04' },
      goals:       { cx: 935, cy: 300, label: 'GOALS',       number: '01' },
      strategies:  { cx: 365, cy: 720, label: 'STRATEGIES',  number: '03' },
      environment: { cx: 935, cy: 720, label: 'ENVIRONMENT', number: '02' }
    },
    coreW: 180, coreH: 112
  };

  // Bond endpoints: BDNA outer vertices → core inner vertices.
  // Nucleus 180×112 at (650, 510):
  //   top-right (740,482), bottom-right (740,538),
  //   bottom-left (560,538), top-left (560,482)
  // Core inner vertices (the one facing nucleus):
  //   Goals (935,300) bottom-left   = (845, 328)
  //   Environment (935,720) top-left = (845, 692)
  //   Strategies (365,720) top-right = (455, 692)
  //   Execution (365,300) bottom-right = (455, 328)
  var BONDS = [
    { x1: 740, y1: 482, x2: 845, y2: 328 }, // BDNA → Goals
    { x1: 740, y1: 538, x2: 845, y2: 692 }, // BDNA → Environment
    { x1: 560, y1: 538, x2: 455, y2: 692 }, // BDNA → Strategies
    { x1: 560, y1: 482, x2: 455, y2: 328 }  // BDNA → Execution
  ];

  var DEFAULT_LINK = 'https://westwardmarketinglab.com/brand-dna-ecosystem';
  var DEFAULT_SECTION_LABEL = 'How this audit fits into the Brand DNA Ecosystem';

  function hexPoints(cx, cy, w, h) {
    var hw = w / 2, qh = h / 4, hh = h / 2;
    return [
      cx + ',' + (cy - hh),
      (cx + hw) + ',' + (cy - qh),
      (cx + hw) + ',' + (cy + qh),
      cx + ',' + (cy + hh),
      (cx - hw) + ',' + (cy + qh),
      (cx - hw) + ',' + (cy - qh)
    ].join(' ');
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function buildSVG(highlight) {
    var vb = '240 210 820 600';
    var parts = [];
    parts.push('<svg viewBox="' + vb + '" class="bdna-legend-svg" role="img" aria-label="Brand DNA Ecosystem Legend" xmlns="http://www.w3.org/2000/svg">');

    BONDS.forEach(function (b) {
      parts.push('<line x1="' + b.x1 + '" y1="' + b.y1 + '" x2="' + b.x2 + '" y2="' + b.y2 + '" class="bdna-legend-bond"/>');
    });

    // Nucleus
    var nClass = highlight === 'nucleus' ? 'bdna-legend-nucleus highlight' : 'bdna-legend-nucleus';
    parts.push('<g class="' + nClass + '">');
    parts.push('<polygon points="' + hexPoints(COORDS.nucleus.cx, COORDS.nucleus.cy, COORDS.coreW, COORDS.coreH) + '"/>');
    parts.push('<text x="' + COORDS.nucleus.cx + '" y="' + (COORDS.nucleus.cy + 8) + '" text-anchor="middle">BRAND DNA</text>');
    parts.push('</g>');

    // Cores
    Object.keys(COORDS.cores).forEach(function (key) {
      var c = COORDS.cores[key];
      var cls = highlight === key ? 'bdna-legend-core highlight' : 'bdna-legend-core';
      if (key === 'environment') cls += ' env';
      parts.push('<g class="' + cls + '">');
      parts.push('<polygon points="' + hexPoints(c.cx, c.cy, COORDS.coreW, COORDS.coreH) + '"/>');
      parts.push('<text x="' + c.cx + '" y="' + (c.cy - 13) + '" text-anchor="middle" class="bdna-legend-num">' + c.number + '</text>');
      parts.push('<text x="' + c.cx + '" y="' + (c.cy + 17) + '" text-anchor="middle" class="bdna-legend-label">' + c.label + '</text>');
      parts.push('</g>');
    });

    parts.push('</svg>');
    return parts.join('');
  }

  function injectStyles() {
    if (document.getElementById('bdna-legend-styles')) return;
    var css = [
      '.bdna-legend-wrap { font-family: "DM Sans", system-ui, sans-serif; display: block; max-width: 520px; margin: 0 auto; text-align: center; }',
      '.bdna-legend-wrap a.bdna-legend-link-block { display: block; text-decoration: none; color: inherit; }',
      '.bdna-legend-section-label { font-family: "DM Mono", "Menlo", monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #0F6E56; margin-bottom: 18px; }',
      '.bdna-legend-svg { width: 100%; height: auto; display: block; }',
      '.bdna-legend-bond { stroke: #0F6E56; stroke-width: 1.5; opacity: 0.55; fill: none; }',
      '.bdna-legend-nucleus polygon { fill: #B8DDD0; stroke: #0F6E56; stroke-width: 1.5; transition: fill 0.2s, stroke-width 0.2s; }',
      '.bdna-legend-nucleus.highlight polygon { fill: #1B5E4A; stroke: #0F6E56; stroke-width: 3; }',
      '.bdna-legend-nucleus text { font-family: "DM Mono", "Menlo", monospace; font-size: 24px; font-weight: 700; fill: #085041; letter-spacing: 0.10em; }',
      '.bdna-legend-nucleus.highlight text { fill: #E1F5EE; }',
      '.bdna-legend-core polygon { fill: #FFFFFF; stroke: #0F6E56; stroke-width: 1.5; transition: fill 0.2s, stroke-width 0.2s; }',
      '.bdna-legend-core.highlight polygon { fill: #C8E5DA; stroke: #0F6E56; stroke-width: 3; }',
      '.bdna-legend-num { font-family: "DM Mono", "Menlo", monospace; font-size: 14px; font-weight: 600; fill: #085041; opacity: 0.7; letter-spacing: 0.14em; }',
      '.bdna-legend-core.highlight .bdna-legend-num { opacity: 1; }',
      '.bdna-legend-label { font-family: "DM Mono", "Menlo", monospace; font-size: 22px; font-weight: 700; fill: #085041; letter-spacing: 0.10em; }',
      '.bdna-legend-core.env .bdna-legend-label { letter-spacing: 0.03em; }',
      '.bdna-legend-caption { font-size: 14px; color: #4a5a52; line-height: 1.55; margin: 18px auto 0; max-width: 460px; font-family: "DM Sans", system-ui, sans-serif; }',
      '.bdna-legend-cta { display: inline-block; margin-top: 14px; font-family: "DM Mono", "Menlo", monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #0F6E56; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 2px; }',
      '.bdna-legend-link-block:hover .bdna-legend-cta { color: #053a2c; }'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'bdna-legend-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function render(target, opts) {
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    opts = opts || {};
    var highlight = opts.highlight || null;
    var caption = opts.caption || null;
    var linkBack = opts.linkBack !== false;
    var linkUrl = opts.linkUrl || DEFAULT_LINK;
    // sectionLabel: undefined → use default; explicit '' → omit; string → use that string
    var sectionLabel = (opts.sectionLabel === undefined) ? DEFAULT_SECTION_LABEL : opts.sectionLabel;

    injectStyles();

    var inner = [];
    if (sectionLabel) inner.push('<div class="bdna-legend-section-label">' + esc(sectionLabel) + '</div>');
    inner.push(buildSVG(highlight));
    if (caption) inner.push('<p class="bdna-legend-caption">' + esc(caption) + '</p>');
    if (linkBack) inner.push('<span class="bdna-legend-cta">Explore the Ecosystem →</span>');

    var body = inner.join('');
    el.className = (el.className ? el.className + ' ' : '') + 'bdna-legend-wrap';
    if (linkBack) {
      el.innerHTML = '<a href="' + esc(linkUrl) + '" class="bdna-legend-link-block">' + body + '</a>';
    } else {
      el.innerHTML = body;
    }
  }

  function autoInit() {
    var els = document.querySelectorAll('[data-bdna-ecosystem-legend]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      render(el, {
        highlight: el.getAttribute('data-highlight'),
        caption: el.getAttribute('data-caption'),
        // hasAttribute test lets data-section-label="" mean "no label"
        sectionLabel: el.hasAttribute('data-section-label') ? el.getAttribute('data-section-label') : undefined,
        linkBack: el.getAttribute('data-linkback') !== 'false',
        linkUrl: el.getAttribute('data-linkurl') || undefined
      });
    }
  }

  // Public API: render(el, opts) for explicit single-element rendering;
  // init() to (re-)scan the document for any [data-bdna-ecosystem-legend]
  // elements and render each — useful when audit/report content is injected
  // into the page after DOMContentLoaded has already fired.
  window.bdnaEcosystemLegend = { render: render, init: autoInit };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
