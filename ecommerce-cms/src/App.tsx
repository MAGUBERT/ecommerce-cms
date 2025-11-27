import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { CategoryLayout } from "./cases/categories/components/category-layout"
import { CategoryForm } from "./cases/categories/components/category-form"
import { BrandLayout } from "./cases/brands/components/brand-layout"
import { BrandForm } from "./cases/brands/components/brand-form"
import { ProductForm } from "./cases/products/components/product-form"
import { ProductLayout } from "./cases/products/components/product-layout"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/layout/app-sidebar"
import { OrderLayout } from "./cases/orders/components/order-layout"
import { OrderForm } from "./cases/orders/components/order-form"
import { CustomerLayout } from "./cases/customers/components/customer-layout"
import { CustomerForm } from "./cases/customers/components/customer-form"

function App() {

  return (
    <div className="wrapper">

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Routes>
            <Route path="/categories" element={<CategoryLayout />}>
              <Route path="new" element={<CategoryForm />} />
              <Route path=":id" element={<CategoryForm />} />
            </Route>

            <Route path="/brands" element={<BrandLayout />}>
              <Route path="new" element={<BrandForm />} />
              <Route path=":id" element={<BrandForm />} />
            </Route>

            <Route path="/products" element={<ProductLayout />}>
              <Route path="new" element={<ProductForm />} />
              <Route path=":id" element={<ProductForm />} />
            </Route>

            <Route path="/orders" element={<OrderLayout />}>
              <Route path="new" element={<OrderForm />} />
              <Route path=":id" element={<OrderForm />} />
            </Route>

            <Route path="/customers" element={<CustomerLayout />}>
              <Route path=":id" element={<CustomerForm />} />
            </Route>
            
          </Routes>
        </main>
      </SidebarProvider>

      <ToastContainer />

    </div>
  );
}

export default App