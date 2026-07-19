import { create } from "axios";

const axiosInstance = create({
	baseURL: "https://rickandmortyapi.com/api",
});

export default axiosInstance;
