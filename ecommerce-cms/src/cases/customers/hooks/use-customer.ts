import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "../services/customer.service";
import type { CustomerDTO } from "../dtos/customer.dto";

export function useCustomers() {
    return useQuery<CustomerDTO[]>({
        queryKey: ['customers'],
        queryFn: CustomerService.list
    });
}

export function useCustomer(id: string) {
    return useQuery<CustomerDTO>({
        queryKey: ['customer', id],
        queryFn: () => CustomerService.getById(id),
        enabled: !!id
    });
}