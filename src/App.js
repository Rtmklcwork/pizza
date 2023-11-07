import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss"
import React from "react";
import {
  Routes,
  Route
} from 'react-router-dom'


function App() {
  const [value, setValue] = React.useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <Header value={value} setValue={setValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home value={value} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>



  );
}

export default App;
