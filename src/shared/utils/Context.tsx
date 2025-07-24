import { createContext, useState } from "react";

import { RouteDataType, YandexMapInstance } from "../types/types";

type ValueType = {
	map: YandexMapInstance | null;
	setMap: (value: YandexMapInstance | null) => void;
	dataRoute: RouteDataType;
	setDataRoute: (value: RouteDataType) => void;
};

export const CustomContext = createContext<Partial<ValueType>>({});

export const Context = (props: any) => {
	const [map, setMap] = useState<any>(null);
	const [dataRoute, setDataRoute] = useState<RouteDataType>({
		fromAddress: null,
		toAddress: null,
	});
	const value: ValueType = {
		map,
		setMap,
		dataRoute,
		setDataRoute,
	};
	return (
		<CustomContext.Provider value={value}>
			{props.children}
		</CustomContext.Provider>
	);
};
