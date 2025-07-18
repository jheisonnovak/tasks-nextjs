"use server";

import { ApiInstance } from "../../../shared/api/config";
import { TaskStatus } from "../constants/status";

export interface Task {
	id: number;
	title: string;
	description: string;
	status: TaskStatus;
}

export const FindAllTasks = async (): Promise<Task[]> => {
	try {
		const { data } = await ApiInstance.get<Task[]>("/task");
		return data;
	} catch (e) {
		console.log("Error fetching tasks:", e);
		throw e;
	}
};
