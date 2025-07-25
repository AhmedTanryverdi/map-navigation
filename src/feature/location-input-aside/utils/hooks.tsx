import React, { useContext } from "react";
import { GeoObjectCollection } from "yandex-maps";
import { clearOldRoute, fetchGeocodedPoints, setRoute } from "./helper";
import { CustomContext } from "@/shared/utils/Context";

export const useRoute = () => {
    const { map, dataRoute, setDataRoute } = useContext(CustomContext);
	const geoObjectCollectionRef = React.useRef<GeoObjectCollection | null>(
		null
	);

	const buildRoute = async () => {
		if (!map || typeof window.ymaps === "undefined" || !dataRoute) return;

		clearOldRoute(geoObjectCollectionRef, map);

		try {
			const firstPoint = await fetchGeocodedPoints(
				dataRoute.fromAddress!
			);

			const secondPoint = await fetchGeocodedPoints(dataRoute.toAddress!);

			if (!firstPoint || !secondPoint) return;

			setRoute(geoObjectCollectionRef, firstPoint, secondPoint, map);
		} catch (error) {
			console.error("Ошибка при построении маршрута:", error);
		}
	};

    return {
		buildRoute,
		map,
		dataRoute,
		setDataRoute,
	};
};
