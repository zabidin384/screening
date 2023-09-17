import { AiOutlineMenu } from "react-icons/ai";
import { BsFillBagHeartFill } from "react-icons/bs";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useState } from "react";
import Menu from "./Menu";

export default function Sidebar({ showMenu, setShowMenu }) {
	const [open, setOpen] = useState(true);
	const [arrowDown, setArrowDown] = useState(true);
	const [showMainMenu, setShowMainMenu] = useState("");
	const [activeMainMenu, setActiveMainMenu] = useState("");
	const [activeSubMenu, setActiveSubMenu] = useState("");

	return (
		<>
			{/* Large Screen */}
			<div className={`${open ? "w-64" : "w-20"} bg-theme-800 h-screen p-5 pt-8 duration-300 hidden lg:block relative`}>
				<IoIosArrowDropleftCircle
					onClick={() => setOpen(!open)}
					className={`${!open && "rotate-180"} bg-white text-theme-600 text-3xl rounded-full absolute -right-3 top-9 cursor-pointer`}
				/>
				{/* Company Name + Logo */}
				<div className="inline-flex">
					<BsFillBagHeartFill className={`${open && "rotate-[360deg]"} duration-500 bg-white text-theme-600 p-1 text-4xl rounded cursor-pointer block float-left mr-2`} />
					<h1 className={`${!open && "scale-0"} text-white origin-left font-medium text-2xl duration-300`}>Screening</h1>
				</div>

				<ul className="pt-6">
					<Menu
						screen="pc"
						open={open}
						arrowDown={arrowDown}
						setArrowDown={setArrowDown}
						showMainMenu={showMainMenu}
						setShowMainMenu={setShowMainMenu}
						activeMainMenu={activeMainMenu}
						setActiveMainMenu={setActiveMainMenu}
						activeSubMenu={activeSubMenu}
						setActiveSubMenu={setActiveSubMenu}
					/>
				</ul>
			</div>

			{/* Small Screen */}
			<div className="lg:hidden mt-5 ml-5">
				<div className="relative w-full">
					<div onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-1 p-2 rounded-lg cursor-pointer">
						<AiOutlineMenu className="text-2xl cursor-pointer" />
						<span className="font-semibold">SCREENING</span>
					</div>
					{showMenu && (
						<div className="absolute top-12 z-10 bg-theme-800 text-white p-3 rounded-md w-[225px]">
							<Menu
								open={true}
								arrowDown={arrowDown}
								setArrowDown={setArrowDown}
								showMainMenu={showMainMenu}
								setShowMainMenu={setShowMainMenu}
								activeMainMenu={activeMainMenu}
								setActiveMainMenu={setActiveMainMenu}
								activeSubMenu={activeSubMenu}
								setActiveSubMenu={setActiveSubMenu}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
