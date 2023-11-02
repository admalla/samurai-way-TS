import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  headers: {
    "API-KEY": "96621b9e-66da-4457-bd2c-0cd5eeae0e5a",
  },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const usersAPI = {
  getUsers(count: number, page: number) {
    return instance.get(`users/?count=${count}&page=${page}`);
  },
  getFollow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  getUnfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
  },
  isFollowed(userId: number) {
    return instance.get(`follow/${userId}`);
  },
};

export const ProfileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put("profile/status", { status });
  },
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance.put("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export const AuthAPI = {
  getAuthUser() {
    return instance.get("auth/me");
  },
  Login(data: { email: string; password: string; rememberMe: boolean }) {
    return instance.post("auth/login", { ...data, captcha: true });
  },
  LogOut() {
    return instance.delete("auth/login");
  },
};
