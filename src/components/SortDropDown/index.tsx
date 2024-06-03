import React, { useState } from 'react';
import { FaSort } from 'react-icons/fa';

interface Props {
  onSort: (sortBy: string, sortOrder: string) => void;
  sortKey: string;
  sortOrder: string;
}

const SortDropDown: React.FC<Props> = ({ onSort, sortKey, sortOrder }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const handleSortClick = (value: string) => {
    onSort(value, sortOrder);
    setIsSortOpen(false);
  };

  const handleOrderClick = (value: string) => {
    onSort(sortKey, value);
    setIsOrderOpen(false);
  };

  const getSortText = () => {
    switch (sortKey) {
      case 'createdAt':
        return 'Sort by Date';
      case 'title':
        return 'Sort by Title';
      case 'id':
        return 'Sort by ID';
      default:
        return 'Sort By';
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={isSortOpen}
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          <FaSort className="mr-1" size={20} />
          {getSortText()}
        </button>
        <div
          className={`dropdown-menu ${isSortOpen ? 'show' : ''}`}
          aria-labelledby="dropdownMenuButton"
        >
          <button className="dropdown-item" onClick={() => handleSortClick('createdAt')}>
            Sort by Date
          </button>
          <button className="dropdown-item" onClick={() => handleSortClick('title')}>
            Sort by Title
          </button>
          <button className="dropdown-item" onClick={() => handleSortClick('id')}>
            Sort by ID
          </button>
        </div>
      </div>
      {sortKey && (
        <div className="dropdown ml-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButtonOrder"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={isOrderOpen}
            onClick={() => setIsOrderOpen(!isOrderOpen)}
          >
            <FaSort className="mr-1" size={20} />
            {sortOrder === 'asc' ? 'Latest' : 'Oldest'}
          </button>
          <div
            className={`dropdown-menu ${isOrderOpen ? 'show' : ''}`}
            aria-labelledby="dropdownMenuButtonOrder"
          >
            <button className="dropdown-item" onClick={() => handleOrderClick('asc')}>
              Latest
            </button>
            <button className="dropdown-item" onClick={() => handleOrderClick('desc')}>
              Oldest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropDown;
