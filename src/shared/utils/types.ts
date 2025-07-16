import { useDispatch } from "react-redux";
import store from "../../feature/store/index";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RouteDataType = {
	fromAddress: string;
	toAddress: string;
};
