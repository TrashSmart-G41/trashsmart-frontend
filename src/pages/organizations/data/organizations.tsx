import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/organization'

export const fetchOrganizations = async () => {
  const response = await request('GET', API_URL)
  // return response.data;
  console.log(response.data)
  return response.data
}
