import { FC } from "react";
import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";

import styles from "./dashboard.module.scss";

const Dashboard: FC = () => {

    return (
        <AccountLayout title="Dashboard">
            <div className={styles.dashboard}>
                Dashboard
            </div>
        </AccountLayout>
    )
}

export default Dashboard;