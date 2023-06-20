import { FC } from "react";

import styles from "./dateTile.module.scss";

interface IProps {
    month: string,
    day: string,
    currentWork: string
};

const DateTile: FC<IProps> = ({ month, day, currentWork }) => {

    return (
        <div className={styles.date}>
            <p id={styles.month}>{month}</p>
            <p id={styles.day}>{day}</p>
            <p id={styles.workLabel}>Current work</p>
            <p id={styles.currentWork}>{currentWork}</p>
        </div>
    )
}

export default DateTile