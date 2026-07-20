/* सहीDoctor app — pre-compiled from sd-app.src.jsx (JSX). Edit the .src.jsx and recompile. */
const {
  useState,
  useMemo,
  useEffect
} = React;
const SYMPTOM_GROUPS = [{
  group: "आम लक्षण / General",
  items: [{
    id: "fever",
    label: "बुखार / Fever",
    specs: ["General Physician"]
  }, {
    id: "weakness",
    label: "कमज़ोरी–थकान / Weakness, fatigue",
    specs: ["General Physician"]
  }, {
    id: "weightloss",
    label: "वज़न घटना / Unexplained weight loss",
    specs: ["General Physician", "Endocrinologist"]
  }, {
    id: "bodyache",
    label: "बदन दर्द / Body ache",
    specs: ["General Physician"]
  }]
}, {
  group: "छाती–साँस / Chest & Breathing",
  items: [{
    id: "chestpain",
    label: "सीने में दर्द / Chest pain",
    specs: ["Cardiologist"],
    redFlag: true
  }, {
    id: "breathless",
    label: "साँस फूलना / Breathlessness",
    specs: ["Pulmonologist", "Cardiologist"],
    redFlag: true
  }, {
    id: "palpitation",
    label: "धड़कन तेज़ / Palpitations",
    specs: ["Cardiologist"]
  }, {
    id: "cough",
    label: "लंबी खाँसी (2+ हफ़्ते) / Cough over 2 weeks",
    specs: ["Pulmonologist"]
  }]
}, {
  group: "पेट / Stomach & Digestion",
  items: [{
    id: "stomachpain",
    label: "पेट दर्द / Stomach pain",
    specs: ["Gastroenterologist", "General Physician"]
  }, {
    id: "acidity",
    label: "एसिडिटी–जलन / Acidity, heartburn",
    specs: ["Gastroenterologist"]
  }, {
    id: "vomiting",
    label: "उल्टी–दस्त / Vomiting, loose motions",
    specs: ["General Physician", "Gastroenterologist"]
  }, {
    id: "bloodstool",
    label: "मल में खून / Blood in stool",
    specs: ["Gastroenterologist"],
    redFlag: true
  }]
}, {
  group: "त्वचा–बाल / Skin & Hair",
  items: [{
    id: "rash",
    label: "दाने–खुजली / Rash, itching",
    specs: ["Dermatologist"]
  }, {
    id: "hairfall",
    label: "बाल झड़ना / Hair fall",
    specs: ["Dermatologist"]
  }, {
    id: "patches",
    label: "सफ़ेद/काले धब्बे / Skin patches",
    specs: ["Dermatologist"]
  }]
}, {
  group: "हड्डी–जोड़ / Bones & Joints",
  items: [{
    id: "jointpain",
    label: "जोड़ों में दर्द / Joint pain",
    specs: ["Orthopaedic"]
  }, {
    id: "backpain",
    label: "कमर दर्द / Back pain",
    specs: ["Orthopaedic"]
  }, {
    id: "injury",
    label: "चोट–मोच / Injury, sprain",
    specs: ["Orthopaedic"]
  }]
}, {
  group: "सिर–दिमाग / Head & Nerves",
  items: [{
    id: "headache",
    label: "बार-बार सिरदर्द / Frequent headache",
    specs: ["Neurologist", "General Physician"]
  }, {
    id: "dizziness",
    label: "चक्कर आना / Dizziness",
    specs: ["Neurologist", "General Physician"]
  }, {
    id: "seizure",
    label: "दौरा पड़ना / Seizure, fits",
    specs: ["Neurologist"],
    redFlag: true
  }, {
    id: "sleep",
    label: "नींद–तनाव–उदासी / Sleep issues, stress, sadness",
    specs: ["Psychiatrist"]
  }]
}, {
  group: "आँख–कान–गला / Eye, Ear, Throat",
  items: [{
    id: "vision",
    label: "धुंधला दिखना / Blurred vision",
    specs: ["Ophthalmologist"]
  }, {
    id: "earpain",
    label: "कान दर्द–कम सुनना / Ear pain, hearing loss",
    specs: ["ENT Specialist"]
  }, {
    id: "throat",
    label: "गला ख़राब–आवाज़ बैठना / Sore throat, hoarse voice",
    specs: ["ENT Specialist"]
  }]
}, {
  group: "महिला–बच्चे / Women & Children",
  items: [{
    id: "periods",
    label: "माहवारी की समस्या / Period problems",
    specs: ["Gynaecologist"]
  }, {
    id: "pregnancy",
    label: "गर्भावस्था जाँच / Pregnancy care",
    specs: ["Gynaecologist"]
  }, {
    id: "childfever",
    label: "बच्चे की बीमारी / Child illness",
    specs: ["Paediatrician"]
  }]
}];
const RED_FLAG_IDS = new Set(SYMPTOM_GROUPS.flatMap(g => g.items.filter(i => i.redFlag).map(i => i.id)));
const ALL_SYMPTOMS = SYMPTOM_GROUPS.flatMap(g => g.items);
const SPECIALTIES = [{
  v: "General Physician",
  l: "जनरल फ़िज़िशियन (General Physician)"
}, {
  v: "Cardiologist",
  l: "हृदय रोग (Cardiologist)"
}, {
  v: "Endocrinologist",
  l: "शुगर/हार्मोन (Endocrinologist)"
}, {
  v: "Gastroenterologist",
  l: "पेट रोग (Gastroenterologist)"
}, {
  v: "Gynaecologist",
  l: "स्त्री रोग (Gynaecologist)"
}, {
  v: "Neurologist",
  l: "न्यूरो (Neurologist)"
}, {
  v: "Orthopaedic",
  l: "हड्डी (Orthopaedic)"
}, {
  v: "Psychiatrist",
  l: "मानसिक स्वास्थ्य (Psychiatrist)"
}, {
  v: "Pulmonologist",
  l: "फेफड़ा (Pulmonologist)"
}, {
  v: "Urologist",
  l: "मूत्र रोग (Urologist)"
}, {
  v: "Dentist",
  l: "दाँत (Dentist)"
}, {
  v: "Dermatologist",
  l: "त्वचा (Dermatologist)"
}, {
  v: "ENT",
  l: "कान-नाक-गला (ENT)"
}, {
  v: "Paediatrician",
  l: "बच्चों के डॉक्टर (Paediatrician)"
}, {
  v: "Ophthalmologist",
  l: "आँख (Ophthalmologist)"
}];
const T = {
  paper: "#FBF7EF",
  card: "#FBF8F1",
  ink: "#1D3557",
  teal: "#0F766E",
  tealSoft: "#E0F0EE",
  saffron: "#E8930C",
  saffronSoft: "#FDF1DC",
  red: "#C0392B",
  redSoft: "#FBEAE7",
  line: "#E5DFD2",
  ruled: "#DCE9F5"
};
const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:ital@0;1&family=Mukta:wght@400;500;600;700&display=swap');
`;
const display = {
  fontFamily: "'Tiro Devanagari Hindi', Georgia, serif"
};
const body = {
  fontFamily: "'Mukta', system-ui, sans-serif"
};
function Chip({
  active,
  redFlag,
  label,
  onClick
}) {
  return React.createElement("button", {
    onClick: onClick,
    style: {
      ...body,
      border: `1.5px solid ${T.red}`,
      background: active ? T.red : T.redSoft,
      color: active ? "#fff" : T.red,
      fontWeight: active ? 700 : 600
    },
    className: "px-3 py-2 rounded-full text-sm mr-2 mb-2 transition-all"
  }, label, " ", redFlag && React.createElement("span", {
    title: "Emergency symptom"
  }, "⚠"));
}
function FeeBadge({
  fee,
  isLowest
}) {
  return React.createElement("div", {
    className: "text-right"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold"
  }, "₹", fee), isLowest && React.createElement("div", {
    style: {
      ...body,
      background: T.saffronSoft,
      color: T.saffron
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full inline-block"
  }, "सबसे कम फ़ीस"));
}
function DoctorCard({
  d,
  isLowest
}) {
  const [showMap, setShowMap] = useState(false);
  const areaQuery = encodeURIComponent(`${d.area}, ${d.city}, Punjab, India`);
  const dirQuery = encodeURIComponent(`${d.name} ${d.area} ${d.city}`);
  return React.createElement("div", {
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-3"
  }, React.createElement("div", {
    className: "flex justify-between items-start gap-3"
  }, React.createElement("div", null, React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, React.createElement("span", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-base"
  }, d.name), d.verified && React.createElement("span", {
    style: {
      ...body,
      background: T.tealSoft,
      color: T.teal
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full"
  }, "✓ Verified")), React.createElement("div", {
    style: {
      ...body,
      color: T.teal
    },
    className: "text-sm font-semibold"
  }, d.specialty), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm"
  }, "📍 ", d.area, ", ", d.city, " · 🕐 ", d.timing), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm"
  }, "📞 ", d.phone)), React.createElement(FeeBadge, {
    fee: d.fee,
    isLowest: isLowest
  })), React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, React.createElement("button", {
    onClick: () => setShowMap(x => !x),
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: showMap ? T.teal : T.tealSoft,
      color: showMap ? "#fff" : T.teal
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-bold"
  }, showMap ? "नक्शा छिपाएँ ▲" : "📍 नक्शा देखें ▼"), React.createElement("a", {
    href: `https://www.google.com/maps/dir/?api=1&destination=${dirQuery}`,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...body,
      border: `1.5px solid ${T.saffron}`,
      background: T.saffronSoft,
      color: T.saffron
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-bold no-underline"
  }, "🧭 रास्ता दिखाएँ"), React.createElement("a", {
    href: `https://www.google.com/maps/search/?api=1&query=${dirQuery}`,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-bold no-underline"
  }, "Maps में खोलें ↗")), showMap && React.createElement("div", {
    style: {
      border: `1px solid ${T.line}`
    },
    className: "mt-3 rounded-lg overflow-hidden"
  }, React.createElement("iframe", {
    title: `map-${d.name}`,
    src: `https://www.google.com/maps?q=${areaQuery}&output=embed`,
    width: "100%",
    height: "220",
    style: {
      border: 0
    },
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  }), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3",
      background: "#FAFAF7"
    },
    className: "text-xs px-3 py-1.5"
  }, "नक्शा ", d.area, " इलाक़ा दिखा रहा है। क्लिनिक की exact जगह के लिए \"Maps में खोलें ↗\" दबाएँ।")));
}
const DISEASES = [{
  name: "मलेरिया",
  english: "Malaria",
  cat: "बुखार / Fever",
  specialist: "General Physician",
  symptoms: ["ठंड लगकर तेज़ बुखार आना (बारी-बारी से)", "कंपकंपी और पसीना", "सिरदर्द और बदन दर्द", "उल्टी, जी मिचलाना", "कमज़ोरी और थकान"],
  danger: ["बहुत तेज़ बुखार के साथ बेहोशी", "साँस लेने में दिक़्क़त", "पेशाब कम या काला आना"],
  note: "मच्छर के काटने से फैलता है। खून की जाँच (blood smear/rapid test) से पक्का पता चलता है।"
}, {
  name: "डेंगू",
  english: "Dengue",
  cat: "बुखार / Fever",
  specialist: "General Physician",
  symptoms: ["अचानक तेज़ बुखार", "आँखों के पीछे दर्द", "तेज़ सिरदर्द", "हड्डी-जोड़ों में तेज़ दर्द (breakbone fever)", "शरीर पर लाल चकत्ते", "कमज़ोरी"],
  danger: ["मसूड़ों/नाक से खून आना", "पेट में तेज़ दर्द, लगातार उल्टी", "platelet गिरना — सुस्ती, ठंडी त्वचा"],
  note: "बुखार उतरने के 24–48 घंटे सबसे ख़तरनाक होते हैं — platelet जाँच कराते रहें। Aspirin/Brufen न लें, सिर्फ़ Paracetamol।"
}, {
  name: "चिकनगुनिया",
  english: "Chikungunya",
  cat: "बुखार / Fever",
  specialist: "General Physician",
  symptoms: ["तेज़ बुखार", "जोड़ों में बहुत तेज़ दर्द और सूजन (हाथ-पैर)", "मांसपेशियों में दर्द", "चकत्ते", "थकान"],
  danger: ["बुज़ुर्गों में लंबा जोड़ों का दर्द", "चलने-उठने में असमर्थता"],
  note: "जोड़ों का दर्द हफ़्तों–महीनों तक रह सकता है। डेंगू जैसे ही मच्छर (Aedes) से फैलता है।"
}, {
  name: "टाइफ़ाइड",
  english: "Typhoid",
  cat: "बुखार / Fever",
  specialist: "General Physician",
  symptoms: ["धीरे-धीरे बढ़ता बुखार (सीढ़ी जैसा)", "पेट दर्द", "भूख न लगना", "कब्ज़ या दस्त", "कमज़ोरी", "ज़ुबान पर सफ़ेद परत"],
  danger: ["पेट में बहुत तेज़ दर्द", "मल में खून", "बेहोशी जैसी हालत"],
  note: "गंदे पानी/खाने से फैलता है। पूरा antibiotic कोर्स ज़रूर पूरा करें।"
}, {
  name: "टीबी (क्षय रोग)",
  english: "Tuberculosis (TB)",
  cat: "साँस / Respiratory",
  specialist: "Pulmonologist",
  symptoms: ["2 हफ़्ते से ज़्यादा खाँसी", "बलगम में खून", "शाम को हल्का बुखार", "रात में पसीना", "वज़न घटना", "भूख न लगना"],
  danger: ["खाँसी में ज़्यादा खून", "साँस फूलना", "बहुत तेज़ी से वज़न गिरना"],
  note: "सरकारी DOTS केंद्र पर जाँच और दवा बिल्कुल मुफ़्त है। इलाज बीच में न छोड़ें।"
}, {
  name: "कैंसर — चेतावनी संकेत",
  english: "Cancer — Warning Signs",
  cat: "गंभीर / Serious",
  specialist: "General Physician",
  symptoms: ["बिना वजह वज़न घटना", "शरीर में कहीं गाँठ (स्तन, गला, बगल)", "न भरने वाला घाव या छाला", "आवाज़ में बदलाव या निगलने में दिक़्क़त", "मल/पेशाब की आदत में लंबा बदलाव", "असामान्य खून आना (खाँसी, मल, पेशाब, माहवारी के बीच)", "लगातार थकान", "तिल/मस्से के रंग-आकार में बदलाव"],
  danger: ["इनमें से कोई भी लक्षण 2–3 हफ़्ते से ज़्यादा रहे तो जाँच ज़रूरी"],
  note: "ये लक्षण होने का मतलब कैंसर नहीं — लेकिन जाँच ज़रूरी है। जल्दी पकड़ा गया कैंसर ज़्यादातर ठीक हो सकता है। शुरुआत General Physician से करें, वे सही जाँच व specialist (Oncologist) बताएँगे।"
}, {
  name: "मधुमेह (शुगर)",
  english: "Diabetes",
  cat: "जीवनशैली / Lifestyle",
  specialist: "Endocrinologist",
  symptoms: ["बार-बार पेशाब आना", "बहुत प्यास लगना", "बहुत भूख लगना", "वज़न घटना", "घाव देर से भरना", "धुंधला दिखना", "हाथ-पैर में झनझनाहट"],
  danger: ["बेहोशी", "बहुत तेज़ प्यास + उल्टी", "पैर का घाव सड़ना"],
  note: "30 की उम्र के बाद साल में एक बार शुगर जाँच कराएँ, ख़ासकर अगर परिवार में किसी को है।"
}, {
  name: "हाई ब्लड प्रेशर",
  english: "Hypertension",
  cat: "जीवनशैली / Lifestyle",
  specialist: "General Physician",
  symptoms: ["अक्सर कोई लक्षण नहीं (silent killer)", "सिरदर्द (ख़ासकर सुबह)", "चक्कर", "धड़कन तेज़", "नाक से खून (कभी-कभी)"],
  danger: ["BP 180/120 से ऊपर", "सीने में दर्द", "अचानक धुंधला दिखना", "बोलने में लड़खड़ाहट"],
  note: "बिना जाँच पता नहीं चलता — हर 6 महीने में BP ज़रूर नपवाएँ।"
}, {
  name: "हार्ट अटैक",
  english: "Heart Attack",
  cat: "आपातकाल / Emergency",
  specialist: "Cardiologist",
  symptoms: ["सीने के बीच में दबाव/जकड़न जैसा दर्द", "दर्द बाएँ हाथ, जबड़े, पीठ तक जाना", "ठंडा पसीना", "साँस फूलना", "जी मिचलाना", "बहुत घबराहट"],
  danger: ["ये सारे लक्षण ही आपातकाल हैं — तुरंत 108 बुलाएँ, मरीज़ को खुद गाड़ी न चलाने दें"],
  note: "पहले 60 मिनट 'golden hour' हैं। Gas समझकर टालना सबसे बड़ी ग़लती है।"
}, {
  name: "लकवा (स्ट्रोक)",
  english: "Stroke",
  cat: "आपातकाल / Emergency",
  specialist: "Neurologist",
  symptoms: ["चेहरा एक तरफ़ लटकना", "एक हाथ/पैर में अचानक कमज़ोरी", "बोलने में लड़खड़ाहट", "अचानक धुंधला दिखना", "अचानक तेज़ सिरदर्द", "संतुलन बिगड़ना"],
  danger: ["FAST याद रखें: Face, Arm, Speech, Time — तुरंत 108"],
  note: "पहले 4.5 घंटे में इलाज मिले तो लकवे से बचा जा सकता है। सोकर ठीक होने का इंतज़ार न करें।"
}, {
  name: "पीलिया / हेपेटाइटिस",
  english: "Jaundice / Hepatitis",
  cat: "पेट / Digestive",
  specialist: "Gastroenterologist",
  symptoms: ["आँखें और त्वचा पीली", "पेशाब गहरा पीला", "भूख न लगना", "जी मिचलाना", "पेट के दाएँ ऊपरी हिस्से में दर्द", "थकान"],
  danger: ["बहुत ज़्यादा पीलापन", "उल्टी में खून", "बेहोशी/उलझन"],
  note: "गंदे पानी से (Hepatitis A/E) या खून/सुई से (B/C) फैलता है। झाड़-फूँक नहीं, जाँच कराएँ।"
}, {
  name: "पथरी (किडनी स्टोन)",
  english: "Kidney Stone",
  cat: "पेट / Digestive",
  specialist: "Urologist",
  symptoms: ["कमर/पेट के एक तरफ़ अचानक तेज़ दर्द (लहरों में)", "दर्द जाँघ तक जाना", "पेशाब में जलन", "पेशाब में खून", "जी मिचलाना"],
  danger: ["दर्द के साथ बुखार", "पेशाब बिल्कुल बंद होना"],
  note: "खूब पानी पिएँ (2.5–3 लीटर/दिन)। छोटी पथरी अक्सर खुद निकल जाती है।"
}, {
  name: "थायराइड",
  english: "Thyroid",
  cat: "जीवनशैली / Lifestyle",
  specialist: "Endocrinologist",
  symptoms: ["वज़न बढ़ना/घटना बिना वजह", "थकान या बेचैनी", "बाल झड़ना", "ठंड या गर्मी सहन न होना", "माहवारी अनियमित", "गले में सूजन"],
  danger: ["गले की गाँठ तेज़ी से बढ़ना", "धड़कन बहुत तेज़/अनियमित"],
  note: "महिलाओं में बहुत आम। एक साधारण खून जाँच (TSH) से पता चल जाता है।"
}, {
  name: "खून की कमी",
  english: "Anemia",
  cat: "आम / General",
  specialist: "General Physician",
  symptoms: ["थकान, कमज़ोरी", "चेहरा/नाखून पीले", "साँस जल्दी फूलना", "चक्कर", "धड़कन तेज़", "नाख़ून चम्मच जैसे"],
  danger: ["बेहोशी", "सीने में दर्द"],
  note: "भारत में महिलाओं व बच्चों में बेहद आम। हरी सब्ज़ी, गुड़, आयरन की गोली — पर पहले जाँच।"
}, {
  name: "दमा",
  english: "Asthma",
  cat: "साँस / Respiratory",
  specialist: "Pulmonologist",
  symptoms: ["साँस फूलना (ख़ासकर रात/सुबह)", "सीने में सीटी जैसी आवाज़", "सूखी खाँसी", "सीने में जकड़न"],
  danger: ["बोलने में भी साँस टूटना", "होंठ नीले पड़ना", "inhaler से भी आराम न मिलना"],
  note: "Inhaler आदत नहीं, सबसे सुरक्षित इलाज है — डरें नहीं।"
}, {
  name: "निमोनिया",
  english: "Pneumonia",
  cat: "साँस / Respiratory",
  specialist: "Pulmonologist",
  symptoms: ["बुखार के साथ खाँसी और बलगम", "साँस तेज़ चलना", "सीने में दर्द (साँस लेने पर)", "ठंड लगना", "बुज़ुर्गों में सिर्फ़ सुस्ती/उलझन"],
  danger: ["साँस बहुत तेज़/मुश्किल", "होंठ नीले", "छोटे बच्चे की पसली धँसना"],
  note: "बच्चों और बुज़ुर्गों के लिए ख़तरनाक — देर न करें।"
}, {
  name: "उल्टी-दस्त (आँतों का संक्रमण)",
  english: "Gastroenteritis",
  cat: "पेट / Digestive",
  specialist: "General Physician",
  symptoms: ["बार-बार पतले दस्त", "उल्टी", "पेट में मरोड़", "हल्का बुखार", "कमज़ोरी"],
  danger: ["पेशाब बहुत कम/बंद", "आँखें धँसना, त्वचा सूखना (dehydration)", "दस्त में खून", "बच्चा सुस्त पड़ना"],
  note: "ORS सबसे ज़रूरी इलाज है — हर दस्त के बाद पिलाएँ। बच्चों में zinc भी दें।"
}, {
  name: "अपेंडिक्स",
  english: "Appendicitis",
  cat: "आपातकाल / Emergency",
  specialist: "General Physician",
  symptoms: ["नाभि के पास से शुरू होकर पेट के दाएँ-नीचे जाता दर्द", "भूख ख़त्म", "जी मिचलाना/उल्टी", "हल्का बुखार", "चलने/खाँसने पर दर्द बढ़ना"],
  danger: ["दर्द अचानक बहुत बढ़े या पूरा पेट सख़्त हो जाए — तुरंत अस्पताल"],
  note: "ऑपरेशन आम और सुरक्षित है — देर करने पर अपेंडिक्स फट सकता है।"
}, {
  name: "गठिया / जोड़ों का रोग",
  english: "Arthritis",
  cat: "हड्डी / Bones",
  specialist: "Orthopaedic",
  symptoms: ["जोड़ों में दर्द और अकड़न (सुबह ज़्यादा)", "सूजन", "जोड़ मोड़ने में आवाज़/दिक़्क़त", "उँगलियों के जोड़ टेढ़े होना"],
  danger: ["जोड़ लाल-गरम होकर अचानक सूजना (infection हो सकता है)"],
  note: "वज़न घटाना घुटनों के दर्द की आधी दवा है। खुद से painkiller लंबे समय तक न लें।"
}, {
  name: "माइग्रेन",
  english: "Migraine",
  cat: "सिर / Neuro",
  specialist: "Neurologist",
  symptoms: ["आधे सिर में तेज़ धड़कता दर्द", "रोशनी/आवाज़ से परेशानी", "जी मिचलाना", "दर्द से पहले चमकती रोशनी दिखना (aura)"],
  danger: ["ज़िंदगी का सबसे तेज़ अचानक सिरदर्द", "सिरदर्द के साथ बुखार+गर्दन अकड़ना", "सिरदर्द के साथ कमज़ोरी/लड़खड़ाहट — ये migraine नहीं, आपातकाल है"],
  note: "नींद पूरी करें, खाली पेट न रहें, अपने trigger पहचानें।"
}, {
  name: "तनाव-चिंता-अवसाद",
  english: "Anxiety / Depression",
  cat: "मानसिक / Mental",
  specialist: "Psychiatrist",
  symptoms: ["लगातार उदासी या बेचैनी (2+ हफ़्ते)", "नींद बहुत कम/ज़्यादा", "किसी चीज़ में मन न लगना", "थकान", "ध्यान न लगना", "बिना वजह डर/घबराहट, धड़कन"],
  danger: ["खुद को नुक़सान पहुँचाने के विचार — तुरंत मदद लें (Tele-MANAS: 14416, मुफ़्त, 24x7)"],
  note: "यह कमज़ोरी नहीं, इलाज योग्य बीमारी है — जैसे शुगर या BP। बात करना पहला इलाज है।"
}, {
  name: "पेशाब का संक्रमण",
  english: "UTI",
  cat: "आम / General",
  specialist: "Urologist",
  symptoms: ["पेशाब में जलन", "बार-बार पेशाब आना (थोड़ा-थोड़ा)", "पेट के निचले हिस्से में दर्द", "पेशाब गंदला/बदबूदार"],
  danger: ["बुखार + कमर दर्द (किडनी तक infection)", "पेशाब में खून"],
  note: "महिलाओं में बहुत आम। खूब पानी पिएँ, पेशाब न रोकें।"
}, {
  name: "PCOS / माहवारी की समस्या",
  english: "PCOS",
  cat: "महिला / Women",
  specialist: "Gynaecologist",
  symptoms: ["माहवारी अनियमित या महीनों गायब", "वज़न बढ़ना", "चेहरे पर बाल/मुहाँसे", "बाल झड़ना", "गर्भधारण में दिक़्क़त"],
  danger: ["माहवारी में बहुत ज़्यादा खून", "3+ महीने माहवारी न आना"],
  note: "जीवनशैली सुधार (वज़न, व्यायाम) सबसे असरदार इलाज है। शर्माएँ नहीं, gynaecologist से मिलें।"
}];
const DISEASE_CATS = [...new Set(DISEASES.map(d => d.cat))];
function DiseaseGuide({
  goToDoctors
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const list = DISEASES.filter(d => {
    const matchQ = !q || (d.name + d.english).toLowerCase().includes(q.toLowerCase());
    const matchC = cat === "All" || d.cat === cat;
    return matchQ && matchC;
  });
  return React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "बीमारी गाइड / Disease Guide"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "किसी भी बीमारी के लक्षण, ख़तरे के निशान और सही डॉक्टर — एक जगह।"), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "खोजें… जैसे: डेंगू, cancer, typhoid",
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: "#fff",
      color: T.ink
    },
    className: "w-full px-4 py-3 rounded-xl text-base mb-3"
  }), React.createElement("div", {
    className: "flex flex-wrap mb-4"
  }, ["All", ...DISEASE_CATS].map(c => React.createElement("button", {
    key: c,
    onClick: () => setCat(c),
    style: {
      ...body,
      border: `1.5px solid ${T.red}`,
      background: cat === c ? T.red : T.redSoft,
      color: cat === c ? "#fff" : T.red,
      fontWeight: cat === c ? 700 : 600
    },
    className: "px-3 py-1.5 rounded-full text-xs mr-2 mb-2"
  }, c))), list.length === 0 && React.createElement("div", {
    style: {
      ...body,
      background: T.card,
      border: `1px dashed ${T.line}`,
      color: "#5A6B7B"
    },
    className: "rounded-xl p-6 text-center text-sm"
  }, "\"", q, "\" नहीं मिला। कोई और नाम आज़माएँ, या लक्षण जाँच tab से शुरू करें।"), list.map(d => {
    const isOpen = open === d.english;
    return React.createElement("div", {
      key: d.english,
      style: {
        background: T.card,
        border: `1px solid ${isOpen ? T.teal : T.line}`
      },
      className: "rounded-xl mb-3 overflow-hidden"
    }, React.createElement("button", {
      onClick: () => setOpen(isOpen ? null : d.english),
      className: "w-full text-left px-4 py-3 flex justify-between items-center"
    }, React.createElement("div", null, React.createElement("span", {
      style: {
        ...display,
        color: T.ink
      },
      className: "font-bold text-base"
    }, d.name), React.createElement("span", {
      style: {
        ...body,
        color: "#5A6B7B"
      },
      className: "text-sm"
    }, " · ", d.english), React.createElement("div", {
      style: {
        ...body,
        color: T.teal
      },
      className: "text-xs font-semibold"
    }, d.cat)), React.createElement("span", {
      style: {
        color: T.teal
      },
      className: "text-lg"
    }, isOpen ? "▲" : "▼")), isOpen && React.createElement("div", {
      className: "px-4 pb-4"
    }, React.createElement("div", {
      style: {
        ...body,
        color: T.ink
      },
      className: "text-sm font-bold mb-1"
    }, "आम लक्षण:"), React.createElement("ul", {
      className: "mb-3"
    }, d.symptoms.map((s, i) => React.createElement("li", {
      key: i,
      style: {
        ...body,
        color: T.ink
      },
      className: "text-sm mb-1"
    }, "• ", s))), React.createElement("div", {
      style: {
        background: T.redSoft,
        border: `1px solid ${T.red}`
      },
      className: "rounded-lg p-3 mb-3"
    }, React.createElement("div", {
      style: {
        ...body,
        color: T.red
      },
      className: "text-sm font-bold mb-1"
    }, "⚠ ख़तरे के निशान — तुरंत डॉक्टर/108:"), d.danger.map((s, i) => React.createElement("div", {
      key: i,
      style: {
        ...body,
        color: T.red
      },
      className: "text-sm"
    }, "• ", s))), React.createElement("div", {
      style: {
        ...body,
        color: "#5A6B7B",
        background: T.saffronSoft
      },
      className: "text-sm rounded-lg p-3 mb-3"
    }, "💡 ", d.note), React.createElement("button", {
      onClick: () => goToDoctors(d.specialist),
      style: {
        ...display,
        background: T.saffron,
        color: "#fff"
      },
      className: "px-4 py-2 rounded-xl font-bold text-sm"
    }, d.specialist, " खोजें →")));
  }), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3"
    },
    className: "text-xs mt-4"
  }, "यह जानकारी शिक्षा के लिए है, निदान के लिए नहीं। लक्षण मिलते-जुलते हों तो भी जाँच डॉक्टर ही कर सकते हैं।"));
}
const TEST_GUIDE = [{
  disease: "मलेरिया / Malaria",
  tests: [{
    name: "Malaria Rapid Test / Blood Smear (MP)",
    approx: "₹150–400",
    fasting: false,
    note: "बुखार के समय सैंपल देना सबसे सही"
  }]
}, {
  disease: "डेंगू / Dengue",
  tests: [{
    name: "Dengue NS1 Antigen (पहले 5 दिन)",
    approx: "₹500–800",
    fasting: false,
    note: "बुखार के शुरुआती दिनों में"
  }, {
    name: "Dengue IgM/IgG (5 दिन बाद)",
    approx: "₹600–1000",
    fasting: false,
    note: ""
  }, {
    name: "CBC (Platelet Count)",
    approx: "₹200–350",
    fasting: false,
    note: "रोज़/एक दिन छोड़कर दोहराएँ"
  }]
}, {
  disease: "चिकनगुनिया / Chikungunya",
  tests: [{
    name: "Chikungunya IgM",
    approx: "₹600–1000",
    fasting: false,
    note: ""
  }, {
    name: "CBC",
    approx: "₹200–350",
    fasting: false,
    note: ""
  }]
}, {
  disease: "टाइफ़ाइड / Typhoid",
  tests: [{
    name: "Blood Culture (सबसे भरोसेमंद)",
    approx: "₹800–1500",
    fasting: false,
    note: "antibiotic शुरू करने से पहले"
  }, {
    name: "Typhidot / Widal",
    approx: "₹200–500",
    fasting: false,
    note: "Widal अकेले पर पूरा भरोसा न करें"
  }]
}, {
  disease: "टीबी / TB",
  tests: [{
    name: "Sputum Test / CBNAAT",
    approx: "सरकारी केंद्र पर मुफ़्त",
    fasting: false,
    note: "2 हफ़्ते+ खाँसी हो तो"
  }, {
    name: "Chest X-Ray",
    approx: "₹250–500",
    fasting: false,
    note: ""
  }]
}, {
  disease: "मधुमेह / Diabetes",
  tests: [{
    name: "Fasting Blood Sugar (FBS)",
    approx: "₹50–100",
    fasting: true,
    note: "8–10 घंटे खाली पेट"
  }, {
    name: "HbA1c (3 महीने का औसत)",
    approx: "₹300–500",
    fasting: false,
    note: "शुगर मरीज़ हर 3 महीने कराएँ"
  }, {
    name: "PP Blood Sugar",
    approx: "₹50–100",
    fasting: false,
    note: "खाने के ठीक 2 घंटे बाद"
  }]
}, {
  disease: "थायराइड / Thyroid",
  tests: [{
    name: "TSH (पहली जाँच)",
    approx: "₹200–400",
    fasting: false,
    note: "सुबह का सैंपल बेहतर"
  }, {
    name: "T3, T4 (ज़रूरत पर)",
    approx: "₹400–700",
    fasting: false,
    note: ""
  }]
}, {
  disease: "खून की कमी / Anemia",
  tests: [{
    name: "CBC (Hemoglobin)",
    approx: "₹200–350",
    fasting: false,
    note: ""
  }, {
    name: "Iron Studies / Ferritin (ज़रूरत पर)",
    approx: "₹600–1200",
    fasting: true,
    note: ""
  }]
}, {
  disease: "पीलिया / Jaundice",
  tests: [{
    name: "LFT (Liver Function Test)",
    approx: "₹400–700",
    fasting: true,
    note: "8 घंटे खाली पेट बेहतर"
  }, {
    name: "Hepatitis B/C जाँच (HBsAg, Anti-HCV)",
    approx: "₹300–800",
    fasting: false,
    note: ""
  }]
}, {
  disease: "किडनी / पथरी",
  tests: [{
    name: "KFT (Kidney Function Test)",
    approx: "₹400–700",
    fasting: false,
    note: ""
  }, {
    name: "Urine Routine",
    approx: "₹100–200",
    fasting: false,
    note: "सुबह का पहला पेशाब बेहतर"
  }, {
    name: "Ultrasound (KUB)",
    approx: "₹800–1500",
    fasting: false,
    note: "पेशाब रोककर जाएँ (full bladder)"
  }]
}, {
  disease: "दिल / Heart",
  tests: [{
    name: "ECG",
    approx: "₹150–300",
    fasting: false,
    note: "सीने में दर्द पर तुरंत"
  }, {
    name: "Lipid Profile (कोलेस्ट्रॉल)",
    approx: "₹400–700",
    fasting: true,
    note: "10–12 घंटे खाली पेट"
  }, {
    name: "Troponin (अटैक की जाँच)",
    approx: "₹800–1500",
    fasting: false,
    note: "आपातकाल में अस्पताल में होती है"
  }]
}, {
  disease: "हाई BP / Hypertension",
  tests: [{
    name: "BP Monitoring + KFT + Lipid Profile",
    approx: "₹500–1000",
    fasting: true,
    note: "नई पकड़ी BP में बुनियादी जाँचें"
  }]
}, {
  disease: "पेशाब संक्रमण / UTI",
  tests: [{
    name: "Urine Routine & Microscopy",
    approx: "₹100–200",
    fasting: false,
    note: ""
  }, {
    name: "Urine Culture (बार-बार UTI पर)",
    approx: "₹400–800",
    fasting: false,
    note: "antibiotic से पहले सैंपल दें"
  }]
}, {
  disease: "PCOS / माहवारी",
  tests: [{
    name: "Hormone Panel (LH, FSH, आदि)",
    approx: "₹1200–2500",
    fasting: false,
    note: "माहवारी के 2–3वें दिन"
  }, {
    name: "Pelvic Ultrasound",
    approx: "₹800–1500",
    fasting: false,
    note: ""
  }, {
    name: "TSH + Sugar",
    approx: "₹250–500",
    fasting: true,
    note: "साथ में कराना अच्छा"
  }]
}, {
  disease: "कैंसर स्क्रीनिंग / Cancer Screening",
  tests: [{
    name: "शुरुआत डॉक्टर से — लक्षण अनुसार जाँच",
    approx: "—",
    fasting: false,
    note: "गाँठ → FNAC/Biopsy; महिला 30+ → स्तन जाँच व Pap smear; लंबी खाँसी → X-ray। खुद से महँगे 'cancer package' न कराएँ, पहले डॉक्टर की सलाह लें"
  }]
}, {
  disease: "सामान्य जाँच / Full Body Basic",
  tests: [{
    name: "CBC + Sugar + Lipid + LFT + KFT + TSH + Urine",
    approx: "₹1200–2500 (package)",
    fasting: true,
    note: "साल में एक बार, 35+ उम्र में समझदारी"
  }]
}];
function LabCard({
  l,
  isLowest
}) {
  const [showMap, setShowMap] = useState(false);
  const areaQuery = encodeURIComponent(`${l.area}, ${l.city}, Punjab, India`);
  const dirQuery = encodeURIComponent(`${l.name} ${l.area} ${l.city}`);
  return React.createElement("div", {
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-3"
  }, React.createElement("div", {
    className: "flex justify-between items-start gap-3"
  }, React.createElement("div", null, React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, React.createElement("span", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-base"
  }, l.name), l.nabl && React.createElement("span", {
    style: {
      ...body,
      background: T.tealSoft,
      color: T.teal
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full"
  }, "✓ NABL"), l.homeCollection && React.createElement("span", {
    style: {
      ...body,
      background: T.saffronSoft,
      color: T.saffron
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full"
  }, "🏠 Home Collection")), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm"
  }, "📍 ", l.area, ", ", l.city, " · 🕐 ", l.timing), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm"
  }, "📞 ", l.phone), React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm mt-1"
  }, "CBC ₹", l.cbc, " · Sugar ₹", l.sugar, " · Thyroid ₹", l.thyroid)), React.createElement("div", {
    className: "text-right"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold"
  }, "₹", l.cbc), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3"
    },
    className: "text-xs"
  }, "CBC से तुलना"), isLowest && React.createElement("div", {
    style: {
      ...body,
      background: T.saffronSoft,
      color: T.saffron
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1"
  }, "सबसे कम"))), React.createElement("div", {
    className: "flex gap-2 mt-3"
  }, React.createElement("button", {
    onClick: () => setShowMap(x => !x),
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: showMap ? T.teal : T.tealSoft,
      color: showMap ? "#fff" : T.teal
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-bold"
  }, showMap ? "नक्शा छिपाएँ ▲" : "📍 नक्शा देखें ▼"), React.createElement("a", {
    href: `https://www.google.com/maps/dir/?api=1&destination=${dirQuery}`,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...body,
      border: `1.5px solid ${T.saffron}`,
      background: T.saffronSoft,
      color: T.saffron
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-bold no-underline"
  }, "🧭 रास्ता दिखाएँ"), React.createElement("a", {
    href: `https://www.google.com/maps/search/?api=1&query=${dirQuery}`,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-bold no-underline"
  }, "Maps में खोलें ↗")), showMap && React.createElement("div", {
    style: {
      border: `1px solid ${T.line}`
    },
    className: "mt-3 rounded-lg overflow-hidden"
  }, React.createElement("iframe", {
    title: `map-${l.name}`,
    src: `https://www.google.com/maps?q=${areaQuery}&output=embed`,
    width: "100%",
    height: "220",
    style: {
      border: 0
    },
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  })));
}
function LabsAndTests() {
  const [q, setQ] = useState("");
  const [openDisease, setOpenDisease] = useState(null);
  const [labLoc, setLabLoc] = useState("");
  const guide = TEST_GUIDE.filter(g => !q || g.disease.toLowerCase().includes(q.toLowerCase()));
  return React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "जाँच गाइड + नज़दीकी लैब"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "किस बीमारी के लिए कौन-सी जाँच, अंदाज़न ख़र्च, और नज़दीकी pathology lab — फ़ीस तुलना के साथ।"), React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "बीमारी खोजें… जैसे: dengue, thyroid, शुगर",
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: "#fff",
      color: T.ink
    },
    className: "w-full px-4 py-3 rounded-xl text-base mb-3"
  }), guide.map(g => {
    const isOpen = openDisease === g.disease;
    return React.createElement("div", {
      key: g.disease,
      style: {
        background: T.card,
        border: `1px solid ${isOpen ? T.teal : T.line}`
      },
      className: "rounded-xl mb-2 overflow-hidden"
    }, React.createElement("button", {
      onClick: () => setOpenDisease(isOpen ? null : g.disease),
      className: "w-full text-left px-4 py-3 flex justify-between items-center"
    }, React.createElement("span", {
      style: {
        ...display,
        color: T.ink
      },
      className: "font-bold text-base"
    }, g.disease), React.createElement("span", {
      style: {
        color: T.teal
      }
    }, isOpen ? "▲" : "▼")), isOpen && React.createElement("div", {
      className: "px-4 pb-4"
    }, g.tests.map((t, i) => React.createElement("div", {
      key: i,
      style: {
        borderTop: i ? `1px dashed ${T.line}` : "none"
      },
      className: i ? "pt-2 mt-2" : ""
    }, React.createElement("div", {
      className: "flex justify-between gap-2 flex-wrap"
    }, React.createElement("span", {
      style: {
        ...body,
        color: T.ink
      },
      className: "text-sm font-bold"
    }, t.name), React.createElement("span", {
      style: {
        ...body,
        color: T.teal
      },
      className: "text-sm font-bold"
    }, t.approx)), React.createElement("div", {
      style: {
        ...body,
        color: "#5A6B7B"
      },
      className: "text-xs"
    }, t.fasting ? "🍽 खाली पेट ज़रूरी" : "खाली पेट ज़रूरी नहीं", t.note ? ` · ${t.note}` : "")))));
  }), React.createElement("h2", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-lg font-bold mt-6 mb-2"
  }, "नज़दीकी लैब खोजें"), React.createElement("input", {
    value: labLoc,
    onChange: e => setLabLoc(e.target.value),
    placeholder: "गाँव/शहर, ज़िला — जैसे: दरभंगा, बिहार",
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: "#fff",
      color: T.ink
    },
    className: "w-full px-3 py-2.5 rounded-lg text-sm mb-2"
  }), React.createElement("button", {
    onClick: () => geoSearch(labLoc, "pathology lab diagnostic centre"),
    style: {
      ...display,
      background: T.teal,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "w-full px-5 py-3 rounded-xl font-bold text-base mb-3"
  }, "🔍 इस इलाके में pathology lab खोजें (Google Maps) →"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B",
      background: T.saffronSoft
    },
    className: "text-sm rounded-xl p-4 mb-3"
  }, "💡 जगह लिखकर बटन दबाएँ — उस इलाके की असली pathology labs (पता व नंबर सहित) Google Maps पर दिखेंगी।"), React.createElement("div", {
    style: {
      ...body,
      color: T.ink,
      background: T.tealSoft,
      border: `1px solid ${T.teal}`
    },
    className: "text-sm rounded-xl p-4 mb-3"
  }, "💚 ", React.createElement("b", null, "सरकारी अस्पताल की लैब में कई जाँचें मुफ़्त या बहुत सस्ती"), " होती हैं — पहले वहाँ पूछें। जाँच हमेशा डॉक्टर की सलाह पर कराएँ।"), React.createElement("div", {
    style: {
      ...body,
      color: T.ink,
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "text-sm rounded-xl p-4"
  }, "✓ लैब या डायग्नोस्टिक सेंटर हैं?", " ", React.createElement("span", {
    onClick: () => {
      window.location.hash = "join";
    },
    style: {
      color: T.teal,
      fontWeight: 700,
      textDecoration: "underline",
      cursor: "pointer"
    }
  }, "यहाँ मुफ़्त जोड़ें →")));
}
const PHARMACIES = [{
  name: "Sharma Medical Store",
  city: "Patiala",
  area: "Leela Bhawan",
  phone: "98XXXXXX61",
  is24x7: false,
  delivery: true,
  timing: "8am–10pm"
}, {
  name: "Apna Medical Hall",
  city: "Patiala",
  area: "Model Town",
  phone: "98XXXXXX62",
  is24x7: true,
  delivery: false,
  timing: "24 घंटे"
}, {
  name: "Rajindra Hospital ke pass — Night Chemist",
  city: "Patiala",
  area: "Bhupindra Road",
  phone: "98XXXXXX63",
  is24x7: true,
  delivery: false,
  timing: "24 घंटे"
}, {
  name: "Wellness Pharmacy",
  city: "Mohali",
  area: "Phase 7",
  phone: "98XXXXXX64",
  is24x7: false,
  delivery: true,
  timing: "9am–9pm"
}, {
  name: "MedPlus Point",
  city: "Mohali",
  area: "Sector 70",
  phone: "98XXXXXX65",
  is24x7: true,
  delivery: true,
  timing: "24 घंटे"
}, {
  name: "City Chemist",
  city: "Chandigarh",
  area: "Sector 22",
  phone: "98XXXXXX66",
  is24x7: false,
  delivery: true,
  timing: "8am–11pm"
}, {
  name: "PGI Gate Pharmacy",
  city: "Chandigarh",
  area: "Sector 12",
  phone: "98XXXXXX67",
  is24x7: true,
  delivery: false,
  timing: "24 घंटे"
}];
async function geoSearch(loc, keyword) {
  const q = (loc || "").trim();
  if (!q) {
    window.open("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(keyword + " near me"), "_blank");
    return;
  }
  try {
    const r = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" + encodeURIComponent(q));
    const j = await r.json();
    if (j && j[0] && j[0].lat && j[0].lon) {
      window.open("https://www.google.com/maps/search/" + encodeURIComponent(keyword) + "/@" + j[0].lat + "," + j[0].lon + ",13z", "_blank");
      return;
    }
  } catch (e) {}
  window.open("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(keyword + " in " + q + ", India"), "_blank");
}
function PharmacyTab() {
  const [loc, setLoc] = useState("");
  const [only247, setOnly247] = useState(false);
  const [city, setCity] = useState("All");
  const cities = ["All", ...new Set(PHARMACIES.map(s => s.city))];
  let list = city === "All" ? PHARMACIES : PHARMACIES.filter(s => s.city === city);
  if (only247) list = list.filter(s => s.is24x7);
  return React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "💊 दवा दुकान (मेडिकल स्टोर)"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "नज़दीकी मेडिकल स्टोर — रात-बिरात के लिए 24 घंटे खुली दुकानें अलग से।"), React.createElement("div", {
    style: {
      background: T.tealSoft,
      border: `1.5px solid ${T.teal}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.teal
    },
    className: "font-bold text-base"
  }, "🟢 जन औषधि केंद्र — वही दवा, 50–90% सस्ती"), React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm mt-1 mb-2"
  }, "सरकारी जेनेरिक दवा दुकानें — BP, शुगर, दिल की रोज़ की दवाएँ यहाँ बहुत सस्ती मिलती हैं। जैसे जो दवा बाज़ार में ₹100 की, वहाँ ₹15–30 में। असर बिल्कुल same होता है।"), React.createElement("button", {
    onClick: () => geoSearch(loc, "Jan Aushadhi Kendra"),
    style: {
      ...display,
      background: T.teal,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "inline-block px-4 py-2 rounded-xl font-bold text-sm"
  }, "📍 नज़दीकी जन औषधि केंद्र खोजें →")), React.createElement("div", {
    style: {
      background: T.card,
      border: `1.5px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold mb-1"
  }, "👨‍👩‍👧 किसी और की जगह पर खोजें (ख़ाली छोड़ें = आपके नज़दीक)"), React.createElement("input", {
    value: loc,
    onChange: e => setLoc(e.target.value),
    placeholder: "गाँव/शहर, ज़िला — जैसे: बिरौल, दरभंगा, बिहार",
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: "#fff",
      color: T.ink
    },
    className: "w-full px-3 py-2.5 rounded-lg text-sm mb-2"
  }), React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, React.createElement("button", {
    onClick: () => geoSearch(loc, "medical store pharmacy"),
    style: {
      ...display,
      background: T.teal,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "inline-block px-4 py-2 rounded-xl font-bold text-sm"
  }, "📍 मेडिकल स्टोर खोजें →"), React.createElement("button", {
    onClick: () => geoSearch(loc, "24 hours pharmacy medical store"),
    style: {
      ...display,
      background: T.red,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "inline-block px-4 py-2 rounded-xl font-bold text-sm"
  }, "🌙 24 घंटे खुली दुकान खोजें →"))), React.createElement("h2", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-lg font-bold mb-2"
  }, "दुकान directory"), React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, cities.map(cty => React.createElement("button", {
    key: cty,
    onClick: () => setCity(cty),
    style: {
      ...body,
      border: `1.5px solid ${T.red}`,
      background: city === cty ? T.red : T.redSoft,
      color: city === cty ? "#fff" : T.red,
      fontWeight: city === cty ? 700 : 600
    },
    className: "px-3 py-1.5 rounded-full text-xs"
  }, cty)), React.createElement("button", {
    onClick: () => setOnly247(x => !x),
    style: {
      ...body,
      border: `1.5px solid ${only247 ? T.red : T.line}`,
      background: only247 ? T.redSoft : T.card,
      color: only247 ? T.red : T.ink
    },
    className: "px-3 py-1.5 rounded-full text-xs font-bold"
  }, "🌙 सिर्फ़ 24 घंटे वाली")), list.length === 0 && React.createElement("div", {
    style: {
      ...body,
      background: T.card,
      border: `1px dashed ${T.line}`,
      color: "#5A6B7B"
    },
    className: "rounded-xl p-5 text-center text-sm"
  }, "इस शहर में सूची में 24 घंटे वाली दुकान अभी नहीं है — ऊपर लाल बटन से Google Maps पर खोजें।"), list.map(s => React.createElement("div", {
    key: s.name,
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-2 flex items-center justify-between gap-3"
  }, React.createElement("div", null, React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, React.createElement("span", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-sm"
  }, s.name), s.is24x7 && React.createElement("span", {
    style: {
      ...body,
      background: T.redSoft,
      color: T.red
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full"
  }, "🌙 24x7"), s.delivery && React.createElement("span", {
    style: {
      ...body,
      background: T.saffronSoft,
      color: T.saffron
    },
    className: "text-xs font-bold px-2 py-0.5 rounded-full"
  }, "🛵 Home Delivery")), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs"
  }, "📍 ", s.area, ", ", s.city, " · 🕐 ", s.timing)), React.createElement("a", {
    href: `tel:${s.phone}`,
    style: {
      ...display,
      background: T.teal,
      color: "#fff"
    },
    className: "px-4 py-2 rounded-xl font-bold text-sm no-underline shrink-0"
  }, "📞 कॉल"))), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3"
    },
    className: "text-xs mt-3"
  }, "* नमूना सूची — सत्यापित दुकानें जल्द जोड़ी जाएँगी। दवा हमेशा डॉक्टर की पर्ची से लें, expiry date देखकर लें, और पर्ची वाली दवा (antibiotic, नींद/दर्द की दवा) कभी अपने मन से न लें।"));
}
const EMERGENCY_NUMBERS = [{
  num: "108",
  label: "सरकारी एम्बुलेंस",
  detail: "हर आपातकाल — दुर्घटना, हार्ट अटैक, बेहोशी। बिल्कुल मुफ़्त, पूरे भारत में।",
  color: "red"
}, {
  num: "102",
  label: "जननी एम्बुलेंस",
  detail: "गर्भवती महिला और नवजात/बीमार बच्चे के लिए मुफ़्त।",
  color: "teal"
}, {
  num: "112",
  label: "राष्ट्रीय आपातकाल",
  detail: "पुलिस, आग, एम्बुलेंस — एक ही नंबर, पूरे भारत में।",
  color: "ink"
}];
function AmbulanceTab() {
  const [loc, setLoc] = useState("");
  return React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "🚑 एम्बुलेंस — तुरंत कॉल करें"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "नीचे के नंबर पर टैप करते ही कॉल लग जाएगी।"), EMERGENCY_NUMBERS.map(e => React.createElement("a", {
    key: e.num,
    href: `tel:${e.num}`,
    style: {
      background: e.color === "red" ? T.red : e.color === "teal" ? T.teal : T.ink,
      textDecoration: "none"
    },
    className: "rounded-xl p-4 mb-3 flex items-center gap-4 block"
  }, React.createElement("div", {
    style: {
      ...display,
      color: "#fff",
      background: "rgba(255,255,255,0.18)"
    },
    className: "text-2xl font-extrabold px-4 py-2 rounded-xl"
  }, e.num), React.createElement("div", {
    className: "flex-1"
  }, React.createElement("div", {
    style: {
      ...display,
      color: "#fff"
    },
    className: "font-bold text-base"
  }, e.label, " — मुफ़्त"), React.createElement("div", {
    style: {
      ...body,
      color: "rgba(255,255,255,0.85)"
    },
    className: "text-xs"
  }, e.detail)), React.createElement("div", {
    style: {
      ...display,
      color: "#fff"
    },
    className: "text-2xl"
  }, "📞"))), React.createElement("div", {
    style: {
      background: T.saffronSoft,
      border: `1px solid ${T.saffron}`
    },
    className: "rounded-xl p-4 mb-5"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold mb-1"
  }, "📋 कॉल पर क्या बताएँ (30 सेकंड में):"), React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm"
  }, "1. सटीक जगह — गाँव/मोहल्ला, कोई पहचान (मंदिर, स्कूल, दुकान)", React.createElement("br", null), "2. क्या हुआ है — बेहोशी / सीने में दर्द / दुर्घटना / प्रसव पीड़ा", React.createElement("br", null), "3. मरीज़ की उम्र और हालत — साँस चल रही है या नहीं", React.createElement("br", null), "4. अपना नंबर — ताकि driver वापस कॉल कर सके")), React.createElement("div", {
    style: {
      background: T.tealSoft,
      border: `1.5px solid ${T.teal}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold mb-1"
  }, "👨‍👩‍👧 दूर बैठे किसी के लिए एम्बुलेंस खोजें"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mb-2"
  }, "मरीज़ की जगह लिखें — Google Maps पर वहाँ की ambulance services (नंबर सहित) दिखेंगी। पहले 108 आज़माएँ, वो मुफ़्त है।"), React.createElement("input", {
    value: loc,
    onChange: e => setLoc(e.target.value),
    placeholder: "गाँव/शहर, ज़िला — जैसे: बिरौल, दरभंगा, बिहार",
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: "#fff",
      color: T.ink
    },
    className: "w-full px-3 py-2.5 rounded-lg text-sm mb-2"
  }), React.createElement("button", {
    onClick: () => geoSearch(loc, "ambulance service"),
    style: {
      ...display,
      background: T.teal,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "inline-block px-4 py-2.5 rounded-xl font-bold text-sm"
  }, "📍 ", loc.trim() ? `"${loc.trim()}" के पास` : "मेरे नज़दीक", " एम्बुलेंस खोजें →")), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B",
      background: T.saffronSoft
    },
    className: "text-sm rounded-xl p-4"
  }, "💡 निजी एम्बुलेंस चाहिए? ऊपर अपनी जगह लिखकर ", React.createElement("b", null, "\"एम्बुलेंस खोजें\""), " दबाएँ — वहाँ की असली एम्बुलेंस सेवाएँ (नंबर सहित) Google Maps पर दिखेंगी। किराया फ़ोन पर पहले तय करें। आपातकाल में पहली पसंद हमेशा ", React.createElement("b", null, "108 (मुफ़्त)"), "।"));
}
const GOVT_LEVELS = [{
  level: "1",
  name: "उप-स्वास्थ्य केंद्र / आयुष्मान आरोग्य मंदिर",
  english: "Sub-Centre / Health & Wellness Centre",
  mapsSearch: "Health and Wellness Centre near me",
  where: "गाँव स्तर (3,000–5,000 आबादी पर)",
  staff: "CHO / ANM / आशा कार्यकर्ता",
  beds: "बिस्तर नहीं (OPD सेवा)",
  available: ["बच्चों का टीकाकरण", "गर्भवती महिलाओं की जाँच", "BP और शुगर की स्क्रीनिंग", "मलेरिया/बुखार की शुरुआती जाँच", "आम बीमारियों की मुफ़्त दवा", "परिवार नियोजन सेवाएँ"],
  notAvailable: "प्रसव (डिलीवरी), ऑपरेशन, भर्ती — इनके लिए PHC/CHC जाएँ",
  tip: "यहीं से इलाज की शुरुआत करें — आशा दीदी/CHO आगे का रास्ता बताएँगे।"
}, {
  level: "2",
  name: "प्राथमिक स्वास्थ्य केंद्र (PHC)",
  english: "Primary Health Centre",
  mapsSearch: "Primary Health Centre PHC near me",
  where: "बड़े गाँव/ग्रामीण क्षेत्र (20,000–30,000 आबादी पर)",
  staff: "MBBS डॉक्टर + नर्स + फार्मासिस्ट",
  beds: "4–6 बिस्तर",
  available: ["डॉक्टर से OPD जाँच", "सामान्य (normal) प्रसव", "बुखार, दस्त, संक्रमण का इलाज", "छोटी लैब जाँचें (खून, पेशाब, मलेरिया)", "मुफ़्त ज़रूरी दवाएँ", "टीबी की दवा (DOTS)"],
  notAvailable: "ऑपरेशन, सिज़ेरियन, X-ray, विशेषज्ञ डॉक्टर — इनके लिए CHC/अनुमंडल जाएँ",
  tip: "सामान्य बीमारी में सीधे ज़िला अस्पताल न भागें — PHC पर भीड़ कम और दवा मुफ़्त मिलती है।"
}, {
  level: "3",
  name: "सामुदायिक स्वास्थ्य केंद्र (CHC) — ब्लॉक अस्पताल",
  english: "Community Health Centre — Block level",
  mapsSearch: "Community Health Centre CHC near me",
  where: "ब्लॉक मुख्यालय (80,000–1,20,000 आबादी पर)",
  staff: "विशेषज्ञ डॉक्टर (सर्जन, स्त्री रोग, शिशु रोग, फिजिशियन)",
  beds: "30 बिस्तर",
  available: ["24x7 आपातकालीन सेवा", "भर्ती करके इलाज", "सामान्य प्रसव + कई जगह सिज़ेरियन", "छोटे-मध्यम ऑपरेशन", "X-ray और बेहतर लैब", "नवजात शिशु देखभाल", "साँप काटने/ज़हर का शुरुआती इलाज"],
  notAvailable: "बड़ी सर्जरी, ICU, डायलिसिस, blood bank — इनके लिए अनुमंडल/ज़िला अस्पताल",
  tip: "रात-बिरात की emergency में नज़दीकी CHC सबसे तेज़ विकल्प है — 108 एम्बुलेंस यहीं ले जाती है।"
}, {
  level: "4",
  name: "अनुमंडल / उप-मंडल अस्पताल (SDH)",
  english: "Sub-Divisional Hospital",
  mapsSearch: "Sub divisional civil hospital near me",
  where: "अनुमंडल (sub-division) मुख्यालय",
  staff: "कई विभागों के विशेषज्ञ डॉक्टर",
  beds: "31–100 बिस्तर",
  available: ["CHC की सभी सेवाएँ + ज़्यादा विशेषज्ञ", "सिज़ेरियन प्रसव", "हड्डी, आँख, दाँत की OPD (ज़्यादातर जगह)", "blood storage unit", "बड़ी लैब जाँचें", "अल्ट्रासाउंड (कई जगह)"],
  notAvailable: "super-specialty इलाज (दिल का ऑपरेशन, कैंसर का पूरा इलाज, न्यूरो सर्जरी)",
  tip: "CHC से रेफर होकर आएँ तो पर्ची साथ रखें — इलाज की कड़ी जुड़ी रहती है।"
}, {
  level: "5",
  name: "ज़िला अस्पताल",
  english: "District Hospital",
  mapsSearch: "District hospital civil hospital near me",
  where: "ज़िला मुख्यालय",
  staff: "लगभग सभी प्रमुख विभागों के विशेषज्ञ",
  beds: "100–500 बिस्तर",
  available: ["ICU / आपातकालीन गहन देखभाल", "Blood Bank", "बड़े ऑपरेशन", "नवजात गहन देखभाल (SNCU)", "डायलिसिस (ज़्यादातर ज़िलों में)", "CT स्कैन (कई ज़िलों में)", "मानसिक रोग OPD", "कैंसर की शुरुआती जाँच/कीमो (कुछ ज़िलों में)"],
  notAvailable: "कुछ super-specialty सेवाएँ — उनके लिए मेडिकल कॉलेज रेफर किया जाता है",
  tip: "गंभीर मरीज़ को सीधे यहाँ लाना सही है। आयुष्मान कार्ड यहाँ पूरी तरह चलता है।"
}, {
  level: "6",
  name: "मेडिकल कॉलेज / राजधानी के बड़े अस्पताल",
  english: "Medical College / State-level Hospital",
  mapsSearch: "Government medical college hospital near me",
  where: "बड़े शहर / राज्य की राजधानी (जैसे राजिंदरा अस्पताल पटियाला, PGI चंडीगढ़)",
  staff: "प्रोफ़ेसर स्तर के डॉक्टर + super-specialists",
  beds: "500–2000+ बिस्तर",
  available: ["दिल का ऑपरेशन / एंजियोप्लास्टी", "कैंसर का पूरा इलाज (सर्जरी, कीमो, रेडिएशन)", "न्यूरो सर्जरी", "किडनी ट्रांसप्लांट (कुछ जगह)", "MRI/CT और उन्नत जाँचें", "Trauma Centre (गंभीर दुर्घटना)"],
  notAvailable: "—",
  tip: "भीड़ बहुत होती है — रेफरल पर्ची और पुराने काग़ज़ ज़रूर लाएँ, OPD registration सुबह जल्दी होता है।"
}];
const GOVT_SCHEMES = [{
  icon: "🟩",
  name: "आयुष्मान भारत (PM-JAY) कार्ड",
  detail: "पात्र परिवारों को हर साल ₹5 लाख तक का मुफ़्त इलाज — सरकारी और सूचीबद्ध निजी अस्पतालों में। अस्पताल के 'Ayushman Mitra' काउंटर पर कार्ड दिखाएँ।"
}, {
  icon: "🚑",
  name: "108 एम्बुलेंस (मुफ़्त)",
  detail: "किसी भी आपातकाल में — दुर्घटना, हार्ट अटैक, प्रसव पीड़ा। 102 गर्भवती महिलाओं और बच्चों के लिए।"
}, {
  icon: "🤰",
  name: "जननी सुरक्षा योजना (JSY/JSSK)",
  detail: "सरकारी अस्पताल में प्रसव पूरी तरह मुफ़्त — दवा, जाँच, खाना, एम्बुलेंस, ऑपरेशन सब। साथ में नक़द सहायता भी।"
}, {
  icon: "💊",
  name: "मुफ़्त दवा और जाँच",
  detail: "सरकारी अस्पतालों में ज़रूरी दवाएँ और कई जाँचें मुफ़्त। टीबी (DOTS), HIV (ART), टीकाकरण — हमेशा मुफ़्त।"
}, {
  icon: "🧠",
  name: "Tele-MANAS: 14416",
  detail: "मानसिक परेशानी में मुफ़्त फ़ोन सलाह, 24x7, हिंदी-पंजाबी समेत कई भाषाओं में।"
}];
function GovtHospitalGuide() {
  const [open, setOpen] = useState(null);
  const [loc, setLoc] = useState("");
  const [gState, setGState] = useState("Punjab");
  const [gDist, setGDist] = useState("");
  const [infra, setInfra] = useState(null);
  const [gfac, setGfac] = useState(null);
  useEffect(() => {
    fetch("./data/govt_infra.json").then(r => r.json()).then(setInfra).catch(() => {});
    fetch("./data/govt_facilities.json").then(r => r.json()).then(setGfac).catch(() => {});
  }, []);
  useEffect(() => {
    if (!infra || !infra[gState]) return;
    if (!infra[gState].find(x => x.d === gDist)) {
      const pref = infra[gState].find(x => /Patiala/i.test(x.d)) || infra[gState][0];
      setGDist(pref ? pref.d : "");
    }
  }, [infra, gState]);
  const gStates = infra ? Object.keys(infra).sort() : [];
  const gDistricts = infra && infra[gState] ? infra[gState] : [];
  const gCur = gDistricts.find(x => x.d === gDist);
  const gFacList = (gfac && gfac[gState] ? gfac[gState] : []).filter(f => !gDist || f.dist && f.dist.toLowerCase() === gDist.toLowerCase());
  const searchGovtHospital = async () => {
    const q = loc.trim();
    if (!q) {
      window.open("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("government hospital near me"), "_blank");
      return;
    }
    try {
      const r = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=" + encodeURIComponent(q));
      const j = await r.json();
      if (j && j[0] && j[0].lat && j[0].lon) {
        window.open(`https://www.google.com/maps/search/government+hospital/@${j[0].lat},${j[0].lon},13z`, "_blank");
        return;
      }
    } catch (e) {}
    window.open("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("government hospital in " + q + ", India"), "_blank");
  };
  return React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "सरकारी अस्पताल गाइड"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "कौन-सा सरकारी अस्पताल किस स्तर का है, वहाँ किस हद तक इलाज मिलता है, और कब ऊपर के अस्पताल जाना चाहिए।"), React.createElement("div", {
    style: {
      background: T.card,
      border: `1.5px solid ${T.teal}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-base mb-1"
  }, "🏥 अपने ज़िले का सरकारी स्वास्थ्य ढाँचा"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mb-3"
  }, "राज्य और ज़िला चुनें — वहाँ कितने सरकारी स्वास्थ्य केंद्र व अस्पताल हैं, देखें।"), React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-3"
  }, React.createElement("select", {
    value: gState,
    onChange: e => setGState(e.target.value),
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: "#fff",
      color: T.ink
    },
    className: "px-3 py-2 rounded-lg text-sm font-semibold"
  }, gStates.map(s => React.createElement("option", {
    key: s
  }, s))), React.createElement("select", {
    value: gDist,
    onChange: e => setGDist(e.target.value),
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: "#fff",
      color: T.ink
    },
    className: "px-3 py-2 rounded-lg text-sm font-semibold"
  }, gDistricts.map(d => React.createElement("option", {
    key: d.d
  }, d.d)))), gCur && React.createElement("div", null, React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-2"
  }, [["उप-केंद्र", gCur.sc], ["PHC", gCur.phc], ["CHC", gCur.chc], ["उप-मंडल अस्पताल", gCur.sdh], ["ज़िला अस्पताल", gCur.dh]].map(([label, n]) => React.createElement("div", {
    key: label,
    style: {
      background: T.tealSoft,
      border: `1px solid ${T.teal}`
    },
    className: "rounded-lg px-3 py-2 text-center"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.teal
    },
    className: "text-lg font-bold leading-none"
  }, n), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mt-1"
  }, label)))), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs"
  }, gDist, " ज़िले का सरकारी ग्रामीण स्वास्थ्य ढाँचा। इलाज सामान्यतः मुफ़्त/बहुत सस्ता होता है।")), gFacList.length > 0 && React.createElement("div", {
    className: "mt-3"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold mb-2"
  }, "इस राज्य/ज़िले के कुछ सरकारी केंद्र:"), gFacList.slice(0, 20).map((f, i) => React.createElement("div", {
    key: i,
    style: {
      background: "#fff",
      border: `1px solid ${T.line}`
    },
    className: "rounded-lg p-2.5 mb-2"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold"
  }, f.n), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs"
  }, [f.t, f.a, f.pin].filter(Boolean).join(" · ")), f.ph && React.createElement("div", {
    style: {
      ...body,
      color: T.teal
    },
    className: "text-xs font-semibold mt-0.5"
  }, "📞 ", f.ph)))), React.createElement("div", {
    style: {
      ...body,
      color: "#8595A5"
    },
    className: "text-xs mt-3"
  }, "स्रोत: data.gov.in (ग्रामीण स्वास्थ्य आँकड़े / National Health Portal) — GODL-India. आँकड़े पुराने हो सकते हैं; जाने से पहले पुष्टि करें।")), React.createElement("div", {
    style: {
      background: T.tealSoft,
      border: `1.5px solid ${T.teal}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold mb-1"
  }, "👨‍👩‍👧 किसी और के लिए खोज रहे हैं? (जैसे गाँव में माता-पिता के लिए)"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mb-2"
  }, "उनकी जगह लिखें — गाँव के साथ ज़िला व राज्य भी लिखें तो ज़्यादा सही नतीजे मिलेंगे (जैसे: घनश्यामपुर, दरभंगा, बिहार)। ख़ाली छोड़ेंगे तो आपके नज़दीक खोजेगा।"), React.createElement("input", {
    value: loc,
    onChange: e => setLoc(e.target.value),
    placeholder: "गाँव/शहर, ज़िला — जैसे: बिरौल, दरभंगा, बिहार",
    style: {
      ...body,
      border: `1.5px solid ${T.teal}`,
      background: "#fff",
      color: T.ink
    },
    className: "w-full px-3 py-2.5 rounded-lg text-sm"
  }), React.createElement("button", {
    onClick: searchGovtHospital,
    style: {
      ...display,
      background: T.teal,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "inline-block mt-2 px-5 py-2.5 rounded-lg font-bold text-sm"
  }, "🔍 इस जगह के नज़दीकी सरकारी अस्पताल खोजें →")), React.createElement("div", {
    style: {
      background: T.card,
      border: `1.5px solid ${T.saffron}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-base mb-1"
  }, "🇮🇳 पूरे भारत के सरकारी अस्पताल — official सरकारी portal से खोजें"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mb-3"
  }, "ये भारत सरकार की अपनी websites हैं — सबसे भरोसेमंद और हमेशा updated जानकारी।"), React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, React.createElement("a", {
    href: "https://hospitals.pmjay.gov.in/Search/",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...display,
      background: T.teal,
      color: "#fff"
    },
    className: "inline-block px-4 py-2.5 rounded-xl font-bold text-sm no-underline"
  }, "🟩 आयुष्मान (PM-JAY) अस्पताल खोजें →"), React.createElement("a", {
    href: "https://facility.abdm.gov.in/searchV2",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...display,
      background: T.ink,
      color: "#fff"
    },
    className: "inline-block px-4 py-2.5 rounded-xl font-bold text-sm no-underline"
  }, "🏥 सभी health facilities खोजें (HFR) →")), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3"
    },
    className: "text-xs mt-2"
  }, "PM-JAY portal पर district चुनकर ₹5 लाख वाली मुफ़्त इलाज सुविधा वाले अस्पताल दिखेंगे — सरकारी और private दोनों।")), React.createElement("div", {
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm font-bold mb-2"
  }, "इलाज की सीढ़ी (referral chain):"), React.createElement("div", {
    style: {
      ...body,
      color: T.teal
    },
    className: "text-sm font-semibold leading-relaxed"
  }, "गाँव का केंद्र → PHC → ब्लॉक (CHC) → अनुमंडल → ज़िला अस्पताल → मेडिकल कॉलेज"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mt-2"
  }, "छोटी बीमारी नीचे के स्तर पर ही ठीक हो जाती है — भीड़ कम, दवा मुफ़्त, घर के पास। गंभीर होने पर डॉक्टर ख़ुद ऊपर रेफर करते हैं।")), GOVT_LEVELS.map(g => {
    const isOpen = open === g.level;
    return React.createElement("div", {
      key: g.level,
      style: {
        background: T.card,
        border: `1px solid ${isOpen ? T.teal : T.line}`
      },
      className: "rounded-xl mb-3 overflow-hidden"
    }, React.createElement("button", {
      onClick: () => setOpen(isOpen ? null : g.level),
      className: "w-full text-left px-4 py-3 flex items-center gap-3"
    }, React.createElement("div", {
      style: {
        ...display,
        background: T.tealSoft,
        color: T.teal
      },
      className: "w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-base shrink-0"
    }, g.level), React.createElement("div", {
      className: "flex-1"
    }, React.createElement("div", {
      style: {
        ...display,
        color: T.ink
      },
      className: "font-bold text-base leading-tight"
    }, g.name), React.createElement("div", {
      style: {
        ...body,
        color: "#5A6B7B"
      },
      className: "text-xs"
    }, g.english, " · ", g.beds)), React.createElement("span", {
      style: {
        color: T.teal
      }
    }, isOpen ? "▲" : "▼")), isOpen && React.createElement("div", {
      className: "px-4 pb-4"
    }, React.createElement("div", {
      style: {
        ...body,
        color: T.ink
      },
      className: "text-sm mb-2"
    }, React.createElement("b", null, "कहाँ होता है:"), " ", g.where, React.createElement("br", null), React.createElement("b", null, "स्टाफ़:"), " ", g.staff), React.createElement("div", {
      style: {
        ...body,
        color: T.ink
      },
      className: "text-sm font-bold mb-1"
    }, "✅ यहाँ क्या इलाज मिलता है:"), React.createElement("ul", {
      className: "mb-3"
    }, g.available.map((s, i) => React.createElement("li", {
      key: i,
      style: {
        ...body,
        color: T.ink
      },
      className: "text-sm mb-1"
    }, "• ", s))), g.notAvailable !== "—" && React.createElement("div", {
      style: {
        ...body,
        color: T.red,
        background: T.redSoft
      },
      className: "text-sm rounded-lg p-3 mb-3"
    }, "❌ ", React.createElement("b", null, "यहाँ नहीं:"), " ", g.notAvailable), React.createElement("div", {
      style: {
        ...body,
        color: "#5A6B7B",
        background: T.saffronSoft
      },
      className: "text-sm rounded-lg p-3 mb-3"
    }, "💡 ", g.tip), React.createElement("button", {
      onClick: () => geoSearch(loc, g.mapsSearch.replace(" near me", "")),
      style: {
        ...display,
        background: T.teal,
        color: "#fff",
        border: "none",
        cursor: "pointer"
      },
      className: "inline-block px-4 py-2.5 rounded-xl font-bold text-sm"
    }, "📍 ", loc.trim() ? `"${loc.trim()}" के पास` : "मेरे नज़दीक", " ", g.name.split("/")[0].split("(")[0].trim(), " खोजें →")));
  }), React.createElement("h2", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-lg font-bold mt-6 mb-2"
  }, "मुफ़्त योजनाएँ जो आपका हक़ हैं"), GOVT_SCHEMES.map(s => React.createElement("div", {
    key: s.name,
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-2"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-sm"
  }, s.icon, " ", s.name), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm"
  }, s.detail))), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3"
    },
    className: "text-xs mt-3"
  }, "* सेवाएँ राज्य और अस्पताल के हिसाब से थोड़ी अलग हो सकती हैं। अपने नज़दीकी अस्पताल में उपलब्ध सेवाओं की पुष्टि वहाँ के काउंटर या 104 हेल्थ हेल्पलाइन से करें।"));
}
const JOIN_OPTIONS = [{
  icon: "🩺",
  title: "डॉक्टर",
  sub: "NMC verification के बाद ✓ Verified listing",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSd_Cq61E2_g627oZl2wCW9i4azIMaomIn2uWmfmUqOoFi678A/viewform"
}, {
  icon: "🔬",
  title: "पैथोलॉजी लैब",
  sub: "NABL व home collection की जानकारी के साथ",
  url: "https://docs.google.com/forms/d/e/1FAIpQLScPmbxEViUjhjxt6z7y6BRxV4ACKgOVdMaZXFpks6qCBTs_kA/viewform"
}, {
  icon: "🚑",
  title: "एम्बुलेंस सेवा",
  sub: "24x7 और ICU/Oxygen की जानकारी के साथ",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSf97t1MzS_hAbW10zAd6_xpYkpOd_j8Iw7ISSZqmXuII35cwg/viewform"
}, {
  icon: "💊",
  title: "दवा दुकान",
  sub: "24 घंटे खुली दुकानों को ख़ास जगह",
  url: "https://docs.google.com/forms/d/e/1FAIpQLSettdi9znz1XTL4RHv2oliKXw7wYwvNyCFHKay_24QDPpWVfg/viewform"
}];
function JoinTab() {
  return React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "➕ हमसे जुड़ें — मुफ़्त listing"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "डॉक्टर, लैब, एम्बुलेंस या दवा दुकान — 2 मिनट का form भरें, verification के बाद आपकी listing live हो जाएगी। कोई फ़ीस नहीं।"), JOIN_OPTIONS.map(o => React.createElement("div", {
    key: o.title,
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-4 mb-3 flex items-center gap-4"
  }, React.createElement("div", {
    className: "text-3xl"
  }, o.icon), React.createElement("div", {
    className: "flex-1"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "font-bold text-base"
  }, o.title), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs"
  }, o.sub)), o.url ? React.createElement("a", {
    href: o.url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      ...display,
      background: T.saffron,
      color: "#fff"
    },
    className: "px-4 py-2.5 rounded-xl font-bold text-sm no-underline shrink-0"
  }, "Form भरें →") : React.createElement("span", {
    style: {
      ...body,
      background: T.tealSoft,
      color: T.teal
    },
    className: "px-3 py-2 rounded-xl font-bold text-xs shrink-0"
  }, "जल्द आ रहा है"))), React.createElement("div", {
    style: {
      ...body,
      color: T.ink,
      background: T.saffronSoft
    },
    className: "text-sm rounded-xl p-4 mt-2"
  }, "💡 ", React.createElement("b", null, "Verification क्यों?"), " हर doctor का NMC/State registration जाँचने के बाद ही listing live होती है — इसीलिए सहीDoctor पर लोग भरोसा करते हैं, और इसीलिए आपकी ✓ Verified listing की क़ीमत है।"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs mt-3"
  }, "कोई सवाल? info@quaitronix.com पर लिखें।"));
}
function SahiDoctor() {
  const [tab, setTab] = useState(function () {
    var V = ["checker", "diseases", "doctors", "labs", "govt", "ambulance", "pharmacy", "join", "about"];
    try {
      if (window.SD_ACTIVE_TAB && V.indexOf(window.SD_ACTIVE_TAB) >= 0) return window.SD_ACTIVE_TAB;
    } catch (e) {}
    return "checker";
  });
  useEffect(() => {
    const VALID = ["checker", "diseases", "doctors", "labs", "govt", "ambulance", "pharmacy", "join", "about"];
    const getTab = () => {
      try {
        const q = (new URLSearchParams(window.location.search).get("tab") || "").toLowerCase();
        if (VALID.includes(q)) return q;
      } catch (e) {}
      const h = (window.location.hash || "").replace("#", "").toLowerCase();
      if (VALID.includes(h)) return h;
      return null;
    };
    const apply = () => {
      const t = getTab();
      if (t) setTab(t);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [statesList, setStatesList] = useState([]);
  const [stateCode, setStateCode] = useState("3");
  const [stateData, setStateData] = useState(null);
  const [districtCode, setDistrictCode] = useState("");
  const [subName, setSubName] = useState("");
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [pendingDist, setPendingDist] = useState("Patiala");
  const [spec, setSpec] = useState(function () {
    try {
      var s = new URLSearchParams(window.location.search).get("spec");
      if (s) return s;
    } catch (e) {}
    return "All";
  });
  const [sortAsc, setSortAsc] = useState(true);
  const nrm = s => (s || "").toLowerCase().replace(/\s*\(ut\)\s*/, "").trim();
  useEffect(() => {
    fetch("./data/states.json").then(r => r.json()).then(setStatesList).catch(() => {});
  }, []);
  useEffect(() => {
    if (!stateCode) return;
    fetch(`./data/states/${stateCode}.json`).then(r => r.json()).then(d => {
      setStateData(d);
      let pick = null;
      if (pendingDist) pick = d.districts.find(x => nrm(x.name) === nrm(pendingDist));
      if (!pick) pick = d.districts.find(x => x.code === districtCode) || d.districts[0];
      setPendingDist("");
      setDistrictCode(pick.code);
      const sd = pick.subs.find(s => nrm(s.name) === nrm(pick.name)) || pick.subs[0] || {};
      setSubName(sd.name || "");
    }).catch(() => {});
  }, [stateCode]);
  const onDistrictChange = dc => {
    setDistrictCode(dc);
    const dist = (stateData.districts || []).find(x => x.code === dc);
    setSubName(((dist.subs || [])[0] || {}).name || "");
  };
  const searchPin = () => {
    const p = pin.trim();
    if (!/^\d{6}$/.test(p)) {
      setPinMsg("6 अंकों का PIN डालें");
      return;
    }
    setPinMsg("खोज रहे हैं…");
    fetch(`https://api.postalpincode.in/pincode/${p}`).then(r => r.json()).then(j => {
      const po = j && j[0] && j[0].PostOffice && j[0].PostOffice[0];
      if (!po) {
        setPinMsg("PIN नहीं मिला — dropdown से चुनें");
        return;
      }
      const st = statesList.find(s => nrm(s.name) === nrm(po.State));
      if (st) {
        setPendingDist(po.District);
        setStateCode(st.code);
      }
      setPinMsg(`📍 ${po.District}, ${po.State}`);
    }).catch(() => setPinMsg("खोज असफल — dropdown से चुनें"));
  };
  const toggle = id => {
    setShowResult(false);
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  };
  const result = useMemo(() => {
    if (!selected.length) return null;
    const score = {};
    selected.forEach(id => {
      const sym = ALL_SYMPTOMS.find(s => s.id === id);
      sym.specs.forEach((sp, i) => {
        score[sp] = (score[sp] || 0) + (i === 0 ? 2 : 1);
      });
    });
    const ranked = Object.entries(score).sort((a, b) => b[1] - a[1]);
    const top = ranked[0][0];
    const hasRedFlag = selected.some(id => RED_FLAG_IDS.has(id));
    const reasons = selected.map(id => ALL_SYMPTOMS.find(s => s.id === id).label);
    return {
      top,
      second: ranked[1]?.[0],
      hasRedFlag,
      reasons
    };
  }, [selected]);
  const currentDistrict = (stateData ? stateData.districts : []).find(x => x.code === districtCode);
  const districts = stateData ? stateData.districts : [];
  const subs = currentDistrict ? currentDistrict.subs : [];
  const stateNm = ((statesList.find(s => s.code === stateCode) || {}).name || "").replace(/\s*\(UT\)\s*/, "");
  const findDoctors = () => {
    const loc = [subName, currentDistrict && currentDistrict.name, stateNm].filter(Boolean).join(", ");
    const kw = spec && spec !== "All" ? spec + " doctor" : "doctor clinic";
    geoSearch(loc, kw);
  };
  const goToDoctors = specialty => {
    const s = SPECIALTIES.some(x => x.v === specialty) ? specialty : "All";
    window.location.href = "doctor-khojen.html?spec=" + encodeURIComponent(s);
  };
  return React.createElement("div", {
    style: {
      background: "transparent",
      minHeight: "100vh"
    }
  }, React.createElement("style", null, fontImport), React.createElement("header", {
    style: {
      background: T.ink
    },
    className: "px-4 py-4"
  }, React.createElement("div", {
    className: "max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-2"
  }, React.createElement("div", null, React.createElement("a", {
    href: "index.html",
    style: {
      ...display,
      color: "#fff",
      textDecoration: "none"
    },
    className: "text-2xl font-extrabold leading-tight block"
  }, "सही", React.createElement("span", {
    style: {
      color: T.saffron
    }
  }, "Doctor")), React.createElement("div", {
    style: {
      ...body,
      color: "#B9C7D6"
    },
    className: "text-xs"
  }, "लक्षण पहचानें · सही डॉक्टर चुनें · फ़ीस तुलना करें")), React.createElement("nav", {
    className: "flex gap-1 flex-wrap"
  }, [["checker", "लक्षण जाँच", "lakshan-janch.html"], ["diseases", "बीमारी गाइड", "bimari-guide.html"], ["doctors", "डॉक्टर खोजें", "doctor-khojen.html"], ["labs", "जाँच-लैब", "lab-janch.html"], ["govt", "सरकारी अस्पताल", "sarkari-aspatal.html"], ["ambulance", "🚑 एम्बुलेंस", "ambulance.html"], ["pharmacy", "💊 दवा दुकान", "dawa-dukan.html"], ["join", "➕ जुड़ें", "juden.html"], ["about", "जानकारी", "jankari.html"]].map(([k, l, href]) => React.createElement("a", {
    key: k,
    href: href,
    style: {
      ...body,
      background: tab === k ? T.saffron : "transparent",
      color: tab === k ? "#fff" : "#B9C7D6",
      textDecoration: "none"
    },
    className: "px-3 py-1.5 rounded-lg text-sm font-semibold"
  }, l))))), React.createElement("main", {
    className: "max-w-3xl mx-auto px-4 py-6"
  }, tab === "checker" && React.createElement("div", {
    className: "pb-24"
  }, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "आपको क्या तकलीफ़ है? / What symptoms do you have?"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "नीचे से अपने लक्षण चुनें — हम बताएँगे किस डॉक्टर के पास जाना चाहिए।"), SYMPTOM_GROUPS.map(g => React.createElement("div", {
    key: g.group,
    className: "mb-4"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.teal
    },
    className: "text-sm font-bold mb-2 uppercase tracking-wide"
  }, g.group), React.createElement("div", {
    className: "flex flex-wrap"
  }, g.items.map(s => React.createElement(Chip, {
    key: s.id,
    active: selected.includes(s.id),
    redFlag: s.redFlag,
    label: s.label,
    onClick: () => toggle(s.id)
  }))))), selected.length > 0 && !showResult && React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 16,
      left: "50%",
      transform: "translateX(-50%)",
      background: T.ink,
      boxShadow: "0 8px 24px rgba(29,53,87,0.35)",
      zIndex: 50
    },
    className: "rounded-2xl px-4 py-3 flex items-center gap-3 w-11/12 max-w-md"
  }, React.createElement("div", {
    style: {
      ...body,
      color: "#B9C7D6"
    },
    className: "text-sm flex-1"
  }, React.createElement("b", {
    style: {
      color: "#fff"
    }
  }, selected.length), " लक्षण चुने गए"), React.createElement("button", {
    onClick: () => {
      setSelected([]);
      setShowResult(false);
    },
    style: {
      ...body,
      color: "#B9C7D6"
    },
    className: "text-sm font-semibold px-2"
  }, "साफ़ करें"), React.createElement("button", {
    onClick: () => setShowResult(true),
    style: {
      ...display,
      background: T.saffron,
      color: "#fff"
    },
    className: "px-5 py-2.5 rounded-xl font-bold text-base"
  }, "डॉक्टर बताएँ →")), showResult && result && React.createElement("div", {
    className: "mt-6"
  }, result.hasRedFlag && React.createElement("div", {
    style: {
      background: T.redSoft,
      border: `1.5px solid ${T.red}`
    },
    className: "rounded-xl p-4 mb-4"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.red
    },
    className: "font-bold text-base"
  }, "⚠ आपातकालीन लक्षण! / Emergency symptom detected"), React.createElement("div", {
    style: {
      ...body,
      color: T.red
    },
    className: "text-sm"
  }, "देर न करें — तुरंत नज़दीकी अस्पताल की Emergency में जाएँ या ", React.createElement("b", null, "108"), " पर कॉल करें।")), React.createElement("div", {
    style: {
      background: T.card,
      border: `1px solid ${T.line}`,
      backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${T.ruled} 28px)`,
      boxShadow: "0 4px 16px rgba(29,53,87,0.08)"
    },
    className: "rounded-xl p-5 relative overflow-hidden"
  }, React.createElement("div", {
    style: {
      ...display,
      color: T.teal,
      opacity: 0.18
    },
    className: "absolute top-2 right-4 text-6xl font-extrabold select-none"
  }, "℞"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs uppercase tracking-widest mb-1"
  }, "सुझाव पर्ची · Referral Slip"), React.createElement("div", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-2xl font-extrabold mb-1"
  }, result.top), result.second && React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-2"
  }, "दूसरा विकल्प: ", React.createElement("b", null, result.second)), React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm mb-3"
  }, React.createElement("b", null, "आपके लक्षण:"), " ", result.reasons.join(", ")), React.createElement("button", {
    onClick: () => goToDoctors(result.top),
    style: {
      ...display,
      background: T.saffron,
      color: "#fff"
    },
    className: "px-5 py-2.5 rounded-xl font-bold"
  }, "नज़दीकी ", result.top, " देखें →"), React.createElement("div", {
    style: {
      ...body,
      color: "#8A96A3",
      borderTop: `1px dashed ${T.line}`
    },
    className: "text-xs mt-4 pt-2"
  }, "यह केवल मार्गदर्शन है, चिकित्सीय निदान नहीं। This is guidance, not a medical diagnosis.")))), tab === "doctors" && React.createElement("div", null, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-1"
  }, "डॉक्टर खोजें"), React.createElement("p", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-sm mb-4"
  }, "अपना इलाका और विशेषज्ञता चुनें — नज़दीकी डॉक्टर Google Maps पर खोजें।"), React.createElement("div", {
    className: "flex flex-wrap gap-2 items-center mb-3"
  }, React.createElement("input", {
    value: pin,
    onChange: e => setPin(e.target.value),
    onKeyDown: e => e.key === "Enter" && searchPin(),
    placeholder: "PIN कोड (जैसे 147001)",
    inputMode: "numeric",
    maxLength: 6,
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink,
      width: 180
    },
    className: "px-3 py-2 rounded-lg text-sm"
  }), React.createElement("button", {
    onClick: searchPin,
    style: {
      ...body,
      background: T.teal,
      color: "#fff"
    },
    className: "px-4 py-2 rounded-lg text-sm font-semibold"
  }, "खोजें"), pinMsg && React.createElement("span", {
    style: {
      ...body,
      color: "#5A6B7B"
    },
    className: "text-xs"
  }, pinMsg)), React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, React.createElement("select", {
    value: stateCode,
    onChange: e => setStateCode(e.target.value),
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink
    },
    className: "px-3 py-2 rounded-lg text-sm font-semibold"
  }, statesList.map(s => React.createElement("option", {
    key: s.code,
    value: s.code
  }, s.name))), React.createElement("select", {
    value: districtCode,
    onChange: e => onDistrictChange(e.target.value),
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink
    },
    className: "px-3 py-2 rounded-lg text-sm font-semibold"
  }, districts.map(d => React.createElement("option", {
    key: d.code,
    value: d.code
  }, d.name))), React.createElement("select", {
    value: subName,
    onChange: e => setSubName(e.target.value),
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink
    },
    className: "px-3 py-2 rounded-lg text-sm font-semibold"
  }, subs.map(s => React.createElement("option", {
    key: s.code,
    value: s.name
  }, s.name))), React.createElement("select", {
    value: spec,
    onChange: e => setSpec(e.target.value),
    style: {
      ...body,
      border: `1.5px solid ${T.line}`,
      background: T.card,
      color: T.ink
    },
    className: "px-3 py-2 rounded-lg text-sm font-semibold"
  }, React.createElement("option", {
    value: "All"
  }, "सभी विशेषज्ञ (All)"), SPECIALTIES.map(s => React.createElement("option", {
    key: s.v,
    value: s.v
  }, s.l)))), React.createElement("button", {
    onClick: findDoctors,
    style: {
      ...display,
      background: T.teal,
      color: "#fff",
      border: "none",
      cursor: "pointer"
    },
    className: "w-full px-5 py-3 rounded-xl font-bold text-base mb-3"
  }, "🔍 इस इलाके में डॉक्टर खोजें (Google Maps) →"), React.createElement("div", {
    style: {
      ...body,
      color: "#5A6B7B",
      background: T.saffronSoft
    },
    className: "text-sm rounded-xl p-4 mb-3"
  }, "💡 ऊपर राज्य / ज़िला / तहसील चुनें (या PIN कोड डालें) और विशेषज्ञता चुनें — फिर बटन दबाएँ। उस इलाके के असली डॉक्टर (पता व नंबर सहित) Google Maps पर दिखेंगे।"), React.createElement("div", {
    style: {
      ...body,
      color: T.ink,
      background: T.tealSoft,
      border: `1px solid ${T.teal}`
    },
    className: "text-sm rounded-xl p-4"
  }, "✓ ", React.createElement("b", null, "SahiDoctor की verified डॉक्टर सूची जल्द आ रही है।"), " ", "डॉक्टर हैं?", " ", React.createElement("a", {
    href: "juden.html",
    style: {
      color: T.teal,
      fontWeight: 700,
      textDecoration: "underline",
      cursor: "pointer"
    }
  }, "अपनी clinic मुफ़्त जोड़ें →"))), tab === "diseases" && React.createElement(DiseaseGuide, {
    goToDoctors: goToDoctors
  }), tab === "labs" && React.createElement(LabsAndTests, null), tab === "govt" && React.createElement(GovtHospitalGuide, null), tab === "ambulance" && React.createElement(AmbulanceTab, null), tab === "pharmacy" && React.createElement(PharmacyTab, null), tab === "join" && React.createElement(JoinTab, null), tab === "about" && React.createElement("div", {
    style: {
      background: T.card,
      border: `1px solid ${T.line}`
    },
    className: "rounded-xl p-5"
  }, React.createElement("h1", {
    style: {
      ...display,
      color: T.ink
    },
    className: "text-xl font-bold mb-3"
  }, "सहीDoctor के बारे में"), React.createElement("div", {
    style: {
      ...body,
      color: T.ink
    },
    className: "text-sm space-y-3"
  }, React.createElement("p", null, "सहीDoctor आम लोगों के लिए बनाया गया है — ताकि लक्षण देखकर यह समझा जा सके कि", React.createElement("b", null, " किस विशेषज्ञ डॉक्टर के पास जाना चाहिए"), ", और अपने शहर में", React.createElement("b", null, " कम फ़ीस वाले अच्छे डॉक्टर"), " की तुलना की जा सके।"), React.createElement("p", null, React.createElement("b", null, "महत्वपूर्ण:"), " यह वेबसाइट चिकित्सीय सलाह या निदान नहीं देती। यह केवल शैक्षिक मार्गदर्शन है। किसी भी गंभीर लक्षण में तुरंत डॉक्टर से मिलें या 108 पर कॉल करें।"), React.createElement("p", null, React.createElement("b", null, "Important:"), " This website does not provide medical advice or diagnosis. It is educational guidance only. For any serious symptom, see a doctor immediately or call 108."), React.createElement("p", {
    style: {
      color: "#5A6B7B"
    }
  }, "डॉक्टर सूची में शामिल होने या जानकारी सुधारने के लिए संपर्क करें: info@quaitronix.com")))), React.createElement("footer", {
    style: {
      ...body,
      color: "#8A96A3"
    },
    className: "text-center text-xs py-6"
  }, "© 2026 सहीDoctor · केवल शैक्षिक उद्देश्य / Educational purpose only"));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(SahiDoctor, null));