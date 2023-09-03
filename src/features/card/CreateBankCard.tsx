import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { fetchApi } from '@/apis';

type InitialValuesType = {
	bankName: string;
	customerName: string;
	cardName: string;
};

export const CreateBankCardForm = () => {
	const alert = useAlert();

	const handleCreateBankCard = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		try {
			const response = await fetchApi('bank/create-card', {
				method: 'POST',
				headers: { authorization: 'Bearer' },
				body: JSON.stringify(values),
			});

			const { metadata } = response;
			if (metadata.error) {
				return alert.error(metadata.message);
			}

      alert.success('Bank card created successfully');
			resetForm();
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const formik = useFormik({
		initialValues: {
			bankName: '',
      customerName: '',
      cardName: '',
		},
		onSubmit: handleCreateBankCard,
	});

	return (
		<div className="max-w-xs w-80">
			<form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className='text-2xl font-bold mb-4'>Create Bank Card</p>
				<div className="mb-4">
					<label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="bank-name"
					>
						Bank name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id='bank-name'
						type="text"
						placeholder="Bank Name"
						name="bankName"
						value={formik.values.bankName}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="customer-name"
					>
						Customer name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="customer-name"
						type="text"
						name="customerName"
            placeholder='Customer Name'
						value={formik.values.customerName}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="card-name"
					>
						Card name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="card-name"
            type="text"
            name="cardName"
            placeholder='Card Name'
						value={formik.values.cardName}
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
