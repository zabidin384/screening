import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as api from "../api";
import BtnAction from "../components/BtnAction";
import BtnSend from "../components/BtnSend";
import Table from "../components/Table";

export default function ScreeningDetail() {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [questions, setQuestions] = useState([]);

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
	const [statusActive, setStatusActive] = useState("");

	const getData = async () => {
		try {
			const res = await api.getScreening(id);
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getQuestions = async () => {
		try {
			const res = await api.getQuestions(id);
			setQuestions(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
		getQuestions();

		if (data.id) {
			setName(data.name ? data.name : "-");
			setCode(data.code ? data.code : "-");
			setDesc(data.desc ? data.desc : "-");
			setAnswerTypeId(data.answer_name ? data.answer_name : "-");
			setCheckDuration(data.check_duration ? data.check_duration : "-");
			setTotalQuestion(data.total_question ? data.total_question : "-");
			setFootnote(data.footnote ? data.footnote : "-");
			setThreshold(data.threshold ? data.threshold : "-");
			setPoint(data.point ? data.point : "-");
			setStatusActive(data.status_active ? data.status_active : "-");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, data.id]);

	const handleDelete = async (id) => {
		Swal.fire({
			text: "Apakah anda yakin ingin menghapus data ini?",
			showCancelButton: true,
			cancelButtonText: "Tidak",
			confirmButtonText: "Ya",
		}).then((result) => {
			if (result.isConfirmed) {
				const deleteData = async () => {
					await api
						.deleteScreening(id)
						.then(() => {
							Swal.fire("Sukses!", "Anda berhasil menghapus data.", "success");
							getData();
						})
						.catch((error) => {
							Swal.fire({ icon: "error", title: "Oops...", text: error.response.data.message });
						});
				};
				deleteData();
			}
		});
	};

	const columns = [
		{
			accessorKey: "id",
			header: "Aksi",
			size: 100,
			enableSorting: false,
			Cell: ({ cell }) => <BtnAction id={cell.getValue()} handleDelete={handleDelete} path={"/pertanyaan"} screeningId={id} noDetail={true} />,
		},
		{
			accessorKey: "answer_name",
			header: "Tipe Jawaban",
			size: 100,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		{
			accessorKey: "order",
			header: "Order",
			size: 100,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		{
			accessorKey: "item_name",
			header: "Pertanyaan",
			minSize: 300,
			enableSorting: false,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		// {
		// 	accessorKey: "answer_type_id",
		// 	header: "Tipe Jawaban",
		// 	size: 120,
		// 	Cell: ({ cell }) => (cell.getValue() && answerType.length > 0 ? answerType?.filter((answer) => answer?.id === cell.getValue())[0].type : "-"),
		// },
	];

	return (
		<>
			<div className="page">
				<h3>Screening Detail</h3>

				{/* Nama */}
				<div className="labelText">
					<label className="label">
						<span>Nama</span>
						<span>:</span>
					</label>
					<div className="w-full">{name}</div>
				</div>
				{/* Kode */}
				<div className="labelText">
					<label className="label">
						<span>Kode</span>
						<span>:</span>
					</label>
					<div className="w-full">{code}</div>
				</div>
				{/* Status */}
				<div className="labelText">
					<label className="label">
						<span>Status</span>
						<span>:</span>
					</label>
					<div className="w-full">{statusActive === 1 ? "Aktif" : "Tidak aktif"}</div>
				</div>
				{/* Interval pengerjaan */}
				<div className="labelText">
					<label className="label">
						<span>Interval pengerjaan</span>
						<span>:</span>
					</label>
					<div className="w-full">{checkDuration} hari</div>
				</div>
				{/* Total soal */}
				<div className="labelText">
					<label className="label">
						<span>Total soal</span>
						<span>:</span>
					</label>
					<div className="w-full">{totalQuestion}</div>
				</div>
				{/* Threshold */}
				<div className="labelText">
					<label className="label">
						<span>Threshold</span>
						<span>:</span>
					</label>
					<div className="w-full">{threshold}</div>
				</div>
				{/* Point */}
				<div className="labelText">
					<label className="label">
						<span>Point</span>
						<span>:</span>
					</label>
					<div className="w-full">{point}</div>
				</div>
				{/* Tipe jawaban */}
				<div className="labelText">
					<label className="label">
						<span>Tipe jawaban</span>
						<span>:</span>
					</label>
					<div className="w-full">{answerTypeId}</div>
					{/* <div className="w-full">{answerType.length > 0 ? answerType?.filter((answer) => answer?.id === answerTypeId)[0].type : "-"}</div> */}
				</div>
				{/* Deskripsi */}
				<div className="labelText">
					<label className="label">
						<span>Deskripsi</span>
						<span>:</span>
					</label>
					<div className="w-full">{desc}</div>
				</div>
				{/* Catatan */}
				<div className="labelText">
					<label className="label">
						<span>Catatan</span>
						<span>:</span>
					</label>
					<div className="w-full">{footnote}</div>
				</div>
			</div>
			<div className="page">{<Table columns={columns} data={questions} title="Daftar Pertanyaan" path={"/pertanyaan/tambah"} id={id} />}</div>
			<BtnSend path="/screening" noSend={true} />
		</>
	);
}
