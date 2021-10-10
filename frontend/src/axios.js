import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
})

export default instance
// http://e-shop-app-77.herokuapp.com