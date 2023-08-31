import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '96621b9e-66da-4457-bd2c-0cd5eeae0e5a',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
    getUsers() {
        return instance.get(`users`).then((response) => {
            return response.data;
        });
    }
};