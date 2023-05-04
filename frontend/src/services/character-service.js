import api from '../services/axios-service.js'

const CharacterService = {
    getAll: () => {
        return api.get(`/character/`)
    },
    get: (name) => {
        return api.get(`/character/${name}`)
    },
    add: (character) => {
        return api.post(`/character/`, {
            character: character
        })
    },
    update: (character) => {
        return api.put(`/character/`, {
            character: character
        })
    }
}

export default CharacterService
  
