const paths = {
  northeast: "M3 13 13 3M4 3h9v9",
  right: "M2 8h12M9 3l5 5-5 5",
  left: "M14 8H2m5-5L2 8l5 5",
};

export default function ArrowIcon({ direction = "northeast" }) {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" width="1em" height="1em"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={paths[direction]}/>
    </svg>
  );
}
