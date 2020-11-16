import axios from 'axios'
import { baseUrl } from './config'

export async function getUserId(userName) {
    try {
        let response = await axios.get(`${baseUrl}/users/${userName}`)
        return response.data.id
    } catch (e) {
        if (e.response.status === 404)
            throw new Error('Usuário não encontrado')

        throw new Error('Ocorreu um erro no sistema')
    }
}

export async function getCurrentRound() {
    try {
        let response = await axios.get(`${baseUrl}/rounds/current`)
        return response.data
    } catch (e) {
        if (e.response.status === 404)
            throw new Error('Rodada não foi encontrada')

        throw new Error('Ocorreu um erro no sistema')
    }
}

export async function getStreams() {
    try {
        let response = await axios.get(`${baseUrl}/streams`)
        return response.data
    } catch (e) {
        throw new Error('Ocorreu um erro no sistema')
    }
}