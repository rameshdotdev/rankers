import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
// import { Settings } from "./pages/Settings";
import Home from "./pages/Home";
import { TestSeries } from "./components/TestSeries";
import { TestInstructions } from "./components/TestInstructions";
import DashboardLayout from "./layouts/DashboardLayout";
import { TestRunner } from "./components/TestRunner";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<Home />} path="/dashboard" />
      <Route element={<TestSeries />} path="/settings" />
      <Route
        element={
          <DashboardLayout>
            <TestInstructions />
          </DashboardLayout>
        }
        path="/instructions"
      />
      <Route element={<TestRunner />} path="/runner" />
    </Routes>
  );
}

export default App;
