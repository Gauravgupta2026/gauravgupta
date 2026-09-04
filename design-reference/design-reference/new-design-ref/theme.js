/* Sitewide light mode. Remaps the dark palette in inline styles, reversibly. */
(function () {
  var MAP = {
    '#0b0b0b': '#f4f2ee', '#0d0d0d': '#ece9e3', '#101010': '#e7e4dd', '#111111': '#ece9e3',
    '#131313': '#e7e4dd', '#141414': '#d9d5cc', '#151515': '#dcd8cf', '#161616': '#dcd8cf',
    '#171717': '#dcd8cf', '#191919': '#d9d5cc', '#1a1a1a': '#d9d5cc', '#1c1c1c': '#d5d0c6',
    '#1e1e1e': '#d5d0c6', '#1f1f1f': '#d5d0c6', '#202020': '#d5d0c6', '#232323': '#cfc9be',
    '#242424': '#cfc9be', '#262626': '#c9c3b7', '#2a2a2a': '#c9c3b7', '#2e2e2e': '#c2bbae',
    '#333333': '#bcb4a6', '#3a3a3a': '#b6ada0', '#3d3d3d': '#aca396', '#414141': '#c4bdb0',
    '#464646': '#a49a8d', '#5c5c5c': '#8b8478', '#6f6f6f': '#7e776b', '#716e6e': '#6f6a60',
    '#787878': '#8b8478', '#7c7c7c': '#6b665c', '#7d7d7d': '#6b665c', '#898989': '#6f6a60',
    '#8a8a8a': '#7a7368', '#8f8f8f': '#6f6a60', '#929292': '#68635a', '#9d9d9d': '#68635a',
    '#a8a8a8': '#5c5850', '#b9b9b9': '#4a463f', '#bdbbff': '#4b47c9', '#c8c8c8': '#423e38',
    '#c9c9c9': '#423e38', '#d6d5ff': '#3a36b4', '#dcdcdc': '#35322c', '#e8e8e8': '#2a2721',
    '#f0f0f0': '#1a1815', '#f3f3f3': '#1a1815', '#f4f4f4': '#1a1815', '#f7f7f7': '#141210',
    '#ffffff': '#141210', '#060606': '#f4f2ee'
  };
  // #000000 is deliberately NOT mapped: it appears as shadow color and as mask
  // alpha (mask-image gradients), neither of which should shift with theme.
  var COLOR = /#[0-9a-fA-F]{6}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g;
  function toHex(r, g, b) {
    return '#' + [r, g, b].map(function (x) { return ('0' + (+x).toString(16)).slice(-2); }).join('');
  }
  var KEY = 'om-theme';
  var mode = 'dark';
  try { mode = localStorage.getItem(KEY) || 'dark'; } catch (e) {}
  var busy = false;

  function conv(s) {
    return s.replace(COLOR, function (m) {
      var key, alpha = null, rgb = false;
      if (m.charAt(0) === '#') {
        key = m.toLowerCase();
      } else {
        rgb = true;
        var n = m.match(/[\d.]+/g);
        key = toHex(n[0], n[1], n[2]);
        if (n.length > 3) alpha = n[3];
      }
      var mapped = MAP[key];
      if (!mapped) return m;
      if (!rgb) return mapped;
      var mr = parseInt(mapped.slice(1, 3), 16),
          mg = parseInt(mapped.slice(3, 5), 16),
          mb = parseInt(mapped.slice(5, 7), 16);
      return alpha != null
        ? 'rgba(' + mr + ', ' + mg + ', ' + mb + ', ' + alpha + ')'
        : 'rgb(' + mr + ', ' + mg + ', ' + mb + ')';
    });
  }

  function apply(el) {
    if (!el || el.nodeType !== 1 || !el.getAttribute) return;
    // Opt-out: colour specimens must render their literal hex in both modes.
    if (el.closest && el.closest('[data-om-theme-lock]')) return;
    var cur = el.getAttribute('style');
    if (mode === 'light') {
      if (cur == null) return;
      var light = conv(cur);
      if (light !== cur) {
        busy = true;
        el.setAttribute('data-om-dark', cur);
        el.setAttribute('style', light);
        busy = false;
      }
    } else {
      var dark = el.getAttribute('data-om-dark');
      if (dark != null) {
        busy = true;
        el.setAttribute('style', dark);
        el.removeAttribute('data-om-dark');
        busy = false;
      }
    }
  }

  function paint(root) {
    apply(root);
    if (root.querySelectorAll) {
      var all = root.querySelectorAll('[style], [data-om-dark]');
      for (var i = 0; i < all.length; i++) apply(all[i]);
    }
  }

  function sheet() {
    var s = document.getElementById('om-light-sheet');
    if (mode === 'light') {
      if (!s) {
        s = document.createElement('style');
        s.id = 'om-light-sheet';
        document.head.appendChild(s);
      }
      s.textContent = 'html,body{background:#f4f2ee !important;}' +
        'a{color:#4b47c9;}a:hover{color:#3a36b4;}' +
        '::selection{background:#4b47c9;color:#f4f2ee;}' +
        '::placeholder{color:#8b8478;}' +
        'input,textarea{color:#1a1815;}';
    } else if (s) {
      s.remove();
    }
  }

  function run() {
    sheet();
    paint(document.body || document.documentElement);
    var btn = document.getElementById('om-theme-toggle');
    if (btn) {
      var c = mode === 'light' ? '#8b8478' : '#6f6f6f';
      btn.style.borderColor = c;
      btn.style.background = mode === 'light'
        ? 'linear-gradient(90deg, transparent 0 50%, ' + c + ' 50% 100%)'
        : 'linear-gradient(90deg, ' + c + ' 0 50%, transparent 50% 100%)';
    }
  }

  function mount() {
    if (document.getElementById('om-theme-toggle')) return;
    var b = document.createElement('button');
    b.id = 'om-theme-toggle';
    b.title = 'Switch theme';
    b.setAttribute('aria-label', 'Toggle light mode');
    b.style.cssText = 'position:fixed;top:107px;right:46px;z-index:200;width:11px;height:11px;' +
      'padding:0;border-radius:50%;border:1px solid #6f6f6f;box-sizing:border-box;' +
      'cursor:pointer;opacity:.32;transition:opacity .35s ease,border-color .35s ease';
    b.addEventListener('mouseenter', function () { b.style.opacity = '.85'; });
    b.addEventListener('mouseleave', function () { b.style.opacity = '.32'; });
    b.addEventListener('click', function () {
      mode = mode === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(KEY, mode); } catch (e) {}
      run();
    });
    document.body.appendChild(b);

    new MutationObserver(function (muts) {
      if (busy || mode !== 'light') return;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'attributes') apply(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) paint(m.addedNodes[j]);
      }
    }).observe(document.body, {
      subtree: true, childList: true, attributes: true, attributeFilter: ['style']
    });

    run();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
