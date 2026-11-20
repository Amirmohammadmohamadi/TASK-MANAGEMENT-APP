"use client";
import { useAuth } from "@/context/Auth";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
    const { auth } = useAuth();

    return <div className={styles.dashboardWrapper}>
        <h1>welcom {auth.status === "authenticated" && auth.username}</h1>
        <div className={styles.incomingTasks}>
            
        </div>
    </div>
};

export default Dashboard;