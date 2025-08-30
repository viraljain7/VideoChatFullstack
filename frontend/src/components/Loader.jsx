import React from "react";
import {  LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
const GlobalLoader = () => {

  const {theme}= useThemeStore();
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4" 
    data-theme={theme}
    >
      <div className="flex flex-col items-center">
        {/* DaisyUI Button Spinner adapts to theme */}
        <LoaderIcon
          className="h-10 w-10 animate-spin text-primary"
          strokeWidth={2.5}
        />
        {/* Text adapts to theme using text-base-content */}
        <span className="mt-4 font-medium ">Please wait...</span>
      </div>
      
    </div>
  );
};

export default GlobalLoader;
