import React, { useState } from 'react';

interface Props {
  onSort: (sortBy: string) => void;
  sortKey: string;
}

const SortDropDown: React.FC<Props> = ({ onSort, sortKey }) => {
  const [sortBy, setSortBy] = useState('createdAt');

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <select
        className="dropdown-menu form-select form-select-lg"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option className="dropdown-item" value="createdAt">
          Sắp xếp theo Ngày
        </option>
        <option className="dropdown-item" value="title">
          Sắp xếp theo Tiêu đề
        </option>
        <option className="dropdown-item" value="title">
          Sắp xếp theo ID
        </option>
      </select>
    </div>
  );
};

export default SortDropDown;
