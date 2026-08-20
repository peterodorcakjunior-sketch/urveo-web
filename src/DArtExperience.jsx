import { useEffect, useState } from "react";
import "./DArtExperience.css";

const products = [
  { id: 1, category: "Pizza", name: "Margherita", description: "Paradajkový základ, mozzarella, bazalka", price: 8.9, tone: "tomato" },
  { id: 2, category: "Pizza", name: "Prosciutto", description: "Paradajkový základ, mozzarella, šunka", price: 10.5, tone: "prosciutto" },
  { id: 3, category: "Pizza", name: "Diavola", description: "Paradajkový základ, mozzarella, pikantná saláma", price: 11.4, tone: "diavola" },
  { id: 4, category: "Burger", name: "D•ART Burger", description: "Hovädzie mäso, cheddar, šalát, domáca omáčka", price: 12.2, tone: "burger" },
  { id: 5, category: "Burger", name: "Crispy Chicken", description: "Chrumkavé kura, coleslaw, pikantná majonéza", price: 11.8, tone: "chicken" },
  { id: 6, category: "Nápoje", name: "Domáca limonáda", description: "Citrón, mäta, sóda", price: 3.6, tone: "lemon" },
];
const categories = ["Pizza", "Burger", "Nápoje"];
const steps = ["Úvod", "Menu", "Produkt", "Košík", "Objednávka"];
const copy = [
  ["Jednoduchý vstup do objednávky", "Rozhranie vedie zákazníka k ponuke bez zbytočných krokov."],
  ["Ponuka, v ktorej sa zákazník nestratí", "Kategórie a produkty zostávajú dostupné a prehľadné aj pri väčšej ponuke."],
  ["Konfigurácia produktu", "Varianty, množstvo a doplnky sú súčasťou jedného jednoduchého procesu."],
  ["Objednávka pod kontrolou", "Zákazník ešte pred dokončením jasne vidí obsah aj cenu objednávky."],
  ["Od výberu až po objednávku", "Jednotný digitálny proces pripravený na napojenie na backend a administráciu."],
];
const money = value => `${value.toFixed(2).replace(".", ",")} €`;

function FoodVisual({ tone, large = false }) { return <div className={`food-visual food-${tone} ${large ? "large" : ""}`}><i/><i/><i/></div>; }

function PhoneHeader({ title, onBack, cartCount }) {
  return <header className="app-header">{onBack ? <button onClick={onBack} aria-label="Späť">←</button> : <span className="dart-wordmark">D<span>•</span>ART</span>}<strong>{title}</strong><span className="app-cart">{cartCount ? `Taška ${cartCount}` : ""}</span></header>;
}

function DartDevice({ children }) {
  return <div className="phone-shell"><div className="phone-buttons"/><div className="phone-screen"><div className="phone-island"/>{children}</div></div>;
}

function DartInteractiveDemo({ children }) {
  return <div className="dart-interactive-demo">{children}</div>;
}

