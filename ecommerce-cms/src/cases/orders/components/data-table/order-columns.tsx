import type { ColumnDef } from "@tanstack/react-table";
import type { OrderDTO } from "../../dtos/order.dto";
import { DataTableAction } from "@/components/layout/data-table-actions";
import { FormattedNumber, IntlProvider } from "react-intl";
import { DataTableBadge } from "@/components/layout/data-table-badge";

export const orderColumns: ColumnDef<OrderDTO>[] = [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'createdAt',
        header: 'Data Pedido',
        cell: ({ row }) => {
            const order = row.original;

            return (
                <p>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
            );
        }
    },
    {
        accessorKey: 'customer.name',
        header: 'Nome Cliente'
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
            const order = row.original;

            return (
                <IntlProvider locale="pt-BR">
                    <FormattedNumber value={order.total}
                                     style="currency"
                                     currency="BRL" />
                </IntlProvider>
            );
        }
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const order = row.original;

            return (
                <DataTableBadge status={order.status} />
            );
        }
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original;

            return (
                <div className="flex justify-end mr-4">
                    <DataTableAction itemId={order.id!} />
                </div>
            );
        }
    }
];