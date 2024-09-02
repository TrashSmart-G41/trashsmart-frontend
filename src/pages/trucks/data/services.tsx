import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/garbage_truck'

export const fetchGarbageTrucks = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchGarbageTruck = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addGarbageTruck = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateGarbageTruck = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteGarbageTruck = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}
