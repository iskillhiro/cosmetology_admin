import React from 'react'
import { FaHome, FaUserAlt } from 'react-icons/fa'
import { MdEmojiEvents } from 'react-icons/md'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.scss'

const Navigation = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__menu}>
				<Link to='/' className={styles.navbar__item}>
					<FaHome />
				</Link>
				<Link to='/sending' className={styles.navbar__item}>
					<FaUserAlt />
				</Link>
				<Link to='/raffle' className={styles.navbar__item}>
					<MdEmojiEvents />
				</Link>
			</div>
		</nav>
	)
}

export default Navigation
