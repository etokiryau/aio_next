import { FC } from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import InstagramIcon from "@/components/ui/InstangramIcon";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import MailIcon from "@/components/ui/MailIcon";
import TelegramIcon from "@/components/ui/TelegramIcon";

const Footer: FC = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__left}>
                <p>© 2023 &quot;AIO&quot; All rights reserved.</p>
            </div>
            <div className={styles.footer__right}>
                <div className={styles.footer__right_block}>
                    <p>Blog</p>
                    <Link href="/blog">Visit blog</Link>
                </div>
                <div className={styles.footer__right_block}>
                    <p>About us</p>
                    <Link href="/questiones">FAQ</Link>
                    <Link href="/policy">Privacy policy</Link>
                </div>
                <div className={styles.footer__right_block}>
                    <p>Contacts</p>
                    <div>
                        <a href="#"><InstagramIcon /></a>
                        <a href="#"><LinkedInIcon /></a>
                        <a href="#"><MailIcon /></a>
                        <a href="#"><TelegramIcon /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;