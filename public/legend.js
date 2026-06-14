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

  // Geometry mirrors the main Ecosystem molecule. Coordinates are kept
  // identical so the legend reads as a smaller version of the same diagram.
  var COORDS = {
    nucleus: { cx: 650, cy: 510 },
    cores: {
      execution:   { cx: 360, cy: 240, label: 'EXECUTION',   number: '04' },
      goals:       { cx: 940, cy: 240, label: 'GOALS',       number: '01' },
      strategies:  { cx: 360, cy: 780, label: 'STRATEGIES',  number: '03' },
      environment: { cx: 940, cy: 780, label: 'ENVIRONMENT', number: '02' }
    },
    coreW: 150, coreH: 93
  };

  var BONDS = [
    { x1: 725, y1: 487, x2: 865, y2: 263 }, // BDNA → Goals
    { x1: 725, y1: 533, x2: 865, y2: 757 }, // BDNA → Environment
    { x1: 575, y1: 533, x2: 435, y2: 757 }, // BDNA → Strategies
    { x1: 575, y1: 487, x2: 435, y2: 263 }  // BDNA → Execution
  ];

  var DEFAULT_LINK = 'https://westwardmarketinglab.com/brand-dna-ecosystem';

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
    // viewBox crops to just the nucleus + 4 cores (no sub-nodes shown).
    // Calculated to give ~40px padding around the outermost hexes.
    var vb = '270 180 760 660';
    var parts = [];
    parts.push('<svg viewBox="' + vb + '" class="bdna-legend-svg" role="img" aria-label="Brand DNA Ecosystem Legend" xmlns="http://www.w3.org/2000/svg">');

    BONDS.forEach(function (b) {
      parts.push('<line x1="' + b.x1 + '" y1="' + b.y1 + '" x2="' + b.x2 + '" y2="' + b.y2 + '" class="bdna-legend-bond"/>');
    });

    // Nucleus
    var nClass = highlight === 'nucleus' ? 'bdna-legend-nucleus highlight' : 'bdna-legend-nucleus';
    parts.push('<g class="' + nClass + '">');
    parts.push('<polygon points="' + hexPoints(COORDS.nucleus.cx, COORDS.nucleus.cy, COORDS.coreW, COORDS.coreH) + '"/>');
    parts.push('<text x="' + COORDS.nucleus.cx + '" y="' + (COORDS.nucleus.cy + 7) + '" text-anchor="middle">BRAND DNA</text>');
    parts.push('</g>');

    // Cores
    Object.keys(COORDS.cores).forEach(function (key) {
      var c = COORDS.cores[key];
      var cls = highlight === key ? 'bdna-legend-core highlight' : 'bdna-legend-core';
      parts.push('<g class="' + cls + '">');
      parts.push('<polygon points="' + hexPoints(c.cx, c.cy, COORDS.coreW, COORDS.coreH) + '"/>');
      parts.push('<text x="' + c.cx + '" y="' + (c.cy - 9) + '" text-anchor="middle" class="bdna-legend-num">' + c.number + '</text>');
      parts.push('<text x="' + c.cx + '" y="' + (c.cy + 14) + '" text-anchor="middle" class="bdna-legend-label">' + c.label + '</text>');
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
      '.bdna-legend-nucleus text { font-family: "DM Mono", "Menlo", monospace; font-size: 22px; font-weight: 700; fill: #085041; letter-spacing: 0.10em; }',
      '.bdna-legend-nucleus.highlight text { fill: #E1F5EE; }',
      '.bdna-legend-core polygon { fill: #FFFFFF; stroke: #0F6E56; stroke-width: 1.5; transition: fill 0.2s, stroke-width 0.2s; }',
      '.bdna-legend-core.highlight polygon { fill: #C8E5DA; stroke: #0F6E56; stroke-width: 3; }',
      '.bdna-legend-num { font-family: "DM Mono", "Menlo", monospace; font-size: 13px; font-weight: 600; fill: #085041; opacity: 0.7; letter-spacing: 0.14em; }',
      '.bdna-legend-core.highlight .bdna-legend-num { opacity: 1; }',
      '.bdna-legend-label { font-family: "DM Mono", "Menlo", monospace; font-size: 19px; font-weight: 700; fill: #085041; letter-spacing: 0.10em; }',
      '.bdna-legend-core.env .bdna-legend-label { letter-spacing: 0.04em; }',
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
    var sectionLabel = opts.sectionLabel || 'Part of the Ecosystem';

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
        sectionLabel: el.getAttribute('data-section-label') || undefined,
        linkBack: el.getAttribute('data-linkback') !== 'false',
        linkUrl: el.getAttribute('data-linkurl') || undefined
      });
    }
  }

  window.bdnaEcosystemLegend = { render: render };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
})();
