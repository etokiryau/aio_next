import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { fetchData, postData, deleteData, updateData } from "@/utillis/api";

import { useTypedDispatch } from "@/hooks/useReduxHooks";
import { setProjects } from "@/components/screens/main/projects/projectsSlice";
import Projects from "@/components/screens/main/projects/Projects";
import { IProjectsProps, ISingleProject } from "@/interfaces/projects.interface";

const ProjectsPage: NextPage<IProjectsProps> = ({ projects }) => {
    const dispatch = useTypedDispatch();

    dispatch(setProjects(projects));
    // console.log(projects)

    // useEffect(() => {
    //     const data = fetchData('GetProjects')
    // }, [])
    
    // const data = fetchData('projects')
    // console.log(data)

    // useEffect(() => {
    //     deleteData('RemoveProject?id=5')
    //     // const data = fetchData('projects');
    //     // console.log(data)
    // }, [])

    // useEffect(() => {
    //     postData('Create?name=project123&tour.Preview=previewhehe&tour.Scr=test&model.Preview=test&model.Urn=test&roofType=round&houseDimention.A=30&houseDimention.B=25&setup.title=setup1')
    //     // const data = fetchData('projects');
    //     // console.log(data)
    // }, [])

    // useEffect(() => {
    //     updateData('UpdateProject?id=5&name=etoproject5')
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
    ]

    // try {
    //     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    //     const data = await fetchData('GetProjects');
    //     console.log('fetch try', data)

    //     return {
    //         props: { projects: projects }
    //     }
    // } catch(e) {
    //     console.log(e)
    // }
    
    return {
        props: { projects: projects }
    }
}

export default ProjectsPage;