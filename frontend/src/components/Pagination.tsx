interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center gap-2 mb-3 flex-wrap'>
        <label className='form-label mb-0 fw-bold'>Results per page</label>
        <select
          className='form-select w-auto'
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
      </div>

      <nav className='mt-4'>
        <ul className='pagination justify-content-center flex-wrap'>
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className='page-link'
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li
              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              key={i + 1}
            >
              <button className='page-link' onClick={() => onPageChange(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className='page-link'
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;