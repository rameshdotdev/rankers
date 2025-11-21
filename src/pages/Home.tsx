import { selectActiveTab } from "@/feature/tabs/tabSlice";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { Dashboard } from "./Dashboard";
import { Settings } from "./Settings";
import { TestSeries } from "@/components/TestSeries";

export default function Home() {
  const activeTab = useSelector(selectActiveTab);
  return (
    <DashboardLayout>
      {activeTab === "OVERVIEW" && <Dashboard />}
      {activeTab === "SETTINGS" && <Settings />}
      {activeTab === "TEST_SERIES" && <TestSeries />}
    </DashboardLayout>
  );
}
