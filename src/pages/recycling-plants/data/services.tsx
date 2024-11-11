import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/recyclingPlant'

export const fetchRecyclingPlants = async () => {
  const url = `${API_URL}/active`;
  const response = await request('GET', url)
  return response.data
}

export const fetchRecyclingPlant = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addRecyclingPlant = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateRecyclingPlant = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteRecyclingPlant = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}
