'use client';

import { FC } from "react";

import GoogleMapService from "@/services/GoogleMapService";

import styles from "./locationTile.module.scss";

interface IProps {
    callback: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    coordinates: {lat: number, lng: number}
};

const LocationTile: FC<IProps> = ({ callback, coordinates }) => {
    const copiedCoordinates = String(`${coordinates.lat} ${coordinates.lng}`);

    return (
        <div className={styles.location}>
            <GoogleMapService center={coordinates} />
            <div data-link={copiedCoordinates} onClick={callback} className={styles.location__copy}>
                <p>Share location</p>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.87275 0.137751L14.2552 6.27275C15.2483 6.76442 15.2483 8.23525 14.2552 8.72775L1.87275 14.8628C0.751495 15.4186 -0.412505 14.1844 0.143246 13.0278L2.50725 8.10775C2.691 7.72525 2.691 7.27442 2.50725 6.89275L0.143246 1.97275C-0.411755 0.816085 0.750745 -0.418916 1.87275 0.137751Z"/>
                </svg>
            </div>
        </div>
    )
}

export default LocationTile