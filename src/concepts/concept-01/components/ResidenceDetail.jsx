import { useEffect, useRef } from "react";
import ResidenceVisual from "./ResidenceVisual";

const detailCopy = {
  sk: {
    back: "Späť na rezidencie", close: "Zavrieť detail rezidencie", residence: "Rezidencia", typology: "Typológia", status: "Stav",
    rooms: "Spálne", interior: "Interiér", terrace: "Terasa", floor: "Podlažie", orientation: "Orientácia", parking: "Parkovanie", price: "Cena",
    bedrooms: "spálne", floorValue: (v) => `${v}. podlažie`, parkingValue: (v) => `${v} ${v === 1 ? "parkovacie miesto" : "parkovacie miesta"}`,
    available: "Voľná", reserved: "Rezervovaná", sold: "Predaná", visual: "Vizualizácia rezidencie", renderPending: "Finálny render bude doplnený",
    typologyLabel: "Typológia", selectedLabel: "Vybraná rezidencia", imageAlt: (id) => `Vizualizácia rezidencie ${id}`,
    character: "Charakter rezidencie", floorplan: "Pôdorys rezidencie", floorplanPending: "Finálny pôdorys bude doplnený.", orientationTitle: "Orientácia / výhľad",
    standard: "Štandard rezidencie", standards: ["Prírodný kameň", "Drevené povrchy", "Veľkoformátové presklenie", "Premyslené osvetlenie", "Súkromná terasa", "Parkovanie"],
    request: "Dohodnúť súkromnú obhliadku", check: "Overiť dostupnosť", viewAvailable: "Zobraziť voľné rezidencie",
    previous: "Predchádzajúca rezidencia", next: "Nasledujúca rezidencia",
    orientations: { east: "Východ", "south-east": "Juhovýchod", south: "Juh", "south-west": "Juhozápad", west: "Západ" },
    characterCopy: {
      "alpine-one": "Komorná horská rezidencia, v ktorej prirodzené materiály a pokojná terasa vytvárajú súkromné útočisko.",
      "alpine-two": "Vyvážená rezidencia s veľkorysým denným priestorom, prirodzeným svetlom a priamym kontaktom s terasou.",
      panorama: "Rezidencia orientovaná k horizontu s veľkorysým presklením, priamym kontaktom s terasou a pokojnou horskou atmosférou.",
      penthouse: "Najvyššie položená rezidencia s dôrazom na súkromie, otvorený priestor a nerušený vzťah ku krajine.",
    },
  },
  en: {
    back: "Back to residences", close: "Close residence detail", residence: "Residence", typology: "Typology", status: "Status",
    rooms: "Bedrooms", interior: "Interior area", terrace: "Terrace area", floor: "Floor", orientation: "Orientation", parking: "Parking", price: "Price",
    bedrooms: "bedrooms", floorValue: (v) => `${v}${v === 1 ? "st" : v === 2 ? "nd" : v === 3 ? "rd" : "th"} floor`, parkingValue: (v) => `${v} parking ${v === 1 ? "space" : "spaces"}`,
    available: "Available", reserved: "Reserved", sold: "Sold", visual: "Residence visual", renderPending: "Final render to be added",
    typologyLabel: "Typology", selectedLabel: "Selected residence", imageAlt: (id) => `Visual of residence ${id}`,
    character: "Residence character", floorplan: "Residence floorplan", floorplanPending: "Final floorplan to be added.", orientationTitle: "Orientation / view",
    standard: "Residence standard", standards: ["Natural stone", "Timber surfaces", "Expansive glazing", "Considered lighting", "Private terrace", "Parking"],
    request: "Request a private viewing", check: "Check availability", viewAvailable: "View available residences",
    previous: "Previous residence", next: "Next residence",
    orientations: { east: "East", "south-east": "South-East", south: "South", "south-west": "South-West", west: "West" },
    characterCopy: {
      "alpine-one": "An intimate mountain residence where natural materials and a quiet terrace create a private retreat.",
      "alpine-two": "A balanced residence with generous living space, natural light and a direct connection to the terrace.",
      panorama: "A residence oriented toward the horizon, defined by generous glazing, direct connection to the terrace and a calm mountain atmosphere.",
      penthouse: "The highest residence, composed around privacy, open space and an uninterrupted relationship with the landscape.",
    },
  },
};

const orientationAngles = {
  north: 0,
  "north-east": 45,
  east: 90,
  "south-east": 135,
  south: 180,
  "south-west": 225,
  west: 270,
  "north-west": 315,
};
const orientationMarks = {
  north: "N",
  "north-east": "NE",
  east: "E",
  "south-east": "SE",
  south: "S",
  "south-west": "SW",
  west: "W",
  "north-west": "NW",
};

