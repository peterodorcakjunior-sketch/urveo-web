import { useEffect, useMemo, useRef, useState } from "react";
import "./DArtExperience.css";

const pizzas = [
  { id: 1, name: "Margherita", description: "Rajčinová omáčka, mozzarella", price: 6.7, prices: [6.7, 8.4, 8.9], tone: "margherita", image: "/dart-pizzas/margherita.webp" },
  { id: 2, name: "Prosciutto", description: "Rajčinová omáčka, mozzarella, šunka", price: 7.8, prices: [7.8, 9.3, 10], tone: "prosciutto", image: "/dart-pizzas/prosciutto.webp" },
  { id: 3, name: "Toscana", description: "Rajčinová omáčka, mozzarella, šunka, šampiňóny", price: 8, prices: [8, 9.5, 10.2], tone: "toscana", image: "/dart-pizzas/toscana.webp" },
  { id: 4, name: "Cardinale", description: "Rajčinová omáčka, mozzarella, šunka, kukurica", price: 8, prices: [8, 9.5, 10.2], tone: "cardinale", image: "/dart-pizzas/cardinale.webp" },
  { id: 5, name: "Broccoli", description: "Rajčinová omáčka, mozzarella, brokolica, niva, kukurica", price: 8.2, prices: [8.2, 9.8, 10.5], tone: "broccoli", image: "/dart-pizzas/broccoli.webp" },
  { id: 6, name: "Siciliana", description: "Rajčinová omáčka, mozzarella, sardely, olivy, kapary", price: 8.5, prices: [8.5, 10, 10.8], tone: "siciliana", image: "/dart-pizzas/siciliana.webp" },
];

const sizes = [
  { id: "small", title: "32 cm", subtitle: "400 g", index: 0 },
  { id: "thin", title: "40 cm", subtitle: "550 g · extra tenká", index: 1 },
  { id: "large", title: "40 cm", subtitle: "800 g", index: 2 },
];

const extraIngredients = [
  "Kukurica", "Šampiňóny", "Brokolica", "Cherry paradajky", "Paprika",
  "Fazuľa", "Pór", "Ananás", "Kapary", "Chilli papričky", "Jalapeño",
];

const flowCopy = [
  ["Ponuka presne ako v aplikácii", "Zákazník si prezerá reálnu ponuku, zloženie aj cenu každej pizze."],
  ["Každý detail pod kontrolou", "Veľkosť, tvar, cesto, syr aj ingrediencie navyše sa okamžite premietnu do ceny."],
  ["Jasný obsah aj výsledná cena", "Košík oddeľuje cenu jedla a balné a umožňuje meniť počet kusov."],
  ["Objednávka bez zbytočných krokov", "Rozvoz, termín, kontaktné údaje, adresa a platba sú v jednom prehľadnom procese."],
  ["Bezpečný koniec ukážky", "Webové demo ukáže celý proces, ale nikdy nespustí skutočnú platbu ani objednávku."],
];

const steps = ["Pizza", "Detail", "Košík", "Dokončenie", "Hotovo"];
const money = value => `${value.toFixed(2).replace(".", ",")} €`;

function PizzaArt({ image, tone = "margherita", compact = false }) {
  return (
    <div className={`real-pizza pizza-${tone}${compact ? " compact" : ""}`} aria-hidden="true">
      <img src={image} alt="" loading={compact ? "lazy" : "eager"}/>
    </div>
  );
}

function CartIcon({ count = 0 }) {
  return (
    <span className="real-cart-icon" aria-label={count ? `Košík, ${count} položiek` : "Košík"}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.3 8H6.1M9 20h.01M17 20h.01"/></svg>
      {count > 0 && <b>{count}</b>}
    </span>
  );
}

function AppHeader({ title, onBack, cartCount }) {
  return (
    <header className="real-app-header">
      {onBack ? <button type="button" onClick={onBack} aria-label="Späť">‹</button> : <span/>}
      <strong>{title}</strong>
      <CartIcon count={cartCount}/>
    </header>
  );
}

