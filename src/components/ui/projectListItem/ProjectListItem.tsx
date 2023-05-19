import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import ShareIcon from "../ShareIcon";
import LikeIcon from "../LikeIcon";

import styles from "./projectListItem.module.scss";

interface IProjectListItem {
	info: {
		previewSrc: string;
		name: string;
		totalArea: number;
		floorNumber: number;
		houseDimensions: [number, number];
		cost: number;
		currency: string;
	};
	likeFill: boolean;
	handleLike: () => void;
	handleShare: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ProjectListItem: FC<IProjectListItem> = ({ info, likeFill,handleLike,handleShare }) => {
	const {
		name,
		totalArea,
		floorNumber,
		houseDimensions,
		previewSrc,
		cost,
		currency
	} = info;

	return (
		<div className={styles.listItem__wrapper}>
			<Link href={`/projects/${name}`} className={styles.listItem}>
				<div className={styles.listItem__name}>
					<Image
						src={previewSrc}
						alt="project"
						width={250}
						height={50}
					/>
					<p>{name}</p>
				</div>
				<div className={styles.listItem__indicators}>
					<p>{totalArea} m2</p>
					<p>
						{floorNumber} {floorNumber === 1 ? "floor" : "floors"}
					</p>
					<p>
						{houseDimensions[0]} m x {houseDimensions[1]} m
					</p>
					<p>
						{cost}
						{currency}
					</p>
				</div>
			</Link>
			<div className={styles.listItem__buttons}>
				<div onClick={handleLike}>
					<LikeIcon isActive={likeFill ? true : false} />
				</div>
				<div
					data-link={`/projects/${name}`}
					onClick={handleShare}
				>
					<ShareIcon />
				</div>
			</div>
		</div>
	);
};

export default ProjectListItem;
