import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../features/cart/cartSlice";
const Card = ({product,
    name,
    price,
    image,
    description,
    category }) => {
          const dispatch = useDispatch();
    return (
        <div  className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt={image} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>category: {category}</p>
                <p>{description}</p>
                <div>price: {price}</div>
                <div className="card-actions justify-end">
                    <button  onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};
export default Card;
