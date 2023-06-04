import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import { parseCookies } from "nookies";

import store from "@/redux/store";
import Loading from "@/components/Loading";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<>
				<Loading />
				
				<Component {...pageProps} />
				<Script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js" />
			</>
		</Provider>
	);
}

// MyApp.getServerSideProps = async ({ req }) => {
// 	// Get the user data from the cookie
// 	const { token } = parseCookies();
  
// 	// Here, you can perform additional checks or validation if needed
// 	const user = { token };
  
// 	// Pass the user data as a prop to all pages
// 	return { props: { user } };
//   };