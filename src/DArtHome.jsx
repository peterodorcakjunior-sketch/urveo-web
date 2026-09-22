import dartRestaurant from "./assets/dart-restaurant.webp";
import dartDailyMenu from "./assets/dart-daily-menu.webp";
import "./DArtHome.css";
import useDArtPhoneEntrance from "./useDArtPhoneEntrance";

function HomeIcon({ name }) {
  const paths = {
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    delivery: <><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M9 17h4l4-10h-4M16 7h3l2 5M3 7h6v6H3zM9 10h5"/></>,
    box: <><path d="M4 7h16v13H4zM3 3h18v4H3zM9 11h6"/></>,
    home: <path d="m3 11 9-8 9 8h-3v10h-4v-6h-4v6H6V11z" fill="currentColor" stroke="none"/>,
    orders: <><path d="M6 3 8 4l2-1 2 1 2-1 2 1 2-1v18l-2-1-2 1-2-1-2 1-2-1-2 1zM9 8h6M9 12h6M9 16h4"/></>,
    heart: <path d="M20.8 5.7a5.3 5.3 0 0 0-7.5 0L12 7l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 22l8.8-8.8a5.3 5.3 0 0 0 0-7.5z" transform="translate(1 0) scale(.92)"/>,
    cart: <><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.3 8H6.1"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></>,
    profile: <><circle cx="12" cy="7" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2z"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

/** Home screen for the existing local-only ordering demo; no account or order API calls. */
export default function DArtHome({ cartCount, onMenu, onCart }) {
  const homeRef = useDArtPhoneEntrance();
  const cartLabel = cartCount ? `Otvoriť košík, ${cartCount} položiek` : "Otvoriť košík";
  const unavailable = "Nie je súčasťou objednávkovej ukážky";
  return (
    <section ref={homeRef} className="real-app-page real-home-page" aria-label="Domov D•ART" tabIndex="-1">
      <div className="dart-home-hero">
        <img className="dart-home-restaurant" src={dartRestaurant} width="480" height="320" alt="" decoding="async"/>
        <div className="dart-home-shade" aria-hidden="true"/>
        <header className="dart-home-header">
          <span className="dart-home-logo" aria-label="D•ART">D<span>•</span>ART</span>
          <div className="dart-home-header-actions">
            <span className="dart-home-language" aria-label="Jazyk ukážky: slovenčina">SK</span>
            <button className="dart-home-english" type="button" disabled title="Ukážka je dostupná v slovenčine" aria-label="Angličtina nie je v ukážke dostupná">EN</button>
            <button className="dart-home-cart" type="button" onClick={onCart} aria-label={cartLabel}>
              <HomeIcon name="cart"/>
              {cartCount > 0 && <span className="dart-home-count">{cartCount}</span>}
            </button>
          </div>
        </header>
        <div className="dart-home-greeting">
          <h3>Dobrý večer,</h3>
          <p>na čo máte dnes chuť?</p>
          <div className="dart-home-dots" aria-hidden="true"><i/><i/><i/></div>
        </div>
      </div>

      <div className="dart-home-info" aria-label="Informácie o objednávke">
        <div><HomeIcon name="clock"/><strong>25 – 35 min</strong><small>čas prípravy</small></div>
        <div><HomeIcon name="delivery"/><strong>Rozvoz</strong><small>od 11:00</small></div>
        <div><HomeIcon name="box"/><strong>Balné</strong><small>0,70 € / položka</small></div>
      </div>

      <div className="dart-home-menu">
        <img src={dartDailyMenu} width="197" height="130" alt="" decoding="async"/>
        <div className="dart-home-menu-copy">
          <h4>DENNÉ MENU</h4>
          <p>Pozrite si aktuálnu ponuku</p>
          <button type="button" onClick={onMenu}>Zobraziť menu</button>
        </div>
      </div>

      <nav className="dart-home-nav" aria-label="Navigácia D•ART">
        <button type="button" className="is-current" aria-current="page" onClick={event => event.currentTarget.closest(".real-home-page")?.scrollTo({ top: 0 })}>
          <span className="dart-home-nav-icon"><HomeIcon name="home"/></span><span>Domov</span>
        </button>
        <button type="button" disabled title={unavailable} aria-label={`Objednávky. ${unavailable}`}>
          <span className="dart-home-nav-icon"><HomeIcon name="orders"/></span><span>Objednávky</span>
        </button>
        <button type="button" disabled title={unavailable} aria-label={`Obľúbené. ${unavailable}`}>
          <span className="dart-home-nav-icon"><HomeIcon name="heart"/></span><span>Obľúbené</span>
        </button>
        <button type="button" onClick={onCart} aria-label={cartLabel}>
          <span className="dart-home-nav-icon"><HomeIcon name="cart"/>{cartCount > 0 && <span className="dart-home-count">{cartCount}</span>}</span><span>Košík</span>
        </button>
        <button type="button" disabled title={unavailable} aria-label={`Profil. ${unavailable}`}>
          <span className="dart-home-nav-icon"><HomeIcon name="profile"/></span><span>Profil</span>
        </button>
      </nav>
    </section>
  );
}
