import axios from "axios";

export const apiInstance = axios.create({
	baseURL: process.env.BACKEND_URL,
});
