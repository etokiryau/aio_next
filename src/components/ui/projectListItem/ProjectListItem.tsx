import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import ShareIcon from "../_icons/ShareIcon";
import LikeIcon from "../_icons/LikeIcon";

import styles from "./projectListItem.module.scss";

interface IProjectListItem {
	info: {
		preview: string;
		name: string;
		area: number;
		floorNumber: number;
		houseDimensions: [number, number];
		cost: number;
		reducedCost: number | null;
		currency: string;
	};
	likeFill: boolean;
	handleLike: () => void;
	handleShare: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ProjectListItem: FC<IProjectListItem> = ({
	info,
	likeFill,
	handleLike,
	handleShare
}) => {
	const {
		name,
		area,
		floorNumber,
		houseDimensions,
		preview,
		cost,
		reducedCost,
		currency
	} = info;

	return (
		<div className={styles.listItem__wrapper}>
			<Link href={`/projects/${name}`} className={styles.listItem}>
				<div className={styles.listItem__name}>
					<Image
						src={preview}
						alt="project"
						width={250}
						height={50}
					/>
					<p id={styles.name}>{name}</p>
					{reducedCost === 0 && (
						<div className={styles.listItem__name_freeLabel}>
							<p>Test</p>
						</div>
					)}
				</div>
				<div className={styles.listItem__indicators}>
					<p>{area} m2</p>
					<p>
						{floorNumber} {floorNumber === 1 ? "floor" : "floors"}
					</p>
					<p>
						{houseDimensions[0]} m x {houseDimensions[1]} m
					</p>
					{reducedCost !== 0 && (
						<p>
							{reducedCost ? reducedCost : cost}
							{currency}
						</p>
					)}
					{reducedCost === 0 && <p>free</p>}
				</div>
			</Link>
			<div className={styles.listItem__buttons}>
				<div onClick={handleLike}>
					<LikeIcon isActive={likeFill ? true : false} />
				</div>
				<div data-link={`/projects/${name}`} onClick={handleShare}>
					<ShareIcon />
				</div>
			</div>
		</div>
	);
};

export default ProjectListItem;
