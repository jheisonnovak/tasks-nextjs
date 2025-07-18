"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteTask } from "../../modules/tasks/api/delete";
import { FindAllTasks } from "../../modules/tasks/api/find-all";
import { TaskColumn } from "../../modules/tasks/components/task-column";
import { TaskDropList } from "../../modules/tasks/components/task-drop-list";
import { TaskModal } from "../../modules/tasks/components/task-modal";
import { TaskStatus } from "../../modules/tasks/constants/status";
import { IResponse } from "../../shared/interfaces/response";

const TaskPage = () => {
	const [openModal, setOpenModal] = useState(false);

	const { data: tasks, refetch } = useQuery({
		queryKey: ["tasks"],
		queryFn: async () => {
			const tasks = await FindAllTasks();
			return tasks;
		},
	});

	const deleteTaskMutation = useMutation({
		mutationFn: async (id: number) => {
			toast.dismiss();
			toast.loading("Deleting task...");
			const data = await DeleteTask(id);
			return data;
		},
		onSuccess: async (data: IResponse) => {
			refetch();
			toast.dismiss();
			toast.success(data.message);
		},
		onError: () => {
			toast.dismiss();
			toast.error("Error deleting task");
		},
	});

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">Task List</h1>
				<button
					onClick={() => setOpenModal(true)}
					className="mb-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center cursor-pointer"
				>
					<span className="mr-2">Create New Task</span>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				<TaskModal
					isOpen={openModal}
					setIsOpen={setOpenModal}
					onSuccess={() => {
						refetch();
					}}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{tasks ? (
						<>
							<TaskColumn title="Pending">
								{tasks
									.filter(task => task.status === TaskStatus.PENDING)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={deleteTaskMutation.mutate} />
									))}
							</TaskColumn>
							<TaskColumn title="Doing">
								{tasks
									.filter(task => task.status === TaskStatus.DOING)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={deleteTaskMutation.mutate} />
									))}
							</TaskColumn>
							<TaskColumn title="Done">
								{tasks
									.filter(task => task.status === TaskStatus.DONE)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={deleteTaskMutation.mutate} />
									))}
							</TaskColumn>
						</>
					) : (
						<div className="col-span-3 text-center text-gray-500">Loading...</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TaskPage;
