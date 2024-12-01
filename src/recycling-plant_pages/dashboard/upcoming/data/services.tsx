import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/auction'

export const fetchUpcomingAuctions = async () => {
  const url = `${API_URL}/upcoming`
  const response = await request('GET', url)
  return response.data
}

export const fetchUpcomingAuction = async (id: string) => {
  const url = `${API_URL}/upcoming/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addAuction = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const registerForAuction = async (
  auctionId: number,
  recyclingPlantId: number
) => {
  const url = `${API_URL}/${auctionId}/register?recyclingPlantId=${recyclingPlantId}`
  const response = await request('POST', url)
  return response
}
