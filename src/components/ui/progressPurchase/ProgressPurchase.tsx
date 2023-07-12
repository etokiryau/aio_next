import { FC, useState } from "react";
import Toggler from "../toggler/Toggler";

import styles from "./progressPurchase.module.scss";

interface IProps {
    value: number
};

const ProgressPurchase: FC<IProps> = ({ value }) => {
    const [isToday, setIsToday] = useState(true);

    return (
        <div className={styles.purchase}>
            <div className={styles.purchase__header}> 
                <h3>Construction progress</h3>
                <div className={styles.purchase__header_note}>
                    <p>?</p>
                    <div className={styles.purchase__header_note_popup}>
                        This is an explanation of a parameter shown on the diagram
                    </div>
                </div>
            </div>
            <div className={styles.purchase__content}>
                <div className={styles.purchase__content_toggler}>
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
                <div className={styles.purchase__content_data}>
                    <div className={styles.purchase__content_data_bar}>
                        {value < 85 && <span>100%</span>}
                    </div>
                    <div style={{width: `${value}%`}} className={styles.purchase__content_data_bar}>
                        <span>{value}%</span>
                    </div>
                </div>
                <div className={styles.purchase__content_labels}>
                    <div className={styles.purchase__content_labels_single}>
                        <span></span>
                        <p>Need to buy</p>
                    </div>
                    <div className={styles.purchase__content_labels_single}>
                        <span></span>
                        <p>Purchase</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressPurchase;