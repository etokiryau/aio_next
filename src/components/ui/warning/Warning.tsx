import { FC } from "react";

import WarningIcon from "../WarningIcon";
import CrossIcon from "../CrossIcon";

import styles from "./registrationWarning.module.scss";

interface IProps {
    firstButtonCallback: () => void,
    secondButtonCallback: () => void,
    closeButtonCallback: () => void,
    text: string,
    firstButtonTitle: string,
    secondButtonTitle: string,
};

const Warning: FC<IProps> = ({ firstButtonCallback, secondButtonCallback, closeButtonCallback, text, firstButtonTitle, secondButtonTitle }) => {

    return (
        <div className={styles.warning__wrapper}>
            <div className={styles.warning__wrapper_icons}>
                <WarningIcon />
                <div onClick={closeButtonCallback}>
                    <CrossIcon width={18} height={18} />
                </div>
            </div>
            <p>{text}</p>
            <div className={styles.warning__wrapper_buttons}>
                <button onClick={firstButtonCallback} type="button">{firstButtonTitle}</button>
                <button onClick={secondButtonCallback} type="button">{secondButtonTitle}</button>
            </div>
        </div>
    )
}

export default Warning;