function OrientationDiagram({ orientation }) {
  const angle = orientationAngles[orientation] ?? 0;

  return <div className="c01-orientation-diagram" aria-hidden="true">
    <svg viewBox="0 0 420 360" focusable="false">
      <g className="c01-orientation-diagram__construction">
        <path d="M70 72H150 M270 72H350 M70 288H150 M270 288H350" />
        <path d="M102 52V112 M318 248V308 M50 180H128 M292 180H370" />
        <path d="M210 48V132 M210 228V312 M78 180H162 M258 180H342" />
        <path d="M151 121L177 147 M243 213L269 239 M151 239L177 213 M243 147L269 121" />
      </g>
      <g className="c01-orientation-diagram__ticks">
        <path d="M202 48H218 M202 312H218 M78 172V188 M342 172V188" />
        <path d="M206 176H214 M210 172V180" />
      </g>
      <g className="c01-orientation-diagram__axis" style={{ "--orientation-angle": `${angle}deg` }}>
        <path className="c01-orientation-diagram__axis-reference" d="M210 252V180" />
        <path className="c01-orientation-diagram__axis-primary" d="M210 180V68" />
        <path className="c01-orientation-diagram__axis-cap" d="M198 68H222" />
      </g>
      <g className="c01-orientation-diagram__labels">
        <text x="210" y="32" textAnchor="middle">N</text>
        <text x="390" y="184" textAnchor="middle">E</text>
        <text x="210" y="344" textAnchor="middle">S</text>
        <text x="30" y="184" textAnchor="middle">W</text>
        <text className="c01-orientation-diagram__bearing" x="346" y="326" textAnchor="end">{orientationMarks[orientation] ?? orientation}</text>
      </g>
    </svg>
  </div>;
}
const formatPrice = (price, language) => language === "sk" ? `${new Intl.NumberFormat("sk-SK").format(price)} €` : `€${new Intl.NumberFormat("en-US").format(price)}`;

export default function ResidenceDetail({ residence, typology, residences, language, onClose, onSelect, onViewing, onViewAvailable }) {
  const dialogRef = useRef(null);
  const t = detailCopy[language];
  const index = residences.findIndex((item) => item.id === residence.id);
  const previous = residences[(index - 1 + residences.length) % residences.length];
  const next = residences[(index + 1) % residences.length];
  const details = [
    [t.residence, residence.id], [t.typology, typology.name], [t.status, t[residence.status]], [t.rooms, `${residence.rooms} ${t.bedrooms}`],
    [t.interior, `${residence.interiorArea} m²`], [t.terrace, `${residence.terraceArea} m²`], [t.floor, t.floorValue(residence.floor)],
    [t.orientation, t.orientations[residence.orientation]], [t.parking, t.parkingValue(residence.parking)], [t.price, formatPrice(residence.price, language)],
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !document.querySelector(".c01-modal")) onClose();
      if (event.key !== "Tab") return;
      const focusable = [...dialogRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')].filter((node) => !node.disabled);
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKeyDown); };
  }, [onClose]);

  return <div className="c01-detail-layer" role="presentation">
    <article className="c01-detail" role="dialog" aria-modal="true" aria-labelledby="c01-detail-title" ref={dialogRef} tabIndex="-1">
      <header className="c01-detail__bar"><button type="button" onClick={onClose} aria-label={t.close}>← <span>{t.back}</span></button><span className="c01-wordmark">VAYREN</span><button className="c01-detail__close" type="button" onClick={onClose} aria-label={t.close}>×</button></header>
      <div className="c01-detail__hero">
        <div className="c01-detail__heading"><p>{t.residence} / {typology.name}</p><h2 id="c01-detail-title">{residence.id}</h2><div><h3>{typology.name} Residence</h3><span className={`c01-status c01-status--${residence.status}`}>{t[residence.status]}</span></div><strong>{formatPrice(residence.price, language)}</strong></div>
        <ResidenceVisual residence={residence} typology={typology} labels={t} variant="detail" />
      </div>
      <section className="c01-detail__information" aria-label={language === "sk" ? "Informácie o rezidencii" : "Residence information"}><p className="c01-section-label">01 / {t.residence}</p><dl>{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
      <section className="c01-detail__character"><p className="c01-section-label">02 / {t.character}</p><h3>{typology.name}</h3><p>{t.characterCopy[typology.id]}</p></section>
      <section className="c01-detail__floorplan"><div><p className="c01-section-label">03 / {t.floorplan}</p><h3>{t.floorplan}</h3><p>{t.floorplanPending}</p></div>{residence.floorplan ? <img src={residence.floorplan} alt={t.floorplan} loading="lazy" /> : <div className="c01-floorplan-placeholder" aria-hidden="true"><i /><i /><i /><span>{residence.id}</span></div>}</section>
      <section className="c01-detail__orientation"><div><p className="c01-section-label">04 / {t.orientationTitle}</p><h3>{t.orientations[residence.orientation]}</h3><p>{t.characterCopy[typology.id]}</p></div><OrientationDiagram orientation={residence.orientation} /></section>
      <section className="c01-detail__standard"><p className="c01-section-label">05 / {t.standard}</p><ol>{t.standards.map((item, itemIndex) => <li key={item}><span>0{itemIndex + 1}</span>{item}</li>)}</ol></section>
      <section className="c01-detail__action">
        <p>{residence.id} / {typology.name}</p><strong>{t[residence.status]}</strong>
        {residence.status === "sold" ? <button type="button" onClick={onViewAvailable}>{t.viewAvailable} <span aria-hidden="true">→</span></button> : <button type="button" onClick={() => onViewing(residence.id)}>{residence.status === "reserved" ? t.check : t.request} <span aria-hidden="true">↗</span></button>}
      </section>
      <nav className="c01-detail__nav" aria-label={language === "sk" ? "Navigácia medzi rezidenciami" : "Residence navigation"}><button type="button" onClick={() => onSelect(previous.id)} aria-label={`${t.previous} ${previous.id}`}>← {previous.id}</button><button type="button" onClick={() => onSelect(next.id)} aria-label={`${t.next} ${next.id}`}>{next.id} →</button></nav>
      <footer className="c01-detail__disclosure">{language === "sk" ? "VAYREN je fiktívny portfóliový koncept. Nejde o reálnu ponuku nehnuteľností." : "VAYREN is a fictional portfolio concept. It is not a real property offering."}</footer>
    </article>
  </div>;
}
