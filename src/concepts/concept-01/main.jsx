import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Concept01 from "./Concept01";
import "./Concept01.css";

createRoot(document.getElementById("concept-01-root")).render(
  <StrictMode>
    <Concept01 />
  </StrictMode>,
);
