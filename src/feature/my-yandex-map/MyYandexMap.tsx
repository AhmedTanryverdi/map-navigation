import React, { useEffect, useRef } from "react";
import { IPointGeometry } from "yandex-maps";
import "./styles.scss";

export let map: any = null;

export const MyYandexMap: React.FC = (): React.JSX.Element => {
	const mapRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window.ymaps !== "undefined" && mapRef.current != null) {
			window.ymaps.ready(async () => {
				if (
					typeof window.ymaps !== "undefined" &&
					mapRef.current != null
				) {
					try {
						const result = await window.ymaps.geolocation.get({
							provider: "browser",
						});
						const userLocation = (
							result.geoObjects.get(0)?.geometry as IPointGeometry
						)?.getCoordinates();

						let coordsToUse = Array.isArray(userLocation)
							? userLocation
							: [55.75, 37.6];

						if (!map) {
							map = new ymaps.Map(mapRef.current, {
								center: coordsToUse,
								zoom: 9,
							});
						}

						const customIconOptions = {
							iconLayout: "default#image",
							iconImageHref: "../../../public/icon-map-mark.png",
							iconImageSize: [32, 32],
							iconImageOffset: [-16, -32],
						};

						const placemark = new ymaps.Placemark(
							coordsToUse,
							{},
							customIconOptions
						);
						map.geoObjects.add(placemark);
					} catch (err) {
						console.error("Ошибка при инициализации карты:", err);
					}
				}
			});
		}

		return () => {
			if (map) {
				map.destroy();
				map = null;
			}
		};
	}, []);

	return <div ref={mapRef} id="map" className="yandex-map"></div>;
};
