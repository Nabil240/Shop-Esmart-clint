import { useState } from "react";

const usePageViewMode = () => {
  const pageViewFromLS = localStorage.getItem("pageView") || "grid";
  const [viewMode, setViewMode] = useState(pageViewFromLS);

  return { viewMode, setViewMode };
};

export default usePageViewMode;
