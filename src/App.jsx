import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import urveoLogo from "./assets/urveo-logo.png";
import DArtExperience from "./DArtExperience";
import ArrowIcon from "./ArrowIcon";

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
  { icon: "phone", image: "/service-images/mobile-apps.png", number: "01", title: "Mobilné aplikácie", text: "Návrh a vývoj intuitívnych mobilných aplikácií pre iOS a Android, postavených okolo používateľov a cieľov vášho biznisu." },
  { icon: "web", image: "/service-images/web-apps.png", number: "02", title: "Webové stránky & aplikácie", text: "Tvoríme výkonné webové stránky a vyvíjame webové aplikácie s precíznym dizajnom, ktoré menia návštevy na reálne výsledky." },
  { icon: "cart", image: "/service-images/ecommerce.png", number: "03", title: "E-commerce", text: "Rýchle a prehľadné e-commerce riešenia pripravené rásť spolu s vašou značkou, ponukou a zákazníkmi." },
  { icon: "server", image: "/service-images/backend.png", number: "04", title: "Backend riešenia", text: "Stabilné backend systémy, API a integrácie, ktoré bezpečne prepájajú a držia váš digitálny produkt pohromade." },
];

const processSteps = [
  { number: "01", title: "Nápad", text: "Povieme si, čo chcete vytvoriť, pre koho je produkt určený a aký problém má riešiť." },
  { number: "02", title: "Návrh", text: "Navrhneme štruktúru, funkcie a vizuálny smer tak, aby všetko dávalo zmysel ešte pred vývojom." },
  { number: "03", title: "Vývoj", text: "Produkt naprogramujeme, priebežne testujeme a ukazujeme vám reálny progres." },
  { number: "04", title: "Spustenie", text: "Nasadíme hotové riešenie, doladíme detaily a podľa potreby pokračujeme v ďalšom rozvoji." },
];

function Logo({ className = "" }) {
  return <img className={`brand-logo ${className}`.trim()} src={urveoLogo} alt="URVEO" width="484" height="152" />;
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

const contactInterestOptions = ["Web", "Mobilná aplikácia", "E-commerce", "Backend / systém", "Kompletné riešenie", "Iné"];

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);
    const script = existingScript || document.createElement("script");
    const handleLoad = () => window.turnstile ? resolve(window.turnstile) : reject(new Error("Verification unavailable"));
    const handleError = () => reject(new Error("Verification unavailable"));

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    if (!existingScript) {
      script.id = TURNSTILE_SCRIPT_ID;
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

function TurnstileWidget({ siteKey, onToken, onUnavailable }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let widgetId;
    let active = true;

    loadTurnstile().then((turnstile) => {
      if (!active || !containerRef.current) return;
      widgetId = turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "contact",
        theme: "dark",
        size: "flexible",
        appearance: "interaction-only",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => {
          onToken("");
          onUnavailable();
        },
      });
    }).catch(onUnavailable);

    return () => {
      active = false;
      if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, onUnavailable, siteKey]);

  return <div className="contact-turnstile" ref={containerRef}/>;
}

