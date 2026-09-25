
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const features = [
  ["🎙️", "Hindi Voice Commands", "Create bills, open sections and manage your work with simple Hindi voice commands."],
  ["🧾", "Smart Invoicing", "GST-ready invoices with automatic quantity, rate, tax and total calculations."],
  ["📦", "Inventory Tracking", "Track stock, purchase rates, selling rates, GST, godown and low-stock alerts."],
  ["💸", "Payments & Receipts", "Record cash, bank and UPI payments and keep every transaction organized."],
  ["📊", "Sales Dashboard", "See sales, expenses, profit/loss and credit due at a glance."],
  ["🔐", "App Security", "Protect your business data with app lock and secure access."],
];

const modules = [
  ["🧾", "Invoice Generator", "GST, HSN/SAC, customer details, item entry and automatic totals."],
  ["📥", "Purchase", "Supplier bills, purchase rates, GST and stock entry in one flow."],
  ["💸", "Payment Voucher", "Record supplier / party payments through cash, bank or UPI."],
  ["💰", "Receipt Voucher", "Track customer payments and keep your receivables clear."],
  ["📦", "Smart Inventory", "Stock, godown, batch, rates, GST and low-stock alerts."],
  ["📊", "Total Sales", "Search and filter your sales history with business-friendly records."],
];

const workflow = [
  ["01", "Speak", "Tell AccountsOrbit what you want to do in natural Hindi."],
  ["02", "Record", "The right business details are captured and organized."],
  ["03", "Calculate", "GST, totals, stock and balances are calculated automatically."],
  ["04", "Manage", "Your dashboard keeps the whole business under control."],
];

