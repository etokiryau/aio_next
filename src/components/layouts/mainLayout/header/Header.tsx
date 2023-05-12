import Link from "next/link";
import { FC, ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./header.module.scss";
import Triangle from "@/components/ui/triangleIcon/TriangleIcon";

interface IPath {
	name: string;
	path: string;
	width: number;
}

interface ILanguage {
	src: string;
	alt: string;
}

interface ILanguages {
	[key: string]: ILanguage;
}

const Header: FC = () => {
	const { pathname } = useRouter();
	const [language, setLanguage] = useState("En");
	const [languagePopup, setLanguagePopup] = useState(false);

	const pathes: IPath[] = [
		{ name: "Home", path: "/", width: 49 },
		{ name: "Projects", path: "/projects", width: 66 },
		{ name: "Advantages", path: "/advantages", width: 95 },
		{ name: "Services", path: "/services", width: 68 },
		{ name: "FAQ", path: "/questiones", width: 33 },
		{ name: "Career", path: "/career", width: 53 },
		{ name: "Contacts", path: "/contacts", width: 73 }
	];

	const languages: ILanguages = {
		En: { src: "/americanFlag.svg", alt: "English" },
		Es: { src: "/spainFlag.svg", alt: "Spanish" },
		Fr: { src: "/franceFlag.svg", alt: "French" }
	};

	const popupContent = (): ReactNode[] => {
		const result: JSX.Element[] = [];

		for (let key in languages) {
			if (key === language) continue;

			const element: JSX.Element = (
				<div
					key={languages[key].alt}
					onClick={() => changeLanguage(key)}
				>
					<Image
						src={languages[key].src}
						alt={languages[key].alt}
						width={20}
						height={15}
					/>
					<p>{key}</p>
				</div>
			);

			result.push(element);
		}

		return result;
	};

	const togglePopup = () => {
		setLanguagePopup(prev => !prev);
	};

	const changeLanguage = (language: string): void => {
		setLanguage(language);
		togglePopup();
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.header__links}>
					<Image src="/logo.svg" alt="logo" width={40} height={40} />
					<ul>
						{pathes.map((item, i) => {
							return (
								<li key={i}>
									<Link
										href={item.path}
										style={{ width: `${item.width}px` }}
										className={
											pathname === item.path
												? styles.active
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
					<div className={styles.header__user_language}>
						<div
							className={styles.header__user_language_wrapper}
							onClick={togglePopup}
						>
							<Image
								src={languages[language].src}
								alt="flag"
								width={40}
								height={40}
							/>
							<p>{language}</p>
							<Triangle isActive={languagePopup} />
						</div>

						<div
							className={`${styles.header__user_language_popup} ${
								languagePopup ? styles.active : ""
							}`}
						>
							{popupContent()}
						</div>
					</div>
					<Link href="/login">Sign up</Link>
				</div>
			</header>
		</>
	);
};

export default Header;
