import { Navigate, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Detail1 from "./pages/Detail1";
// import Detail2 from "./pages/Detail2";
// import Detail3 from "./pages/Detail3";
import QuestionAdd from "./pages/QuestionAdd";
import Screening from "./pages/Screening";
import ScreeningAdd from "./pages/ScreeningAdd";
import ScreeningDetail from "./pages/ScreeningDetail";

export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/screening" />} />
			{/* <Route path="/detail-1" element={<Detail1 />} />
			<Route path="/detail-2" element={<Detail2 />} />
			<Route path="/detail-3" element={<Detail3 />} /> */}
			<Route path="/screening" element={<Screening />} />
			<Route path="/screening/detail/:id" element={<ScreeningDetail />} />
			<Route path="/screening/tambah" element={<ScreeningAdd />} />
			<Route path="/screening/ubah/:id" element={<ScreeningAdd />} />
			<Route path="/pertanyaan/tambah" element={<QuestionAdd />} />
			<Route path="/pertanyaan/ubah/:id" element={<QuestionAdd />} />
		</Routes>
	);
}
