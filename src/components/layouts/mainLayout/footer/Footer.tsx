import { FC } from "react";
import styles from "./footer.module.scss";

const Footer: FC = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <p>AIO</p>
                <p>Contacts</p>
            </div>
        </footer>
    )
}

export default Footer;