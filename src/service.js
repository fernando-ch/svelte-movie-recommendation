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
        if (e.response?.status === 404)
            throw new Error('Usuário não encontrado')

        throw new Error(e)
    }
}

export async function getCurrentRound() {
    try {
        let response = await axios.get(`${baseUrl}/rounds/current`)
        return response.data
    } catch (e) {
        if (e.response?.status === 404)
            throw new Error('Rodada não foi encontrada')

        throw new Error(e)
    }
}

export async function getStreams() {
    try {
        let response = await axios.get(`${baseUrl}/streams`)
        return response.data
    } catch (e) {
        throw new Error(e)
    }
}

export async function makeRecommendation(movieId, title, stream) {
    try {
        if (movieId) {
            await axios.put(`${baseUrl}/movies/${movieId}/`, { title, stream, userId: id })
        }
        else {
            await axios.post(`${baseUrl}/movies/`, { title, stream, userId: id })
        }
    } catch (e) {
        if (e.response?.status === 401)
            throw new Error('Faça login antes de recomendar um filme')

        if (e.response?.status === 400)
            throw new Error(e.response.data.message)

        throw new Error(e)
    }
}

export async function vote(userId, title, watched) {
    try {
        await axios.post(`${baseUrl}/movie-visualization/voting`, { userId, title, watched })
    } catch (e) {
        if (e.response?.status === 401)
            throw new Error('Faça login antes de votar em um filme')

        if (e.response?.status === 400)
            throw new Error(e.response.data.message)

        throw new Error(e)
    }
}

export function subscribeToNotification(userId, subscription) {
    return axios.post(`${baseUrl}/subscriptions`, { userId, subscription })
}

export function toggleWatched(userId, title, watched) {
    return axios.put(`${baseUrl}/movie-visualization/toggle-watched`, { userId, title, watched })
}

export function newRound() {
    return axios.post(`${baseUrl}/rounds`)
}