import { Link } from "react-router-dom";
// Icons
import { BiSolidPencil } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

export default function BtnAction({ id, handleDelete, path, screeningId, noDetail }) {
	return (
		<div className="flex gap-1">
			<Link to={`${path}/ubah/${id}`} state={{ screeningId }}>
				<BiSolidPencil size={18} color="green" className="cursor-pointer hover:opacity-75" title="Ubah data" />
			</Link>
			{!noDetail && (
				<Link to={`${path}/detail/${id}`}>
					<BsEyeFill size={18} className="text-theme-600 cursor-pointer hover:opacity-75" title="Lihat detail" />
				</Link>
			)}
			<MdDelete size={18} onClick={() => handleDelete(id)} color="red" className="cursor-pointer hover:opacity-75" title="Hapus data" />
		</div>
	);
}
