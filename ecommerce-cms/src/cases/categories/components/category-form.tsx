import { SidebarForm } from "@/components/layout/sidebar-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory, useCreateCategory, useDeleteCategory, useUpdateCategory } from "../hooks/use-category";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, 'Informe pelo menos 2 caracteres').max(60, 'Máximo de 60 caracteres')
})

export function CategoryForm() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const {data, isLoading} = useCategory(id ?? '');

    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name
            });
        }
    }, [data, form]);

    function onSubmit(value: z.infer<typeof formSchema>) {
        if (id) {
            updateCategory.mutate(
                {
                    id: id,
                    category: {
                        name: value.name
                    }
                },
                {
                    onSettled: () => {
                        navigate('/categories');
                    }
                }
            );
        } else {
            createCategory.mutate(
                {name: value.name},
                {
                    onSettled: () => {
                        navigate('/categories');

                    }
                }
            );
        }
    }

    function onDelete() {
        if (id) {
            deleteCategory.mutate(id, {
                onSettled: () => {
                    navigate('/categories');
                }
            });
        }
    }

    return (
        <SidebarForm title={id ? 'Editar Categoria' : 'Adicionar Categoria'}
                     onSave={form.handleSubmit(onSubmit)}
                     {...(id && {onDelete: onDelete})}
                     loading={isLoading}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Categoria</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </SidebarForm>
    );
}