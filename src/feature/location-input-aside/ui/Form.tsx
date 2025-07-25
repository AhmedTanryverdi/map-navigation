import React from "react";
import { Input } from "./Input";
import { Button } from "@/shared/components/Button";
import { useRoute } from "../utils/hooks";

export const Form: React.FC = (): React.JSX.Element => {
	const { buildRoute, dataRoute, setDataRoute } = useRoute();
	return (
		<form
			onSubmit={(event: any) => event.preventDefault()}
			className="form"
		>
			<Input
				dataRoute={dataRoute}
				setDataRoute={setDataRoute}
				name="fromAddress"
				id="from"
				value={dataRoute?.fromAddress || ""}
				placeholder="Откуда"
			/>
			<Input
				dataRoute={dataRoute}
				setDataRoute={setDataRoute}
				name="toAddress"
				id="to"
				value={dataRoute?.toAddress || ""}
				placeholder="Куда"
			/>
			<Button
				type="submit"
				className="formBtn"
				children="Построить маршрут"
				onClick={() => {
					buildRoute();
				}}
			/>
		</form>
	);
};
