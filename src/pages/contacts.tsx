import { GetServerSideProps, NextPage } from "next";
import Contacts from "@/components/screens/main/contacts/Contacts";
import nookies from 'nookies';

const ContactsPage: NextPage = () => {

    return (
        <Contacts />
    )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const { token } = nookies.get(ctx);

//     if (token) {
//         return {
//             props: { }
//         }
//     } else {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false
//             }
//         }
//     }
// }

export default ContactsPage;