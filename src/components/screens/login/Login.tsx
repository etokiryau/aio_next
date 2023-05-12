import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { FC } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { log } from "console";

const Login: FC = () => {
    const { login, logout } = useAuth();

    const router = useRouter();

    return (
        <MainLayout title="Login">
            Login
            <button onClick={() => login({name: 'Kirill', email: 'myEmail', token: 'sdf43', userId: 1})}>Sign in</button>
            <button onClick={logout}>Sign out</button>
        </MainLayout>
    )
}

export default Login;