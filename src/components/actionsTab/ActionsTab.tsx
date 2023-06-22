import { FC } from "react";

import styles from "./actionsTab.module.scss";

const ActionsTab: FC = () => {

    return (
        <div className={styles.actions}>
            <h3>Key actions</h3>
            <div className={styles.actions__content}>

            </div>
        </div>
    )
}

export default ActionsTab;