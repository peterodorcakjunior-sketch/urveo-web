import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { residencesFor, typologies } from "../data/residences";
import FullResidenceDetail from "./ResidenceDetail";
import ResidenceVisual from "./ResidenceVisual";

const catalogueCopy = {
  sk: {
    rooms: "Izby", interior: "Interiér", terrace: "Terasa", residences: "Rezidencie",
    availability: "Dostupnosť", availableSummary: "voľných", schedule: "Rezidencie typológie",
    all: "Všetky", available: "Voľné", reserved: "Rezervované", sold: "Predané",
    residence: "Rezidencia", area: "Interiér", status: "Stav", floor: "Podlažie",
    orientation: "Orientácia", parking: "Parkovanie", price: "Cena", bedrooms: "spálne",
    parkingOne: "parkovacie miesto", parkingMany: "parkovacie miesta", floorValue: (value) => `${value}. podlažie`,
    request: "Mám záujem o súkromnú obhliadku", check: "Overiť dostupnosť",
    viewAvailable: "Zobraziť dostupné rezidencie", close: "Zavrieť detail typológie",
    visual: "Vizualizácia rezidencie", renderPending: "Finálny render bude doplnený", typologyLabel: "Typológia", selectedLabel: "Vybraná rezidencia",
    select: (id) => `Zobraziť detail rezidencie ${id}`, explore: "Preskúmať rezidenciu", imageAlt: (id) => `Vizualizácia rezidencie ${id}`,
    orientationValues: { east: "Východná", "south-east": "Juhovýchodná", south: "Južná", "south-west": "Juhozápadná", west: "Západná" },
  },
  en: {
    rooms: "Rooms", interior: "Interior", terrace: "Terrace", residences: "Residences",
    availability: "Availability", availableSummary: "available", schedule: "Typology residences",
    all: "All", available: "Available", reserved: "Reserved", sold: "Sold",
    residence: "Residence", area: "Interior", status: "Status", floor: "Floor",
    orientation: "Orientation", parking: "Parking", price: "Price", bedrooms: "bedrooms",
    parkingOne: "parking space", parkingMany: "parking spaces", floorValue: (value) => `${value}${value === 1 ? "st" : value === 2 ? "nd" : value === 3 ? "rd" : "th"} floor`,
    request: "Request a private viewing", check: "Check availability",
    viewAvailable: "View available residences", close: "Close typology detail",
    visual: "Residence visual", renderPending: "Final render to be added", typologyLabel: "Typology", selectedLabel: "Selected residence",
    select: (id) => `View details for residence ${id}`, explore: "Explore residence", imageAlt: (id) => `Visual of residence ${id}`,
    orientationValues: { east: "East", "south-east": "South-East", south: "South", "south-west": "South-West", west: "West" },
  },
};

const formatPrice = (price, language) => language === "sk"
  ? `${new Intl.NumberFormat("sk-SK").format(price)} €`
  : `€${new Intl.NumberFormat("en-US").format(price)}`;

