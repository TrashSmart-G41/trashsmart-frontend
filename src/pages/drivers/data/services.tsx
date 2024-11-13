import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/driver'

export const fetchDrivers = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchDriver = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addDriver = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateDriver = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteDriver = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}
