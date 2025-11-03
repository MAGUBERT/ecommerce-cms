import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { categoryColumns } from "./category-columns";
import { useCategories } from "../../hooks/use-category";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lotties/SandyLoading.json";

export function CategoryDataTable() {
    const { data: categories, isLoading } = useCategories();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[300px] animate-fade-in">
                <Lottie
                    animationData={loadingAnimation}
                    loop
                    style={{ width: 150, height: 150 }}
                />
                <p className="mt-4 text-gray-500 text-sm">Carregando categorias...</p>
            </div>
        );
    }

    return <DataTable columns={categoryColumns} data={categories!} />;
}
