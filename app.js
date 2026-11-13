(() => {
'use strict';

/* ---------- أدوات ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase()
  .replace(/[ً-ٰٟـ]/g, '')
  .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
  .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
const isEn = () => LANG === 'en';

/* ---------- البيانات المحلية + المضافة ---------- */
const KEY = 'pharma_custom_v1';
const loadCustom = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const saveCustom = arr => { try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch { } };

function getDrugs() {
  const drugs = JSON.parse(JSON.stringify(DRUGS));
  for (const e of loadCustom()) {
    const g = norm(e.generic);
    let d = drugs.find(x => norm(x.en).includes(g) || norm(x.ar).includes(g) || x.id === g);
    if (!d) {
      d = {
        id: 'custom-' + g.replace(/\s/g, '-'), ar: e.generic, en: e.generic,
        cls: e.cls || '—', purpose: e.purpose || '—', strengths: [],
        side: e.side ? e.side.split(/\n|،|,/).map(s => s.trim()).filter(Boolean) : [],
        usage: e.usage || '—', timing: e.timing || '—', warn: '', brands: [], custom: true
      };
      drugs.push(d);
    }
    d.brands.push({ n: e.brand, c: e.company, s: e.strength, mine: true });
    if (e.strength && !d.strengths.includes(e.strength)) d.strengths.push(e.strength);
  }
  return drugs;
}

/* ---------- الترجمة المحلية للبيانات ---------- */
function loc(d) {
  const e = EN.drugs[d.id];
  if (!isEn()) return { name: d.ar, sub: d.en, cls: d.cls, purpose: d.purpose, strengths: d.strengths, side: d.side, usage: d.usage, timing: d.timing, warn: d.warn };
  if (!e) return { name: d.en, sub: d.ar, cls: d.cls, purpose: d.purpose, strengths: d.strengths, side: d.side, usage: d.usage, timing: d.timing, warn: d.warn };
  const base = DRUGS.find(x => x.id === d.id);
  const extra = base ? d.strengths.slice(base.strengths.length) : [];
  return { name: d.en, sub: d.ar, ...e, strengths: [...e.strengths, ...extra] };
}
const coName = c => isEn()
  ? String(c).replace('(موضعي)', '(topical)').replace('(J&J سابقاً)', '(formerly J&J)').replace('(حسب البلد)', '(varies by country)')
  : c;
const cName = c => isEn() ? EN.conds[c.id].name : c.ar;
const cNote = c => isEn() ? EN.conds[c.id].note : c.note;
const rNote = (c, i) => isEn() ? EN.conds[c.id].notes[i] : c.ranking[i].note;
const sfText = (id, k) => isEn() ? EN.safety[id][k] : SAFETY[id][k][1];

/* ---------- التبويبات ---------- */
$$('.tab').forEach(b => b.addEventListener('click', () => {
  $$('.tab').forEach(x => x.classList.toggle('active', x === b));
  $$('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + b.dataset.tab));
}));

/* ---------- السلامة والمراجع ---------- */
const SF_KEYS = ['preg', 'lact', 'renal', 'hepatic'];
function sfRow(level, key, text) {
  return `<div class="sf sf-${level}"><span class="sf-t">${t('sf_' + key)} · ${t('lv_' + level)}</span>${esc(text)}</div>`;
}
function safetyBlock(d) {
  const s = SAFETY[d.id];
  if (!s) return `<div class="sec"><b>${t('sec_safety')}</b><div class="hint">${t('no_sf')}</div></div>`;
  return `<div class="sec"><b>${t('sec_safety')}</b>${SF_KEYS.map(k => sfRow(s[k][0], k, sfText(d.id, k))).join('')}</div>`;
}
function refText(d) {
  if (d.custom) return t('ref_user');
  if (isEn()) return EN.refFull[d.id] || (EN.refDefault + (EN.refExtra[d.id] ? '; ' + EN.refExtra[d.id] : ''));
  return REFS[d.id] || REF_DEFAULT;
}
const refBlock = d => `<div class="refline">${t('ref_lbl')} ${esc(refText(d))}<br>${t('date_lbl', ENTRY_DATE)} · ${t('not_reviewed')}</div>`;

/* ---------- بطاقة دواء ---------- */
function ranksFor(drugId) {
  const out = [];
  for (const c of CONDITIONS) {
    const i = c.ranking.findIndex(r => r.drug === drugId);
    if (i >= 0) out.push({ cond: cName(c), rank: i + 1, src: c.ranking[i].src });
  }
  return out;
}

function drugCard(d) {
  const v = loc(d);
  const brands = d.brands.length
    ? `<div class="tbl-wrap"><table><thead><tr><th>${t('th_brand')}</th><th>${t('th_company')}</th><th>${t('th_strength')}</th></tr></thead><tbody>${
      d.brands.map(b => `<tr><td class="ltr">${esc(b.n)}${b.mine ? ' ⭐' : ''}</td><td>${esc(coName(b.c))}</td><td>${esc(b.s || '—')}</td></tr>`).join('')
    }</tbody></table></div>`
    : `<div class="hint">${t('no_brands')}</div>`;
  const ranks = ranksFor(d.id);
  return `<article class="card">
    <h3>${esc(v.name)}</h3>
    <div class="en">${esc(v.sub)}</div>
    <span class="tag">${esc(v.cls)}</span>
    <div class="sec"><b>${t('sec_purpose')}</b>${esc(v.purpose)}</div>
    <div class="sec"><b>${t('sec_brands')}</b>${brands}</div>
    ${v.strengths.length ? `<div class="sec"><b>${t('sec_strengths')}</b>${v.strengths.map(esc).join(' • ')}</div>` : ''}
    <div class="sec"><b>${t('sec_side')}</b>${v.side.length ? `<ul>${v.side.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : '—'}</div>
    <div class="sec"><b>${t('sec_usage')}</b>${esc(v.usage)}</div>
    <div class="sec"><b>${t('sec_timing')}</b>${esc(v.timing)}</div>
    ${v.warn ? `<div class="warn"><b>${t('warn_lbl')}</b> ${esc(v.warn)}</div>` : ''}
    ${ranks.length ? `<div class="sec"><b>${t('sec_rank')}</b><ul>${ranks.map(r => `<li>${t('rank_item', esc(r.cond), r.rank, esc(r.src))}</li>`).join('')}</ul></div>` : ''}
    ${safetyBlock(d)}
    ${refBlock(d)}
  </article>`;
}

/* ---------- البحث المحلي بالدواء ---------- */
function matchDrugs(q) {
  const nq = norm(q);
  if (!nq) return [];
  const tokens = nq.split(' ').filter(x => x.length >= 3);
  const scored = [];
  for (const d of getDrugs()) {
    const names = [d.ar, d.en, d.id, ...d.brands.map(b => b.n)].map(norm);
    const hay = [...names, norm(d.cls), norm(d.purpose), norm(EN.drugs[d.id]?.cls), norm(EN.drugs[d.id]?.purpose)].join(' | ');
    let s = 0;
    if (names.some(n => n === nq)) s += 100;
    if (names.some(n => n.includes(nq))) s += 60;
    if (hay.includes(nq)) s += 30;
    for (const x of tokens) if (names.some(n => n.includes(x))) s += 15; else if (hay.includes(x)) s += 5;
    if (s > 0) scored.push({ d, s });
  }
  return scored.sort((a, b) => b.s - a.s).map(x => x.d);
}

let lastQ = '';
function renderDrugLocal() {
  const box = $('#drugResults');
  if (!lastQ) { box.innerHTML = ''; return; }
  const found = matchDrugs(lastQ);
  let html = '';
  if (found.length) {
    html += `<h2>${t('local_results', found.length)}</h2>` + found.slice(0, 6).map(drugCard).join('');
    const first = found[0];
    const alts = getDrugs().filter(x => x.cls === first.cls && !found.includes(x));
    if (alts.length) {
      html += `<h2>${t('alts')}</h2><div class="chips">${alts.map(a => `<button class="chip" data-q="${esc(a.en)}">${esc(loc(a).name)}</button>`).join('')}</div>`;
    }
  } else {
    html += `<div class="empty">${t('not_found_local')}</div>`;
  }
  box.innerHTML = html;
}

function runDrugSearch(q) {
  lastQ = q.trim();
  sugg = []; renderSugg();
  live = null; $('#liveResults').innerHTML = '';
  renderDrugLocal();
  if (lastQ) liveSearch(lastQ);
}

$('#drugBtn').addEventListener('click', () => runDrugSearch($('#drugInput').value));
$('#drugInput').addEventListener('keydown', e => { if (e.key === 'Enter') runDrugSearch(e.target.value); });
document.addEventListener('click', e => {
  const c = e.target.closest('[data-q]');
  if (c) { $('#drugInput').value = c.dataset.q; runDrugSearch(c.dataset.q); window.scrollTo({ top: 0, behavior: 'smooth' }); }
});

/* ---------- البحث العالمي: RxNorm + openFDA ---------- */
const trunc = (x, n = 700) => { x = (x || '').toString().replace(/\s+/g, ' ').trim(); return x.length > n ? x.slice(0, n) + '…' : x; };
const firstOf = v => Array.isArray(v) ? v[0] : v;

async function fj(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.status);
  return r.json();
}

async function rxSuggest(term) {
  try {
    const j = await fj(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(term)}&maxEntries=6`);
    const ids = [...new Set((j.approximateGroup?.candidate || []).map(c => c.rxcui))].slice(0, 4);
    const names = await Promise.all(ids.map(async id => {
      try { return (await fj(`https://rxnav.nlm.nih.gov/REST/rxcui/${id}/properties.json`)).properties?.name; } catch { return null; }
    }));
    return [...new Set(names.filter(Boolean))];
  } catch { return []; }
}

async function fdaQuery(name, limit) {
  const q = `openfda.generic_name:"${name}"+OR+openfda.brand_name:"${name}"+OR+openfda.substance_name:"${name}"`;
  return fj(`https://api.fda.gov/drug/label.json?search=${q.replace(/ /g, '%20')}&limit=${limit}`);
}

let sugg = [], live = null;
function renderSugg() {
  $('#suggest').innerHTML = sugg.length
    ? `<span class="small">${t('did_you_mean')}</span>` + sugg.map(s => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')
    : '';
}

function renderLive() {
  const out = $('#liveResults');
  if (!live) return;
  const { generic, rows, L } = live;
  const sec = (title, txt) => txt ? `<details><summary>${title}</summary><div class="lbl">${esc(trunc(Array.isArray(txt) ? txt.join(' ') : txt, 1500))}</div></details>` : '';
  out.innerHTML = `<div class="live"><h2>${t('live_title', esc(generic))}</h2>
    <div class="card">
      <div class="sec"><b>${t('live_brands', rows.length)}</b>
        <input id="liveFilter" type="search" placeholder="${esc(t('filter_ph'))}">
        <div class="tbl-wrap"><table id="liveTbl"><thead><tr><th>${t('th_brand')}</th><th>${t('th_company')}</th><th>${t('th_active')}</th><th>${t('th_route')}</th></tr></thead><tbody>${
          rows.slice(0, 120).map(r => `<tr><td class="ltr">${esc(r.b)}</td><td class="ltr">${esc(r.m)}</td><td class="ltr">${esc(r.strength)}</td><td class="ltr">${esc(r.route)}</td></tr>`).join('')
        }</tbody></table></div>
      </div>
      ${sec(t('d_ind'), L.indications_and_usage)}
      ${sec(t('d_dos'), L.dosage_and_administration)}
      ${sec(t('d_adv'), L.adverse_reactions)}
      ${sec(t('d_warn'), L.warnings || L.warnings_and_cautions)}
      ${sec(t('d_inter'), L.drug_interactions)}
      ${sec(t('d_preg'), L.pregnancy || L.teratogenic_effects)}
      ${sec(t('d_lact'), L.nursing_mothers || L.lactation)}
      ${sec(t('d_spec'), L.use_in_specific_populations)}
      <div class="hint">${t('fda_note')}</div>
    </div></div>`;
  $('#liveFilter').addEventListener('input', e => {
    const v = norm(e.target.value);
    $$('#liveTbl tbody tr').forEach(tr => tr.style.display = norm(tr.textContent).includes(v) ? '' : 'none');
  });
}

async function liveSearch(term) {
  const out = $('#liveResults');
  out.innerHTML = `<div class="status">${t('searching_live')}</div>`;
  try {
    let data;
    try { data = await fdaQuery(term, 10); } catch { data = null; }

    if (!data?.results?.length) {
      const s = await rxSuggest(term);
      sugg = s; renderSugg();
      for (const x of s) { try { data = await fdaQuery(x.split(' ')[0], 10); if (data?.results?.length) break; } catch { } }
    }
    if (!data?.results?.length) { out.innerHTML = `<div class="empty">${t('no_live')}</div>`; return; }

    const generic = firstOf(data.results[0].openfda?.generic_name) || term;
    let all = data.results;
    try { all = (await fdaQuery(generic, 100)).results || all; } catch { }

    const seen = new Set(), rows = [];
    for (const r of all) {
      const brands = r.openfda?.brand_name || [], mans = r.openfda?.manufacturer_name || [];
      const strength = firstOf(r.active_ingredient) || '';
      const route = (r.openfda?.route || []).join(', ');
      const b = brands[0] || '—', m = mans[0] || '—', k = (b + m + strength).toLowerCase();
      if (seen.has(k)) continue; seen.add(k);
      rows.push({ b, m, strength, route });
    }
    live = { generic, rows, L: data.results[0] };
    renderLive();
  } catch {
    out.innerHTML = `<div class="empty">${t('live_fail')}</div>`;
  }
}

/* ---------- OCR مع تعديل النص ---------- */
let tessLoading;
function loadTesseract() {
  if (window.Tesseract) return Promise.resolve();
  if (!tessLoading) tessLoading = new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.onload = res; s.onerror = () => rej(new Error('load'));
    document.head.appendChild(s);
  });
  return tessLoading;
}

