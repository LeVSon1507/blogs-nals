import React from 'react';

interface Props {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPosts: number;
  totalPages: number;
}

const Pagination: React.FC<Props> = ({ currentPage, onPageChange, totalPosts, totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
              <li key={number}>
                <button
                  className={`btn mx-1 ${number === currentPage ? 'btn-info' : 'btn-primary'}`}
                  onClick={() => onPageChange(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                className="btn btn-primary"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span aria-hidden="true">»</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 text-right">
          {!!totalPosts && (
            <em>
              Page {currentPage} of {totalPages}
            </em>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
