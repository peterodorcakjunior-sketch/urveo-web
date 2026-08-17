import { useState } from "react";
import "./App.css";
import urveoLogo from "./assets/urveo-logo.png";

const Icon = ({ name }) => {
  const paths = {
    phone: <><rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M10 18.5h4"/></>,
    web: <><rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="M2.5 8.5h19M7 4v16"/></>,
    cart: <><path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></>,
    server: <><rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

const services = [
  { icon: "phone", number: "01", title: "Mobilné aplikácie", text: "Intuitívne iOS a Android aplikácie navrhnuté okolo používateľa a cieľov vášho biznisu." },
  { icon: "web", number: "02", title: "Webstránky & vývoj", text: "Výkonné webové riešenia s precíznym dizajnom, ktoré menia návštevy na reálne výsledky." },
  { icon: "cart", number: "03", title: "E-commerce", text: "Rýchle a prehľadné obchody pripravené rásť spolu s vašou značkou a zákazníkmi." },
  { icon: "server", number: "04", title: "Backend riešenia", text: "Stabilné API, integrácie a systémy, ktoré bezpečne držia váš digitálny produkt pohromade." },
];

const projects = [
  { title: "D•ART", tag: "Mobile · Platform", text: "Mobilná aplikácia a administračný systém pre reštauráciu s vlastným rozvozom.", visual: "dart" },
  { title: "Nexa", tag: "Web · Digital identity", text: "Digitálna identita a konverzný web pre progresívnu technologickú spoločnosť.", visual: "nexa" },
  { title: "Aether", tag: "E-commerce · Experience", text: "Minimalistický nákupný zážitok s dôrazom na rýchlosť a bezproblémový checkout.", visual: "aether" },
];

function Logo() {
  return <span className="logo" aria-label="URVEO"><span className="logo-left">UR</span><span className="logo-v">V</span><span className="logo-right">EO</span></span>;
}

function ProductVisual() {
  return (
    <div className="product-stage" aria-label="Ukážka digitálneho produktu">
      <div className="stage-orbit orbit-one"/><div className="stage-orbit orbit-two"/>
      <div className="product-window">
        <div className="window-bar"><div className="window-dots"><i/><i/><i/></div><span>URVEO / PULSE</span><b>LIVE</b></div>
        <div className="product-shell">
          <aside className="product-nav"><div className="mini-mark">V</div>{[0,1,2,3].map(i => <i key={i} className={i === 0 ? "active" : ""}/>)}</aside>
          <div className="product-main">
            <div className="product-heading"><div><small>PERFORMANCE OVERVIEW</small><h3>Good evening, Peter.</h3></div><button>Last 30 days <span>⌄</span></button></div>
            <div className="metric-row"><div><small>Total revenue</small><strong>€84,620</strong><em>+18.4%</em></div><div><small>Active users</small><strong>12.8K</strong><em>+8.2%</em></div><div><small>Conversion</small><strong>6.42%</strong><em>+1.1%</em></div></div>
            <div className="analytics-row">
              <div className="graph-card"><div className="graph-title"><span>Growth</span><b>€84.6k</b></div><svg viewBox="0 0 500 150" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9b7cff" stopOpacity=".28"/><stop offset="1" stopColor="#9b7cff" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 130 C45 122 50 108 90 112 S150 88 184 96 S230 77 266 81 S320 43 353 57 S410 29 500 18 L500 150 L0 150Z"/><path className="line" d="M0 130 C45 122 50 108 90 112 S150 88 184 96 S230 77 266 81 S320 43 353 57 S410 29 500 18"/></svg></div>
              <div className="pulse-card"><small>SYSTEM PULSE</small><div className="pulse-ring"><span>99.9<sup>%</sup></span></div><p>All systems operational</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-status"><span className="status-icon">✓</span><div><small>DEPLOYMENT COMPLETE</small><strong>Version 2.4 is live</strong></div></div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <main>
      <header className="site-header"><a href="#home" onClick={closeMenu}><img src={urveoLogo} alt="URVEO" style={{ display: "block", width: "auto", height: 30, objectFit: "contain" }} /></a><nav className={menuOpen ? "open" : ""} aria-label="Hlavná navigácia">{[["home","Domov"],["services","Služby"],["projects","Naše práce"],["about","O nás"],["contact","Kontakt"]].map(([id,label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}</nav><a href="#contact" className="nav-cta">Začať projekt <span>↗</span></a><button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Otvoriť menu" aria-expanded={menuOpen}><i/><i/></button></header>

      <section className="hero" id="home"><div className="hero-ambient"/><div className="hero-copy"><p className="eyebrow"><span/>DIGITÁLNE PRODUKTY. PRECÍZNE VYTVORENÉ.</p><h1>Tvoríme digitálne<br/>produkty, ktoré<br/><span>posúvajú biznis.</span></h1><p className="hero-description">Navrhujeme a vyvíjame výnimočné digitálne riešenia — od prvého konceptu až po produkt, ktorý rastie s vami.</p><div className="hero-actions"><a className="button-primary" href="#contact">Začať projekt <span>↗</span></a><a className="button-link" href="#projects">Pozrieť naše práce <span>↓</span></a></div><div className="hero-proof"><div className="proof-avatars"><i>U</i><i>R</i><i>V</i></div><p><strong>Partner pre digitálny rast</strong><span>Stratégia · Dizajn · Technológie</span></p></div></div><ProductVisual /></section>

      <section className="services section" id="services"><div className="section-intro"><div><p className="eyebrow"><span/>ČO TVORÍME</p><h2>Od nápadu po <span>digitálny produkt.</span></h2></div><p>Spájame premyslený dizajn so spoľahlivou technológiou. Výsledkom sú produkty, ktoré nielen dobre vyzerajú, ale prinášajú hodnotu.</p></div><div className="service-grid">{services.map(service => <article className="service-card" key={service.title}><div className="card-top"><div className="service-icon"><Icon name={service.icon}/></div><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`${service.title} – viac informácií`}>Zistiť viac <span>↗</span></a></article>)}</div></section>

      <section className="projects section" id="projects"><div className="section-intro projects-intro"><div><p className="eyebrow"><span/>VYBRANÉ PROJEKTY</p><h2>Práca, ktorá má <span>výsledky.</span></h2></div><a className="button-link" href="#contact">Všetky projekty <span>↗</span></a></div><div className="project-list">{projects.map((project, index) => <article className="project-card" key={project.title}><div className={`project-visual ${project.visual}`}><span className="project-index">0{index+1}</span>{project.visual === "dart" && <div className="phone-mock"><div className="phone-screen"><small>D•ART</small><div className="food-orb">D</div><strong>Discover taste.</strong><i/></div></div>}{project.visual === "nexa" && <div className="nexa-mark"><i/><span>N</span><i/></div>}{project.visual === "aether" && <div className="aether-shape"><i/><i/><i/></div>}<div className="visual-noise"/></div><div className="project-info"><p>{project.tag}</p><h3>{project.title}</h3><span>{project.text}</span><a href="#contact">Detail projektu <b>↗</b></a></div></article>)}</div></section>

      <section className="about section" id="about"><div className="about-glow"/><div><p className="eyebrow"><span/>PREČO URVEO</p><h2>Menej hluku.<br/><span>Viac podstaty.</span></h2></div><div className="about-content"><p>Nie sme len dodávateľ. Sme partner, ktorý rozumie vášmu biznisu a pretaví jeho potenciál do digitálneho produktu.</p><div className="principles"><div><strong>01</strong><span>Premyslené do detailu</span></div><div><strong>02</strong><span>Postavené pre rast</span></div><div><strong>03</strong><span>Komunikácia bez bariér</span></div></div></div></section>

      <section className="contact section" id="contact"><div className="contact-orb"/><p className="eyebrow"><span/>MÁTE NÁPAD?</p><h2>Vytvorme niečo<br/><span>výnimočné.</span></h2><p className="contact-copy">Povedzte nám o svojom projekte. Ozveme sa vám a spoločne nájdeme najlepšiu cestu vpred.</p><a href="mailto:info@urveo.sk" className="button-primary large">Napísať nám <span>↗</span></a><p className="contact-email">info@urveo.sk</p></section>

      <footer><div className="footer-brand"><Logo/><p>Digitálne produkty vytvorené pre rast.</p></div><div className="footer-links"><div><small>NAVIGÁCIA</small><a href="#services">Služby</a><a href="#projects">Projekty</a><a href="#about">O nás</a></div><div><small>KONTAKT</small><a href="mailto:info@urveo.sk">info@urveo.sk</a><a href="#contact">Bratislava, SK</a></div></div><div className="footer-bottom"><span>© 2026 URVEO. Všetky práva vyhradené.</span><span>Made with precision.</span></div></footer>
    </main>
  );
}

export default App;
