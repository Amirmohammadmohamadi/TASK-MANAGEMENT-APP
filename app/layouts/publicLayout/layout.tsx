import styles from "./publicLayout.module.scss";
import { ChildrenType } from "@/types";

const PublicLayout = ({children}:ChildrenType) => {

    return <div className={styles.publicPageWrapper}>
        {children}
    </div>
};

export default PublicLayout;