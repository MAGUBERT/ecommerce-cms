import { api } from "../../../lib/axios";
import type { CategoryDTO } from "../dtos/category.dto";

const BASE_URL = '/categories'

export const CategoryService = {
 
    async list(): Promise<CategoryDTO[]> {
        const response = await api.get(BASE_URL)
        return response.data
    },

    async create(category: CategoryDTO): Promise<CategoryDTO> {
        const response = await api.post(BASE_URL, category)
        return response.data
    },

    async getById(id: string): Promise<CategoryDTO> {
        const response = await api.get(`${BASE_URL}/${id}`)
        return response.data
    },

    async update(id: string, category: CategoryDTO): Promise<CategoryDTO> {
        const response = await api.put(`${BASE_URL}/${id}`, category)
        return response.data
    },

    async delete(id: string): Promise<void> {
        await api.delete(`${BASE_URL}/${id}`)
    }
}