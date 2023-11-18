import { Route, Routes } from 'react-router-dom'
import DashboarLayout from '../components/common/DashboarLayout'
import { PermissionContextProvider } from '../context/PermissionContext'
import RefreshtokenContext, { RefreshtokenProvider } from '../context/RefreshtokenContext'
import AddImgToProduct from '../pages/AddImgToProduct'
import AddProduct from '../pages/AddProduct'
import CardToCardOrderManagment from '../pages/CardToCardOrderManagment'
import Categories from '../pages/Categories'
import Dashboard from '../pages/Dashboard'
import Discounts from '../pages/Discounts'
import EditProduct from '../pages/EditProduct'
import EventPaymentManagement from '../pages/EventPaymentManagement'
import Features from '../pages/Features'
import OrderManagment from '../pages/OrderManagment'
import Product from '../pages/Product'
import ProductDetail from '../pages/ProductDetail'
import RequestForConsulting from '../pages/RequestForConsulting'
import RoleManagment from '../pages/RoleManagment'
import UsersManagement from '../pages/UsersManagement'

const Authenticated = () => {
  return (
    <div>
      <RefreshtokenProvider>
       <PermissionContextProvider>
         <Routes>
           <Route element={<DashboarLayout />}>
           <Route path="/" element={<Dashboard />} />
           <Route path="/categories" element={<Categories />} />
           <Route path="/features" element={<Features />} />
           <Route path="/roles" element={<RoleManagment />} />
           <Route path="/orders" element={<OrderManagment />} />
           <Route path="/users" element={<UsersManagement />} />
           <Route path="/payments" element={<EventPaymentManagement />} />
           <Route path="/payments-card" element={<CardToCardOrderManagment />} />
           <Route path="/add-product" element={<AddProduct />} />
           <Route path="/product" element={<Product />} />
           <Route path="/discounts" element={<Discounts />} />
           <Route path="/add-img-to-product/:id" element={<AddImgToProduct />} />
           <Route path="/consulting" element={<RequestForConsulting />} />
           <Route path="/product/:id" element={<ProductDetail />} />
           <Route path="/Editproduct/:id" element={<EditProduct />} />
          </Route>
         </Routes>
       </PermissionContextProvider>
    </RefreshtokenProvider>
    </div>
  )
}

export default Authenticated