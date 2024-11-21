import { request } from "@/lib/axiosHelper";
const API_URL = "api/v1/cleaner"

export const fetchCleaners = async () => {
    const response = await request('GET', API_URL)
    return response.data
}

export const fetchCleaner = async (id: any) => {
    const url = `${API_URL}/${id}`
    const response = await request('GET', url)
    return response.data
}

export const addCleaner = async (data: any) => {
    const response = await request('POST', API_URL, data)
    return response
}

export const updateCleaner = async (data: any, id: any) => {
    const url = `${API_URL}/${id}`
    const response = await request('PUT', url, data)
    return response
}

export const deleteCleaner = async (id: any) => {
    const url = `${API_URL}/${id}`
    const response = await request('DELETE', url)
    return response
}