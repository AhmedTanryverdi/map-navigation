import { LocationInputAside } from "../feature/location-input-aside/LocationInputAside";
import { MyYandexMap } from "../feature/my-yandex-map/MyYandexMap";
import "./app.scss";

function App() {
	return (
		<div className="app">
			<div className="container">
				<div className="content">
					<LocationInputAside />
					<MyYandexMap />
				</div>
			</div>
		</div>
	);
}

export default App;
