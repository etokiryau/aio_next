import { NextPage, GetServerSideProps } from "next";
import nookies from 'nookies';
import Purchase from "@/components/screens/main/purchase/Purchase";

const PurchasePage: NextPage = () => {

    return <Purchase />
}

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

export default PurchasePage;