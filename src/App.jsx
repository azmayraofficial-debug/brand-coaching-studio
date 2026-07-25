import { useState, useEffect, useRef } from "react";

// ── THEME ────────────────────────────────────────────────────────────────────
const O = "#F26522";
const O2 = "#FF8C42";
const OL = "#FFF3ED";
const OM = "#FDDCCC";
const DARK = "#111827";
const MID = "#374151";
const GRAY = "#6B7280";
const LGRAY = "#F3F4F6";
const WHITE = "#FFFFFF";

// ── MODULES ──────────────────────────────────────────────────────────────────
const MODULES = [
  {
    id: "identity",
    emoji: "🏷️",
    title: "Brand Identity",
    subtitle: "Fondasi nama, filosofi & kategori brand",
    color: "#7C3AED",
    bg: "#F5F3FF",
    scope: "branding",
    intro: "Modul pertama ini membangun fondasi brand kamu — siapa kamu, apa yang kamu jual, dan filosofi di balik brand tersebut. Jawaban di sini akan jadi DNA dari semua keputusan brand ke depannya.",
    questions: [
      { id: "brand_name", q: "Apa nama brand kamu?", hint: "Tulis nama brand persis seperti yang ingin digunakan secara publik.", placeholder: "contoh: Azmayra" },
      { id: "brand_philosophy", q: "Apa filosofi atau makna di balik nama brand kamu?", hint: "Ceritakan story atau nilai yang ingin brand kamu representasikan.", placeholder: "contoh: Azmayra berasal dari kata Arab yang berarti 'kuat & anggun' — mencerminkan muslimah aktif yang percaya diri" },
      { id: "product_category", q: "Produk atau jasa apa yang brand kamu tawarkan?", hint: "Jelaskan secara spesifik — kategori, jenis produk, dan apa yang membedakannya.", placeholder: "contoh: Pakaian olahraga syar'i untuk muslimah — hijab sport, baju olahraga modest, legging panjang" },
      { id: "brand_purpose", q: "Mengapa brand ini ada? Masalah apa yang ingin kamu selesaikan?", hint: "Ini adalah 'why' brand kamu — alasan keberadaan yang lebih dalam dari sekadar jual produk.", placeholder: "contoh: Muslimah Indonesia kesulitan menemukan pakaian olahraga yang syar'i tapi tetap fungsional dan stylish" },
    ]
  },
  {
    id: "audience",
    emoji: "👥",
    title: "Target Audiens",
    subtitle: "Siapa pelanggan ideal brand kamu",
    color: "#0891B2",
    bg: "#ECFEFF",
    scope: "branding",
    intro: "Mengenal audiens secara mendalam adalah kunci konten yang relevan dan produk yang laku. Di modul ini kita akan membedah siapa sebenarnya orang yang brand kamu tuju — bukan sekadar demografi, tapi psikologi dan perilaku mereka.",
    questions: [
      { id: "audience_demo", q: "Siapa target pelanggan utama kamu secara demografis?", hint: "Usia, gender, lokasi, pekerjaan, status sosial ekonomi.", placeholder: "contoh: Perempuan muslimah, 20-35 tahun, tinggal di kota besar, pekerja atau mahasiswa, middle class" },
      { id: "audience_psycho", q: "Apa nilai, gaya hidup, dan aspirasi mereka?", hint: "Apa yang mereka perjuangkan? Apa yang mereka takutkan? Apa mimpi mereka?", placeholder: "contoh: Ingin hidup sehat & aktif tanpa mengorbankan identitas muslimah mereka. Takut dianggap 'ketinggalan zaman' kalau berolahraga pakai pakaian biasa" },
      { id: "audience_behavior", q: "Di mana mereka aktif dan bagaimana mereka belanja?", hint: "Platform media sosial, cara riset produk, faktor keputusan beli.", placeholder: "contoh: Aktif di Instagram & TikTok, sering cek review sebelum beli, terpengaruh rekomendasi influencer fitness muslimah" },
      { id: "audience_pain", q: "Apa frustrasi terbesar mereka yang berhubungan dengan produk/jasa kamu?", hint: "Pain point spesifik yang brand kamu bisa selesaikan.", placeholder: "contoh: Susah cari baju olahraga yang menutup aurat tapi nggak gerah dan nggak kelihatan 'nenek-nenek'" },
    ]
  },
  {
    id: "competitor",
    emoji: "🔭",
    title: "Lanskap Kompetitor",
    subtitle: "Peta persaingan & celah pasar",
    color: "#B45309",
    bg: "#FFFBEB",
    scope: "branding",
    intro: "Memahami kompetitor bukan berarti meniru mereka — justru sebaliknya. Kita akan memetakan siapa saja pemain di pasar ini dan mencari celah yang bisa brand kamu masuki dengan unik.",
    questions: [
      { id: "competitors_main", q: "Siapa 2-4 kompetitor utama brand kamu?", hint: "Sebutkan nama brand dan apa yang mereka jual.", placeholder: "contoh: HIA Everywear (modest activewear premium), Nusseyba (hijab sport lokal), Uniqlo (modest basic), Nike Women (mainstream)" },
      { id: "competitors_strength", q: "Apa kekuatan utama kompetitor tersebut?", hint: "Mengapa pelanggan memilih mereka? Apa yang mereka lakukan dengan baik?", placeholder: "contoh: HIA Everywear — branding premium & komunitas kuat. Nusseyba — harga terjangkau & varian warna banyak" },
      { id: "competitors_gap", q: "Apa yang TIDAK dilakukan kompetitor? Celah apa yang ada di pasar?", hint: "Ini adalah peluang brand kamu — area yang belum diisi dengan baik oleh siapapun.", placeholder: "contoh: Belum ada yang membangun komunitas fitness muslimah yang kuat + konten edukasi gaya hidup sehat dalam bingkai Islam" },
      { id: "brand_diff", q: "Apa yang membuat brand kamu berbeda dari semua kompetitor itu?", hint: "Perbedaan yang nyata — bukan sekadar 'kualitas lebih baik' tapi sesuatu yang spesifik.", placeholder: "contoh: Azmayra satu-satunya yang memadukan desain teknikal (moisture-wicking, UPF protection) dengan estetika modest fashion Indonesia" },
    ]
  },
  {
    id: "positioning",
    emoji: "🎯",
    title: "Positioning & USP",
    subtitle: "Tempat brand kamu di benak pelanggan",
    color: "#DC2626",
    bg: "#FEF2F2",
    scope: "branding",
    intro: "Brand positioning menentukan 'slot' brand kamu di benak pelanggan — ketika mereka butuh produk seperti milikmu, kamu ingin jadi pilihan pertama yang terlintas. Modul ini merumuskan posisi itu dengan tajam.",
    questions: [
      { id: "usp", q: "Apa Unique Selling Proposition (USP) brand kamu dalam satu kalimat?", hint: "Satu kalimat yang menjelaskan kenapa pelanggan harus memilih kamu dibanding yang lain.", placeholder: "contoh: Azmayra adalah satu-satunya activewear muslimah yang dirancang khusus untuk iklim tropis Indonesia dengan teknologi anti-gerah" },
      { id: "positioning_statement", q: "Lengkapi: 'Brand kami untuk [siapa], yang ingin [apa], kami berbeda karena [mengapa]'", hint: "Positioning statement klasik yang membantu mengarahkan semua komunikasi brand.", placeholder: "contoh: Untuk muslimah aktif Indonesia, yang ingin berolahraga dengan percaya diri tanpa mengorbankan nilai diri, Azmayra hadir dengan desain yang nyaman, fungsional, dan tetap syar'i" },
      { id: "brand_goal", q: "Apa tujuan brand kamu yang ingin dicapai dalam 1-2 tahun ke depan?", hint: "Tujuan yang spesifik dan terukur — bisa berupa revenue, komunitas, awareness, atau pangsa pasar.", placeholder: "contoh: Menjadi top 3 modest activewear brand di Indonesia dengan 50.000+ pelanggan aktif dan komunitas fitness muslimah 100K followers" },
      { id: "brand_tagline", q: "Coba tulis 1-3 kandidat tagline untuk brand kamu", hint: "Tagline yang pendek, mudah diingat, dan merepresentasikan brand promise kamu.", placeholder: "contoh: 'Move with Faith' / 'Aktif Tanpa Batas' / 'Strong. Modest. You.'" },
    ]
  },
  {
    id: "communication",
    emoji: "💬",
    title: "Komunikasi Brand",
    subtitle: "Suara, karakter & pesan utama brand",
    color: "#059669",
    bg: "#ECFDF5",
    scope: "branding",
    intro: "Brand yang kuat punya suara yang konsisten — dari caption Instagram sampai kemasan produk, semuanya terasa seperti datang dari 'orang' yang sama. Modul ini membangun karakter komunikasi brand kamu.",
    questions: [
      { id: "brand_personality", q: "Jika brand kamu adalah seseorang, bagaimana kepribadiannya?", hint: "Pilih 3-5 kata sifat, lalu jelaskan singkat. Bayangkan brand kamu sebagai teman pelanggan.", placeholder: "contoh: Energetik, hangat, supportif, autentik, modern. Seperti teman dekat yang aktif, selalu support kamu berolahraga tanpa menghakimi" },
      { id: "tone_manner", q: "Bagaimana tone komunikasi brand kamu? Dan apa yang TIDAK boleh dilakukan?", hint: "Tone adalah cara brand berbicara — formal/informal, serius/playful, dll. Tentukan juga yang dilarang.", placeholder: "contoh: Tone: kasual tapi bermartabat, motivatif tapi realistis, islami tapi inklusif. Hindari: bahasa menggurui, terlalu formal, konten yang mempermalukan tubuh (body shaming)" },
      { id: "one_single_message", q: "Apa SATU pesan terpenting yang ingin brand kamu tinggalkan di benak pelanggan?", hint: "Ini adalah 'One Single Message' — jika pelanggan hanya mengingat satu hal tentang brand kamu, apa itu?", placeholder: "contoh: Azmayra membuktikan bahwa muslimah bisa tampil sporty, aktif, dan tetap syar'i sekaligus — tidak perlu memilih" },
      { id: "big_idea", q: "Apa Big Idea kampanye brand kamu — tema besar yang jadi benang merah semua konten?", hint: "Big Idea yang kuat biasanya berumur panjang dan bisa diekspresikan dalam berbagai format konten.", placeholder: "contoh: #GerakBeriman — gerakan bahwa beribadah dan berolahraga adalah dua hal yang bisa berjalan beriringan bagi muslimah modern" },
    ]
  },
  {
    id: "content",
    emoji: "📐",
    title: "Content Marketing",
    subtitle: "Strategi & struktur konten brand",
    color: O,
    bg: OL,
    scope: "content",
    intro: "Konten adalah wajah brand kamu di dunia digital. Di modul terakhir ini kita merancang arsitektur konten — dari pilar strategis sampai formula yang bisa dieksekusi tim setiap hari.",
    questions: [
      { id: "content_pillars", q: "Apa 3-5 pilar konten utama brand kamu?", hint: "Pilar konten adalah tema besar yang jadi kategori semua konten. Setiap pilar harus relevan dengan brand dan audiens.", placeholder: "contoh: 1) Edukasi Gaya Hidup Sehat Islami, 2) Product Feature & Styling, 3) Komunitas & User Stories, 4) Behind the Brand, 5) Motivasi & Mindset" },
      { id: "content_angle", q: "Apa angle konten yang unik — cara brand kamu menyajikan topik yang berbeda dari kompetitor?", hint: "Angle adalah sudut pandang atau pendekatan khas brand kamu dalam membahas sebuah topik.", placeholder: "contoh: Semua konten olahraga selalu dikaitkan dengan nilai Islam & pemberdayaan muslimah — bukan sekadar tips fitness biasa" },
      { id: "content_formula", q: "Seperti apa formula konten berulang yang bisa dieksekusi konsisten setiap minggu?", hint: "Format konten yang sudah terbukti dan bisa diproduksi rutin — series, rubrik, atau format khusus.", placeholder: "contoh: Senin: Tips workout + hadis motivasi | Rabu: Product styling video | Jumat: Cerita pelanggan | Minggu: Q&A seputar modest activewear" },
      { id: "content_distribution", q: "Di platform mana konten brand kamu akan didistribusikan, dan bagaimana prioritasnya?", hint: "Tentukan platform utama, sekunder, dan bagaimana konten diadaptasi per platform.", placeholder: "contoh: Utama: Instagram Reels & Feed (visual + komunitas). Sekunder: TikTok (reach & viral). Pendukung: WhatsApp channel (loyalty & direct). Blog: SEO jangka panjang" },
    ]
  },
];