export default function ResidenceCatalogue({ language, onViewing }) {
  const [selectedTypology, setSelectedTypology] = useState(null);
  const [selectedResidenceId, setSelectedResidenceId] = useState(null);
  const [displayedResidenceId, setDisplayedResidenceId] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState("idle");
  const [filter, setFilter] = useState("all");
  const [detailResidenceId, setDetailResidenceId] = useState(null);
  const detailRef = useRef(null);
  const exploreTriggerRef = useRef(null);
  const transitionTimers = useRef([]);
  const t = catalogueCopy[language];
  const typology = typologies.find((item) => item.id === selectedTypology);
  const typologyResidences = useMemo(() => selectedTypology ? residencesFor(selectedTypology) : [], [selectedTypology]);
  const shownResidences = filter === "all" ? typologyResidences : typologyResidences.filter((item) => item.status === filter);
  const selectedResidence = typologyResidences.find((item) => item.id === selectedResidenceId) || shownResidences[0];
  const displayedResidence = typologyResidences.find((item) => item.id === displayedResidenceId) || selectedResidence;
  const availableCount = typologyResidences.filter((item) => item.status === "available").length;
  const detailResidence = typologyResidences.find((item) => item.id === detailResidenceId);

  useEffect(() => {
    if (selectedTypology) detailRef.current?.focus({ preventScroll: true });
  }, [selectedTypology]);
  useEffect(() => () => transitionTimers.current.forEach(window.clearTimeout), []);

  const clearTransition = () => {
    transitionTimers.current.forEach(window.clearTimeout);
    transitionTimers.current = [];
  };

  const selectResidence = (id) => {
    if (!id || id === selectedResidenceId) return;
    setSelectedResidenceId(id);
    clearTransition();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedResidenceId(id);
      setTransitionPhase("idle");
      return;
    }
    setTransitionPhase("outgoing");
    transitionTimers.current.push(window.setTimeout(() => {
      setDisplayedResidenceId(id);
      setTransitionPhase("incoming");
      transitionTimers.current = [window.setTimeout(() => {
        setTransitionPhase("idle");
        transitionTimers.current = [];
      }, 700)];
    }, 325));
  };

  const openTypology = (id) => {
    const units = residencesFor(id);
    setSelectedTypology(id);
    const initialResidenceId = id === "panorama" ? "B.07" : units[0].id;
    clearTransition();
    setTransitionPhase("idle");
    setSelectedResidenceId(initialResidenceId);
    setDisplayedResidenceId(initialResidenceId);
    setFilter("all");
    window.requestAnimationFrame(() => document.getElementById("c01-catalogue-detail")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }));
  };

  const setAvailabilityFilter = (nextFilter) => {
    setFilter(nextFilter);
    const firstMatch = typologyResidences.find((item) => nextFilter === "all" || item.status === nextFilter);
    if (firstMatch) selectResidence(firstMatch.id);
  };

  const statusLabel = (status) => t[status];
  const openResidenceDetail = () => { exploreTriggerRef.current = document.activeElement; setDetailResidenceId(displayedResidence.id); };
  const closeResidenceDetail = useCallback(() => { setDetailResidenceId(null); window.requestAnimationFrame(() => exploreTriggerRef.current?.focus({ preventScroll: true })); }, []);
  const viewAvailableFromDetail = () => { closeResidenceDetail(); setAvailabilityFilter("available"); };

  return <>
    <div className="c01-residence-list c01-reveal">
      {typologies.map((item) => {
        const units = residencesFor(item.id);
        const expanded = selectedTypology === item.id;
        return <button className={`c01-residence-type ${expanded ? "is-active" : ""}`} type="button" key={item.id} onClick={() => openTypology(item.id)} aria-expanded={expanded} aria-controls="c01-catalogue-detail">
          <span>{item.number}</span><h3>{item.name}</h3>
          <dl><div><dt>{t.rooms}</dt><dd>{item.rooms}</dd></div><div><dt>{t.interior}</dt><dd>{item.interiorRange}</dd></div><div><dt>{t.residences}</dt><dd>{units.length}</dd></div></dl>
          <i aria-hidden="true">↗</i>
        </button>;
      })}
    </div>
    {!typology && <button className="c01-text-link c01-catalogue-open" type="button" onClick={() => openTypology("alpine-one")}>{language === "sk" ? "Preskúmať rezidencie" : "Explore residences"} <span aria-hidden="true">↗</span></button>}
    {typology && <section className="c01-catalogue" id="c01-catalogue-detail" aria-labelledby="c01-catalogue-title" ref={detailRef} tabIndex="-1">
      <button className="c01-catalogue__close" type="button" onClick={() => setSelectedTypology(null)} aria-label={t.close}>×</button>
      <header className="c01-catalogue__header">
        <div><span>{typology.number}</span><h3 id="c01-catalogue-title">{typology.name}</h3><p>{typology.description[language]}</p></div>
        <dl>
          <div><dt>{t.rooms}</dt><dd>{typology.rooms}</dd></div><div><dt>{t.interior}</dt><dd>{typology.interiorRange}</dd></div>
          <div><dt>{t.terrace}</dt><dd>{typology.terraceRange}</dd></div><div><dt>{t.residences}</dt><dd>{typologyResidences.length}</dd></div>
          <div><dt>{t.availability}</dt><dd>{availableCount} {t.availableSummary}</dd></div>
        </dl>
      </header>
      <div className="c01-catalogue__body">
        {displayedResidence && <div className={`c01-residence-presentation c01-residence-presentation--${transitionPhase}`}>
          <ResidenceVisual residence={displayedResidence} typology={typology} labels={t} />
          <QuickResidenceDetail residence={displayedResidence} typology={typology} language={language} labels={t} onViewing={onViewing} onViewAvailable={() => setAvailabilityFilter("available")} onExplore={openResidenceDetail} />
        </div>}
        <div className="c01-schedule">
          <div className="c01-schedule__top"><p className="c01-section-label">{t.schedule}</p><div className="c01-filters" aria-label={t.availability}>{["all", "available", "reserved", "sold"].map((status) => <button type="button" key={status} className={filter === status ? "is-active" : ""} onClick={() => setAvailabilityFilter(status)} aria-pressed={filter === status}>{t[status]}</button>)}</div></div>
          <div className="c01-schedule__labels" aria-hidden="true"><span>{t.residence}</span><span>{t.area}</span><span>{t.status}</span></div>
          <div className="c01-schedule__list">{shownResidences.map((residence) => <button type="button" key={residence.id} className={`c01-unit c01-unit--${residence.status} ${selectedResidence?.id === residence.id ? "is-active" : ""}`} onClick={() => selectResidence(residence.id)} aria-label={t.select(residence.id)} aria-pressed={selectedResidence?.id === residence.id}><strong>{residence.id}</strong><span>{residence.interiorArea} m²</span><span className="c01-unit__status"><i aria-hidden="true" />{statusLabel(residence.status)}</span><b aria-hidden="true">→</b></button>)}</div>
        </div>
      </div>
    </section>}
    {detailResidence && <FullResidenceDetail residence={detailResidence} typology={typology} residences={typologyResidences} language={language} onClose={closeResidenceDetail} onSelect={setDetailResidenceId} onViewing={onViewing} onViewAvailable={viewAvailableFromDetail} />}
  </>;
}

