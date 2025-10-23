import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="p-2 ml-4 rounded-full hover:bg-surface cursor-pointer">
      {theme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
    </button>
  );
}
