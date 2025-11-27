import { DataTable } from "@/components/ui/data-table";
import { orderColumns } from "./order-columns";
import { useOrders } from "../../hooks/use-order";

export function OrderDataTable() {
    const {data: orders, isLoading} = useOrders();

    return (
        <div>
            { isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable columns={orderColumns} data={orders!} />
            )}
        </div>
    );
}