import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://e-shop-app-77.herokuapp.com',
})

export default instance
