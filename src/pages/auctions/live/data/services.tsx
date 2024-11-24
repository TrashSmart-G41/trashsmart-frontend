import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/auction'

export const fetchLiveAuctions = async () => {
  const url = `${API_URL}/live`
  const response = await request('GET', url)
  return response.data
}

export const fetchLiveAuction = async (id: string) => {
  const url = `${API_URL}/live/${id}`
  const response = await request('GET', url)
  return response.data
}

export const fetchWinningPlant = async (id: string) => {
  const url = `api/v1/recyclingPlant/${id}`
  const response = await request('GET', url)
  return response.data
}