function PhoneFrame({ children }) {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedTime = new Intl.DateTimeFormat("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(currentTime);

  return (
    <div className="real-phone-shell">
      <div className="real-phone-buttons"/>
      <div className="real-phone-screen">
        <div className="real-status"><b>{formattedTime}</b><span/><i/><em/></div>
        <div className="real-island"/>
        {children}
      </div>
    </div>
  );
}

function Choice({ selected, onClick, children, className = "" }) {
  return <button type="button" className={`${className}${selected ? " selected" : ""}`} onClick={onClick}>{children}</button>;
}

export default function DArtExperience({ onClose }) {
  const defaultSchedule = useMemo(() => {
    const date = new Date(Date.now() + 60 * 60 * 1000);
    return {
      date: date.toLocaleDateString("en-CA"),
      time: date.toTimeString().slice(0, 5),
    };
  }, []);
  const dialogRef = useRef(null);
  const [screen, setScreen] = useState(0);
  const [product, setProduct] = useState(pizzas[0]);
  const [size, setSize] = useState("small");
  const [heart, setHeart] = useState(false);
  const [dough, setDough] = useState("Klasické");
  const [cheese, setCheese] = useState("Klasická mozzarella");
  const [extras, setExtras] = useState({});
  const [halfPizza, setHalfPizza] = useState("");
  const [halfOpen, setHalfOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState("Rozvoz");
  const [timing, setTiming] = useState("Čo najskôr");
  const [scheduledDate, setScheduledDate] = useState(defaultSchedule.date);
  const [scheduledTime, setScheduledTime] = useState(defaultSchedule.time);
  const [payment, setPayment] = useState("Online");
  const [location, setLocation] = useState("Trebatice");
  const [street, setStreet] = useState("365");
  const [orderNote, setOrderNote] = useState("");
  const [success, setSuccess] = useState(false);

  const selectedSize = sizes.find(item => item.id === size) ?? sizes[0];
  const extrasCount = Object.values(extras).reduce((sum, amount) => sum + amount, 0);
  const configuredUnitPrice = product.prices[selectedSize.index]

    + (heart ? 3 : 0)
    + (dough === "Bezlepkové" ? 2 : dough === "Celozrnné" ? 1 : 0)
    + (cheese === "Bezlaktózový syr" ? 1 : 0)
    + extrasCount * 1.5;

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const foodTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const packagingTotal = cartCount * 0.7;
  const deliveryPrice = delivery === "Rozvoz" ? 4 : 0;
  const grandTotal = foodTotal + packagingTotal + deliveryPrice;
  const estimatedTime = new Date(Date.now() + 25 * 60 * 1000)
    .toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });
  const scheduledLabel = scheduledDate
    ? `${scheduledDate.split("-").reverse().join(".")} o ${scheduledTime}`
    : scheduledTime;

  const selectedExtras = useMemo(
    () => Object.entries(extras).filter(([, amount]) => amount > 0).map(([name, amount]) => `${name} ${amount}×`),
    [extras],
  );

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousScroll = { left: window.scrollX, top: window.scrollY };
    const bodyStyle = document.body.style;
    const previousBodyStyles = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
    };
    const dialog = dialogRef.current;
    const backgroundElements = Array.from(dialog?.parentElement?.children ?? []).filter(element => element !== dialog);
    const previousInert = backgroundElements.map(element => element.inert);

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${previousScroll.top}px`;
    bodyStyle.left = `-${previousScroll.left}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    document.body.classList.add("case-open");
    backgroundElements.forEach(element => { element.inert = true; });
    dialog?.focus({ preventScroll: true });

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialog?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) {
        event.preventDefault();
        dialog?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("case-open");
      window.removeEventListener("keydown", handleKeyDown);
      Object.assign(bodyStyle, previousBodyStyles);
      backgroundElements.forEach((element, index) => { element.inert = previousInert[index]; });
      previousFocus?.focus({ preventScroll: true });
      window.scrollTo({ ...previousScroll, behavior: "auto" });
    };
  }, [onClose]);

  const resetConfiguration = item => {
    setProduct(item);
    setSize("small");
    setHeart(false);
    setDough("Klasické");
    setCheese("Klasická mozzarella");
    setExtras({});
    setHalfPizza("");
    setHalfOpen(false);
    setScreen(1);
  };

  const toggleHeart = () => {
    setHeart(current => {
      const next = !current;
      if (next) setSize("large");
      return next;
    });
  };

  const changeExtra = (name, delta) => {
    setExtras(current => {
      const next = Math.max(0, Math.min(5, (current[name] ?? 0) + delta));
      return { ...current, [name]: next };
    });
  };

  const addToCart = () => {
    setCart(items => [...items, {
      id: `${product.id}-${Date.now()}`,
      product,
      size: selectedSize,
      heart,
      dough,
      cheese,
      extras: selectedExtras,
      halfPizza,
      unitPrice: configuredUnitPrice,
      quantity: 1,
    }]);
    setScreen(2);
  };

  const changeCartQuantity = (id, delta) => {
    setCart(items => items.map(item => item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item));
  };

  const resetDemo = () => {
    setScreen(0);
    setCart([]);
    setSuccess(false);
    setDelivery("Rozvoz");
    setTiming("Čo najskôr");
    setPayment("Online");
  };

  const checkout = () => {
    setSuccess(true);
    setScreen(4);
  };

  return (
    <div className="case-experience" role="dialog" aria-modal="true" aria-labelledby="dart-experience-title" ref={dialogRef} tabIndex="-1">
      <div className="case-glow"/>
      <button className="case-back" type="button" onClick={onClose}>← <span>Späť na URVEO</span></button>

      <div className="case-title">
        <p className="eyebrow"><span><i className="eyebrow-line"/></span>INTERAKTÍVNY PROJEKT</p>
        <h2 id="dart-experience-title">D•ART</h2>
        <p>Reálna ukážka objednávkovej aplikácie</p>
        <small>Vyskúšajte si objednávku. Demo neposiela údaje ani nespúšťa platbu.</small>
      </div>

      <div className="case-layout">
        <div className="case-context" key={screen}>
          <span>0{screen + 1} / 05</span>
          <h3>{flowCopy[screen][0]}</h3>
          <p>{flowCopy[screen][1]}</p>
          <small>INTERAKTÍVNY PROTOTYP · REÁLNY D•ART FLOW</small>
        </div>

        <div className="phone-column">
          <PhoneFrame>
            {screen === 0 && (
              <section className="real-app-page real-menu-page">
                <AppHeader title="Pizza" cartCount={cartCount}/>
                <div className="real-pizza-list">
                  {pizzas.map(item => (
                    <button className="real-pizza-card" type="button" key={item.id} onClick={() => resetConfiguration(item)}>
                      <PizzaArt image={item.image} tone={item.tone} compact/>
                      <span>
                        <b>{item.id}. {item.name}</b>
                        <small>{item.description}</small>
                        <strong>od {money(item.price)}</strong>
                      </span>
                      <i>→</i>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {screen === 1 && (
              <section className="real-app-page real-detail-page">
                <AppHeader title={`${product.id}. ${product.name}`} onBack={() => setScreen(0)} cartCount={cartCount}/>
                <PizzaArt image={product.image} tone={product.tone}/>
                <div className="real-detail-copy">
                  <h3>{product.id}. {product.name}</h3>
                  <p>{product.description}</p>
                  <b>Alergény: 1, 7</b>
                </div>

                <div className="real-option-card">
                  <h4>Pizza pol na pol</h4>
                  <button type="button" className="real-outline-button" onClick={() => setHalfOpen(true)}>
                    {halfPizza ? `Druhá polovica: ${halfPizza}` : "Vybrať dve polovice"}
                  </button>
                </div>

                <div className="real-option-card">
                  <h4>Veľkosť</h4>
                  <div className="real-size-list">
                    {sizes.map(option => (
                      <Choice
                        key={option.id}
                        selected={size === option.id}
                        onClick={() => { setSize(option.id); if (option.id !== "large") setHeart(false); }}
                      >
                        <i/><span><b>{option.title}</b><small>{option.subtitle}</small></span><strong>{money(product.prices[option.index])}</strong>
                      </Choice>
                    ))}
                  </div>
                </div>

                <div className="real-option-card">
                  <h4>Tvar pizze</h4>
                  <Choice className="real-heart-choice" selected={heart} onClick={toggleHeart}>
                    <i/><span><b>V tvare srdca</b><small>Vždy 800 g</small></span><strong>3,00 €</strong>
                  </Choice>
                </div>

                <div className="real-option-card">
                  <h4>Cesto</h4>
                  <div className="real-pill-row">
                    {["Klasické", "Bezlepkové", "Celozrnné"].map(value => (
                      <Choice key={value} selected={dough === value} onClick={() => setDough(value)}>{dough === value && "✓ "}{value}</Choice>
                    ))}
                  </div>
                </div>

                <div className="real-option-card">
                  <h4>Syr</h4>
                  <div className="real-pill-row cheese">
                    {["Klasická mozzarella", "Bezlaktózový syr"].map(value => (
                      <Choice key={value} selected={cheese === value} onClick={() => setCheese(value)}>{cheese === value && "✓ "}{value}</Choice>
                    ))}
                  </div>
                </div>

                <div className="real-option-card">
                  <h4>Ingrediencie navyše</h4>
                  <div className="real-extra-list">
                    {extraIngredients.map(name => {
                      const amount = extras[name] ?? 0;
                      return (
                        <div className={amount ? "active" : ""} key={name}>
                          <span className="real-check">{amount ? "✓" : ""}</span>
                          <b>{name}</b>
                          <strong>+ 1,50 €</strong>
                          <span className="real-extra-counter">
                            <button type="button" onClick={() => changeExtra(name, -1)} disabled={!amount}>−</button>
                            <b>{amount}×</b>
                            <button type="button" onClick={() => changeExtra(name, 1)}>+</button>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="real-sticky-action">
                  <button type="button" onClick={addToCart}>Pridať do košíka · {money(configuredUnitPrice)}</button>
                </div>

                {halfOpen && (
                  <div className="real-modal-backdrop" onClick={() => setHalfOpen(false)}>
                    <div className="real-half-modal" onClick={event => event.stopPropagation()}>
                      <h4>Vyberte druhú polovicu</h4>
                      {pizzas.filter(item => item.id !== product.id).slice(0, 4).map(item => (
                        <button type="button" key={item.id} onClick={() => { setHalfPizza(item.name); setHalfOpen(false); }}>
                          <span>{item.id}. {item.name}</span><b>od {money(item.price)}</b>
                        </button>
                      ))}
                      <button type="button" className="real-modal-close" onClick={() => setHalfOpen(false)}>Zrušiť</button>
                    </div>
                  </div>
                )}
              </section>
            )}

            {screen === 2 && (
              <section className="real-app-page real-cart-page">
                <AppHeader title="Košík" onBack={() => setScreen(1)} cartCount={cartCount}/>
                {cart.length > 0 ? (
                  <>
                    <div className="real-cart-items">
                      {cart.map(item => (
                        <article key={item.id}>
                          <button type="button" className="real-trash" onClick={() => setCart(items => items.filter(entry => entry.id !== item.id))} aria-label="Odstrániť">⌫</button>
                          <h3>{item.product.name} ×{item.quantity}</h3>
                          <b>{item.size.title} / {item.size.subtitle.split(" · ")[0]}</b>
                          <p>Cesto: {item.dough}</p>
                          <p>Syr: {item.cheese}</p>
                          {item.halfPizza && <p>Pol na pol: {item.halfPizza}</p>}
                          {item.extras.length > 0 && <p>Navyše: {item.extras.join(", ")}</p>}
                          <div>
                            <span className="real-quantity">
                              <button type="button" onClick={() => changeCartQuantity(item.id, -1)}>−</button>
                              <b>{item.quantity}</b>
                              <button type="button" onClick={() => changeCartQuantity(item.id, 1)}>+</button>
                            </span>
                            <strong>{money((item.unitPrice + 0.7) * item.quantity)}</strong>
                          </div>
                        </article>
                      ))}
                    </div>
                    <div className="real-summary-card">
                      <p><span>Jedlo</span><b>{money(foodTotal)}</b></p>
                      <p><span>Balné ({cartCount} ks)</span><b>{money(packagingTotal)}</b></p>
                      <p><strong>Spolu</strong><strong>{money(foodTotal + packagingTotal)}</strong></p>
                    </div>
                    <div className="real-sticky-action"><button type="button" onClick={() => setScreen(3)}>Pokračovať · {money(foodTotal + packagingTotal)}</button></div>
                  </>
                ) : (
                  <div className="real-empty">
                    <h3>Košík je prázdny</h3>
                    <p>Vyberte si pizzu z ponuky.</p>
                    <button type="button" onClick={() => setScreen(0)}>Späť na pizzu</button>
                  </div>
                )}
              </section>
            )}

            {screen === 3 && (
              <section className="real-app-page real-checkout-page">
                <AppHeader title="Dokončenie objednávky" onBack={() => setScreen(2)} cartCount={cartCount}/>
                <div className="real-profile-notice">✓ <span>Údaje boli vyplnené z vášho profilu.</span></div>

                <div className="real-option-card">
                  <h4>Spôsob prevzatia</h4>
                  <div className="real-two-column">
                    {["Rozvoz", "Osobný odber"].map(value => (
                      <Choice key={value} selected={delivery === value} onClick={() => setDelivery(value)}>
                        <b>{value === "Rozvoz" ? "♨" : "▣"}</b><span>{value}</span>
                      </Choice>
                    ))}
                  </div>
                </div>

                <div className="real-option-card">
                  <h4>Čas objednávky</h4>
                  <div className="real-two-column">
                    {["Čo najskôr", "Predobjednávka"].map(value => (
                      <Choice key={value} selected={timing === value} onClick={() => setTiming(value)}>
                        <b>{value === "Čo najskôr" ? "ϟ" : "▢"}</b><span>{value}</span>
                      </Choice>
                    ))}
                  </div>
                  {timing === "Predobjednávka" ? (
                    <div className="real-preorder-fields">
                      <label><span>Dátum</span><input type="date" min={new Date().toLocaleDateString("en-CA")} value={scheduledDate} onChange={event => setScheduledDate(event.target.value)}/></label>
                      <label><span>Čas</span><input type="time" value={scheduledTime} onChange={event => setScheduledTime(event.target.value)}/></label>
                      <div className="real-time-notice">◷ Objednávku pripravíme na {scheduledLabel}</div>
                    </div>
                  ) : (
                    <div className="real-time-notice">◷ Odhadovaný čas doručenia: približne {estimatedTime}</div>
                  )}
                </div>

                <div className="real-option-card">
                  <h4>Kontaktné údaje</h4>
                  <label><span>Meno a priezvisko</span><input value="Lexo Lexo" readOnly/></label>
                  <label><span>Telefónne číslo</span><input value="+421900000000" readOnly/></label>
                </div>

                {delivery === "Rozvoz" && (
                  <div className="real-option-card">
                    <h4>Adresa rozvozu</h4>
                    <label><span>Obec / lokalita</span><input value={location} onChange={event => setLocation(event.target.value)}/></label>
                    <label><span>Ulica a číslo</span><input value={street} onChange={event => setStreet(event.target.value)}/></label>
                    <label><span>Doplnenie k adrese (nepovinné)</span><input placeholder="Poschodie, zvonček…" /></label>
                    <div className="real-delivery-price">Cena dovozu: {money(deliveryPrice)}</div>
                  </div>
                )}

                <div className="real-option-card">
                  <h4>Spôsob platby</h4>
                  <div className="real-payment-list">
                    <Choice className="real-payment-choice" selected={payment === "Online"} onClick={() => setPayment("Online")}>
                      <b>▣</b><span>Zaplatiť online</span><strong>{payment === "Online" ? "✓" : ""}</strong>
                    </Choice>
                    <Choice className="real-payment-choice" selected={payment === "Hotovosť"} onClick={() => setPayment("Hotovosť")}>
                      <b>€</b><span>Zaplatiť v hotovosti</span><strong>{payment === "Hotovosť" ? "✓" : ""}</strong>
                    </Choice>
                  </div>
                  {payment === "Online" && <div className="real-payment-logos"><small>Podporované online platby</small><span>tatrapay+</span><b>VISA</b><b>●●</b><b>Pay</b><b>G Pay</b></div>}
                </div>

                <div className="real-option-card">
                  <h4>Poznámka k objednávke (nepovinné)</h4>
                  <textarea value={orderNote} onChange={event => setOrderNote(event.target.value)} placeholder="Napr. prosím zavolať pred doručením…"/>
                </div>

                <div className="real-summary-card checkout">
                  <h4>Súhrn</h4>
                  <p><span>Jedlo</span><b>{money(foodTotal)}</b></p>
                  <p><span>Balné</span><b>{money(packagingTotal)}</b></p>
                  <p><span>Dovoz</span><b>{money(deliveryPrice)}</b></p>
                  <p><span>Termín</span><b>{timing === "Predobjednávka" ? scheduledLabel : "Čo najskôr"}</b></p>
                  <p><span>Platba</span><b>{payment}</b></p>
                  <p><strong>Spolu</strong><b>{money(grandTotal)}</b></p>
                  <p><strong>Na úhradu</strong><strong>{money(grandTotal)}</strong></p>
                </div>

                <div className="real-sticky-action"><button type="button" onClick={checkout}>{payment === "Online" ? "Prejsť na platbu" : "Dokončiť objednávku"} · {money(grandTotal)}</button></div>
              </section>
            )}

            {screen === 4 && success && (
              <section className="real-app-page real-success-page">
                <AppHeader title="Interaktívna ukážka" cartCount={0}/>
                <div className="real-success">
                  <div>✓</div>
                  <small>DEMO JE DOKONČENÉ</small>
                  <h3>Skutočná platba sa nespustila.</h3>
                  <p>Prešli ste celým objednávkovým procesom D•ART aplikácie. Webová ukážka neposiela objednávku ani platobné údaje.</p>
                  <button type="button" onClick={resetDemo}>Spustiť ukážku znova</button>
                  <button type="button" className="secondary" onClick={onClose}>Späť na URVEO</button>
                </div>
              </section>
            )}
          </PhoneFrame>

          <nav className="case-progress" aria-label="Postup ukážky">
            {steps.map((label, index) => (
              <button
                type="button"
                key={label}
                className={screen === index ? "active" : screen > index ? "done" : ""}
                onClick={() => index <= screen && setScreen(index)}
                disabled={index > screen}
              >
                <span>0{index + 1}</span>{label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
