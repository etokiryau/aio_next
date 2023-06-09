import { IUser } from "@/interfaces/user.interface";
import { useTypedSelector, useTypedDispatch } from "./useReduxHooks";
import {
	selectUser,
	setUser,
	removeUser
} from "@/components/screens/signin/userSlice";
import { setCookie, destroyCookie } from "nookies";

interface IAuthHook extends IUser {
	login: (user: IUser) => void;
	logout: () => void;
}

export const useAuth = (): IAuthHook => {
	const { email, name, token, userId, isConfirmed } = useTypedSelector(selectUser);

	const dispatch = useTypedDispatch();

	const login = (user: IUser): void => {
		dispatch(setUser(user));
		setCookie(null, "token", String(user.token), {
			maxAge: 30 * 24 * 60 * 60,
			path: "/"
		});
	};

	const logout = (): void => {
		destroyCookie(null, "token");
		dispatch(removeUser());
	};

	return { email, name, token, userId, isConfirmed, login, logout };
};
