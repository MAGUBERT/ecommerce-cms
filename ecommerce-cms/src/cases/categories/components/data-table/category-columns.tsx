import type { ColumnDef } from "@tanstack/react-table";
import type { CategoryDTO } from "../../dtos/category.dto";
import { DataTableAction } from "@/components/layout/data-table-actions";

export const categoryColumns: ColumnDef<CategoryDTO>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Nome da Categoria"
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const category = row.original;

            return (
                <div className="flex justify-end mr-4">
                    <DataTableAction itemId={category.id!} />
                </div>
            );
        }
    }
];