import { $authHost, $host } from "./index"


export const createNote = async (data, userId) => {
  const res = await $authHost.post('api/notes/create', {data, userId})
  return res
}

export const updataNote = async (data, id) => {
  const res = await $authHost.post(`api/notes/update/${id}`, {data, id})
  return res
}

export const deleteOneNote = async (id) => {
  const res = await $authHost.get(`api/notes/delete?id=${id}`)
  return res
}

export const getOneNote = async (id) => {
  const data = await $authHost.get(`api/notes/${id}?id=${id}`)
  return data
}

export const getAllNotes = async () => {
  const data = await $authHost.post('api/notes/all')
  return data
}