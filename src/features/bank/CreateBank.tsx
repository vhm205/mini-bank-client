import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { fetchApi } from '@/apis';

type InitialValuesType = {
	name: string;
	volume: number;
};

export const CreateBankForm = () => {
	const alert = useAlert();

	const handleCreateBank = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		try {
			const response = await fetchApi('bank/create', {
				method: 'POST',
				body: JSON.stringify(values),
			});

			const { metadata } = response;
			if (metadata.error) {
				return alert.error(metadata.message);
			}

			alert.success('Bank created successfully');
			resetForm();
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const formik = useFormik({
		initialValues: {
			name: '',
			volume: 0,
		},
		onSubmit: handleCreateBank,
	});

	return (
		<div className="max-w-xs w-80">
			<form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<p className="text-2xl font-bold mb-4">Create Bank</p>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Bank name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="name"
						type="text"
						placeholder="Bank Name"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="volume"
					>
						Volume
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="volume"
						type="number"
						name="volume"
						value={formik.values.volume}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
