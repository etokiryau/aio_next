import { FC } from "react";
import Image from "next/image";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";

import {
	selectUserPreferences,
	openPopup
} from "@/components/userPreferences/userPreferencesSlice";
import { languagesData } from "@/utillis/preferenceData";
import LocationMarkerIcon from "../../../ui/LocationMarkerIcon";

import styles from "./headerPreferences.module.scss";

const HeaderPreferences: FC = () => {
	const dispatch = useTypedDispatch();

	const { language, currency } = useTypedSelector(selectUserPreferences);

	return (
		<div
			onClick={() => dispatch(openPopup('common'))}
			className={styles.preferences}
		>
			<div className={styles.preferences__language}>
				<Image
					src={languagesData[language].src}
					alt={languagesData[language].alt}
					width={21}
					height={15}
				/>
				<p>{language}</p>
			</div>
			<p>{currency}</p>
			<LocationMarkerIcon />
		</div>
	);
};

export default HeaderPreferences;
