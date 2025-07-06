import React, { useEffect, useRef } from "react";
import "./styles.scss";

let mapInstance = false;
export const MyYandexMap: React.FC = (): React.JSX.Element => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			!mapInstance &&
			//@ts-ignore
			typeof window.ymaps !== "undefined" &&
			mapRef.current != null
		) {
			mapInstance = true;
			//@ts-ignore
			window.ymaps.ready(function () {
				//@ts-ignore
				const map = new window.ymaps.Map(mapRef.current!, {
					center: [55.75, 37.6],
					zoom: 9,
				});
			});
		}
	}, []);
	return <div ref={mapRef} id="map" className="yandex-map"></div>;
};
