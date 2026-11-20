"use client";
import { useTheme } from "@/context/theme";
import styles from "./themeSwitcher.module.scss";
import { BsFillMoonStarsFill , BsSunFill } from "react-icons/bs";
import { useEffect } from "react";


const ThemeSwitcher = () => {

    const {theme , setTheme} = useTheme();

    const handleClick = () => {
        if(theme === "light") setTheme("dark");
        else setTheme("light");
    };

    useEffect(()=> {console.log("theme",theme)},[theme]);

    return <div>
        <input type="checkbox" id={styles.input}/>
        <label htmlFor={styles.input}>
            <div className={styles.inputSwitcher} onClick={handleClick}>
                <BsFillMoonStarsFill size={10} fill="black"/>    
                <BsSunFill size={12} fill="orange"/>          
            </div>
        </label>
    </div>
};

export default ThemeSwitcher;