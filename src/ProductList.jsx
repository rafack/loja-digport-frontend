import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => { 
    const getProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8080/produtos`);

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao buscar produtos');
    }
  };
    
    getProducts();
  }, []);
  
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img className="product-list-image" src={product.imagem} alt={`Imagem de ${product.nome}`} />
          <div className="product-info">
            <h2 className="product-name">{product.nome}</h2>
            <p className="product-price">R${product.preco}</p>
            <Link to={`/product/${product.id}`} className="product-link">Ver Detalhes</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;