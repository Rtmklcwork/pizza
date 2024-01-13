import Header from "./components/Header.tsx";
import Cart from "./pages/Cart.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";

import "./scss/app.scss"
import React from "react";
import {
  Routes,
  Route
} from 'react-router-dom'
import FullPizza from "./pages/FullPizza.tsx";


function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
          </Routes>
        </div>
      </div>
    </div>



  );
}

export default App;
