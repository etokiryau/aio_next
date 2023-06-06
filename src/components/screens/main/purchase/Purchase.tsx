import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTypedSelector, useTypedDispatch } from "@/hooks/useReduxHooks";
import Geonames from "geonames.js";

import { selectProjects } from "../projects/projectsSlice";
import {
	selectUserPreferences,
	setDocumentationPreferences
} from "@/components/userPreferences/userPreferencesSlice";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { languagesData } from "@/utillis/preferenceData";
import LanguageIcon from "@/components/ui/_icons/LanguageIcon";
import LocationMarkerIcon from "@/components/ui/_icons/LocationMarkerIcon";
import WarningIcon from "@/components/ui/toggler/WarningIcon";
import TriangleIcon from "@/components/ui/_icons/TriangleIcon";

import styles from "./purchase.module.scss";
import ThanksWindow from "@/components/ui/thanksWindow/ThanksWindow";

interface ICardData {
	cardNumber: string;
	cardName: string;
	expiredPeriod: string;
	cvv: string;
}

const Purchase: FC = () => {
	const { email, token } = useAuth();
	const { projectForPurchase } = useTypedSelector(selectProjects);
	const { location, currency, documentationLanguage } = useTypedSelector(
		selectUserPreferences
	);
	const [isPurchased, setIsPurchased] = useState(false);
	const [locationInput, setLocationInput] = useState(location);
	const [chosenLanguage, setChosenLanguage] = useState<string>(
		documentationLanguage
	);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [foundLocations, setFoundLocations] = useState<any[] | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const dispatch = useTypedDispatch();

	useEffect(() => {
		!token && router.push("/");
	}, [token]);

	const geonames = Geonames({
		username: "aio.house",
		lan: "en",
		encoding: "JSON"
	});

	const validationSchema = Yup.object({
		cardNumber: Yup.string()
			.min(25, "At least 16 digits")
			.required("Card number is required"),
		cardName: Yup.string()
			.required("Card name is required")
			.matches(
				/^[a-zA-Z]+\s[a-zA-Z]+$/,
				"Card name should be two words separated by a space"
			),
		cvv: Yup.string()
			.min(3, "At least 3 digits")
			.required("CVV code is required"),
		expiredPeriod: Yup.string()
			.min(9, "Invalid format")
			.required("Expired period is required")
	});

	const formik = useFormik({
		initialValues: {
			cardNumber: "",
			cardName: "",
			expiredPeriod: "",
			cvv: ""
		},
		validationSchema,
		validateOnMount: true,
		onSubmit: (values: ICardData) => {
			handleSubmit(values);
		}
	});

	const handleSubmit = async (values: ICardData): Promise<void> => {
		console.log(values);
		await new Promise(resolve => {
			setTimeout(() => resolve(setIsPurchased(true)), 4000);
		});
	};

	const handleBlurName = async (
		e: React.ChangeEvent<HTMLInputElement>
	): Promise<void> => {
		const value: string = e.target.value.trim();
		await formik.setFieldValue("cardName", value);
		formik.handleBlur(e);
	};

	const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let value = e.target.value;
		value = value.replace(/-/g, "").replace(/\D/g, "");
		value = value.replace(/(\d{4})(?=\d)/g, "$1 - ");

		if (value.length > 25) {
			value = `${value.slice(0, 25)}`;
		}

		formik.setFieldValue("cardNumber", value);
	};

	const formatExpiredPeriod = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		let value = e.target.value;
		value = value.replace(/\D/g, "");

		if (value.length > 2) {
			value = `${value.slice(0, 2)} / ${value.slice(2)}`;
		}

		if (value.length > 9) {
			value = `${value.slice(0, 9)}`;
		}

		formik.setFieldValue("expiredPeriod", value);
	};

	const formatCvvCode = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let value = e.target.value;
		if (value.length > 3) {
			value = `${value.slice(0, 3)}`;
		}
		formik.setFieldValue("cvv", value);
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
							dispatch(
								setDocumentationPreferences({
									currency,
									location: locationInput,
									documentationLanguage: chosenLanguage
								})
							);
						}}
						key={i}
					>
						{item.toponymName}
					</p>
				);
			});
		}
	};

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

	const toggleOptions = (section: string): void => {
		if (section === activeSection) {
			setActiveSection(null);
		} else {
			setActiveSection(section);
		}
	};

	const toggleLocationSection = (
		event: React.MouseEvent<HTMLDivElement>
	): void => {
		if (event.target === inputRef.current) return;
		toggleOptions("location");
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
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

	useEffect(() => {
		setLocationInput(location);
		setChosenLanguage(documentationLanguage);
		setActiveSection(null);
	}, []);

	useEffect(() => {
		activeSection === "location" && inputRef.current?.focus();
	}, [activeSection]);

	useEffect(() => {
		dispatch(
			setDocumentationPreferences({
				currency,
				location: locationInput,
				documentationLanguage: chosenLanguage
			})
		);
	}, [chosenLanguage]);

	return (
		<MainLayout title="Purchase" footer={false}>
			{!isPurchased && (
				<div className={styles.purchase}>
					<div className={styles.purchase__information}>
						<div className={styles.purchase__information_contact}>
							<h3>Contact Information</h3>
							<div
								className={
									styles.purchase__information_contact_wrapper
								}
							>
								<div
									className={
										styles.purchase__information_contact_single
									}
								>
									<p id={styles.contactTitle}>Email</p>
									<p id={styles.contactValue}>{email}</p>
								</div>
								<div
									className={
										styles.purchase__information_contact_single
									}
								>
									<div
										className={
											styles.purchase__information_contact_single_header
										}
									>
										<p>Documentation language</p>
										<div>
											<WarningIcon hasFilling={true} />
											<p id={styles.warning}>
												Your project&#39;s
												characteristics are tailored to
												the climate conditions of the
												selected building location!
											</p>
										</div>
									</div>

									<div
										className={`${
											styles.purchase__information_contact_single_wrapper
										} ${
											activeSection === "language"
												? styles.activeSection
												: ""
										}`}
									>
										<div
											onClick={() =>
												toggleOptions("language")
											}
											className={
												styles.purchase__information_contact_single_preview
											}
										>
											<div>
												<Image
													src={
														languagesData[
															chosenLanguage
														].src
													}
													alt="flag"
													width={21}
													height={15}
												/>
												<p>
													{
														languagesData[
															chosenLanguage
														].title
													}
												</p>
											</div>
											<TriangleIcon />
										</div>
										<div
											className={
												styles.purchase__information_contact_single_options
											}
										>
											{languageOptions()}
										</div>
									</div>
								</div>
								<div
									className={
										styles.purchase__information_contact_single
									}
								>
									<div
										className={
											styles.purchase__information_contact_single_header
										}
									>
										<p>Building location</p>
										<div>
											<WarningIcon hasFilling={true} />
											<p id={styles.warning}>
												Your project&#39;s
												characteristics are tailored to
												the climate conditions of the
												selected building location!
											</p>
										</div>
									</div>

									<div
										className={`${styles.purchase__information_contact_single_wrapper}`}
									>
										<div
											onClick={toggleLocationSection}
											className={
												styles.purchase__information_contact_single_preview
											}
										>
											<div
												className={
													styles.purchase__information_contact_single_preview_input
												}
											>
												{locationInput ||
												activeSection === "location" ? (
													<input
														type="text"
														placeholder="Start searching..."
														ref={inputRef}
														value={
															locationInput
																? locationInput
																: ""
														}
														onChange={
															handleInputChange
														}
													/>
												) : (
													<span>Choose region</span>
												)}
											</div>
											<TriangleIcon />
										</div>
										<div
											className={
												styles.purchase__information_contact_single_options
											}
										>
											{locationOptions()}
										</div>
									</div>
								</div>
							</div>
						</div>
						<form
							onSubmit={formik.handleSubmit}
							className={styles.purchase__information_payment}
						>
							<h3>Payment information</h3>
							<div
								className={
									styles.purchase__information_payment_wrapper
								}
							>
								<div
									className={
										styles.purchase__information_payment_single
									}
								>
									<label>Card number</label>
									<input
										id="cardNumber"
										name="cardNumber"
										className={
											formik.touched.cardNumber &&
											formik.errors.cardNumber
												? styles.inputError
												: ""
										}
										value={formik.values.cardNumber}
										onChange={formatCardNumber}
										onBlur={formik.handleBlur}
										type="text"
										placeholder="0000 - 0000 - 0000 - 0000"
									/>
								</div>
								<div
									className={
										styles.purchase__information_payment_single
									}
								>
									<label>Card name</label>
									<input
										id={styles.cardName}
										name="cardName"
										className={
											formik.touched.cardName &&
											formik.errors.cardName
												? styles.inputError
												: ""
										}
										value={formik.values.cardName}
										onChange={formik.handleChange}
										onBlur={handleBlurName}
										type="text"
										placeholder="NAME SURNAME"
									/>
								</div>
								<div
									className={
										styles.purchase__information_payment_single_wrapper
									}
								>
									<div
										className={
											styles.purchase__information_payment_single
										}
									>
										<label>Expired period</label>
										<input
											id="expiredPeriod"
											name="expiredPeriod"
											className={
												formik.touched.expiredPeriod &&
												formik.errors.expiredPeriod
													? styles.inputError
													: ""
											}
											value={formik.values.expiredPeriod}
											onChange={formatExpiredPeriod}
											onBlur={formik.handleBlur}
											type="text"
											placeholder="mm / yyyy"
										/>
									</div>
									<div
										className={
											styles.purchase__information_payment_single
										}
									>
										<label>CVV code</label>
										<input
											id="cvv"
											name="cvv"
											className={
												formik.touched.cvv &&
												formik.errors.cvv
													? styles.inputError
													: ""
											}
											value={formik.values.cvv}
											onChange={formatCvvCode}
											onBlur={formik.handleBlur}
											type="number"
											placeholder="CVV"
										/>
									</div>
								</div>
								<div
									className={
										styles.purchase__information_payment_submit
									}
								>
									<button
										disabled={
											!formik.isValid ||
											formik.isSubmitting
										}
										type="submit"
									>
										Finish purchase
									</button>
								</div>
							</div>
						</form>
					</div>
					<div className={styles.purchase__preview}>
						<div className={styles.purchase__preview_wrapper}>
							<section>
								<div
									className={
										styles.purchase__preview_information
									}
								>
									<div
										className={
											styles.purchase__preview_information_left
										}
									>
										<div
											className={
												styles.purchase__preview_information_left_title
											}
										>
											<h2>Project A</h2>
											<p>Short description</p>
										</div>
										<div
											className={
												styles.purchase__preview_information_left_preferences
											}
										>
											<div>
												<LanguageIcon />
												<p>
													{
														languagesData[
															documentationLanguage
														].title
													}
												</p>
											</div>
											<div>
												<LocationMarkerIcon />
												<p>{location}</p>
											</div>
										</div>
									</div>
									<Image
										src="/project61.jpg"
										alt="render"
										width={180}
										height={120}
									/>
								</div>
								<div
									className={
										styles.purchase__preview_preliminaryCost
									}
								>
									<p>Project cost</p>
									<p>3990 {currency}</p>
								</div>
							</section>
							<section className={styles.purchase__preview_cost}>
								<p>Total: 3900 {currency}</p>
								<p>Including 13% taxes</p>
							</section>
						</div>
					</div>
				</div>
			)}

			{isPurchased && (
				<div className={styles.thanks}>
					<ThanksWindow
						projectName={String(projectForPurchase)}
						callback={() => router.push("/dashboard")}
					/>
				</div>
			)}
		</MainLayout>
	);
};

export default Purchase;
