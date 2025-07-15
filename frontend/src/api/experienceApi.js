import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api'

export const fetchExperiences = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/experiences/`)
    return response.data
  } catch (error) {
    console.error('Error fetching experiences:', error)
    throw error
  }
}