// ── STORAGE ───────────────────────────────────────────────────────────────────
import { storageGet, storageSet } from "./storage.js";

async function loadProgress() {
  try { const r = await storageGet("bcs_progress"); return r ? JSON.parse(r) : null; }
  catch { return null; }
}
async function saveProgress(data) {
  try { await storageSet("bcs_progress", JSON.stringify(data)); } catch {}
}

// ── PDF EXPORT ────────────────────────────────────────────────────────────────
async function exportBrandDoc(answers, brandName) {
  if (!window.jspdf) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, MARGIN = 18, CW = W - MARGIN * 2;
  let y = 0;

  const dateStr = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const name = brandName || answers["brand_name"] || "Brand";

  // Cover
  doc.setFillColor(242, 101, 34);
  doc.rect(0, 0, W, 60, "F");
  doc.setFillColor(255, 140, 66, 0.3);
  doc.rect(0, 30, W, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9); doc.text("BRAND COACHING STUDIO", MARGIN, 18);
  doc.setFontSize(26); doc.text("Brand Document", MARGIN, 36);
  doc.setFontSize(13); doc.setFont("helvetica", "normal");
  doc.text(`${name}  ·  ${dateStr}`, MARGIN, 50);

  y = 76;

  MODULES.forEach(mod => {
    const modAnswers = mod.questions.filter(q => answers[q.id]);
    if (modAnswers.length === 0) return;

    if (y > 240) { doc.addPage(); y = MARGIN; }

    // Module header
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(MARGIN, y, CW, 12, 2, 2, "F");
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, y, CW, 12, 2, 2, "S");
    doc.setTextColor(242, 101, 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`${mod.emoji}  ${mod.title}`, MARGIN + 6, y + 8);
    y += 17;

    mod.questions.forEach(q => {
      const ans = answers[q.id];
      if (!ans) return;
      if (y > 255) { doc.addPage(); y = MARGIN; }

      doc.setTextColor(55, 65, 81);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      const qLines = doc.splitTextToSize(q.q, CW);
      doc.text(qLines, MARGIN, y);
      y += qLines.length * 4.5 + 2;

      doc.setTextColor(26, 26, 26);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const aLines = doc.splitTextToSize(ans, CW - 4);
      // Answer box
      const boxH = aLines.length * 4.5 + 8;
      if (y + boxH > 270) { doc.addPage(); y = MARGIN; }
      doc.setFillColor(255, 243, 237);
      doc.roundedRect(MARGIN, y - 2, CW, boxH, 2, 2, "F");
      doc.text(aLines, MARGIN + 4, y + 4);
      y += boxH + 6;
    });
    y += 4;
  });

  // Page numbers
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setFillColor(249, 250, 251);
    doc.rect(0, 287, W, 10, "F");
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(7); doc.setFont("helvetica", "normal");
    doc.text(`Brand Coaching Studio  ·  ${name}`, MARGIN, 293);
    doc.text(`${p} / ${total}`, W - MARGIN, 293, { align: "right" });
  }

  doc.save(`brand-document-${name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function ProgressBar({ value, color = O }) {
  return (
    <div style={{ height: 5, background: "#E5E7EB", borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width .5s ease" }} />
    </div>
  );
}

function ModuleCard({ mod, index, status, onClick }) {
  const done = status === "done";
  const active = status === "active";
  const locked = status === "locked";
  return (
    <div onClick={locked ? null : onClick} style={{
      display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
      borderRadius: 14, cursor: locked ? "not-allowed" : "pointer",
      border: `1.5px solid ${active ? O : done ? mod.color + "40" : "#E5E7EB"}`,
      background: active ? OL : done ? mod.bg : WHITE,
      marginBottom: 10, opacity: locked ? 0.45 : 1,
      transition: "all .2s",
      boxShadow: active ? `0 0 0 3px ${O}20` : "none",
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
        background: done ? mod.color : active ? O : "#F3F4F6",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
      }}>{done ? "✓" : mod.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, color: DARK, marginBottom: 2 }}>
          {index + 1}. {mod.title}
        </div>
        <div style={{ fontSize: 12, color: GRAY }}>{mod.subtitle}</div>
      </div>
      {done && <span style={{ fontSize: 11, color: mod.color, fontWeight: 700, background: mod.bg, padding: "3px 10px", borderRadius: 99 }}>Selesai</span>}
      {active && <span style={{ fontSize: 11, color: O, fontWeight: 700, background: OL, padding: "3px 10px", borderRadius: 99 }}>Aktif</span>}
      {locked && <span style={{ fontSize: 18 }}>🔒</span>}
    </div>
  );
}

// ── AI FEEDBACK ───────────────────────────────────────────────────────────────
async function getAIFeedback(question, answer, brandContext) {
  const prompt = `Kamu adalah brand strategist coach yang membantu klien membangun brand mereka.

Konteks brand sejauh ini: ${brandContext || "Belum ada konteks"}

Pertanyaan yang baru dijawab: "${question}"
Jawaban klien: "${answer}"

Berikan feedback singkat dalam 2-3 kalimat:
1. Validasi atau perkuat jawaban mereka (apa yang sudah bagus)
2. Jika ada, satu saran spesifik untuk memperkuat jawaban

Gunakan bahasa Indonesia yang hangat, seperti coach yang supportif. Jangan bertele-tele. Mulai langsung dengan feedbacknya tanpa pembuka seperti "Bagus!" atau "Oke!".`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.map(b => b.text || "").join("") || "";
}

// ── QUESTION SCREEN ───────────────────────────────────────────────────────────
function QuestionScreen({ mod, qIndex, answers, onAnswer, onBack, brandContext }) {
  const q = mod.questions[qIndex];
  const [input, setInput] = useState(answers[q.id] || "");
  const [feedback, setFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(!!answers[q.id]);
  const textRef = useRef();

  useEffect(() => {
    setInput(answers[q.id] || "");
    setFeedback(null);
    setSubmitted(!!answers[q.id]);
  }, [q.id]);

  async function handleSubmit() {
    if (!input.trim()) return;
    setSubmitted(true);
    setLoadingFeedback(true);
    onAnswer(q.id, input.trim());
    try {
      const fb = await getAIFeedback(q.q, input.trim(), brandContext);
      setFeedback(fb);
    } catch { setFeedback("Jawaban kamu sudah tersimpan. Lanjut ke pertanyaan berikutnya!"); }
    finally { setLoadingFeedback(false); }
  }

  const isLast = qIndex === mod.questions.length - 1;
  const progress = ((qIndex + (submitted ? 1 : 0)) / mod.questions.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: WHITE, borderBottom: `1.5px solid #F3F4F6`, padding: "12px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 0, color: GRAY }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: mod.color, fontWeight: 700, letterSpacing: 0.5 }}>
              {mod.emoji} {mod.title.toUpperCase()}
            </div>
            <div style={{ fontSize: 12, color: GRAY }}>Pertanyaan {qIndex + 1} dari {mod.questions.length}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: mod.color }}>{Math.round(progress)}%</div>
        </div>
        <ProgressBar value={progress} color={mod.color} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: 600, margin: "0 auto", width: "100%", padding: "24px 18px 100px" }}>
        {/* Module intro for first question */}
        {qIndex === 0 && (
          <div style={{
            background: mod.bg, border: `1.5px solid ${mod.color}30`,
            borderRadius: 14, padding: 16, marginBottom: 22,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: mod.color, marginBottom: 6 }}>📌 Tentang Modul Ini</div>
            <div style={{ fontSize: 13, color: MID, lineHeight: 1.65 }}>{mod.intro}</div>
          </div>
        )}

        {/* Question */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: "inline-block", background: mod.color, color: WHITE,
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
            letterSpacing: 0.5, marginBottom: 10,
          }}>PERTANYAAN {qIndex + 1}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: DARK, lineHeight: 1.4, marginBottom: 8 }}>{q.q}</div>
          <div style={{ fontSize: 13, color: GRAY, lineHeight: 1.5 }}>💡 {q.hint}</div>
        </div>

        {/* Input */}
        <textarea
          ref={textRef}
          value={input}
          onChange={e => { setInput(e.target.value); if (submitted) setSubmitted(false); }}
          placeholder={q.placeholder}
          rows={5}
          style={{
            width: "100%", padding: "14px", borderRadius: 12,
            border: `1.5px solid ${submitted ? mod.color : "#E5E7EB"}`,
            fontSize: 13.5, lineHeight: 1.6, color: DARK,
            fontFamily: "inherit", resize: "vertical", boxSizing: "border-box",
            outline: "none", background: submitted ? mod.bg : WHITE,
            transition: "border-color .2s",
          }}
        />

        {/* AI Feedback */}
        {loadingFeedback && (
          <div style={{ marginTop: 14, padding: 14, background: LGRAY, borderRadius: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: O, animation: "pulse 1s infinite" }} />
            <span style={{ fontSize: 13, color: GRAY }}>AI sedang menganalisis jawaban kamu...</span>
          </div>
        )}
        {feedback && (
          <div style={{
            marginTop: 14, padding: 16, background: WHITE,
            border: `1.5px solid ${mod.color}40`, borderRadius: 12,
            borderLeft: `4px solid ${mod.color}`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: mod.color, marginBottom: 6, letterSpacing: 0.5 }}>💬 FEEDBACK COACH</div>
            <div style={{ fontSize: 13, color: MID, lineHeight: 1.65 }}>{feedback}</div>
          </div>
        )}

        {/* Actions */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          {!submitted ? (
            <button onClick={handleSubmit} disabled={!input.trim()} style={{
              flex: 1, padding: "14px", borderRadius: 12, border: "none",
              background: input.trim() ? `linear-gradient(135deg, ${O} 0%, ${O2} 100%)` : "#E5E7EB",
              color: input.trim() ? WHITE : GRAY,
              fontSize: 14, fontWeight: 700, cursor: input.trim() ? "pointer" : "not-allowed",
              fontFamily: "inherit",
            }}>Simpan & Dapatkan Feedback ✓</button>
          ) : (
            <button onClick={() => onAnswer(q.id, input, true)} style={{
              flex: 1, padding: "14px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${mod.color} 0%, ${mod.color}CC 100%)`,
              color: WHITE, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>{isLast ? "Selesaikan Modul →" : "Pertanyaan Berikutnya →"}</button>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}

// ── MODULE COMPLETE SCREEN ─────────────────────────────────────────────────────
function ModuleCompleteScreen({ mod, onContinue, isLastModule }) {
  return (
    <div style={{
      minHeight: "100vh", background: mod.bg,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px 24px",
    }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <div style={{
          display: "inline-block", background: mod.color, color: WHITE,
          fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 99,
          marginBottom: 14, letterSpacing: 0.5,
        }}>MODUL SELESAI</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: DARK, marginBottom: 10, lineHeight: 1.3 }}>
          {mod.emoji} {mod.title} tuntas!
        </div>
        <div style={{ fontSize: 14, color: GRAY, lineHeight: 1.65, marginBottom: 28 }}>
          {isLastModule
            ? "Selamat! Kamu telah menyelesaikan semua modul coaching. Brand document kamu siap untuk di-download dan strategy generator siap dijalankan."
            : `Bagus sekali. Semua pertanyaan di modul ${mod.title} sudah dijawab. Lanjut ke modul berikutnya!`
          }
        </div>
        <button onClick={onContinue} style={{
          width: "100%", padding: "16px", borderRadius: 14, border: "none",
          background: `linear-gradient(135deg, ${O} 0%, ${O2} 100%)`,
          color: WHITE, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>{isLastModule ? "Lihat Hasil & Download →" : "Lanjut ke Modul Berikutnya →"}</button>
      </div>
    </div>
  );
}

// ── RESULT SCREEN ─────────────────────────────────────────────────────────────
function ResultScreen({ answers, onRestart }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const brandName = answers["brand_name"] || "Brand Kamu";

  const completedMods = MODULES.filter(mod => mod.questions.every(q => answers[q.id]));
  const totalQ = MODULES.reduce((a, m) => a + m.questions.length, 0);
  const answeredQ = Object.keys(answers).length;

  async function handlePDF() {
    setPdfLoading(true);
    try { await exportBrandDoc(answers, brandName); }
    catch(e) { alert("Gagal export: " + e.message); }
    finally { setPdfLoading(false); }
  }

  async function generateStrategy() {
    setStrategyLoading(true);
    const ctx = Object.entries(answers).map(([k, v]) => {
      const q = MODULES.flatMap(m => m.questions).find(q => q.id === k);
      return q ? `${q.q}: ${v}` : "";
    }).filter(Boolean).join("\n");

    const prompt = `Berdasarkan brand document lengkap berikut, susun brand strategy yang komprehensif:

${ctx}

Berikan output dengan format berikut:

## Brand Summary
Ringkasan brand dalam 2-3 kalimat

## Positioning Statement
Versi final positioning statement yang tajam

## Prioritas Eksekusi (30 Hari)
5 langkah konkret yang harus dikerjakan bulan ini

## Pilar Konten Final
Daftar pilar konten + contoh 2 topik per pilar

## Big Idea Kampanye
Big idea beserta cara mengekspresikannya di berbagai format konten

## KPI yang Harus Ditrack
5 metrik utama untuk mengukur keberhasilan

Gunakan bahasa Indonesia. Buat spesifik, actionable, dan relevan dengan data yang ada.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      setStrategy(data.content?.map(b => b.text || "").join("") || "");
    } catch { setStrategy("Gagal generate strategi. Coba lagi."); }
    finally { setStrategyLoading(false); }
  }

  function renderMd(text) {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <div key={i} style={{ fontWeight: 800, fontSize: 14, color: O, marginTop: 18, marginBottom: 7 }}>{line.replace("## ", "")}</div>;
      if (/^[-•]/.test(line) || /^\d+\./.test(line)) {
        return (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: O, flexShrink: 0, marginTop: 7 }} />
            <div style={{ fontSize: 13, color: DARK, lineHeight: 1.6 }}>{line.replace(/^[-•\d.]\s*/, "").replace(/\*\*/g, "")}</div>
          </div>
        );
      }
      if (!line.trim()) return <div key={i} style={{ height: 4 }} />;
      return <div key={i} style={{ fontSize: 13, color: MID, lineHeight: 1.7 }}>{line.replace(/\*\*/g, "")}</div>;
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${O} 0%, ${O2} 100%)`,
        padding: "32px 20px 28px", textAlign: "center", color: WHITE,
      }}>
        <div style={{ fontSize: 44, marginBottom: 12 }}>🏆</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Brand Document Selesai!</div>
        <div style={{ fontSize: 13.5, opacity: .85 }}>
          {answeredQ} dari {totalQ} pertanyaan dijawab · {completedMods.length} dari {MODULES.length} modul selesai
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8 }}>{brandName}</div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 60px" }}>
        {/* Action cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          <div style={{
            background: WHITE, border: `1.5px solid ${OM}`, borderRadius: 14,
            padding: 18, display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ fontSize: 32 }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: DARK, marginBottom: 3 }}>Download Brand Document PDF</div>
              <div style={{ fontSize: 12, color: GRAY }}>Semua jawaban tersusun rapi dalam dokumen profesional</div>
            </div>
            <button onClick={handlePDF} disabled={pdfLoading} style={{
              padding: "9px 16px", borderRadius: 10, border: "none", flexShrink: 0,
              background: pdfLoading ? "#E5E7EB" : `linear-gradient(135deg, ${O} 0%, ${O2} 100%)`,
              color: pdfLoading ? GRAY : WHITE, fontSize: 12, fontWeight: 700,
              cursor: pdfLoading ? "not-allowed" : "pointer", fontFamily: "inherit",
            }}>{pdfLoading ? "Exporting..." : "⬇ Download"}</button>
          </div>

          <div style={{
            background: WHITE, border: "1.5px solid #E5E7EB", borderRadius: 14,
            padding: 18, display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ fontSize: 32 }}>✨</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: DARK, marginBottom: 3 }}>Generate Full Brand Strategy</div>
              <div style={{ fontSize: 12, color: GRAY }}>AI menyusun strategy lengkap berdasarkan semua jawaban coaching</div>
            </div>
            <button onClick={generateStrategy} disabled={strategyLoading} style={{
              padding: "9px 16px", borderRadius: 10, border: `1.5px solid ${O}`, flexShrink: 0,
              background: "transparent", color: strategyLoading ? GRAY : O,
              fontSize: 12, fontWeight: 700, cursor: strategyLoading ? "not-allowed" : "pointer",
              fontFamily: "inherit", borderColor: strategyLoading ? "#E5E7EB" : O,
            }}>{strategyLoading ? "Generating..." : "✨ Generate"}</button>
          </div>
        </div>

        {/* Strategy result */}
        {strategyLoading && (
          <div style={{ background: WHITE, borderRadius: 14, padding: 20, border: "1.5px solid #E5E7EB", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: O, animation: "pulse 1s infinite" }} />
              <span style={{ fontSize: 13, color: GRAY }}>AI sedang menyusun brand strategy dari semua jawaban coaching kamu...</span>
            </div>
          </div>
        )}
        {strategy && (
          <div style={{ background: WHITE, borderRadius: 14, border: "1.5px solid #E5E7EB", padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: DARK }}>Brand Strategy — {brandName}</div>
              <button onClick={() => navigator.clipboard.writeText(strategy)} style={{
                padding: "5px 12px", borderRadius: 8, border: `1.5px solid ${O}`,
                background: "transparent", color: O, fontSize: 11, fontWeight: 700, cursor: "pointer",
              }}>Copy</button>
            </div>
            {renderMd(strategy)}
          </div>
        )}

        {/* Answer review */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: DARK, marginBottom: 14 }}>Ringkasan Jawaban</div>
          {MODULES.map(mod => {
            const hasAny = mod.questions.some(q => answers[q.id]);
            if (!hasAny) return null;
            return (
              <div key={mod.id} style={{ background: WHITE, border: "1.5px solid #E5E7EB", borderRadius: 14, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>{mod.emoji}</span>
                  <span style={{ fontWeight: 700, fontSize: 13.5, color: mod.color }}>{mod.title}</span>
                </div>
                {mod.questions.map(q => {
                  if (!answers[q.id]) return null;
                  return (
                    <div key={q.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #F3F4F6" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: GRAY, marginBottom: 4 }}>{q.q}</div>
                      <div style={{ fontSize: 13, color: DARK, lineHeight: 1.55 }}>{answers[q.id]}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <button onClick={onRestart} style={{
          width: "100%", padding: 14, borderRadius: 12, border: `1.5px solid #E5E7EB`,
          background: WHITE, color: GRAY, fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
        }}>↩ Mulai Ulang Coaching</button>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | module | question | mod_complete | result
  const [activeModIndex, setActiveModIndex] = useState(0);
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completedMods, setCompletedMods] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadProgress().then(data => {
      if (data) {
        setAnswers(data.answers || {});
        setCompletedMods(data.completedMods || []);
      }
      setLoaded(true);
    });
  }, []);

  async function persist(newAnswers, newCompleted) {
    await saveProgress({ answers: newAnswers, completedMods: newCompleted });
  }

  function handleAnswer(qId, value, next = false) {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);
    persist(newAnswers, completedMods);

    if (next) {
      const mod = MODULES[activeModIndex];
      if (activeQIndex < mod.questions.length - 1) {
        setActiveQIndex(activeQIndex + 1);
      } else {
        // Module done
        const newCompleted = completedMods.includes(mod.id) ? completedMods : [...completedMods, mod.id];
        setCompletedMods(newCompleted);
        persist(newAnswers, newCompleted);
        setScreen("mod_complete");
      }
    }
  }

  function startModule(modIndex) {
    setActiveModIndex(modIndex);
    // Find first unanswered question
    const mod = MODULES[modIndex];
    const firstUnanswered = mod.questions.findIndex(q => !answers[q.id]);
    setActiveQIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
    setScreen("question");
  }

  function handleModContinue() {
    const allDone = completedMods.length === MODULES.length || 
      MODULES.every(m => m.questions.every(q => answers[q.id]));
    if (allDone || activeModIndex === MODULES.length - 1) {
      setScreen("result");
    } else {
      setActiveModIndex(activeModIndex + 1);
      setScreen("home");
    }
  }

  function getModStatus(modIndex) {
    const mod = MODULES[modIndex];
    const isDone = mod.questions.every(q => answers[q.id]);
    if (isDone) return "done";
    // Active: first incomplete after all previous done, or first one
    const prevDone = modIndex === 0 || MODULES.slice(0, modIndex).every(m => m.questions.every(q => answers[q.id]));
    if (prevDone) return "active";
    return "locked";
  }

  const totalQ = MODULES.reduce((a, m) => a + m.questions.length, 0);
  const answeredQ = Object.keys(answers).filter(k => MODULES.flatMap(m => m.questions).find(q => q.id === k)).length;
  const overallPct = Math.round((answeredQ / totalQ) * 100);

  const brandContext = [
    answers["brand_name"] && `Brand: ${answers["brand_name"]}`,
    answers["product_category"] && `Kategori: ${answers["product_category"]}`,
    answers["audience_demo"] && `Audiens: ${answers["audience_demo"]}`,
    answers["usp"] && `USP: ${answers["usp"]}`,
  ].filter(Boolean).join(". ");

  if (!loaded) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", color: GRAY }}>
      Loading...
    </div>
  );

  if (screen === "question") {
    return (
      <QuestionScreen
        mod={MODULES[activeModIndex]}
        qIndex={activeQIndex}
        answers={answers}
        onAnswer={handleAnswer}
        onBack={() => setScreen("home")}
        brandContext={brandContext}
      />
    );
  }

  if (screen === "mod_complete") {
    return (
      <ModuleCompleteScreen
        mod={MODULES[activeModIndex]}
        onContinue={handleModContinue}
        isLastModule={activeModIndex === MODULES.length - 1}
      />
    );
  }

  if (screen === "result") {
    return <ResultScreen answers={answers} onRestart={() => { setAnswers({}); setCompletedMods([]); persist({}, []); setScreen("home"); }} />;
  }

  // ── HOME ──
  const allDone = MODULES.every(m => m.questions.every(q => answers[q.id]));

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${O} 0%, ${O2} 100%)`,
        padding: "24px 20px 28px", color: WHITE,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18,
          }}>B</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Brand Coaching Studio</div>
            <div style={{ fontSize: 11, opacity: .8 }}>AI-powered brand building journey</div>
          </div>
        </div>

        {answeredQ > 0 ? (
          <>
            <div style={{ fontSize: 13, opacity: .85, marginBottom: 8 }}>
              Progress kamu: {answeredQ}/{totalQ} pertanyaan · {overallPct}% selesai
              {answers["brand_name"] && ` · ${answers["brand_name"]}`}
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,.3)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: WHITE, borderRadius: 99, transition: "width .5s" }} />
            </div>
          </>
        ) : (
          <div style={{ fontSize: 14, opacity: .85, lineHeight: 1.55 }}>
            Jawab 24 pertanyaan terstruktur & dapatkan Brand Document lengkap + AI Strategy otomatis.
          </div>
        )}
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px 16px 60px" }}>
        {answeredQ === 0 && (
          <div style={{ background: OL, border: `1.5px solid ${OM}`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: O, marginBottom: 6 }}>✨ Cara kerja coaching ini</div>
            <div style={{ fontSize: 12.5, color: MID, lineHeight: 1.65 }}>
              Kamu akan melewati <strong>6 modul</strong> secara berurutan. Setiap modul punya intro dan 4 pertanyaan. Setelah setiap jawaban, AI akan memberikan feedback dan validasi. Di akhir, kamu bisa download <strong>Brand Document PDF</strong> dan generate <strong>Brand Strategy</strong> otomatis.
            </div>
          </div>
        )}

        <div style={{ fontWeight: 700, fontSize: 15, color: DARK, marginBottom: 12 }}>
          {answeredQ > 0 ? "Lanjutkan Journey" : "Mulai Brand Coaching"}
        </div>

        {MODULES.map((mod, i) => (
          <ModuleCard
            key={mod.id} mod={mod} index={i}
            status={getModStatus(i)}
            onClick={() => startModule(i)}
          />
        ))}

        {allDone && (
          <button onClick={() => setScreen("result")} style={{
            marginTop: 16, width: "100%", padding: 16, borderRadius: 14, border: "none",
            background: `linear-gradient(135deg, ${O} 0%, ${O2} 100%)`,
            color: WHITE, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          }}>🏆 Lihat Hasil & Download Brand Document →</button>
        )}
      </div>
    </div>
  );
}
