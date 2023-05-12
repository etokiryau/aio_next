import { FC } from "react";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";

import styles from './questiones.module.scss';

const Questiones: FC = () => {

    return (
        <MainLayout title="FAQ">
            <div className={styles.questiones}>
                <h1>Frequently Asked Questions</h1>
                <h2>How can we help?</h2>
            </div>
        </MainLayout>
    )
}

export default Questiones;