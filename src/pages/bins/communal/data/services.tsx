import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/communal_bin'

export const fetchCommunalBins = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchCommunalBin = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

// export const addCommercialBin = async (data: any) => {
//   const response = await request('POST', API_URL, data)
//   return response
// }

export const addCommunalBin = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateCommunalBin = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteCommunalBin = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}

export const assignCleaner = async (data: any, id: string) => {
  const url = `${API_URL}/assign/${id}`
  const response = await request('PUT', url, data)
  return response
}
