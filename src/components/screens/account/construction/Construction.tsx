import { FC } from "react";
import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";

import styles from "./construction.module.scss";

const Construction: FC = () => {

    return (
        <AccountLayout title="construction">
            <div className={styles.construction}>
                Construction
            </div>
        </AccountLayout>
    )
}

export default Construction;