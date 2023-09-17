import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";

export default function BtnSend({ path, loading, noSend }) {
	return (
		<div className={`flex justify-center items-center gap-5 ${!noSend && "mt-10"} mb-5`}>
			{/* Button kembali */}
			<Link to={path}>
				<button type="button" className="btn bg-rose-600 w-24">
					Kembali
				</button>
			</Link>
			{/* Button kirim */}
			{!noSend && (
				<button type="submit" disabled={loading} className={`${loading && "flex items-center justify-center gap-1"} btn bg-theme-600 w-24`}>
					{loading && <Loader size={16} color="white" />}
					Kirim
				</button>
			)}
		</div>
	);
}
