import React from "react";
import App from "./App.tsx";
import "@/styles/globals.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import ThemeProvider from "./layouts/ThemeProvider.tsx";
import VisitorTracker from "./components/VisitorTracker.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <VisitorTracker />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
