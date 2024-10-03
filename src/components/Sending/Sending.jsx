import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import * as yup from 'yup'
import axiosDB from '../../utils/axios'
import './Sending.scss'

const schema = yup.object().shape({
	title: yup.string().required('Заполните поле'),
	message: yup.string().required('Заполните поле'),
	buttons: yup
		.array()
		.of(
			yup.object().shape({
				text: yup.string().required('Заполните поле'),
				url: yup
					.string()
					.url('Введите корректный адрес')
					.required('Заполните поле'),
			})
		)
		.max(2, 'You can add a maximum of 2 buttons'),
})

export default function Sending() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			buttons: [{ text: '', url: '' }],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'buttons',
	})

	const onSubmit = async data => {
		const response = await axiosDB.post('/sending', data, {
			headers: { 'Content-Type': 'application/json' },
		})
		response.data.success
			? alert('Рассылка успешно отправлена')
			: alert('Ошибка в отправке рассылки')
		response.success
			? alert('Рассылка успешно отправлена')
			: alert('Ошибка в отправке рассылки')
	}

	return (
		<div className='form-container'>
			<h2>Рассылка</h2>
			<form
				onSubmit={handleSubmit(onSubmit, errors => console.log(errors))}
				className='sending-form'
			>
				<div className='form-group'>
					<label>Заголовок</label>
					<input {...register('title')} placeholder='Введите заголовок' />
					<p className='error'>{errors.title?.message}</p>
				</div>
				<div className='form-group'>
					<label>Сообщение</label>
					<textarea {...register('message')} placeholder='Введите сообщение' />
					<p className='error'>{errors.message?.message}</p>
				</div>
				<div className='form-group'>
					<label>Кнопки</label>
					{fields.map((field, index) => (
						<div key={field.id} className='button-row'>
							<input
								{...register(`buttons.${index}.text`)}
								placeholder='Название'
							/>
							<input
								{...register(`buttons.${index}.url`)}
								placeholder='Ссылка'
							/>
							<button
								type='button'
								className='remove-button'
								onClick={() => remove(index)}
							>
								<AiOutlineMinus />
							</button>
						</div>
					))}
					{fields.length < 2 && (
						<button
							type='button'
							className='add-button'
							onClick={() => append({ text: '', url: '' })}
						>
							<AiOutlinePlus />
						</button>
					)}
					<p className='error'>{errors.buttons?.message}</p>
				</div>
				<div className='button-group'>
					<button type='submit' className='submit-button'>
						Отправить уведомление
					</button>
				</div>
			</form>
		</div>
	)
}
