import { FC } from "react";
import styles from "./footer.module.scss";
import Link from "next/link";
import InstagramIcon from "@/components/ui/_icons/InstangramIcon";
import LinkedInIcon from "@/components/ui/_icons/LinkedInIcon";
import MailIcon from "@/components/ui/_icons/MailIcon";
import TelegramIcon from "@/components/ui/_icons/TelegramIcon";

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
						<a href="#">
							<InstagramIcon width={20} height={20} />
						</a>
						<a href="#">
							<LinkedInIcon width={20} height={18} />
						</a>
						<a href="#">
							<MailIcon width={20} height={16} />
						</a>
						<a href="#">
							<TelegramIcon width={20} height={20} />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
