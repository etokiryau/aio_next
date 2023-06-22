export interface IProject {
    _id: string,
    preview?: string,
    name: string,
    area: number,
    height: number,
    houseDimensions: [number, number],
    cost: number,
    reducedCost: number | null,
    locations: string[],
    floorNumber: number,
    roofType: string,
    renders: string[],
    model: {preview: string, urn: string},
    tour: {preview: string, src: string},
    setup: [{title: string, rooms: [{src: string, name: string}]}],
    views: [{title: string, src: string}]
};

export interface ISingleProject {
    id: string,
    previewSrc: string,
    name: string,
    totalArea: number,
    height: number,
    houseDimensions: [number, number],
    cost: number,
    reducedCost: number | null,
    locations: string[],
    floorNumber: number,
    roofType: string,
    // landDimensions: [number, number]
};

export interface IProjectsProps {
    projects: ISingleProject[]
}

export interface IProjectPageProps {
    project: ISingleProject
}

export interface IProjectProps {
    response: ISingleProject | undefined
}