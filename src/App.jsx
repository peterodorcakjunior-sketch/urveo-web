import { useEffect, useRef, useState } from "react";
import "./App.css";
import urveoLogo from "./assets/urveo-logo.png";
import DArtExperience from "./DArtExperience";

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

const processSteps = [
  { number: "01", title: "Nápad", text: "Povieme si, čo chcete vytvoriť, pre koho je produkt určený a aký problém má riešiť." },
  { number: "02", title: "Návrh", text: "Navrhneme štruktúru, funkcie a vizuálny smer tak, aby všetko dávalo zmysel ešte pred vývojom." },
  { number: "03", title: "Vývoj", text: "Produkt naprogramujeme, priebežne testujeme a ukazujeme vám reálny progres." },
  { number: "04", title: "Spustenie", text: "Nasadíme hotové riešenie, doladíme detaily a podľa potreby pokračujeme v ďalšom rozvoji." },
];

function Logo({ className = "" }) {
  return <img className={`brand-logo ${className}`.trim()} src={urveoLogo} alt="URVEO" />;
}

function ProductVisual() {
  const [activeLayer, setActiveLayer] = useState("web");
  const [hoveredLayer, setHoveredLayer] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (hoveredLayer) return undefined;
    const layers = ["web", "mobile", "api"];
    const cycle = window.setInterval(() => setActiveLayer(current => layers[(layers.indexOf(current) + 1) % layers.length]), 6000);
    return () => window.clearInterval(cycle);
  }, [hoveredLayer]);

  const layerProps = layer => ({
    className: `workspace-layer workspace-${layer} ${(hoveredLayer || activeLayer) === layer ? "is-active" : ""}`,
    onMouseEnter: () => setHoveredLayer(layer),
    onMouseLeave: () => setHoveredLayer(null),
  });

  return (
    <div className="product-stage" aria-label="Ukážka digitálneho produktového pracovného priestoru">
      <div className="stage-orbit orbit-one"/><div className="stage-orbit orbit-two"/>
      <div className="product-window">
        <div className="window-bar"><div className="window-dots"><i/><i/><i/></div><span>DIGITAL PRODUCT WORKSPACE</span><b>READY</b></div>
        <div className="workspace-canvas">
          <section {...layerProps("web")}>
            <div className="layer-sweep"/><aside className="web-sidebar"><div className="web-symbol"><i/><i/><i/></div><nav>{[0,1,2,3,4].map(i => <i key={i} className={i === 0 ? "selected" : ""}/>)}</nav><span/></aside>
            <div className="web-surface"><header><div><small>WEB</small><span className="interface-title"/></div><button aria-label="Interface options"><i/><i/></button></header><div className="web-toolbar"><span/><span/><span/><i/></div><div className="web-layout"><div className="web-primary-card"><div className="abstract-copy"><i/><i/></div><div className="composition-orb"><span/><span/></div><div className="card-action"/></div><div className="web-stack"><div><i/><span/><span/></div><div><i/><span/><span/></div></div></div><div className="web-timeline"><span/><span/><span/><span/><i/></div></div>
          </section>
          <section {...layerProps("api")}>
            <div className="layer-sweep"/><header><small>API</small><span><i/>CONNECTED</span></header><div className="api-route"><b>GET</b><code>/api/products</code><em>200 OK</em></div><div className="api-route"><b>POST</b><code>/api/orders</code><em>READY</em></div><div className="api-flow"><span/><i/><span/><i/><span/></div>
          </section>
          <section {...layerProps("mobile")}>
            <div className="layer-sweep"/><div className="mobile-speaker"/><div className="mobile-screen"><header><small>MOBILE</small><i/></header><div className="mobile-feature"><div className="mobile-art"><i/><i/></div><span/><span/></div><div className="mobile-cards"><div><i/><span/><b/></div><div><i/><span/><b/></div></div><button aria-label="Primary mobile action"><span/></button><nav><i/><i className="selected"/><i/></nav></div>
          </section>
        </div>
      </div>
    </div>
  );
}

function DArtAdminSurface() {
  return (
    <div className="dart-admin-surface" aria-hidden="true">
      <div className="dart-admin-grid"/>
      <div className="dart-admin-rail"><i/><i/><i/><i/></div>
      <div className="dart-admin-geometry">
        <div className="dart-abstract-heading"><i/><i/></div>
        <div className="dart-abstract-panels"><i/><i/><i/></div>
        <div className="dart-abstract-data"><span/><span/><span/><span/><span/></div>
      </div>
    </div>
  );
}

function DArtMobileSurface() {
  return (
    <div className="dart-mobile-surface" aria-hidden="true">
      <div className="dart-mobile-glow"/>
      <div className="dart-mobile-topline"><i/><i/></div>
      <div className="dart-mobile-hero"><span/><span/></div>
      <div className="dart-mobile-lines"><i/><i/><i/></div>
      <div className="dart-mobile-cells"><span/><span/></div>
      <div className="dart-mobile-dock"><i/><i/><i/></div>
    </div>
  );
}

