import { useContext, useMemo } from "react";
import { fetchUserLocation } from "./helper";
import { CustomContext } from "@/shared/utils/Context";

export const useInitializeMap = (mapRef: any) => {
	const { map, setMap } = useContext(CustomContext);
	const initializeMap = useMemo(() => {
		return async () => {
			await window.ymaps.ready();

			const coords = await fetchUserLocation();

			if (!map && setMap) {
				const newMap = new window.ymaps.Map(mapRef.current!, {
					center: coords,
					zoom: 9,
				});

				setMap(newMap);
			}
		};
	}, [map]);

	return {
		initializeMap,
		map,
		setMap,
	};
};
