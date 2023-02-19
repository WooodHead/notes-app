import { FormValues } from '@/components/forms/CreateNoteForm'
import axios from 'axios'
import { FieldValues } from 'react-hook-form'

export const register = async (email: string, password: string) => {
	const response = axios
		.post(
			'http://localhost:3000/auth/register',
			{
				email,
				password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.catch(function (error) {
			if (error) {
				return error
			}
		})

	return await response
}

export const login = async (email: string, password: string) => {
	const response = axios
		.post(
			`http://localhost:3000/auth/login`,
			{
				email,
				password,
			},
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.then((res) => {
			if (res) {
				return res
			}
		})
		.catch((error) => {
			if (error) {
				return error
			}
		})

	return await response
}

export const logout = async () => {
	sessionStorage.clear()
	localStorage.clear()
	return await fetch('http://localhost:3000/auth/logout', {
		method: 'POST',
		credentials: 'include',
	})
}

export const getUserNotes = async (token: string | null) => {
	const response = axios.get('http://localhost:3000/articles/my-articles', {
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
	return await response
}

export const createArticle = async (
	data: FormValues,
	token: any,
	email: string | undefined,
) => {
	const response = axios.post(
		'http://localhost:3000/articles',
		{
			title: data.title,
			description: data.description,
			authorEmail: email,
		},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		},
	)
	return await response
}

export const updateArticle = async (
	data: FormValues,
	token: any,
	email: string | undefined,
	id: string,
) => {
	const response = axios.patch(
		'http://localhost:3000/articles',
		{
			title: data.title,
			description: data.description,
			authorEmail: email,
		},
		{
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		},
	)

	return response
}

export const deleteNote = async (id: number) => {
	const response = axios.delete(`http://localhost:3000/articles/${id}`, {
		withCredentials: true,
	})
	return await response
}
