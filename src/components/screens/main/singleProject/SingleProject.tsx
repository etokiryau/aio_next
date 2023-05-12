import { FC } from "react";

import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import ProjectDetail from "@/components/ui/projectDetail/ProjectDetail";
import { IProjectProps } from "@/interfaces/projectProps.interface";

const SingleProject: FC<IProjectProps> = ({ project }) => {
	return (
		<MainLayout title="SingleProject">
			<ProjectDetail project={project} />
		</MainLayout>
	);
};

export default SingleProject;
