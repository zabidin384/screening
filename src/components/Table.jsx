import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

export default function Table({ columns, data, title, path, id }) {
	const table = useMantineReactTable({ columns, data, enableStickyHeader: true });

	return (
		<>
			<div className="flex justify-between items-center hp:mb-3">
				<h3 className="text-start">{title}</h3>
				<Link to={path ? path : "#"} state={{ screeningId: id }}>
					<button className="btn bg-theme-600 flex items-center gap-1">
						<AiOutlinePlus size={18} />
						Tambah <span className="hidden hp:inline">data</span>
					</button>
				</Link>
			</div>
			{data.length > 0 ? <MantineReactTable table={table} /> : <div className="text-center my-10">Data tidak ada.</div>}
		</>
	);
}