function ContactSection({ onOpenPrivacy }) {
  const [values, setValues] = useState({ name: "", email: "", interest: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const fieldRefs = useRef({});
  const successRef = useRef(null);
  const turnstileRef = useRef(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY
    || (import.meta.env.DEV ? "1x00000000000000000000AA" : "");

  const handleTurnstileToken = useCallback((token) => {
    setTurnstileToken(token);
    if (token) setTurnstileError(false);
  }, []);

  const handleTurnstileUnavailable = useCallback(() => setTurnstileError(true), []);

  const refreshTurnstile = () => {
    setTurnstileToken("");
    setTurnstileResetKey(current => current + 1);
  };

  useEffect(() => {
    if (submitStatus === "success") successRef.current?.focus();
  }, [submitStatus]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    if (errors[name]) setErrors(current => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Zadajte, prosím, vaše meno.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) nextErrors.email = "Zadajte platnú e-mailovú adresu.";
    if (!values.interest) nextErrors.interest = "Vyberte, o čo máte záujem.";
    if (!values.message.trim()) nextErrors.message = "Napíšte nám stručne o vašom projekte.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = ["name", "email", "interest", "message"].find(field => nextErrors[field]);
      window.requestAnimationFrame(() => fieldRefs.current[firstInvalidField]?.focus());
      return;
    }

    if (!turnstileToken) {
      setTurnstileError(true);
      window.requestAnimationFrame(() => turnstileRef.current?.focus());
      return;
    }

    setSubmitStatus("submitting");

    // DEVELOPMENT ONLY: Simulate the API success path for local form testing.
    if (import.meta.env.DEV) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setTurnstileToken("");
      setSubmitStatus("success");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          interest: values.interest,
          message: values.message.trim(),
          turnstileToken,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        if (response.status === 403) {
          setTurnstileError(true);
          refreshTurnstile();
          setSubmitStatus("idle");
          return;
        }
        throw new Error("Contact request failed");
      }
      setTurnstileToken("");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      refreshTurnstile();
    }
  };

  const resetForm = () => {
    setValues({ name: "", email: "", interest: "", message: "" });
    setErrors({});
    setTurnstileError(false);
    refreshTurnstile();
    setSubmitStatus("idle");
  };

  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: updateField,
    ref: element => { fieldRefs.current[name] = element; },
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="contact-orb"/>
      <div className="contact-intro">
        <p className="eyebrow"><span><i className="eyebrow-line"/></span>KONTAKT</p>
        <h2 id="contact-heading">Máte nápad?<br/>Poďme ho premeniť na<br/><span>digitálny produkt.</span></h2>
        <p className="contact-copy">Webová stránka, aplikácia alebo softvér na mieru. Napíšte nám pár slov o projekte a ozveme sa vám.</p>
        <div className="contact-details">
          <p>Napíšte nám o vašom projekte.</p>
          <a href="mailto:info@urveo.sk">info@urveo.sk <span aria-hidden="true"><ArrowIcon direction="northeast"/></span></a>
        </div>
      </div>

      <div className={`contact-form-area${submitStatus === "success" ? " contact-submitted" : ""}`}>
        {submitStatus !== "success" ? (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-field">
              <label htmlFor="contact-name">Meno</label>
              <input id="contact-name" type="text" autoComplete="name" maxLength="120" placeholder="Vaše meno" {...fieldProps("name")}/>
              {errors.name && <p className="contact-error" id="contact-name-error" role="alert">{errors.name}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-email">E-mail</label>
              <input id="contact-email" type="email" autoComplete="email" inputMode="email" maxLength="254" placeholder="vas@email.sk" {...fieldProps("email")}/>
              {errors.email && <p className="contact-error" id="contact-email-error" role="alert">{errors.email}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-interest">O čo máte záujem?</label>
              <div className="contact-select-wrap">
                <select id="contact-interest" {...fieldProps("interest")}>
                  <option value="" disabled>Vyberte možnosť</option>
                  {contactInterestOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
              {errors.interest && <p className="contact-error" id="contact-interest-error" role="alert">{errors.interest}</p>}
            </div>
            <div className="contact-field">
              <label htmlFor="contact-message">Povedzte nám stručne o projekte</label>
              <textarea id="contact-message" rows="4" maxLength="5000" placeholder="Čo chcete vytvoriť?" {...fieldProps("message")}/>
              {errors.message && <p className="contact-error" id="contact-message-error" role="alert">{errors.message}</p>}
            </div>
            <div ref={turnstileRef} tabIndex="-1" aria-describedby={turnstileError ? "contact-verification-error" : undefined}>
              {turnstileSiteKey ? (
                <TurnstileWidget
                  key={turnstileResetKey}
                  siteKey={turnstileSiteKey}
                  onToken={handleTurnstileToken}
                  onUnavailable={handleTurnstileUnavailable}
                />
              ) : (
                <p className="contact-error" id="contact-verification-error" role="alert">Overenie sa nepodarilo. Skúste to prosím znova.</p>
              )}
              {turnstileSiteKey && turnstileError && <p className="contact-error" id="contact-verification-error" role="alert">Overenie sa nepodarilo. Skúste to prosím znova.</p>}
            </div>
            {submitStatus === "error" && (
              <p className="contact-error" role="alert">Dopyt sa nepodarilo odoslať. Skúste to prosím znova.</p>
            )}
            <button className="button-primary contact-submit" type="submit" disabled={submitStatus === "submitting"}>
              {submitStatus === "submitting" ? "Odosielam…" : <>Odoslať dopyt <span aria-hidden="true"><ArrowIcon direction="right"/></span></>}
            </button>
            <p className="contact-privacy-notice">Odoslaním formulára beriete na vedomie spracúvanie osobných údajov na účely vybavenia vášho dopytu. Viac informácií nájdete v <button type="button" onClick={onOpenPrivacy}>Ochrane osobných údajov</button>.</p>
          </form>
        ) : (
          <div className="contact-success" role="status" aria-live="polite" ref={successRef} tabIndex="-1">
            <div className="contact-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6.5 12.5 3.5 3.5 7.5-8"/></svg></div>
            <h3>Ďakujeme.</h3>
            <p className="contact-success-title">Dopyt bol úspešne odoslaný.</p>
            <p>Ozveme sa vám čo najskôr.</p>
            <button type="button" className="contact-reset" onClick={resetForm}>Napísať ďalší dopyt <span aria-hidden="true"><ArrowIcon direction="northeast"/></span></button>
          </div>
        )}
      </div>
    </section>
  );
}

function PrivacyModal({ onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <div className="privacy-backdrop" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-heading" ref={dialogRef} tabIndex="-1">
        <header className="privacy-header">
          <div><p className="eyebrow"><span><i className="eyebrow-line"/></span>SÚKROMIE A OSOBNÉ ÚDAJE</p><h2 id="privacy-heading">Ochrana <span>osobných údajov</span></h2></div>
          <button className="privacy-close" type="button" onClick={onClose} aria-label="Zavrieť ochranu osobných údajov"><span aria-hidden="true">×</span></button>
        </header>
        <div className="privacy-content">
          <p className="privacy-intro">Tieto informácie vysvetľujú spracúvanie osobných údajov pri kontaktných dopytoch a zabezpečení webovej stránky URVEO vrátane používania cookies a úložísk prehliadača.<br/>Posledná aktualizácia: <time dateTime="2026-09-11">11. septembra 2026</time>.</p>
          <article><span>01</span><div><h3>Prevádzkovateľ</h3>
            {/* LEGAL TODO: Review and update the privacy information and operator identification when URVEO begins operating through a registered business entity. */}
            <div className="privacy-placeholder"><strong>Prevádzkovateľ:</strong><br/>Peter Odorčák<br/><br/><strong>Projekt:</strong><br/>URVEO<br/><br/><strong>Kontaktný e-mail:</strong><br/><a href="mailto:info@urveo.sk">info@urveo.sk</a></div></div></article>
          <article><span>02</span><div><h3>Aké údaje spracúvame</h3><p>Pri odoslaní formulára spracúvame meno, e-mailovú adresu, vybranú oblasť záujmu, obsah správy a automaticky vytvorený čas odoslania. Pri ďalšej komunikácii spracúvame aj údaje, ktoré nám v nej poskytnete. Na zabezpečenie webu a formulára sa spracúvajú aj IP adresa, overovací token a technické bezpečnostné údaje opísané nižšie.</p></div></article>
          <article><span>03</span><div><h3>Účel spracúvania</h3><p>Údaje spracúvame na zodpovedanie kontaktného dopytu, komunikáciu o možnej spolupráci a prípravu odpovede alebo návrhu, o ktorý používateľ požiadal.</p></div></article>
          <article><span>04</span><div><h3>Zabezpečenie webu a formulára</h3><p>Cloudflare zabezpečuje infraštruktúru webu a funkcie Worker. Cloudflare Turnstile chráni kontaktný formulár pred automatizovaným zneužitím a načítava sa už pri zobrazení formulára, pred jeho odoslaním.</p><p>Pri overení odoslania Worker číta IP adresu z hlavičky CF-Connecting-IP a, ak je dostupná, posiela ju spolu s tokenom Turnstile službe Cloudflare Siteverify. IP adresa nie je súčasťou e-mailu s dopytom. Bezpečnostné spracúvanie zahŕňa aj overovacie údaje v prehliadači; v infraštruktúre sú zapnuté prevádzkové logy.</p></div></article>
          <article><span>05</span><div><h3>Právny základ</h3><p>Pri dopyte smerujúcom k uzatvoreniu zmluvy je základom vykonanie opatrení na vašu žiadosť pred uzatvorením zmluvy. Pri ostatných dopytoch ide o oprávnený záujem odpovedať na prijatú komunikáciu. Pri ochrane webu a formulára ide o oprávnený záujem zaistiť bezpečnosť a predchádzať zneužitiu, v rozsahu, v ktorom nad ním neprevažujú vaše práva a slobody. Ak spracúvanie vyžaduje zákon, základom je splnenie príslušnej právnej povinnosti.</p></div></article>
          <article><span>06</span><div><h3>Doba uchovávania</h3><p>Údaje z bežných dopytov a súvisiacu e-mailovú komunikáciu uchovávame najviac 12 mesiacov od poslednej komunikácie. Výnimkou je vznik zmluvného alebo obchodného vzťahu alebo potreba dlhšieho uchovávania na preukazovanie, uplatňovanie či obhajovanie právnych nárokov alebo splnenie zákonných povinností.</p><p>Táto lehota sa nevzťahuje na bezpečnostné logy, cookies a úložiská poskytovateľov. Ich konkrétne doby uchovávania a platnosti nemáme overené; závisia od príslušnej služby a jej nastavení.</p></div></article>
          <article><span>07</span><div><h3>Príjemcovia a spracovatelia</h3><ul><li><strong>Cloudflare</strong> — infraštruktúra webu a Worker vrátane bezpečnostného a prevádzkového spracúvania,</li><li><strong>Cloudflare Turnstile</strong> — služba Cloudflare na ochranu formulára a overenie tokenu a dostupnej IP adresy,</li><li><strong>Resend</strong> — odoslanie úspešne overeného dopytu e-mailom vrátane údajov z formulára a času odoslania,</li><li><strong>Google / Gmail</strong> — prijímanie a čítanie správ doručených na info@urveo.sk.</li></ul><p>Správy sa odosielajú cez Resend z identity URVEO &lt;noreply@urveo.sk&gt; na info@urveo.sk. Adresa noreply@urveo.sk slúži iba na technické odosielanie, nie ako schránka. Váš e-mail sa použije ako adresa na odpoveď (reply_to). Automatický potvrdzovací e-mail vám neposielame.</p></div></article>
          <article><span>08</span><div><h3>Prenosy mimo EÚ/EHP</h3><p>Pri využívaní uvedených poskytovateľov môže dochádzať k spracúvaniu údajov mimo EÚ/EHP. Konkrétne krajiny spracúvania a uplatňované mechanizmy prenosu pre používané služby nemáme overené, preto tu nepotvrdzujeme konkrétne zmluvné záruky ani mechanizmus prenosu. Otázky k týmto prenosom môžete poslať na info@urveo.sk.</p></div></article>
          <article><span>09</span><div><h3>Cookies a úložiská prehliadača</h3><p>URVEO a Cloudflare používajú technicky nevyhnutné bezpečnostné mechanizmy na prevádzku a ochranu webu a kontaktného formulára pred automatizovaným zneužitím. Cloudflare vrátane služby Cloudflare Turnstile môže na tento účel používať bezpečnostnú cookie a/alebo úložisko prehliadača. URVEO v súčasnosti nepoužíva analytické, reklamné ani marketingové cookies či úložiská.</p></div></article>
          <article><span>10</span><div><h3>Práva dotknutej osoby</h3><p>Za podmienok stanovených právnymi predpismi máte právo na prístup k údajom, ich opravu, vymazanie, obmedzenie spracúvania, namietať proti spracúvaniu na základe oprávneného záujmu a na prenosnosť údajov, ak sa uplatňuje. Máte tiež právo podať sťažnosť Úradu na ochranu osobných údajov Slovenskej republiky.</p></div></article>
          <article><span>11</span><div><h3>Kontakt</h3><p>Otázky týkajúce sa ochrany osobných údajov a žiadosti o uplatnenie vašich práv nám môžete poslať na <a href="mailto:info@urveo.sk">info@urveo.sk</a>.</p></div></article>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [revealedService, setRevealedService] = useState(null);
  const serviceGridRef = useRef(null);

  useEffect(() => {
    const touchMedia = window.matchMedia("(hover: none), (pointer: coarse)");
    const grid = serviceGridRef.current;
    const cards = Array.from(grid.children);
    let stopTracking = () => {};

    const configure = () => {
      stopTracking();
      setRevealedService(null);
      if (!touchMedia.matches) return;

      let frame = null;
      let visible = false;
      let active = null;
      const viewport = window.visualViewport;
      const selectCard = () => {
        frame = null;
        const height = viewport?.height ?? window.innerHeight;
        const top = viewport?.offsetTop ?? 0;
        const center = top + height / 2;
        const candidates = cards.flatMap((card, index) => {
          const rect = card.getBoundingClientRect();
          // Only cards overlapping the middle 60% of the viewport participate.
          return rect.bottom > top + height * .2 && rect.top < top + height * .8
            ? [{ id: services[index].number, distance: Math.abs(rect.top + rect.height / 2 - center) }]
            : [];
        });
        let nearest = candidates.reduce((best, card) => !best || card.distance < best.distance ? card : best, null);
        const current = candidates.find(card => card.id === active);
        // Keep ties stable; a challenger must be at least 24px closer.
        if (current && nearest && current.distance - nearest.distance < 24) nearest = current;
        const next = nearest?.id ?? null;
        if (next !== active) {
          active = next;
          setRevealedService(next);
        }
      };
      const schedule = () => {
        if (visible && frame === null) frame = window.requestAnimationFrame(selectCard);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          window.addEventListener("scroll", schedule, { passive: true });
          schedule();
        } else {
          window.removeEventListener("scroll", schedule);
          window.cancelAnimationFrame(frame);
          frame = null;
          active = null;
          setRevealedService(null);
        }
      });
      observer.observe(grid);
      window.addEventListener("resize", schedule);
      viewport?.addEventListener("resize", schedule);
      viewport?.addEventListener("scroll", schedule, { passive: true });
      stopTracking = () => {
        observer.disconnect();
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        viewport?.removeEventListener("resize", schedule);
        viewport?.removeEventListener("scroll", schedule);
      };
    };

    configure();
    touchMedia.addEventListener("change", configure);
    return () => {
      stopTracking();
      touchMedia.removeEventListener("change", configure);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dartOpen, setDartOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const activeNavigationSweepRef = useRef(null);
  const navigationFrameRef = useRef(null);
  const navigationSweepDelayRef = useRef(null);
  const navigationSweepTimeoutRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousFocus = document.activeElement;
    const menuLinks = Array.from(document.getElementById("site-navigation")?.querySelectorAll("a[href]") ?? []);
    menuLinks[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [menuButtonRef.current, ...menuLinks].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    document.body.classList.add("menu-open");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [menuOpen]);

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
        // Tall sections cannot reach 30% visibility in a short viewport.
        // Preserve the existing reveal point whenever that ratio is attainable.
        const isTooTall = entry.boundingClientRect.height * 0.3 > (entry.rootBounds?.height ?? window.innerHeight);
        if (entry.isIntersecting && (isTooTall || entry.intersectionRatio >= 0.3)) {
          if (activeNavigationSweepRef.current === entry.target) return;
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: [0, 0.3], rootMargin: "0px 0px -15% 0px" });

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
      <header className="site-header"><a className="header-brand" href="#home" onClick={closeMenu}><Logo className="header-logo" /></a><nav id="site-navigation" className={menuOpen ? "open" : ""} aria-label="Hlavná navigácia">{[["home","Domov"],["services","Služby"],["projects","Naše práce"],["about","O nás"],["contact","Kontakt"]].map(([id,label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}</nav><a href="#contact" className="nav-cta">Začať projekt <span><ArrowIcon direction="northeast"/></span></a><button ref={menuButtonRef} type="button" className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(current => !current)} aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"} aria-controls="site-navigation" aria-expanded={menuOpen}><i/><i/></button></header>

      <section className="hero" id="home"><div className="hero-ambient"/><div className="hero-copy"><p className="eyebrow"><span><i className="eyebrow-line"/></span>DIGITÁLNE PRODUKTY. PRECÍZNE VYTVORENÉ.</p><h1>Tvoríme digitálne<br/>produkty, ktoré<br/><span>posúvajú biznis.</span></h1><p className="hero-description">Navrhujeme a vyvíjame webové stránky, webové a mobilné aplikácie aj softvér na mieru — od prvého konceptu po produkt, ktorý rastie s vami.</p><div className="hero-actions"><a className="button-primary" href="#contact">Začať projekt <span><ArrowIcon direction="northeast"/></span></a><a className="button-link" href="#projects">Pozrieť naše práce <span>↓</span></a></div><div className="hero-proof"><Logo className="hero-logo" /></div></div><ProductVisual /></section>

      <section className="services section" id="services"><div className="section-intro"><div><p className="eyebrow"><span><i className="eyebrow-line"/></span>ČO TVORÍME</p><h2>Od nápadu po <span>digitálny produkt.</span></h2></div><p>Spájame premyslený dizajn so spoľahlivým vývojom webových stránok, aplikácií a digitálnych produktov. Výsledkom sú riešenia, ktoré dobre vyzerajú a prinášajú hodnotu.</p></div><div className="service-grid" ref={serviceGridRef}>{services.map(service => <article className={`service-card${revealedService === service.number ? " is-revealed" : ""}`} key={service.title}><div className="service-card-visual" aria-hidden="true"><img src={service.image} alt="" loading="lazy" decoding="async"/></div><div className="card-top"><div className="service-icon"><Icon name={service.icon}/></div><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`${service.title} – viac informácií`}>Zistiť viac <span><ArrowIcon direction="northeast"/></span></a></article>)}</div></section>

      <section className="process section" aria-labelledby="process-heading"><div className="process-intro"><p className="eyebrow"><span><i className="eyebrow-line"/></span>AKO PRACUJEME</p><h2 id="process-heading">Od prvého nápadu až po <span>spustenie.</span></h2></div><div className="process-steps">{processSteps.map(step => <article className="process-step" key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div><p className="process-note">Máte iba nápad? To stačí. <span>Zvyšok môžeme vyriešiť spolu.</span></p></section>

      <section className="projects section" id="projects"><div className="project-heading"><p className="eyebrow"><span><i className="eyebrow-line"/></span>VYBRANÝ PROJEKT</p></div><article className="featured-project"><div className="featured-project-copy"><p className="project-kicker">D•ART / DIGITÁLNY PRODUKT</p><h2>D•ART</h2><p className="project-subtitle">Reštauračná platforma na mieru</p><p className="project-description">Komplexné digitálne riešenie pre reštauráciu s vlastným objednávkovým systémom. Mobilná aplikácia, objednávkový proces, administrácia a backend fungujú ako jeden prepojený produkt.</p><ul className="project-capabilities" aria-label="Schopnosti projektu"><li>Mobilná aplikácia</li><li>Objednávkový systém</li><li>Admin rozhranie</li><li>Backend &amp; API</li></ul><button className="project-cta" onClick={() => setDartOpen(true)}>Vyskúšať projekt <span aria-hidden="true"><ArrowIcon direction="northeast"/></span></button></div><DArtProductVisual/></article></section>

      <section className="about section" id="about"><div className="about-glow"/><div><p className="eyebrow"><span><i className="eyebrow-line"/></span>PREČO URVEO</p><h2>Menej hluku.<br/><span>Viac podstaty.</span></h2></div><div className="about-content"><p>Nie sme len dodávateľ. Sme partner, ktorý rozumie vášmu biznisu a pretaví jeho potenciál do digitálneho produktu.</p><div className="principles"><div><strong>01</strong><span>Premyslené do detailu</span></div><div><strong>02</strong><span>Postavené pre rast</span></div><div><strong>03</strong><span>Komunikácia bez bariér</span></div></div></div></section>

      <ContactSection onOpenPrivacy={() => setPrivacyOpen(true)}/>

      <footer><div className="footer-brand"><Logo className="footer-logo"/><p>Digitálne produkty vytvorené pre rast.</p></div><div className="footer-links"><div><small>NAVIGÁCIA</small><a href="#services">Služby</a><a href="#projects">Projekty</a><a href="#about">O nás</a></div><div><small>KONTAKT</small><a href="mailto:info@urveo.sk">info@urveo.sk</a><button type="button" onClick={() => setPrivacyOpen(true)}>Ochrana osobných údajov</button></div></div><div className="footer-bottom"><span>© 2026 URVEO. Všetky práva vyhradené.</span><span>Made with precision.</span></div></footer>
      {dartOpen && <DArtExperience onClose={() => setDartOpen(false)}/>}
      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)}/>}
    </main>
  );
}

export default App;