const appGuide = [
  {
    group: "MAIN",
    blurb: "Roz ka billing, kharid aur paisa — counter pe jo kaam hota hai.",
    items: [
      ["Overview", "Shop kholte ya band karte waqt ek screen pe sales, kharcha, profit aur baaki paisa. Din ka hisaab alag-alag register khole bina samajh aa jata hai.", ["Aaj kitna bika, kitna kharcha hua, kitna munafa bacha — yeh teen cheezein ek saath dikhti hain.", "Jis customer ka paisa baaki hai, woh bhi yahin nazar aata hai.", "Kam stock ki warning yahin milti hai, taaki samaan khatam hone se pehle pata chal jaye."]],
      ["Invoice / Sales", "Customer ka naam, item, quantity, rate aur GST daalo. Total app nikalta hai, aur bill sales record mein save ho jata hai — baad mein dhoondhna nahi padta.", ["Customer aur item likho. Rate aur GST app khud jodta hai.", "Bill ban te hi sales ki list mein save ho jati hai.", "Baad mein naam ya date se wahi bill dobara khol sakte ho."]],
      ["Purchase", "Supplier se jo samaan aaya, uski bill, rate aur GST yahin likho. Stock aur kharid ka cost ek saath update rehta hai.", ["Supplier ka naam aur aayi hui bill likho.", "Kitne mein kharida, aur GST kitna tha — dono save hote hain.", "Stock apne aap badh jata hai, alag se ginne ki zaroorat nahi."]],
      ["Payment", "Jis party ko aapne paisa diya — cash, bank ya UPI — woh entry yahin hoti hai. Diary mein bhoolne wali line ki jagah ledger mein payment dikhti hai.", ["Jise paisa diya, uska naam chuno.", "Cash, bank ya UPI — jo tareeka ho, woh likho.", "Party ke khate mein payment kat jati hai, baaki rashi saaf dikhti hai."]],
      ["Receipt", "Customer ne jo paisa diya, amount aur tareeka note karo. Udhaar kam hota hai aur collection saaf rehti hai.", ["Jis customer ne paisa diya, uska naam chuno.", "Kitna diya aur cash, bank ya UPI — yeh likho.", "Uske udhaar mein se yeh rashi kam ho jati hai."]],
      ["New Voucher", "Nayi entry chahiye ho toh menu mein ghumne ki zaroorat nahi. Seedha naya voucher kholo aur record banao.", ["Koi bhi naya hisaab jaldi shuru karne ke liye yeh kholo.", "Purani entry dhoondhne ki zaroorat nahi padti.", "Save karte hi record day book aur ledger mein chala jata hai."]],
    ],
  },
  {
    group: "ACCOUNTING",
    blurb: "Hisaab, ledger aur report — accounting ki bhaari bhasha ke bina.",
    items: [
      ["Modification", "Rate, quantity ya party ka naam galat ho gaya ho toh wahi entry khol kar theek karo. Doosri bill banane ki zaroorat nahi.", ["Galat bill ya payment kholo.", "Jo number ya naam galat hai, use badlo.", "Purani entry update ho jati hai. Nayi bill banana nahi padta."]],
      ["Credit Ledgers", "Kaun customer abhi bhi kitna paisa dena baaki hai — ek list mein. Mahine ke end pe follow-up isi se hota hai.", ["Sirf woh log dikhte hain jinka paisa baaki hai.", "Har naam ke saamne baaki rashi likhi hoti hai.", "Mahine ke aakhir mein isi list se yaad dilate ho."]],
      ["Ledgers", "Kisi bhi party ka poora khata: bill, payment aur balance, ek jagah. Purani entries alag file mein nahi dhundhni padti.", ["Party ka naam kholo.", "Uske saare bill, payment aur receipt ek ke neeche ek dikhte hain.", "Ant mein balance batata hai: aapko dena hai ya lena hai."]],
      ["Stock Items", "Item ka naam, HSN, kharid rate, selling rate aur GST pehle se ready. Billing har baar khaali line se shuru nahi hoti.", ["Item ek baar banao: naam, rate aur GST.", "Bill banate waqt wahi item chun lo, dobara mat likho.", "Rate badalna ho toh yahin badlo, agli bill mein naya rate aayega."]],
      ["Day Book", "Aaj ki saari sales, purchase, payment aur receipt ek list mein. Dukaan band karne se pehle yahi check karo.", ["Sirf aaj ki entries dikhti hain.", "Sale, kharid, diya hua paisa aur liya hua paisa — sab ek list mein.", "Dukaan band karne se pehle is list se din match kar lo."]],
      ["Reports Pro", "Sirf aaj ka number kaafi na ho toh sales, kharcha aur business ki lambi report yahin se nikalti hai.", ["Ek din nahi, hafte ya mahine ka hisaab dekho.", "Sales aur kharcha alag-alag samajh aata hai.", "Jab hisaab kisi ko dikhana ho, yahi report kaam aati hai."]],
      ["Bank Recon", "Bank statement aur aapki kitab ko milao, taaki jo balance aap maante ho wahi balance sahi ho.", ["Bank mein jo paisa dikhta hai, use apni kitab se milao.", "Jo entry bank mein hai aur kitab mein nahi, woh nazar aa jati hai.", "Isse balance galat rehne ka darr kam hota hai."]],
    ],
  },
  {
    group: "BUSINESS",
    blurb: "Stock, quote, kaam aur ek se zyada company — saath mein.",
    items: [
      ["Inventory", "Har item kitna pada hai, kis godown mein hai, aur kya khatam hone wala hai — customer poochne se pehle pata chal jata hai.", ["Har item ka maujood stock dikhta hai.", "Godown alag ho toh wahan ka stock alag dikhta hai.", "Jo samaan kam pad raha hai, uski warning aa jati hai."]],
      ["Estimate / Quote", "Pehle rate bhejo. Customer haan kare toh wahi quote bill ban jati hai, items dobara type nahi karne padte.", ["Kaam pakka hone se pehle sirf rate ki list bhejo.", "Customer haan kare toh wahi quote bill ban jati hai.", "Items dobara likhne nahi padte."]],
      ["Business Mail", "Bill, quote ya chhota business message app se bhejo. Doosre app mein switch karne ki zaroorat kam ho jati hai.", ["Bill ya quote app ke andar se bhej sakte ho.", "Alag email app kholne ki zaroorat kam padti hai.", "Bheja hua message business ke record ke saath rehta hai."]],
      ["Projects", "Counter ki ek sale se bada kaam ho toh customer, kharcha aur progress ek project mein rehte hain.", ["Ek bade kaam ko ek project banao.", "Usme customer, kharcha aur kaam ki halat saath rehti hai.", "Dukaan ki roz ki sale is hisaab mein ghul nahi jati."]],
      ["Contractor", "Site aur contractor ka paisa alag record hota hai, dukaan ki sales ke saath mix nahi hota.", ["Contractor ko diya hua paisa alag likho.", "Site ka kharcha dukaan ki sale se alag rehta hai.", "Baad mein pata rehta hai kis site pe kitna laga."]],
      ["Companies", "Ek se zyada business chalate ho toh company badlo. Har business ki kitab alag rehti hai.", ["Har business ka alag naam aur alag hisaab.", "Ek company se doosri pe switch karo.", "Ek ki sale doosri ki kitab mein nahi milti."]],
    ],
  },
  {
    group: "STAFF MANAGEMENT",
    blurb: "Log, tankhwah aur team ka chhota record.",
    items: [
      ["Staff Payroll", "Tankhwah kitni di, kab di — yahi likho. Staff ka payment history baaki hisaab ke saath rehta hai.", ["Kis aadmi ko kitni tankhwah di, yeh likho.", "Tarikh ke saath payment save hoti hai.", "Baad mein poochne pe purani tankhwah ki list mil jati hai."]],
      ["Team Meeting", "Meeting kab thi aur kya decide hua, chhota note save karo, baad mein yaad rahe.", ["Meeting ki tarikh likho.", "Jo decide hua, do-teen line mein save karo.", "Agli baar wahi note khol kar yaad aa jata hai."]],
      ["Staff", "Logon ke naam aur basic details ek list mein. Alag register ki zaroorat nahi.", ["Naye aadmi ka naam aur detail add karo.", "Saari team ek list mein rehti hai.", "Payroll isi list se judi rehti hai."]],
    ],
  },
  {
    group: "TOOLS",
    blurb: "Roz ke chhote kaam ke liye helpers.",
    items: [
      ["Gallery", "Samaan, site ka kaam ya paper bill ki photo yahin rakho, taaki hisaab ke saath mil jaye.", ["Bill, samaan ya site ki photo yahin daalo.", "Baad mein date ya kaam se photo mil jati hai.", "Paper bill kho bhi jaye toh photo rehti hai."]],
      ["To-do", "Aaj kya karna hai, numbers ke bagal mein ek chhoti list.", ["Aaj ke kaam ki chhoti list banao.", "Jo ho gaya, use kaat do.", "Jo bacha hai, agle din bhi dikhta hai."]],
      ["Business Card", "Business ka naam aur contact kaagaz pe likhe bina share karo.", ["Naam, phone aur business ek card mein rehta hai.", "Customer ko turant bhej sakte ho.", "Har baar number likhkar dena nahi padta."]],
      ["QR Tool", "Details share karne ya payment lene ke liye QR banao ya use karo.", ["Payment ya contact ka QR banao.", "Customer scan karke seedha pahunch jata hai.", "Alag app se QR banane ki zaroorat kam padti hai."]],
      ["Calculator", "Counter pe khade-khade chhota hisaab, billing ke beech mein.", ["Bill banate waqt chhota jod-ghata yahin karo.", "Doosra phone calculator kholne ki zaroorat nahi.", "Number yahin dekh kar bill mein daal do."]],
      ["Notes", "Zaroori baat personal chat mein kho jaati hai. Yahan business ke saath rehti hai.", ["Rate, yaad ya chhota nirdesh likh kar rakh do.", "Chat mein khojne ki jagah yahin milta hai.", "Business ki baat business ke andar rehti hai."]],
      ["Media", "Business ki files aur media ek folder mein.", ["File aur media ek jagah rakho.", "Bill ya kaam se judi file baad mein khul jati hai.", "Alag folder ya WhatsApp mein dhoondhna nahi padta."]],
    ],
  },
  {
    group: "SETTINGS",
    blurb: "Plan, lock, madad, aur Tally.",
    items: [
      ["My Plan", "Abhi kaunsa plan chal raha hai aur usme kya shamil hai, yahin dikhta hai.", ["Aapka current plan yahin dikhta hai.", "Plan mein kya khula hai, saaf likha hota hai.", "Badalna ho toh yahin se dekh sakte ho."]],
      ["Security Purpose", "App lock lagao taaki dukaan ka data sirf aapke paas rahe.", ["App pe lock laga sakte ho.", "Bina lock khole hisaab nahi khulta.", "Phone kisi aur ke haath mein ho toh bhi kitab band rehti hai."]],
      ["Help Desk", "Koi screen ya number samajh na aaye toh yahin se sawaal poochho.", ["Jo screen atak jaye, yahin se poochho.", "Sawal app ke andar rehta hai, kahin aur dhoondhna nahi.", "Jawab milne tak aapka sawaal save rehta hai."]],
      ["Tally Sync Agent", "Tally bhi use karte ho toh records sync ho jate hain. Wahi entry do jagah type nahi karni padti.", ["AccountsOrbit ki entry Tally tak ja sakti hai.", "Wahi bill do jagah likhne ki zaroorat nahi.", "Dono kitab ek jaise rehne mein madad milti hai."]],
    ],
  },
];

