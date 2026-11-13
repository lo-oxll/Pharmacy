/* English translations of the local data (drugs, conditions, safety, interactions, references). */
const EN = {};

EN.drugs = {
  paracetamol: {
    cls: 'Analgesic and antipyretic', purpose: 'Lowers fever and relieves mild to moderate pain',
    strengths: ['500 mg', '1 g', 'Syrup 120 mg/5 mL', 'Suppositories'],
    side: ['Rare at correct doses', 'Skin rash (rare)', 'Overdose causes serious liver damage'],
    usage: 'Oral or rectal. Adults usually 500–1000 mg every 4–6 hours.',
    timing: 'With or without food. Do not exceed 4 g daily (preferably 3 g for people with liver disease or who drink alcohol). Watch for duplicate paracetamol in combined cold remedies.',
    warn: 'Liver disease, alcohol dependence.'
  },
  ibuprofen: {
    cls: 'Non-steroidal anti-inflammatory drug (NSAID)', purpose: 'Pain relief, fever reduction, anti-inflammatory',
    strengths: ['200 mg', '400 mg', '600 mg', 'Syrup 100 mg/5 mL'],
    side: ['Stomach pain or heartburn', 'Nausea', 'Stomach ulcer and bleeding (with long use)', 'Raised blood pressure', 'Kidney effects'],
    usage: 'Oral. Adults 200–400 mg every 6–8 hours.',
    timing: 'After food or with milk. Shortest duration possible. The over-the-counter maximum is 1200 mg daily.',
    warn: 'Ulcer, kidney disease, pregnancy (especially the last trimester), aspirin-sensitive asthma, combination with blood thinners.'
  },
  diclofenac: {
    cls: 'Non-steroidal anti-inflammatory drug (NSAID)', purpose: 'Joint and muscle pain and inflammation',
    strengths: ['50 mg', '75 mg', 'Topical gel 1%', 'Injection'],
    side: ['Stomach upset', 'Dizziness', 'Raised liver enzymes', 'Higher risk of heart problems and clots with long-term use'],
    usage: 'Oral, topical (gel) or intramuscular injection.',
    timing: 'After food, 50 mg up to 3 times daily as directed by the doctor.',
    warn: 'Heart disease, ulcer, kidney disease, pregnancy.'
  },
  amoxicillin: {
    cls: 'Antibiotic (penicillin)', purpose: 'Bacterial infections: respiratory tract, ear, sinuses, urinary tract',
    strengths: ['250 mg', '500 mg', 'Suspension 125/250 mg per 5 mL'],
    side: ['Diarrhea', 'Nausea', 'Skin rash', 'Penicillin allergy (can be serious)'],
    usage: 'Oral. Adults usually 500 mg every 8 hours depending on the condition.',
    timing: 'With or without food, at regular intervals; complete the full course as directed.',
    warn: 'Penicillin allergy. Not useful for viral flu or colds.'
  },
  'amox-clav': {
    cls: 'Antibiotic (penicillin)', purpose: 'Harder bacterial infections, or those resistant to amoxicillin alone',
    strengths: ['375 mg', '625 mg', '1 g'],
    side: ['Diarrhea', 'Nausea', 'Yeast infections (thrush)', 'Raised liver enzymes / jaundice (rare)'],
    usage: 'Oral. Usually 625 mg every 8 hours or 1 g every 12 hours.',
    timing: 'At the start of a meal to reduce stomach upset.',
    warn: 'Penicillin allergy, previous jaundice caused by the drug.'
  },
  azithromycin: {
    cls: 'Antibiotic (macrolide)', purpose: 'Respiratory and certain other bacterial infections',
    strengths: ['250 mg', '500 mg', 'Suspension'],
    side: ['Diarrhea', 'Nausea', 'Abdominal pain', 'Heart rhythm disturbance (QT), rare'],
    usage: 'Oral. Common: 500 mg on day 1 then 250 mg for 4 days, or 500 mg for 3 days.',
    timing: 'Once daily; capsules preferably 1 hour before or 2 hours after food.',
    warn: 'Heart rhythm problems, liver disease.'
  },
  'penicillin-v': {
    cls: 'Antibiotic (penicillin)', purpose: 'Streptococcal sore throat / tonsillitis',
    strengths: ['250 mg', '500 mg'],
    side: ['Nausea', 'Diarrhea', 'Skin rash', 'Penicillin allergy'],
    usage: 'Oral as directed, usually every 6–12 hours for 10 days in strep throat.',
    timing: 'On an empty stomach (1 hour before or 2 hours after food) if possible.',
    warn: 'Penicillin allergy.'
  },
  nitrofurantoin: {
    cls: 'Urinary tract antibiotic', purpose: 'Uncomplicated bladder and urinary tract infection',
    strengths: ['50 mg', '100 mg (modified release)'],
    side: ['Nausea', 'Headache', 'Brown urine discoloration', 'Rare lung and nerve effects with long use'],
    usage: 'Oral, usually for 5 days for a simple infection, as directed.',
    timing: 'With food to improve absorption and reduce nausea.',
    warn: 'Severe kidney impairment, G6PD deficiency, late pregnancy, infants under 1 month.'
  },
  metformin: {
    cls: 'Blood-glucose-lowering drug (biguanide)', purpose: 'Type 2 diabetes',
    strengths: ['500 mg', '850 mg', '1000 mg', 'Extended release (XR)'],
    side: ['Diarrhea', 'Nausea', 'Metallic taste', 'Vitamin B12 deficiency with long use', 'Lactic acidosis (very rare)'],
    usage: 'Oral. Start low and increase gradually to a usual maximum of 2000–2550 mg daily.',
    timing: 'With or after meals to reduce stomach symptoms.',
    warn: 'Severe kidney impairment, contrast imaging, severe dehydration, alcohol dependence.'
  },
  gliclazide: {
    cls: 'Blood-glucose-lowering drug (sulfonylurea)', purpose: 'Type 2 diabetes',
    strengths: ['30 mg MR', '60 mg MR', '80 mg'],
    side: ['Low blood sugar', 'Weight gain', 'Nausea'],
    usage: 'Oral. The dose is set by the blood sugar level.',
    timing: 'With breakfast (or the main meal); do not take it when skipping meals.',
    warn: 'Recurrent low blood sugar, kidney or liver impairment, elderly.'
  },
  amlodipine: {
    cls: 'Antihypertensive (calcium channel blocker)', purpose: 'High blood pressure and angina',
    strengths: ['5 mg', '10 mg'],
    side: ['Ankle swelling', 'Headache', 'Flushing', 'Dizziness', 'Palpitations'],
    usage: 'Oral once daily: 5 mg, may be raised to 10 mg.',
    timing: 'Same time daily, with or without food.',
    warn: 'Severe low blood pressure, severe aortic stenosis.'
  },
  losartan: {
    cls: 'Antihypertensive (angiotensin receptor blocker, ARB)', purpose: 'High blood pressure, kidney protection in diabetes, heart failure',
    strengths: ['25 mg', '50 mg', '100 mg'],
    side: ['Dizziness', 'High potassium', 'Effect on kidney function', 'Tiredness'],
    usage: 'Oral once daily: usually 50 mg (25–100).',
    timing: 'Same time daily, with or without food.',
    warn: 'Contraindicated in pregnancy. Caution in kidney impairment and renal artery stenosis.'
  },
  enalapril: {
    cls: 'Antihypertensive (ACE inhibitor)', purpose: 'High blood pressure and heart failure',
    strengths: ['5 mg', '10 mg', '20 mg'],
    side: ['Dry cough', 'Dizziness', 'High potassium', 'Angioedema (rare but serious)'],
    usage: 'Oral once or twice daily as directed.',
    timing: 'Same time daily; the first dose is best taken at bedtime.',
    warn: 'Contraindicated in pregnancy. History of angioedema.'
  },
  hctz: {
    cls: 'Antihypertensive (thiazide diuretic)', purpose: 'High blood pressure and some types of edema',
    strengths: ['12.5 mg', '25 mg'],
    side: ['Low potassium and sodium', 'High uric acid', 'Sun sensitivity', 'Frequent urination'],
    usage: 'Oral once daily: 12.5–25 mg.',
    timing: 'In the morning to avoid night-time urination.',
    warn: 'Gout, severe kidney impairment, electrolyte imbalance.'
  },
  atorvastatin: {
    cls: 'Lipid-lowering drug (statin)', purpose: 'Lowers cholesterol and prevents heart disease and strokes',
    strengths: ['10 mg', '20 mg', '40 mg', '80 mg'],
    side: ['Muscle pain', 'Raised liver enzymes', 'Stomach upset', 'Muscle breakdown (rare)'],
    usage: 'Oral once daily: 10–80 mg depending on risk.',
    timing: 'Any time of day (same time daily), with or without food.',
    warn: 'Pregnancy and breastfeeding, active liver disease. Interacts with some drugs (clarithromycin, etc.).'
  },
  omeprazole: {
    cls: 'Proton pump inhibitor (PPI)', purpose: 'Heartburn, acid reflux and stomach ulcer',
    strengths: ['20 mg', '40 mg'],
    side: ['Headache', 'Diarrhea', 'Abdominal pain', 'Low magnesium and B12 and higher fracture risk with long-term use'],
    usage: 'Oral once daily, usually 4–8 weeks, then reassess the need.',
    timing: '30 minutes before breakfast on an empty stomach.',
    warn: 'Long-term use without medical supervision.'
  },
  famotidine: {
    cls: 'H2 receptor antagonist', purpose: 'Heartburn and stomach ulcer',
    strengths: ['20 mg', '40 mg'],
    side: ['Headache', 'Constipation or diarrhea', 'Dizziness'],
    usage: 'Oral: 20 mg twice daily or 40 mg at night.',
    timing: '30–60 minutes before a meal or at bedtime.',
    warn: 'Kidney impairment (the dose is adjusted).'
  },
  loratadine: {
    cls: 'Antihistamine (usually non-sedating)', purpose: 'Nasal and skin allergy (allergic rhinitis, hives)',
    strengths: ['10 mg', 'Syrup 5 mg/5 mL'],
    side: ['Headache', 'Dry mouth', 'Mild drowsiness (rare)'],
    usage: 'Oral 10 mg once daily for adults.',
    timing: 'Once daily at any time, with or without food.',
    warn: 'Severe liver or kidney impairment (the dose is adjusted).'
  },
  cetirizine: {
    cls: 'Antihistamine', purpose: 'Nasal and skin allergy',
    strengths: ['10 mg', 'Syrup 5 mg/5 mL'],
    side: ['Drowsiness', 'Dry mouth', 'Headache', 'Tiredness'],
    usage: 'Oral 10 mg once daily for adults.',
    timing: 'Preferably at night because of drowsiness. Avoid driving if drowsy.',
    warn: 'Kidney impairment (the dose is adjusted); alcohol increases drowsiness.'
  },
  'nasal-steroid': {
    cls: 'Topical nasal corticosteroid', purpose: 'Allergic rhinitis (congestion, sneezing, runny nose)',
    strengths: ['Mometasone 50 mcg/spray', 'Beclometasone 50 mcg/spray'],
    side: ['Nasal dryness or irritation', 'Mild nosebleed', 'Headache'],
    usage: 'Spray into each nostril once or twice daily per the leaflet.',
    timing: 'Use regularly every day; the full effect takes several days.',
    warn: 'Recent nasal surgery or injury.'
  },
  salbutamol: {
    cls: 'Fast-acting bronchodilator', purpose: 'Asthma attacks and bronchial shortness of breath (rescue treatment)',
    strengths: ['Inhaler 100 mcg/puff', 'Tablets 2/4 mg', 'Syrup', 'Nebulizer solution'],
    side: ['Tremor', 'Palpitations and fast heartbeat', 'Headache', 'Low potassium (high doses)'],
    usage: 'Inhaler: 1–2 puffs as needed (usually every 4–6 hours).',
    timing: 'Only when symptoms occur. Needing it more than twice a week means asthma is not controlled → see the doctor.',
    warn: 'Heart disease, overactive thyroid.'
  },
  'inhaled-steroid': {
    cls: 'Inhaled corticosteroid for asthma control', purpose: 'Long-term asthma control',
    strengths: ['Budesonide 100/200/400 mcg', 'Beclometasone 100/250 mcg'],
    side: ['Oral thrush (fungal infection)', 'Hoarse voice', 'Cough'],
    usage: 'Inhaled once or twice daily as directed.',
    timing: 'Regularly, not only when needed; rinse the mouth after each use.',
    warn: 'The dose must be set under medical supervision.'
  },
  levothyroxine: {
    cls: 'Thyroid hormone', purpose: 'Underactive thyroid (hypothyroidism)',
    strengths: ['25 mcg', '50 mcg', '75 mcg', '100 mcg', '125 mcg', '150 mcg'],
    side: ['Too high a dose causes palpitations, tremor, insomnia and weight loss'],
    usage: 'Oral once daily; the dose is individual and adjusted by TSH tests.',
    timing: 'In the morning on an empty stomach, 30–60 minutes before breakfast; separate from calcium and iron by 4 hours.',
    warn: "Heart disease (start low). Do not stop except on the doctor's advice."
  },
  sumatriptan: {
    cls: 'Acute migraine treatment (triptan)', purpose: 'Moderate to severe migraine attack',
    strengths: ['50 mg', '100 mg', 'Injection', 'Nasal spray'],
    side: ['Chest or throat tightness', 'Tingling', 'Dizziness', 'Drowsiness'],
    usage: 'One tablet at the start of the attack; may repeat after 2 hours if needed. Maximum 300 mg per 24 hours.',
    timing: 'At the start of the headache, not for prevention.',
    warn: 'Contraindicated in heart and artery disease, uncontrolled hypertension, stroke.'
  },
  ors: {
    cls: 'Fluid and salt replacement', purpose: 'Replaces fluid loss in diarrhea and vomiting',
    strengths: ['Sachets dissolved in water as per the leaflet'],
    side: ['Temporary vomiting if drunk too fast'],
    usage: 'Dissolve the sachet in the stated amount of boiled, cooled water and drink in small frequent sips.',
    timing: 'After each loose stool. For children WHO adds zinc 10–20 mg daily for 10–14 days. See a doctor for severe dehydration or blood in the stool.',
    warn: 'Severe dehydration or persistent vomiting needs medical care.'
  }
};

