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
    imgHeight = "full",
    name,
    noShadow = false,
    image,
    description }) => {

    const dispatch = useDispatch();
    return (
        <div className={`card w-75 ${noShadow ? null : "shadow-sm"} bg-white flex items-center justify-center `}>
            <figure>
                {/*  <div className="card-actions justify-end">
                    <button onClick={() => dispatch(addToCart(product))} className="btn btn-primary">Buy Now</button>
                </div> */}
                <img
                    className={`object-contain h-${imgHeight}`}
                    src={getImageByName(image) || `https://placehold.co/300x270?text=product`}
                    alt={image} />
            </figure>
            {(name) && <div className="card-body p-2">
                <h2 className="card-title">{name}</h2>
                <p className='text-gray-700'>{description}</p>
            </div>}
        </div>
    );
};
export default Card;

