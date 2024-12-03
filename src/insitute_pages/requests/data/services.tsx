import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/wcr'

export const fetchAllRequestsByOrganization = async (id: number) => {
  const url = `${API_URL}/organization/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addRequest = async (
  id: number,
  data: { wasteType: string; accumulatedVolume: number }
) => {
  const url = `${API_URL}/${id}`
  const response = await request('POST', url, data)
  return response
}

export const deleteRequest = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}

export const fetchRequest = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}
