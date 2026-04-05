import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";

/** Drop this component once inside your Router to auto-track every page view. */
const PageViewTracker = () => {
  const location = useLocation();
  const { track } = useAnalytics();

  useEffect(() => {
    track("page_view", { pagePath: location.pathname });
  }, [location.pathname, track]);

  return null;
};

export default PageViewTracker;
