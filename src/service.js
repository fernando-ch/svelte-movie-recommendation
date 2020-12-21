import axios from 'axios'
import { baseUrl } from './config'
import { userId } from "./stores/userIdStore"

let id

userId.subscribe(value => id = value)

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

export async function makeRecommendation(title, stream) {
    try {
        await axios.post(`${baseUrl}/recommendations`, { title, stream, userId: id })
    } catch (e) {
        if (e.response.status === 401)
            throw new Error('Faça login antes de recomendar um filme')

        if (e.response.status === 400)
            throw new Error(e.response.data.message)

        throw new Error('Ocorreu um erro no sistema')
    }
}

export async function vote(userId, title, watched) {
    try {
        await axios.post(`${baseUrl}/voting`, { userId, title, watched })
    } catch (e) {
        if (e.response.status === 401)
            throw new Error('Faça login antes de votar em um filme')

        if (e.response.status === 400)
            throw new Error(e.response.data.message)

        throw new Error('Ocorreu um erro no sistema')
    }
}