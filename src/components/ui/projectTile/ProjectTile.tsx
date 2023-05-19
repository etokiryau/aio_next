import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareIcon from "../ShareIcon";
import LikeIcon from "../LikeIcon";
import ArrowSmall from "@/components/ui/ArrowSmallIcon";

import styles from "./projectTile.module.scss";

interface IProjectTile {
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

const ProjectTile: FC<IProjectTile> = ({
	info,
	likeFill,
	handleLike,
	handleShare
}) => {
	const {
		name,
		totalArea,
		floorNumber,
		houseDimensions,
		previewSrc,
		cost,
		currency
	} = info;
	const baseUrl = "https://aio.house";

	return (
		<div className={styles.projectTile}>
			<Image src={previewSrc} alt="project" width={780} height={300} />
			<div className={styles.projectTile_buttons}>
				<div data-link={`/projects/${name}`} onClick={handleShare}>
					<ShareIcon />
				</div>

				<div onClick={handleLike}>
					<LikeIcon isActive={likeFill ? true : false} />
				</div>
			</div>
			<Link
				href={`/projects/${name}`}
				className={styles.projectTile_information}
			>
				<div className={styles.projectTile_information_up}>
					<div>
						<p>total area: {totalArea} m2</p>
						<p>floors: {floorNumber}</p>
						<p>
							{" "}
							dimensions: {houseDimensions[0]} m x{" "}
							{houseDimensions[1]} m
						</p>
					</div>
					<p id={styles.cost}>
						{cost}
						{currency}
					</p>
				</div>
				<div className={styles.projectTile_information_down}>
					<p>{name}</p>
					<ArrowSmall />
				</div>
			</Link>
		</div>
	);
};

export default ProjectTile;
