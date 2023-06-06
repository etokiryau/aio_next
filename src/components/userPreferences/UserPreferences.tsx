"use client";

import { FC, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import Geonames from "geonames.js";

import { useAuth } from "@/hooks/useAuth";
import { languagesData, currencyData } from "@/utillis/preferenceData";
import {
	selectUserPreferences,
	setPreferences,
	setDocumentationPreferences,
	closePopup as closePreferencePopup
} from "./userPreferencesSlice";
import { changeAuthMode } from "../screens/signin/userSlice";
import { setProjectForPurchase } from "../screens/main/projects/projectsSlice";
import TriangleIcon from "@/components/ui/TriangleIcon";
import CrossIcon from "../ui/CrossIcon";
import WarningWindow from "../ui/warningWindow/WarningWindow";

import styles from "./userPreferences.module.scss";
import WarningIcon from "../ui/WarningIcon";

const UserPreferences: FC = () => {
	const { token } = useAuth();
	const {
		type,
		isOpen,
		language,
		currency,
		location,
		documentationLanguage
	} = useTypedSelector(selectUserPreferences);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [locationInput, setLocationInput] = useState(location);
	const [chosenCurrency, setChosenCurrency] = useState<string>(currency);
	const [chosenLanguage, setChosenLanguage] = useState<string>(language);
	const [foundLocations, setFoundLocations] = useState<any[] | null>(null);
	const [loginWarning, setLoginWarning] = useState<boolean>(false);
	const popupRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useTypedDispatch();
	const router = useRouter();

	const geonames = Geonames({
		username: "aio.house",
		lan: "en",
		encoding: "JSON"
	});

	const languageOptions = (): JSX.Element[] => {
		const result: JSX.Element[] = [];

		for (let key in languagesData) {
			if (key === chosenLanguage) continue;

			const element: JSX.Element = (
				<div
					className={styles.languageOption}
					key={languagesData[key].alt}
					onClick={() => {
						setChosenLanguage(key);
						setActiveSection(null);
					}}
				>
					<Image
						src={languagesData[key].src}
						alt={languagesData[key].alt}
						width={20}
						height={15}
					/>
					<p>{languagesData[key].title}</p>
				</div>
			);

			result.push(element);
		}

		return result;
	};

	const currencyOptions = (): JSX.Element[] => {
		const result: JSX.Element[] = [];

		for (let key in currencyData) {
			if (key === chosenCurrency) continue;

			const element: JSX.Element = (
				<div
					className={styles.currencyOption}
					key={key}
					onClick={() => {
						setChosenCurrency(key);
						setActiveSection(null);
					}}
				>
					<p>{currencyData[key]}</p>
					<p>{key}</p>
				</div>
			);

			result.push(element);
		}

		return result;
	};

	const locationOptions = (): JSX.Element[] | null => {
		if (!foundLocations) return null;
		else {
			return foundLocations.map((item, i) => {
				return (
					<p
						className={styles.locationOption}
						onClick={() => {
							setLocationInput(item.toponymName);
							setActiveSection(null);
						}}
						key={i}
					>
						{item.toponymName}
					</p>
				);
			});
		}
	};

	const toggleOptions = (section: string): void => {
		if (section === activeSection) {
			setActiveSection(null);
		} else {
			setActiveSection(section);
		}
	};

	const toggleLocationSection = (event: React.MouseEvent<HTMLDivElement>): void => {
		if (event.target === inputRef.current) return;
		toggleOptions("location");
	};

	const closePopup = (event: React.MouseEvent<HTMLDivElement>): void => {
		setLoginWarning(false);
		event?.target === popupRef.current && dispatch(closePreferencePopup());
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setLocationInput(event.target.value);

		const searchCities = (): void => {
			geonames
				.search({
					name_startsWith: locationInput,
					cities: "cities15000",
					maxRows: 20
				})
				.then(resp => {
					setFoundLocations(resp.geonames);
				})
				.catch(err => setFoundLocations(null));
		};
		searchCities();
	};

	const handleSubmit = (): void => {
		if (type === "project") {
			if (!locationInput) return;

			dispatch(
				setDocumentationPreferences({
					location: locationInput,
					documentationLanguage: chosenLanguage,
					currency: chosenCurrency
				})
			);

			if (!token) {
				setTimeout(() => {
					setLoginWarning(true);
				}, 100);
			} else {
				dispatch(closePreferencePopup());
				const project = router.query.name;
				router.push({ pathname: "/purchase", query: { project } });
			}
		} else {
			dispatch(
				setPreferences({
					isOpen: false,
					language: chosenLanguage,
					currency: chosenCurrency
				})
			);
		}

		setActiveSection(null);
	};

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";

		if (isOpen) {
			setLocationInput(location);
			setChosenCurrency(currency);
			setChosenLanguage(
				type === "common" ? language : documentationLanguage
			);
			setActiveSection(null);
		}
	}, [isOpen]);

	useEffect(() => {
		activeSection === "location" && inputRef.current?.focus();
	}, [activeSection]);

	return (
		<div
			ref={popupRef}
			onClick={closePopup}
			className={`${styles.preferences__wrapper} ${
				isOpen ? styles.activePopup : ""
			}`}
		>
			{!loginWarning && (
				<div className={`${styles.preferences}`}>
					<div className={styles.preferences__header}>
						{type === "common" ? (
							<p>Language and currency</p>
						) : (
							<p>Project details</p>
						)}
						<div onClick={() => dispatch(closePreferencePopup())}>
							<CrossIcon />
						</div>
					</div>
					<div className={styles.preferences__preferences}>
						<div className={styles.preferences__preferences_single}>
							<div className={styles.preferences__preferences_single_header}>
								<p>
									{type === "common"
										? "Language"
										: "Documentation language"}
								</p>
								{type === "project" && (
									<div>
										<WarningIcon hasFilling={true} />
										<p id={styles.warning}>
											Your project&#39;s characteristics
											are tailored to the climate
											conditions of the selected building
											location!
										</p>
									</div>
								)}
							</div>
							<div
								className={`${
									styles.preferences__preferences_single_wrapper
								} ${
									activeSection === "language"
										? styles.activeSection
										: ""
								}`}
							>
								<div
									onClick={() => toggleOptions("language")}
									className={styles.preferences__preferences_single_preview}
								>
									<div>
										<Image
											src={languagesData[chosenLanguage].src}
											alt="flag"
											width={21}
											height={15}
										/>
										<p>{languagesData[chosenLanguage].title}</p>
									</div>
									<TriangleIcon />
								</div>
								<div className={styles.preferences__preferences_single_options}>
									{languageOptions()}
								</div>
							</div>
						</div>

						{type === "project" && (
							<div className={styles.preferences__preferences_single}>
								<div className={styles.preferences__preferences_single_header}>
									<p>Builiding location</p>
									{type === "project" && (
										<div>
											<WarningIcon hasFilling={true} />
											<p id={styles.warning}>
												Your project&#39;s
												characteristics are tailored to
												the climate conditions of the
												selected building location!
											</p>
										</div>
									)}
								</div>
								<div className={`${styles.preferences__preferences_single_wrapper}`}>
									<div
										onClick={toggleLocationSection}
										className={styles.preferences__preferences_single_preview}
									>
										<div>
											{locationInput ||
											activeSection === "location" ? (
												<input
													ref={inputRef}
													value={
														locationInput
															? locationInput
															: ""
													}
													onChange={handleInputChange}
													type="text"
													placeholder="Start searching..."
												/>
											) : (
												<span>Choose region</span>
											)}
										</div>
										<TriangleIcon />
									</div>
									<div className={styles.preferences__preferences_single_options}>
										{locationOptions()}
									</div>
								</div>
							</div>
						)}

						<div className={styles.preferences__preferences_single}>
							<p>Currency</p>
							<div
								className={`${
									styles.preferences__preferences_single_wrapper
								} ${
									activeSection === "currency"
										? styles.activeSection
										: ""
								}`}
							>
								<div
									onClick={() => toggleOptions("currency")}
									className={styles.preferences__preferences_single_preview}
								>
									<div>
										<p>{currencyData[chosenCurrency]}</p>
										<p>{chosenCurrency}</p>
									</div>
									<TriangleIcon />
								</div>
								<div className={styles.preferences__preferences_single_options}>
									{currencyOptions()}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.preferences__buttons}>
						<div
							onClick={handleSubmit}
							className={styles.preferences__buttons_single}
						>
							{type === "common" ? "Save" : "Confirm"}
						</div>
					</div>
				</div>
			)}

			{loginWarning && (
				<WarningWindow
					firstButtonCallback={() => {
						setLoginWarning(false);
						dispatch(
							setProjectForPurchase(String(router.query.name))
						);
						dispatch(closePreferencePopup());
						dispatch(changeAuthMode("signup"));
						router.push("/signin");
					}}
					secondButtonCallback={() => {
						setLoginWarning(false);
						dispatch(
							setProjectForPurchase(String(router.query.name))
						);
						dispatch(changeAuthMode("signin"));
						dispatch(closePreferencePopup());
						router.push("/signin");
					}}
					closeButtonCallback={() => {
						setLoginWarning(false);
						dispatch(closePreferencePopup());
					}}
					firstButtonTitle="Sign up"
					secondButtonTitle="Sign in"
					text="To continue your purchase, please sign up or log in to AIO system"
				/>
			)}
		</div>
	);
};

export default UserPreferences;