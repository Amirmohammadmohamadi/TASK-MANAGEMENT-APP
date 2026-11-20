"use client";
import { ChildrenType, ThemeCotextType, ThemeType } from "@/types";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<ThemeCotextType | null>(null);

const ThemeContextProvider = ({ children }:ChildrenType) => {

    const [theme , setTheme] = useState<ThemeType>("light");

    const value:ThemeCotextType = {
        theme,setTheme
    }

    return <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
};

export default ThemeContextProvider;

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context) throw new Error("[useTheme] ThemeContext is undefined. " +
    "Make sure your component is wrapped in <ThemeProvider>.")
    return context;
}