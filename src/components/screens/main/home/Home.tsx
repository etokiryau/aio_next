import { FC, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import styles from './home.module.scss';
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import projectAdaptation from "../../../../../public/adaptationMap.png";
import AdvantageIndicator from "@/components/advantageIndicator/AdvantageIndicator";
import VideoWrapper from "@/components/videoWrapper/VideoWrapper";

interface IOpportunity {
    name: string,
    description: string,
    path: string
}

const Home: FC = () => {
    const [currentOpportunity, setCurrentOpportunity] = useState<number>(0);
    const opportunityRefs = useRef<HTMLDivElement[] | null[]>([]);
    const videoRefs = useRef<HTMLVideoElement[] | null[]>([]);

    const opportunities: IOpportunity[] = [
        {
            name: 'Virtual tour',
            description: 'here is a small description virtual tour feature. just two short sentences',
            path: '/'
        },
        {
            name: 'Virtual tour',
            description: 'here is a small description virtual tour feature. just two short sentences',
            path: '/'
        },
        {
            name: 'Virtual tour',
            description: 'here is a small description virtual tour feature. just two short sentences',
            path: '/'
        },
        {
            name: 'Virtual tour',
            description: 'here is a small description virtual tour feature. just two short sentences',
            path: '/'
        },
        {
            name: 'Virtual tour',
            description: 'here is a small description virtual tour feature. just two short sentences',
            path: '/'
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            opportunityRefs.current.forEach((ref, i) => {
                const { top, bottom } = ref?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
                if (top < windowHeight / 2 && bottom > windowHeight / 2) {
                    setCurrentOpportunity(i);
                };
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const options: IntersectionObserverInit = {
            root: document.querySelector('main'),
            rootMargin: '0px',
            threshold: 1
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.hasAttribute('data-autoplay')) {
                    (entry.target as HTMLVideoElement).play();
                } else {
                    (entry.target as HTMLVideoElement).pause();
                }
            });
        }, options);
    
        videoRefs.current.forEach(videoRef => {
            if (videoRef) observer.observe(videoRef);
        });
    
        return () => {
            observer.disconnect();
        };
    }, []);

    const opportunitiesContent: JSX.Element[] = opportunities.map((item, i) => {
        return (
            <div ref={ref => opportunityRefs.current[i] = ref} key={i} 
                className={`${styles.home__opportunities_list_single} ${i === currentOpportunity ? styles.active : ''}`}
            >
                <p id={styles.name}>{item.name}</p>
                <p id={styles.description}>{item.description}</p>
                <Link href={item.path}>Explore</Link>
            </div>
        )
    })

    return (
        <MainLayout title="Home page">
            <div className={styles.home}>
                <section className={styles.home__head}>
                    <div className={styles.home__head_left}>
                        <h1>Innovative Technologies in private construction</h1>
                        <Link href="/projects">Explore projects</Link>
                    </div>
                    <div className={styles.home__head_right}>
                        <VideoWrapper src={["/mainVideo.mp4"]} />
                    </div>
                </section>

                <section>
                    <h2>AIO private construction ecosystem</h2>
                    <div className={styles.home__indicators}>
                        <AdvantageIndicator title="Money save" target={17} duration={2000} multiplier={1.4} />
                        <AdvantageIndicator title="Time reduce" target={32} duration={2000} multiplier={1.3} />
                        <AdvantageIndicator title="Quality provide" target={100} duration={2000} />
                    </div>
                </section>

                <section>
                    <h2>AIO platform opportunities</h2>
                    <div className={styles.home__opportunities}>
                        <div className={styles.home__opportunities_position}>
                            <div />
                        </div>
                        <div className={styles.home__opportunities_list}>
                            { opportunitiesContent } 
                        </div>
                        <div className={styles.home__opportunities_media}>
                            <div className={styles.home__opportunities_media_content}>

                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Project adaptation map</h2>
                    <div className={styles.home__adaptation}>
                        <Image src={projectAdaptation} alt="map-adaptation" width={900} height={900} />
                    </div>
                </section>
            </div>      
        </MainLayout>
    )
}

export default Home;