import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareIcon from "../_icons/ShareIcon";
import LikeIcon from "../_icons/LikeIcon";
import ArrowSmall from "@/components/ui/_icons/ArrowSmallIcon";

import styles from "./projectTile.module.scss";

interface IProjectTile {
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

const ProjectTile: FC<IProjectTile> = ({
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
		<div className={styles.projectTile}>
			<Image src={preview} alt="project" width={780} height={300} />

			{reducedCost === 0 && (
				<div className={styles.projectTile__freeLabel}>
					<p>Test</p>
				</div>
			)}

			<div className={styles.projectTile__buttons}>
				<div data-link={`/projects/${name}`} onClick={handleShare}>
					<ShareIcon />
				</div>

				<div onClick={handleLike}>
					<LikeIcon isActive={likeFill ? true : false} />
				</div>
			</div>

			<Link
				href={`/projects/${name}`}
				className={styles.projectTile__information}
			>
				<div className={styles.projectTile__information_up}>
					<div>
						<p>total area: {area} m2</p>
						<p>floors: {floorNumber}</p>
						<p>
							{" "}
							dimensions: {houseDimensions[0]} m x{" "}
							{houseDimensions[1]} m
						</p>
					</div>
					{reducedCost !== 0 && (
						<p id={styles.cost}>
							{reducedCost ? reducedCost : cost}
							{currency}
						</p>
					)}
					{reducedCost === 0 && <p id={styles.cost}>free</p>}
				</div>
				<div className={styles.projectTile__information_down}>
					<p>{name}</p>
					<ArrowSmall />
				</div>
			</Link>
		</div>
	);
};

export default ProjectTile;