import { configureStore } from "@reduxjs/toolkit";
import routeDataSlice from "../slices/routeSlice";

const store = configureStore({
	reducer: {
		routeData: routeDataSlice,
	},
});

export default store;
