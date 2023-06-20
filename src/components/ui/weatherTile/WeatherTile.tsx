import { FC } from "react";

import SunIcon from "../_icons/SunIcon";

import styles from "./weatherTile.module.scss";

interface IProps {
    city: string,
    temperature: number,
    weatherCondition: string,
    highTemp: number,
    lowTemp: number
};

const WeatherTile: FC<IProps> = ({ city, temperature, weatherCondition, highTemp, lowTemp }) => {

    return (
        <div className={styles.weather}>
            <div className={styles.weather__up}>
                <p id={styles.city}>{city}</p>
                <p id={styles.temperature}>{temperature}°</p>
            </div>
            <div className={styles.weather__down}>
                <SunIcon />
                <p id={styles.weatherCondition}>{weatherCondition}</p>
                <p id={styles.temperatureSpread}>H:{highTemp}° L:{lowTemp}°</p>
            </div>
        </div>
    )
}

export default WeatherTile