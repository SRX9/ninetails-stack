"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function useThemeLocal() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    var element = document.getElementById("main-div");

    if (!element) return;
    if (theme === "light") {
      element.classList.remove("bg-dark-shade");
      element.classList.add("bg-light-shade");
    } else {
      element.classList.add("bg-dark-shade");
      element.classList.remove("bg-light-shade");
    }
  }, [theme]);
  return { theme, setTheme };
}
