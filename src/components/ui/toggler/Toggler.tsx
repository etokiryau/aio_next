import { FC } from "react";

import styles from "./toggler.module.scss";

interface IProps {
    theme: 'dark' | 'light',
    isFirstButtonActive: boolean,
    firstButtonTitle: string,
    secondButtonTitle: string,
    firstButtonCallback: () => void,
    secondButtonCallback: () => void,
    fontSize?: number,
    borders?: boolean
};

const Toggler: FC<IProps> = ({ theme, isFirstButtonActive, firstButtonTitle, secondButtonTitle, firstButtonCallback, secondButtonCallback, fontSize = 20, borders = true }) => {
    const buttonStyle = {
        fontSize: `${fontSize}px`,
        border: borders ? 'inherit' : 'none'
    };

    return (
        <div className={theme === 'dark' ? styles.darkToggler : styles.lightToggler}>
            <button type="button"
                style={buttonStyle}
                onClick={() => firstButtonCallback()}
                className={isFirstButtonActive ? styles.active : ""}
            >
                {firstButtonTitle}
            </button>
            <button type="button"
                style={buttonStyle}
                onClick={() => secondButtonCallback()}
                className={!isFirstButtonActive ? styles.active : ""}
            >
                {secondButtonTitle}
            </button>
        </div>
    )
}

export default Toggler;