import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const getAuthToken = () => {
  return window.localStorage.getItem('token')
}

export const setAuthToken = (token: string) => {
  window.localStorage.setItem('token', token)
}

export const setAuthHeader = (token: string | null) => {
  if (token !== null) {
    window.localStorage.setItem('token', token)
  } else {
    window.localStorage.removeItem('token')
  }
}

export const removeAuthToken = () => {
  window.localStorage.removeItem('token')
}

export const request = async <T>(
  method: AxiosRequestConfig['method'],
  url: string,
  data?: any
): Promise<AxiosResponse<T>> => {
  try {
    let headers = {}
    const authToken = getAuthToken()
    if (authToken !== null && authToken !== 'null') {
      headers = {
        Authorization: `Bearer ${authToken}`,
      }
    }

    const response = await axios({
      method,
      url,
      data,
      headers,
    })
    return response
  } catch (error) {
    // Handle error appropriately
    throw error
  }
}
