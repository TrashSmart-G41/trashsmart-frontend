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

export const addAuction = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}
