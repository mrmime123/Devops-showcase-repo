import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'

export const fetchSkills = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skills/`)
    return response.data
  } catch (error) {
    console.error('Error fetching skills:', error)
    throw error
  }
}
