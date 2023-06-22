import { FC } from "react";

import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";
import DateTile from "@/components/ui/dateTile/DateTile";
import EfficiencyTile from "@/components/ui/effeciencyTile/EfficiencyTile";
import WeatherTile from "@/components/ui/weatherTile/WeatherTile";
import LocationTile from "@/components/ui/locationTile/LocationTile";
import { useCopyLinkToClipboard } from "@/hooks/useCopylinkToClipBoard";
import ProgressChart from "@/components/progressChart/ProgressChart";
import ProgressDates from "@/components/ui/progressDates/ProgressDates";
import ProgressPurchase from "@/components/ui/progressPurchase/ProgressPurchase";
import ActionsTab from "@/components/actionsTab/ActionsTab";

import styles from "./dashboard.module.scss";

const Dashboard: FC = () => {
    const [CopyingMessage, copyLinkToClipboard] = useCopyLinkToClipboard('Location copied to the clipboard');

    return (
        <AccountLayout title="Dashboard">
            <div className={styles.dashboard}>
                <section className={styles.dashboard__tiles}>
                    <DateTile month="June" day="13" currentWork="Entrance doors installation" />
                    <EfficiencyTile value={12} />
                    <WeatherTile city="Porto" temperature={29} weatherCondition="Sunny" highTemp={30} lowTemp={13} />
                    <LocationTile coordinates={{lat: 50.875, lng: -0.2}} callback={(e) => copyLinkToClipboard(e, false)} />
                </section>
                <section className={styles.dashboard__progress}>
                    <div className={styles.dashboard__progress_left}>
                        <ProgressChart />
                    </div>
                    <div className={styles.dashboard__progress_right}>
                        <div className={styles.dashboard__progress_right_content}>
                            <ProgressDates />
                        </div>
                        <div className={styles.dashboard__progress_right_content}>
                            <ProgressPurchase value={85} />
                        </div>
                    </div>
                </section>
                <section className={styles.dashboard__actions}>
                    <ActionsTab />
                </section>
            </div>
            {CopyingMessage}
        </AccountLayout>
    )
}

export default Dashboard;