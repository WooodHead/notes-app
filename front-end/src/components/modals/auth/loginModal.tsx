import React, { useEffect, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { userService } from "../../../services/userService"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import styles from "./authModals.module.scss"
import { authErrors } from "../../../utils/formErrors"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"
import { FeedPerson, XCircle } from "../../icons"
import * as Dialog from "@radix-ui/react-dialog"
import useUserStore from "../../../stores/store"

interface LoginModalInterface {
	toggleLogin: boolean
	setToggleLogin: React.Dispatch<React.SetStateAction<boolean>>
	toggleSignUp: boolean
	setToggleSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal = ({
	toggleLogin,
	setToggleLogin,
	setToggleSignUp,
}: LoginModalInterface) => {
	const { currentUser, logOut, setCurrentUser } = useUserStore(store => store)
	const [submitting, setSubmitting] = useState(false)
	const [errorStatus, setErrorStatus] = useState<string | undefined>()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const onSubmit = async (data: any) => {
		await userService
			.login(data.email, data.password)
			.then(() => {
				userService
					.getLoggedInUser()
					.then(res => setCurrentUser(res))
					.then(() => {
						setToggleLogin(false)
						setSubmitting(true)
					})
					.finally(() => navigate("/notes"))
			})
			.catch(error => {
				if (error.response.status === 404) {
					setErrorStatus("User not found. Check credentials")
				}
			})
	}

	useEffect(() => {
		if (submitting) {
			userService.getLoggedInUser().then(res => setCurrentUser(res))
		}
		return () => {
			setSubmitting(false)
		}
	}, [logOut, setCurrentUser, submitting])

	const handleLogout = () => {
		userService.logout()
		logOut()
		useUserStore.persist.clearStorage()
		navigate("/")
	}

	const DropDown = (): JSX.Element => {
		return (
			<DropdownButton
				className={styles.dropdown}
				title={<FeedPerson size={35} />}
				menuVariant='dark'
				variant='none'
			>
				<Dropdown.Item href='/profile'>Profile</Dropdown.Item>
				<Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
				<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
			</DropdownButton>
		)
	}

	const LoginSignUp = () => {
		const login = () => setToggleLogin(true)
		const signup = () => setToggleSignUp(true)

		return (
			<>
				<Button onClick={login}>Sign In</Button>
				<Button onClick={signup}>Sign Up</Button>
			</>
		)
	}

	return (
		<>
			{currentUser ? <DropDown /> : <LoginSignUp />}
			<Dialog.Root open={toggleLogin}>
				<Dialog.Trigger />
				<Dialog.Portal className={styles.modal}>
					<Dialog.Overlay className={styles.overlay}>
						<Dialog.Content className={styles.content}>
							<h4>Sign in to your account</h4>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={styles.input}>
									<label htmlFor='email'>Email</label>
									<input
										id='email'
										type='text'
										{...register("email", authErrors.email)}
									/>
									<div className={styles.errors}>
										{errors?.email && errors.email.message}
									</div>
								</div>
								<div className={styles.input}>
									<label htmlFor='password'>Password</label>
									<input
										id='password'
										type='password'
										{...register(
											"password",
											authErrors.password
										)}
									/>
									<div className={styles.errors}>
										{errors?.password &&
											errors?.password.message}
										{errorStatus && errorStatus}
									</div>
								</div>
								<div className={styles.buttons}>
									<Button type='submit'>Sign in</Button>
									<Button
										onClick={() => setToggleLogin(false)}
										className={styles.closeIcon}
									>
										Cancel
									</Button>
								</div>
							</form>
						</Dialog.Content>
					</Dialog.Overlay>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	)
}

export { LoginModal }
