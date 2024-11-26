import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/auction'

export const fetchAllAuctions = async () => {
  const response = await request('GET', API_URL)
  return response.data
}

export const fetchAuction = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const deleteUpcomingAuction = async (id: string) => {
  const url = `${API_URL}/upcoming/${id}`
  const response = await request('DELETE', url)
  return response.data
}

export const deletePastAuction = async (id: string) => {
  const url = `${API_URL}/past/${id}`
  const response = await request('PUT', url)
  return response.data
}

export const cancelAuction = async (id: string) => {
  const url = `${API_URL}/cancel/${id}`
  const response = await request('PUT', url)
  return response.data
}
