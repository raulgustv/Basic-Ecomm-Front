import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './components/nav';
import { Toaster } from 'react-hot-toast'
import { Home, Login, Register } from './pages/auth';
import { Cart, Dashboard, ProductView, Shop, UserOrders, UserProfile } from './pages/user';
import { AdminRoute, PrivateRoute } from './components/routes';
import NotFound from './pages/NotFound';
import { AdminCategory, AdminDashboard, AdminProduct, AdminProductList, ProductUpdate } from './pages/admin';
import Search from './pages/user/Search';
import Orders from './pages/admin/Orders';


const App = () => {
  return (
    <div className="App">

      <BrowserRouter>
        <Toaster />
        <Menu />
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:slug' element={<ProductView />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<Cart />} />
          
          
          {/* PRIVATE ROUTES */}
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='' element={<Dashboard />} />            
            <Route path='user/orders' element={<UserOrders />} />
            <Route path='user/profile' element={<UserProfile />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/category' element={<AdminCategory />} />
            <Route path='admin/product' element={<AdminProduct />} />
            <Route path='admin/products' element={<AdminProductList />} />
            <Route path='admin/product/update/:slug' element={<ProductUpdate />} />
            <Route path='admin/orders' element={<Orders />} />
          </Route>

          <Route path="*" element={<NotFound />} replace />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
