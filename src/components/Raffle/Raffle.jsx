import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axiosDB from '../../utils/axios'
import './CreateRaffle.scss'

const schema = yup.object().shape({
	title: yup.string().required('Название розыгрыша обязательно'),
	description: yup.string().required('Описание розыгрыша обязательно'),
	numberOfWinners: yup
		.number()
		.required('Количество победителей обязательно')
		.min(1, 'Должен быть хотя бы один победитель'),
	prizes: yup.string().required('Призы обязательны'),
	endDate: yup.date().required('Дата окончания обязательна'),
})

export default function CreateRaffle() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const onSubmit = async data => {
		console.log('Форма отправлена с данными:', data)
		axiosDB.post('/raffle', data, {
			headers: { 'Content-Type': 'application/json' },
		})
	}

	return (
		<div className='form-container'>
			<h2>Создание розыгрыша</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='raffle-form'>
				<div className='form-group'>
					<label>Название розыгрыша</label>
					<input {...register('title')} placeholder='Введите название' />
					<p className='error'>{errors.title?.message}</p>
				</div>
				<div className='form-group'>
					<label>Описание розыгрыша</label>
					<textarea
						{...register('description')}
						placeholder='Введите описание'
					/>
					<p className='error'>{errors.description?.message}</p>
				</div>
				<div className='form-group'>
					<label>Количество победителей</label>
					<input
						type='number'
						{...register('numberOfWinners')}
						placeholder='Введите количество победителей'
					/>
					<p className='error'>{errors.numberOfWinners?.message}</p>
				</div>
				<div className='form-group'>
					<label>Призы</label>
					<input
						{...register('prizes')}
						placeholder='Введите призы через запятую'
					/>
					<p className='error'>{errors.prizes?.message}</p>
				</div>
				<div className='form-group'>
					<label>Дата окончания</label>
					<input type='datetime-local' {...register('endDate')} />
					<p className='error'>{errors.endDate?.message}</p>
				</div>
				<button type='submit' className='submit-button'>
					Создать розыгрыш
				</button>
			</form>
		</div>
	)
}