EN.conds = {
  'fever-pain': { name: 'Fever / mild to moderate pain', notes: ['First choice and the safest', 'Alternative or add-on when there is inflammation; take with food'] },
  'joint-muscle': { name: 'Joint and muscle pain / inflammation', notes: ['Lowest effective dose for the shortest time', 'Topical gel is preferred for a single joint', 'If anti-inflammatories are not tolerated'] },
  hypertension: {
    name: 'High blood pressure',
    notes: ['First line; suits many patients', 'First line; useful with diabetes and kidney disease', 'First line; if cough appears switch to an ARB', 'First line; often part of a combination'],
    note: "All four classes are first line; the order here is for display only. The choice depends on the patient's other conditions."
  },
  diabetes2: {
    name: 'Type 2 diabetes',
    notes: ['First line unless contraindicated', 'Add-on or alternative; watch for low blood sugar'],
    note: 'With heart or kidney disease, guidelines add SGLT2 inhibitors (e.g. empagliflozin) or GLP-1 drugs, which need medical assessment.'
  },
  'strep-throat': {
    name: 'Bacterial tonsillitis / pharyngitis',
    notes: ['First choice for streptococci', 'Common alternative'],
    note: 'Most sore throats are viral and do not need an antibiotic; the doctor confirms by examination or swab.'
  },
  'respiratory-bacterial': {
    name: 'Bacterial sinusitis or respiratory infection',
    notes: ['First choice', 'If it fails or resistance is suspected', 'If penicillin-allergic or for specific patterns'],
    note: "Antibiotics only for confirmed bacterial infection and on the doctor's prescription."
  },
  uti: {
    name: 'Uncomplicated urinary tract infection',
    notes: ['First choice for a simple infection'],
    note: 'Options vary by local resistance and culture results; other drugs may be prescribed.'
  },
  'allergic-rhinitis': { name: 'Allergic rhinitis', notes: ['Most effective for moderate to severe symptoms', 'Low-drowsiness antihistamine', 'Antihistamine; may cause drowsiness'] },
  gerd: { name: 'Heartburn and acid reflux', notes: ['Most effective; fixed duration then reassess', 'For mild or on-demand symptoms'] },
  asthma: {
    name: 'Asthma',
    notes: ['Main controller treatment', 'Rescue use when needed'],
    note: "Recent GINA guidance often prefers a combined inhaler (corticosteroid + formoterol) as the reliever; this is the doctor's decision."
  },
  hypothyroid: { name: 'Underactive thyroid (hypothyroidism)', notes: ['Standard treatment'] },
  cholesterol: { name: 'High cholesterol', notes: ['Statin is first line'] },
  migraine: { name: 'Migraine (acute attack)', notes: ['For mild to moderate attacks', 'Alternative if NSAIDs are not tolerated', 'For moderate to severe attacks'] },
  diarrhea: { name: 'Acute diarrhea', notes: ['Basis of treatment: fluid replacement (with zinc for children)'] }
};

