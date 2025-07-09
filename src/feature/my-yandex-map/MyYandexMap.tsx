import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

let map: any;

export const MyYandexMap: React.FC = (): React.JSX.Element => {
	const mapRef = useRef<HTMLDivElement>(null);

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

					let coordsToUse = Array.isArray(userLocation)
						? userLocation
						: [55.75, 37.6];

					//@ts-ignore
					map = new ymaps.Map(mapRef.current, {
						center: coordsToUse,
						zoom: 9,
					});

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

					const moscowCoords = [55.75, 37.6];

					//@ts-ignore
					const multiRoute = new window.ymaps.multiRouter.MultiRoute(
						{
							referencePoints: [moscowCoords, coordsToUse],
						},
						{}
					);

					map.geoObjects.add(multiRoute);

					multiRoute.model.events.add("change", () => {
						map.setBounds(multiRoute.properties.get("boundedBy"), {
							checkZoomRange: true,
						});
					});
				} catch (err) {
					console.error("Ошибка при создании карты:", err);
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
