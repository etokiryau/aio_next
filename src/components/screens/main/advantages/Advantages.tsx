import { FC, useState } from "react";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";

import styles from "./advantages.module.scss";
import VideoWrapper from "@/components/videoWrapper/VideoWrapper";
import ShareIcon from "@/components/ui/_icons/ShareIcon";
import AdvatageCard from "@/components/ui/advantageCard/AdvantageCard";

const Advantages: FC = () => {
	const [designSection, setDesignSection] = useState(true);

	return (
		<MainLayout title="Advantages">
			<div className={styles.advantages}>
				<section className={styles.advantages__header}>
					<VideoWrapper src={["/mainVideo.mp4"]} />
				</section>
				<div className={styles.advantages__content}>
					<section className={styles.advantages__toggler}>
						<div
							onClick={() => setDesignSection(true)}
							className={
								designSection ? styles.activeSection : ""
							}
						>
							Design
						</div>
						<div
							onClick={() => setDesignSection(false)}
							className={
								!designSection ? styles.activeSection : ""
							}
						>
							Construction
						</div>
					</section>

					{designSection && (
						<>
							<section className={styles.advantages__block}>
								<h2>
									Design Small description why it is important
								</h2>
								<div
									className={styles.advantages__block_columns}
								>
									<div
										className={
											styles.advantages__block_columns_left
										}
									>
										<div
											className={
												styles.advantages__block_columns_left_icon
											}
										>
											<ShareIcon />
										</div>
										<div>
											<h3>Name name name</h3>
											<p>
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
											</p>
										</div>
									</div>
									<div
										className={
											styles.advantages__block_columns_right
										}
									></div>
								</div>
							</section>

							<section
								className={styles.advantages__advantageCards}
							>
								<AdvatageCard
									header="10+"
									content="specialists work on one project"
								/>
								<AdvatageCard
									header="10+"
									content="specialists work on one project"
								/>
								<AdvatageCard
									header="10+"
									content="specialists work on one project"
								/>
							</section>
						</>
					)}

					{!designSection && (
						<>
							<section className={styles.advantages__block}>
								<h2>
									Construction Small description why it is
									important
								</h2>
								<div
									className={styles.advantages__block_columns}
								>
									<div
										className={
											styles.advantages__block_columns_left
										}
									>
										<div
											className={
												styles.advantages__block_columns_left_icon
											}
										>
											<ShareIcon />
										</div>
										<div>
											<h3>Name name name</h3>
											<p>
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
											</p>
										</div>
									</div>
									<div
										className={
											styles.advantages__block_columns_right
										}
									></div>
								</div>

								<div
									className={styles.advantages__block_columns}
								>
									<div
										className={
											styles.advantages__block_columns_left
										}
									>
										<div
											className={
												styles.advantages__block_columns_left_icon
											}
										>
											<ShareIcon />
										</div>
										<div>
											<h3>Name name name</h3>
											<p>
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
												description description
											</p>
										</div>
									</div>
									<div
										className={
											styles.advantages__block_columns_right
										}
									></div>
								</div>
							</section>
						</>
					)}
				</div>
			</div>
		</MainLayout>
	);
};

export default Advantages;
