import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as api from "../api";
import BtnSend from "../components/BtnSend";

export default function ScreeningAdd() {
	const [answerType, setAnswerType] = useState([]);
	const [loading, setLoading] = useState(false);

	// Form data
	const [name, setName] = useState("");
	const [code, setCode] = useState("");
	const [desc, setDesc] = useState("");
	const [answerTypeId, setAnswerTypeId] = useState("");
	const [checkDuration, setCheckDuration] = useState("");
	const [totalQuestion, setTotalQuestion] = useState("");
	const [footnote, setFootnote] = useState("");
	const [threshold, setThreshold] = useState("");
	const [point, setPoint] = useState("");

	// Update data
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [statusActive, setStatusActive] = useState("");

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
			const res = await api.getScreening(id);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAnswerType();

		if (id) getData();
		if (data.id) {
			setName(data.name ? data.name : "");
			setCode(data.code ? data.code : "");
			setDesc(data.desc ? data.desc : "");
			setAnswerTypeId(data.answer_type_id ? data.answer_type_id : "");
			setCheckDuration(data.check_duration ? data.check_duration : "");
			setTotalQuestion(data.total_question ? data.total_question : "");
			setFootnote(data.footnote ? data.footnote : "");
			setThreshold(data.threshold ? data.threshold : "");
			setPoint(data.point ? data.point : "");
			setStatusActive(data.status_active ? data.status_active : "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data.id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// setLoading(true);

		try {
			let res = "";
			const formData = { name, code, desc, answer_type_id: answerTypeId, check_duration: checkDuration, total_question: totalQuestion, footnote, threshold, point };

			if (id) {
				formData.id = id;
				formData.status_active = statusActive;
				res = await api.updateScreening(formData, id);
			} else {
				res = await api.createScreening(formData);
			}
			if (res.data) {
				setLoading(false);
				Swal.fire("Sukses!", `Anda berhasil ${id ? "mengubah" : "menambahkan"} data.`, "success");
				if (id) navigate("/screening");
				else {
					setName("");
					setCode("");
					setDesc("");
					setAnswerTypeId("");
					setCheckDuration("");
					setTotalQuestion("");
					setFootnote("");
					setThreshold("");
					setPoint("");
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
				<h3>{id ? "Ubah Data Screening" : "Tambah Screening Baru"}</h3>

				{id && (
					// {/* Status aktif */}
					<div className="labelInput">
						<label className="label">
							<span>Status</span>
							<span>:</span>
						</label>
						<select required name="" id="" className="select" value={statusActive} onChange={(e) => setStatusActive(e.target.value)}>
							<option value="" disabled className="text-xs hp:text-sm">
								Pilih status
							</option>
							<option value="1" className="text-xs hp:text-sm">
								Aktif
							</option>
							<option value="0" className="text-xs hp:text-sm">
								Tidak Aktif
							</option>
						</select>
					</div>
				)}
				{/* Nama */}
				<div className="labelInput">
					<label className="label">
						<span>Nama</span>
						<span>:</span>
					</label>
					<input type="text" required className="input" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				{/* Kode */}
				<div className="labelInput">
					<label className="label">
						<span>Kode</span>
						<span>:</span>
					</label>
					<input type="text" required className="input" value={code} onChange={(e) => setCode(e.target.value)} />
				</div>
				{/* Interval pengerjaan */}
				<div className="labelInput">
					<label className="label">
						<span>Interval pengerjaan</span>
						<span>:</span>
					</label>
					<input type="number" required className="input" value={checkDuration} onChange={(e) => setCheckDuration(e.target.value)} />
				</div>
				{/* Total soal */}
				<div className="labelInput">
					<label className="label">
						<span>Total soal</span>
						<span>:</span>
					</label>
					<input type="number" required className="input" value={totalQuestion} onChange={(e) => setTotalQuestion(e.target.value)} />
				</div>
				{/* Threshold */}
				<div className="labelInput">
					<label className="label">
						<span>Threshold</span>
						<span>:</span>
					</label>
					<input type="number" required className="input" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
				</div>
				{/* Point */}
				<div className="labelInput">
					<label className="label">
						<span>Point</span>
						<span>:</span>
					</label>
					<input type="number" required className="input" value={point} onChange={(e) => setPoint(e.target.value)} />
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
				{/* Deskripsi */}
				<div className="labelInput">
					<label className="label">
						<span>Deskripsi</span>
						<span>:</span>
					</label>
					<textarea required name="" id="" cols="30" rows="3" className="input" value={desc} onChange={(e) => setDesc(e.target.value)} />
				</div>
				{/* Catatan */}
				<div className="labelInput">
					<label className="label">
						<span>Catatan</span>
						<span>:</span>
					</label>
					<textarea required name="" id="" cols="30" rows="3" className="input" value={footnote} onChange={(e) => setFootnote(e.target.value)} />
				</div>
				{/* Button */}
				<BtnSend path="/screening" loading={loading} />
			</form>
		</div>
	);
}
