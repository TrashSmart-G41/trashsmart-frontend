import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/organization'

export const fetchOrganizations = async () => {
  const response = await request('GET', API_URL)
  return response.data
}

export const fetchOrganization = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addOrganization = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateOrganization = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteOrganization = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}
