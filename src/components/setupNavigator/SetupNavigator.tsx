import { FC, useState, useRef } from "react";

import BackRotationIcon from "../ui/BackRotationIcon";
import ForwardRotationIcon from "../ui/ForwardRotationIcon";
import ResetIcon from "../ui/ResetIcon";
import MoveIcon from "../ui/MoveIcon";

import styles from "./setupNavigator.module.scss";

interface IRoomsStyle {
    transform: string,
    top: string,
    left: string
}

const SetupNavigator: FC = () => {
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState<{x: number, y: number}>({ x: 100, y: 20 });
    const zoomRange = {min: 0.5, max: 1.5, step: 0.1};

    const style: IRoomsStyle = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `rotate(${rotation}deg) scale(${scale})`
    };

    const changeRotation = (degree: number): void => {
        setRotation((prev) => prev + degree);
    };

    const setDefaultState = (): void => {
        setRotation(0);
        setScale(1);
        setPosition({x: 100, y: 20});
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        const initialX = event.clientX - position.x;
        const initialY = event.clientY - position.y;
        
        document.body.style.userSelect = 'none';
    
        const handleMouseMove = (event: MouseEvent): void => {
            let newX = event.clientX - initialX;
            let newY = event.clientY - initialY;
        
            setPosition({ x: newX, y: newY });
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.body.style.userSelect = '';
        });
    };
    const handleWheel = (event: WheelEvent): void => {
        event.preventDefault();

        const delta = event.deltaY;
        const isScrollingUp = delta < 0;

        if (isScrollingUp && scale < zoomRange.max) {
            setScale((prev) => prev + zoomRange.step);
        }
        if (!isScrollingUp && scale > zoomRange.min) {
            setScale((prev) => prev - zoomRange.step);
        }
    };

    const handleMouseLeave = (): void => {
        document.removeEventListener('wheel', handleWheel);
        document.removeEventListener('mouseleave', handleMouseLeave);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
        

        
        
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('mouseleave', handleMouseLeave);
    };
    

    // const handleMouseEnter = (): void => {
    //     document.addEventListener('wheel', handleWheel);
    // };
    
    // const handleMouseLeave = (): void => {
    //     document.removeEventListener('wheel', handleWheel);
    // };
    
    // const handleWheel = (event: WheelEvent): void => {
    //     event.preventDefault();

    //     const delta = event.deltaY;
    //     const isScrollingUp = delta < 0;

    //     if (isScrollingUp && scale < zoomRange.max) {
    //         setScale((prev) => prev + zoomRange.step);
    //     }
    //     if (!isScrollingUp && scale > zoomRange.min) {
    //         setScale((prev) => prev - zoomRange.step);
    //     }
    // };

    return (
        <div className={styles.setup}>
            <div className={styles.setup__layout}>
                <div className={styles.setup__layout_title}>1st floor</div>
                <div className={styles.setup__layout_scale}>
                    <p>Scale</p>
                    <input value={scale} onChange={(e) => setScale(Number(e.target.value))} type="range" min={zoomRange.min} max={zoomRange.max} step={zoomRange.step} />
                </div>
                <div className={styles.setup__layout_buttons}>
                    <div onClick={setDefaultState}><ResetIcon /></div>
                    <div><MoveIcon /></div>
                    <div onClick={() => changeRotation(-90)}><BackRotationIcon /></div>
                    <div onClick={() => changeRotation(90)}><ForwardRotationIcon /></div>
                </div>
                <div 
                    style={style} 
                    className={styles.setup__layout_rooms}
                    onMouseDown={handleMouseDown}
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                >

                </div>
            </div>
            <div className={styles.setup__navigation}>
                

            </div>
        </div>
    )
}

export default SetupNavigator;