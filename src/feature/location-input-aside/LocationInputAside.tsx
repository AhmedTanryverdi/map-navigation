import React from "react";
import "./styles.scss";

export const LocationInputAside: React.FC = (): React.JSX.Element => {
	return (
		<div className="locationInputAside">
			<div className="container">
				<div className="content">
					<h2 className="title">Api Yandex Maps</h2>
					<label htmlFor="from">
						<input type="text" placeholder="Откуда?" />
					</label>
					<label htmlFor="to">
						<input type="text" placeholder="Куда?" />
					</label>
				</div>
			</div>
		</div>
	);
};
