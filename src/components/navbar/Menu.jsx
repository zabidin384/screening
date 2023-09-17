// import { AiFillHome } from "react-icons/ai";
import { BsChevronDown, BsFingerprint } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdListBox } from "react-icons/io";

export default function Menu({ screen, open, arrowDown, setArrowDown, showMainMenu, setShowMainMenu, activeMainMenu, setActiveMainMenu, activeSubMenu, setActiveSubMenu }) {
	const menus = [
		// { title: "Dashboard", icon: <AiFillHome />, link: "/" },
		{ title: "Screening", icon: <BsFingerprint />, link: "/screening" },
		// {
		// 	title: "Screening Details",
		// 	icon: <BsCardList />,
		// 	link: "#",
		// 	submenu: true,
		// 	subMenuItems: [
		// 		{ title: "Detail 1", link: "/detail-1" },
		// 		{ title: "Detail 2", link: "/detail-2" },
		// 		{ title: "Detail 3", link: "/detail-3" },
		// 	],
		// },
		// { title: "Screening2", link: "/screening" },
	];

	const styles = {
		menu: "text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer hover:bg-light-white rounded-md",
	};

	return (
		<>
			{menus.map((menu, index) => (
				<div key={index}>
					{/* Main Menu */}
					<Link to={menu.link}>
						<li
							onClick={() => {
								menu.submenu && setArrowDown(!arrowDown);
								if (!menu.submenu && activeMainMenu !== menu.title) {
									setActiveMainMenu(menu.title);
									setActiveSubMenu("");
									setArrowDown(true);
								} else {
									setShowMainMenu(menu.title);
								}
							}}
							className={`${styles.menu} ${screen === "pc" ? "mt-2 p-2" : "mt-1 p-1"}`}>
							<span className={`${screen === "pc" ? "text-2xl" : "text-xl"} block float-left`}>{menu.icon ? menu.icon : <IoMdListBox />}</span>
							<span className={`${!open && "hidden"} ${activeMainMenu === menu.title ? "font-bold" : "font-medium"} flex-1 duration-100`}>{menu.title}</span>
							{menu.submenu && open && <BsChevronDown strokeWidth={1.5} className={`${showMainMenu === menu.title && !arrowDown && "rotate-180"}`} />}
						</li>
					</Link>

					{menu.submenu && showMainMenu === menu.title && !arrowDown && open && (
						// Sub Menu
						<ul>
							{menu.subMenuItems.map((submenuItem, index) => (
								<Link key={index} to={submenuItem.link}>
									<li
										onClick={() => {
											setActiveMainMenu(menu.title);
											setActiveSubMenu(submenuItem.title);
										}}
										className={`${styles.menu} ${activeSubMenu === submenuItem.title && "italic font-bold"} ${screen === "pc" ? "pl-12 p-2 mt-2" : "pl-11 py-1 mt-0"}`}>
										{submenuItem.title}
									</li>
								</Link>
							))}
						</ul>
					)}
				</div>
			))}
		</>
	);
}
