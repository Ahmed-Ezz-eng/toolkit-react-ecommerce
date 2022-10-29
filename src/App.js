import React, { useState } from "react";
import { Paper } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Products from "./components/products/Products";
import CartComponent from "./components/cart/CartComponent";
import Features from "./components/features/Features";

// slider links for styling
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//   end 
import ProductDetails from "./components/product_info/ProductDetails";
import FavoritesProducts from "./components/favorites_products/FavoritesProducts";
import RegisterForm from "./components/register/RegisterForm";
import {useSelector} from "react-redux";
// this component will protect profile page 
import Protected from "./components/Protected";
// toast alert
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const App = () => {
  const [mode, setMode] = useState(false);
  const {userData} = useSelector(state => state.userSlice);
  const {isLogin} = userData;
  const theme = createTheme({
    palette: {
        mode: mode ? "dark": "light",
      },
});


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper sx={{minHeight: "calc(100vh - 64px)", padding:"40px 0px"}} square>
            <Navbar toggleMode = {() => setMode(prev => !prev)} mode={mode} />
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/profile" element = {<Protected isLogin={isLogin}>
                  <Profile />
                </Protected>} />
                <Route path="/features" element = {<Features />} />
                <Route path="/products" element = {<Products isLogin={isLogin} />} />
                <Route path="/register" element = {<RegisterForm />} />
                <Route path="/favorites" element = {<FavoritesProducts />} />
                <Route path="/cart" element = {<CartComponent />} />
                <Route path="/details/:id" element = {<ProductDetails />} />
            </Routes>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
