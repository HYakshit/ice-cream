import { useDispatch, useSelector } from 'react-redux';
import { increase,decrease, removeFromCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';

// import {xMark  } from "@heroicons/react/";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
   const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);

  const dispatch = useDispatch();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <>
        <p>Your cart is empty.</p>
        {<Link className='btn btn-accent' to="/">Continue Shopping</Link>}
        </>
      ) : (
        cartItems.map((item) => (

          <div key={item.id} className="mb-4 flex p-4 border rounded">
            <div className="left">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <p>Total: ₹{item.price * item.quantity}</p>
               <div className='flex gx-5'>
                <button className="btn btn-primary" onClick={() => { dispatch(increase(item.id)) }}>+1</button>
                   <button className="btn btn-primary" onClick={() => { dispatch(decrease(item.id)) }}>-1</button>
              </div>
            </div>
            <div className="right ms-auto">
              <div className="buttons">
                <button className="btn btn-primary" onClick={() => { dispatch(removeFromCart(item.id)) }}>remove</button>
              </div>
            </div>

          </div>



        ))
      )}
      <div>
        <p>total items: {totalQuantity}</p>
        <p>total price: {subtotal}</p>
      </div>
    </div>
  );
};

export default Cart;
