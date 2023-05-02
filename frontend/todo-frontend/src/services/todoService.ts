import axios from 'axios';

const API_URL = 'http://localhost:8080/todos';

export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addTodo = async (title: string, completed: boolean) => {
    const response = await axios.post(API_URL, { title, completed });
    return response.data;
};

export const updateTodo = async (id: number, title: string, completed: boolean) => {
    const response = await axios.put(`${API_URL}/${id}`, { title, completed });
    return response.data;
};

export const deleteTodo = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
