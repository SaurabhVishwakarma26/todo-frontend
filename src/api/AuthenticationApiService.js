import { apiClient } from "./ApiClient";

export const basicAuthServiceApi = (token) => apiClient.get('/basicAuth', {
    headers: {
        Authorization: token
    }
})

export const jwtAuthServiceApi = (username, password) => apiClient.post('/authenticate',
    { username, password }
)