const THEME_KEY = "accountsorbit-theme";

function getInitialTheme() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function FeatureCarousel({ items, variant = "feature" }) {
  const trackRef = useRef(null);
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const [dragging, setDragging] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 6);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    const onScroll = () => updateEdges();
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e) => {
    const el = trackRef.current;
    const d = drag.current;
    if (!el || !d.active) return;
    el.scrollLeft = d.startScroll - (e.clientX - d.startX);
    const now = performance.now();
    const dt = now - d.lastT || 1;
    d.velocity = (d.lastX - e.clientX) / dt;
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const endDrag = (e) => {
    const el = trackRef.current;
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    setDragging(false);
    if (el && e?.pointerId != null) {
      try { el.releasePointerCapture(e.pointerId); } catch { /* already released */ }
    }
    if (el && Math.abs(d.velocity) > 0.12) {
      el.scrollBy({ left: d.velocity * 320, behavior: "smooth" });
    }
  };

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(variant === "module" ? ".module-card" : ".feature-card");
    const amount = (card?.offsetWidth || 320) + 16;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className={`feature-carousel reveal${variant === "module" ? " modules-carousel" : ""}`}>
      <div
        className={`feature-track${dragging ? " dragging" : ""}`}
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {items.map(([icon, title, text], i) => (
          variant === "module" ? (
            <article className="module-card" key={title}>
              <div className="module-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span>View module →</span>
            </article>
          ) : (
            <article className="feature-card" key={title}>
              <div className="feature-number">0{i + 1}</div>
              <div className="feature-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="feature-arrow">↗</div>
            </article>
          )
        ))}
      </div>
      <div className="feature-carousel-controls">
        <button type="button" className="feature-nav" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label={variant === "module" ? "Previous modules" : "Previous features"}>‹</button>
        <span>Drag to slide</span>
        <button type="button" className="feature-nav" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label={variant === "module" ? "Next modules" : "Next features"}>›</button>
      </div>
    </div>
  );
}

