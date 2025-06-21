import React from 'react'
import products from '../data/products';
import Card from "../components/common/Card";
const Products = () => {
    return (
        <div className="flex mt-3 flex-wrap gap-6 justify-center">

            {products.map((product) => (
                <Card
                    product={product}
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    category={product.category}></Card>
            ))}
        </div>
    )
}

export default Products
