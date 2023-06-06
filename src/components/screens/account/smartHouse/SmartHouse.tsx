import { FC } from "react";
import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";

import styles from "./smartHouse.module.scss";

const SmartHouse: FC = () => {

    return (
        <AccountLayout title="SmartHouse">
            <div className={styles.smartHouse}>
                SmartHouse
            </div>
        </AccountLayout>
    )
}

export default SmartHouse;