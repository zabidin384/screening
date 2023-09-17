import { useState } from "react";
import Header from "./components/navbar/Header";
import Router from "./Router";
import Sidebar from "./components/navbar/Sidebar";

export default function App() {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="flex flex-col gap-2 lg:gap-0 lg:flex-row h-screen">
			<div>
				<Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
			</div>
			<div className="w-full lg:min-h-screen lg:overflow-y-scroll px-5 lg:pt-0" onClick={() => showMenu && setShowMenu(false)}>
				<Header />
				<Router />
			</div>
		</div>
	);
}
