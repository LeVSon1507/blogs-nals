import React, { useState } from 'react';
import './styles.css';
import { CiSearch } from 'react-icons/ci';

interface Props {
  onSearch: (searchTerm: string) => void;
  searchKey: string;
  toggleSearchBar: () => void;
  isSearch: boolean;
}

const SearchBar: React.FC<Props> = ({ onSearch, searchKey, toggleSearchBar, isSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return !isSearch ? (
    <div className="d-flex justify-content-start mt-2">
      <button onClick={toggleSearchBar} className="btn btn-primary bg-transparent border-0">
        <CiSearch className="ci-search-icon" />
      </button>
    </div>
  ) : (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8">
          <form className="card card-sm" onSubmit={handleSearch}>
            <div className="card-body row no-gutters align-items-center">
              <button onClick={toggleSearchBar} className="col-auto bg-transparent border-0">
                <CiSearch className="ci-search-icon" />
              </button>
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
                  Search
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
    </>
  );
};

export default SearchBar;
