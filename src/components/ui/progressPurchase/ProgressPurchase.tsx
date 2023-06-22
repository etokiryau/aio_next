import { FC, useState } from "react";
import Toggler from "../toggler/Toggler";

import styles from "./progressPurchase.module.scss";

interface IProps {
    value: number
};

const ProgressPurchase: FC<IProps> = ({ value }) => {
    const [isToday, setIsToday] = useState(true);

    return (
        <div className={styles.dates}>
            <div className={styles.dates__header}> 
                <h3>Construction progress</h3>
                <p>?</p>
            </div>
            <div className={styles.dates__content}>
                <div className={styles.dates__content_toggler}>
                    <Toggler 
                        theme="light" 
                        isFirstButtonActive={isToday}
                        firstButtonTitle="Today"
                        secondButtonTitle="General statistics"
                        firstButtonCallback={() => setIsToday(true)}
                        secondButtonCallback={() => setIsToday(false)}
                        fontSize={16}
                    />
                </div>
                <div className={styles.dates__content_data}>
                    <div className={styles.dates__content_data_bar}>
                        {value < 85 && <span>100%</span>}
                    </div>
                    <div style={{width: `${value}%`}} className={styles.dates__content_data_bar}>
                        <span>{value}%</span>
                    </div>
                </div>
                <div className={styles.dates__content_labels}>
                    <div className={styles.dates__content_labels_single}>
                        <span></span>
                        <p>Need to buy</p>
                    </div>
                    <div className={styles.dates__content_labels_single}>
                        <span></span>
                        <p>Purchase</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressPurchase;