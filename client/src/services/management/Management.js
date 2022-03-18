/* import apiClient from '../' */
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api'

export default {
    async getUsersEvent() {
        return await axios.get(`${apiUrl}/user/getUsers`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
    },
    async updateUserEvent(payload) {
        return await axios.put(`${apiUrl}/user/updatePersonnel/${payload.id}`, payload, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
    },
}
