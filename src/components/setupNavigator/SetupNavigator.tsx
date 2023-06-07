import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";

import BackRotationIcon from "../ui/_icons/BackRotationIcon";
import ForwardRotationIcon from "../ui/_icons/ForwardRotationIcon";
import ResetIcon from "../ui/_icons/ResetIcon";
import MoveIcon from "../ui/_icons/MoveIcon";
import ZoomInIcon from "../ui/_icons/ZoomInIcon";
import ZoomOutIcon from "../ui/_icons/ZoomOutIcon";
import SearchIcon from "../ui/_icons/SearchIcon";

import styles from "./setupNavigator.module.scss";
interface IRoomsStyle {
    transform: string,
    top: string,
    left: string
};

const SetupNavigator: FC = () => {
    const [rotation, setRotation] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);
    const [position, setPosition] = useState<{x: number, y: number}>({ x: 100, y: 20 });
    const zoomRange = {min: 0.5, max: 5.5, step: 0.1};
    const [term, setTerm] = useState<string>('');
    const [currentRoom, setCurrentRoom] = useState<number>(0);
    const [currentFloor, setCurrentFloor] = useState<number>(0);

    const style: IRoomsStyle = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `rotate(${rotation}deg) scale(${scale})`
    };

    const floorsMapping: {[key: number]: string} = {
        0: '1st floor',
        1: '2nd floor',
        2: '3rd floor'
    };

    const changeRotation = (degree: number): void => {
        setRotation((prev) => prev + degree);
    };

    const changeScale = (step: number): void => {
        if (step > 0 && scale <= zoomRange.max || step < 0 && scale >= zoomRange.min) {
            setScale((prev) => prev + step)
        }
    };

    const setDefaultState = (): void => {
        setRotation(0);
        setScale(1);
        setPosition({x: 100, y: 20});
    };

    const changeCurrentRoom = (order: number): void => {
        setCurrentRoom(order)
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

    // const handleMouseLeave = (): void => {
    //     document.removeEventListener('wheel', handleWheel);
    //     document.removeEventListener('mouseleave', handleMouseLeave);
    // };

    // const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    //     document.addEventListener('wheel', handleWheel, { passive: false });
    //     document.addEventListener('mouseleave', handleMouseLeave);
    // };
    
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

    const roomsData = ['1. Room name', '1. Room name', '1. Room name','1. Room name' ,'1. Room name' ,'1. Room name', '1. Room name', '1. Room name', '1. Room name', '1. Room name']

    const searchRooms = (items: string[], term: string): string[] => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    const filteredRooms: string[] = searchRooms(roomsData, term);

    return (
        <>
            <div className={styles.setup__floor}>{floorsMapping[currentFloor]}</div>
            <div className={styles.setup}>
                <div className={styles.setup__layout}>
                    <div className={styles.setup__layout_scale}>
                        <p>Scale</p>
                        <input value={scale} onChange={(e) => setScale(Number(e.target.value))} type="range" min={zoomRange.min} max={zoomRange.max} step={zoomRange.step} />
                    </div>

                    <div className={styles.setup__layout_buttons}>
                        <div onClick={setDefaultState}><ResetIcon /></div>
                        <div><MoveIcon /></div>
                        <div onClick={() => changeScale(+zoomRange.step)}><ZoomInIcon /></div>
                        <div onClick={() => changeScale(-zoomRange.step)}><ZoomOutIcon /></div>
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
                        <div className={styles.setup__layout_rooms_wrapper}>
                            <Image src="/drawing51.png" alt="layout" width={900} height={900} quality={100} />
                        </div>
                    </div>

                </div>
                <div className={styles.setup__navigation}>
                    <p>Choose floor:</p>
                    <div className={styles.setup__navigation_floors}>
                        <p onClick={() => setCurrentFloor(0)} className={currentFloor === 0 ? styles.activeFloor : ''}>1st floor</p>
                        <p onClick={() => setCurrentFloor(1)} className={currentFloor === 1 ? styles.activeFloor : ''}>2nd floor</p>
                        <p onClick={() => setCurrentFloor(2)} className={currentFloor === 2 ? styles.activeFloor : ''}>3rd floor</p>
                    </div>
                    <div className={styles.setup__navigation_input}>
                        <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" placeholder="Search number or room" />
                        <div><SearchIcon /></div>
                    </div>
                    <div className={styles.setup__navigation_rooms}>
                        {filteredRooms.map((item, i) => {
                            return <p 
                                        key={i}
                                        onClick={() => changeCurrentRoom(i)}
                                        className={currentRoom === i ? styles.active : ''}
                                    >{item}</p>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetupNavigator;