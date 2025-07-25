import React from "react";
import { handleChange } from "../utils/helper";
import { RouteDataType } from "@/shared/types/types";

export const Input: React.FC<{
	dataRoute: RouteDataType | undefined;
	setDataRoute: ((value: RouteDataType) => void) | undefined;
	name: string;
	id: string;
	value: string;
	placeholder: string;
}> = ({
	dataRoute,
	setDataRoute,
	name,
	id,
    value,
	placeholder,
}): React.JSX.Element => {
	return (
		<label htmlFor={id}>
			<input
				type="text"
				name={name}
				id={id}
				className="input"
				value={value}
				onChange={(e) => handleChange(e, dataRoute, setDataRoute)}
				placeholder={placeholder}
			/>
		</label>
	);
};
