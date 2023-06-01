'use client';

import { FC } from "react";

import { useTypedDispatch,  useTypedSelector } from "@/hooks/useReduxHooks";
import { selectUser, toggleWarning } from "@/components/screens/signin/userSlice";
import WarningIcon from "../WarningIcon";
import CrossIcon from "../CrossIcon";

import styles from "./registrationWarning.module.scss";

interface IProps {
    callback: () => void
};

const RegistrationWarning: FC<IProps> = ({ callback }) => {
    const dispatch = useTypedDispatch();
    const { isActiveWarning } = useTypedSelector(selectUser);

    return (
        <div className={`${styles.warning} ${isActiveWarning ? styles.active : ''}`}>
            <div className={styles.warning__wrapper}>
                <div className={styles.warning__wrapper_icons}>
                    <WarningIcon />
                    <div onClick={() => dispatch(toggleWarning())}>
                        <CrossIcon width={18} height={18} />
                    </div>
                </div>
                <p>Are you sure you want to interrupt registration process and go back to main page?</p>
                <div className={styles.warning__wrapper_buttons}>
                    <button onClick={callback} type="button">Continue without savings</button>
                    <button onClick={() => dispatch(toggleWarning())} type="button">Stay here</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationWarning;