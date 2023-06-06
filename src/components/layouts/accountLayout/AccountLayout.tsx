import { FC, PropsWithChildren } from "react";

import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";
import Navbar from "./navbar/Navbar";

const AccountLayout: FC<PropsWithChildren<IMeta>> = ({ children, title }) => {

    return (
        <Meta title={title} >
            <Navbar />
            <main style={{marginLeft: '270px'}}>
                {children}
            </main>
        </Meta>
    )
}

export default AccountLayout;