import { FC } from "react";

import styles from "./thanksWindow.module.scss";

interface IProps {
    projectName: string,
    callback: () => void
};

const ThanksWindow: FC<IProps> = ({ projectName, callback }) => {

    return (
        <div className={styles.thanks}>
            <h2>Thank you for purchase!</h2>
            <p>Project <span>{projectName}</span> is now available in your personal account</p>
            <button onClick={callback} type="button">Continue</button>
        </div>
    )
}

export default ThanksWindow;