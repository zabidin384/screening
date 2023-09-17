import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as api from "../api";
import BtnSend from "../components/BtnSend";

export default function QuestionAdd() {
	const [answerType, setAnswerType] = useState([]);
	const [loading, setLoading] = useState(false);
	const [screeningId, setScreeningId] = useState("");
	const location = useLocation();

	// Form data
	const [order, setOrder] = useState("");
	const [itemName, setItemName] = useState("");
	const [answerTypeId, setAnswerTypeId] = useState("");

	// Update data
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState({});

	const getAnswerType = async () => {
		try {
			const res = await api.getAnswerType();
			setAnswerType(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getData = async () => {
		try {
			const res = await api.getQuestion(id);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAnswerType();

		if (id) getData();
		if (data.id) {
			setOrder(data.order ? data.order : "");
			setItemName(data.item_name ? data.item_name : "");
			setAnswerTypeId(data.answer_type_id ? data.answer_type_id : "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data.id]);

	useEffect(() => {
		if (location?.state?.screeningId) setScreeningId(location?.state?.screeningId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.state]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// setLoading(true);

		try {
			let res = "";
			const formData = { item_name: itemName, order, answer_type_id: answerTypeId };
			formData.screening_id = screeningId;

			if (id) {
				res = await api.updateQuestion(formData, id);
			} else {
				res = await api.createQuestion(formData);
			}
			if (res.data) {
				setLoading(false);
				Swal.fire("Sukses!", `Anda berhasil ${id ? "mengubah" : "menambahkan"} data.`, "success");
				if (id) navigate(`/screening/detail/${data.screening_id}`);
				else {
					setItemName("");
					setOrder("");
					setAnswerTypeId("");
				}
			}
		} catch (error) {
			setLoading(false);
			Swal.fire({ icon: "error", title: "Oops...", text: error.response.data.message });
		}
	};

	return (
		<div className="page">
			<form onSubmit={handleSubmit}>
				<h3>{id ? "Ubah Data Kuisioner" : "Tambah Kuisioner Baru"}</h3>

				{/* Pertanyaan */}
				<div className="labelInput">
					<label className="label">
						<span>Pertanyaan</span>
						<span>:</span>
					</label>
					<input type="text" required className="input" value={itemName} onChange={(e) => setItemName(e.target.value)} />
				</div>
				{/* Order */}
				<div className="labelInput">
					<label className="label">
						<span>Order</span>
						<span>:</span>
					</label>
					<input type="number" required className="input" value={order} onChange={(e) => setOrder(e.target.value)} />
				</div>
				{/* Tipe jawaban */}
				<div className="labelInput">
					<label className="label">
						<span>Tipe jawaban</span>
						<span>:</span>
					</label>
					<select required name="" id="" className="select" value={answerTypeId} onChange={(e) => setAnswerTypeId(e.target.value)}>
						<option value="" disabled className="text-xs hp:text-sm">
							Pilih tipe jawaban
						</option>
						{answerType?.map((answer, index) => (
							<option key={index} value={answer.id} className="text-xs hp:text-sm">
								{answer.type}
							</option>
						))}
					</select>
				</div>
				{/* Button */}
				<BtnSend path={`/screening/detail/${screeningId}`} loading={loading} />
			</form>
		</div>
	);
}
