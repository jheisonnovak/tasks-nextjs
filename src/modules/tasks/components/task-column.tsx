export const TaskColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<div className="p-4 rounded-lg h-full">
		<h2 className="text-xl font-bold mb-4">{title}</h2>
		{children}
	</div>
);
