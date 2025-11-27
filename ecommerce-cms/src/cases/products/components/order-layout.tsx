import { BreadCrumb } from "@/components/layout/bread-crumb"
import { OrderDataTable } from "./data-table/order-data-table"
import { Outlet } from "react-router-dom"

export function OrderLayout() {

    return (
        <div className="p-4">

            <BreadCrumb title="Marcas" />

            <div className="flex flex-col py-4 gap-4">
                <div>
                    <OrderDataTable />
                    <Outlet />
                </div>

            </div>
        </div>
    );
}