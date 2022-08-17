import { ChangeEvent, FormEvent, useEffect, useId, useState } from 'react';
import { isMobileOrTablet } from '@utils/device';
import { SharedMainStateProvider, useSharedMainState } from './context';
import {
	setCurrentBgColorMode,
	setCurrentFontColorMode,
	setIsMobileOrTablet,
	setThemeMode,
} from './context/actions';
// import { useDynamicallyImportedGSAP } from './context/hooks';
import { signOut, useSession } from 'next-auth/react';
import { trpc } from '@libs/trpc';
import { InferMutationInput } from '@utils/trpc/types';
import { useRouter } from 'next/router';

interface IProps {
	children: JSX.Element;
}

enum EUserRole {
	CUSTOMER = 'CUSTOMER',
	SELLER = 'SELLER',
}

interface ICompleteProfileFormProps {
	userEmail: string;
}

type TCompleteCustomerProfileDataMutationInputs =
	InferMutationInput<'user.profile.completeCustomerProfileData'>;
type TCompleteSellerProfileDataMutationInputs =
	InferMutationInput<'user.profile.completeSellerProfileData'>;

const formClasses = {
	form: 'flex flex-col items-start justify-center',
	label: 'flex flex-col items-start justify-center my-2 cursor-pointer w-full',
	span: 'py-1',
	input: 'p-1 rounded-sm',
	button:
		'p-2 rounded-sm font-bold hover:filter hover:brightness-95 focus:ring focus:brightness-90 transition-all duration-300',
};

const CustomerInputs = ({ userEmail }: ICompleteProfileFormProps) => {
	const router = useRouter();
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const formInputsId = useId();
	const completeCustomerProfileDataMutation = trpc.useMutation(
		'user.profile.completeCustomerProfileData'
	);

	const [userRoleData, setUserRoleData] = useState<
		Partial<TCompleteCustomerProfileDataMutationInputs['roleData']>
	>({
		bio: '',
		firstName: '',
		secondName: '',
		sex: '',
		dateOfBirth: undefined,
	});

	const formFields = [
		{
			__type: 'FORM_NORMAL_INPUT',
			name: 'firstName',
			title: 'First Name',
			id: `${formInputsId}-firstName`,
		},
		{
			__type: 'FORM_NORMAL_INPUT',
			name: 'secondName',
			title: 'Second Name',
			id: `${formInputsId}-secondName`,
		},
		{
			__type: 'FORM_TEXTAREA',
			name: 'bio',
			title: 'Bio',
			id: `${formInputsId}-bio`,
		},
		{
			__type: 'FORM_NORMAL_INPUT',
			name: 'dateOfBirth',
			title: 'Date Of Birth',
			id: `${formInputsId}-dateOfBirth`,
			type: 'date',
		},
		{
			__type: 'FORM_FIELDSET_CHECKBOX',
			title: 'Sex',
			list: [
				{
					name: 'sex',
					value: 'M',
					title: 'Male',
					id: `${formInputsId}-Male`,
					type: 'radio',
				},
				{
					name: 'sex',
					value: 'F',
					title: 'Female',
					id: `${formInputsId}-Female`,
					type: 'radio',
				},
			],
		},
	] as const;

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const checkIfAllExist = <T,>(obj: T) => {
			if (!obj || typeof obj !== 'object') throw new Error('Not an object!');

			let someItemsDoNotExist;
			let item: keyof typeof obj;
			for (item in obj) {
				if (!obj[item]) {
					someItemsDoNotExist = item;
					break;
				}
			}

			if (typeof someItemsDoNotExist === 'string')
				throw new Error(`Some items don't exist, ex: ${someItemsDoNotExist}`);

			return obj as Required<T & object>;
		};

		const requiredInputs = checkIfAllExist(userRoleData);

		const data = await completeCustomerProfileDataMutation.mutateAsync({
			roleData: requiredInputs,
		});

		signOut({
			redirect: false,
		});

		router.push('/api/auth/signin');
	};

	return (
		<form onSubmit={handleSubmit} className={formClasses.form}>
			{formFields.map((item) => {
				if (item.__type === 'FORM_FIELDSET_CHECKBOX')
					return (
						<fieldset
							key={item.title}
							className='flex flex-col items-center w-full border light:border-black rounded-sm'
						>
							<legend className='px-'>{item.title}</legend>
							<div className='flex items-center justify-center w-full'>
								{item.list.map((subItem) => {
									return (
										<label
											key={`${subItem.title}-${subItem.title.toLowerCase()}`}
											htmlFor={subItem.id}
											className='flex flex-col items-center justify-center cursor-pointer w-full m-2'
										>
											<span>{subItem.title}</span>
											<span className={formClasses.span} />
											<input
												type={subItem.type || 'text'}
												name={subItem.name}
												id={subItem.id}
												className='flex flex-col items-center justify-center cursor-pointer'
												onChange={(event) =>
													setUserRoleData((prev) => ({
														...prev,
														[event.target.name]: event.target.value,
													}))
												}
											/>
										</label>
									);
								})}
							</div>
						</fieldset>
					);

				if (item.__type === 'FORM_TEXTAREA')
					return (
						<label
							key={item.name}
							htmlFor={item.id}
							className={formClasses.label}
						>
							<span>{item.title}</span>
							<span className={formClasses.span} />
							<textarea
								name={item.name}
								id={item.id}
								className={formClasses.input}
								onChange={(event) =>
									setUserRoleData((prev) => ({
										...prev,
										[event.target.name]: event.target.value,
									}))
								}
							/>
						</label>
					);

				if (item.__type === 'FORM_NORMAL_INPUT')
					return (
						<label
							key={item.name}
							htmlFor={item.id}
							className={formClasses.label}
						>
							<span>{item.title}</span>
							<span className={formClasses.span} />
							<input
								type={'type' in item && item.type ? item.type : 'text'}
								name={item.name}
								id={item.id}
								className={formClasses.input}
								onChange={(event) =>
									setUserRoleData((prev) => ({
										...prev,
										[event.target.name]: event.target.value,
									}))
								}
							/>
						</label>
					);
			})}
			<span className={formClasses.span} />
			<button
				className={formClasses.button}
				type='submit'
				style={{
					backgroundColor: currentBgColorMode,
					color: currentFontColorMode,
				}}
			>
				Submit
			</button>
		</form>
	);
};

