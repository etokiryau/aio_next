import { useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import {
	selectProjects,
	selectFilteredProjects,
	toggleFavourite,
	togglePropertyFilter
} from "./projectsSlice";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Triangle from "@/components/ui/triangleIcon/TriangleIcon";
import Cross from "@/components/ui/crossIcon/CrossIcon";

import styles from "./projects.module.scss";
import ShareIcon from "@/components/ui/shareIcon/ShareIcon";
import CopyingMessage from "@/components/ui/copyingMessage/CopyingMessage";

const Projects: NextPage = () => {
	const [listMode, setListMode] = useState(true);
	const [isVisibleCopyingMessage, setIsVisibleCopyingMessage] = useState(false);
	const dispatch = useTypedDispatch();
	const baseUrl = 'https://aio.house';

	const { favourites, filters } = useTypedSelector(selectProjects);
	const filteredProjects = useTypedSelector(selectFilteredProjects);

	const isFavourite = (id: string): boolean => {
		return favourites.some(item => item === id);
	};

	const copyLinkToClipboard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		let target = e.target as HTMLElement;
		if (target && target.tagName !== 'svg') {
			target = target.parentElement as HTMLElement;
		}
		if (!target) {
			console.error('Could not find parent svg element');
			return;
		}
  		const svg = target.tagName === 'svg' ? target : target.querySelector('svg') as SVGElement;
		const parentDiv = svg.parentNode as HTMLElement;
		const link = String(parentDiv.getAttribute('data-link')).replace(' ', '%20');
		navigator.clipboard.writeText(link).then(() => {
			setIsVisibleCopyingMessage(true);
			setTimeout(() => setIsVisibleCopyingMessage(false), 2000);
		}).catch((error) => {
			console.error('Failed to copy link: ', error);
		});
	};

	const projectsListContent = filteredProjects.map((item, i) => {
		return (
			<div key={i} className={styles.projectsList__list_single_wrapper}>
				<Link
					href={`/projects/${item.name}`}
					className={styles.projectsList__list_single}
				>
					<div className={styles.projectsList__list_single_name}>
						<Image
							src={item.previewSrc}
							alt="project"
							width={250}
							height={50}
						/>
						<p>{item.name}</p>
					</div>
					<div className={styles.projectsList__list_single_indicators}>
						<p>{item.totalArea} m2</p>
						<p>{item.floorNumber} {item.floorNumber === 1 ? "floor" : "floors"}</p>
						<p>{item.houseDimensions[0]} m x {item.houseDimensions[1]} m
						</p>
						<p>
							{item.cost}
							{item.currency}
						</p>
					</div>
				</Link>
				<div className={styles.projectsList__list_single_buttons}>
					<svg
						onClick={() => dispatch(toggleFavourite(item.id))}
						width="24"
						height="20"
						viewBox="0 0 24 20"
						fill={isFavourite(item.id) ? "" : "none"}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.0066 18.5L3.09482 10.6696C-1.74854 5.97141 5.3712 -3.04918 12.0066 4.24873C18.642 -3.04918 25.7295 6.00273 20.9184 10.6696L12.0066 18.5Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>

					<div data-link={`${baseUrl}/projects/${item.name}`} onClick={copyLinkToClipboard}>
						<ShareIcon />
					</div>
				</div>
			</div>
		);
	});

	const projectsTilesContent = filteredProjects.map((item, i) => {
		return (
			<div key={i} className={styles.projectsList__tiles_single}>
				<Image
					src={item.previewSrc}
					alt="project"
					width={780}
					height={300}
				/>
				<div className={styles.projectsList__tiles_single_buttons}>
					<div data-link={`${baseUrl}/projects/${item.name}`} onClick={copyLinkToClipboard}>
						<ShareIcon width="42" height="38" />
					</div>
					<svg
						onClick={() => dispatch(toggleFavourite(item.id))}
						width="44"
						height="40"
						viewBox="0 0 24 20"
						fill={isFavourite(item.id) ? "" : "none"}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.0066 18.5L3.09482 10.6696C-1.74854 5.97141 5.3712 -3.04918 12.0066 4.24873C18.642 -3.04918 25.7295 6.00273 20.9184 10.6696L12.0066 18.5Z"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<Link
					href={`/projects/${item.name}`}
					className={styles.projectsList__tiles_single_information}
				>
					<div
						className={
							styles.projectsList__tiles_single_information_up
						}
					>
						<div>
							<p>total area: {item.totalArea} m2</p>
							<p>floors: {item.floorNumber}</p>
							<p>
								dimensions: {item.houseDimensions[0]} m x{" "}
								{item.houseDimensions[1]} m
							</p>
						</div>
						<p id={styles.cost}>
							{item.cost}
							{item.currency}
						</p>
					</div>
					<div
						className={
							styles.projectsList__tiles_single_information_down
						}
					>
						<p>{item.name}</p>
						<Image
							src="/arrow.svg"
							alt="open"
							width={15}
							height={20}
						/>
					</div>
				</Link>
			</div>
		);
	});

	const handleScrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<MainLayout title="Projects">
			<div className={styles.projects}>
				<div className={styles.mask}></div>
				<section className={styles.filters}>
					<div className={styles.filters__left}>
						<div
							className={`${styles.filters__left_button} ${
								filters.floorNumber ? styles.activeButton : ""
							}`}
						>
							<p>
								Floors
								{filters.floorNumber
									? `: ${filters.floorNumber}`
									: ""}
							</p>
							{!filters.floorNumber ? (
								<Triangle />
							) : (
								<div
									className={
										styles.filters__left_button_close
									}
									onClick={() =>
										dispatch(
											togglePropertyFilter({
												floorNumber: null
											})
										)
									}
								>
									<Cross />
								</div>
							)}

							<div className={styles.filters__left_button_popup}>
								<p
									onClick={() =>
										dispatch(
											togglePropertyFilter({
												floorNumber: 1
											})
										)
									}
								>
									1 floor
								</p>
								<p
									onClick={() =>
										dispatch(
											togglePropertyFilter({
												floorNumber: 2
											})
										)
									}
								>
									2 floors
								</p>
								<p
									onClick={() =>
										dispatch(
											togglePropertyFilter({
												floorNumber: 3
											})
										)
									}
								>
									3 floors
								</p>
							</div>
						</div>
						<div
							className={`${styles.filters__left_button} ${
								filters.totalArea ? styles.activeButton : ""
							}`}
						>
							<p>
								Area
								{filters.totalArea
									? `: ${filters.totalArea}`
									: ""}
							</p>
							{!filters.totalArea ? (
								<Triangle />
							) : (
								<div
									className={
										styles.filters__left_button_close
									}
									onClick={() =>
										dispatch(
											togglePropertyFilter({
												totalArea: null
											})
										)
									}
								>
									<Cross />
								</div>
							)}
						</div>
						<div
							className={`${styles.filters__left_button} ${
								filters.cost ? styles.activeButton : ""
							}`}
						>
							<p>
								Cost
								{filters.cost
									? `: ${filters.cost[0]} - ${filters.cost[1]}$`
									: ""}
							</p>
							{!filters.cost ? (
								<Triangle />
							) : (
								<div
									className={
										styles.filters__left_button_close
									}
									onClick={() =>
										dispatch(
											togglePropertyFilter({ cost: null })
										)
									}
								>
									<Cross />
								</div>
							)}
						</div>
					</div>
					<div className={styles.filters__right}>
						<p>Filter</p>
					</div>
				</section>

				<section className={styles.secondaryFilter}>
					<p
						onClick={() =>
							dispatch(
								togglePropertyFilter({ favourites: false })
							)
						}
						className={
							!filters.favourites
								? styles.secondaryFilter__active
								: ""
						}
					>
						All projects
					</p>
					<p
						onClick={() =>
							dispatch(togglePropertyFilter({ favourites: true }))
						}
						className={
							filters.favourites
								? styles.secondaryFilter__active
								: ""
						}
					>
						Saved
					</p>
				</section>

				<section className={styles.projectsList}>
					{listMode ? (
						<>
							{filteredProjects.length === 0 &&
							filters.favourites ? null : (
								<div className={styles.projectsList__header}>
									<div>
										<p id={styles.headerName}>Name</p>
										<div>
											<p>Total area</p>
											<p>Floors</p>
											<p>Dimensions</p>
											<p>Cost</p>
										</div>
									</div>
									<p id={styles.fakep}></p>
								</div>
							)}

							<div className={styles.projectsList__list}>
								{projectsListContent}
							</div>
						</>
					) : (
						<div className={styles.projectsList__tiles}>
							{projectsTilesContent}
						</div>
					)}

					{filters.favourites && filteredProjects.length === 0 ? (
						<div>No saved projects</div>
					) : null}

					<div className={styles.projectsList__sticky}>
						<div className={styles.projectsList__sticky_toggler}>
							<p
								onClick={() => setListMode(true)}
								className={listMode ? styles.activeMode : ""}
							>
								List
							</p>
							<p
								onClick={() => setListMode(false)}
								className={!listMode ? styles.activeMode : ""}
							>
								Grid
							</p>
						</div>
						<div
							onClick={handleScrollToTop}
							className={styles.projectsList__sticky_toTop}
						>
							<div />
						</div>
					</div>
				</section>
				<CopyingMessage isActive={isVisibleCopyingMessage} />
			</div>
		</MainLayout>
	);
};

export default Projects;