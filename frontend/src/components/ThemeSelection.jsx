import { CheckCheck, PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelection = () => {
  const { theme: currentTheme, setTheme } = useThemeStore();
  const [showTheme, setShowTheme] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTheme((p) => !p)}
        className="btn btn-ghost flex items-center gap-2 text-base-content"
      >
        <PaletteIcon size={20} />
      </button>
      {showTheme && (
        <ul className="absolute z-[5000] mt-2 -ml-40 w-64 rounded-lg shadow-lg max-h-60 overflow-y-auto border border-base-300 bg-base-100 text-base-content">
          {THEMES.map((theme, index) => (
            <li
              key={index}
              onClick={() => handleThemeChange(theme.name)}
              className={`${
                currentTheme === theme.name
                  ? "bg-primary text-primary-content"
                  : "hover:bg-primary hover:text-primary-content"
              } flex items-center justify-between px-4 py-2 cursor-pointer transition-colors`}
            >
              <div className="flex items-center gap-2">
                {currentTheme === theme.name ? (
                  <CheckCheck size={20} />
                ) : (
                  <PaletteIcon size={20} />
                )}
                <span className="font-medium">{theme.name}</span>
              </div>

              <div className="flex gap-1">
                {theme.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-base-300"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSelection;