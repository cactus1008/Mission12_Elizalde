import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <CartSummary />
      <div className='container py-4'>
        <div className='row g-4'>
          <div className='col-md-3'>
            <div className='accordion mt-4' id='bookOptionsAccordion'>
              <div className='accordion-item shadow-sm border-0 mb-3'>
                <h2 className='accordion-header'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#filtersCollapse'
                    aria-expanded='true'
                    aria-controls='filtersCollapse'
                  >
                    Book Filters
                  </button>
                </h2>
                <div
                  id='filtersCollapse'
                  className='accordion-collapse collapse show'
                >
                  <div className='accordion-body'>
                    <CategoryFilter
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-9'>
            <BookList
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;