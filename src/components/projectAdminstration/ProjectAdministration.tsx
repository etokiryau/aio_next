import { FC, useState, useEffect } from "react";
import Image from "next/image";
 
import { ISingleProject } from "@/interfaces/projects.interface";
import GarbageIcon from "../ui/_icons/GarbageIcon";
import ProjectData from "../projectData/ProjectData";

import styles from "./projectAdminstration.module.scss";

interface IProps {
    data: ISingleProject,
    onDelete: () => void
};

const ProjectAdministation: FC<IProps> = ({ data, onDelete }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [isPublished, setIspublished] = useState(true)
    const { previewSrc, name } = data;

    const handleCheckboxChange = (): void => {
        setIspublished(prev => !prev);
    };

    const handleDelete = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.stopPropagation();
        onDelete();
    };

    useEffect(() => {
        document.body.style.overflow = isOpened ? 'hidden' : ''
    }, [isOpened]);

    return (
        <div className={styles.project}>
            <div onClick={() => setIsOpened(true)} className={styles.project__preview}>
                <div className={styles.project__preview_left}>
                    <Image src={previewSrc} alt="render" width={114} height={60} />
                    <h4>{name}</h4>
                </div>
                <div className={styles.project__preview_right}>
                    <label onClick={(e) => e.stopPropagation()} className={styles.project__preview_option} htmlFor={name}>
                        <input checked={isPublished} onChange={handleCheckboxChange} value="published" id={name} type="checkbox" />
                        <p>Published</p>
                    </label>
                    <div onClick={handleDelete} className={styles.project__preview_option}>
                        <GarbageIcon />
                        <p>Delete</p>
                    </div>
                </div>
            </div>
            
            <ProjectData state={[isOpened, setIsOpened]} data={data} />
        </div>
    )
}

export default ProjectAdministation;