import { SidebarForm } from "@/components/layout/sidebar-form";
import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/use-category";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/lotties/SandyLoading.json";

export function CategoryForm() {
    const {id} = useParams<{id: string}>();
    const { data, isLoading } = useCategory(id ?? '')

    function saveCategory() {
        console.log("salvando a categoria")
    }

    return (
        <SidebarForm 
            sheetTitle="Cadastro de Categoria" 
            buttonTitle="Abrir" 
            onSave={saveCategory}
        >
            <div className="flex p-4">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[300px] animate-fade-in">
                        <Lottie
                            animationData={loadingAnimation}
                            loop
                            style={{ width: 150, height: 150 }}
                        />
                        <p className="mt-4 text-gray-500 text-sm">Carregando categorias...</p>
                    </div>
                ) : (
                    <h4>{JSON.stringify(data)}</h4>
                )}
                
            </div>
        </SidebarForm>
    )
}