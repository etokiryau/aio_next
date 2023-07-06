import { FC, useState } from "react";
import { useRouter } from "next/router";
import { ISingleProject } from "@/interfaces/projects.interface";

import ProjectAdministation from "@/components/projectAdminstration/ProjectAdministration";
import ArrowLarge from "@/components/ui/_icons/ArrowLargeIcon";
import ZoomInIcon from "@/components/ui/_icons/ZoomInIcon";

import styles from "./projectsAdmin.module.scss";
import ProjectData from "@/components/projectData/ProjectData";

const ProjectsAdmin: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const router = useRouter();

    const projects: ISingleProject[] = [
        {
            id: '1',
            previewSrc: '/projectPreview.jpg',
            name: 'Project A',
            totalArea: 178,
            height: 5.2,
            houseDimensions: [10, 16],
            cost: 100,
            reducedCost: 0,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 3,
            roofType: 'Flat',
            // landDimensions: [30, 50]
        },
        {
            id: '2',
            previewSrc: '/project23.jpg',
            name: 'Project B',
            totalArea: 278,
            height: 5.2,
            houseDimensions: [21, 15],
            cost: 499,
            reducedCost: 399,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 2,
            roofType: 'Mixed',
            // landDimensions: [60, 50]
        },
        {
            id: '3',
            previewSrc: '/projectPreview.jpg',
            name: 'Project C',
            totalArea: 378,
            height: 5.2,
            houseDimensions: [32, 36],
            cost: 499,
            reducedCost: null,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 2,
            roofType: 'Flat',
            // landDimensions: [50, 64]
        },
        {
            id: '4',
            previewSrc: '/projectPreview.jpg',
            name: 'Project D',
            totalArea: 178,
            height: 5.2,
            houseDimensions: [15, 26],
            cost: 699,
            reducedCost: null,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 3,
            roofType: 'Flat',
            // landDimensions: [30, 40]
        },
        {
            id: '5',
            previewSrc: '/project23.jpg',
            name: 'Project E',
            totalArea: 118,
            height: 5.2,
            houseDimensions: [10, 16],
            cost: 399,
            reducedCost: 200,
            locations: ['Portugal', 'Spain'],
            floorNumber: 1,
            roofType: 'Pitched',
            // landDimensions: [30, 50]
        },
        {
            id: '6',
            previewSrc: '/projectPreview.jpg',
            name: 'Project F',
            totalArea: 578,
            height: 5.2,
            houseDimensions: [12, 19],
            cost: 199,
            reducedCost: null,
            locations: ['Portugal', 'France'],
            floorNumber: 1,
            roofType: 'Mixed',
            // landDimensions: [30, 50]
        }
    ];

    const projectsContent: JSX.Element[] = projects.map((item, i) => {
        return <ProjectAdministation 
                    key={i} 
                    data={item} 
                    onDelete={() => {}} 
                />
    });

    return (
        <div className={styles.projects}>
            <div className={styles.projects__header}>
                <div onClick={() => router.back()} className={styles.projects__header_back}>
                    <ArrowLarge />
                    <p>Back to the admin panel</p>
                </div>
                <div onClick={() => setIsOpened(true)} className={styles.projects__header_add}>
                    <ZoomInIcon />
                    <p>Add new project</p>
                </div>
            </div>
            <ProjectData state={[isOpened, setIsOpened]} data={{previewSrc: '', name: '', totalArea: 0, height: 0, houseDimensions: [0, 0], cost: 0, reducedCost: 0, roofType: '', floorNumber: 0, id: '', locations: []}} />
            <div className={styles.projects__list}>
                <h2>Projects list</h2>
                {projectsContent}
            </div>
        </div>
    )
}

export default ProjectsAdmin;