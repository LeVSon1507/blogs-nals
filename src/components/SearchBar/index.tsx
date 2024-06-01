import React, { useState } from 'react';
import './styles.css';
import { CiSearch } from 'react-icons/ci';

interface Props {
  onSearch: (searchTerm: string) => void;
  searchKey: string;
}

const SearchBar: React.FC<Props> = ({ onSearch, searchKey }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="cmp-searchBar-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <form className="card card-sm" onSubmit={handleSearch}>
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <CiSearch className="ci-search-icon" />
              </div>
              <div className="col m-2">
                <input
                  className="form-control form-control-lg "
                  type="search"
                  placeholder="Tìm kiếm tin tức"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-lg btn-primary" type="submit">
                  Tìm kiếm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {!!searchKey && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">Từ khóa tìm kiếm:</div>
                <div className="col m-2">{searchKey}</div>
                <div className="col-auto">
                  <button
                    onClick={() => onSearch('')}
                    className="btn btn-md btn-primary"
                    type="submit"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
