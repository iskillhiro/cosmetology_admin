import React, { useEffect, useState } from 'react'
import axiosDB from '../../utils/axios'
import './Home.scss'

export default function Home() {
	const [statisticData, setStatisticData] = useState({
		allRaffles: 0,
		allUsers: 0,
	})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const getStatistic = async () => {
			const response = await axiosDB.get()

			if (response.data.success) {
				setStatisticData({
					allRaffles: response.data.allRaffles,
					allUsers: response.data.allUsers,
				})
			}

			setIsLoading(false)
		}

		getStatistic()
	}, [])

	return (
		<div className='home'>
			<h1 className='home__title'>Статистика приложения</h1>
			<div className='home__statistic'>
				<div className='statistic__card'>
					<p className='statistic__label'>Активных розыгрышей:</p>
					<p className='statistic__value'>
						{!isLoading ? (
							statisticData.allRaffles
						) : (
							<div className='loading-spinner'></div>
						)}
					</p>
				</div>
				<div className='statistic__card'>
					<p className='statistic__label'>Всего пользователей:</p>
					<p className='statistic__value'>
						{!isLoading ? (
							statisticData.allUsers
						) : (
							<div className='loading-spinner'></div>
						)}
					</p>
				</div>
			</div>
		</div>
	)
}
