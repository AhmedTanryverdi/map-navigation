import { RouteDataType, YandexMapInstance } from "@/shared/types/types";
import { IPointGeometry } from "yandex-maps";

export const handleChange = (
	event: React.ChangeEvent<HTMLInputElement>,
	dataRoute: RouteDataType | null | undefined,
	setDataRoute: ((value: RouteDataType) => void) | undefined
) => {
	const { name, value } = event.target;

	if (dataRoute && setDataRoute) {
		setDataRoute({ ...dataRoute, [name]: value });
	}
};

export const clearOldRoute = (
	geoObjectCollectionRef: any,
	map: YandexMapInstance | null | undefined
) => {
	if (geoObjectCollectionRef?.current !== null) {
		geoObjectCollectionRef.current.removeAll();
		map?.geoObjects.remove(geoObjectCollectionRef.current);
	}
};

export const fetchGeocodedPoints = async (address: string) => {
	const geocoderResultFrom = await window.ymaps.geocode(address);

	return (
		geocoderResultFrom.geoObjects?.get(0).geometry as IPointGeometry
	)?.getCoordinates();
};

export const setRoute = (
	geoObjectCollectionRef: any,
	firstPoint: number[],
	secondPoint: number[],
	map: YandexMapInstance | null | undefined
) => {
	const multiRoute = new window.ymaps.multiRouter.MultiRoute(
		{
			referencePoints: [firstPoint, secondPoint],
			params: {},
		},
		{}
	);

	// Создаем новую коллекцию и добавляем туда маршрут
	geoObjectCollectionRef.current = new ymaps.GeoObjectCollection();
	geoObjectCollectionRef.current.add(multiRoute);

	// Добавляем новую коллекцию на карту
	map?.geoObjects.add(geoObjectCollectionRef.current);

	multiRoute.model.events.add("change", () => {
		map?.setBounds(
			multiRoute.properties.get("boundedBy", []) as number[][],
			{
				checkZoomRange: true,
			}
		);
	});
};
