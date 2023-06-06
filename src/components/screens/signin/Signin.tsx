import { FC, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useLinkedIn } from "react-linkedin-login-oauth2";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import { toggleWarning, changeAuthMode, selectUser } from "./userSlice";
import { selectProjects } from "../main/projects/projectsSlice";

import { useAuth } from "@/hooks/useAuth";
import Meta from "@/components/seo/Meta";
import EmailConfirmation from "@/components/emailConfirmation/EmailConfirmation";
import ArrowLarge from "@/components/ui/_icons/ArrowLargeIcon";
import GoogleIcon from "@/components/ui/_icons/GoogleIcon";
import FacebookIcon from "@/components/ui/_icons/FacebookIcon";
import LinkedInIcon from "@/components/ui/_icons/LinkedInIcon";
import RegistrationWarning from "@/components/registrationWarning/RegistrationWarning";

import styles from "./signin.module.scss";

interface ISendingData {
	email: string;
	password: string;
	name?: string;
	confirmedPassword?: string;
}

const Signin: FC = () => {
	const { login, isConfirmed } = useAuth();
	const router = useRouter();
	const dispatch = useTypedDispatch();
	const { authMode } = useTypedSelector(selectUser);
	const [isConfirmingStep, setIsConfirmingStep] = useState(false);

	const { projectForPurchase } = useTypedSelector(selectProjects);

	const changeForm = (): void => {
		dispatch(changeAuthMode(authMode === "signin" ? "signup" : "signin"));
		setTimeout(() => {
			formik.validateForm();
		}, 100);
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		...(authMode === "signup" && {
			name: Yup.string().required("Name is required"),
			confirmedPassword: Yup.string()
				.oneOf([Yup.ref("password")], "Passwords do not match")
				.required("Please confirm your password")
		})
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			name: "",
			confirmedPassword: ""
		},
		validationSchema,
		validateOnMount: true,
		onSubmit: (values: ISendingData) => {
			handleSubmit(values);
		}
	});

	const handleSubmit = (values: ISendingData): void => {
		const data: ISendingData =
			authMode === "signin"
				? { email: values.email, password: values.password }
				: {
						email: values.email,
						password: values.password,
						name: values.name
				  };

		if (authMode === "signup") {
			login({
				name: "Micha",
				email: "michigan@kamishok.com",
				token: "sdf43",
				userId: 1,
				isConfirmed: false
			});
			!isConfirmed && setIsConfirmingStep(true);
		} else {
			login({
				name: "Kirill",
				email: "michigan@kamishok.com",
				token: "sdf43",
				userId: 1,
				isConfirmed: false
			});

			if (projectForPurchase) {
				router.push({
					pathname: "/purchase",
					query: { project: projectForPurchase }
				});
			} else {
				router.push("/dashboard");
			}
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
		e.preventDefault();
	};

	const googleLogin = useGoogleLogin({
		onSuccess: tokenResponse => console.log(tokenResponse)
	});

	const { linkedInLogin } = useLinkedIn({
		clientId: "77rgjbnvxnaj4w",
		scope: "r_emailaddress r_liteprofile",
		redirectUri: `${
			typeof window === "object" && window.location.origin
		}/linkedin`,
		onSuccess: code => {
			console.log(code);
		},
		onError: error => {
			console.log(error);
		}
	});

	const goBack = (): void => {
		if (isConfirmingStep) {
			dispatch(toggleWarning());
			return;
		}

		router.back();
	};

	return (
		<Meta title="Sign in">
			<div className={styles.signin}>
				<div onClick={goBack} className={styles.signin__back}>
					<div>
						<ArrowLarge />
						{!projectForPurchase ? (
							<p>Back to main site</p>
						) : (
							<p>Back to project page</p>
						)}
					</div>
				</div>
				{!isConfirmingStep && (
					<div className={styles.signin__wrapper}>
						<div className={styles.signin__header}>
							<div
								className={
									authMode === "signup"
										? styles.bottomHeader
										: ""
								}
							>
								<h1>Sign in</h1>
								<h2>Sign up</h2>
							</div>
						</div>
						<form onSubmit={formik.handleSubmit}>
							<div className={styles.signin__inputs}>
								<div
									className={
										authMode === "signin"
											? styles.hidden
											: ""
									}
								>
									<input
										value={formik.values.name}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className={
											formik.touched.name &&
											formik.errors.name
												? styles.inputError
												: ""
										}
										id="name"
										name="name"
										placeholder="Name"
										type="text"
									/>
									{formik.errors.name &&
										formik.touched.name && (
											<p className={styles.errorMessage}>
												{formik.errors.name}
											</p>
										)}
								</div>
								<div>
									<input
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className={
											formik.touched.email &&
											formik.errors.email
												? styles.inputError
												: ""
										}
										type="email"
										id="email"
										name="email"
										placeholder="Email"
									/>
									{formik.errors.email &&
										formik.touched.email && (
											<p className={styles.errorMessage}>
												{formik.errors.email}
											</p>
										)}
								</div>

								<div>
									<input
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										className={
											formik.touched.password &&
											formik.errors.password
												? styles.inputError
												: ""
										}
										type="password"
										id="password"
										name="password"
										placeholder="Password"
									/>
									{formik.errors.password &&
										formik.touched.password && (
											<p className={styles.errorMessage}>
												{formik.errors.password}
											</p>
										)}
								</div>

								<div
									className={
										authMode === "signin"
											? styles.hidden
											: ""
									}
								>
									<input
										value={formik.values.confirmedPassword}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										onPaste={handlePaste}
										className={
											formik.touched.confirmedPassword &&
											formik.errors.confirmedPassword
												? styles.inputError
												: ""
										}
										type="password"
										id="confirmedPassword"
										name="confirmedPassword"
										placeholder="Confirm password"
									/>
									{formik.errors.confirmedPassword &&
										formik.touched.confirmedPassword && (
											<p className={styles.errorMessage}>
												{
													formik.errors
														.confirmedPassword
												}
											</p>
										)}
								</div>
							</div>
							<div
								className={`${styles.signin__forgot} ${
									authMode === "signup" ? styles.hidden : ""
								}`}
							>
								<p>Forgot password?</p>
							</div>
							<button
								className={styles.signin__submit}
								type="submit"
								disabled={
									!formik.isValid || formik.isSubmitting
								}
							>
								Submit
							</button>
						</form>
						<div className={styles.signin__separation} />
						<div className={styles.signin__outside}>
							<div
								onClick={() => googleLogin()}
								className={styles.signin__outside_single}
							>
								<GoogleIcon />
								<p>Continue with Google</p>
							</div>
							{/* <FacebookLogin
                            appId="928145885184315"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={async (credentialResponse) => {
                                console.log(credentialResponse)
                            }}
                            render={renderProps => (
                                <div onClick={renderProps.onClick} className={styles.signin__outside_single}>
                                    <FacebookIcon width={10} height={20} />
                                    <p>Continue with Facebook</p>
                                </div>
                            )}
                        /> */}
							<div
								onClick={() => linkedInLogin()}
								className={styles.signin__outside_single}
							>
								<LinkedInIcon width={18} height={18} />
								<p>Continue with LinkedIn</p>
							</div>
						</div>
					</div>
				)}
				{!isConfirmingStep && (
					<div className={styles.signin__underneath}>
						<div
							className={
								authMode === "signup"
									? styles.bottomUnderneath
									: ""
							}
						>
							<p onClick={changeForm}>
								Don’t have an account? <span>Sign up</span>
							</p>
							<p onClick={changeForm}>
								Already have account? <span>Sign in</span>
							</p>
						</div>
					</div>
				)}

				{isConfirmingStep && (
					<EmailConfirmation email={formik.values.email} />
				)}
			</div>

			<RegistrationWarning />
		</Meta>
	);
};

export default Signin;
