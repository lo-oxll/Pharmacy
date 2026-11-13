(() => {
'use strict';

/* ---------- أدوات ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase()
  .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
  .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
  .replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();

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
        cls: e.cls || 'غير محدد', purpose: e.purpose || '—', strengths: [],
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

/* ---------- التبويبات ---------- */
$$('.tab').forEach(b => b.addEventListener('click', () => {
  $$('.tab').forEach(x => x.classList.toggle('active', x === b));
  $$('.panel').forEach(p => p.classList.toggle('active', p.id === 'tab-' + b.dataset.tab));
}));

/* ---------- عرض بطاقة دواء ---------- */
function ranksFor(drugId) {
  const out = [];
  for (const c of CONDITIONS) {
    const i = c.ranking.findIndex(r => r.drug === drugId);
    if (i >= 0) out.push({ cond: c.ar, rank: i + 1, src: c.ranking[i].src });
  }
  return out;
}

function drugCard(d) {
  const brands = d.brands.length
    ? `<div class="tbl-wrap"><table><thead><tr><th>الاسم التجاري</th><th>الشركة</th><th>التركيز</th></tr></thead><tbody>${
      d.brands.map(b => `<tr><td class="ltr">${esc(b.n)}${b.mine ? ' ⭐' : ''}</td><td>${esc(b.c)}</td><td>${esc(b.s || '—')}</td></tr>`).join('')
    }</tbody></table></div>`
    : '<div class="hint">لا توجد شركات مسجلة محلياً. أضفها من تبويب "إضافة" أو راجع النتائج العالمية أدناه.</div>';
  const ranks = ranksFor(d.id);
  return `<article class="card">
    <h3>${esc(d.ar)}</h3>
    <div class="en">${esc(d.en)}</div>
    <span class="tag">${esc(d.cls)}</span>
    <div class="sec"><b>الغرض العلاجي</b>${esc(d.purpose)}</div>
    <div class="sec"><b>الشركات والأسماء التجارية</b>${brands}</div>
    ${d.strengths.length ? `<div class="sec"><b>التراكيز والأشكال</b>${d.strengths.map(esc).join(' • ')}</div>` : ''}
    <div class="sec"><b>الأعراض الجانبية</b>${d.side.length ? `<ul>${d.side.map(s => `<li>${esc(s)}</li>`).join('')}</ul>` : '—'}</div>
    <div class="sec"><b>طريقة الاستعمال</b>${esc(d.usage)}</div>
    <div class="sec"><b>أوقات الاستعمال</b>${esc(d.timing)}</div>
    ${d.warn ? `<div class="warn"><b>تحذيرات:</b> ${esc(d.warn)}</div>` : ''}
    ${ranks.length ? `<div class="sec"><b>موقعه في التوصيات الرسمية</b><ul>${ranks.map(r => `<li>${esc(r.cond)}: الترتيب ${r.rank} <span class="hint">(${esc(r.src)})</span></li>`).join('')}</ul></div>` : ''}
  </article>`;
}

/* ---------- البحث المحلي بالدواء ---------- */
function matchDrugs(q) {
  const nq = norm(q);
  if (!nq) return [];
  const tokens = nq.split(' ').filter(t => t.length >= 3);
  const scored = [];
  for (const d of getDrugs()) {
    const names = [d.ar, d.en, d.id, ...d.brands.map(b => b.n)].map(norm);
    const hay = [...names, norm(d.cls), norm(d.purpose)].join(' | ');
    let s = 0;
    if (names.some(n => n === nq)) s += 100;
    if (names.some(n => n.includes(nq))) s += 60;
    if (hay.includes(nq)) s += 30;
    for (const t of tokens) if (names.some(n => n.includes(t))) s += 15; else if (hay.includes(t)) s += 5;
    if (s > 0) scored.push({ d, s });
  }
  return scored.sort((a, b) => b.s - a.s).map(x => x.d);
}

function runDrugSearch(q) {
  q = q.trim();
  $('#suggest').innerHTML = '';
  $('#liveResults').innerHTML = '';
  const box = $('#drugResults');
  if (!q) { box.innerHTML = ''; return; }
  const found = matchDrugs(q);
  let html = '';
  if (found.length) {
    html += `<h2>النتائج المحلية (${found.length})</h2>` + found.slice(0, 6).map(drugCard).join('');
    const first = found[0];
    const alts = getDrugs().filter(x => x.cls === first.cls && !found.includes(x));
    if (alts.length) {
      html += `<h2>بدائل بنفس الفئة العلاجية</h2><div class="chips">${alts.map(a => `<button class="chip" data-q="${esc(a.en)}">${esc(a.ar)}</button>`).join('')}</div>`;
    }
  } else {
    html += '<div class="empty">لم يوجد في القاعدة المحلية. جارٍ البحث في القواعد العالمية…</div>';
  }
  box.innerHTML = html;
  liveSearch(q);
}

$('#drugBtn').addEventListener('click', () => runDrugSearch($('#drugInput').value));
$('#drugInput').addEventListener('keydown', e => { if (e.key === 'Enter') runDrugSearch(e.target.value); });
document.addEventListener('click', e => {
  const c = e.target.closest('[data-q]');
  if (c) { $('#drugInput').value = c.dataset.q; runDrugSearch(c.dataset.q); window.scrollTo({ top: 0, behavior: 'smooth' }); }
});

/* ---------- البحث العالمي: RxNorm + openFDA ---------- */
const trunc = (t, n = 700) => { t = (t || '').toString().replace(/\s+/g, ' ').trim(); return t.length > n ? t.slice(0, n) + '…' : t; };
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

async function liveSearch(term) {
  const out = $('#liveResults');
  out.innerHTML = '<div class="status">جارٍ البحث في openFDA و RxNorm…</div>';
  try {
    let data;
    try { data = await fdaQuery(term, 10); } catch { data = null; }

    // لم نجد؟ جرب تصحيح الكتابة عبر RxNorm (يفيد مع أخطاء OCR)
    if (!data?.results?.length) {
      const sug = await rxSuggest(term);
      $('#suggest').innerHTML = sug.length
        ? `<span class="small">هل تقصد؟</span>` + sug.map(s => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join('')
        : '';
      for (const s of sug) { try { data = await fdaQuery(s.split(' ')[0], 10); if (data?.results?.length) break; } catch { } }
    }
    if (!data?.results?.length) {
      out.innerHTML = '<div class="empty">لا نتائج عالمية لهذا الاسم. جرّب الاسم العلمي بالإنجليزية.</div>';
      return;
    }

    const generic = firstOf(data.results[0].openfda?.generic_name) || term;
    // كل الشركات التي تنتج نفس المادة الفعالة
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
    const L = data.results[0];
    const sec = (title, txt) => txt ? `<details><summary>${title}</summary><div class="lbl">${esc(trunc(Array.isArray(txt) ? txt.join(' ') : txt, 1500))}</div></details>` : '';

    out.innerHTML = `<div class="live"><h2>🌍 نتائج عالمية: ${esc(generic)}</h2>
      <div class="card">
        <div class="sec"><b>الشركات والأسماء التجارية (${rows.length}) — openFDA</b>
          <input id="liveFilter" type="search" placeholder="تصفية بالشركة أو الاسم…">
          <div class="tbl-wrap"><table id="liveTbl"><thead><tr><th>الاسم التجاري</th><th>الشركة</th><th>المادة الفعالة / التركيز</th><th>الطريق</th></tr></thead><tbody>${
            rows.slice(0, 120).map(r => `<tr><td class="ltr">${esc(r.b)}</td><td class="ltr">${esc(r.m)}</td><td class="ltr">${esc(r.strength)}</td><td class="ltr">${esc(r.route)}</td></tr>`).join('')
          }</tbody></table></div>
        </div>
        ${sec('دواعي الاستعمال (الملصق الرسمي)', L.indications_and_usage)}
        ${sec('الجرعة وطريقة الاستعمال', L.dosage_and_administration)}
        ${sec('الأعراض الجانبية', L.adverse_reactions)}
        ${sec('التحذيرات', L.warnings || L.warnings_and_cautions)}
        <div class="hint">النص الرسمي بالإنجليزية من ملصق إدارة الغذاء والدواء الأمريكية (FDA). قد تختلف المنتجات والشركات في العراق.</div>
      </div></div>`;
    $('#liveFilter').addEventListener('input', e => {
      const v = norm(e.target.value);
      $$('#liveTbl tbody tr').forEach(tr => tr.style.display = norm(tr.textContent).includes(v) ? '' : 'none');
    });
  } catch (err) {
    out.innerHTML = '<div class="empty">تعذر الاتصال بالقواعد العالمية (تحقق من الإنترنت). النتائج المحلية تعمل بدون اتصال.</div>';
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
  st.textContent = 'جارٍ تحميل محرك القراءة…';
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
    st.textContent = text ? 'تمت القراءة. عدّل النص أو اضغط على كلمة لتبحث بها.' : 'لم يُقرأ نص. جرّب صورة أوضح للاسم.';
  } catch {
    st.textContent = 'تعذر تشغيل القراءة (يلزم اتصال بالإنترنت لتحميل المحرك). اكتب الاسم يدوياً.';
  }
});

$('#ocrSearch').addEventListener('click', () => {
  const t = $('#ocrText').value.replace(/\s+/g, ' ').trim();
  $('#drugInput').value = t.split(' ').slice(0, 3).join(' ');
  runDrugSearch(t.length > 40 ? t.split(' ')[0] : t);
});

/* ---------- البحث بالمرض ---------- */
function matchConditions(q) {
  const nq = norm(q);
  if (!nq) return [];
  const tokens = nq.split(' ').filter(t => t.length >= 2);
  return CONDITIONS.map(c => {
    const hay = norm([c.ar, c.en, ...c.keys].join(' '));
    let s = 0;
    if (hay.includes(nq)) s += 50;
    for (const t of tokens) if (hay.includes(t)) s += 10;
    return { c, s };
  }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.c);
}

function conditionCard(c) {
  const drugs = getDrugs();
  const items = c.ranking.map((r, i) => {
    const d = drugs.find(x => x.id === r.drug);
    if (!d) return '';
    const brands = d.brands.slice(0, 5).map(b => b.n).join('، ');
    return `<div class="rank"><div class="n">${i + 1}</div><div>
      <b>${esc(d.ar)}</b> <span class="en">${esc(d.en)}</span>
      <div>${esc(r.note)}</div>
      <div class="src">المرجع: ${esc(r.src)}</div>
      ${brands ? `<div class="src">أمثلة تجارية: ${esc(brands)}</div>` : ''}
      <button class="chip" data-q="${esc(d.en)}" onclick="document.querySelector('[data-tab=drug]').click()">تفاصيل الدواء والشركات</button>
    </div></div>`;
  }).join('');
  return `<article class="card"><h3>${esc(c.ar)}</h3>${items}${c.note ? `<div class="warn">${esc(c.note)}</div>` : ''}</article>`;
}

function runDisSearch(q) {
  const box = $('#disResults');
  const found = matchConditions(q);
  box.innerHTML = q.trim()
    ? (found.length ? found.map(conditionCard).join('') : '<div class="empty">لم يوجد هذا المرض في القاعدة. جرّب كلمة أخرى أو اختر من القائمة.</div>')
    : '';
}
$('#disBtn').addEventListener('click', () => runDisSearch($('#disInput').value));
$('#disInput').addEventListener('keydown', e => { if (e.key === 'Enter') runDisSearch(e.target.value); });
$('#disChips').innerHTML = CONDITIONS.map(c => `<button class="chip" data-dis="${esc(c.ar)}">${esc(c.ar)}</button>`).join('');
$('#disChips').addEventListener('click', e => {
  const b = e.target.closest('[data-dis]');
  if (b) { $('#disInput').value = b.dataset.dis; runDisSearch(b.dataset.dis); }
});

/* ---------- الإضافة والاستيراد ---------- */
const addStatus = m => { $('#addStatus').textContent = m; };

$('#addForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const arr = loadCustom(); arr.push(f); saveCustom(arr);
  e.target.reset();
  addStatus('تم الحفظ ✔ ابحث عن الدواء لترى الإضافة.');
});

$('#csvInput').addEventListener('change', async e => {
  const file = e.target.files[0]; if (!file) return;
  const lines = (await file.text()).replace(/^\uFEFF/, '').split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const arr = loadCustom(); let n = 0;
  for (const l of lines) {
    const p = l.split(/[,;\t]/).map(x => x.trim().replace(/^"|"$/g, ''));
    if (p.length < 3 || /^brand$/i.test(p[0])) continue;
    arr.push({ brand: p[0], generic: p[1], company: p[2], strength: p[3] || '' }); n++;
  }
  saveCustom(arr);
  addStatus(`تم استيراد ${n} سجل.`);
});

$('#exportBtn').addEventListener('click', () => {
  const rows = ['brand,generic,company,strength', ...loadCustom().map(e => [e.brand, e.generic, e.company, e.strength || ''].map(x => `"${String(x).replace(/"/g, '""')}"`).join(','))];
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8' }));
  a.download = 'my-drugs.csv'; a.click();
});

$('#clearBtn').addEventListener('click', () => {
  if (confirm('مسح كل ما أضفته؟ لا يمكن التراجع.')) { saveCustom([]); addStatus('تم المسح.'); }
});

})();
