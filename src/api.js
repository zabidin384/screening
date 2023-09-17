import axios from "axios";

const API = axios.create({ baseURL: `${import.meta.env.VITE_BASE_URL}/v1` });

export const getAnswerType = () => API.get("/answer-type");
// Screening
export const getScreeningList = () => API.get("/screening");
export const getScreening = (id) => API.get(`/screening/${id}`);
export const createScreening = (formData) => API.post("/screening", formData);
export const updateScreening = (formData, id) => API.put(`/screening/${id}`, formData);
export const deleteScreening = (id) => API.delete(`/screening/${id}`);
// Question
export const getQuestion = (id) => API.get(`/screening-detail/${id}`);
export const getQuestions = (id) => API.get(`/screening-detail?screening_id=${id}&&expand=answerType`);
export const createQuestion = (formData) => API.post("/screening-detail", formData);
export const updateQuestion = (formData, id) => API.put(`/screening-detail/${id}`, formData);
export const deleteQuestion = (id) => API.delete(`/screening-detail/${id}`);
