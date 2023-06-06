import { FC } from "react";
import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";

import styles from "./materials.module.scss";

const Materials: FC = () => {

    return (
        <AccountLayout title="Materials">
            <div className={styles.materials}>
                Materials
            </div>
        </AccountLayout>
    )
}

export default Materials;