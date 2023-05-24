import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { fetchData, postData } from "@/utillis/api";

import { useTypedDispatch } from "@/hooks/useReduxHooks";
import { setProjects } from "@/components/screens/main/projects/projectsSlice";
import Projects from "@/components/screens/main/projects/Projects";
import { IProjectsProps, ISingleProject } from "@/interfaces/projects.interface";

const ProjectsPage: NextPage<IProjectsProps> = ({ projects }) => {
    const dispatch = useTypedDispatch();

    dispatch(setProjects(projects));

    // useEffect(() => {
    //     const data = {
    //         area: 1212,
    //         cost: 345345,
    //         floorNumber: 12,
    //         height: 100,
    //         name: "eto novyi proekt",
    //         roofType: 'bez kryshi'
    //     }
    //     postData('projects', data)
    //     // const data = fetchData('projects');
    //     // console.log(data)
    // }, [])
    
    return <Projects />
}

export const getServerSideProps: GetServerSideProps<IProjectsProps> = async () => {
    const projects: ISingleProject[] = [
        {
            id: '1',
            previewSrc: '/projectPreview.jpg',
            name: 'Project A',
            totalArea: 178,
            height: 5.2,
            houseDimensions: [10, 16],
            cost: 199,
            currency: '€',
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 3,
            roofType: 'Flat',
            landDimensions: [30, 50]
        },
        {
            id: '2',
            previewSrc: '/project23.jpg',
            name: 'Project B',
            totalArea: 278,
            height: 5.2,
            houseDimensions: [21, 15],
            cost: 399,
            currency: '$',
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 2,
            roofType: 'Mixed',
            landDimensions: [60, 50]
        },
        {
            id: '3',
            previewSrc: '/projectPreview.jpg',
            name: 'Project C',
            totalArea: 378,
            height: 5.2,
            houseDimensions: [32, 36],
            cost: 499,
            currency: '$',
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 2,
            roofType: 'Flat',
            landDimensions: [50, 64]
        },
        {
            id: '4',
            previewSrc: '/projectPreview.jpg',
            name: 'Project D',
            totalArea: 178,
            height: 5.2,
            houseDimensions: [15, 26],
            cost: 699,
            currency: '€',
            locations: ['Portugal', 'France', 'Spain'],
            floorNumber: 3,
            roofType: 'Flat',
            landDimensions: [30, 40]
        },
        {
            id: '5',
            previewSrc: '/project23.jpg',
            name: 'Project E',
            totalArea: 118,
            height: 5.2,
            houseDimensions: [10, 16],
            cost: 399,
            currency: '$',
            locations: ['Portugal', 'Spain'],
            floorNumber: 1,
            roofType: 'Sloped',
            landDimensions: [30, 50]
        },
        {
            id: '6',
            previewSrc: '/projectPreview.jpg',
            name: 'Project F',
            totalArea: 578,
            height: 5.2,
            houseDimensions: [12, 19],
            cost: 199,
            currency: '€',
            locations: ['Portugal', 'France'],
            floorNumber: 1,
            roofType: 'Mixed',
            landDimensions: [30, 50]
        }
        
    ]

    return {
        props: { projects: projects }
    }
}

export default ProjectsPage;