import { FC, useState, useRef } from "react";
import Image from "next/image";
 
import { ISingleProject } from "@/interfaces/projects.interface";
import GarbageIcon from "../ui/_icons/GarbageIcon";

import styles from "./projectAdminstration.module.scss";

interface IProps {
    data: ISingleProject,
    onDelete: () => void
};

const ProjectAdministation: FC<IProps> = ({ data, onDelete }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [isPublished, setIspublished] = useState(true)
    const { previewSrc, name, totalArea, height, houseDimensions, cost, reducedCost, roofType, floorNumber } = data;

    const togglePopup = (event: React.MouseEvent<HTMLDivElement>) => {
        event?.target === popupRef.current && setIsOpened(prev => !prev);
    };

    const handleCheckboxChange = (): void => {
        setIspublished(prev => !prev);
    };

    const handleDelete = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <div className={styles.project}>
            <div onClick={() => setIsOpened(true)} className={styles.project__preview}>
                <div className={styles.project__preview_left}>
                    <Image src={previewSrc} alt="render" width={114} height={60} />
                    <h4>{name}</h4>
                </div>
                <div className={styles.project__preview_right}>
                    <label onClick={(e) => e.stopPropagation()} className={styles.project__preview_option} htmlFor={name}>
                        <input checked={isPublished} onChange={handleCheckboxChange} id={name} type="checkbox" />
                        <p>Published</p>
                    </label>
                    <div onClick={handleDelete} className={styles.project__preview_option}>
                        <GarbageIcon />
                        <p>Delete</p>
                    </div>
                </div>
            </div>
            <div onClick={togglePopup} ref={popupRef} className={`${styles.project__popup} ${isOpened ? styles.active : ''}`}>
                <div className={styles.project__popup_content}>
                    <div className={styles.project__popup_content_header}>
                        <p>Project data</p>
                        <div className={styles.project__popup_content_header_buttons}>
                            <button type="button">Submit</button>
                            <button onClick={() => setIsOpened(false)} type="button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectAdministation;