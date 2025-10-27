import { useMutation, useQuery } from "@tanstack/react-query";
import type { CategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../service/category.service";

export function useCategories() {
    return useQuery<CategoryDTO[]>({
       queryKey: ['categories'],
       queryFn: CategoryService.list
    });
}

export function useCategory(id: string) {
    return useQuery<CategoryDTO>({
        queryKey: ['category', id],
        queryFn: () => CategoryService.getById(id),
        enabled: !!id
    });
}

export function useCreateCategory() {
    return useMutation<CategoryDTO, Error, Omit<CategoryDTO, 'id'>>({
        mutationFn: (category: Omit<CategoryDTO, 'id'>) => CategoryService.create(category)
    })
}

export function useUpdateCategory() {
    return useMutation<CategoryDTO, Error, {id: string, category: CategoryDTO}>({
        mutationFn: ({id, category}) => CategoryService.update(id, category)
    })
}

export function useDeleteCategory() {
    return useMutation<void, Error, string>({
        mutationFn: (id) => CategoryService.delete(id)
    })
}