import axios from 'axios'
import { WEB_URL } from './config'

const axiosDB = axios.create({
	baseURL: WEB_URL,
})

export default axiosDB
