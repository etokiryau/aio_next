import { FC } from "react";

import styles from "./progressDates.module.scss";

const ProgressDates: FC = () => {

    return (
        <div className={styles.dates}>
            <div className={styles.dates__header}> 
                <h3>Construction progress</h3>
                <p>?</p>
            </div>
        </div>
    )
}

export default ProgressDates;