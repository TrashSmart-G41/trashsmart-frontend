import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/commercial_bin'

export const fetchCommercialBins = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchCommercialBin = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addCommercialBin = async (id: string, apiKey: string) => {
  const url = `${API_URL}/organization/${id}/api_key/${apiKey}`
  const response = await request('POST', url)
  return response
}

export const updateCommercialBin = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteCommercialBin = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}

export const fetchCommercialBinByOrg = async (id: string) => {
  const url = `${API_URL}/organization/${id}`
  const response = await request('GET', url)
  return response.data
}

export const sendWCR = async (id: string) => {
  const url = `api/v1/wcr/bin/${id}`
  const response = await request('POST', url)
  return response
}
