import { LocationInputAside } from "../feature/location-input-aside/LocationInputAside";
import { MyYandexMap } from "../feature/my-yandex-map/MyYandexMap";
import { Context } from "../shared/utils/Context";
import "./app.scss";

function App() {
	return (
		<Context>
			<div className="app">
				<div className="container">
					<div className="content">
						<LocationInputAside />
						<MyYandexMap />
					</div>
				</div>
			</div>
		</Context>
	);
}

export default App;