function DArtProductVisual() {
  return (
    <div className="dart-product-visual" aria-label="Prepojený produktový ekosystém mobilnej aplikácie, administrácie a API">
      <div className="dart-ambient"/>
      <div className="dart-connection" aria-hidden="true"><i/><i/><i/></div>
      <div className="dart-admin">
        <div className="dart-admin-screen" data-dart-media="admin"><DArtAdminSurface/></div>
        <div className="dart-admin-stand" aria-hidden="true"/>
      </div>
      <div className="dart-phone">
        <div className="dart-phone-screen" data-dart-media="mobile"><DArtMobileSurface/></div>
      </div>
      <span className="dart-ecosystem-label dart-label-admin">ADMIN</span>
      <span className="dart-ecosystem-label dart-label-mobile">MOBILE</span>
      <span className="dart-ecosystem-label dart-label-api">API</span>
      <div className="visual-noise"/>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dartOpen, setDartOpen] = useState(false);
  const activeNavigationSweepRef = useRef(null);
  const navigationFrameRef = useRef(null);
  const navigationSweepDelayRef = useRef(null);
  const navigationSweepTimeoutRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  const navigateToSection = (event, id) => {
    event.preventDefault();
    closeMenu();

    const target = document.getElementById(id);
    if (!target) return;

    window.history.pushState(null, "", `#${id}`);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      target.classList.add("is-visible");
      target.scrollIntoView();
      return;
    }

    window.cancelAnimationFrame(navigationFrameRef.current);
    window.clearTimeout(navigationSweepDelayRef.current);
    window.clearTimeout(navigationSweepTimeoutRef.current);
    if (activeNavigationSweepRef.current) {
      activeNavigationSweepRef.current.classList.remove("is-navigation-light-sweep");
      activeNavigationSweepRef.current.classList.remove("is-navigation-light-sweep-pending");
      activeNavigationSweepRef.current = null;
    }
    activeNavigationSweepRef.current = target;
    target.classList.add("is-navigation-light-sweep-pending");
    target.classList.add("is-visible");
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    let lastTop = target.getBoundingClientRect().top;
    let stableSince = null;
    const revealWhenSettled = (time) => {
      const top = target.getBoundingClientRect().top;
      const isVisible = top < window.innerHeight * 0.85 && target.getBoundingClientRect().bottom > window.innerHeight * 0.15;
      const isStable = Math.abs(top - lastTop) < 0.5;

      stableSince = isVisible && isStable ? (stableSince ?? time) : null;
      lastTop = top;
      if (stableSince !== null && time - stableSince >= 140) {
        navigationSweepDelayRef.current = window.setTimeout(() => {
          target.classList.remove("is-navigation-light-sweep-pending");
          target.classList.add("is-navigation-light-sweep");
          navigationSweepTimeoutRef.current = window.setTimeout(() => {
            target.classList.remove("is-navigation-light-sweep");
            if (activeNavigationSweepRef.current === target) {
              activeNavigationSweepRef.current = null;
            }
          }, 3000);
        }, 300);
        return;
      }
      navigationFrameRef.current = window.requestAnimationFrame(revealWhenSettled);
    };
    navigationFrameRef.current = window.requestAnimationFrame(revealWhenSettled);
  };

  const handleHeaderNavigation = (event) => {
    const link = event.target.closest(".site-header a[href^='#']");
    if (!link) return;
    navigateToSection(event, link.hash.slice(1));
  };

  useEffect(() => {
    const sections = document.querySelectorAll(".section, .hero");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (activeNavigationSweepRef.current === entry.target) return;
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.3, rootMargin: "0px 0px -15% 0px" });

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(navigationFrameRef.current);
      window.clearTimeout(navigationSweepDelayRef.current);
      window.clearTimeout(navigationSweepTimeoutRef.current);
      if (activeNavigationSweepRef.current) {
        activeNavigationSweepRef.current.classList.remove("is-navigation-light-sweep");
        activeNavigationSweepRef.current.classList.remove("is-navigation-light-sweep-pending");
      }
    };
  }, []);
  return (
    <main onClick={handleHeaderNavigation}>
      <header className="site-header"><a className="header-brand" href="#home" onClick={closeMenu}><Logo className="header-logo" /></a><nav className={menuOpen ? "open" : ""} aria-label="Hlavná navigácia">{[["home","Domov"],["services","Služby"],["projects","Naše práce"],["about","O nás"],["contact","Kontakt"]].map(([id,label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}</nav><a href="#contact" className="nav-cta">Začať projekt <span>↗</span></a><button className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Otvoriť menu" aria-expanded={menuOpen}><i/><i/></button></header>

      <section className="hero" id="home"><div className="hero-ambient"/><div className="hero-copy"><p className="eyebrow"><span><i className="eyebrow-line"/></span>DIGITÁLNE PRODUKTY. PRECÍZNE VYTVORENÉ.</p><h1>Tvoríme digitálne<br/>produkty, ktoré<br/><span>posúvajú biznis.</span></h1><p className="hero-description">Navrhujeme a vyvíjame výnimočné digitálne riešenia — od prvého konceptu až po produkt, ktorý rastie s vami.</p><div className="hero-actions"><a className="button-primary" href="#contact">Začať projekt <span>↗</span></a><a className="button-link" href="#projects">Pozrieť naše práce <span>↓</span></a></div><div className="hero-proof"><Logo className="hero-logo" /></div></div><ProductVisual /></section>

      <section className="services section" id="services"><div className="section-intro"><div><p className="eyebrow"><span><i className="eyebrow-line"/></span>ČO TVORÍME</p><h2>Od nápadu po <span>digitálny produkt.</span></h2></div><p>Spájame premyslený dizajn so spoľahlivou technológiou. Výsledkom sú produkty, ktoré nielen dobre vyzerajú, ale prinášajú hodnotu.</p></div><div className="service-grid">{services.map(service => <article className="service-card" key={service.title}><div className="card-top"><div className="service-icon"><Icon name={service.icon}/></div><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`${service.title} – viac informácií`}>Zistiť viac <span>↗</span></a></article>)}</div></section>

      <section className="process section" aria-labelledby="process-heading"><div className="process-intro"><p className="eyebrow"><span><i className="eyebrow-line"/></span>AKO PRACUJEME</p><h2 id="process-heading">Od prvého nápadu až po <span>spustenie.</span></h2></div><div className="process-steps">{processSteps.map(step => <article className="process-step" key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div><p className="process-note">Máte iba nápad? To stačí. <span>Zvyšok môžeme vyriešiť spolu.</span></p></section>

      <section className="projects section" id="projects"><div className="project-heading"><p className="eyebrow"><span><i className="eyebrow-line"/></span>VYBRANÝ PROJEKT</p></div><article className="featured-project"><div className="featured-project-copy"><p className="project-kicker">D•ART / DIGITÁLNY PRODUKT</p><h2>D•ART</h2><p className="project-subtitle">Reštauračná platforma na mieru</p><p className="project-description">Komplexné digitálne riešenie pre reštauráciu s vlastným objednávkovým systémom. Mobilná aplikácia, objednávkový proces, administrácia a backend fungujú ako jeden prepojený produkt.</p><ul className="project-capabilities" aria-label="Schopnosti projektu"><li>Mobilná aplikácia</li><li>Objednávkový systém</li><li>Admin rozhranie</li><li>Backend &amp; API</li></ul><button className="project-cta" onClick={() => setDartOpen(true)}>Vyskúšať projekt <span aria-hidden="true">↗</span></button></div><DArtProductVisual/></article></section>

      <section className="about section" id="about"><div className="about-glow"/><div><p className="eyebrow"><span><i className="eyebrow-line"/></span>PREČO URVEO</p><h2>Menej hluku.<br/><span>Viac podstaty.</span></h2></div><div className="about-content"><p>Nie sme len dodávateľ. Sme partner, ktorý rozumie vášmu biznisu a pretaví jeho potenciál do digitálneho produktu.</p><div className="principles"><div><strong>01</strong><span>Premyslené do detailu</span></div><div><strong>02</strong><span>Postavené pre rast</span></div><div><strong>03</strong><span>Komunikácia bez bariér</span></div></div></div></section>

      <section className="contact section" id="contact"><div className="contact-orb"/><p className="eyebrow"><span><i className="eyebrow-line"/></span>MÁTE NÁPAD?</p><h2>Vytvorme niečo<br/><span>výnimočné.</span></h2><p className="contact-copy">Povedzte nám o svojom projekte. Ozveme sa vám a spoločne nájdeme najlepšiu cestu vpred.</p><a href="mailto:info@urveo.sk" className="button-primary large">Napísať nám <span>↗</span></a><p className="contact-email">info@urveo.sk</p></section>

      <footer><div className="footer-brand"><Logo className="footer-logo"/><p>Digitálne produkty vytvorené pre rast.</p></div><div className="footer-links"><div><small>NAVIGÁCIA</small><a href="#services">Služby</a><a href="#projects">Projekty</a><a href="#about">O nás</a></div><div><small>KONTAKT</small><a href="mailto:info@urveo.sk">info@urveo.sk</a><a href="#contact">Bratislava, SK</a></div></div><div className="footer-bottom"><span>© 2026 URVEO. Všetky práva vyhradené.</span><span>Made with precision.</span></div></footer>
      {dartOpen && <DArtExperience onClose={() => setDartOpen(false)}/>}
    </main>
  );
}

export default App;
