import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
	RootState,
	RouteDataType,
	useAppDispatch,
} from "../../shared/utils/types";
import { setRouteData } from "../slices/routeSlice";
import { map } from "../my-yandex-map/MyYandexMap";
import "./styles.scss";

export const LocationInputAside: React.FC = (): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState(true);
	const dispatch = useAppDispatch();
	const routeData = useSelector<RootState, RouteDataType>(
		(state) => state.routeData
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		dispatch(setRouteData({ [name]: value }));
	};

	const geoObjectCollectionRef =
		//@ts-ignore
		React.useRef<ymaps.GeoObjectCollection | null>(null);
	const clearOldRoute = () => {
		if (geoObjectCollectionRef.current !== null) {
			geoObjectCollectionRef.current.removeAll();
			map.geoObjects.remove(geoObjectCollectionRef.current);
		}
	};
	const buildRoute = async () => {
		clearOldRoute();

		//@ts-ignore
		if (!map || typeof window.ymaps === "undefined") return;

		try {
			//@ts-ignore
			const geocoderResultFrom = await window.ymaps.geocode(
				routeData.fromAddress
			);

			//@ts-ignore
			const geocoderResultTo = await window.ymaps.geocode(
				routeData.toAddress
			);

			const firstPoint = geocoderResultFrom.geoObjects
				.get(0)
				.geometry.getCoordinates();

			const secondPoint = geocoderResultTo.geoObjects
				.get(0)
				.geometry.getCoordinates();

			const multiRoute =
				//@ts-ignore
				new window.ymaps.multiRouter.MultiRoute(
					{
						referencePoints: [firstPoint, secondPoint],
					},
					{}
				);

			// Создаем новую коллекцию и добавляем туда маршрут
			//@ts-ignore
			geoObjectCollectionRef.current = new ymaps.GeoObjectCollection();
			geoObjectCollectionRef.current.add(multiRoute);

			// Добавляем новую коллекцию на карту
			map.geoObjects.add(geoObjectCollectionRef.current);

			multiRoute.model.events.add("change", () => {
				map.setBounds(multiRoute.properties.get("boundedBy"), {
					checkZoomRange: true,
				});
			});
		} catch (error) {
			console.error("Ошибка при построении маршрута:", error);
		}
	};

	return (
		<div className="locationInputAside" data-open={isOpen}>
			<div className="content">
				<button
					type="button"
					className="openBlockBtn"
					onClick={() => setIsOpen(!isOpen)}
				>
					{"<"}
				</button>
				<h2 className="title">Api Yandex Maps</h2>
				<form
					onSubmit={(event: any) => event.preventDefault()}
					className="form"
				>
					<label htmlFor="from">
						<input
							type="text"
							name="fromAddress"
							id="from"
							className="input"
							value={routeData.fromAddress}
							onChange={handleChange}
							placeholder="Откуда?"
						/>
					</label>
					<label htmlFor="to">
						<input
							type="text"
							name="toAddress"
							id="to"
							className="input"
							value={routeData.toAddress}
							onChange={handleChange}
							placeholder="Куда?"
						/>
					</label>
					<button
						type="submit"
						onClick={() => buildRoute()}
						className="formBtn"
					>
						Построить маршрут
					</button>
				</form>
			</div>
		</div>
	);
};