function pageSlug(group, title) {
  return `${group}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function guideId(group, title) {
  return `guide-${pageSlug(group, title)}`;
}

function readGuideSlug() {
  const match = window.location.hash.match(/^#guide\/([a-z0-9-]+)/);
  return match ? match[1] : null;
}

function findGuidePage(slug) {
  if (!slug) return null;
  for (const section of appGuide) {
    for (const item of section.items) {
      if (pageSlug(section.group, item[0]) === slug) {
        return { group: section.group, blurb: section.blurb, title: item[0], text: item[1], points: item[2] || [], items: section.items };
      }
    }
  }
  return null;
}

const howSteps = [
  {
    image: "/how/how-speak.png",
    title: "1. Bolo",
    text: "Computer ke menu mein mat ghumo. Jaise dukaan pe baat karte ho, waise bolo: “Invoice bana do”, “Ramesh ka paanch hazaar receive hua”, ya “Stock kitna hai?”",
    points: ["Hindi, Hinglish ya simple English — teeno chalenge.", "Mic dabao, kaam bolo, app sahi hissa khol deti hai."],
  },
  {
    image: "/how/how-record.png",
    title: "2. Likho ya bolo, record ban jaaye",
    text: "Customer, item, quantity aur rate — yahi chaar cheezein bill ke liye kaafi hain. Payment, purchase aur receipt bhi isi tarah ek entry ban jaati hai.",
    points: ["Naam aur item ek baar likho, agli baar list se chun lo.", "Cash, bank ya UPI — paisa kis tareeke se aaya, woh bhi save hota hai."],
  },
  {
    image: "/how/how-calculate.png",
    title: "3. GST, total aur stock app nikalta hai",
    text: "Aapko calculator alag se nahi chalana. Rate aur quantity se total, GST, aur stock khud update ho jaate hain.",
    points: ["Bill ka total galat jodne ka darr nahi.", "Samaan aaya toh stock badha, bika toh stock ghata."],
  },
  {
    image: "/how/how-manage.png",
    title: "4. Ek screen pe poora din",
    text: "Sales, kharcha, munafa aur baaki paisa dashboard pe saath dikhte hain. Dukaan kholte waqt aur band karte waqt yahi ek nazar kaafi hai.",
    points: ["Jiska udhaar baaki hai, woh alag se nazar aata hai.", "Kam stock ki warning bhi isi hisaab ke saath milti hai."],
  },
];

function HowPage() {
  return (
    <section className="how-page">
      <a className="guide-back" href="#home">← Home</a>
      <div className="eyebrow">HOW ACCOUNTSORBIT WORKS</div>
      <h1>Bolo. Record ho. Hisaab khud ban jaaye.</h1>
      <p className="guide-lead">AccountsOrbit dukaan ke roz ke kaam ke liye hai — bill, kharid, payment, stock aur din ka hisaab. Char kadam, seedhi bhasha, aur har kadam ki tasveer.</p>
      <div className="how-steps">
        {howSteps.map((step) => (
          <article className="how-step" key={step.title}>
            <img src={step.image} alt="" />
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
              <ul>
                {step.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="guide-points">
        <h2>Ek din dukaan pe, aise chalta hai</h2>
        <ol>
          <li>Subah Overview kholo — kal ka baaki paisa aur kam stock dekh lo.</li>
          <li>Customer aaya toh bolo “invoice bana do”, item aur rate daalo, bill nikal jaaye.</li>
          <li>Samaan aaya toh Purchase mein likho. Paisa diya toh Payment, paisa mila toh Receipt.</li>
          <li>Shaam ko Day Book aur dashboard se din match kar lo, phir app lock laga do.</li>
        </ol>
      </div>
    </section>
  );
}

function GuidePage({ page, onOpen }) {
  return (
    <section className="guide-page">
      <a className="guide-back" href="#app-screens">← App ki list</a>
      <div className="eyebrow">{page.group}</div>
      <h1>{page.title}</h1>
      <p className="guide-lead">{page.text}</p>
      <div className="guide-points">
        <h2>Seedhe shabdon mein</h2>
        <ol>
          {page.points.map((point) => <li key={point}>{point}</li>)}
        </ol>
      </div>
      <div className="guide-more">
        <h2>Is group ke aur hisse</h2>
        <div>
          {page.items.filter(([title]) => title !== page.title).map(([title]) => (
            <button type="button" key={title} onClick={() => onOpen(page.group, title)}>{title}</button>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [guideSlug, setGuideSlug] = useState(readGuideSlug);
  const [howOpen, setHowOpen] = useState(() => window.location.hash === "#how-it-works");
  const [active, setActive] = useState("Overview");
  const [voice, setVoice] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f3f7fc" : "#070d1c");
  }, [theme]);

  useEffect(() => {
    const onHash = () => {
      setGuideSlug(readGuideSlug());
      setHowOpen(window.location.hash === "#how-it-works");
      setMenu(false);
      setAppOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add("show");
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const closeMenus = () => {
    setMenu(false);
    setAppOpen(false);
  };

  const openPage = (group, title) => {
    closeMenus();
    const next = `guide/${pageSlug(group, title)}`;
    if (window.location.hash === `#${next}`) {
      setGuideSlug(pageSlug(group, title));
      window.scrollTo(0, 0);
      return;
    }
    window.location.hash = next;
  };

  const guidePage = findGuidePage(guideSlug);

  return (
    <div className="site">
      <div className="top-line" />

      <header className="navbar">
        <a className="brand" href="#home">
            <img className="brand-mark" src="/accountsorbit-logo.jpg" alt="" />
          <div>
            <div className="brand-kicker">HINDI VOICE-FIRST BUSINESS TOOL</div>
            <div className="brand-name">AccountsOrbit</div>
            <div className="brand-sub">Your Business. In Orbit.</div>
          </div>
        </a>

        <div className="nav-end">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            type="button"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
              </svg>
            )}
          </button>
          <button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
          <nav className={menu ? "nav-links open" : "nav-links"}>
            <a href="#features" onClick={closeMenus}>Features</a>
            <a href="#how-it-works" onClick={closeMenus}>How it works</a>
            <a href="#dashboard" onClick={closeMenus}>Dashboard</a>
            <div className={`nav-app${appOpen ? " open" : ""}`}>
              <button
                type="button"
                className="nav-app-btn"
                aria-expanded={appOpen}
                onClick={() => setAppOpen((open) => !open)}
              >
                The App <span aria-hidden="true">{appOpen ? "▴" : "▾"}</span>
              </button>
              <div className="app-mega" hidden={!appOpen}>
                <div className="app-mega-top">
                  <div>
                    <div className="eyebrow">INSIDE ACCOUNTSORBIT</div>
                    <strong>App ke har hisse ka kaam, seedhi bhasha mein.</strong>
                  </div>
                  <a href="#app-screens" onClick={closeMenus}>Poori list dekho →</a>
                </div>
                <div className="app-mega-grid">
                  {appGuide.map(({ group, blurb, items }) => (
                    <div className="app-mega-col" key={group}>
                      <div className="app-mega-group">{group}</div>
                      <p>{blurb}</p>
                      {items.map(([title]) => (
                        <button type="button" key={title} onClick={() => openPage(group, title)}>{title}</button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href="#security" onClick={closeMenus}>Security</a>
            <a className="nav-cta" href="/AccountsOrbit-Setup.zip" download="AccountsOrbit-Setup.zip" onClick={closeMenus}>Download App</a>
          </nav>
        </div>
      </header>
      {appOpen && <button type="button" className="mega-scrim" aria-label="Close app menu" onClick={() => setAppOpen(false)} />}

      <main>
        {guidePage ? <GuidePage page={guidePage} onOpen={openPage} /> : null}
        {howOpen && !guidePage ? <HowPage /> : null}
        <div hidden={!!guidePage || howOpen}>
        <section className="hero" id="home">
          <div className="hero-grid" />
          <div className="hero-copy reveal">
            <div className="status-pill"><span className="pulse-dot" /> BUILT FOR BHARAT'S SMALL BUSINESSES</div>
            <h1>Business ka kaam.<br/><span>Bas bolkar.</span></h1>
            <p className="hero-text">
              AccountsOrbit is a Hindi voice-first business assistant for
              traders and shopkeepers. Manage invoices, payments, purchases,
              inventory and sales — without complicated accounting software.
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#download">Start Managing Smarter <span>→</span></a>
              <a className="btn ghost" href="#how-it-works"><span className="play">▶</span> See how it works</a>
            </div>

            <div className="trust-row">
              <div><strong>Hindi-first</strong><span>Simple commands</span></div>
              <i></i>
              <div><strong>GST ready</strong><span>Business records</span></div>
              <i></i>
              <div><strong>One dashboard</strong><span>Everything together</span></div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="glow glow-a" />
            <div className="glow glow-b" />

            <div className="floating-card voice-card">
              <span className="mini-icon">🎙️</span>
              <div><small>VOICE COMMAND</small><strong>“Invoice bana do”</strong></div>
              <span className="wave">▂▅▇▅▂</span>
            </div>

            <div className="dashboard-window">
              <div className="window-top">
                <div className="window-brand"><img className="tiny-logo" src="/accountsorbit-logo.jpg" alt="" /><b>AccountsOrbit</b><small>AI Dashboard</small></div>
                <div className="window-tools"><span>Voice: <b>ON</b></span><span className="green-dot"></span><span>● ● ●</span></div>
              </div>
              <div className="window-body">
                <aside>
                  <div className="side-title">MAIN</div>
                  {["🏠 Overview","🧾 Invoice","📥 Purchase","💸 Payment","💰 Receipt"].map(x =>
                    <div key={x} className={active === x ? "side-item active" : "side-item"} onClick={() => setActive(x)}>{x}</div>
                  )}
                  <div className="side-title">BUSINESS</div>
                  {["📦 Inventory","📊 Total Sales"].map(x =>
                    <div key={x} className="side-item">{x}</div>
                  )}
                  <div className="side-title">ACCOUNTING</div>
                  {["📖 Credit Ledger","📒 Ledgers","📦 Stock Items","🧾 New Voucher"].map(x =>
                    <div key={x} className="side-item">{x}</div>
                  )}
                </aside>

                <div className="dash-main">
                  <div className="dash-heading"><div><small>DASHBOARD SUMMARY</small><h3>AI Accountant & Business Overview</h3></div><span className="date-badge">07-09-2026</span></div>
                  <div className="summary-strip">Account: <b>Lokanshi</b> &nbsp;|&nbsp; Sales: <b>12</b> &nbsp;|&nbsp; Invoices: <b>8</b></div>
                  <div className="stat-grid">
                    <div className="stat sales"><small>Total Sales</small><strong>₹48,448</strong></div>
                    <div className="stat expense"><small>Total Expense</small><strong>₹12,000</strong></div>
                    <div className="stat profit"><small>Net Profit / Loss</small><strong>₹36,448</strong></div>
                    <div className="stat credit"><small>Total Credit Due</small><strong>₹8,400</strong></div>
                  </div>
                  <div className="alert">⚠️ <b>Low Stock</b> — 2 items need attention</div>
                  <div className="today-title">TODAY'S SUMMARY <span>— MONDAY, 7 SEPTEMBER 2026</span></div>
                  <div className="today-grid">
                    <div><small>Today Cash</small><b>₹8,000</b></div>
                    <div><small>Today UPI</small><b>₹12,450</b></div>
                    <div><small>Today Credit Sale</small><b>₹4,000</b></div>
                    <div><small>Today Collection</small><b>₹9,800</b></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card profit-card"><span>📈</span><div><small>TODAY'S PROFIT</small><strong>+ ₹8,240</strong></div></div>
          </div>
        </section>

        <section className="marquee">
          <div>VOICE-FIRST <span>✦</span> GST READY <span>✦</span> INVENTORY <span>✦</span> KHATA <span>✦</span> PAYMENTS <span>✦</span> INVOICES <span>✦</span> BUSINESS TRACKING <span>✦</span></div>
        </section>

        <section className="section features-section" id="features">
          <div className="section-heading reveal">
            <div className="eyebrow">EVERYTHING YOUR BUSINESS NEEDS</div>
            <h2>One app. <span>Every business task.</span></h2>
            <p>From your first invoice of the day to the final payment entry — AccountsOrbit keeps it simple.</p>
          </div>
          <FeatureCarousel items={features} />
          <FeatureCarousel items={modules} variant="module" />
        </section>

        <section className="section voice-section" id="how">
          <div className="voice-panel reveal">
            <div className="voice-content">
              <div className="eyebrow">THE ACCOUNTSORBIT DIFFERENCE</div>
              <h2>Computer se baat nahi.<br/><span>Apne kaam se baat karo.</span></h2>
              <p>
                No complicated menus. No accounting jargon overload.
                Just tell AccountsOrbit what you need in the way you already speak.
              </p>
              <div className="command-demo">
                <div className="mic-button" onClick={() => setVoice(!voice)}>{voice ? "●" : "🎙️"}</div>
                <div><small>{voice ? "LISTENING..." : "TRY A COMMAND"}</small><strong>{voice ? "“Payment receive kar liya”" : "“Ramesh ka ₹5,000 payment entry karo”"}</strong></div>
              </div>
              <div className="language-pills"><span>हिन्दी</span><span>Hinglish</span><span>Simple English</span></div>
            </div>
            <div className="voice-art">
              <div className="orb"><span>🎙️</span></div>
              <div className="orbit orbit-1"></div><div className="orbit orbit-2"></div><div className="orbit orbit-3"></div>
              <div className="voice-bubble b1">Invoice bana do</div>
              <div className="voice-bubble b2">Stock kitna hai?</div>
              <div className="voice-bubble b3">₹5000 receive hua</div>
            </div>
          </div>
        </section>

        <section className="section workflow-section">
          <div className="section-heading reveal">
            <div className="eyebrow">HOW IT WORKS</div>
            <h2>Kaam karo. <span>System sambhal lega.</span></h2>
          </div>
          <div className="workflow">
            {workflow.map(([n, title, text]) => (
              <div className="step reveal" key={n}>
                <div className="step-num">{n}</div>
                <div className="step-line"></div>
                <h3>{title}</h3><p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section dashboard-section" id="dashboard">
          <div className="dashboard-copy reveal">
            <div className="eyebrow">YOUR BUSINESS AT A GLANCE</div>
            <h2>A dashboard that <span>speaks business.</span></h2>
            <p>Inspired by the real AccountsOrbit dashboard — clean numbers, clear actions and all your daily business information in one place.</p>
            <div className="check-list">
              <div>✓ Sales, expense & profit snapshot</div>
              <div>✓ Credit due & collection tracking</div>
              <div>✓ Low-stock alerts</div>
              <div>✓ Sales history & business records</div>
            </div>
            <a className="text-link" href="#download">Explore AccountsOrbit <span>→</span></a>
          </div>

          <div className="analytics-card reveal">
            <div className="analytics-top"><div><small>BUSINESS OVERVIEW</small><h3>September Performance</h3></div><span>Live</span></div>
            <div className="chart">
              <div className="chart-labels"><span>₹60K</span><span>₹40K</span><span>₹20K</span><span>₹0</span></div>
              <svg viewBox="0 0 600 230" preserveAspectRatio="none" aria-label="Sales chart">
                <defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopOpacity=".32"/><stop offset="1" stopOpacity="0"/></linearGradient></defs>
                <path d="M0,190 C50,180 65,140 110,155 S165,170 210,105 S265,130 315,92 S370,115 420,70 S480,90 520,45 S570,55 600,25 L600,230 L0,230 Z" fill="url(#fill)"/>
                <path d="M0,190 C50,180 65,140 110,155 S165,170 210,105 S265,130 315,92 S370,115 420,70 S480,90 520,45 S570,55 600,25" fill="none" stroke="currentColor" strokeWidth="4"/>
              </svg>
            </div>
            <div className="analytics-bottom">
              <div><small>Total Sales</small><b>₹1,84,420</b><span>↑ 18.4%</span></div>
              <div><small>Collections</small><b>₹1,46,200</b><span>↑ 12.1%</span></div>
              <div><small>Credit Due</small><b>₹38,220</b><span>Needs follow-up</span></div>
            </div>
          </div>
        </section>

        <section className="section app-screens-section" id="app-screens">
          <div className="section-heading reveal">
            <div className="eyebrow">REAL ACCOUNTSORBIT APP</div>
            <h2>See the app. <span>Not just a promise.</span></h2>
            <p>Every section of AccountsOrbit, explained in simple words — so you know exactly what the app can do.</p>
          </div>
          <div className="app-guide">
            {appGuide.map(({ group, blurb, items }) => (
              <article className="app-guide-group reveal" id={`guide-${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={group}>
                <header className="app-guide-head">
                  <div className="app-guide-kicker">{group}</div>
                  <p>{blurb}</p>
                </header>
                <div className="app-guide-grid">
                  {items.map(([title, text]) => (
                    <button type="button" className="app-guide-item" id={guideId(group, title)} key={title} onClick={() => openPage(group, title)}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <span>Poori baat padho →</span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="security-section" id="security">
          <div className="security-inner reveal">
            <div className="security-icon">🔐</div>
            <div><div className="eyebrow">BUILT WITH TRUST IN MIND</div><h2>Your business data deserves <span>protection.</span></h2><p>App lock, organized records and a focused business workspace — designed to keep your information accessible to you and away from unnecessary complexity.</p></div>
            <div className="security-badge"><b>SECURE</b><small>Business workspace</small></div>
          </div>
        </section>

        <section className="cta-section" id="download">
          <div className="cta-glow"></div>
          <div className="reveal">
            <div className="eyebrow">READY TO WORK SMARTER?</div>
            <h2>Business ka hisaab.<br/><span>Ab simple hai.</span></h2>
            <p>Download AccountsOrbit and manage invoices, stock, payments and daily hisaab from your phone.</p>
            <div className="download-row">
              <a className="store-btn" href="#download" aria-label="Download on Google Play">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.6 2.3c-.4.2-.6.7-.6 1.2v16.9c0 .5.2 1 .6 1.2l9.7-9.65L3.6 2.3zm11.2 6.3 2.6 1.5-2.6 1.5-2.2-1.5 2.2-1.5zM4.8 21.4 13 13.2l2.3 2.3-10.5 6zm10.5-13.1L4.8 2.3 15.3 8.3l-2.3 2.3 2.3-2.3zM16.7 9.2l3.1 1.8c.9.5.9 1.8 0 2.3l-3.1 1.8-2.7-1.8 2.7-1.8z"/></svg>
                <span><small>GET IT ON</small><strong>Google Play</strong></span>
              </a>
              <a className="store-btn" href="#download" aria-label="Download on the App Store">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-1-3-.9c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.8zM14.3 6.3c.6-.8 1.1-1.9.9-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.4z"/></svg>
                <span><small>Download on the</small><strong>App Store</strong></span>
              </a>
            </div>
            <small className="privacy-note">Available on Android and iOS.</small>
          </div>
        </section>
        </div>
      </main>

      <footer>
        <div className="footer-brand">
          <a className="brand" href="#home"><img className="brand-mark" src="/accountsorbit-logo.jpg" alt="" /><div><div className="brand-name">AccountsOrbit</div><div className="brand-sub">Your Business. In Orbit.</div></div></a>
          <p>Hindi voice-first business management for the people who keep business moving.</p>
        </div>
        <div className="footer-links">
          <div><b>Product</b><a href="#features">Features</a><a href="#dashboard">Dashboard</a><a href="#how-it-works">How it works</a></div>
          <div><b>Company</b><a href="#security">Security</a><a href="/AccountsOrbit-Setup.zip" download="AccountsOrbit-Setup.zip">Download App</a></div>
          <div><b>Contact</b><a href="mailto:ao.orbits@gmail.com">ao.orbits@gmail.com</a><a href="#download">Support</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 AccountsOrbit. All rights reserved.</span><span>Made for Bharat 🇮🇳</span></div>
      </footer>

    </div>
  );
}

export default App;
