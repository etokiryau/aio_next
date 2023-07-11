import { FC, useRef, useState } from "react";
import Image from "next/image";

import CrossIcon from "../ui/_icons/CrossIcon";
import GarbageIcon from "../ui/_icons/GarbageIcon";

import styles from "./adminViewAdding.module.scss";

interface IProps {
    order?: number,
    onSubmit: (view: {src: string, title: string}, order?: number) => void,
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    image: string,
    title: string
};

const AdminViewAdding: FC<IProps> = ({ onSubmit, state, image: initialImage, title, order }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(initialImage);
    const [viewName, setViewName] = useState(title);
    const [isOpened, setIsOpened] = state;

    const togglePopup = (event: React.MouseEvent<HTMLDivElement>) => {
        event?.target === popupRef.current && setIsOpened(prev => !prev);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
        
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const imageSrc = e.target?.result as string;
                setImage(imageSrc);
            };
        
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (): void => {
        if (order) {
            onSubmit({title: viewName, src: image}, order);
            setIsOpened(false);
        } else {
            onSubmit({title: viewName, src: image});
            setImage('');
            setViewName('')
            setIsOpened(false);
        }
    };

    return (
        <div ref={popupRef} onClick={togglePopup} className={`${styles.viewAdding} ${isOpened ? styles.active : ''}`}>
            <div className={styles.viewAdding__content}>
                {!image && <div className={styles.viewAdding__content_skeleton}>
                    <button onClick={() => inputRef.current?.click()} type="button">Add image</button>
                    <input ref={inputRef} onChange={handleFileChange} style={{display: 'none'}} type="file" id="render" name="render" accept="image/*" />
                </div>}
                {image && <div className={styles.viewAdding__content_image}>
                    <Image src={image} alt="render" width={380} height={200} />
                    <div onClick={() => setImage('')} className={styles.viewAdding__content_image_delete}>
                        <GarbageIcon />
                    </div>
                </div>}
                <input value={viewName} onChange={(e) => setViewName(e.target.value)} type="text" placeholder="Fill view name" />
                <button 
                    id={styles.submitButton} 
                    onClick={handleSubmit}
                    disabled={Boolean(!(viewName && image))} 
                    type="button">Submit</button>
                
                <div onClick={() => setIsOpened(false)} className={styles.viewAdding__content_close}>
                    <CrossIcon />
                </div>
            </div>
        </div>
    )
}

export default AdminViewAdding;