const SellerInputs = ({ userEmail }: ICompleteProfileFormProps) => {
	const router = useRouter();
	const [{ currentBgColorMode, currentFontColorMode }] = useSharedMainState();
	const formInputsId = useId();
	const completeSellerProfileDataMutation = trpc.useMutation(
		'user.profile.completeSellerProfileData'
	);

	const [userRoleData, setUserRoleData] = useState<
		Partial<TCompleteSellerProfileDataMutationInputs['roleData']>
	>({ bio: '', name: '' });

	const formFields = [
		{
			__type: 'FORM_NORMAL_INPUT',
			name: 'name',
			title: 'Name',
			id: `${formInputsId}-name`,
		},
		{
			__type: 'FORM_TEXTAREA',
			name: 'bio',
			title: 'Bio',
			id: `${formInputsId}-bio`,
		},
	];

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const checkIfAllExist = <T,>(obj: T) => {
			if (!obj || typeof obj !== 'object') throw new Error('Not an object!');

			let someItemsDoNotExist;
			let item: keyof typeof obj;
			for (item in obj) {
				if (!obj[item]) {
					someItemsDoNotExist = item;
					break;
				}
			}

			if (typeof someItemsDoNotExist === 'string')
				throw new Error(`Some items don't exist, ex: ${someItemsDoNotExist}`);

			return obj as Required<T & object>;
		};

		const requiredInputs = checkIfAllExist(userRoleData);

		const data = await completeSellerProfileDataMutation.mutateAsync({
			roleData: requiredInputs,
		});

		signOut({
			redirect: false,
		});

		router.push('/api/auth/signin');
	};

	return (
		<form onSubmit={handleSubmit} className={formClasses.form}>
			{formFields.map((item) => {
				if (item.__type === 'FORM_TEXTAREA')
					return (
						<label
							key={item.name}
							htmlFor={item.id}
							className={formClasses.label}
						>
							<span>{item.title}</span>
							<span className={formClasses.span} />
							<textarea
								name={item.name}
								id={item.id}
								className={formClasses.input}
								onChange={(event) =>
									setUserRoleData((prev) => ({
										...prev,
										[event.target.name]: event.target.value,
									}))
								}
							/>
						</label>
					);

				if (item.__type === 'FORM_NORMAL_INPUT')
					return (
						<label
							key={item.name}
							htmlFor={item.id}
							className={formClasses.label}
						>
							<span>{item.title}</span>
							<span className={formClasses.span} />
							<input
								// type={'type' in item && item.type ? item.type : 'text'}
								type='text'
								name={item.name}
								id={item.id}
								className={formClasses.input}
								onChange={(event) =>
									setUserRoleData((prev) => ({
										...prev,
										[event.target.name]: event.target.value,
									}))
								}
							/>
						</label>
					);
			})}
			<span className={formClasses.span} />
			<button
				type='submit'
				className={formClasses.button}
				style={{
					backgroundColor: currentBgColorMode,
					color: currentFontColorMode,
				}}
			>
				Submit
			</button>
		</form>
	);
};

