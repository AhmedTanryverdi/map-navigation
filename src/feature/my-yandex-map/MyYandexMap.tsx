import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, RouteDataType } from "../../shared/utils/types";
import "./styles.scss";

export let map: any = null;

export const MyYandexMap: React.FC = (): React.JSX.Element => {
	const mapRef = useRef<HTMLDivElement>(null);
	const routeData = useSelector<RootState, RouteDataType>(
		(state) => state.routeData
	);

	useEffect(() => {
		//@ts-ignore
		if (typeof window.ymaps !== "undefined" && mapRef.current != null) {
			//@ts-ignore
			window.ymaps.ready(async () => {
				if (
					//@ts-ignore
					typeof window.ymaps !== "undefined" &&
					mapRef.current != null
				) {
					try {
						//@ts-ignore
						const result = await window.ymaps.geolocation.get({
							provider: "browser",
						});
						const userLocation = result.geoObjects
							.get(0)
							?.geometry?.getCoordinates();

						let coordsToUse = Array.isArray(userLocation)
							? userLocation
							: [55.75, 37.6];

						if (!map) {
							//@ts-ignore
							map = new ymaps.Map(mapRef.current, {
								center: coordsToUse, // Начальная точка — центр Москвы
								zoom: 9,
							});
						}

						const customIconOptions = {
							iconLayout: "default#image",
							iconImageHref: "../../../public/icon-map-mark.png",
							iconImageSize: [32, 32],
							iconImageOffset: [-16, -32],
						};

						//@ts-ignore
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
