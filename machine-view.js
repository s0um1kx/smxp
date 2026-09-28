// Human | Machine toggle. The machine view shows index.md as plain text.
(function () {
  var MD_URL = 'index.md';
  var human = document.getElementById('human-view');
  var machine = document.getElementById('machine-view');
  var out = document.getElementById('machine-content');
  var copyBtn = document.getElementById('machine-copy');
  var buttons = document.querySelectorAll('[data-view-btn]');
  if (!human || !machine || !out || !copyBtn) return;

  var text = '';
  var loading = null;

  function load() {
    if (text) return Promise.resolve(text);
    if (loading) return loading;
    loading = fetch(MD_URL)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (t) {
        text = t;
        out.textContent = t;
        return t;
      })
      .catch(function () {
        out.textContent = 'Could not load the markdown. Open it directly: ' + new URL(MD_URL, location.href).href;
        loading = null;
        return '';
      });
    return loading;
  }

  function setView(view) {
    var isMachine = view === 'machine';
    human.hidden = isMachine;
    machine.hidden = !isMachine;
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-view-btn') === view));
    });
    if (isMachine) load();
    try {
      var url = new URL(location.href);
      if (isMachine) url.searchParams.set('view', 'machine');
      else url.searchParams.delete('view');
      history.replaceState(null, '', url);
    } catch (e) { /* ignore */ }
  }

  function fallbackCopy(t) {
    var ta = document.createElement('textarea');
    ta.value = t;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
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
        copyBtn.textContent = ok ? 'Copied' : 'Copy failed';
        setTimeout(function () { copyBtn.textContent = old; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(fallbackCopy(t)); });
      } else {
        done(fallbackCopy(t));
      }
    });
  });

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-view-btn')); });
  });

  setView(new URLSearchParams(location.search).get('view') === 'machine' ? 'machine' : 'human');
})();
