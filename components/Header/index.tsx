"use client";
import Link from "next/link";
import styles from "./header.module.scss";
import { SiTask } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";
import ThemeSwitcher from "../ThemeSwitcher";
import { useAuth } from "@/context/Auth";
import { AUTH_STORAGE } from "@/constants";
import { usePathname , useRouter } from "next/navigation";
import { useTheme } from "@/context/theme";

const Header = () => {
    const { setAuth } = useAuth();
    const { theme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    return <div className={styles.headerWrapper} style={{backgroundColor: theme === "light" ? "white" : "#323131"}}>
        <div className={styles.logoWrapper}>
            <SiTask fill="black" size={20}/>
            <h1>Task Management App</h1>
        </div>
        <div className={styles.navbar}>
            <div 
                className={`${styles.link} ${pathname === "/dashboard" ? styles.activeLink : ""}`}>
                    <Link href="/">Dashbord</Link>
            </div>
            <div className={styles.link}><Link href="/">Tasks</Link></div>
            <div className={styles.link}><Link href="/">Participants</Link></div>
        </div>
        <div className={styles.rightSection}>
            <div 
                className={styles.userIconWrapper} 
                onClick={() => {
                    setAuth({status: "not authenticated"});
                    localStorage.removeItem(AUTH_STORAGE);
                    router.push("/loginPage")
                }}>
                <FaUserAlt size={16}/>
                <div className={styles.flowList}>
                    <p>log out</p>
                    <p>switch user</p>
                </div>
            </div>
            <ThemeSwitcher />
        </div>
    </div>
};

export default Header;