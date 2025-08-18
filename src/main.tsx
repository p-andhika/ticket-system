import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./app";

const rootElement = document.getElementById("root")!;

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
