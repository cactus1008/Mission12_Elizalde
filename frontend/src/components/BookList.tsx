import type { Book } from '../types/Book';
import { useState, useEffect } from 'react';
import type { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';

function BookList({selectedCategories} : {selectedCategories: string[];}) {

    const navigate = useNavigate();
    const {addToCart} = useCart();

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = (b: Book) => {
        const newItem: CartItem = {
            bookID: b.bookID,
            title: b.title,
            price: b.price,
            quantity: quantity
        };

        addToCart(newItem);
        navigate('/cart');
    }

    useEffect(() => {
        setPageNum(1);
    }, [selectedCategories]);

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}`).join('&');
            const response = await fetch(`http://localhost:5210/Book?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.booksList);
            setTotalPages(Math.ceil(data.totalBooks / pageSize));
        }
        fetchBooks();
    }, [pageSize, pageNum, selectedCategories]);

    return (
    <>
    <br />
    <h3>Book List</h3>
    <div className="row justify-content-center mb-4">
        <div className="col-md-4">
            <label className="form-label fw-bold">Results per page:</label>
            <select
                className="form-select form-select-sm"
                value={pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPageNum(1);
                }}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </div>
    </div>

    {books.map((b) => (
    <div id="projectCard" className='card' key={b.bookID}>
        <div className='card-body'>
        <h3 className='card-title'>{b.title}</h3>
        <ul className='list-unstyled'>
            <li><strong>Author:</strong> {b.author}</li>
            <li><strong>Publisher:</strong> {b.publisher}</li>
            <li><strong>ISBN:</strong> {b.isbn}</li>
            <li><strong>Classification:</strong> {b.classification}</li>
            <li><strong>Category:</strong> {b.category}</li>
            <li><strong>Page Count:</strong> {b.pageCount}</li>
            <li><strong>Price:</strong> ${b.price}</li>
        </ul>
        <br />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(x) => setQuantity(Number(x.target.value))}/>
        <button onClick={() => handleAddToCart(b)}>Add to cart</button>
        </div>
    </div>
    ))}

    <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap my-4">
        <button
            className="btn btn-outline-secondary"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
        >
            Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
            <button
                key={i + 1}
                className={`btn ${pageNum === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setPageNum(i + 1)}
                disabled={pageNum === i + 1}
            >
                {i + 1}
            </button>
        ))}

        <button
            className="btn btn-outline-secondary"
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
        >
            Next
        </button>
    </div>
    </>
    )

}

export default BookList;
