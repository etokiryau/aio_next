import { NextPage, GetServerSideProps } from "next";
import nookies from 'nookies';
import Dashboard from "@/components/screens/account/dashboard/Dashboard";

const DashboardPage: NextPage = () => {

    return <Dashboard />
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = nookies.get(ctx);

    if (token) {
        return {
            props: { }
        }
    } else {
        return {
            redirect: {
                destination: '/signin',
                permanent: false
            }
        }
    }
}

export default DashboardPage;