import { request } from '@/lib/axiosHelper'
const API_URL = 'api/v1/auction'

export const fetchAuction = async (id: string) => {
    const url = `${API_URL}/${id}`
    const response = await request('GET', url)
    return response.data
}
