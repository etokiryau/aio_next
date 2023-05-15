export interface ISingleProject {
    id: string,
    previewSrc: string,
    name: string,
    totalArea: number,
    height: number,
    houseDimensions: [number, number],
    cost: number,
    currency: string,
    locations: string[],
    floorNumber: number,
    roofType: string,
    landDimensions: [number, number]
};

export interface IProjectsProps {
    projects: ISingleProject[]
}

export interface IProjectProps {
    response: ISingleProject | undefined | string
}