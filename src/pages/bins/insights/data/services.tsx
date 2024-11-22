import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/smart_bin'

export const binCount = async () => {
  const url = `${API_URL}/count`
  const response = await request('GET', url)
  return response.data
}

export const FULLbinCount = async () => {
  const url = `${API_URL}/full`
  const response = await request('GET', url)
  return response.data
}
