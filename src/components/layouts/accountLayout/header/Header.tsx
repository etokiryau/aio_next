import { FC } from "react";

import ContractorIcon from "@/components/ui/_icons/ContractorIcon";
import BellIcon from "@/components/ui/_icons/BellIcon";

import styles from "./header.module.scss";
import StatusIcon from "@/components/ui/_icons/StatusIcon";
import CommentIcon from "@/components/ui/_icons/CommentIcon";
import WarningIcon from "@/components/ui/toggler/WarningIcon";

const Header: FC = () => {

    const iconMap: {[key: string]: React.ReactNode} = {
        'status': <StatusIcon />,
        'comment': <CommentIcon />,
        'warning': <WarningIcon />
    };

    const notificationsData = [
        {
            type: 'status',
            title: 'New status',
            date: '2 min'
        },
        {
            type: 'warning',
            title: 'Inappropriate weather!',
            date: '5 min'
        },
        {
            type: 'comment',
            title: 'New comment',
            date: 'Today'
        },
        {
            type: 'status',
            title: 'New status',
            date: 'Yesterday'
        },
        {
            type: 'comment',
            title: 'New comment',
            date: '10.06.2023'
        },
        {
            type: 'warning',
            title: 'Inappropriate weather!',
            date: '06.06.2023'
        }
    ];

    const notificationsContent = notificationsData.map((item, i) => {
        return (
            <div key={i} className={styles.header__buttons_notifications_popup_single}>
                <div className={styles.header__buttons_notifications_popup_single_title}>
                    {iconMap[item.type]}
                    <p>{item.title}</p>
                </div>
                <p id={styles.date}>{item.date}</p>
            </div>
        )
    })

    return (
        <div className={styles.header}>
            <h2>Project A</h2>
            <div className={styles.header__buttons}>
                <button className={styles.header__buttons_contractors} type="button">
                    <ContractorIcon />
                    <p>Contractors</p>
                </button>
                <div className={styles.header__buttons_notifications}>
                    <BellIcon />
                    <div className={styles.header__buttons_notifications_popup}>
                        <div className={styles.header__buttons_notifications_popup_content}>
                            {notificationsContent}
                        </div>
                    </div>
                </div>
                <div className={styles.header__buttons_profile}>
                    <div className={styles.header__buttons_profile_preview}>
                        NN
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;