import { createSlice } from "@reduxjs/toolkit";
import { RouteDataType } from "../../shared/utils/types";

const initialState: RouteDataType = {
	fromAddress: "",
	toAddress: "",
};

const routeDataSlice = createSlice({
	name: "routeSlice",
	initialState,
	reducers: {
		setRouteData(state, action) {
			return { ...state, ...action.payload };
		},
	},
});

export const { setRouteData } = routeDataSlice.actions;
export default routeDataSlice.reducer;
