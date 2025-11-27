import { DataTable } from "@/components/ui/data-table";
import { customerColumns } from "./customer-columns";
import { useCustomers } from "../../hooks/use-customer";

type CustomerDataTableProps = {
    searchTerm: string;
}

export function CustomerDataTable({ searchTerm }: CustomerDataTableProps) {
    const {data: customers, isLoading} = useCustomers();

    return (
        <div>
            { isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable columns={customerColumns} data={customers!.filter ((p) => p.name.toLowerCase().includes(searchTerm))} />
            )}
        </div>
    );
}