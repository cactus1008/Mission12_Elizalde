import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className='position-fixed top-0 end-0 m-3 z-3'
      onClick={() => navigate('/cart')}
      style={{ cursor: 'pointer' }}
    >
      <div className='card shadow-sm border-0'>
        <div className='card-body py-2 px-3'>
          <div className='d-flex align-items-center gap-3'>
            <span className='fs-5'>🛒</span>
            <div>
              <div className='fw-bold'>Cart Summary</div>
              <small className='text-muted'>
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </small>
            </div>
            <span className='badge text-bg-primary fs-6'>
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;