function QuickResidenceDetail({ residence, typology, language, labels, onViewing, onViewAvailable, onExplore }) {
  const details = [
    [labels.rooms, `${residence.rooms} ${labels.bedrooms}`], [labels.interior, `${residence.interiorArea} m²`],
    [labels.terrace, `${residence.terraceArea} m²`], [labels.floor, labels.floorValue(residence.floor)],
    [labels.orientation, labels.orientationValues[residence.orientation]], [labels.parking, `${residence.parking} ${residence.parking === 1 ? labels.parkingOne : labels.parkingMany}`],
  ];
  return <aside className="c01-unit-detail" aria-live="polite">
    <p className="c01-section-label">{labels.residence} / {typology.name}</p>
    <div className="c01-unit-detail__identity"><h4>{residence.id}</h4><span className={`c01-status c01-status--${residence.status}`}>{labels[residence.status]}</span></div>
    <dl>{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="c01-unit-detail__price"><span>{labels.price}</span><strong>{formatPrice(residence.price, language)}</strong></div>
    <button className="c01-explore-residence" type="button" onClick={onExplore}>{labels.explore} <span aria-hidden="true">→</span></button>
    {residence.status === "sold"
      ? <div className="c01-unit-detail__sold"><strong>{labels.sold}</strong><button className="c01-text-link" type="button" onClick={onViewAvailable}>{labels.viewAvailable} <span aria-hidden="true">→</span></button></div>
      : <button className="c01-text-link" type="button" onClick={() => onViewing(residence.id)}>{residence.status === "reserved" ? labels.check : labels.request} <span aria-hidden="true">↗</span></button>}
  </aside>;
}