export default function DArtExperience({ onClose }) {
  const [screen, setScreen] = useState(0);
  const [category, setCategory] = useState("Pizza");
  const [product, setProduct] = useState(products[2]);
  const [size, setSize] = useState("32 cm");
  const [quantity, setQuantity] = useState(1);
  const [extra, setExtra] = useState(false);
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState("Doručenie");
  const [success, setSuccess] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = delivery === "Doručenie" ? 2.5 : 0;
  const goProduct = item => { setProduct(item); setQuantity(1); setSize("32 cm"); setExtra(false); setScreen(2); };
  const addToCart = () => { const price = product.price + (size === "40 cm" ? 3 : 0) + (extra ? 1.5 : 0); setCart(items => [...items, { ...product, size, extra, price, quantity }]); setScreen(3); };
  const changeCart = (index, delta) => setCart(items => items.map((item, i) => i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  const reset = () => { setScreen(0); setCart([]); setSuccess(false); setCategory("Pizza"); setDelivery("Doručenie"); };
  useEffect(() => { const close = event => event.key === "Escape" && onClose(); document.body.classList.add("case-open"); window.scrollTo(0, 0); window.addEventListener("keydown", close); return () => { document.body.classList.remove("case-open"); window.removeEventListener("keydown", close); }; }, [onClose]);

  return <div className="case-experience">
    <div className="case-glow"/><button className="case-back" onClick={onClose}>← <span>Späť na URVEO</span></button>
    <div className="case-title"><p className="eyebrow"><span><i className="eyebrow-line"/></span>INTERAKTÍVNY PROJEKT</p><h1>D•ART</h1><p>Interaktívna ukážka aplikácie</p><small>Vyskúšajte si zjednodušenú ukážku objednávkového procesu priamo v prehliadači.</small></div>
    <div className="case-layout">
      <div className="case-context" key={screen}><span>0{screen + 1} / 05</span><h2>{copy[screen][0]}</h2><p>{copy[screen][1]}</p><small>INTERAKTÍVNY PROTOTYP · DEMO OBSAH</small></div>
      <div className="phone-column">
        <DartDevice><DartInteractiveDemo>
          {screen === 0 && <div className="app-page home-screen"><PhoneHeader cartCount={cartCount}/><div className="welcome"><small>VITAJTE V D•ART</small><h3>Čo si dáte dnes?</h3><p>Vyberte si z našej demo ponuky.</p></div><div className="category-row">{categories.map(cat => <button key={cat} onClick={() => { setCategory(cat); setScreen(1); }}>{cat}</button>)}</div><div className="featured-label"><b>Obľúbené</b><span>Demo ponuka</span></div><div className="featured-cards">{products.slice(0,3).map(item => <button key={item.id} onClick={() => goProduct(item)}><FoodVisual tone={item.tone}/><span>{item.name}</span><b>{money(item.price)}</b></button>)}</div><button className="app-primary" onClick={() => setScreen(1)}>Pozrieť menu <span>→</span></button></div>}
          {screen === 1 && <div className="app-page menu-screen"><PhoneHeader title="Menu" onBack={() => setScreen(0)} cartCount={cartCount}/><div className="category-row sticky">{categories.map(cat => <button className={category === cat ? "active" : ""} key={cat} onClick={() => setCategory(cat)}>{cat}</button>)}</div><small className="demo-label">DEMO PONUKA</small><div className="product-list">{products.filter(item => item.category === category).map(item => <button key={item.id} onClick={() => goProduct(item)}><FoodVisual tone={item.tone}/><span><b>{item.name}</b><small>{item.description}</small><strong>{money(item.price)}</strong></span><i>›</i></button>)}</div></div>}
          {screen === 2 && <div className="app-page detail-screen"><PhoneHeader onBack={() => setScreen(1)} cartCount={cartCount}/><FoodVisual tone={product.tone} large/><div className="detail-copy"><small>DEMO PRODUKT</small><h3>{product.name}</h3><p>{product.description}</p><div className="detail-line"><b>Veľkosť</b><div className="choice-row">{["32 cm","40 cm"].map(value => <button className={size === value ? "active" : ""} onClick={() => setSize(value)} key={value}>{value}</button>)}</div></div><label className="extra"><span><b>Extra mozzarella</b><small>+ 1,50 €</small></span><input type="checkbox" checked={extra} onChange={event => setExtra(event.target.checked)}/></label><div className="add-row"><div className="counter"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}>+</button></div><button className="app-primary" onClick={addToCart}>Pridať · {money((product.price + (size === "40 cm" ? 3 : 0) + (extra ? 1.5 : 0)) * quantity)}</button></div></div></div>}
          {screen === 3 && <div className="app-page cart-screen"><PhoneHeader title="Košík" onBack={() => setScreen(1)} cartCount={cartCount}/>{cart.length ? <><div className="cart-items">{cart.map((item,index) => <article key={`${item.id}-${index}`}><FoodVisual tone={item.tone}/><div><b>{item.name}</b><small>{item.size}{item.extra ? " · extra mozzarella" : ""}</small><strong>{money(item.price * item.quantity)}</strong><div className="counter"><button onClick={() => changeCart(index,-1)}>−</button><span>{item.quantity}</span><button onClick={() => changeCart(index,1)}>+</button></div></div><button className="remove" onClick={() => setCart(items => items.filter((_,i) => i !== index))}>Odstrániť</button></article>)}</div><div className="totals"><p><span>Medzisúčet</span><b>{money(subtotal)}</b></p><p><span>Doručenie</span><b>{money(2.5)}</b></p><p><span>Spolu</span><strong>{money(subtotal + 2.5)}</strong></p></div><button className="app-primary bottom" onClick={() => setScreen(4)}>Pokračovať <span>→</span></button></> : <div className="empty-cart"><b>Košík je prázdny</b><p>Vyberte si niečo z demo ponuky.</p><button className="app-primary" onClick={() => setScreen(1)}>Otvoriť menu</button></div>}</div>}
          {screen === 4 && <div className="app-page checkout-screen"><PhoneHeader title={success ? "Hotovo" : "Objednávka"} onBack={!success ? () => setScreen(3) : undefined} cartCount={cartCount}/>{success ? <div className="success-state"><div className="success-check">✓</div><small>DEMO DOKONČENÉ</small><h3>Objednávka prijatá</h3><p>Takto jednoducho môže zákazník dokončiť objednávku.</p><button className="app-primary" onClick={reset}>Spustiť demo znova</button></div> : <><div className="checkout-copy"><small>SPÔSOB PREVZATIA</small><h3>Ako si objednávku prevezmete?</h3><div className="delivery-options">{["Doručenie","Osobný odber"].map(value => <button className={delivery === value ? "active" : ""} onClick={() => setDelivery(value)} key={value}><i/>{value}<small>{value === "Doručenie" ? "Približne 35–45 min" : "Pripravené približne o 25 min"}</small></button>)}</div><div className="totals"><p><span>Objednávka</span><b>{money(subtotal)}</b></p><p><span>{delivery}</span><b>{deliveryPrice ? money(deliveryPrice) : "Zdarma"}</b></p><p><span>Spolu</span><strong>{money(subtotal + deliveryPrice)}</strong></p></div></div><button className="app-primary bottom" onClick={() => setSuccess(true)}>Dokončiť demo objednávku</button></>}</div>}
        </DartInteractiveDemo></DartDevice>
        <nav className="case-progress" aria-label="Postup ukážky">{steps.map((label,index) => <button key={label} className={screen === index ? "active" : screen > index ? "done" : ""} onClick={() => index <= screen && setScreen(index)} disabled={index > screen}><span>0{index + 1}</span>{label}</button>)}</nav>
      </div>
    </div>
  </div>;
}
