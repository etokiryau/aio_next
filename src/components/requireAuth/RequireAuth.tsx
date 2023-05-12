import { useTypedSelector } from "@/hooks/useReduxHooks";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { selectUser } from "../screens/login/userSlice";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

interface IRequireAuthProps {
    children: ReactElement
}

const RequireAuth = ({ children }: IRequireAuthProps) => {
    const { token } = useTypedSelector(selectUser);

    const router = useRouter();
    const cookies = parseCookies();

    if(!cookies.token) {
        router.push('/login');
        return null;
    }

    return children;
}

export default RequireAuth;