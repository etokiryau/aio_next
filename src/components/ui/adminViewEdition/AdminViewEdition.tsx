import { FC, useState } from "react";
import Image from "next/image";

import GarbageIcon from "../_icons/GarbageIcon";
import AdminViewAdding from "@/components/adminViewAdding/AdminViewAdding";

import styles from "./adminViewEdition.module.scss";

interface IProps {
    order: number,
    src: string,
    title: string,
    handleDelete: () => void,
    onSubmit: (view: {src: string, title: string}, order?: number) => void
};

const AdminViewEdition: FC<IProps> = ({ src, title, handleDelete, onSubmit, order }) => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div className={styles.view}>
            <div onClick={() => handleDelete()} className={styles.view__delete}>
                <GarbageIcon />
            </div>
            <div onClick={() => setIsOpened(true)} className={styles.view__edit}>
                <p>Edit view</p>
            </div>
            <Image src={src} alt="render" width={320} height={620} />
            <p id={styles.name}>{title}</p>
            <AdminViewAdding
                order={order}
                image={src}
                title={title}
                state={[isOpened, setIsOpened]} 
                onSubmit={onSubmit} 
            />
        </div>
    )
}

export default AdminViewEdition;