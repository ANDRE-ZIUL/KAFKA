import { api } from "./api";

export const sendMessage = (message: string) => api.post('/send', { message });