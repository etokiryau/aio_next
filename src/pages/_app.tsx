import { AppProps } from 'next/app';
import { useRouter } from "next/router";
import { useState, useEffect, FC } from "react";
import { Provider } from 'react-redux';
import '../styles/globals.scss';

import store from '@/redux/store';
import LoadingUI from '@/components/ui/loading/Loading';

type TypeHandleFunction = (url: string) => void;

const Loading: FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleStart: TypeHandleFunction = (url) => {
            setProgress(0);
            setLoading(true);
        };

        const handleComplete: TypeHandleFunction = (url) => {
            setProgress(100);
            setTimeout(() => setLoading(false), 1000);
        };
        
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        }
    }, [router.pathname]);

    useEffect(() => {
        const timer: NodeJS.Timer = setInterval(() => {
            if (loading) {
                setProgress((oldProgress) => {
                    const diff = Math.floor(Math.random() * 10);
                    return Math.min(oldProgress + diff, 100);
                });
            }
        }, 300);

        return () => {
            clearInterval(timer);
        };
    }, [router.pathname]);

    useEffect(() => {
        document.body.style.overflow = loading ? 'hidden' : 'visible';
    }, [loading]);

    return (
        <LoadingUI isLoading={loading} progress={progress} />
    )
}

export default function MyApp({ Component, pageProps }: AppProps) {

    return (
        <Provider store={store}>
            <> 
                <Loading />
                <Component {...pageProps} />
            </>
        </Provider>
    )
}