import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const ThemeSelection = () => {
  const { setTheme } = useThemeStore();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const [showTheme, setShowTheme] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowTheme((p) => !p)}
        className="btn  flex items-center gap-2"
      >
        <PaletteIcon size={20} />
      </button>
      {showTheme && (
        <ul className="absolute z-50 mt-2 -ml-40 w-64 rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200/20 bg-base-100">
          {THEMES.map((theme, index) => (
            <li
              key={index}
              onClick={() => handleThemeChange(theme.name)}
              className="flex items-center justify-between px-4 py-2 cursor-pointer rounded hover:bg-primary hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <PaletteIcon size={20} />
                <span className="font-medium">{theme.name}</span>
              </div>

              <div className="flex gap-1">
                {theme.colors.map((color, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    title={color} // tooltip
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
