import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/wcr'

export const fetchAllRequests = async () => {
  const response = await request('GET', API_URL)
  return response.data
}

export const fetchRequest = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const deleteRequest = async (id: string) => {
  const url = `${API_URL}/${id}` 
  const response = await request('DELETE', url)
  return response
}
    