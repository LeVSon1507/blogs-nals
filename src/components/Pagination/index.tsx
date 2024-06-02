import React from 'react';

interface Props {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPosts: number;
}

const Pagination: React.FC<Props> = ({ currentPage, onPageChange, totalPosts }) => {
  const pageNumbers = [];

  //TODO: change number 5 to totalPages when BE update
  const TOTAL_PAGES = 5;

  for (let i = 1; i <= TOTAL_PAGES; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mt-4 mb-3">
      <div className="row gallery-bottom">
        <div className="col-sm-6">
          <ul className="pagination">
            <li>
              <button
                className="btn btn-primary"
                aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span aria-hidden="true">«</span>
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className={number === currentPage ? 'active' : ''}>
                <button className="btn btn-primary mx-1" onClick={() => onPageChange(number)}>
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                className="btn btn-primary"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === TOTAL_PAGES}
              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 text-right">
          {!!totalPosts && (
            <em>
              Displaying {(currentPage - 1) * 8 + 1} to {Math.min(currentPage * 8, totalPosts)} (of{' '}
              {totalPosts} posts)
            </em>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
