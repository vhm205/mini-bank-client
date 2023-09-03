import { FormikHelpers, useFormik } from 'formik';
import { useAlert } from 'react-alert';
import { fetchApi } from '@/apis';

type InitialValuesType = {
	fullname: string;
	phone?: string;
	username: string;
	password: string;
};

export const CreateCustomerForm = () => {
	const alert = useAlert();

	const handleSubmit = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		try {
			const response = await fetchApi('customer/create', {
				method: 'POST',
				headers: { authorization: 'Bearer' },
				body: JSON.stringify(values),
			});
			const { metadata } = response;
			if (metadata.error) {
				return alert.error(metadata.message);
			}

			alert.success('Customer created successfully');
			resetForm();
		} catch (error: any) {
			alert.error(error.message);
		}
	};

	const formik = useFormik({
		initialValues: {
			fullname: '',
			username: '',
			password: '',
		},
		onSubmit: handleSubmit,
	});

	return (
		<div className="max-w-xs w-80">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className='text-2xl font-bold mb-4'>Create Customer</p>
				<div className="mb-4">
					<label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullname"
					>
						Full name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id='fullname'
						type="text"
						placeholder="Fullname"
						name="fullname"
						value={formik.values.fullname}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						name="username"
            placeholder='Username'
            autoComplete='username'
						value={formik.values.username}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="******************"
						name="password"
            autoComplete="current-password"
						value={formik.values.password}
						onChange={formik.handleChange}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="button"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};
