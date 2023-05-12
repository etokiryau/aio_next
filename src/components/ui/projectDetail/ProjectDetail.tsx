import { IProjectProps } from "@/interfaces/projectProps.interface";
import { ISingleProject } from "@/interfaces/singleProject.interface";
import { FC } from "react";

const ProjectDetail: FC<IProjectProps> = ({ project }) => {
	return <div>{project.name}</div>;
};

export default ProjectDetail;
