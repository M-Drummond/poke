// api.js (API Service)
import axios, { Axios, AxiosError } from 'axios'
import type { Url } from 'url'

const API_URL: Url = 'https://pokeapi.co/api/v2/pokemon/'
const API_URL_SPECIES: Url = 'https://pokeapi.co/api/v2/pokemon-species/'

export async function fetchData(params: string) {
  try {
    const response = await axios.get(`${API_URL}` + '?' + params)
    // console.log(response.data)w
    return response.data
  } catch (error: AxiosError | null) {
    throw new Error(error?.response.data.message || 'Failed to fetch data')
  } finally {
    console.log('fetch finished')
  }
}

export async function fetchSpecies(name: string) {
  try {
    const response = await axios.get(`${API_URL_SPECIES}` + name)
    // console.log(response)
    return response.data
  } catch (error: AxiosError | null) {
    throw new Error(error?.response.data.message || 'Failed to fetch data')
  } finally {
    console.log('fetch finished')
  }
}

export async function fetchPageData(name: string) {
  try {
    const response = await axios.get(`${API_URL}` + name)
    // console.log(response)
    return response.data
  } catch (error: AxiosError | null) {
    throw new Error(error?.response.data.message || 'Failed to fetch data')
  } finally {
    console.log('fetch finished')
  }
}
