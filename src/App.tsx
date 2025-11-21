import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
// import { Settings } from "./pages/Settings";
import Home from "./pages/Home";
import { TestSeries } from "./components/TestSeries";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Home />} path="/dashboard" />
      <Route element={<TestSeries />} path="/settings" />
    </Routes>
  );
}

export default App;
