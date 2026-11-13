/* نظام الترجمة: عربي / English */
let LANG = (() => { try { return localStorage.getItem('pharma_lang') || 'ar'; } catch { return 'ar'; } })();

const STR = {
  ar: {
    page_title: 'النظام الصيدلي', title: '💊 النظام الصيدلي', sub: 'ابحث بالاسم أو الصورة أو المرض',
    lang_btn: 'English',
    disclaimer: '⚠️ معلومات تعليمية مساعدة فقط، وليست تشخيصاً أو وصفة. راجع الطبيب أو الصيدلي قبل استعمال أي دواء.',
    tab_drug: 'بحث دواء', tab_dis: 'بحث بمرض', tab_int: 'فحص التفاعلات', tab_add: 'إضافة / استيراد', tab_about: 'المصادر',
    ph_drug: 'اكتب اسم الدواء (عربي أو إنجليزي)…', search: 'بحث',
    ocr_btn: '📷 تصوير / رفع صورة العلبة', ocr_ar: 'قراءة العربية أيضاً (أبطأ)',
    ocr_label: 'النص المقروء من الصورة (عدّله إن لزم):', ocr_search: 'ابحث بهذا النص',
    ph_dis: 'اكتب المرض أو العَرَض (مثل: ضغط، سكر، حموضة)…',
    add_title: 'إضافة دواء أو شركة (أدوية السوق العراقي)',
    add_hint: 'تحفظ البيانات في متصفحك على هذا الجهاز. إذا كانت المادة الفعالة موجودة في النظام يُضاف الاسم التجاري والشركة تحتها تلقائياً.',
    ph_brand: 'الاسم التجاري *', ph_generic: 'المادة الفعالة (مثل: Paracetamol) *', ph_company: 'الشركة المصنّعة *',
    ph_strength: 'التركيز (مثل: 500 ملغ)', ph_cls: 'الفئة العلاجية (للأدوية الجديدة)', ph_purpose: 'الغرض العلاجي (للأدوية الجديدة)',
    ph_side: 'الأعراض الجانبية (للأدوية الجديدة)', ph_usage: 'طريقة الاستعمال (للأدوية الجديدة)', ph_timing: 'أوقات الاستعمال (للأدوية الجديدة)',
    save: 'حفظ', csv_title: 'استيراد من ملف CSV',
    csv_hint: 'الأعمدة بالترتيب: brand,generic,company,strength (بدون عنوان أو مع عنوان).',
    export: 'تصدير بياناتي', clear: 'مسح بياناتي المضافة',
    about_title: 'مصادر الترتيب والبيانات',
    about1: '<b>الترتيب الرسمي:</b> قائمة الأدوية الأساسية لمنظمة الصحة العالمية (WHO EML)، تصنيف AWaRe للمضادات الحيوية، وإرشادات تخصصية دولية (ADA، ESC/ESH، GINA، ARIA، ACC/AHA…).',
    about2: '<b>البحث العالمي المباشر:</b> openFDA (ملصقات الأدوية في أمريكا) و RxNorm (المكتبة الوطنية الأمريكية للطب) وتتطلب الإنترنت.',
    about3: '<b>القاعدة المحلية:</b> عدد محدود من الأدوية الشائعة بالعربية والإنجليزية، وتتوسع بإضافتك أدوية الشركات العراقية.',
    about4: '<b>الحدود:</b> لا توجد قاعدة واحدة تضم كل أدوية العالم؛ وأسماء الشركات تختلف من بلد إلى آخر، فتحقق من العلبة والنشرة الرسمية.',
    int_title: 'فحص التفاعلات والتحذيرات',
    int_hint: 'أضف كل الأدوية التي يستعملها المريض (يمكن إضافة وارفارين وأسبرين وكحول أيضاً).',
    ph_int: 'اسم دواء…', add: 'إضافة', patient: 'حالة المريض:',
    p_preg: 'حامل', p_lact: 'مرضعة', p_renal: 'مرض كلوي', p_hepatic: 'مرض كبدي',
    /* ديناميكي */
    local_results: n => `النتائج المحلية (${n})`, alts: 'بدائل بنفس الفئة العلاجية',
    live_title: g => `🌍 نتائج عالمية: ${g}`,
    sec_purpose: 'الغرض العلاجي', sec_brands: 'الشركات والأسماء التجارية', th_brand: 'الاسم التجاري', th_company: 'الشركة', th_strength: 'التركيز',
    sec_strengths: 'التراكيز والأشكال', sec_side: 'الأعراض الجانبية', sec_usage: 'طريقة الاستعمال', sec_timing: 'أوقات الاستعمال',
    warn_lbl: 'تحذيرات:', sec_rank: 'موقعه في التوصيات الرسمية',
    rank_item: (c, r, s) => `${c}: الترتيب ${r} <span class="hint">(${s})</span>`,
    sec_safety: 'السلامة في الحالات الخاصة', no_sf: 'لا توجد بيانات سلامة مسجلة لهذا الدواء في النظام. راجع النشرة.',
    lv_avoid: 'تجنب', lv_caution: 'حذر', lv_ok: 'مقبول عموماً',
    sf_preg: '🤰 الحمل', sf_lact: '🍼 الرضاعة', sf_renal: '🫘 الكلى', sf_hepatic: '🟤 الكبد',
    ref_lbl: '📚 المرجع:', date_lbl: d => `🗓 تاريخ إدخال المعلومة في النظام: ${d}`, not_reviewed: 'لم تُراجع من صيدلي أو طبيب بعد.', ref_user: 'إدخال المستخدم',
    no_brands: 'لا توجد شركات مسجلة محلياً. أضفها من تبويب "إضافة" أو راجع النتائج العالمية أدناه.',
    not_found_local: 'لم يوجد في القاعدة المحلية. جارٍ البحث في القواعد العالمية…',
    searching_live: 'جارٍ البحث في openFDA و RxNorm…', no_live: 'لا نتائج عالمية لهذا الاسم. جرّب الاسم العلمي بالإنجليزية.',
    live_fail: 'تعذر الاتصال بالقواعد العالمية (تحقق من الإنترنت). النتائج المحلية تعمل بدون اتصال.',
    did_you_mean: 'هل تقصد؟', filter_ph: 'تصفية بالشركة أو الاسم…', th_active: 'المادة الفعالة / التركيز', th_route: 'الطريق',
    live_brands: n => `الشركات والأسماء التجارية (${n}) — openFDA`,
    fda_note: 'النص الرسمي بالإنجليزية من ملصق إدارة الغذاء والدواء الأمريكية (FDA). قد تختلف المنتجات والشركات في العراق.',
    d_ind: 'دواعي الاستعمال (الملصق الرسمي)', d_dos: 'الجرعة وطريقة الاستعمال', d_adv: 'الأعراض الجانبية', d_warn: 'التحذيرات',
    d_inter: 'التفاعلات الدوائية (الملصق الرسمي)', d_preg: 'الحمل', d_lact: 'الرضاعة', d_spec: 'الاستعمال في فئات خاصة (كلى، كبد، كبار السن)',
    ocr_loading: 'جارٍ تحميل محرك القراءة…', ocr_done: 'تمت القراءة. عدّل النص أو اضغط على كلمة لتبحث بها.',
    ocr_none: 'لم يُقرأ نص. جرّب صورة أوضح للاسم.', ocr_fail: 'تعذر تشغيل القراءة (يلزم اتصال بالإنترنت لتحميل المحرك). اكتب الاسم يدوياً.',
    dis_nf: 'لم يوجد هذا المرض في القاعدة. جرّب كلمة أخرى أو اختر من القائمة.',
    dis_ref: s => `المرجع: ${s}`, dis_ex: b => `أمثلة تجارية: ${b}`, dis_details: 'تفاصيل الدواء والشركات',
    cond_date: d => `🗓 تاريخ إدخال التوصية في النظام: ${d} · تُراجع مع أحدث إصدار من الإرشادات المذكورة.`,
    saved: 'تم الحفظ ✔ ابحث عن الدواء لترى الإضافة.', imported: n => `تم استيراد ${n} سجل.`, cleared: 'تم المسح.',
    confirm_clear: 'مسح كل ما أضفته؟ لا يمكن التراجع.',
    int_notfound: 'لم يُعثر على هذا الاسم في قاعدة النظام. جرّب الاسم العلمي أو أضفه من تبويب الإضافة.', int_dup: 'مضاف مسبقاً.',
    int_title2: 'التفاعلات بين الأدوية', int_add_second: 'أضف دواءً ثانياً لفحص التفاعل بينهما.',
    ix_none: 'لم يظهر تفاعل في قاعدة النظام المحدودة. هذا لا يعني أن الجمع آمن؛ راجع الصيدلي.',
    ix_rec: a => `التوصية: ${a}`, lv_high: 'خطير: تجنب', lv_mod: 'متوسط: حذر', lv_low: 'خفيف: مراقبة',
    int_profile_title: 'تحذيرات حسب حالة المريض', int_nosf: 'لا توجد بيانات سلامة مسجلة. راجع النشرة.',
    int_extras: 'العناصر الإضافية (وارفارين، أسبرين، كحول) تُفحص للتفاعلات فقط، ولا توجد لها بيانات سلامة خاصة هنا.',
    p_preg2: '🤰 الحمل', p_lact2: '🍼 الرضاعة', p_renal2: '🫘 مرض الكلى', p_hepatic2: '🟤 مرض الكبد',
    int_ref: d => `📚 المرجع: ملصقات FDA الرسمية، WHO EML، LactMed — تاريخ إدخال البيانات: ${d} · لم تُراجع من صيدلي بعد.`
  },
  en: {
    page_title: 'Pharmacy System', title: '💊 Pharmacy System', sub: 'Search by name, photo or condition',
    lang_btn: 'العربية',
    disclaimer: '⚠️ Educational information only — not a diagnosis or prescription. Consult a doctor or pharmacist before using any medicine.',
    tab_drug: 'Drug search', tab_dis: 'By condition', tab_int: 'Interactions', tab_add: 'Add / Import', tab_about: 'Sources',
    ph_drug: 'Type a drug name (Arabic or English)…', search: 'Search',
    ocr_btn: '📷 Take / upload a photo of the box', ocr_ar: 'Also read Arabic (slower)',
    ocr_label: 'Text read from the image (edit if needed):', ocr_search: 'Search with this text',
    ph_dis: 'Type a condition or symptom (e.g. blood pressure, diabetes, reflux)…',
    add_title: 'Add a drug or company (local market drugs)',
    add_hint: 'Saved in this browser on this device. If the active ingredient already exists, the brand and company are added under it automatically.',
    ph_brand: 'Brand name *', ph_generic: 'Active ingredient (e.g. Paracetamol) *', ph_company: 'Manufacturer *',
    ph_strength: 'Strength (e.g. 500 mg)', ph_cls: 'Therapeutic class (for new drugs)', ph_purpose: 'Purpose (for new drugs)',
    ph_side: 'Side effects (for new drugs)', ph_usage: 'How to use (for new drugs)', ph_timing: 'When to take (for new drugs)',
    save: 'Save', csv_title: 'Import from CSV file',
    csv_hint: 'Columns in order: brand,generic,company,strength (with or without a header row).',
    export: 'Export my data', clear: 'Clear my added data',
    about_title: 'Sources of ranking and data',
    about1: '<b>Official ranking:</b> WHO Essential Medicines List (EML), the AWaRe antibiotic classification, and specialty guidelines (ADA, ESC/ESH, GINA, ARIA, ACC/AHA…).',
    about2: '<b>Live global search:</b> openFDA (US drug labels) and RxNorm (US National Library of Medicine); requires internet.',
    about3: '<b>Local database:</b> a limited set of common drugs in Arabic and English, expandable by adding local-market drugs.',
    about4: '<b>Limits:</b> no single database holds every drug in the world, and company names differ by country, so check the box and the official leaflet.',
    int_title: 'Interaction and warning check',
    int_hint: "Add every medicine the patient takes (you can also add warfarin, aspirin and alcohol).",
    ph_int: 'Drug name…', add: 'Add', patient: 'Patient status:',
    p_preg: 'Pregnant', p_lact: 'Breastfeeding', p_renal: 'Kidney disease', p_hepatic: 'Liver disease',
    local_results: n => `Local results (${n})`, alts: 'Alternatives in the same therapeutic class',
    live_title: g => `🌍 Global results: ${g}`,
    sec_purpose: 'Therapeutic purpose', sec_brands: 'Companies and brand names', th_brand: 'Brand', th_company: 'Company', th_strength: 'Strength',
    sec_strengths: 'Strengths and forms', sec_side: 'Side effects', sec_usage: 'How to use', sec_timing: 'When to take',
    warn_lbl: 'Warnings:', sec_rank: 'Position in official recommendations',
    rank_item: (c, r, s) => `${c}: rank ${r} <span class="hint">(${s})</span>`,
    sec_safety: 'Safety in special situations', no_sf: 'No safety data is recorded for this drug in the system. Check the leaflet.',
    lv_avoid: 'Avoid', lv_caution: 'Caution', lv_ok: 'Generally acceptable',
    sf_preg: '🤰 Pregnancy', sf_lact: '🍼 Breastfeeding', sf_renal: '🫘 Kidney', sf_hepatic: '🟤 Liver',
    ref_lbl: '📚 Reference:', date_lbl: d => `🗓 Date entered in the system: ${d}`, not_reviewed: 'Not yet reviewed by a pharmacist or doctor.', ref_user: 'User entry',
    no_brands: 'No companies recorded locally. Add them from the "Add" tab or see the global results below.',
    not_found_local: 'Not found in the local database. Searching global databases…',
    searching_live: 'Searching openFDA and RxNorm…', no_live: 'No global results for this name. Try the English generic name.',
    live_fail: 'Could not reach the global databases (check your internet). Local results work offline.',
    did_you_mean: 'Did you mean?', filter_ph: 'Filter by company or name…', th_active: 'Active ingredient / strength', th_route: 'Route',
    live_brands: n => `Companies and brand names (${n}) — openFDA`,
    fda_note: 'Official text in English from the US Food and Drug Administration (FDA) label. Products and companies in your country may differ.',
    d_ind: 'Indications (official label)', d_dos: 'Dosage and administration', d_adv: 'Adverse reactions', d_warn: 'Warnings',
    d_inter: 'Drug interactions (official label)', d_preg: 'Pregnancy', d_lact: 'Breastfeeding', d_spec: 'Use in specific populations (kidney, liver, elderly)',
    ocr_loading: 'Loading the reading engine…', ocr_done: 'Done. Edit the text or tap a word to search with it.',
    ocr_none: 'No text was read. Try a clearer photo of the name.', ocr_fail: 'Could not run text reading (internet is needed to load the engine). Type the name manually.',
    dis_nf: 'This condition is not in the database. Try another word or pick from the list.',
    dis_ref: s => `Reference: ${s}`, dis_ex: b => `Brand examples: ${b}`, dis_details: 'Drug details and companies',
    cond_date: d => `🗓 Date this recommendation was entered: ${d} · check against the latest edition of the guidelines cited.`,
    saved: 'Saved ✔ Search for the drug to see it.', imported: n => `Imported ${n} records.`, cleared: 'Cleared.',
    confirm_clear: 'Clear everything you added? This cannot be undone.',
    int_notfound: 'This name was not found in the system. Try the generic name or add it from the Add tab.', int_dup: 'Already added.',
    int_title2: 'Drug–drug interactions', int_add_second: 'Add a second drug to check the interaction between them.',
    ix_none: 'No interaction appeared in the system’s limited database. This does not mean the combination is safe; ask a pharmacist.',
    ix_rec: a => `Recommendation: ${a}`, lv_high: 'Serious: avoid', lv_mod: 'Moderate: caution', lv_low: 'Minor: monitor',
    int_profile_title: 'Warnings by patient status', int_nosf: 'No safety data recorded. Check the leaflet.',
    int_extras: 'Extra items (warfarin, aspirin, alcohol) are checked for interactions only; no special safety data is held for them here.',
    p_preg2: '🤰 Pregnancy', p_lact2: '🍼 Breastfeeding', p_renal2: '🫘 Kidney disease', p_hepatic2: '🟤 Liver disease',
    int_ref: d => `📚 Reference: official FDA labels, WHO EML, LactMed — data entered: ${d} · not yet reviewed by a pharmacist.`
  }
};

function t(k, ...a) {
  const v = (STR[LANG] && STR[LANG][k] !== undefined) ? STR[LANG][k] : (STR.ar[k] !== undefined ? STR.ar[k] : k);
  return typeof v === 'function' ? v(...a) : v;
}

function applyStatic() {
  const h = document.documentElement;
  h.lang = LANG; h.dir = LANG === 'en' ? 'ltr' : 'rtl';
  document.title = t('page_title');
  document.querySelectorAll('[data-i]').forEach(el => { el.textContent = t(el.dataset.i); });
  document.querySelectorAll('[data-ih]').forEach(el => { el.innerHTML = t(el.dataset.ih); });
  document.querySelectorAll('[data-ph]').forEach(el => { el.placeholder = t(el.dataset.ph); });
}

function setLang(l) {
  LANG = l;
  try { localStorage.setItem('pharma_lang', l); } catch { }
  applyStatic();
  document.dispatchEvent(new Event('langchange'));
}
