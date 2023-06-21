"use client";

import { FC } from "react";
import styles from "./copyingMessage.module.scss";

interface ICopyingMessage {
    isActive: boolean,
    text: string
};

const CopyingMessage: FC<ICopyingMessage> = ({ isActive = false, text }) => {

    return (
        <div className={`${styles.copyingMessage} ${isActive ? styles.active : ''}`}>
            {text}
        </div>
    )
}

export default CopyingMessage;