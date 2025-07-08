import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";


let map: any;
export const MyYandexMap: React.FC = (): React.JSX.Element => {
	const mapRef = useRef<HTMLDivElement>(null);

	const [initialCoords, setInitialCoords] = useState<
		[number, number] | undefined
	>(undefined);

	useEffect(() => {
		//@ts-ignore
		if (typeof window.ymaps !== "undefined" && mapRef.current != null) {
			//@ts-ignore
			window.ymaps.ready(async () => {
				try {
					//@ts-ignore
					const result = await window.ymaps.geolocation.get({
						provider: "browser",
					});
					const userLocation = result.geoObjects
						.get(0)
						?.geometry?.getCoordinates();

					if (Array.isArray(userLocation)) {
						//@ts-ignore
						setInitialCoords(userLocation);
					} else {
						setInitialCoords([55.75, 37.6]);
					}
				} catch (err) {
					console.error(
						"Ошибка при определении местоположения:",
						err
					);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (initialCoords && mapRef.current != null) {
			//@ts-ignore
			map = new window.ymaps.Map(mapRef.current, {
				center: initialCoords,
				zoom: 9,
			});
		}

		return () => {
			if (map) {
				map.destroy();
				map = null;
			}
		};
	}, [initialCoords]);
	return <div ref={mapRef} id="map" className="yandex-map"></div>;
};
