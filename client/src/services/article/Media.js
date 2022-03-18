/* import apiClient from '../' */
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api'

export default {
    async getArticlesEvent(itemsPerPage, pageStart, page, search, category, rangeDate) {
        return await axios.post(`${apiUrl}/articles/getArticles`, { itemsPerPage, pageStart, page, search, category, dateStart: rangeDate.dateStart, dateEnd: rangeDate.dateEnd},{
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
    },
}
