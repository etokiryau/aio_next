import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import SingleProject from "@/components/screens/main/singleProject/SingleProject";
import { ISingleProject, IProjectProps } from "@/interfaces/projects.interface";

interface IParams extends ParsedUrlQuery {
    name: string
};

const projects: ISingleProject[] = [
    {
        id: '1',
        previewSrc: '/projectPreview.jpg',
        name: 'Project A',
        totalArea: 178,
        height: 5.2,
        houseDimensions: [10, 16],
        cost: 199,
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
        locations: ['Portugal', 'France'],
        floorNumber: 1,
        roofType: 'Mixed',
        landDimensions: [30, 50]
    }
    
];

const SingleProjectPage: NextPage<IProjectProps> = ({ response }) => {
    const project: ISingleProject = {
        id: '',
        previewSrc: '',
        name: '',
        totalArea: 0,
        height: 0,
        houseDimensions: [0, 0],
        cost: 0,
        locations: [''],
        floorNumber: 1,
        roofType: '',
        landDimensions: [0, 0]
    };


    return <SingleProject project={response || project} />
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {

    return ({
        paths: projects.map(item => ({
            params: {name: String(item.name.replace(' ', '%20'))}
        })),
        fallback: 'blocking'
    })
}

export const getStaticProps: GetServerSideProps<IProjectProps, IParams> = async (context) => {
    const { params } = context;

    if (!params || !params.name) {
        return { notFound: true };
    }

    const project = projects.find(item => item.name === params.name);

    if (!project) {
        return { notFound: true };
    }

    return {
        props: { response: project || null }
    }
}

export default SingleProjectPage;