$('#imgInput').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file) return;
  const st = $('#ocrStatus');
  st.textContent = t('ocr_loading');
  try {
    await loadTesseract();
    const lang = $('#ocrArabic').checked ? 'eng+ara' : 'eng';
    const { data } = await Tesseract.recognize(file, lang, {
      logger: m => { if (m.status) st.textContent = `${m.status} ${m.progress ? Math.round(m.progress * 100) + '%' : ''}`; }
    });
    const text = (data.text || '').trim();
    $('#ocrText').value = text;
    $('#ocrBox').hidden = false;
    const words = [...new Set((text.match(/[A-Za-z][A-Za-z-]{3,}/g) || []).map(w => w.toLowerCase()))].slice(0, 12);
    $('#ocrChips').innerHTML = words.map(w => `<button class="chip" data-q="${esc(w)}">${esc(w)}</button>`).join('');
    st.textContent = text ? t('ocr_done') : t('ocr_none');
  } catch {
    st.textContent = t('ocr_fail');
  }
});

$('#ocrSearch').addEventListener('click', () => {
  const x = $('#ocrText').value.replace(/\s+/g, ' ').trim();
  $('#drugInput').value = x.split(' ').slice(0, 3).join(' ');
  runDrugSearch(x.length > 40 ? x.split(' ')[0] : x);
});

