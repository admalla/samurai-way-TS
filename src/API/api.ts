import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '96621b9e-66da-4457-bd2c-0cd5eeae0e5a',
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const usersAPI = {
    getUsers(count: number, page: number) {
        return instance.get(`users/?count=${count}&page=${page}`)
    },
    getFollow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    getUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    isFollowed(userId: number) {
        return instance.get(`follow/${userId}`)
    },
    getProfile(userId: number) {
        return instance.get(`/profile/${userId}`)
    }
};