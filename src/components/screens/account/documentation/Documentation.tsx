import { FC } from "react";
import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";

import styles from "./documentation.module.scss";

const Documentation: FC = () => {

    return (
        <AccountLayout title="Documentation">
            <div className={styles.documentation}>
                Documentation
            </div>
        </AccountLayout>
    )
}

export default Documentation;