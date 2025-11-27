import { SidebarForm } from "@/components/layout/sidebar-form";
import { useParams } from "react-router-dom";
import { useCustomer } from "../hooks/use-customer";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    name: z.string(),
    address: z.string().optional(),
    zipcode: z.string().optional(),
    cityName: z.string().optional()
})

export function CustomerForm() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useCustomer(id ?? '');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            address: '',
            zipcode: '',
            cityName: ''
        }
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name,
                address: data.address,
                zipcode: data.zipcode,
                cityName: `${data.city?.name ?? ''}/${data.city?.state.acronym ?? ''}`
            })
        }
    }, [data, form])

    return (
        <SidebarForm
            title="Visualizar Cliente"
            loading={isLoading}
        >
            <Form {...form}>
                <form className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome Cliente</FormLabel>
                                <FormControl>
                                    <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zipcode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cityName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade/Estado</FormLabel>
                                <FormControl>
                                    <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </SidebarForm>
    )
}