EN.safety = {
  paracetamol: {
    preg: 'Considered one of the preferred options for fever and pain in pregnancy, at the lowest dose for the shortest time.',
    lact: 'Generally considered compatible with breastfeeding.',
    renal: 'In severe kidney impairment doses are spaced out; ask the doctor.',
    hepatic: 'Great caution: do not exceed 2–3 g daily; avoid in severe liver failure or with alcohol.'
  },
  ibuprofen: {
    preg: 'Avoid after week 20 (can harm the baby’s kidneys and reduce amniotic fluid) and contraindicated in the last trimester; before that, only on the doctor’s decision.',
    lact: 'One of the preferred anti-inflammatories while breastfeeding because little passes into milk.',
    renal: 'Avoid in moderate to severe kidney impairment; raises the risk of kidney injury with dehydration.',
    hepatic: 'Caution in advanced liver disease (bleeding and fluid retention risk).'
  },
  diclofenac: {
    preg: 'Avoid after week 20 and contraindicated in the last trimester; before that, only on the doctor’s decision.',
    lact: 'A small amount passes into milk; keep use short and ask the doctor.',
    renal: 'Avoid in moderate to severe kidney impairment.',
    hepatic: 'Avoid in severe liver disease; liver enzymes need monitoring.'
  },
  amoxicillin: {
    preg: 'Usually used when needed; among the longest-established safe options.',
    lact: 'Usually compatible; may cause diarrhea or rash in the baby.',
    renal: 'Dose is adjusted in kidney impairment (especially clearance below 30 mL/min).',
    hepatic: 'Caution and monitor liver function.'
  },
  'amox-clav': {
    preg: 'Usually used when needed, on the doctor’s decision.',
    lact: 'Usually compatible; watch the baby for diarrhea or rash.',
    renal: 'Dose is adjusted, and high strengths (875 / 1000 mg) are avoided when clearance is below 30 mL/min.',
    hepatic: 'Great caution; avoid with a history of jaundice or liver injury from the drug.'
  },
  azithromycin: {
    preg: 'Limited data, but sometimes used when needed on the doctor’s decision.',
    lact: 'Passes into milk; watch the baby (diarrhea, rash), especially in the first weeks.',
    renal: 'Caution in severe kidney impairment.',
    hepatic: 'Avoid in severe liver disease.'
  },
  'penicillin-v': {
    preg: 'Usually used when needed.',
    lact: 'Usually compatible.',
    renal: 'Dose is adjusted in severe kidney impairment.',
    hepatic: 'No significant adjustment usually.'
  },
  nitrofurantoin: {
    preg: 'Avoid near term (weeks 38–42) and during labor; otherwise on the doctor’s decision.',
    lact: 'Avoid for a baby under 1 month or with G6PD deficiency.',
    renal: 'Avoid in kidney impairment (clearance below 30 mL/min): less effective and more toxic.',
    hepatic: 'Rarely causes hepatitis; avoid with existing liver injury.'
  },
  metformin: {
    preg: 'Insulin is usually the standard choice in pregnancy for type 2 and gestational diabetes; metformin may be used on the doctor’s decision.',
    lact: 'Passes into milk in small amounts; generally considered compatible.',
    renal: 'Contraindicated at eGFR below 30 and not started at 30–45; kidney monitoring needed.',
    hepatic: 'Avoid in severe liver disease (lactic acidosis risk).'
  },
  gliclazide: {
    preg: 'Not recommended in pregnancy; usually replaced by insulin.',
    lact: 'Avoid because of the risk of low blood sugar in the baby.',
    renal: 'Great caution; the dose may need adjusting, and avoid in severe impairment.',
    hepatic: 'Avoid in severe liver disease.'
  },
  amlodipine: {
    preg: 'Limited data; other drugs (labetalol, methyldopa, nifedipine) are often preferred, on the doctor’s decision.',
    lact: 'Limited data; sometimes used on the doctor’s decision.',
    renal: 'Usually no dose adjustment.',
    hepatic: 'Start with a lower dose (2.5 mg) and monitor.'
  },
  losartan: {
    preg: 'Contraindicated: boxed warning for fetal toxicity (especially 2nd and 3rd trimesters). Stop when pregnancy is discovered.',
    lact: 'Limited data; better-studied alternatives are preferred.',
    renal: 'Monitor potassium and creatinine; avoid with bilateral renal artery stenosis.',
    hepatic: 'Lower starting dose (25 mg).'
  },
  enalapril: {
    preg: 'Contraindicated: boxed warning for fetal toxicity. Stop when pregnancy is discovered.',
    lact: 'One of the best-studied ACE inhibitors during breastfeeding, but the decision is the doctor’s.',
    renal: 'Dose is adjusted; monitor potassium and creatinine.',
    hepatic: 'Caution; rarely causes liver injury.'
  },
  hctz: {
    preg: 'Not a first choice in pregnancy; starting it is usually avoided.',
    lact: 'May reduce milk supply.',
    renal: 'Less effective in severe kidney impairment (eGFR below 30).',
    hepatic: 'Electrolyte disturbance may precipitate hepatic coma; great caution.'
  },
  atorvastatin: {
    preg: 'Usually stopped during pregnancy; the exact decision is the doctor’s (FDA relaxed the absolute contraindication in 2021).',
    lact: 'Not recommended while breastfeeding.',
    renal: 'Usually no dose adjustment.',
    hepatic: 'Contraindicated in active liver disease or unexplained raised enzymes.'
  },
  omeprazole: {
    preg: 'Usually used when needed.',
    lact: 'Usually compatible.',
    renal: 'No significant adjustment.',
    hepatic: 'In severe liver impairment the maximum is reduced (often 20 mg).'
  },
  famotidine: {
    preg: 'Usually used when needed.',
    lact: 'Passes into milk in small amounts; usually compatible.',
    renal: 'Dose is reduced or spaced out in kidney impairment (clearance below 60 mL/min).',
    hepatic: 'No significant adjustment usually.'
  },
  loratadine: {
    preg: 'Generally acceptable when needed.',
    lact: 'Usually compatible.',
    renal: 'With clearance below 30 mL/min the dose is spaced out (e.g. every other day).',
    hepatic: 'In severe liver impairment the dose is spaced out.'
  },
  cetirizine: {
    preg: 'Generally acceptable when needed.',
    lact: 'May cause drowsiness or irritability in the baby; occasional use is preferable.',
    renal: 'With clearance below 30 mL/min the dose is reduced to 5 mg.',
    hepatic: 'Reduced to 5 mg in liver impairment.'
  },
  'nasal-steroid': {
    preg: 'Generally acceptable when needed.',
    lact: 'Little systemic absorption; generally acceptable.',
    renal: 'No significant adjustment.',
    hepatic: 'No significant adjustment usually.'
  },
  salbutamol: {
    preg: 'Used when needed; uncontrolled asthma is more dangerous than the drug.',
    lact: 'Usually compatible.',
    renal: 'Caution; potassium may drop.',
    hepatic: 'No significant adjustment usually.'
  },
  'inhaled-steroid': {
    preg: 'Usually continued to control asthma, under the doctor’s supervision.',
    lact: 'Usually compatible.',
    renal: 'No significant adjustment.',
    hepatic: 'Exposure may rise in severe liver impairment.'
  },
  levothyroxine: {
    preg: 'Treatment continues and often needs a higher dose with TSH follow-up.',
    lact: 'Compatible.',
    renal: 'No significant adjustment.',
    hepatic: 'No significant adjustment usually.'
  },
  sumatriptan: {
    preg: 'Limited data; the doctor decides.',
    lact: 'Passes into milk; the leaflet advises delaying breastfeeding for about 12 hours after a dose.',
    renal: 'Caution in severe impairment.',
    hepatic: 'Contraindicated in severe liver impairment; the maximum is 50 mg in mild to moderate.'
  },
  ors: {
    preg: 'Generally safe.',
    lact: 'Safe.',
    renal: 'Caution in severe kidney failure because of the salts.',
    hepatic: 'Generally safe.'
  }
};

