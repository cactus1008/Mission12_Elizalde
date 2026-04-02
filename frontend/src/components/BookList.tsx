import type { Book } from '../types/Book';
import { useState, useEffect } from 'react';
import type { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  


  const handleAddToCart = (b: Book) => {
    const selectedQuantity = quantities[b.bookID] || 1;

    const newItem: CartItem = {
      bookID: b.bookID,
      title: b.title,
      price: b.price,
      quantity: selectedQuantity,
    };

    addToCart(newItem);

    navigate('/cart', {
      state: {
        toastMessage: `${selectedQuantity} cop${selectedQuantity !== 1 ? 'ies' : 'y'} of "${b.title}" added to cart`,
      },
    });
  };

  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories, pageSize]);

  useEffect(() => {
    const loadBooks = async () => {

      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.booksList);
        setTotalPages(Math.ceil(data.totalBooks / pageSize));
      } catch (err) {
        setError('Failed to load books. Please try again later.');
      } finally {
        setLoading(false);
      };
    };
    loadBooks();
    }, [pageSize, pageNum, selectedCategories]
  );
  
    if (loading) return <div>Loading books...</div>;
    if (error) return <div className='alert alert-danger'>Error: {error}</div>;

  return (
    <>
      <div className='mt-4 mb-4'>
        <h2 className='mb-0'>Book List</h2>
      </div>

      {books.map((b) => (
        <div className='card shadow-sm mb-4 border-0' key={b.bookID}>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-8'>
                <h4 className='card-title mb-3'>{b.title}</h4>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item px-0'>
                    <strong>Author:</strong> {b.author}
                  </li>
                  <li className='list-group-item px-0'>
                    <strong>Publisher:</strong> {b.publisher}
                  </li>
                  <li className='list-group-item px-0'>
                    <strong>ISBN:</strong> {b.isbn}
                  </li>
                  <li className='list-group-item px-0'>
                    <strong>Classification:</strong> {b.classification}
                  </li>
                  <li className='list-group-item px-0'>
                    <strong>Category:</strong> {b.category}
                  </li>
                  <li className='list-group-item px-0'>
                    <strong>Page Count:</strong> {b.pageCount}
                  </li>
                </ul>
              </div>

              <div className='col-md-4 d-flex flex-column justify-content-between mt-3 mt-md-0'>
                <div className='bg-light rounded p-3 text-center'>
                  <div className='text-muted'>Price</div>
                  <div className='fs-4 fw-bold text-primary'>
                    ${b.price.toFixed(2)}
                  </div>
                </div>

                <div className='mt-3'>
                  <label className='form-label fw-bold'>Quantity</label>
                    <input
                        type='number'
                        min='1'
                        className='form-control mb-3'
                        value={quantities[b.bookID] || 1}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) =>
                            setQuantities({
                            ...quantities,
                            [b.bookID]: Math.max(1, Number(e.target.value)),
                            })
                        }
                    />
                  <button
                    className='btn btn-success w-100'
                    onClick={() => handleAddToCart(b)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;