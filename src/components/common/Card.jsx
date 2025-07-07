import { useDispatch } from 'react-redux';
import { addToCart } from "../../features/cart/cartSlice";
const images = import.meta.glob('../../assets/Images/*.{jpg,jpeg,png}', {
    eager: true
});

const getImageByName = (fileName) => {
    const match = Object.entries(images).find(([path]) =>
        path.includes(fileName)
    );
    return match ? match[1].default : null;
};

const Card = ({
    name,
    image,
    description }) => {
    const dispatch = useDispatch();
    return (
        <div className="card bg-base-100 w-75 shadow-sm">
            <figure>
                {/*  <div className="card-actions justify-end">
                    <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Buy Now</button>
                </div> */}
                <img
                    src={getImageByName(image) || "https://placehold.co/300x270?text=product"}
                    alt={image} />
            </figure>
            <div className="card-body p-2">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};
export default Card;

