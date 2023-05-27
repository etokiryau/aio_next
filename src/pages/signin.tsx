import { NextPage } from "next";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from "@/components/screens/signin/Signin";

const SigninPage: NextPage = () => {
	return (
		<GoogleOAuthProvider clientId="864217039379-0be0ak949k0347464nmkf69knprhhi4d.apps.googleusercontent.com">
			<Login />;
		</GoogleOAuthProvider>
	)
};

export default SigninPage;
