import { FC, PropsWithChildren, useState, useRef } from "react";

import styles from "./accordionItem.module.scss";
import TriangleIcon from "../_icons/TriangleIcon";

interface IAccordionProps {
	header: string;
}

const AccordionItem: FC<PropsWithChildren<IAccordionProps>> = ({
	header,
	children
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement | null>(null);
	const contentHeight: number | undefined = contentRef.current
		? contentRef.current.clientHeight
		: 0;

	const toggle = (): void => {
		setIsOpen(prev => !prev);
	};

	const containerStyle = {
		maxHeight: isOpen ? `${contentHeight + 20}px` : 0
	};

	return (
		<div className={`${styles.accordion} ${isOpen ? styles.active : ""}`}>
			<div onClick={toggle} className={styles.accordion__header}>
				{header}
				<div>
					<TriangleIcon isActive={isOpen} />
				</div>
			</div>
			<div className={styles.accordion__content} style={containerStyle}>
				<div
					ref={contentRef}
					className={styles.accordion__content_wrapper}
				>
					<span className={styles.accordion__content_line} />
					{children}
				</div>
			</div>
		</div>
	);
};

export default AccordionItem;
