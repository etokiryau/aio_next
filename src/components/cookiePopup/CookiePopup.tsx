import { FC } from "react";
import Link from "next/link";
import { useTypedSelector, useTypedDispatch } from "@/hooks/useReduxHooks";
import { selectUserPreferences, toggleCookiePopup } from "@/components/userPreferences/userPreferencesSlice";

import styles from "./cookiePopup.module.scss";

const CookiePopup: FC = () => {
    const { cookiePopup } = useTypedSelector(selectUserPreferences);
    const dispatch = useTypedDispatch();

    return (
        <div className={`${styles.cookie} ${cookiePopup ? styles.active : ''}`}>
            <h3>We use some essential cookies to make this website work and ensure secure browsing</h3>
            <p>By staying with us you agree to the use of <Link href="/policy">cookies</Link></p>
            <button onClick={() => dispatch(toggleCookiePopup(false))} type="button">OK</button>
        </div>
    )
}

export default CookiePopup;