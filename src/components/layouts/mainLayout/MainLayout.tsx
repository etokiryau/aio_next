import { FC, PropsWithChildren } from "react";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";

interface IProps extends IMeta {
    footer?: boolean
}

const MainLayout: FC<PropsWithChildren<IProps>> = ({ children, title, description, footer = true }) => {

    return (
        <Meta title={title} description={description} >
            <Header />
            <main style={{margin: '105px auto 100px', width: 'min(100%, 1440px)'}}>
                {children}
            </main>
            {footer && <Footer />}
        </Meta>
    )
}

export default MainLayout;