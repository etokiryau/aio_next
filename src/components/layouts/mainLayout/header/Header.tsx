import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import UserPreferences from "@/components/userPreferences/UserPreferences";
import HeaderPreferences from "../headerPreferences/HeaderPreferences";
import LogoIcon from "@/components/ui/LogoIcon";

import styles from "./header.module.scss";

interface IPath {
	name: string;
	path: string;
	width: number;
}

const Header: FC = () => {
	const { pathname } = useRouter();
	const [navbar, setNavbar] = useState(false);

	const pathes: IPath[] = [
		{ name: "Home", path: "/", width: 49 },
		{ name: "Projects", path: "/projects", width: 66 },
		{ name: "Advantages", path: "/advantages", width: 95 },
		{ name: "Services", path: "/services", width: 68 },
		{ name: "FAQ", path: "/questiones", width: 33 },
		// { name: "Career", path: "/career", width: 53 },
		{ name: "Contacts", path: "/contacts", width: 73 }
	];

	const toggleNavbar = (): void => {
		setNavbar(prev => !prev)
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__links}>
					<Link href="/">
						<LogoIcon />
					</Link>
					<ul>
						{pathes.map((item, i) => {
							return (
								<li key={i}>
									<Link
										href={item.path}
										style={{ width: `${item.width}px` }}
										className={
											pathname === item.path
												? styles.activeLink
												: ""
										}
									>
										{item.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className={styles.header__user}>
					<div className={styles.header__user_preferences}>
						<HeaderPreferences />
					</div>
					<Link href="/signin">Sign up</Link>
					<div onClick={toggleNavbar} className={`${styles.header__user_burger} ${navbar ? styles.activeBurger : ''}`}>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</header>

			<nav className={`${styles.navbar} ${navbar ? styles.activeNavbar : ''}`}>
				<ul>
					{pathes.map((item, i) => {
						return (
							<li key={i}>
								<Link
									href={item.path}
									className={
										pathname === item.path
											? styles.activeLink
											: ""
									}
								>
									{item.name}
								</Link>
							</li>
						);
					})}
				</ul>
				<div className={styles.navbar__preferences}>
					<HeaderPreferences />
				</div>
			</nav>

			<UserPreferences />
		</>
	);
};

export default Header;