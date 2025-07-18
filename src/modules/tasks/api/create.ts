"use server";

import { ApiInstance } from "../../../shared/api/config";
import { IResponse } from "../../../shared/interfaces/response";
import { CreateTaskFormData } from "../hooks/task-form.hook";

export const CreateTask = async (task: CreateTaskFormData): Promise<IResponse> => {
	try {
		const { data } = await ApiInstance.post<IResponse>("/task", task);
		return data;
	} catch (e) {
		throw e;
	}
};
