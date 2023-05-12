import { IUser } from "@/interfaces/user.interface";
import { useTypedSelector, useTypedDispatch } from "./useReduxHooks";
import { selectUser, setUser, removeUser } from "@/components/screens/login/userSlice";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

interface IAuthHook extends IUser {
    login: (user: IUser) => void,
    logout: () => void
}

export const useAuth = (): IAuthHook => {
    const { email, name, token, userId } = useTypedSelector(selectUser);
    
    const dispatch = useTypedDispatch();

    const login = (user: IUser): void => {
        dispatch(setUser(user));
        setCookie(null, 'token', 'token', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })
    };

    const logout = (): void => {
        dispatch(removeUser());
        destroyCookie(null, 'token');
    };

    return { email, name, token, userId, login, logout }
}