import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductForm from './ProductForm';
import './App.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="add-product-button" onClick={() => navigate('/product/new')}>Adicionar Novo Produto</button>
      <ProductList/>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/new" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;