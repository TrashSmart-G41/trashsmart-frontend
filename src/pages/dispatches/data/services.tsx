import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/organization_dispatch'

export const fetchDispatchess = async () => {
  const response = await request('GET', API_URL)
  console.log(response)
  return response.data
}

export const fetchDispatch = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('GET', url)
  return response.data
}

export const addDispatch = async (data: any) => {
  const response = await request('POST', API_URL, data)
  return response
}

export const updateDispatch = async (id: string, data: any) => {
  const url = `${API_URL}/${id}`
  const response = await request('PUT', url, data)
  return response
}

export const deleteDispatch = async (id: string) => {
  const url = `${API_URL}/${id}`
  const response = await request('DELETE', url)
  return response
}
