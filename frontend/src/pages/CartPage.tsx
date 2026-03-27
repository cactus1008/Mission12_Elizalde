import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, removeFromCart } = useCart();

  const [showToast, setShowToast] = useState(false);

  const toastMessage = location.state?.toastMessage || '';

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (toastMessage) {
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
        navigate(location.pathname, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage, navigate, location.pathname]);

  return (
    <div className='container py-5'>
      <div className='toast-container position-fixed bottom-0 end-0 p-3'>
        <div
          className={`toast text-bg-success border-0 ${showToast ? 'show' : ''}`}
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
        >
          <div className='d-flex'>
            <div className='toast-body'>{toastMessage}</div>
            <button
              type='button'
              className='btn-close btn-close-white me-2 m-auto'
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-lg-10'>
          <div className='card shadow-sm border-0'>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center flex-wrap mb-4'>
                <h2 className='mb-0'>Your Cart</h2>
                <span className='badge text-bg-primary fs-6'>
                  Total: ${total.toFixed(2)}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className='alert alert-info'>Your cart is empty.</div>
              ) : (
                <div className='table-responsive'>
                  <table className='table align-middle'>
                    <thead className='table-light'>
                      <tr>
                        <th>Book</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item: CartItem) => (
                        <tr key={item.bookID}>
                          <td>{item.title}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              className='btn btn-outline-danger btn-sm'
                              onClick={() => removeFromCart(item.bookID)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className='d-flex justify-content-between flex-wrap gap-2 mt-4'>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => navigate(-1)}
                >
                  Continue Shopping
                </button>

                <button className='btn btn-success'>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;