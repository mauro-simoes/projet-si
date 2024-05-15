import React from 'react';
import { useParams } from 'react-router-dom';
import { getProduits } from '../services/ProduitService';

function DetailCategorie() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const products = categoryId ? getProduits().filter(product => product.categorieId === parseInt(categoryId)) : [];

  if (!categoryId) {
    return <p>La catégorie n'existe pas.</p>;
  }

  return (
    <div>
      <h1>Products in Category: {categoryId}</h1>
      <div className="liste-produits">
        {products.map(product => (
          <div key={product.productId} className="product-card">
            <h3>{product.productName}</h3>
            <img src={product.img} alt={product.productName} />
            <p>${product.price}</p>
          </div>
        ))}
        {products.length === 0 && <p>Aucun produit trouvé dans cette catégorie.</p>}
      </div>
    </div>
  );
}

export default DetailCategorie;
