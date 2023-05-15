import { FC, useState } from "react";

import styles from "./carouselSlider.module.scss";
import Image from "next/image";
import ArrowSmall from "../ui/ArrowSmallIcon";

interface ISlideStyle {
	left: string;
	transform: string;
	opacity: string;
	visibility?: "visible" | "hidden";
}

const CarouselSlider: FC = () => {
	const slidesData = [
		"/projectPreview.jpg",
		"/project23.jpg",
		"/project43.jpg",
		"/project61.jpg",
		"/project91.jpg"
	];
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState("+");

	const slideNumber = slidesData.length;

	const setPosition = (order: number, currentSlide: number): ISlideStyle => {
		if (order === currentSlide)
			return { left: "50%", transform: "translateX(-50%)", opacity: "1" };
		else if (
			order === currentSlide - 1 ||
			(order === slideNumber - 1 && currentSlide === 0)
		)
			return { left: "-52.5%", transform: "none", opacity: ".3" };
		else if (order < currentSlide - 1 && currentSlide < slideNumber - 1)
			return {
				left: "-52.5%",
				transform: `translateX(${direction}200%)`,
				opacity: "0",
				visibility: "hidden"
			};
		else if (
			order === currentSlide + 1 ||
			(order === 0 && currentSlide === slideNumber - 1)
		)
			return { left: "90%", transform: "none", opacity: ".3" };
		else
			return {
				left: "90%",
				transform: `translateX(${direction}200%)`,
				opacity: "0",
				visibility: "hidden"
			};
	};

	const changeSlide = (direction: string): void => {
		switch (direction) {
			case "next":
				setDirection("+");
				setCurrentSlide(prev => {
					return prev === slideNumber - 1 ? 0 : prev + 1;
				});
				break;
			case "previous":
				setDirection("-");
				setCurrentSlide(prev => {
					return prev === 0 ? slideNumber - 1 : prev - 1;
				});
				break;
		}
	};

	const slides = slidesData.map((item, i) => {
		const slideStyle = setPosition(i, currentSlide);
		return (
			<div
				key={i}
				style={slideStyle}
				className={`${styles.slider__slide} ${
					currentSlide === i ? styles.active : styles.inActive
				}`}
			>
				<Image src={item} width={900} height={280} alt="render" />
			</div>
		);
	});

	// const slides = slidesData.map((item, i) => {
	//     const slideClassName = setPosition(i, currentSlide);
	//     return (
	//       <div
	//         key={i}
	//         className={`${styles.slider__slide} ${slideClassName}`}
	//       >
	//         <Image src={item} width={900} height={280} alt="render" />
	//       </div>
	//     );
	//   });

	return (
		<div className={styles.slider}>
			{slides}
			<div
				className={styles.slider__rightChange}
				onClick={() => changeSlide("next")}
			>
				<ArrowSmall />
			</div>

			<div
				className={styles.slider__leftChange}
				onClick={() => changeSlide("previous")}
			>
				<ArrowSmall />
			</div>
		</div>
	);
};

export default CarouselSlider;
