import { FC } from "react";

import WarningIcon from "../_icons/WarningIcon";

import styles from "./efficiencyTile.module.scss";

interface IProps {
    value: number
};

const EfficiencyTile: FC<IProps> = ({ value }) => {
    const startAngle: number = -140;
    const angle: number = value / 100 * 280;

    return (
        <div className={styles.efficiency}>
            <div className={styles.efficiency__up}>
                <div className={styles.efficiency__up_metrics}>
                    <svg id={styles.metric} width="60" height="60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="circleGradient" x1="1" y1="1" x2="0.3" y2=".5">
                                <stop offset="0%" style={{stopColor: '#725AC1', stopOpacity: '0.2'}} />
                                <stop offset="50%" style={{stopColor: '#725AC1', stopOpacity: '0.5'}} />
                                <stop offset="70%" style={{stopColor: '#725AC1', stopOpacity: '0.7'}} />
                                <stop offset="100%" style={{stopColor: '#725AC1', stopOpacity: '.9' }} />
                            </linearGradient>
                        </defs>
                        <circle cx="50%" cy="50%" fx="50%" fy="50%" r="27.5" strokeWidth="10" />
                    </svg>
                    <span>{value}</span>
                    <div style={{transform: `translate(-50%, -100%) rotate(${startAngle + angle}deg)`}} id={styles.needle} />
                </div>
                <div className={styles.efficiency__up_note}>
                    <WarningIcon hasFilling={true} />
                    <div className={styles.efficiency__up_note_popup}>
                        Here is a description of this indicator
                    </div>
                </div>
            </div>
            <p>Employees efficiency level</p>
        </div>
    )
}

export default EfficiencyTile