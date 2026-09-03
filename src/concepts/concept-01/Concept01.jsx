import { useEffect, useRef, useState } from "react";
import heroImage from "./assets/vayren-hero.png";
import exteriorImage from "./assets/vayren-exterior-day.png";
import interiorImage from "./assets/vayren-interior.png";
import materialImage from "./assets/vayren-material-detail.png";
import landscapeImage from "./assets/vayren-landscape.png";
import terraceImage from "./assets/vayren-terrace.png";
import winterImage from "./assets/vayren-winter.png";
import ResidenceCatalogue from "./components/ResidenceCatalogue";

const copy = {
  sk: {
    nav: [["residences", "Rezidencie"], ["architecture", "Architektúra"], ["amenities", "Vybavenie"], ["location", "Lokalita"], ["contact", "Kontakt"]],
    menuOpen: "Otvoriť menu", menuClose: "Zavrieť menu",
    heroType: "Súkromné horské rezidencie", heroLocation: "Vysoké Tatry · Slovensko", heroCount: "24 súkromných rezidencií", discover: "Objavte VAYREN",
    philosophyLabel: "01 / Filozofia", philosophyTitle: "Pokojnejší spôsob života.", philosophyText: "VAYREN je súkromná kolekcia horských rezidencií vytvorená v rovnováhe medzi architektúrou, krajinou a každodenným komfortom.",
    architectureLabel: "02 / Architektúra", architectureTitle: <>Navrhnuté s krajinou.<br /><em>Nie proti nej.</em></>, architectureText: "Tri nízke architektonické objemy prirodzene sledujú horský svah. Kameň, drevo a sklo prepájajú interiér s krajinou, zatiaľ čo hlboké terasy a odstupy medzi rezidenciami chránia súkromie.", architectureNote: "Prírodné materiály · panoramatické zasklenie · rešpekt k terénu",
    residencesLabel: "03 / Rezidencie", residencesTitle: "24 súkromných rezidencií", residencesIntro: "Štyri premyslené typológie. Od kompaktného horského útočiska po veľkorysý penthouse s panoramatickým výhľadom.", rooms: "izby", units: "rezidencií", explore: "Preskúmať rezidencie",
    amenitiesLabel: "04 / Vybavenie", amenitiesTitle: <>Navrhnuté pre súkromie.<br /><em>Vytvorené pre život.</em></>, amenities: ["Súkromné wellness", "Lounge pre rezidentov", "Lyžiareň a bicykláreň", "Podzemné parkovanie", "Nabíjanie elektromobilov", "Starostlivosť o nehnuteľnosť"], amenitiesText: "Spoločné priestory sú diskrétne, pokojné a vždy nablízku. Slúžia každodennému pohodliu bez toho, aby narúšali súkromný charakter VAYREN.",
    locationLabel: "05 / Lokalita", locationTitle: <>Bližšie k prírode.<br /><em>Blízko všetkého podstatného.</em></>, locationText: "Vysoké Tatry tvoria koncepčný rámec VAYREN — krajinu výrazných ročných období, čistého horského vzduchu a dní, ktoré prirodzene menia tempo.", locationMeta: "Vysoké Tatry · koncepčné regionálne zasadenie",
    selectedLabel: "06 / Vybraná rezidencia", selectedType: "Panorama Residence", residenceData: ["3 spálne", "118 m² interiér", "31 m² terasa", "2. podlažie", "juhozápadná orientácia", "2 parkovacie miesta"], available: "Voľná", price: "649 000 €", viewing: "Mám záujem o súkromnú obhliadku",
    closingTitle: "Vaše miesto nad každodennosťou.", closingText: <>Súkromné obhliadky<br />po dohode.</>, closingAction: "Dohodnúť súkromnú obhliadku",
    disclosure: "Koncepčný projekt vytvorený štúdiom URVEO.", fictional: "VAYREN je fiktívny portfóliový koncept. Nejde o reálny developerský projekt ani investičnú ponuku.",
    modalTitle: "Súkromná obhliadka", modalText: "Toto je vizuálny prototyp kontaktnej skúsenosti. Formulár ani odosielanie údajov nie sú v koncepte aktívne.", modalClose: "Zavrieť", modalInterest: "Záujem o rezidenciu",
  },
  en: {
    nav: [["residences", "Residences"], ["architecture", "Architecture"], ["amenities", "Amenities"], ["location", "Location"], ["contact", "Contact"]],
    menuOpen: "Open menu", menuClose: "Close menu",
    heroType: "Private Mountain Residences", heroLocation: "High Tatras · Slovakia", heroCount: "24 private residences", discover: "Discover VAYREN",
    philosophyLabel: "01 / Philosophy", philosophyTitle: "A quieter way to live.", philosophyText: "VAYREN is a private collection of mountain residences shaped around a considered balance of architecture, landscape and everyday comfort.",
    architectureLabel: "02 / Architecture", architectureTitle: <>Designed with the landscape.<br /><em>Not against it.</em></>, architectureText: "Three low-rise volumes follow the natural mountain slope. Stone, timber and glass connect each interior to the landscape, while deep terraces and considered spacing preserve privacy.", architectureNote: "Natural materials · panoramic glazing · respect for the terrain",
    residencesLabel: "03 / Residences", residencesTitle: "24 private residences", residencesIntro: "Four considered typologies, ranging from a compact mountain retreat to a generous penthouse framed by panoramic views.", rooms: "rooms", units: "residences", explore: "Explore residences",
    amenitiesLabel: "04 / Amenities", amenitiesTitle: <>Designed for privacy.<br /><em>Created for life.</em></>, amenities: ["Private wellness", "Residents lounge", "Ski & bike room", "Underground parking", "EV charging", "Property care"], amenitiesText: "Shared spaces are discreet, calm and always close at hand—supporting daily comfort without compromising the private character of VAYREN.",
    locationLabel: "05 / Location", locationTitle: <>Closer to nature.<br /><em>Connected to what matters.</em></>, locationText: "The High Tatras form VAYREN’s conceptual setting—a landscape of distinct seasons, clear mountain air and days that naturally move at a different pace.", locationMeta: "High Tatras · conceptual regional setting",
    selectedLabel: "06 / Selected residence", selectedType: "Panorama Residence", residenceData: ["3 bedrooms", "118 m² interior", "31 m² terrace", "2nd floor", "South-West orientation", "2 parking spaces"], available: "Available", price: "€649,000", viewing: "Request private viewing",
    closingTitle: "Your place above the ordinary.", closingText: <>Private viewings<br />by appointment.</>, closingAction: "Request private viewing",
    disclosure: "Conceptual project by URVEO.", fictional: "VAYREN is a fictional portfolio concept. It is not a real property development or investment opportunity.",
    modalTitle: "Private viewing", modalText: "This is a visual prototype of the enquiry experience. No form submission or data delivery is active in this concept.", modalClose: "Close", modalInterest: "Interest in residence",
  },
};

const imageAlt = {
  sk: {
    hero: "Rezidencie VAYREN zasadené do horskej krajiny Vysokých Tatier",
    exterior: "Detail modernej horskej architektúry VAYREN z kameňa, dreva a skla",
    interior: "Interiér rezidencie VAYREN s krbom a panoramatickým výhľadom na hory",
    material: "Detail kamennej, drevenej a kovovej fasády VAYREN",
    landscape: "Horská krajina Vysokých Tatier",
    terrace: "Terasa rezidencie B.07 s panoramatickým výhľadom na Tatry",
    winter: "Rezidencie VAYREN v zimnej horskej krajine počas modrej hodiny",
  },
  en: {
    hero: "VAYREN residences set in the High Tatras mountain landscape",
    exterior: "VAYREN mountain architecture in stone, timber and glass",
    interior: "VAYREN residence interior with a fireplace and panoramic mountain view",
    material: "Stone, timber and metal facade detail at VAYREN",
    landscape: "Mountain landscape of the High Tatras",
    terrace: "B.07 residence terrace with a panoramic view of the Tatras",
    winter: "VAYREN residences in a winter mountain landscape at blue hour",
  },
};

function MediaSlot({ asset, src, alt, ratio = "landscape", priority = false }) {
  return <div className={`c01-media c01-media--${ratio}`} data-asset={asset}><img className={`c01-media__image c01-media__image--${asset}`} src={src} alt={alt} width="1672" height="941" loading={priority ? "eager" : "lazy"} decoding={priority ? "sync" : "async"} fetchPriority={priority ? "high" : undefined} /></div>;
}
function Arrow() { return <span aria-hidden="true">↗</span>; }

