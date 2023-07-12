import { FC } from "react";

import styles from "./progressDates.module.scss";

const ProgressDates: FC = () => {
    const value: number = 64;

    return (
        <div className={styles.dates}>
            <div className={styles.dates__header}> 
                <h3>Construction progress</h3>
                <div className={styles.dates__header_note}>
                    <p>?</p>
                    <div className={styles.dates__header_note_popup}>
                        This is an explanation of a parameter shown on the diagram
                    </div>
                </div>
            </div>
            <div className={styles.dates__content}>
                <div className={styles.dates__content_info}>
                    <div className={styles.dates__content_info_data}>
                        <p id={styles.up}>34</p>
                        <p id={styles.title}>days past</p>
                    </div>
                    <div className={styles.dates__content_info_data}>
                    <p id={styles.up}>03.06.2023</p>
                        <p id={styles.title}>actual start</p>
                    </div>
                </div>

                <div className={styles.dates__content_chart}>
                    <svg id={styles.metric} width="90" height="90" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50%" cy="50%" r="40" strokeWidth="8" />
                        <circle cx="50%" cy="50%" r="40" strokeWidth="10" strokeDashoffset={251 - value * 251 / 100} />
                    </svg>
                    <span>{value}%</span>
                </div>

                <div className={styles.dates__content_info}>
                    <div className={styles.dates__content_info_data}>
                        <p id={styles.up}>127</p>
                        <p id={styles.title}>days more</p>
                    </div>
                    <div className={styles.dates__content_info_data}>
                        <p id={styles.up}>03.06.2023</p>
                        <p id={styles.title}>forecast finish</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressDates;