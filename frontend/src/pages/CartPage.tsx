import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";

function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ?
                <p>Your cart is empty</p> : 
                <ul>
                    {cart.map((item: CartItem) =>
                        <li key={item.bookID}>
                            {item.title}: {item.quantity}
                            <br />
                            Price: ${item.price.toFixed(2)} each
                            <br />
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            <br />
                            <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
                        </li>
                    )}
                </ul>}
            </div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate(-1)}>Continue Browsing</button>
        </div>
    )
}

export default CartPage;