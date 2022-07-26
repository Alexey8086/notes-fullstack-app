import { $authHost, $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name) => {
  const { data } = await $host.post('api/user/registration', {email, password, name})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const check = async () => {
  const { data } = await $authHost.post('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const getUser = async () => {
  const user = await $authHost.post('api/user/getUser')
  return user
}

export const updateSettings = async (id, avatar, name) => {
  const res = await $authHost.post('api/settings/update', {id, avatar, name})
  return res
}

export const handleImage = async (avatar) => {
  const res = await $authHost.post('api/uploads/imgs', avatar)
  return res
}