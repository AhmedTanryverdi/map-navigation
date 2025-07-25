import { IPointGeometry } from "yandex-maps";

export async function fetchUserLocation() {
	try {
		const result = await window.ymaps.geolocation.get({
			provider: "browser",
		});
		const geoObject = result.geoObjects.get(0);

		if (geoObject instanceof window.ymaps.GeoObject) {
			const geometry = geoObject.geometry as IPointGeometry;
			return geometry.getCoordinates() ?? [55.75, 37.6];
		}
	} catch (err) {
		console.error("Ошибка определения местоположения:", err);
	}

	return [55.75, 37.6];
}