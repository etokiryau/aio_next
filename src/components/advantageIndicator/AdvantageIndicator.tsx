import { FC, useState, useRef, useEffect } from "react";

import styles from "./advantageIndicator.module.scss";

interface IProps {
    title: string,
    target: number,
    duration: number,
    multiplier?: number
};

const AdvantageIndicator: FC<IProps> = ({title, target, duration, multiplier = 1 }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLDivElement>(null);
    const smooth: number = 10;

    const animateCount = (target: number, duration: number) => {
        let start: null | number = null;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            
            const progress: number = Math.min((timestamp - start) / duration, 1);

            setCount(Math.floor(progress * target * smooth));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    useEffect(() => {
        const handleScroll = () => {
            const { top, bottom} = counterRef.current?.getBoundingClientRect() ?? { top: 0, bottom: 0 };
            if (top >= 0 && bottom <= window.innerHeight) {
                animateCount(target, duration);
                window.removeEventListener('scroll', handleScroll);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
         
    }, [target, duration]);

    const roundedCounter: number = Math.round(count / smooth);

    return (
        <div className={styles.indicator} ref={counterRef}>
            <p className={styles.indicator_name}>{title}</p>
            <div className={styles.indicator_value}>
                <span id={styles.circle} />
                <span id={styles.line} style={{width: `${count * multiplier / smooth}%`}}>
                    {count > 0 && <p>{roundedCounter}%</p>}
                </span>
            </div>
        </div>
    )
}

export default AdvantageIndicator;