/* ---------- البحث بالمرض ---------- */
function matchConditions(q) {
  const nq = norm(q);
  if (!nq) return [];
  const tokens = nq.split(' ').filter(x => x.length >= 2);
  return CONDITIONS.map(c => {
    const hay = norm([c.ar, c.en, EN.conds[c.id].name, ...c.keys].join(' '));
    let s = 0;
    if (hay.includes(nq)) s += 50;
    for (const x of tokens) if (hay.includes(x)) s += 10;
    return { c, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.c);
}

function conditionCard(c) {
  const drugs = getDrugs();
  const items = c.ranking.map((r, i) => {
    const d = drugs.find(x => x.id === r.drug);
    if (!d) return '';
    const v = loc(d);
    const brands = d.brands.slice(0, 5).map(b => b.n).join(isEn() ? ', ' : '، ');
    return `<div class="rank"><div class="n">${i + 1}</div><div>
      <b>${esc(v.name)}</b> <span class="en">${esc(v.sub)}</span>
      <div>${esc(rNote(c, i))}</div>
      <div class="src">${t('dis_ref', esc(r.src))}</div>
      ${brands ? `<div class="src">${t('dis_ex', esc(brands))}</div>` : ''}
      <button class="chip" data-q="${esc(d.en)}" onclick="document.querySelector('[data-tab=drug]').click()">${t('dis_details')}</button>
    </div></div>`;
  }).join('');
  const note = cNote(c);
  return `<article class="card"><h3>${esc(cName(c))}</h3>${items}${note ? `<div class="warn">${esc(note)}</div>` : ''}<div class="refline">${t('cond_date', ENTRY_DATE)}</div></article>`;
}

let lastDis = '';
function renderDis() {
  const box = $('#disResults');
  if (!lastDis.trim()) { box.innerHTML = ''; return; }
  const found = matchConditions(lastDis);
  box.innerHTML = found.length ? found.map(conditionCard).join('') : `<div class="empty">${t('dis_nf')}</div>`;
}
function runDisSearch(q) { lastDis = q; renderDis(); }
$('#disBtn').addEventListener('click', () => runDisSearch($('#disInput').value));
$('#disInput').addEventListener('keydown', e => { if (e.key === 'Enter') runDisSearch(e.target.value); });
function buildDisChips() {
  $('#disChips').innerHTML = CONDITIONS.map(c => `<button class="chip" data-dis="${esc(cName(c))}">${esc(cName(c))}</button>`).join('');
}
$('#disChips').addEventListener('click', e => {
  const b = e.target.closest('[data-dis]');
  if (b) { $('#disInput').value = b.dataset.dis; runDisSearch(b.dataset.dis); }
});
buildDisChips();

/* ---------- الإضافة والاستيراد ---------- */
const addStatus = m => { $('#addStatus').textContent = m; };

$('#addForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const arr = loadCustom(); arr.push(f); saveCustom(arr);
  e.target.reset();
  addStatus(t('saved'));
});

$('#csvInput').addEventListener('change', async e => {
  const file = e.target.files[0]; if (!file) return;
  const lines = (await file.text()).replace(/^﻿/, '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const arr = loadCustom(); let n = 0;
  for (const l of lines) {
    const p = l.split(/[,;\t]/).map(x => x.trim().replace(/^"|"$/g, ''));
    if (p.length < 3 || /^brand$/i.test(p[0])) continue;
    arr.push({ brand: p[0], generic: p[1], company: p[2], strength: p[3] || '' }); n++;
  }
  saveCustom(arr);
  addStatus(t('imported', n));
});

$('#exportBtn').addEventListener('click', () => {
  const rows = ['brand,generic,company,strength', ...loadCustom().map(e => [e.brand, e.generic, e.company, e.strength || ''].map(x => `"${String(x).replace(/"/g, '""')}"`).join(','))];
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + rows.join('\n')], { type: 'text/csv;charset=utf-8' }));
  a.download = 'my-drugs.csv'; a.click();
});

$('#clearBtn').addEventListener('click', () => {
  if (confirm(t('confirm_clear'))) { saveCustom([]); addStatus(t('cleared')); }
});

/* ---------- تبديل اللغة ---------- */
document.addEventListener('langchange', () => {
  buildDisChips();
  renderDrugLocal();
  renderSugg();
  renderLive();
  renderDis();
  // نصوص الحالة الثابتة
  if ($('#ocrStatus').textContent) $('#ocrStatus').textContent = '';
});

window.PharmaApp = { getDrugs, esc, norm, loc, sfText, SF_KEYS };
})();
