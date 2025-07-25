import React, { useState } from "react";
import { Button } from "@/shared/components/Button";
import { Form } from "./ui/Form";
import "./styles.scss";

export const LocationInputAside: React.FC = (): React.JSX.Element => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="locationInputAside" data-open={isOpen}>
			<div className="content">
				<Button
					type="button"
					className="openBlockBtn"
					children={"<"}
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				/>
				<h2 className="title">Api Yandex Maps</h2>
				<Form />
			</div>
		</div>
	);
};
