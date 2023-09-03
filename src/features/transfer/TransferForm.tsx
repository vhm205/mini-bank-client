import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { fetchApi } from '@/apis';

type InitialValuesType = {
	from: string;
	to: string;
	amount: number;
};

export const TransferForm = () => {
	const alert = useAlert();

	const handleTransfer = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		try {
			const response = await fetchApi('bank/transfer', {
				method: 'POST',
				body: JSON.stringify(values),
			});
			const { metadata } = response;

			if (metadata.error) {
				return alert.error(metadata.message);
			}

      alert.success('Transfer successful');
			resetForm();
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const formik = useFormik({
		initialValues: {
			from: '',
			to: '',
			amount: 0,
		},
		onSubmit: handleTransfer,
	});

	return (
		<div className="max-w-xs w-80">
			<form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className='text-2xl font-bold mb-4'>Transfer Money</p>
				<div className="mb-4">
					<label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="from"
					>
						From
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id='from'
						type="text"
						placeholder="From"
						name="from"
						value={formik.values.from}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						To
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="to"
						type="text"
						name="to"
            placeholder='To'
						value={formik.values.to}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="amount"
					>
						Amount
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="amount"
						type="number"
						placeholder="Amount"
						name="amount"
						value={formik.values.amount}
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