function Concept01() {
  const [language, setLanguage] = useState("sk");
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewingOpen, setViewingOpen] = useState(false);
  const [viewingResidenceId, setViewingResidenceId] = useState(null);
  const modalRef = useRef(null);
  const viewingTriggerRef = useRef(null);
  const t = copy[language];

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    if (!viewingOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === "Escape" && setViewingOpen(false);
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      viewingTriggerRef.current?.focus();
    };
  }, [viewingOpen]);
  useEffect(() => {
    const elements = document.querySelectorAll(".c01-reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { elements.forEach((element) => element.classList.add("c01-reveal--visible")); return undefined; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("c01-reveal--visible")), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const selectLanguage = (next) => { setLanguage(next); setMenuOpen(false); };
  const closeMenu = () => setMenuOpen(false);
  const openViewing = (residenceId = null) => { viewingTriggerRef.current = document.activeElement; setViewingResidenceId(residenceId); setViewingOpen(true); };
  return (
    <main className="c01-shell">
      <header className={`c01-header ${menuOpen ? "c01-header--open" : ""}`}>
        <a className="c01-wordmark" href="#top" onClick={closeMenu} aria-label="VAYREN – home">VAYREN</a>
        <nav className="c01-nav" aria-label={language === "sk" ? "Hlavná navigácia" : "Main navigation"}>{t.nav.map(([target, label]) => <a key={target} href={`#${target}`}>{label}</a>)}</nav>
        <div className="c01-languages" aria-label={language === "sk" ? "Výber jazyka" : "Language selection"}>
          <button type="button" className={language === "sk" ? "is-active" : ""} onClick={() => selectLanguage("sk")} aria-pressed={language === "sk"}>SK</button><span>/</span><button type="button" className={language === "en" ? "is-active" : ""} onClick={() => selectLanguage("en")} aria-pressed={language === "en"}>EN</button>
        </div>
        <button className="c01-menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="c01-mobile-panel" aria-label={menuOpen ? t.menuClose : t.menuOpen}><span /><span /></button>
        <div className="c01-mobile-panel" id="c01-mobile-panel"><nav aria-label={language === "sk" ? "Mobilná navigácia" : "Mobile navigation"}>{t.nav.map(([target, label], index) => <a key={target} href={`#${target}`} onClick={closeMenu}><small>0{index + 1}</small>{label}</a>)}</nav><p>Vysoké Tatry · Slovakia</p></div>
      </header>

      <section className="c01-hero" id="top" aria-labelledby="c01-title">
        <MediaSlot asset="vayren-hero" src={heroImage} alt={imageAlt[language].hero} ratio="hero" priority /><div className="c01-hero__shade" />
        <div className="c01-hero__content"><p className="c01-hero__type">{t.heroType}</p><h1 id="c01-title">VAYREN</h1><p className="c01-claim">Above the ordinary.</p><div className="c01-hero__meta"><span>{t.heroLocation}</span><span>{t.heroCount}</span></div></div>
        <a className="c01-scroll" href="#philosophy"><span />{t.discover}</a>
      </section>

      <section className="c01-philosophy c01-section c01-reveal" id="philosophy" aria-labelledby="c01-philosophy-title"><p className="c01-section-label">{t.philosophyLabel}</p><div><h2 id="c01-philosophy-title">{t.philosophyTitle}</h2><p>{t.philosophyText}</p></div></section>

      <section className="c01-architecture c01-section" id="architecture" aria-labelledby="c01-architecture-title">
        <div className="c01-architecture__image c01-reveal"><MediaSlot asset="vayren-exterior-day" src={exteriorImage} alt={imageAlt[language].exterior} ratio="portrait" /></div>
        <div className="c01-architecture__copy c01-reveal"><p className="c01-section-label">{t.architectureLabel}</p><h2 id="c01-architecture-title">{t.architectureTitle}</h2><p>{t.architectureText}</p><small>{t.architectureNote}</small></div>
        <div className="c01-architecture__detail c01-reveal"><MediaSlot asset="vayren-material-detail" src={materialImage} alt={imageAlt[language].material} ratio="wide" /></div>
      </section>

      <section className="c01-residences c01-section" id="residences" aria-labelledby="c01-residences-title">
        <div className="c01-section-heading c01-reveal"><p className="c01-section-label">{t.residencesLabel}</p><h2 id="c01-residences-title">{t.residencesTitle}</h2><p>{t.residencesIntro}</p></div>
        <ResidenceCatalogue language={language} onViewing={openViewing} />
      </section>

      <section className="c01-amenities c01-section" id="amenities" aria-labelledby="c01-amenities-title">
        <div className="c01-amenities__visual c01-reveal"><MediaSlot asset="vayren-interior" src={interiorImage} alt={imageAlt[language].interior} ratio="landscape" /></div>
        <div className="c01-amenities__heading c01-reveal"><p className="c01-section-label">{t.amenitiesLabel}</p><h2 id="c01-amenities-title">{t.amenitiesTitle}</h2><p>{t.amenitiesText}</p></div>
        <ol className="c01-amenities__list c01-reveal">{t.amenities.map((amenity, index) => <li key={amenity}><span>0{index + 1}</span>{amenity}</li>)}</ol>
      </section>

      <section className="c01-location c01-section" id="location" aria-labelledby="c01-location-title">
        <div className="c01-location__visual"><MediaSlot asset="vayren-landscape" src={landscapeImage} alt={imageAlt[language].landscape} ratio="panorama" /></div>
        <div className="c01-location__content c01-reveal"><p className="c01-section-label">{t.locationLabel}</p><h2 id="c01-location-title">{t.locationTitle}</h2><p>{t.locationText}</p><small>{t.locationMeta}</small></div>
      </section>

      <section className="c01-selected c01-section" id="selected" aria-labelledby="c01-selected-title">
        <div className="c01-selected__visual c01-reveal"><MediaSlot asset="vayren-terrace" src={terraceImage} alt={imageAlt[language].terrace} ratio="portrait-wide" /></div>
        <div className="c01-selected__content c01-reveal"><p className="c01-section-label">{t.selectedLabel}</p><div className="c01-selected__identity"><span>B.07</span><h2 id="c01-selected-title">{t.selectedType}</h2></div><ul>{t.residenceData.map((item) => <li key={item}>{item}</li>)}</ul><div className="c01-selected__price"><strong>{t.price}</strong><span>{t.available}</span></div><button className="c01-text-link" type="button" onClick={() => openViewing("B.07")}>{t.viewing} <Arrow /></button></div>
      </section>

      <section className="c01-closing" id="contact" aria-labelledby="c01-closing-title">
        <MediaSlot asset="vayren-winter" src={winterImage} alt={imageAlt[language].winter} ratio="closing" /><div className="c01-closing__shade" />
        <div className="c01-closing__content c01-reveal"><p className="c01-wordmark">VAYREN</p><h2 id="c01-closing-title">{t.closingTitle}</h2><p>{t.closingText}</p><button className="c01-light-link" type="button" onClick={() => openViewing()}>{t.closingAction} <Arrow /></button></div>
      </section>

      <footer className="c01-footer"><p className="c01-wordmark">VAYREN</p><div><p>{t.disclosure}</p><small>{t.fictional}</small></div><a href="#top" aria-label={language === "sk" ? "Späť hore" : "Back to top"}>↑</a></footer>

      {viewingOpen && <div className="c01-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setViewingOpen(false)}><section className="c01-modal" role="dialog" aria-modal="true" aria-labelledby="c01-modal-title" ref={modalRef} tabIndex="-1"><button type="button" className="c01-modal__close" onClick={() => setViewingOpen(false)} aria-label={t.modalClose}>×</button><p className="c01-section-label">VAYREN / Concept interaction</p><h2 id="c01-modal-title">{t.modalTitle}</h2>{viewingResidenceId && <strong className="c01-modal__context">{t.modalInterest} {viewingResidenceId}</strong>}<p>{t.modalText}</p><button type="button" className="c01-text-link" onClick={() => setViewingOpen(false)}>{t.modalClose} <span aria-hidden="true">←</span></button></section></div>}
    </main>
  );
}

export default Concept01;
