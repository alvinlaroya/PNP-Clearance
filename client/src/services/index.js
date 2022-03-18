import axios from 'axios'

export default axios.create({
    baseUrl: 'http://127.0.0.1:8081/api', 
    withCredentials: false,
    headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
})
