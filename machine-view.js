// Human | Machine. Machine mode drains the page's design and types out index.md.
(function () {
  var MD_URL = 'index.md';
  var body = document.body;
  var human = document.getElementById('human-view');
  var machine = document.getElementById('machine-view');
  var out = document.getElementById('machine-content');
  var meter = document.getElementById('machine-meter');
  var copyBtn = document.getElementById('machine-copy');
  var buttons = document.querySelectorAll('[data-view-btn]');
  if (!human || !machine || !out || !meter || !copyBtn) return;

  var calm = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var text = '', loading = null, timer = null;

  function load() {
    if (text) return Promise.resolve(text);
    if (loading) return loading;
    loading = fetch(MD_URL)
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (t) { text = t; return t; })
      .catch(function () {
        out.textContent = 'Could not load the markdown. Open it directly: ' + new URL(MD_URL, location.href).href;
        loading = null;
        return '';
      });
    return loading;
  }

  function stop() { clearInterval(timer); timer = null; out.classList.remove('typing'); }

  function reveal(t) {
    stop();
    if (!t) return;
    meter.textContent = 'index.md \u00b7 ' + (new Blob([t]).size / 1024).toFixed(1) + ' KB \u00b7 \u2248' +
      Math.round(t.length / 4) + ' tokens \u00b7 0 images \u00b7 0 fonts';
    if (calm) { out.textContent = t; return; }
    var lines = t.split('\n'), i = 0;
    out.textContent = '';
    out.classList.add('typing');
    timer = setInterval(function () {
      i += 3;
      if (i >= lines.length) { out.textContent = t; stop(); return; }
      out.textContent = lines.slice(0, i).join('\n');
    }, 24);
  }

  function setView(view) {
    var isMachine = view === 'machine';
    human.hidden = isMachine;
    machine.hidden = !isMachine;
    body.classList.toggle('machine', isMachine);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-view-btn') === view));
    });
    if (isMachine) load().then(function (t) { if (body.classList.contains('machine')) reveal(t); });
    else stop();
    try {
      var url = new URL(location.href);
      if (isMachine) url.searchParams.set('view', 'machine'); else url.searchParams.delete('view');
      history.replaceState(null, '', url);
    } catch (e) { /* ignore */ }
  }

  function fallbackCopy(t) {
    var ta = document.createElement('textarea');
    ta.value = t; ta.setAttribute('readonly', '');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }

  copyBtn.addEventListener('click', function () {
    load().then(function (t) {
      if (!t) return;
      var done = function (ok) {
        var old = copyBtn.textContent;
        copyBtn.textContent = ok ? 'Copied \u2713' : 'Copy failed';
        setTimeout(function () { copyBtn.textContent = old; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(fallbackCopy(t)); });
      } else { done(fallbackCopy(t)); }
    });
  });

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-view-btn')); });
  });

  setView(new URLSearchParams(location.search).get('view') === 'machine' ? 'machine' : 'human');
})();
