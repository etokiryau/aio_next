import { FC, useState, useEffect, useRef } from "react";

import { useAutodeskPlatformService } from "@/services/AutodeskPlatformService";
import CrossIcon from "../ui/_icons/CrossIcon";

import styles from "./modelTile.module.scss";

interface IProps {
	type: "model" | "tour";
	preview: string;
	src: string;
}

const ModelTile: FC<IProps> = ({ type, preview, src }) => {
	const [popup, setPopup] = useState(false);
	const modelContainerRef = useRef<HTMLDivElement>(null);

	// const { renderViewer } = useAutodeskPlatformService();

	useEffect(() => {
		document.body.style.overflow = popup ? "hidden" : "";
	}, [popup]);

	// useEffect(() => {
	//     if (type === 'model' && popup) {
	//         renderViewer(src, containerRef);
	//     }
	// }, [popup, src, type, renderViewer]);

	return (
		<>
			<div
				className={styles.model}
				style={{ backgroundImage: `url(${preview})` }}
			>
				<div
					onClick={() => setPopup(true)}
					className={styles.model__wrapper}
				>
					<div className={styles.model__button}>
						{type === "model" ? "3D model" : "Virtual tour"}
					</div>
				</div>
			</div>
			<div
				className={`${styles.model__popup} ${
					popup ? styles.activePopup : ""
				}`}
			>
				<div className={styles.model__popup_content}>
					<div
						className={styles.model__popup_content_close}
						onClick={() => setPopup(false)}
					>
						<CrossIcon width={16} height={16} />
					</div>
					{type === "tour" && <iframe src={src} />}
					{type === "model" && (
						<div
							ref={modelContainerRef}
							className={styles.model__popup_content_model}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default ModelTile;
