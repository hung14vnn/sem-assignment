import './App.css';
import React from 'react';
import HomePage from './Pages/HomePage/HomePage';
import DetailsPage from './Pages/DetailsPage/DetailsPage';
import Login from './ComponentPages/Login/login';
import Signup from './ComponentPages/Login/signup';
import UserPage from './Pages/UsersPage/UsersPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './Pages/AdminsPage/Dashboard';
import Customers from './Pages/AdminsPage/Customers';
import Products from './Pages/AdminsPage/Products';
import AddProducts from './Pages/AdminsPage/AddProducts';
import AddAuthors from './Pages/AdminsPage/AddAuthors';
import AddPublishers from './Pages/AdminsPage/AddPublishers';
import AddCategories from './Pages/AdminsPage/AddCategories';
import CustomersDetails from './Pages/AdminsPage/CustomersDetails';
import CategoryPage from './Pages/HomePage/CategoryPage';
import Cart from './Pages/UsersPage/Cart';
import CheckOut from './Pages/UsersPage/Checkout';
import SuccessPage from './Pages/HomePage/Success';
import SuccessCODPage from './Pages/HomePage/SuccessCOD';
import OrdersPage from './Pages/AdminsPage/OrdersPage';
import OrdersPageDetails from './Pages/AdminsPage/OrdersPageDetails';
import IntergrationsPage from './Pages/AdminsPage/Intergrations';
import ThisMonthPage from './Pages/AdminsPage/ThisMonthPage';
import PrevMonthPage from './Pages/AdminsPage/PrevMonthPage';
import ThisYearPage from './Pages/AdminsPage/ThisYearPage';
import UserOrdersDetails from './Pages/UsersPage/UserOrdersDetails';



function App() {
  return (
    
<BrowserRouter>
    <div>
     <Routes>
        <Route path="/"  element={<HomePage />} exact/>
        <Route path="/details/:id"  element={<DetailsPage />}  />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup"  element={<Signup />}/>
        <Route path="/user" element={<UserPage />}/>
        <Route path="/admin" element={<Dashboard/>}/> 
        <Route path="/admin/customers" element={<Customers/>}/>
        <Route path="/admin/customers/:id" element={<CustomersDetails/>}/>
        <Route path="/admin/products" element={<Products/>} />
        <Route path='/add-product' element={<AddProducts/>}/>
        <Route path='/add-author' element={<AddAuthors/>}/>
        <Route path='/add-publisher' element={<AddPublishers/>}/>
        <Route path='/add-category' element={<AddCategories/>}/>
        <Route path='/categories/:id' element={<CategoryPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout/:id' element={<CheckOut/>}/>
        <Route path='/success' element={<SuccessPage/>}/>
        <Route path='/success/:id' element={<SuccessCODPage/>}/>
        <Route path='/admin/orders' element={<OrdersPage/>}/>
        <Route path='/admin/orders/:id' element={<OrdersPageDetails/>}/>
        <Route path='/user/orders/:id' element={<UserOrdersDetails/>}/>
        <Route path='/admin/intergrations' element={<IntergrationsPage/>}/>
        <Route path='/admin/this-month' element={<ThisMonthPage/>}/>
        <Route path='/admin/prev-month' element={<PrevMonthPage/>}/>
        <Route path='/admin/this-year' element={<ThisYearPage/>}/>
      </Routes>
    </div>
  </BrowserRouter>
  );
}
export default App;
