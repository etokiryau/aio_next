import { FC, useState, useRef,  useEffect } from "react";
import Image from "next/image";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";

import { languagesData } from "@/utillis/languagesData";
import { selectUserPreferences, setLanguage, togglePopup } from "./userPreferencesSlice";
import Triangle from "@/components/ui/TriangleIcon";
import CrossIcon from "../ui/CrossIcon";

import styles from "./userPreferences.module.scss";

interface ISections {
    language: boolean,
    location: boolean,
    currency: boolean
};

const UserPreferences: FC = () => {
    const [sections, setSections] = useState<ISections>({language: false, location: false, currency: false});
    const popupRef = useRef<HTMLDivElement | null>(null);
    const { isOpen, language, currency, location } = useTypedSelector(selectUserPreferences);
    const dispatch = useTypedDispatch();

    const popupContent = (): JSX.Element[] => {
		const result: JSX.Element[] = [];

		for (let key in languagesData) {
			if (key === language) continue;

			const element: JSX.Element = (
				<div
					key={languagesData[key].alt}
					onClick={() => dispatch(setLanguage(key))}
				>
					<Image
						src={languagesData[key].src}
						alt={languagesData[key].alt}
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

    const toggleChange = (section: keyof ISections): void => {
        const newValue = !sections[section];
        setSections({...sections, [section]: newValue})
    };

    const closePopup = (event: React.MouseEvent<HTMLDivElement>): void => {
		event?.target === popupRef.current && dispatch(togglePopup());
	};

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }, [isOpen]);

    return (
        <div ref={popupRef} onClick={closePopup} className={`${styles.preferences__wrapper} ${isOpen ? styles.activePopup : ''}`}>
            <div className={`${styles.preferences}`}>
                <div className={styles.preferences__header}>
                    <p>Regional settings</p>
                    <div onClick={() => dispatch( togglePopup())}>
                        <CrossIcon />
                    </div>
                </div>
                <div className={styles.preferences__preferences}>
                    <div className={styles.preferences__preferences_single}>
                        <p>Language</p>
                        <div onClick={() => toggleChange('language')} className={styles.preferences__preferences_single_header}>
                            <div>
                                <Image
                                    src={languagesData[language].src}
                                    alt="flag"
                                    width={21}
                                    height={15}
                                />
                                <p>{languagesData[language].title}</p>
                            </div>
                            <Triangle />
                        </div>
                        <div className={`${styles.preferences__preferences_single_change} ${sections.language ? styles.activeChange: ''}`}>
                            {popupContent()}
                        </div>
                    </div>
                    <div className={styles.preferences__preferences_single}>
                        <p>Region (city)</p>
                        <div className={styles.preferences__preferences_single_header}>
                            <div>
                                <p>{location ? location : 'Choose region'}</p>
                            </div>
                            <Triangle />
                        </div>
                    </div>
                    <div className={styles.preferences__preferences_single}>
                        <p>Currency</p>
                        <div className={styles.preferences__preferences_single_header}>
                            <div>
                                <p>{currency}</p>
                            </div>
                            <Triangle />
                        </div>
                    </div>
                </div>
                <div className={styles.preferences__buttons}>
                    <div className={styles.preferences__buttons_single}>Save</div>
                </div>
            </div>
        </div>
    )
}

export default UserPreferences;