"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("theme is", theme);
  };
  if (!mounted) {
    return null;
  }
  return (
    <div>
      <button
        className="dark:bg-[#191925]  duration-700 ease-in-out w-14 h-10 flex justify-center items-center rounded-xl bg-[#CCCCFA66]"
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <FaMoon />
        ) : (
          <MdOutlineWbSunny className="fill-[#424286]" />
        )}
      </button>
    </div>
  );
}
