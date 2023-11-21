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

export const SearchContext = React.createContext()


function App() {
  const [value, setValue] = React.useState('')

  return (
    <div className="App">
      <SearchContext.Provider value={{ value, setValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home value={value} />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>



  );
}

export default App;
