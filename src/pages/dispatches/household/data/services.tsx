import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/household_dispatch'

export const fetchDispatches = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchDispatch = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addDispatch = async (data: string) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateDispatch = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteDispatch = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}