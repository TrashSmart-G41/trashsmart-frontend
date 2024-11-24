import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/auction'

export const fetchPastAuctions = async () => {
  const url = `${API_URL}/past`
  const response = await request('GET', url)
  return response.data
}

export const fetchPastAuction = async (id: string) => {
  const url = `${API_URL}/past/${id}`
  const response = await request('GET', url)
  return response.data
}


export const deleteOrganization = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}

export const fetchWinningPlant = async (id: string) => {
  const url = `api/v1/recyclingPlant/${id}`
  const response = await request('GET', url)
  return response.data
}