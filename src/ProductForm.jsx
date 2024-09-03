import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductForm.css';

const ProductForm = ({ products, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
//   const existingProduct = products.find(product => product.id === id);

//   const [product, setProduct] = useState(existingProduct || {
  const [product, setProduct] = useState({
    nome: '',
    preco: parseFloat(''),
    descricao: '',
    imagem: '',
    quantidadeEmEstoque: parseInt(''),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:8080/produto`, {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...product,
                preco: parseFloat(product.preco),
                quantidadeEmEstoque: parseInt(product.quantidadeEmEstoque, 10),
            }),
      });

      
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao criar o produto');
    }    alert(`Produto ${isEdit ? 'editado' : 'adicionado'} com sucesso!`);
    alert('Produto criado com sucesso');
  };

  return (
    <div className="product-form-container">
      <button className="back-home-button" onClick={() => navigate('/')}>
        &#8592; Home
      </button>
      <div className="product-form">
        <h2>{isEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="nome" value={product.nome} onChange={handleChange} required />
          </label>
          <label>
            Preço:
            <input type="number" name="preco" value={product.preco} onChange={handleChange} required />
          </label>
          <label>
            Descrição:
            <textarea name="descricao" value={product.descricao} onChange={handleChange} required />
          </label>
          <label>
            URL da Imagem:
            <input type="text" name="imagem" value={product.imagem} onChange={handleChange} required />
          </label>
          <label>
            Quantidade em Estoque:
            <input type="number" name="quantidadeEmEstoque" value={product.quantidadeEmEstoque} onChange={handleChange} required />
          </label>
          <button type="submit">Salvar Produto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;