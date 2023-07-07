import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import {
	selectProjects,
	selectFilteredProjects,
	selectSortedProjects,
	toggleFavourite,
	togglePropertyFilter
} from "./projectsSlice";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import ProjectTile from "@/components/ui/projectTile/ProjectTile";
import ProjectListItem from "@/components/ui/projectListItem/ProjectListItem";
import { useCopyLinkToClipboard } from "@/hooks/useCopylinkToClipBoard";
import { currencyData } from "@/utillis/preferenceData";
import { selectUserPreferences } from "@/components/userPreferences/userPreferencesSlice";
import Toggler from "@/components/ui/toggler/Toggler";
import ProjectFilterSection from "@/components/projectFilterSection/ProjectFilterSection";

import styles from "./projects.module.scss";

const Projects: NextPage = () => {
	const [listMode, setListMode] = useState(false);
	const [CopyingMessage, copyLinkToClipboard] = useCopyLinkToClipboard('Link copied to the clipboard');

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

	const projectsListContent: JSX.Element[] = sortedProjects.map((item, i) => {
		const info = {
			name: item.name,
			preview: item.preview,
			area: item.area,
			floorNumber: item.floorNumber,
			houseDimensions: item.houseDimensions,
			reducedCost: item.reducedCost,
			cost: item.cost,
			currency: currencyData[currency]
		};

		return (
			<ProjectListItem
				key={i}
				info={info}
				handleShare={e => copyLinkToClipboard(e)}
				handleLike={() => dispatch(toggleFavourite(item._id))}
				likeFill={isFavourite(item._id)}
			/>
		);
	});

	const projectsTilesContent: JSX.Element[] = filteredProjects.map(
		(item, i) => {
			const info = {
				name: item.name,
				preview: item.preview,
				area: item.area,
				floorNumber: item.floorNumber,
				houseDimensions: item.houseDimensions,
				cost: item.cost,
				reducedCost: item.reducedCost,
				currency: currencyData[currency]
			};

			return (
				<ProjectTile
					key={i}
					info={info}
					handleShare={e => copyLinkToClipboard(e)}
					handleLike={() => dispatch(toggleFavourite(item._id))}
					likeFill={isFavourite(item._id) ? true : false}
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
					<ProjectFilterSection />
				</section>

				<section className={styles.secondaryFilter}>
					<p
						onClick={() =>
							dispatch(
								togglePropertyFilter({ favourites: false })
							)
						}
						className={!filters.favourites ? styles.active : ""}
					>
						All projects
					</p>
					<p
						onClick={() =>
							dispatch(togglePropertyFilter({ favourites: true }))
						}
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
						<Toggler
							theme="dark"
							isFirstButtonActive={listMode}
							firstButtonTitle="List"
							secondButtonTitle="Grid"
							firstButtonCallback={() => setListMode(true)}
							secondButtonCallback={() => setListMode(false)}
						/>
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