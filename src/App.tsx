import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default App;
