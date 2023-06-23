import { FC, useState } from "react";

import WarningTriangleIcon from "../ui/_icons/WarningTriangleIcon";
import StatusIcon from "../ui/_icons/StatusIcon";
import CommentIcon from "../ui/_icons/CommentIcon";

import styles from "./actionsTab.module.scss";

const ActionsTab: FC = () => {
    const [currentSection, setCurrentSection] = useState<string>('all');

    const iconMap: {[key: string]: React.ReactNode} = {
        'status': <StatusIcon />,
        'comment': <CommentIcon />,
        'warning': <WarningTriangleIcon />
    };

    const notificationsData = [
        {
            isViewed: false,
            type: 'status',
            title: 'New status',
            date: '2 min'
        },
        {
            isViewed: false,
            type: 'warning',
            title: 'Inappropriate weather!',
            date: '5 min'
        },
        {
            isViewed: true,
            type: 'comment',
            title: 'New comment',
            date: 'Today'
        },
        {
            isViewed: true,
            type: 'status',
            title: 'New status',
            date: 'Yesterday'
        },
        {
            isViewed: false,
            type: 'comment',
            title: 'New comment',
            date: '10.06.2023'
        },
        {
            isViewed: true,
            type: 'warning',
            title: 'Inappropriate weather!',
            date: '06.06.2023'
        }
    ];

    const filteredNotifications = notificationsData.filter((item) => {
        return currentSection === 'all' || item.type === currentSection;
    });

    const notificationsContent: JSX.Element[] = filteredNotifications.map((item, i) => {
        return (
            <div key={i} className={styles.actions__content_list_single}>
                <div className={styles.actions__content_list_single_left}>
                    {iconMap[item.type]}
                    <p>Status change to <span>“Completed”</span> on work <span>“Entrance door installation first floor doors”</span></p>
                </div>
                <div className={styles.actions__content_list_single_right}>
                    <p>{item.date}</p>
                    <button type="button">Open</button>
                </div>
            </div>
        )
    });

    return (
        <div className={styles.actions}>
            <h3>Key actions</h3>
            <div className={styles.actions__content}>
                <div className={styles.actions__content_toggler}>
                    <button onClick={() => setCurrentSection('all')} className={currentSection === 'all' ? styles.activeButton : ''} type="button">All</button>
                    <button onClick={() => setCurrentSection('warning')} className={currentSection === 'warning' ? styles.activeButton : ''} type="button"><WarningTriangleIcon /> Errors</button>
                    <button onClick={() => setCurrentSection('comment')} className={currentSection === 'comment' ? styles.activeButton : ''} type="button"><CommentIcon /> Comments</button>
                    <button onClick={() => setCurrentSection('status')} className={currentSection === 'status' ? styles.activeButton : ''} type="button"><StatusIcon /> Statuses</button>
                </div>
                <div className={styles.actions__content_list}>
                    {notificationsContent}
                </div>
            </div>
        </div>
    )
}

export default ActionsTab;