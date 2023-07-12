import { FC, useState } from "react";

import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";
import DiagramGantt from "@/components/diagramGantt/DiagramGantt";

import styles from "./construction.module.scss";

const Construction: FC = () => {
    const [mainDividerPosition, setMainDividerPosition] = useState<number>(70);
    const [dividerPosition, setDividerPosition] = useState<number>(50);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        document.body.style.userSelect = 'none';
        const target = event.target as HTMLElement;
        const type: string = String(target.getAttribute('data-type'));

        const calculateNewPosition = (position: number, delta: number) => {
            const containerSize: number = (type === 'main' ? window.innerHeight : window.innerWidth) + delta;
            const absolutePosition: number = position + (type === 'main' ? 0 : delta + 20);
            const relativePosition: number = (absolutePosition / containerSize) * 100;

            return relativePosition;
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (target.parentNode instanceof HTMLElement) {
                const delta: number = type === 'main' 
                    ? target.parentNode.getBoundingClientRect().top / 2
                    : -target.parentNode.getBoundingClientRect().left - 20;

                const position: number = type === 'main' 
                    ? event.clientY
                    : event.clientX;

                const newCalculatedPosition: number = calculateNewPosition(position, delta);
                let newPosition: number;

                if (newCalculatedPosition > 70) {
                    newPosition = 70
                } else if (newCalculatedPosition < 30) {
                    newPosition = 30;
                } else {
                    newPosition = calculateNewPosition(position, delta);
                }

                type === 'main' ? setMainDividerPosition(newPosition) : setDividerPosition(newPosition);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.body.style.userSelect = '';
        });
    };

    return (
        <AccountLayout title="Construction">
            <div className={styles.construction}>
                <section style={{height: `calc(${mainDividerPosition}vh - 70px)`}} className={styles.construction__main}>
                    <div style={{width: `calc(${dividerPosition}% - 10px)`}} className={styles.construction__main_graph}>
                        <DiagramGantt />
                    </div>

                    <div 
                        data-type="secondary"
                        onMouseDown={handleMouseDown}
                        className={styles.construction__main_divider}
                    >
                        <div className={styles.construction__main_divider_element}>
                            <span />
                        </div>
                    </div>

                    <div style={{width: `calc(${100 - dividerPosition}% - 10px)`}} className={styles.construction__main_viewer}>
                        <div className={styles.construction__main_viewer_statuses}>
                            <div className={styles.construction__main_viewer_statuses_wrapper}>
                                <div className={styles.construction__main_viewer_statuses_single}>
                                    <span />
                                    <p>Started</p>
                                </div>
                                <div className={styles.construction__main_viewer_statuses_single}>
                                    <span />
                                    <p>In progress</p>
                                </div>
                                <div className={styles.construction__main_viewer_statuses_single}>
                                    <span />
                                    <p>Accepted</p>
                                </div>
                                <div className={styles.construction__main_viewer_statuses_single}>
                                    <span />
                                    <p>Declined</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.construction__main_viewer_container} />
                    </div>
                </section>

                <section data-type="main" className={styles.construction__divider} onMouseDown={handleMouseDown}>
                    <div className={styles.construction__divider_element}>
                        <span />
                    </div>
                </section>

                <section style={{height: `calc(${100 - mainDividerPosition}vh - 70px)`}} className={styles.construction__card}>

                </section>
            </div>
        </AccountLayout>
    )
}

export default Construction;