import axios from 'axios'
import config from '../config'

const $host = axios.create({
  baseURL: config.baseUrl
})

const $authHost = axios.create({
  baseURL: config.baseUrl
})

const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}