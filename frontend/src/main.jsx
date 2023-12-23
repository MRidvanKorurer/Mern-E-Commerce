import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Layout } from "./layouts/Layout.jsx";
import { CardProvider } from "./context/CardContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import ScrolToTop from "./components/ScrolToTop.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <ScrolToTop />
    <CardProvider>
      <Layout>
        <App />
      </Layout>
    </CardProvider>
  </BrowserRouter>
  // </React.StrictMode>,
);
