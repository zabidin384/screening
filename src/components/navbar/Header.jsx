import avatar from "../../assets/avatar.jpg";
import { BiSolidHomeAlt2 } from "react-icons/bi";

export default function Header() {
	return (
		<div className="lg:flex justify-between items-center pt-3 pb-5 px-5 hidden">
			<div className="font-bold -ml-5 flex items-center gap-1">
				<BiSolidHomeAlt2 />
				<div>Screening</div>
			</div>
			<div className="flex items-center gap-2">
				<img src={avatar} alt="Foto profil" width={50} height={50} className="rounded-full object-cover" />
				<div className="flex flex-col">
					<span className="text-sm">Zainal Abidin</span>
					<span className="text-xs font-bold">Admin</span>
				</div>
			</div>
		</div>
	);
}
