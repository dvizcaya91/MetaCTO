import axios from 'axios'

import { API_BASE_URL } from '@/services/api/config'

export const apiPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})

export const setApiPrivateAccessToken = (accessToken: string | null) => {
  if (!accessToken) {
    delete apiPrivate.defaults.headers.common.Authorization
    return
  }

  apiPrivate.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}
