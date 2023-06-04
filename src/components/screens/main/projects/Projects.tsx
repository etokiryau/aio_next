import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import {
	selectProjects,
	selectFilteredProjects,
	selectSortedProjects,
	toggleFavourite,
	togglePropertyFilter,
	resetFilters
} from "./projectsSlice";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import Triangle from "@/components/ui/TriangleIcon";
import Cross from "@/components/ui/CrossIcon";
import ProjectTile from "@/components/ui/projectTile/ProjectTile";
import ProjectListItem from "@/components/ui/projectListItem/ProjectListItem";
import { useCopyLinkToClipboard } from "@/hooks/useCopylinkToClipBoard";
import { currencyData } from "@/utillis/preferenceData";

import styles from "./projects.module.scss";
import { selectUserPreferences } from "@/components/userPreferences/userPreferencesSlice";

const Projects: NextPage = () => {
	const [listMode, setListMode] = useState(false);
	const [CopyingMessage, copyLinkToClipboard] = useCopyLinkToClipboard();

	const dispatch = useTypedDispatch();
	const { favourites, filters } = useTypedSelector(selectProjects);
	const { currency } = useTypedSelector(selectUserPreferences);
	const filteredProjects = useTypedSelector(selectFilteredProjects);
	const sortedProjects = useTypedSelector(selectSortedProjects);

	useEffect(() => {
		if (favourites.length > 0) return;
		const favouriteProjects: string[] = JSON.parse(
			localStorage.getItem("favouriteProjects") || "[]"
		);
		dispatch(toggleFavourite(favouriteProjects));
	}, []);

	const isFavourite = (id: string): boolean => {
		return favourites.some(item => item === id);
	};

	const projectsListContent: JSX.Element[] = sortedProjects.map(
		(item, i) => {
			const info = {
				name: item.name,
				previewSrc: item.previewSrc,
				totalArea: item.totalArea,
				floorNumber: item.floorNumber,
				houseDimensions: item.houseDimensions,
				cost: item.cost,
				currency: currencyData[currency]
			};

			return (
				<ProjectListItem
					key={i}
					info={info}
					handleShare={e => copyLinkToClipboard(e)}
					handleLike={() => dispatch(toggleFavourite(item.id))}
					likeFill={isFavourite(item.id)}
				/>
			);
		}
	);

	const projectsTilesContent: JSX.Element[] = filteredProjects.map(
		(item, i) => {
			const info = {
				name: item.name,
				previewSrc: item.previewSrc,
				totalArea: item.totalArea,
				floorNumber: item.floorNumber,
				houseDimensions: item.houseDimensions,
				cost: item.cost,
				currency: currencyData[currency]
			};

			return (
				<ProjectTile
					key={i}
					info={info}
					handleShare={e => copyLinkToClipboard(e)}
					handleLike={() => dispatch(toggleFavourite(item.id))}
					likeFill={isFavourite(item.id) ? true : false}
				/>
			);
		}
	);

	const handleScrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<MainLayout title="Projects">
			<div className={styles.projects}>
				<section className={styles.filters}>
					<div className={styles.filters__wrapper}>
						<div className={styles.filters__left}>

							<div className={`${styles.filters__left_button} 
								${filters.floorNumber
										? styles.activeButton
										: ""
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
										className={styles.filters__left_button_close}
										onClick={() => dispatch(togglePropertyFilter({floorNumber: null}))}
									>
										<Cross />
									</div>
								)}

								<div className={styles.filters__left_button_popup}>
									<p id={styles.filterOption} onClick={() => dispatch(togglePropertyFilter({floorNumber: 1}))}>
										1 floor
									</p>
									<p id={styles.filterOption} onClick={() => dispatch(togglePropertyFilter({floorNumber: 2}))}>
										2 floors
									</p>
									<p id={styles.filterOption} onClick={() => dispatch(togglePropertyFilter({floorNumber: 3}))}>
										3 floors
									</p>
								</div>
							</div>
							
							<div className={`${styles.filters__left_button} 
								${filters.totalArea ? styles.activeButton : ""
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
										className={styles.filters__left_button_close}
										onClick={() => dispatch(togglePropertyFilter({totalArea: null}))}
									>
										<Cross />
									</div>
								)}
								<div className={styles.filters__left_button_popup}>
									<div className={styles.filters__left_button_popup_input}>
										<p>minimum</p>
										<div>
											<input type="number" name="" id="" />
											<p>m2</p>
										</div>
									</div>
									
									<div className={styles.filters__left_button_popup_input}>
										<p>maximum</p>
										<div>
											<input type="number" name="" id="" />
											<p>m2</p>
										</div>
									</div>
									<button type="button">Apply</button>
								</div>
							</div>

							<div className={`${styles.filters__left_button} 
								${filters.roofType
										? styles.activeButton
										: ""
								}`}
							>
								<p>
									Roof
									{filters.roofType
										? `: ${filters.roofType}`
										: ""}
								</p>
								{!filters.roofType ? (
									<Triangle />
								) : (
									<div 
										className={styles.filters__left_button_close}
										onClick={() => dispatch(togglePropertyFilter({roofType: null}))}
									>
										<Cross />
									</div>
								)}

								<div className={styles.filters__left_button_popup}>
									<p id={styles.filterOption} onClick={() => dispatch(togglePropertyFilter({roofType: 'Flat'}))}>
										Flat
									</p>
									<p id={styles.filterOption} onClick={() => dispatch(togglePropertyFilter({roofType: 'Pitched'}))}>
										Pitched
									</p>
									<p id={styles.filterOption} onClick={() => dispatch(togglePropertyFilter({roofType: 'Mixed'}))}>
										Mixed
									</p>
								</div>
							</div>

							<div className={`${styles.filters__left_button} 
								${filters.cost ? styles.activeButton : ""}`}
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
										className={styles.filters__left_button_close}
										onClick={() => dispatch(togglePropertyFilter({cost: null}))}
									>
										<Cross />
									</div>
								)}
								<div className={styles.filters__left_button_popup}>
									<div className={styles.filters__left_button_popup_input}>
										<p>minimum</p>
										<div>
											<input type="number" name="" id="" />
											<p>$</p>
										</div>
									</div>
									
									<div className={styles.filters__left_button_popup_input}>
										<p>maximum</p>
										<div>
											<input type="number" name="" id="" />
											<p>$</p>
										</div>
									</div>
									<button type="button">Apply</button>
								</div>
							</div>
						</div>
						<div className={styles.filters__right}>
							<p onClick={() => dispatch(resetFilters())}>Reset filters</p>
							<div>Filter</div>
						</div>
					</div>
				</section>

				<section className={styles.secondaryFilter}>
					<p
						onClick={() => dispatch(togglePropertyFilter({ favourites: false }))}
						className={!filters.favourites ? styles.active : ""}
					>
						All projects
					</p>
					<p
						onClick={() => dispatch(togglePropertyFilter({ favourites: true }))}
						className={filters.favourites ? styles.active : ""}
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
				{CopyingMessage}
			</div>
		</MainLayout>
	);
};

export default Projects;