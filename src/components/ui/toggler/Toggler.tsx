import { FC } from "react";

import styles from "./toggler.module.scss";

interface IProps {
    theme: 'dark' | 'light',
    isFirstButtonActive: boolean,
    firstButtonTitle: string,
    secondButtonTitle: string,
    firstButtonCallback: () => void,
    secondButtonCallback: () => void
};

const Toggler: FC<IProps> = ({ theme, isFirstButtonActive, firstButtonTitle, secondButtonTitle, firstButtonCallback, secondButtonCallback}) => {

    return (
        <div className={theme === 'dark' ? styles.darkToggler : styles.lightToggler}>
            <button type="button"
                onClick={() => firstButtonCallback()}
                className={isFirstButtonActive ? styles.active : ""}
            >
                {firstButtonTitle}
            </button>
            <button type="button"
                onClick={() => secondButtonCallback()}
                className={!isFirstButtonActive ? styles.active : ""}
            >
                {secondButtonTitle}
            </button>
        </div>
    )
}

export default Toggler;