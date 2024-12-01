import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/auction'

export const fetchCanceledAuctions = async () => {
  const url = `${API_URL}/canceled`
  const response = await request('GET', url)
  return response.data
}

export const fetchCanceledAuction = async (id: string) => {
  const url = `${API_URL}/canceled/${id}`
  const response = await request('GET', url)
  return response.data
}
