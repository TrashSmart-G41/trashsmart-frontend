import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/maintenance_request'

export const fetchMaintenanceRequests = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchMaintenanceRequest = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addMaintenanceRequest = async (data: any, binId: string) => {
  const url = `${API_URL}/${binId}`
  const response = await request('POST', url, data)
  return response
}

export const updateMaintenanceRequest = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteMaintenanceRequest = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}

export const requestCount = async () => {
  const url = `${API_URL}/count`
  const response = await request('GET', url)
  return response
}
