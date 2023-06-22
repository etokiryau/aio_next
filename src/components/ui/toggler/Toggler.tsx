import { FC } from "react";

import styles from "./toggler.module.scss";

interface IProps {
    theme: 'dark' | 'light',
    isFirstButtonActive: boolean,
    firstButtonTitle: string,
    secondButtonTitle: string,
    firstButtonCallback: () => void,
    secondButtonCallback: () => void,
    fontSize?: number
};

const Toggler: FC<IProps> = ({ theme, isFirstButtonActive, firstButtonTitle, secondButtonTitle, firstButtonCallback, secondButtonCallback, fontSize = 20 }) => {

    return (
        <div className={theme === 'dark' ? styles.darkToggler : styles.lightToggler}>
            <button type="button"
                style={{fontSize: `${fontSize}px`}}
                onClick={() => firstButtonCallback()}
                className={isFirstButtonActive ? styles.active : ""}
            >
                {firstButtonTitle}
            </button>
            <button type="button"
                style={{fontSize: `${fontSize}px`}}
                onClick={() => secondButtonCallback()}
                className={!isFirstButtonActive ? styles.active : ""}
            >
                {secondButtonTitle}
            </button>
        </div>
    )
}

export default Toggler;