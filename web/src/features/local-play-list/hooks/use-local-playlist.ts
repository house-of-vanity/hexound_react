import { useSelector } from "react-redux";
import { localPlayListSelector } from "../duck";

export const useLocalPlayList = () => {
	return useSelector(localPlayListSelector);
};
