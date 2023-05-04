import api from '../services/axios-service.js'

const NpcService = {
    getAll: () => {
        return api.get(`/npc/`)
    },
    count: () => {
        return api.get(`/npc/count`)
    },
    get: (name) => {
        return api.get(`/npc/${name}`)
    },
    add: (npc) => {
        return api.post(`/npc/`, {
            npc: npc
        })
    },
    update: (npc) => {
        return api.put(`/npc/`, {
            npc: npc
        })
    }
}

export default NpcService
  
