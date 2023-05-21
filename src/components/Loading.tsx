import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";
import LoadingUI from "@/components/ui/loadingUI/LoadingUI";

type TypeHandleFunction = (url: string) => void;

const Loading: FC = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		setTimeout(() => setProgress(100), 2000);
		setTimeout(() => setInitialLoad(false), 3000);
	}, []);

	useEffect(() => {
		if (!initialLoad) {
			const handleStart: TypeHandleFunction = url => {
				setProgress(0);
				setLoading(true);
			};

			const handleComplete: TypeHandleFunction = url => {
				setProgress(100);
				setTimeout(() => setLoading(false), 1000);
			};

			router.events.on("routeChangeStart", handleStart);
			router.events.on("routeChangeComplete", handleComplete);
			router.events.on("routeChangeError", handleComplete);

			return () => {
				router.events.off("routeChangeStart", handleStart);
				router.events.off("routeChangeComplete", handleComplete);
				router.events.off("routeChangeError", handleComplete);
			};
		}
	}, [router.events, initialLoad]);

	useEffect(() => {
		const timer: NodeJS.Timer = setInterval(() => {
			if (loading || initialLoad) {
				setProgress(oldProgress => {
					const diff = Math.floor(Math.random() * 10);
					return Math.min(oldProgress + diff, 100);
				});
			}
		}, 300);

		return () => {
			clearInterval(timer);
		};
	}, [router.pathname, initialLoad, loading]);

	useEffect(() => {
		document.body.style.overflow =
			loading || initialLoad ? "hidden" : "visible";
	}, [loading, initialLoad]);

	return <LoadingUI isLoading={loading || initialLoad} progress={progress} />;
};

export default Loading;