import { FC, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import styles from './home.module.scss';
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import projectAdaptation from "../../../../../public/adaptationMap.png";

interface IOpportunity {
    name: string,
    description: string,
    path: string
}

const Home: FC = () => {
    const [currentOpportunity, setCurrentOpportunity] = useState(0);
    const opportunityRefs = useRef<HTMLDivElement[] | null[]>([]);

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
    }, [])

    const opportunitiesContent: JSX.Element[] = opportunities.map((item, i) => {
        return (
            <div ref={ref => opportunityRefs.current[i] = ref} key={i} className={`${styles.opportunities__list_single} ${i === currentOpportunity ? styles.active : ''}`}>
                <p id={styles.name}>{item.name}</p>
                <p id={styles.description}>{item.description}</p>
                <Link href={item.path}>Explore</Link>
            </div>
        )
    })

    return (
        <MainLayout title="Home page">
            <div className={styles.home}>
                <section className={styles.head}>
                    <div className={styles.head__left}>
                        <h1>Innovative Technologies in private construction</h1>
                        <Link href="/projects">Explore projects</Link>
                    </div>
                    <div className={styles.head__right}>
                        <span></span>
                    </div>
                </section>

                <section>
                    <h2>AIO private construction ecosystem</h2>
                    <div className={styles.indicators}>
                        <div className={styles.indicators__single}>
                            <p className={styles.indicators__single_name}>Money save</p>
                            <div className={styles.indicators__single_value}>
                                <span id={styles.circle} />
                                <span id={styles.line} style={{width: `${17}%`}}>
                                    <p>17%</p>
                                </span>
                            </div>
                        </div>

                        <div className={styles.indicators__single}>
                            <p className={styles.indicators__single_name}>Time reduce</p>
                            <div className={styles.indicators__single_value}>
                                <span id={styles.circle} />
                                <span id={styles.line} style={{width: `${32}%`}}>
                                    <p>32%</p>
                                </span>
                            </div>
                        </div>

                        <div className={styles.indicators__single}>
                            <p className={styles.indicators__single_name}>Quality provide</p>
                            <div className={styles.indicators__single_value}>
                                <span id={styles.circle} />
                                <span id={styles.line} style={{width: `${100}%`}}>
                                    <p>100%</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>AIO platform opportunities</h2>
                    <div className={styles.opportunities}>
                        <div className={styles.opportunities__position}>
                            <div />
                        </div>
                        <div className={styles.opportunities__list}>
                            { opportunitiesContent } 
                        </div>
                        <div className={styles.opportunities__media}>
                            <div className={styles.opportunities__media_content}>

                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Project adaptation map</h2>
                    <div className={styles.adaptation}>
                        <Image src={projectAdaptation} alt="map-adaptation" width={900} height={900} />
                    </div>
                </section>
            </div>      
        </MainLayout>
    )
}

export default Home;