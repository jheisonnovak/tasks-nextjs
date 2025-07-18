"use server";

import { ApiInstance } from "../../../shared/api/config";
import { IResponse } from "../../../shared/interfaces/response";

export const DeleteTask = async (taskId: number): Promise<IResponse> => {
	try {
		const { data } = await ApiInstance.delete<IResponse>(`/task/${taskId}`);
		return data;
	} catch (error) {
		console.error("Error deleting task:", error);
		throw error;
	}
};
