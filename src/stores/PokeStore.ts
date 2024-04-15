import { defineStore } from 'pinia'
import { fetchData, fetchSpecies, fetchPageData } from '@/api/api'

import type Poke from '@/types/Poke'

export const usePokeStore = defineStore('pokeStore', {
  state: () => ({
    data: [] as Poke[], // Initialize data as an empty array of Poke
    count: 0,
    loadedPokePage: {},
    loadedPokeSpeciesPage: {}
  }),
  actions: {
    playCry() {
      const audioFile = this.loadedPokePage.cries.legacy

      console.log(this.loadedPokePage)

      const audio = new Audio(audioFile)
      audio.play()
    },
    async fill(params?: string) {
      // Optional params
      try {
        const fetchedData = await fetchData(params)

        const modifiedData =
          fetchedData.results?.map((item) => ({ ...item, isSelected: false })) ?? []

        // console.log(modifiedData)

        this.data = modifiedData ?? []
        this.count = modifiedData.count ?? 0
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle error or throw it further
      }
    },
    async select(name?: string) {
      console.log('getting data ' + name)
      try {
        const fetchedData = await fetchPageData(name)
        // console.log(fetchedData)
        this.loadedPokePage = fetchedData
        this.deselectAll()
        this.data.forEach((p) => {
          if (p.name === name) {
            p.isSelected = true
            console.log(p)
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
        return [] // or handle error accordingly
      }
    },
    deselectAll() {
      console.log('deselect all')
      // this.data.forEach(e === e.isSelected).isSelected = false
      this.data.forEach((item) => (item.isSelected = false))
    }
  },

  getters: {
    getPokeMainPage: (state) => async (name: string) => {
      console.log('getting data ' + name)
      try {
        const fetchedData = await fetchPageData(name)
        // console.log(fetchedData)
        state.loadedPokePage = fetchedData
        // console.log(state)
      } catch (error) {
        console.error('Error fetching data:', error)
        return [] // or handle error accordingly
      }
    },
    getPokeSpeciesPage: (state) => async (name: string) => {
      console.log('getting species ' + name)
      try {
        const fetchedSpeciesData = await fetchSpecies(name)
        state.loadedPokeSpeciesPage = fetchedSpeciesData
        // console.log(state)
      } catch (error) {
        console.error('Error fetching data:', error)
        return [] // or handle error accordingly
      }
    }
  }
})