/* Same order as INTERACTIONS in safety.js */
EN.ix = [
  { t: 'Duplicate anti-inflammatories', d: 'Raises the risk of stomach ulcer, bleeding and kidney injury with no added benefit.', adv: 'Do not combine them.' },
  { t: 'ACE inhibitor with ARB', d: 'Risk of high potassium, kidney injury and low blood pressure.', adv: 'Combining is not usually advised except on a specialist’s decision.' },
  { t: 'Anti-inflammatory with blood thinner', d: 'Raises the risk of bleeding (especially the stomach).', adv: 'Avoid; paracetamol is preferred after asking the doctor.' },
  { t: 'Blood thinner with aspirin', d: 'Large increase in bleeding risk.', adv: 'Only if the doctor prescribed it for a clear reason, with monitoring.' },
  { t: 'Anti-inflammatory with antihypertensive/diuretic', d: 'Reduces the blood-pressure-lowering effect and raises the risk of kidney injury, especially with dehydration and in older people.', adv: 'Shortest time possible, drink fluids, and monitor kidneys and blood pressure.' },
  { t: 'Anti-inflammatory with aspirin', d: 'May reduce aspirin’s heart-protective effect and raises stomach bleeding risk.', adv: 'Ask the doctor or pharmacist about timing and alternatives.' },
  { t: 'Paracetamol with warfarin', d: 'Regular use at high doses for several days may raise INR.', adv: 'Monitor INR with repeated use.' },
  { t: 'Antibiotic with warfarin', d: 'INR and bleeding risk may rise.', adv: 'Monitor INR during treatment.' },
  { t: 'Levothyroxine with warfarin', d: 'Changing thyroid dose may increase the blood thinner’s effect.', adv: 'Monitor INR when starting or changing the dose.' },
  { t: 'Levothyroxine with acid-reducing drugs', d: 'Levothyroxine absorption may be reduced.', adv: 'Monitor TSH; the dose may need adjusting.' },
  { t: 'Duplicate antihistamines', d: 'No added benefit and more side effects.', adv: 'Use only one.' },
  { t: 'Salbutamol with a thiazide diuretic', d: 'Potassium may fall further.', adv: 'Monitor potassium, especially with high salbutamol doses.' },
  { t: 'Metformin with alcohol', d: 'Heavy drinking raises the risk of lactic acidosis and low blood sugar.', adv: 'Avoid excess alcohol.' },
  { t: 'Gliclazide with alcohol', d: 'Raises the risk of low blood sugar.', adv: 'Avoid, or take with great care and with food.' },
  { t: 'Paracetamol with alcohol', d: 'Raises the risk of liver injury.', adv: 'Use lower doses with care; avoid with chronic drinking.' },
  { t: 'Anti-inflammatory with alcohol', d: 'Raises the risk of stomach bleeding and ulcer.', adv: 'Avoid combining.' },
  { t: 'Cetirizine with alcohol', d: 'Increases drowsiness and poor concentration.', adv: 'Do not drive or drink.' },
  { t: 'Antihypertensive with diuretic', d: 'A common intended combination, but blood pressure may drop or electrolytes shift, especially with dehydration.', adv: 'Monitor potassium, sodium and kidneys.' },
  { t: 'Combining blood-pressure drugs', d: 'A common combination; dizziness or low blood pressure may appear.', adv: 'Check blood pressure regularly and stand up slowly.' },
  { t: 'Metformin with gliclazide', d: 'A common combination; the risk of low blood sugar is higher because of the sulfonylurea.', adv: 'Monitor blood sugar and do not skip meals.' },
  { t: 'Thiazide diuretic with glucose-lowering drug', d: 'Thiazides may raise blood sugar slightly.', adv: 'Monitor blood sugar.' },
  { t: 'Duplicate acid-reducing drugs', d: 'Combining them is usually unnecessary.', adv: 'Ask the doctor if the combination is intended.' }
];

EN.refDefault = 'FDA label / manufacturer leaflet for the active ingredient; WHO Model List of Essential Medicines 2023; LactMed (breastfeeding)';
EN.refExtra = {
  ibuprofen: 'FDA Drug Safety Communication (Oct 2020) on NSAIDs after week 20 of pregnancy',
  diclofenac: 'FDA Drug Safety Communication (Oct 2020) on NSAIDs after week 20 of pregnancy',
  losartan: 'FDA boxed warning: fetal toxicity',
  enalapril: 'FDA boxed warning: fetal toxicity',
  metformin: 'FDA guidance on kidney function (2016)',
  atorvastatin: 'FDA request (2021) to update statin pregnancy warnings',
  levothyroxine: 'American Thyroid Association (ATA) guidelines',
  salbutamol: 'GINA', 'inhaled-steroid': 'GINA', 'nasal-steroid': 'ARIA'
};
EN.refFull = { ors: 'WHO / UNICEF diarrhea treatment guidance' };
