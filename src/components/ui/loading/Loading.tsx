"use client";
import { FC } from "react";

import styles from "./loading.module.scss";

interface ILoadingProps {
    isLoading: boolean,
    progress: number
};

const Loading: FC<ILoadingProps> = ({ isLoading, progress }) => {

    return (
        <div className={`${styles.loading} ${isLoading ? styles.active : ''}`}>
            <section>
                <h2>aio – private construction ecosystem</h2>
                <div><div style={{width: `${progress}%`}}></div></div>
                <p>{progress}%</p>
            </section>
        </div>
    )
}

export default Loading;