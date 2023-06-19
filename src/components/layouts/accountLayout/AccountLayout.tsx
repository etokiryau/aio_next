import { FC, PropsWithChildren } from "react";

import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";
import Navbar from "./navbar/Navbar";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import { selectAccount } from "./accountSlice";
import Header from "./header/Header";

const AccountLayout: FC<PropsWithChildren<IMeta>> = ({ children, title }) => {
    const { isActive } = useTypedSelector(selectAccount);

    const style = {
        marginLeft: isActive ? '96px' : '270px',
        transition: '.3s ease',
        background: 'linear-gradient(180deg, #F9F9F9 0%, #E0E0E0 100%)',
        height: '100vh'
    };

    return (
        <Meta title={title} >
            <Navbar />
            <main style={style}>
                <Header />
                {children}
            </main>
        </Meta>
    )
}

export default AccountLayout;