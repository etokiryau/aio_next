import { FC } from "react";
import { useRouter } from "next/router";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { IProjectProps } from "@/interfaces/projectProps.interface";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";

import styles from "./singleProject.module.scss";
import ArrowLarge from "@/components/ui/ArrowLarge";
import LikeIcon from "@/components/ui/LikeIcon";
import ShareIcon from "@/components/ui/ShareIcon";
import EditIcon from "@/components/ui/EditIcon";
import CarouselSlider from "@/components/carouselSlider/CarouselSlider";

const SingleProject: FC<IProjectProps> = ({ project }) => {
	const { name, cost, currency } = project;
	const router = useRouter();

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
						<div>
							<LikeIcon fill={true} />
						</div>
						<div>
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
			</div>
		</MainLayout>
	);
};

export default SingleProject;