const CompleteProfileForm = ({ userEmail }: ICompleteProfileFormProps) => {
	const formInputsId = useId();
	const [selectedRole, setSelectedRole] = useState<EUserRole>(
		EUserRole.CUSTOMER
	);

	return (
		<>
			<header className='w-full'>
				<button onClick={() => signOut()}>Sign Out</button>
			</header>
			<main className='flex flex-col items-center justify-center w-full h-full'>
				<div className='text-lg flex flex-col items-center justify-center p-2 h-full'>
					<label
						htmlFor={`${formInputsId}-userRole`}
						className={formClasses.label}
					>
						<span>Select your role:</span>
						<span className={formClasses.span} />
						<select
							name='userRole'
							id={`${formInputsId}-userRole`}
							className={formClasses.input}
							onChange={(event) => {
								if (
									event.target.value === EUserRole.CUSTOMER ||
									event.target.value === EUserRole.SELLER
								)
									setSelectedRole(event.target.value);
							}}
							defaultValue={selectedRole}
						>
							{[
								{ value: EUserRole.CUSTOMER, name: 'customer' },
								{ value: EUserRole.SELLER, name: 'seller' },
							].map((item) => (
								<option
									key={item.value}
									value={item.value}
									// selected={item.value === selectedRole}
								>
									{item.name}
								</option>
							))}
						</select>
					</label>
					<span className={formClasses.span} />
					{selectedRole === EUserRole.CUSTOMER && (
						<CustomerInputs userEmail={userEmail} />
					)}
					{selectedRole === EUserRole.SELLER && (
						<SellerInputs userEmail={userEmail} />
					)}
				</div>
			</main>
		</>
	);
};

const Layout = ({ children }: IProps) => {
	const { data: session, status } = useSession();
	const [, dispatch] = useSharedMainState();
	const [completeProfileFormVisible, setCompleteProfileFormVisible] = useState<
		string | undefined
	>();

	useEffect(() => {
		const lsBgColorMode = localStorage.getItem('currentBgColorMode');
		const lsFontColorMode = localStorage.getItem('currentFontColorMode');
		const lsThemeMode = localStorage.getItem('currentThemeMode');

		if (lsBgColorMode) setCurrentBgColorMode(dispatch, lsBgColorMode);
		if (lsFontColorMode) setCurrentFontColorMode(dispatch, lsFontColorMode);
		if (lsThemeMode && (lsThemeMode == 'light' || lsThemeMode == 'dark'))
			setThemeMode(dispatch, lsThemeMode);
		else setThemeMode(dispatch, 'dark');
		setIsMobileOrTablet(dispatch, isMobileOrTablet());
	}, [dispatch]);

	useEffect(() => {
		if (
			status === 'authenticated' &&
			!session.user.role &&
			session.user.email
		) {
			return setCompleteProfileFormVisible(session.user.email);
		}

		setCompleteProfileFormVisible(undefined);
	}, [session?.user.email, session?.user.role, status]);

	return typeof completeProfileFormVisible === 'string' ? (
		<CompleteProfileForm userEmail={completeProfileFormVisible} />
	) : (
		children
	);
};

const MainLayout = ({ children }: IProps) => {
	return (
		<SharedMainStateProvider>
			<Layout>{children}</Layout>
		</SharedMainStateProvider>
	);
};

export default MainLayout;
