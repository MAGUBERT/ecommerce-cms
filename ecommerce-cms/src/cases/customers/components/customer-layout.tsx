
import { BreadCrumb } from "@/components/layout/bread-crumb"
import { CustomerDataTable } from "./data-table/customer-data-table"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export function CustomerLayout() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-4">

            <BreadCrumb title="Clientes" />

            <div className="flex flex-col py-4 gap-4">

                <div className="flex flex-row justify-end gap-4 my-4">
                    <InputGroup className="max-w-96">
                        <InputGroupInput placeholder="Procurar..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div>
                    <CustomerDataTable searchTerm={searchTerm} />
                    <Outlet />
                </div>

            </div>
        </div>
    )
}