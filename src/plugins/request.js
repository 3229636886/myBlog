import axios from "axios"

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    timeout: 30000
})

export function $post(url, params) {
    return instance.post(url, params)
}

export function $get(url, params) {
    if (params) return instance.get(url, {params: params})
    return instance.get(url)
}

export function $del(url) {
    return instance.delete(url)
}