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

// export const addCommercialBin = async (data: any) => {
//   const response = await request('POST', API_URL, data)
//   return response
// }

export const addCommercialBin = async (data: any, organizationId: string) => {
  // Construct the dynamic URL with the organization_id
  const url = `${API_URL}/${organizationId}`;
  
  // Send the POST request to the constructed URL
  const response = await request('POST', url, data);
  return response;
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
