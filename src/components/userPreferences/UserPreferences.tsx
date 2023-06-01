import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import Geonames from 'geonames.js';

import { languagesData, currencyData } from "@/utillis/preferenceData";
import {
	selectUserPreferences,
	setPreferences,
	togglePopup
} from "./userPreferencesSlice";
import Triangle from "@/components/ui/TriangleIcon";
import CrossIcon from "../ui/CrossIcon";

import styles from "./userPreferences.module.scss";

const UserPreferences: FC = () => {
	const { isOpen, language, currency, location } = useTypedSelector(selectUserPreferences);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [locationInput, setLocationInput] = useState(location);
	const [chosenCurrency, setChosenCurrency] = useState<string>(currency);
	const [chosenLanguage, setChosenLanguage] = useState<string>(language);
	const [foundLocations, setFoundLocations] = useState<any[] | null>(null);
	const popupRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useTypedDispatch();

	const geonames = Geonames({
		username: 'aio.house',
		lan: 'en',
		encoding: 'JSON'
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
					<p className={styles.locationOption} 
						onClick={() => {
							setLocationInput(item.toponymName);
							setActiveSection(null);
						}} 
						key={i}
					>{item.toponymName}</p>
				)
			})
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
		toggleOptions('location');
	};

	const closePopup = (event: React.MouseEvent<HTMLDivElement>): void => {
		event?.target === popupRef.current && dispatch(togglePopup());
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setLocationInput(event.target.value);

		const searchCities = (): void => {
			geonames.search({name_startsWith: locationInput, cities: 'cities15000', maxRows: 20})
			.then(resp => {
				setFoundLocations(resp.geonames);
			})
			.catch(err => setFoundLocations(null));
		};
		searchCities();
	};

	const handleSubmit = (): void => {
		dispatch(setPreferences({
			isOpen: false,
			language: chosenLanguage,
			location: locationInput,
			currency: chosenCurrency
		}))
		setActiveSection(null);
	};

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";

		if (isOpen) {
			setLocationInput(location);
			setChosenCurrency(currency);
			setChosenLanguage(language);
			setActiveSection(null);
		}
	}, [isOpen]);

	useEffect(() => {
		activeSection === 'location' && inputRef.current?.focus();
	}, [activeSection]);

	return (
		<div
			ref={popupRef}
			onClick={closePopup}
			className={`${styles.preferences__wrapper} ${
				isOpen ? styles.activePopup : ""
			}`}
		>
			<div className={`${styles.preferences}`}>
				<div className={styles.preferences__header}>
					<p>Regional settings</p>
					<div onClick={() => dispatch(togglePopup())}>
						<CrossIcon />
					</div>
				</div>
				<div className={styles.preferences__preferences}>
					<div className={styles.preferences__preferences_single}>
						<p>Language</p>
						<div
							className={`${
								styles.preferences__preferences_single_wrapper
							} ${activeSection === 'language' ? styles.activeSection : ""}`}
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
								<Triangle />
							</div>
							<div className={styles.preferences__preferences_single_options}>
								{languageOptions()}
							</div>
						</div>
					</div>
					<div className={styles.preferences__preferences_single}>
						<p>Region (city)</p>
						<div
							className={`${
								styles.preferences__preferences_single_wrapper
							} ${activeSection === 'location' ? styles.activeSection : ""}`}
						>
							<div
								onClick={toggleLocationSection}
								className={styles.preferences__preferences_single_preview}
							>
								<div>
									{locationInput || activeSection === 'location'
									? <input ref={inputRef} value={locationInput ? locationInput : ''} onChange={handleInputChange} type="text" placeholder="Start searching..." /> 
									: <span>Choose region</span>}
								</div>
								<Triangle />
							</div>
							<div className={styles.preferences__preferences_single_options}>
								{locationOptions()}
							</div>
						</div>
					</div>
					<div className={styles.preferences__preferences_single}>
						<p>Currency</p>
						<div
							className={`${
								styles.preferences__preferences_single_wrapper
							} ${activeSection === 'currency' ? styles.activeSection : ""}`}
						>
							<div
								onClick={() => toggleOptions("currency")}
								className={styles.preferences__preferences_single_preview}
							>
								<div>
                                    <p>{currencyData[chosenCurrency]}</p>
									<p>{chosenCurrency}</p>
								</div>
								<Triangle />
							</div>
							<div className={styles.preferences__preferences_single_options}>
								{currencyOptions()}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.preferences__buttons}>
					<div onClick={handleSubmit} className={styles.preferences__buttons_single}>
						Save
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPreferences;