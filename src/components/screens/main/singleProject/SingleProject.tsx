import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { IProjectPageProps } from "@/interfaces/projects.interface";
import { useCopyLinkToClipboard } from "@/hooks/useCopylinkToClipBoard";
import { selectProjects, toggleFavourite } from "../projects/projectsSlice";

import ArrowLargeIcon from "@/components/ui/ArrowLargeIcon";
import LikeIcon from "@/components/ui/LikeIcon";
import ShareIcon from "@/components/ui/ShareIcon";
import EditIcon from "@/components/ui/EditIcon";
import CarouselSlider from "@/components/carouselSlider/CarouselSlider";
import TechnicalIndicators from "@/components/ui/technicalIndicators/TechnicalIndicators";
import SetupNavigator from "@/components/setupNavigator/SetupNavigator";
import AccordionItem from "@/components/ui/accordionItem/AccordionItem";

import styles from "./singleProject.module.scss";
import ModelTile from "@/components/modelTile/ModelTile";

const SingleProject: FC<IProjectPageProps> = ({ project }) => {
	const { id, name, cost, currency, totalArea, height, houseDimensions } = project;
	const router = useRouter();
	const dispatch = useTypedDispatch();
	const [copyingMessage, copyLinkToClipboard] = useCopyLinkToClipboard();
	const { favourites } = useTypedSelector(selectProjects);

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

	const goBack = (): void => {
		router.asPath === "/projects"
			? router.back()
			: router.push("/projects");
	};

	return (
		<MainLayout title={name} autodesk>
			<div className={styles.project}>
				<section className={styles.project__sticky}>
					<div onClick={goBack}>
						<ArrowLargeIcon />
						<p>Back to catalog</p>
					</div>
					
					<div className={styles.project__sticky_right}>
						<div onClick={() => dispatch(toggleFavourite(id))}>
							<LikeIcon isActive={isFavourite(id)} />
						</div>
						<div data-link={`/projects/${name}`} onClick={copyLinkToClipboard}>
							<ShareIcon />
						</div>
					</div>
				</section>
				
				<section className={styles.project__header}>
					<div className={styles.project__header_left}>
						<p>{name}</p>
						{/* <p>(SKU: 100.951.116)</p> */}
						<p>
							*You can try this project in AIO ecosystem for free
						</p>
					</div>
					<div className={styles.project__header_right}>
						<div className={styles.project__header_right_cost}>
							<p>
								{cost}
								{currency}
							</p>
							<p>free</p>
						</div>

						<div className={styles.project__header_right_explore}>
							Explore project
						</div>
						<div className={styles.project__header_right_customise}>
							<EditIcon />
							<p>Customise</p>
						</div>
					</div>
				</section>

				<section className={styles.project__renders}>
					<CarouselSlider size="large" />
				</section>

				<section className={styles.project__indicators}>
					<h2>Main technical indicators</h2>
					<TechnicalIndicators totalArea={totalArea} height={height} houseDimensions={houseDimensions} />
				</section>

				<section className={styles.project__models}>
					<h2>Try 3D model and Virtual tour</h2>
					<div className={styles.project__models_wrapper}>
						<div className={styles.project__models_single}>
							<ModelTile type="model" preview="/project23.jpg" src="dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dHN3aWdsenZ5dWJtbTZwaG04d2Ria2IzZHhqbmZrcnYtcHJvamVjdF9hL3Byb2plY3RfYV9mcmVlLm53ZA" />
						</div>
						<div className={styles.project__models_single}>
							<ModelTile type="tour" preview="/projectPreview.jpg" src="" />
						</div>
					</div>
				</section>

				<section className={styles.project__setup}>
					<h2>Set-up of the house</h2>
					<SetupNavigator />
				</section>

				<section className={styles.project__views}>
					<h2>Additional views</h2>
					<CarouselSlider size="small" />
				</section>

				<section className={styles.project__structure}>
					<h2>Project structure</h2>
					<div className={styles.project__structure_list}>
						<AccordionItem header="Architecture">
							<ul>
								<li>General information. Spaces area</li>
								<li>List of sheets</li>
								<li>Facades</li>
								<li>The color scheme of the facades</li>
								<li>Floor plans of buildings and structures with spaces explication</li>
								<li>Roofing plan</li>
								<li>Sections</li>
								<li>Window and door list</li>
								<li>Principal junctions</li>
								<li>Bill of quantities</li>
							</ul>
						</AccordionItem>

						<AccordionItem header="Structural engineering">
							<ul>
								<li>Load-bearing wall plan</li>
								<li>Plan of the foundation bottom reinforcement</li>
								<li>The plan of the foundation upper reinforcement</li>
								<li>Plans of the slabs lower reinforcement</li>
								<li>Plans of the slabs upper reinforcement</li>
								<li>Sections</li>
								<li>Reinforcement junctions sections</li>
								<li>Reinforcement of columns and walls</li>
								<li>List of details</li>
								<li>Bill of quantities</li>
							</ul>
						</AccordionItem>

						<AccordionItem header="Mechanical, electrical and plumbing">
							<div className={styles.container}>
								<div >
									<p>Power supply system:</p>
									<ul>
										<li>Schematic diagrams of power supply of power receivers from the main, additional and backup power supply sources</li>
										<li>Lightning plans</li>
										<li>Power supply network plan</li>
										<li>Socket placement layout</li>
										<li>Schematic single-line diagram of the power supply</li>
										<li>Bill of quantities</li>
									</ul>
								</div>

								<div >
									<p>Water supply system:</p>
									<ul>
										<li>General information</li>
										<li>Water supply plan</li>
										<li>Collector connection scheme</li>
										<li>Plumbing fixture connection scheme</li>
										<li>Water system isometry</li>
										<li>House water inlet scheme</li>
										<li>Bill of quantities</li>
									</ul>
								</div>

								<div >
									<p>Water disposal system:</p>
									<ul>
										<li>Sewerage systems plans</li>
										<li>Plumbing fixture connection scheme</li>
										<li>Sewerage system isometry</li>
										<li>Bill of quantities</li>
									</ul>
								</div>
							</div>
						</AccordionItem>

						<AccordionItem header="3D model">
							<ul>
								<li>Instructions for working with a 3D model</li>
								<li>3D model for all simulated sections exe file &quot;Enscape&quot; for a virtual tour of the object</li>
								<li>Link to the browser version of the project with the ability to view all the documentation, walk around the facility and clarify the volumes from any device from anywhere in the world</li>
							</ul>
						</AccordionItem>
					</div>
				</section>

				<section className={styles.project__services}>
					<h2>Additional services</h2>
					<h3>If you like the project but want to change it a little, we can customise it for you</h3>
					<Link href="/services">Learn more</Link>
				</section>

				{copyingMessage}
			</div>
		</MainLayout>
	);
};

export default SingleProject;