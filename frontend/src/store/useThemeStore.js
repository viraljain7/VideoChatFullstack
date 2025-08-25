import { create } from 'zustand'

export const useThemeStore = create((set) => ({

    theme:localStorage.getItem("daisy-ui-theme")||"lofi",
    setTheme:(theme)=>{
        set({theme});
        localStorage.setItem("daisy-ui-theme", theme);
    },
}))

