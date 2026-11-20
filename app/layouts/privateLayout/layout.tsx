import styles from "./privateLayout.module.scss";
import Header from "@/components/Header";
import { ChildrenType } from "@/types";

const PrivateLayout = ({children}:ChildrenType) => {
    return <div className={styles.boddy}>
        <Header />
        {children}
    </div>
};

export default PrivateLayout;