import { FC, useState, useEffect, useRef } from "react";

import CrossIcon from "../ui/CrossIcon";

import styles from "./modelTile.module.scss";

interface IProps {
    type: 'model' | 'tour',
    preview: string,
    src: string
};

const ModelTile: FC<IProps> = ({ type, preview, src }) => {
    const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
    const [popup, setPopup] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const modelContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.style.overflow = popup ? "hidden" : '';
    }, [popup])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        const elementRadius = 67.5;
        const containerWidth: number | undefined = containerRef.current?.clientWidth;
        const containerHeight: number | undefined = containerRef.current?.clientHeight;
        let x: number, y: number;

        const { top, left } = e.currentTarget.getBoundingClientRect();
        const currentX: number = e.clientX - left;
        const currentY: number = e.clientY - top;

        if (containerWidth && currentX > containerWidth - elementRadius) {
            x = containerWidth - elementRadius;
        } else if (currentX < elementRadius) {
            x = elementRadius;
        } else {
            x = currentX;
        }

        if (containerHeight && currentY > containerHeight - elementRadius) {
            y = containerHeight - elementRadius;
        } else if (currentY < elementRadius) {
            y = elementRadius;
        } else {
            y = currentY;
        }
        setMousePosition({ x, y });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>): void => {
        setMousePosition(null);
    };

    const cursorStyle = {
        top: mousePosition ? mousePosition.y : '50%',
        left: mousePosition ? mousePosition.x : '50%'
    };

    return (
        <>
            <div
                ref={containerRef}
                className={styles.model} 
                style={{backgroundImage: `url(${preview})`}}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    onClick={() => setPopup(true)}
                    style={cursorStyle} 
                    className={styles.model__cursor}
                >{type === 'model' ? '3D model' : 'Virtual tour'}</div>
                
            </div>
            <div className={`${styles.model__popup} ${popup ? styles.activePopup : ''}`}>
                <div className={styles.model__popup_content}>
                    <div className={styles.model__popup_content_close} onClick={() => setPopup(false)}><CrossIcon /></div>
                    {
                        type === 'tour' && 
                        <iframe src={src} id="vagonFrame" allow="microphone  *; clipboard-read *; clipboard-write *; encrypted-media *;" />
                    }
                    {
                        type === 'model' &&
                        <div ref={modelContainerRef} className={styles.model__popup_content_model} />
                    }
                </div>
            </div>
        </>
    )
}

export default ModelTile;