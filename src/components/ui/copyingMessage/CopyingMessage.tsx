"use client";

import { FC } from "react";
import styles from "./copyingMessage.module.scss";

interface ICopyingMessage {
    isActive: boolean
};

const CopyingMessage: FC<ICopyingMessage> = ({ isActive = false }) => {

    return (
        <div className={`${styles.copyingMessage} ${isActive ? styles.active : ''}`}>
            Link copied to the clipboard
        </div>
    )
}

export default CopyingMessage;