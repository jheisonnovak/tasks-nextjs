import Link from "next/link";

export const Header = () => (
	<header className="bg-blue-500 p-4 text-white">
		<div className="flex justify-between items-center">
			<Link href={"/"}>
				<h1 className="text-xl">Tasks</h1>
			</Link>

			<Link href={"/tasks"} className="bg-white text-blue-500 px-4 py-2 rounded cursor-pointer">
				Go to Tasks
			</Link>
		</div>
	</header>
);
