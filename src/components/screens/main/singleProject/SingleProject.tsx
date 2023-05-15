import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { IProjectPageProps } from "@/interfaces/projects.interface";
import { useCopyLinkToClipboard } from "@/hooks/useCopylinkToClipBoard";
import { selectProjects, toggleFavourite } from "../projects/projectsSlice";

import ArrowLarge from "@/components/ui/ArrowLargeIcon";
import LikeIcon from "@/components/ui/LikeIcon";
import ShareIcon from "@/components/ui/ShareIcon";
import EditIcon from "@/components/ui/EditIcon";
import CarouselSlider from "@/components/carouselSlider/CarouselSlider";
import TechnicalIndicators from "@/components/ui/technicalIndicators/TechnicalIndicators";
import SetupNavigator from "@/components/setupNavigator/SetupNavigator";

import styles from "./singleProject.module.scss";

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
		<MainLayout title={name}>
			<div className={styles.project}>
				<section className={styles.project__sticky}>
					<div onClick={goBack}>
						<ArrowLarge />
						<p>Back to catalog</p>
					</div>
					<div className={styles.project__sticky_right}>
						<div onClick={() => dispatch(toggleFavourite(id))}>
							<LikeIcon fill={isFavourite(id)} />
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
					<CarouselSlider />
				</section>

				<section className={styles.project__indicators}>
					<h2>Main technical indicators</h2>
					<TechnicalIndicators totalArea={totalArea} height={height} houseDimensions={houseDimensions} />
				</section>

				<section className={styles.project__models}>
					<h2>Try 3D model and Virtual tour</h2>
					<div className={styles.project__models_wrapper}>
						<div className={styles.project__models_single}>

						</div>
						<div className={styles.project__models_single}>
							
						</div>
					</div>
				</section>

				<section className={styles.project__setup}>
					<h2>Try 3D model and Virtual tour</h2>
					<SetupNavigator />
				</section>

				{copyingMessage}
			</div>
		</MainLayout>
	);
};

export default SingleProject;