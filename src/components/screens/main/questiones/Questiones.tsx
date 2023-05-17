import { FC, useRef, useEffect, useState } from "react";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import AccordionItem from "@/components/ui/accordionItem/AccordionItem";

import styles from './questiones.module.scss';

const Questiones: FC = () => {
    const blockRefs = useRef<HTMLElement[] | null[]>([]);
    const navigationRef = useRef<HTMLElement>(null);
    const [isTopNavigation, setIsTopNavigation] = useState(false);

    useEffect(() => {
        const navigationPosition = 0.5;

        const handleScroll = () => {
            window.scrollY > window.innerHeight * navigationPosition 
            ? setIsTopNavigation(true) 
            : setIsTopNavigation(false);
        };
            
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigation = (order: number): void => {
        const currentRef = blockRefs.current?.[order];

        if (currentRef) {
            window.scrollTo({
                top: currentRef.offsetTop - 165,
                behavior: 'smooth'
            });
        } 
    };

    return (
        <MainLayout title="FAQ">
            <div className={styles.questiones}>
                <section className={styles.questiones__header}>
                    <div>
                        <h1>Frequently Asked Questions</h1>
                        <h2>How can we help?</h2>
                    </div>
                </section>

                <section ref={navigationRef} className={`${styles.questiones__navigation} ${isTopNavigation ? styles.top : ''}`}>
                    <nav>
                        <div onClick={() => handleNavigation(0)}>General</div>
                        <div onClick={() => handleNavigation(1)}>Payment</div>
                        <div onClick={() => handleNavigation(2)}>Delivery</div>
                        <div onClick={() => handleNavigation(3)}>Project content</div>
                        <div onClick={() => handleNavigation(4)}>Customisation</div>
                    </nav>
                </section>

                <section ref={(ref) => blockRefs.current[0] = ref} className={styles.questiones__block}>
                    <h2>General</h2>
                    <div className={styles.questiones__block_content}>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                    </div>
                </section>

                <section ref={(ref) => blockRefs.current[1] = ref} className={styles.questiones__block}>
                    <h2>General</h2>
                    <div className={styles.questiones__block_content}>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                    </div>
                </section>

                <section ref={(ref) => blockRefs.current[2] = ref} className={styles.questiones__block}>
                    <h2>General</h2>
                    <div className={styles.questiones__block_content}>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                    </div>
                </section>

                <section ref={(ref) => blockRefs.current[3] = ref} className={styles.questiones__block}>
                    <h2>General</h2>
                    <div className={styles.questiones__block_content}>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                    </div>
                </section>

                <section ref={(ref) => blockRefs.current[4] = ref} className={styles.questiones__block}>
                    <h2>General</h2>
                    <div className={styles.questiones__block_content}>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                        <AccordionItem header="Here is the question?">
                            <div>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                                <p>asd</p>
                            </div>
                        </AccordionItem>
                    </div>
                </section>

            </div>
        </MainLayout>
    )
}

export default Questiones;