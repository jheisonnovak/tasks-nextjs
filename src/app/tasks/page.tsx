"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteTask } from "../../modules/tasks/api/delete";
import { FindAllTasks, Task } from "../../modules/tasks/api/find-all";
import { UpdateTask } from "../../modules/tasks/api/update";
import { TaskColumn } from "../../modules/tasks/components/task-column";
import { TaskDropList } from "../../modules/tasks/components/task-drop-list";
import { TaskModal } from "../../modules/tasks/components/task-modal";
import { TaskStatus } from "../../modules/tasks/constants/status";
import { ApiResponse, IGlobalMessage } from "../../shared/interfaces/response";

const TaskPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const queryClient = useQueryClient();

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
			const response = await DeleteTask(id);
			return response.data;
		},
		onSuccess: async (data: IGlobalMessage) => {
			refetch();
			toast.dismiss();
			toast.success(data.message);
		},
		onError: () => {
			toast.dismiss();
			toast.error("Error deleting task");
		},
	});

	const updateTaskMutation = useMutation({
		mutationFn: async ({ id, status }: { id: number; status: TaskStatus }) => {
			toast.dismiss();
			toast.loading("Updating task status...");
			const response = await UpdateTask({ id, status });
			if (!response.success) throw new Error(response.data.message);
			return response.data;
		},
		onMutate: async ({ id, status }) => {
			await queryClient.cancelQueries({ queryKey: ["tasks"] });
			const previousTasks = queryClient.getQueryData(["tasks"]);
			queryClient.setQueryData(["tasks"], (old: ApiResponse<Task[]>) => {
				if (!old?.success) return old;

				return {
					...old,
					data: old.data.map((task: Task) => (task.id === id ? { ...task, status } : task)),
				};
			});

			return { previousTasks };
		},
		onSuccess: async () => {
			toast.dismiss();
		},
		onError: (error, _, context) => {
			toast.dismiss();
			toast.error(error.message);
			if (context?.previousTasks) {
				queryClient.setQueryData(["tasks"], context.previousTasks);
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;

		const taskId = active.id as number;
		const newStatus = over.id as TaskStatus;
		const draggedTask = tasks?.success && tasks?.data?.find(task => task.id === taskId);

		if (!draggedTask || draggedTask.status === newStatus) return;
		updateTaskMutation.mutate({ id: taskId, status: newStatus });
	};

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

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative w-full">
					{tasks?.success ? (
						<DndContext modifiers={[restrictToWindowEdges]} onDragEnd={handleDragEnd}>
							<TaskColumn title="Pending" status={TaskStatus.PENDING}>
								{tasks.data
									.filter(task => task.status === TaskStatus.PENDING)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={deleteTaskMutation.mutate} />
									))}
							</TaskColumn>
							<TaskColumn title="Doing" status={TaskStatus.DOING}>
								{tasks.data
									.filter(task => task.status === TaskStatus.DOING)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={deleteTaskMutation.mutate} />
									))}
							</TaskColumn>
							<TaskColumn title="Done" status={TaskStatus.DONE}>
								{tasks.data
									.filter(task => task.status === TaskStatus.DONE)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={deleteTaskMutation.mutate} />
									))}
							</TaskColumn>
						</DndContext>
					) : (
						<div className="col-span-3 text-center text-gray-500">Loading...</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TaskPage;
