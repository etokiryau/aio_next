import { FC, PropsWithChildren } from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";

const MainLayout: FC<PropsWithChildren<IMeta>> = ({ children, title, description }) => {

    return (
        <Meta title={title} description={description} >
            <Header />
            <main style={{margin: '105px auto 100px', width: 'min(100%, 1440px)'}}>
                {children}
            </main>
            <Footer />
        </Meta>
    )
}

export default MainLayout;