import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

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

              <div className='accordion-item shadow-sm border-0'>
                <h2 className='accordion-header'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#displayCollapse'
                    aria-expanded='false'
                    aria-controls='displayCollapse'
                  >
                    Results Per Page
                  </button>
                </h2>
                <div
                  id='displayCollapse'
                  className='accordion-collapse collapse show'
                >
                  <div className='accordion-body'>
                    <label className='form-label fw-bold'>Results per page</label>
                    <select
                      className='form-select'
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      <option value='5'>5</option>
                      <option value='10'>10</option>
                      <option value='20'>20</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-9'>
            <BookList
              selectedCategories={selectedCategories}
              pageSize={pageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;