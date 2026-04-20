import axios from 'axios'

import { API_BASE_URL } from '@/services/api/config'

export const apiPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
})
