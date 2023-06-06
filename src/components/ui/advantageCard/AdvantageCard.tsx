import { FC } from "react";

import styles from "./advantageCard.module.scss";

interface IProps {
    header: string,
    content: string
};

const AdvatageCard: FC<IProps> = ({ header, content }) => {

    return (
        <div className={styles.advantage}>
            <p id={styles.header}>{header}</p>
            <p id={styles.content}>{content}</p>
        </div>
    )
}

export default AdvatageCard;