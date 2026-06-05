import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/martian-mono";
import "@fontsource-variable/geist-mono";
import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
