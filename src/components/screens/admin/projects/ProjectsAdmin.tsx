import { FC, useState } from "react";
import { useRouter } from "next/router";

import { IProject } from "@/interfaces/projects.interface";
import ProjectAdministation from "@/components/projectAdminstration/ProjectAdministration";
import ArrowLarge from "@/components/ui/_icons/ArrowLargeIcon";
import ZoomInIcon from "@/components/ui/_icons/ZoomInIcon";
import ProjectData from "@/components/projectData/ProjectData";

import styles from "./projectsAdmin.module.scss";

const ProjectsAdmin: FC = () => {
    const [isOpened, setIsOpened] = useState(false);
    const router = useRouter();

    const projects: IProject[] = [
        {
            _id: '1',
            preview: '/projectPreview.jpg',
            name: 'Project A',
            area: 178,
            height: 5.2,
            houseDimensions: [10, 16],
            cost: 100,
            reducedCost: 0,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 3,
            roofType: 'Flat',
            renders: ['/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg'],
            model: {preview: '/projectPreview.jpg', urn: 'asdas'},
            tour: {preview: '/projectPreview.jpg', src: 'asd'},
            setup: [{title: '1st floor', rooms: [{name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}]}, {title: '2nd floor', rooms: [{name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}]}],
            views: [{title: 'Facade 1', src: '/projectPreview.jpg'}, {title: 'Facade 187', src: '/projectPreview.jpg'}, {title: 'Facade 143', src: '/projectPreview.jpg'}, {title: 'Facade 13', src: '/projectPreview.jpg'}, {title: 'Facade 14', src: '/projectPreview.jpg'}, {title: 'Facade 134', src: '/projectPreview.jpg'}, {title: 'Facade 145', src: '/projectPreview.jpg'}]
        },
        {
            _id: '2',
            preview: '/project23.jpg',
            name: 'Project B',
            area: 278,
            height: 5.2,
            houseDimensions: [21, 15],
            cost: 499,
            reducedCost: 399,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 2,
            roofType: 'Mixed',
            renders: ['/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg'],
            model: {preview: '/projectPreview.jpg', urn: 'asdas'},
            tour: {preview: '/projectPreview.jpg', src: 'asd'},
            setup: [{title: '1st floor', rooms: [{name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}]}, {title: '2nd floor', rooms: [{name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}]}],
            views: [{title: 'Facade 1', src: '/projectPreview.jpg'}, {title: 'Facade 187', src: '/projectPreview.jpg'}, {title: 'Facade 143', src: '/projectPreview.jpg'}, {title: 'Facade 13', src: '/projectPreview.jpg'}, {title: 'Facade 14', src: '/projectPreview.jpg'}, {title: 'Facade 134', src: '/projectPreview.jpg'}, {title: 'Facade 145', src: '/projectPreview.jpg'}]
        },
        {
            _id: '3',
            preview: '/projectPreview.jpg',
            name: 'Project C',
            area: 378,
            height: 5.2,
            houseDimensions: [32, 36],
            cost: 499,
            reducedCost: null,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 2,
            roofType: 'Flat',
            renders: ['/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg'],
            model: {preview: '/projectPreview.jpg', urn: 'asdas'},
            tour: {preview: '/projectPreview.jpg', src: 'asd'},
            setup: [{title: '1st floor', rooms: [{name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}]}, {title: '2nd floor', rooms: [{name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}]}],
            views: [{title: 'Facade 1', src: '/projectPreview.jpg'}, {title: 'Facade 187', src: '/projectPreview.jpg'}, {title: 'Facade 143', src: '/projectPreview.jpg'}, {title: 'Facade 13', src: '/projectPreview.jpg'}, {title: 'Facade 14', src: '/projectPreview.jpg'}, {title: 'Facade 134', src: '/projectPreview.jpg'}, {title: 'Facade 145', src: '/projectPreview.jpg'}]// landDimensions: [50, 64]
        },
        {
            _id: '4',
            preview: '/projectPreview.jpg',
            name: 'Project D',
            area: 178,
            height: 5.2,
            houseDimensions: [15, 26],
            cost: 699,
            reducedCost: null,
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 3,
            roofType: 'Flat',
            renders: ['/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg'],
            model: {preview: '/projectPreview.jpg', urn: 'asdas'},
            tour: {preview: '/projectPreview.jpg', src: 'asd'},
            setup: [{title: '1st floor', rooms: [{name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}]}, {title: '2nd floor', rooms: [{name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}]}],
            views: [{title: 'Facade 1', src: '/projectPreview.jpg'}, {title: 'Facade 187', src: '/projectPreview.jpg'}, {title: 'Facade 143', src: '/projectPreview.jpg'}, {title: 'Facade 13', src: '/projectPreview.jpg'}, {title: 'Facade 14', src: '/projectPreview.jpg'}, {title: 'Facade 134', src: '/projectPreview.jpg'}, {title: 'Facade 145', src: '/projectPreview.jpg'}]
        },
        {
            _id: '5',
            preview: '/project23.jpg',
            name: 'Project E',
            area: 118,
            height: 5.2,
            houseDimensions: [10, 16],
            cost: 399,
            reducedCost: 200,
            locations: ['Portugal', 'Spain'],
            floorNumber: 1,
            roofType: 'Pitched',
            renders: ['/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg'],
            model: {preview: '/projectPreview.jpg', urn: 'asdas'},
            tour: {preview: '/projectPreview.jpg', src: 'asd'},
            setup: [{title: '1st floor', rooms: [{name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}]}, {title: '2nd floor', rooms: [{name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}]}],
            views: [{title: 'Facade 1', src: '/projectPreview.jpg'}, {title: 'Facade 187', src: '/projectPreview.jpg'}, {title: 'Facade 143', src: '/projectPreview.jpg'}, {title: 'Facade 13', src: '/projectPreview.jpg'}, {title: 'Facade 14', src: '/projectPreview.jpg'}, {title: 'Facade 134', src: '/projectPreview.jpg'}, {title: 'Facade 145', src: '/projectPreview.jpg'}]
        },
        {
            _id: '6',
            preview: '/projectPreview.jpg',
            name: 'Project F',
            area: 578,
            height: 5.2,
            houseDimensions: [12, 19],
            cost: 199,
            reducedCost: null,
            locations: ['Portugal', 'France'],
            floorNumber: 1,
            roofType: 'Mixed',
            renders: ['/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg', '/projectPreview.jpg'],
            model: {preview: '/projectPreview.jpg', urn: 'asdas'},
            tour: {preview: '/projectPreview.jpg', src: 'asd'},
            setup: [{title: '1st floor', rooms: [{name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}, {name: '1 Bedroom', src: 'vsd'}]}, {title: '2nd floor', rooms: [{name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}, {name: '2 Bedroom', src: 'vsd'}]}],
            views: [{title: 'Facade 1', src: '/projectPreview.jpg'}, {title: 'Facade 187', src: '/projectPreview.jpg'}, {title: 'Facade 143', src: '/projectPreview.jpg'}, {title: 'Facade 13', src: '/projectPreview.jpg'}, {title: 'Facade 14', src: '/projectPreview.jpg'}, {title: 'Facade 134', src: '/projectPreview.jpg'}, {title: 'Facade 145', src: '/projectPreview.jpg'}]
        }
    ]
    const [projectsState, setProjectsState] = useState(projects);

    const deleteProjects = (order: number): void => {
        const newArray = projectsState.filter((_, i) => order !== i)
        setProjectsState(newArray);
    };

    const projectsContent: JSX.Element[] = projectsState.map((item, i) => {
        return <ProjectAdministation 
                    key={i} 
                    data={item} 
                    onDelete={() => deleteProjects(i)} 
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
            <ProjectData state={[isOpened, setIsOpened]} 
                data={{
                    preview: '', 
                    name: '', 
                    area: 0, 
                    height: 0, 
                    houseDimensions: [0, 0], 
                    cost: 0, 
                    reducedCost: 0, 
                    roofType: '', 
                    floorNumber: 0,
                    _id: '',
                    renders: [],
                    model: {preview: '', urn: ''},
                    tour: {preview: '', src: ''},
                    setup: [],
                    views: [],
                    locations: []
                }}
            />
            <div className={styles.projects__list}>
                <h2>Projects list</h2>
                {projectsContent}
            </div>
        </div>
    )
}

export default ProjectsAdmin;