import { FC } from "react";

import styles from "./technicalIndicators.module.scss";

interface IIndicatorsProps {
    area: number,
    height: number,
    houseDimensions: [number, number]
};

const TechnicalIndicators: FC<IIndicatorsProps> = ({ area, height, houseDimensions }) => {

    return (
        <div className={styles.indicators}>
            <div className={styles.indicators__single}>
                <p className={styles.indicators__single_value}>{area} m</p>
                <div className={styles.indicators__single_line} />
                <p className={styles.indicators__single_value_property}>Total area</p>
            </div>

            <div className={styles.indicators__single}>
                <p className={styles.indicators__single_value}>{height} m</p>
                <div className={styles.indicators__single_line} />
                <p className={styles.indicators__single_value_property}>Height</p>
            </div>

            <div className={styles.indicators__single}>
                <p className={styles.indicators__single_value}>{houseDimensions[0]} m x {houseDimensions[1]} m</p>
                <div className={styles.indicators__single_line} />
                <p className={styles.indicators__single_value_property}>Building dimensions</p>
            </div>
        </div>
    )
}

export default TechnicalIndicators;