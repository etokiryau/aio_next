import { FC } from "react";

import AccountLayout from "@/components/layouts/accountLayout/AccountLayout";
import DateTile from "@/components/ui/dateTile/DateTile";
import EfficiencyTile from "@/components/ui/effeciencyTile/EfficiencyTile";
import WeatherTile from "@/components/ui/weatherTile/WeatherTile";
import LocationTile from "@/components/ui/locationTile/LocationTile";
import { useCopyLinkToClipboard } from "@/hooks/useCopylinkToClipBoard";

import styles from "./dashboard.module.scss";

const Dashboard: FC = () => {
    const [, copyLinkToClipboard] = useCopyLinkToClipboard();

    return (
        <AccountLayout title="Dashboard">
            <div className={styles.dashboard}>
                <section className={styles.dashboard__tiles}>
                    <DateTile month="June" day="13" currentWork="Entrance doors installation" />
                    <EfficiencyTile value={12} />
                    <WeatherTile city="Porto" temperature={29} weatherCondition="Sunny" highTemp={30} lowTemp={13} />
                    <LocationTile coordinates="123131" callback={(e) => copyLinkToClipboard(e, false)} />
                </section>
            </div>
        </AccountLayout>
    )
}

export default Dashboard;