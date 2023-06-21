import React, { FC } from 'react';

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const _apiKey = 'AIzaSyBT6vdXuYz-I4-aghki8iJunxA1nkG2s34';

const containerStyle = {
	width: '100%',
	height: '100%',
    borderRadius: '8px',
	zIndex: '0'
};

const options = {
	streetViewControl: false,
	mapTypeControl: false,
};

interface IProps {
    center: {
        lat: number,
        lng: number
    }
};

const GoogleMapService: FC<IProps> = ({ center }) => {
	return (
		<LoadScript googleMapsApiKey={_apiKey}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				options={options}
				zoom={10}
			>
				<MarkerF position={center} />
			</GoogleMap>
		</LoadScript>
	);
}

export default React.memo(GoogleMapService);