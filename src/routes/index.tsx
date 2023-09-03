import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage, LoginForm } from '@/features';
import { PrimaryLayout } from '@/layouts';
import { checkAuthLoader } from '@/helpers';

const router = createBrowserRouter([
	{
		path: '/',
		Component: PrimaryLayout,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/auth',
				children: [
					{
						index: true,
						path: 'login',
						element: <LoginForm />,
					},
				],
			},
			{
				path: '/banks',
				loader: checkAuthLoader,
				children: [
					{
						path: 'create',
						async lazy() {
							const { CreateBankForm } = await import('@/features');
							return { Component: CreateBankForm };
						},
					},
					{
						path: 'create-card',
						async lazy() {
							const { CreateBankCardForm } = await import('@/features');
							return { Component: CreateBankCardForm };
						},
					},
					{
						path: 'transfer',
						async lazy() {
							const { TransferForm } = await import('@/features');
							return { Component: TransferForm };
						},
					},
				],
			},
			{
				path: '/customers',
        loader: checkAuthLoader,
        children: [
          {
            path: 'create',
            async lazy() {
              const { CreateCustomerForm } = await import('@/features');
              return { Component: CreateCustomerForm };
            },
          }
        ]
			},
		],
	},
]);

export default router;
