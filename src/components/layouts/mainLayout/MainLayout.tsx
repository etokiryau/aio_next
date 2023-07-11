import { FC, PropsWithChildren, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";

import { useTypedDispatch } from "@/hooks/useReduxHooks";
import { setPreferenceFromCookie, toggleCookiePopup } from "@/components/userPreferences/userPreferencesSlice";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Meta from "@/components/seo/Meta";
import { IMeta } from "@/components/seo/meta.interface";
import { useAuth } from "@/hooks/useAuth";
import CookiePopup from "@/components/cookiePopup/CookiePopup";

interface IProps extends IMeta {
    footer?: boolean
};

const MainLayout: FC<PropsWithChildren<IProps>> = ({ children, title, description, footer = true }) => {
    const dispatch = useTypedDispatch();
    const { login } = useAuth();

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

    useEffect(() => {
        const { cookieNotification } = parseCookies();

        if (cookieNotification === 'notified') {
            return;
        } else {
            setTimeout(() => {
                dispatch(toggleCookiePopup(true));
            }, 2000)
        }
    }, []);

    return (
        <Meta title={title} description={description} >
            <Header />
            <main style={{margin: '105px auto 100px', width: 'min(100%, 1440px)'}}>
                {children}
                <CookiePopup callback={() => {
                    setCookie(null, 'cookieNotification', 'notified', {
                        maxAge: 7 * 24 * 60 * 60,
                        path: "/"
                    });
                }} />
            </main>
            {footer && <Footer />}
        </Meta>
    )
}

export default MainLayout;