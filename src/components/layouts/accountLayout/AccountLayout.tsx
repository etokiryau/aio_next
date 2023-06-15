import { FC, PropsWithChildren } from "react";

import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";
import Navbar from "./navbar/Navbar";
import { useTypedDispatch, useTypedSelector } from "@/hooks/useReduxHooks";
import { selectAccount } from "./accountSlice";

const AccountLayout: FC<PropsWithChildren<IMeta>> = ({ children, title }) => {
    const { isActive } = useTypedSelector(selectAccount);

    return (
        <Meta title={title} >
            <Navbar />
            <main style={{marginLeft: isActive ? '96px' : '270px', transition: '.3s ease'}}>
                {children}
            </main>
        </Meta>
    )
}

export default AccountLayout;