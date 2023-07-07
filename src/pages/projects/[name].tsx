import { GetServerSideProps, GetStaticPaths, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import SingleProject from "@/components/screens/main/singleProject/SingleProject";
import { IProject, IProjectProps } from "@/interfaces/projects.interface";

interface IParams extends ParsedUrlQuery {
    name: string
};

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

const SingleProjectPage: NextPage<IProjectProps> = ({ response }) => {
    const project: IProject = {
        _id: '',
        preview: '',
        name: '',
        area: 0,
        height: 0,
        houseDimensions: [0, 0],
        cost: 0,
        reducedCost: 0,
        locations: [''],
        floorNumber: 1,
        roofType: '',
        renders: [],
        model: {preview: '', urn: ''},
        tour: {preview: '', src: ''},
        setup: [],
        views: []
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