"use client";

import { useQuery } from "@tanstack/react-query";
import { FindAllTasks } from "../../modules/tasks/api/find-all";
import { TaskColumn } from "../../modules/tasks/components/task-column";
import { TaskDropList } from "../../modules/tasks/components/task-drop-list";
import { TaskStatus } from "../../modules/tasks/constants/status";

const TaskPage = () => {
	const { data: tasks } = useQuery({
		queryKey: ["tasks"],
		queryFn: async () => {
			const tasks = await FindAllTasks();
			return tasks;
		},
	});

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-8">Task List</h1>
				<button
					// (click)="openModal()"
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

				{/* <app-task-modal [isOpen]="showModal" (close)="closeModal()" (save)="createTask($event)"></app-task-modal> */}

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{tasks ? (
						<>
							<TaskColumn title="Pending">
								{tasks
									.filter(task => task.status === TaskStatus.PENDING)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={() => {}} />
									))}
							</TaskColumn>
							<TaskColumn title="Doing">
								{tasks
									.filter(task => task.status === TaskStatus.DOING)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={() => {}} />
									))}
							</TaskColumn>
							<TaskColumn title="Done">
								{tasks
									.filter(task => task.status === TaskStatus.DONE)
									.map(task => (
										<TaskDropList key={task.id} task={task} deleteTask={() => {}} />
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
