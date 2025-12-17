import { trackVisitor } from "@/utils/trackVisitor";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks page visits and sends them to backend
 * Renders nothing (logic-only component)
 */
export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    trackVisitor(location.pathname);
  }, [location.pathname]);

  return null;
}
