import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
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
	promo: yup.string().nullable(),
})

export default function CreateRaffle() {
	const [raffleState, setRaffleState] = useState(1)

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

	const stateBack = e => {
		e.preventDefault()
		setRaffleState(raffleState - 1)
	}
	const stateNext = e => {
		e.preventDefault()
		setRaffleState(raffleState + 1)
	}

	return (
		<div className='form-container'>
			<h2>Создание розыгрыша</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='raffle-form'>
				{raffleState === 1 ? (
					<>
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
					</>
				) : (
					''
				)}

				{raffleState === 2 ? (
					<>
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
					</>
				) : (
					''
				)}
				{raffleState === 3 ? (
					<>
						<div className='form-group'>
							<label>Дата окончания</label>
							<input type='datetime-local' {...register('endDate')} />
							<p className='error'>{errors.endDate?.message}</p>
						</div>
					</>
				) : (
					''
				)}
				{raffleState === 4 ? (
					<>
						<div className='form-group'>
							<label>Промокод (Необязательно)</label>
							<input {...register('promo')} placeholder='Введите промокод' />
						</div>
						<button type='submit' className='submit-button'>
							Создать розыгрыш
						</button>
					</>
				) : (
					''
				)}

				{raffleState >= 1 && raffleState < 4 ? (
					<>
						<button className='submit-button' onClick={stateNext}>
							Далее
						</button>
					</>
				) : (
					''
				)}
				{raffleState > 1 ? (
					<>
						<button className='submit-button' onClick={stateBack}>
							Назад
						</button>
					</>
				) : (
					''
				)}
			</form>
		</div>
	)
}
