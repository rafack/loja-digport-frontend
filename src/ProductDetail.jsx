import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/produtos/${id}`);

        const data = await response.json();
      
        setProduct(data);
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar o produto');
      }
    };
    
    getProduct();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/produto/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Produto deletado com sucesso');
        navigate('/'); // Redireciona para a página inicial após a exclusão
      } else {
        alert('Erro ao deletar o produto');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao deletar o produto');
    }
  };

  return (
    <>
      <button className="back-home-button" onClick={() => navigate('/')}>
        &#8592; Home
      </button> 
      <div className="product-detail">
        <img className="product-image" src={product.imagem} alt={`Imagem de ${product.nome}`} />
        <div className="product-details">
          <h2 className="product-name">{product.nome}</h2>
          <p className="product-description">{product.descricao}</p>
          <p className="product-price">Preço: R${product.preco}</p>
          <p className="product-stock">Estoque: {product.quantidadeEmEstoque} unidades</p>
          <p className="product-id">ID do Produto: {product.id}</p>
          <button className="delete-button" onClick={handleDelete}>🗑️ Excluir</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;