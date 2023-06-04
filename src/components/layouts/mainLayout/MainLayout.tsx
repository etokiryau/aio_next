import { FC, PropsWithChildren, useEffect } from "react";
import { parseCookies } from "nookies";

import { useTypedDispatch } from "@/hooks/useReduxHooks";
import { setPreferenceFromCookie } from "@/components/userPreferences/userPreferencesSlice";
import { setToken } from "@/components/screens/signin/userSlice";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";
import { useAuth } from "@/hooks/useAuth";

interface IProps extends IMeta {
    footer?: boolean
};

const MainLayout: FC<PropsWithChildren<IProps>> = ({ children, title, description, footer = true }) => {
    const dispatch = useTypedDispatch();
    const { login } = useAuth()

    useEffect(() => {
        const { token, preferences } = parseCookies();
        preferences && dispatch(setPreferenceFromCookie(JSON.parse(preferences)));
        
        if (token) {
            login({
                name: "Kirill",
                email: "michigan@kamishok.com",
                token,
                userId: 1,
                isConfirmed: false
            });
        }
    }, []);

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