import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.scss";

import store from "@/redux/store";
import Loading from "@/components/Loading";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<>
				<Loading />
				<Component {...pageProps} />
			</>
		</Provider>
	);
}
