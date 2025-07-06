import React from "react";
import { MyYandexMap } from "../my-yandex-map/MyYandexMap";

export const Home: React.FC = (): React.JSX.Element => {
	return <div className="home">
        <MyYandexMap />
    </div>;
};
