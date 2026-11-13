(() => {
'use strict';
const $ = s => document.querySelector(s);
const { getDrugs, esc, norm, sfText, SF_KEYS } = window.PharmaApp;
let selected = []; // [{id, ar, en, extra}]
const nm = s => LANG === 'en' ? s.en : s.ar;

function catalog() {
  return [...getDrugs().map(d => ({ id: d.id, ar: d.ar, en: d.en, extra: false, brands: d.brands.map(b => b.n) })),
          ...EXTRAS.map(x => ({ ...x, extra: true, brands: [] }))];
}

function refreshList() {
  $('#drugList').innerHTML = catalog().flatMap(c => [c.ar, c.en, ...c.brands]).map(n => `<option value="${esc(n)}">`).join('');
}

function find(text) {
  const q = norm(text);
  if (!q) return null;
  const cat = catalog();
  return cat.find(c => [c.ar, c.en, c.id, ...c.brands].some(n => norm(n) === q))
      || cat.find(c => [c.ar, c.en, c.id, ...c.brands].some(n => norm(n).includes(q)))
      || null;
}

function add() {
  const inp = $('#intInput'), st = $('#intStatus');
  const c = find(inp.value);
  if (!c) { st.textContent = t('int_notfound'); return; }
  if (selected.some(s => s.id === c.id)) { st.textContent = t('int_dup'); return; }
  selected.push(c); inp.value = ''; st.textContent = '';
  render();
}

function render() {
  $('#intChips').innerHTML = selected.map(s => `<button class="chip" data-rm="${esc(s.id)}">${esc(nm(s))} ✕</button>`).join('');
  const out = $('#intResults');
  if (!selected.length) { out.innerHTML = ''; return; }

  const ids = selected.map(s => s.id), name = id => { const s = selected.find(x => x.id === id); return s ? nm(s) : id; };
  const found = [];
  INTERACTIONS.forEach((it, idx) => {
    for (const i of ids) for (const j of ids) {
      if (i === j) continue;
      if (it.a.includes(i) && it.b.includes(j)) {
        const k = idx + ':' + [i, j].sort().join('|');
        if (!found.some(f => f.k === k)) found.push({ k, idx, it, i, j });
      }
    }
  });
  const order = { high: 0, moderate: 1, low: 2 };
  found.sort((x, y) => order[x.it.lv] - order[y.it.lv]);
  const LVK = { high: 'lv_high', moderate: 'lv_mod', low: 'lv_low' };

  let html = `<h2>${t('int_title2')}</h2>`;
  if (ids.length < 2) html += `<div class="hint">${t('int_add_second')}</div>`;
  else if (found.length) {
    html += found.map(f => {
      const x = LANG === 'en' ? EN.ix[f.idx] : f.it;
      return `<div class="ix ix-${f.it.lv}"><b>${esc(name(f.i))} + ${esc(name(f.j))}</b>
      <span class="ix-lv">${t(LVK[f.it.lv])}</span>
      <div><b>${esc(x.t)}:</b> ${esc(x.d)}</div>
      <div class="hint">${t('ix_rec', esc(x.adv))}</div></div>`;
    }).join('');
  } else html += `<div class="ix ix-none">${t('ix_none')}</div>`;

  const flags = SF_KEYS.filter(k => $('#pf-' + k).checked);
  if (flags.length) {
    html += `<h2>${t('int_profile_title')}</h2>`;
    for (const s of selected.filter(x => !x.extra)) {
      const sf = SAFETY[s.id];
      html += `<div class="card"><h3>${esc(nm(s))}</h3>` + (sf
        ? flags.map(k => `<div class="sf sf-${sf[k][0]}"><span class="sf-t">${t('p_' + k + '2')} · ${t('lv_' + sf[k][0])}</span>${esc(sfText(s.id, k))}</div>`).join('')
        : `<div class="hint">${t('int_nosf')}</div>`) + '</div>';
    }
    if (selected.some(x => x.extra)) html += `<div class="hint">${t('int_extras')}</div>`;
  }
  html += `<div class="refline">${t('int_ref', ENTRY_DATE)}</div>`;
  out.innerHTML = html;
}

$('#intAdd').addEventListener('click', add);
$('#intInput').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); add(); } });
$('#intChips').addEventListener('click', e => {
  const b = e.target.closest('[data-rm]'); if (!b) return;
  selected = selected.filter(s => s.id !== b.dataset.rm); render();
});
SF_KEYS.forEach(k => $('#pf-' + k).addEventListener('change', render));
document.querySelector('[data-tab=interact]').addEventListener('click', refreshList);
document.addEventListener('langchange', () => { $('#intStatus').textContent = ''; render(); });
refreshList();
})();
