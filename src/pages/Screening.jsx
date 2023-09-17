import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as api from "../api";
import BtnAction from "../components/BtnAction";
import Table from "../components/Table";

export default function Screening() {
	const [data, setData] = useState("");

	const getData = async () => {
		try {
			const res = await api.getScreeningList();
			setData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

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
			Cell: ({ cell }) => <BtnAction id={cell.getValue()} handleDelete={handleDelete} path="/screening" />,
		},
		{
			accessorKey: "code",
			header: "Kode",
			size: 100,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		{
			accessorKey: "name",
			header: "Nama",
			minSize: 300,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		{
			accessorKey: "desc",
			header: "Deskripsi",
			minSize: 300,
			enableSorting: false,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		{
			accessorKey: "total_question",
			header: "Total Soal",
			size: 120,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
		{
			accessorKey: "check_duration",
			header: "Interval pengerjaan (hari)",
			size: 120,
			Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : "-"),
		},
	];

	return <div className="page">{data.length > 0 && <Table columns={columns} data={data} title="Screening Kuisioner List" path="/screening/tambah" />}</div>;
}
