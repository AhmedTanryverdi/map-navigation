import React, { useEffect, useRef } from "react";
import { useInitializeMap } from "./utils/hooks";
import "./styles.scss";

export const MyYandexMap: React.FC = (): React.JSX.Element => {
	const mapRef = useRef<HTMLDivElement>(null);
	const { initializeMap, map, setMap } = useInitializeMap(mapRef);

	useEffect(() => {
		initializeMap();
		return () => {
			if (map && setMap) {
				map.destroy();
				setMap(null);
			}
		};
	}, [map]);

	return <div ref={mapRef} id="map" className="yandex-map"></div>;
};
