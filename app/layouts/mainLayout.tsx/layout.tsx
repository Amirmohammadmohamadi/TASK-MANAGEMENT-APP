"use client"
import styles from "./mainLayout.module.scss";
import { useTheme } from "@/context/theme";
import { ChildrenType } from "@/types";
import PrivateLayout from "../privateLayout/layout";
import PublicLayout from "../publicLayout/layout";
import { Provider } from "react-redux";
import { store } from "@/components/redux";
import { useAuth } from "@/context/Auth";
import Link from "next/link";

const MainLayout = ({children}:ChildrenType) => {
    const { theme } = useTheme();
    const { auth } = useAuth();

    return <Provider store={store}>
        <div className={theme === "light" ? styles.lightTheme : styles.darkTheme}>
            {children}
            {auth.status === "not authenticated" ? <PublicLayout><Link href="/loginPage"/></PublicLayout> : <PrivateLayout />}
        </div>
    </Provider>
};

export default MainLayout;