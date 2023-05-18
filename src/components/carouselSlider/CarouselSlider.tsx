import { FC, useState } from "react";

import styles from "./carouselSlider.module.scss";
import Image from "next/image";
import ArrowSmall from "../ui/ArrowSmallIcon";

interface ISliderProps {
	slides?: string[],
	size: 'large' | 'small'
}
interface ISlideStyle {
	left: string;
	transform: string;
	opacity?: string;
	visibility?: "visible" | "hidden";
}

const CarouselSlider: FC<ISliderProps> = ({ size }) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [direction, setDirection] = useState("+");
	const [mousePositionStartX, setMousePositionStartX] = useState<number | null>(null);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
		setMousePositionStartX(event.clientX);
	};

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
		setMousePositionStartX(event.touches[0].clientX);
	};
	
	const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
		if (mousePositionStartX !== null) {
			const endX = event.clientX;
			const deltaX = endX - mousePositionStartX;
			if (deltaX > 0) changeSlide('previous')
			if (deltaX < 0) changeSlide('next');
		}
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>): void => {
		if (mousePositionStartX !== null) {
			const endX = event.changedTouches[0].clientX;
			const deltaX = endX - mousePositionStartX;
			if (deltaX > 0) changeSlide('previous')
			if (deltaX < 0)changeSlide('next');
		}
	};

	const slidesData = [
		"/projectPreview.jpg",
		"/project23.jpg",
		"/project43.jpg",
		"/project61.jpg",
		"/project91.jpg",
		"/project61.jpg",
		// "/project91.jpg"
	];

	const slideNumber = slidesData.length;

	const setLargePosition = (order: number, currentSlide: number): ISlideStyle => {
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
				transform: `translateX(${direction}200%) translateY(-900%)`,
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
				transform: `translateX(${direction}200%) translateY(-900%)`,
				opacity: "0",
				visibility: "hidden"
			};
	};

	const setSmallPosition = (order: number, currentSlide: number): ISlideStyle => {
		if (order === currentSlide)
			return { left: "50%", transform: "translateX(-50%)"};
		else if (order === currentSlide - 1  || currentSlide === 0 && order === slideNumber - 1)
			return { left: "7%", transform: "none"};
		else if (order === currentSlide - 2 || currentSlide === 0 && order === slideNumber - 2 || currentSlide === 1 && order === slideNumber - 1)
			return { left: "-23%", transform: "none"};
		else if (order === currentSlide + 1 || currentSlide === slideNumber - 1 && order === 0)
			return { left: "67%", transform: "none"};
		else if (order === currentSlide + 2 || currentSlide === slideNumber - 2 && order === 0 || currentSlide === slideNumber - 1 && order === 1)
			return { left: "97%", transform: "none"};
		else
			return {
				left: "50%",
				transform: `translateX(${direction}200%) translateY(-1000%)`,
				opacity: "0",
				visibility: "hidden"
		};
	};

	const changeSlide = (direction: "next" | "previous"): void => {
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
		const slideStyle = size === 'large' ? setLargePosition(i, currentSlide) : setSmallPosition(i, currentSlide);
		return (
			<div
				key={i}
				style={slideStyle}
				onClick={() => {}}
				className={`${size === 'large' ? styles.slider__slideLarge : styles.slider__slideSmall} 
					${currentSlide === i ? styles.active : styles.inActive}`
				}
			>
				<Image src={item} width={900} height={280} alt="render" />
				{size === 'small' && <p>North facade</p>}
			</div>
		);
	});

	return (
		<div 
			onMouseDown={handleMouseDown} 
			onMouseUp={handleMouseUp} 
			onTouchStart={handleTouchStart} 
			onTouchEnd={handleTouchEnd} 
			className={styles.slider} style={{height: size === 'large' ? 'calc(100vh - 280px)' : '290px'}}
		>
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
			{size === 'small' && <div className={styles.slider__mask} />}
		</div>
	);
};

export default CarouselSlider;