import { NextPage } from "next";
import { useRouter } from "next/router";
import SingleProject from "@/components/screens/main/singleProject/SingleProject";

const SingleProjectPage: NextPage = () => {

    const {query: { name }} = useRouter();

    const project = {
        name: String(name)
    }

    return <SingleProject project={project} />
}

export default SingleProjectPage;