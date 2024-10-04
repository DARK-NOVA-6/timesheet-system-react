import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext';
import { UsersProvider } from './contexts/UsersContext';

import Users from './views/Users';
import Products from './views/Products';
import Home from './views/Home';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={
          <UsersProvider>
            <Users />
          </UsersProvider>

        } />
        <Route path="/products" element={
          <ProductsProvider>
            <Products />
          </ProductsProvider>
        } />
      </Routes>
    </Router>
  );
}

export default App;
