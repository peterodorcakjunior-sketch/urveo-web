export default function ResidenceVisual({ residence, typology, labels, variant = "catalogue" }) {
  const image = residence.image || typology.image;
  const unavailable = residence.status !== "available";

  return <div className={`c01-residence-visual c01-residence-visual--${variant} c01-residence-visual--${residence.status} ${image ? "has-image" : "is-placeholder"}`}>
    {image && <img src={image} alt={labels.imageAlt(residence.id)} loading="lazy" decoding="async" />}
    {!image && <div className="c01-residence-visual__linework" aria-hidden="true" />}
    <div className="c01-residence-visual__top"><span>{typology.name}</span><small>{labels.typologyLabel}</small></div>
    <strong aria-hidden="true">{residence.id}</strong>
    <div className="c01-residence-visual__bottom"><span>{labels.visual}</span><small>{labels.renderPending}</small></div>
    <p>{labels.selectedLabel}</p>
    {unavailable && <div className="c01-residence-visual__availability" aria-hidden="true"><span>{labels[residence.status]}</span></div>}
  </div>;
}
