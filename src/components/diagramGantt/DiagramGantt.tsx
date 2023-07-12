import { FC } from "react";

import SearchIcon from "../ui/_icons/SearchIcon";
import TriangleIcon from "../ui/_icons/TriangleIcon";

import styles from "./diagramGantt.module.scss";

const DiagramGantt: FC = () => {


    const dates = ['June, 2023', 'July, 2023', 'August, 2023', 'September, 2023', 'October, 2023', 'November, 2023', 'December, 2023', 'January, 2024'];

    const datesContent: JSX.Element[] = dates.map((item, i) => {
        return (
            <div key={i} className={styles.diagram__header_dates_content_single}>
                {item}
            </div>
        )
    });

    return (
        <div className={styles.diagram}>
            <div className={styles.diagram__header}>
                <div className={styles.diagram__header_search}>
                    <input type="text" placeholder="Search for work" />
                    <SearchIcon />
                </div>
                <div className={styles.diagram__header_dates}>
                    <div className={styles.diagram__header_dates_arrow}>
                        <TriangleIcon />
                    </div>
                    <div className={styles.diagram__header_dates_content}>
                        <div className={styles.diagram__header_dates_content_wrapper}>
                            {datesContent}
                        </div>
                    </div>
                    <div className={styles.diagram__header_dates_arrow}>
                        <TriangleIcon />
                    </div>
                </div>
            </div>

            <div className={styles.diagram__main}>
                <div className={styles.diagram__main_works}>

                </div>
                <div className={styles.diagram__main_chart}>

                </div>
            </div>
        </div>
    )
}

export default DiagramGantt;