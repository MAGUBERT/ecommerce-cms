import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { CategoryDataTable } from "./data-table/category-data-table"
import { BreadCrumb } from "@/components/layout/bread-crumb"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Outlet, useNavigate } from "react-router-dom"

export function CategoryLayout() {
    const navigate = useNavigate()

    function handleSearch() {
        navigate('/categories')
    }

    function handleCreate() {
        navigate('/categorias/new')
    }

    return (
        <div className="p-4">

            <BreadCrumb pageTitle="Categorias" />

            <div className="flex flex-col py-4 gap-4">
                <div className="flex flex-row justify-end gap-4 my-4">
                    <InputGroup className="max-w-96">
                        <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
                    </InputGroup>
                    <Button onClick={handleCreate}>
                        <Plus />
                        Adicionar
                    </Button>
                </div>

                <CategoryDataTable />
                <Outlet />
            </div>
        </div>
    )
}