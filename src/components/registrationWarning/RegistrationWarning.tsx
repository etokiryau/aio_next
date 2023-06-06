"use client";

import { FC } from "react";
import { useRouter } from "next/router";

import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import {
	selectUser,
	toggleWarning
} from "@/components/screens/signin/userSlice";
import WarningWindow from "../ui/warningWindow/WarningWindow";

import styles from "./registrationWarning.module.scss";

const RegistrationWarning: FC = () => {
	const dispatch = useTypedDispatch();
	const router = useRouter();
	const { isActiveWarning } = useTypedSelector(selectUser);

	return (
		<div
			className={`${styles.warning} ${
				isActiveWarning ? styles.active : ""
			}`}
		>
			<WarningWindow
				firstButtonCallback={() => router.push("/")}
				secondButtonCallback={() => dispatch(toggleWarning())}
				closeButtonCallback={() => dispatch(toggleWarning())}
				firstButtonTitle="Exit without savings"
				secondButtonTitle="Stay here"
				text="Exit without savings?"
			/>
			;
		</div>
	);
};

export default RegistrationWarning;
