import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}


function SearchBar({
  onSearch,
  placeholder = 'Search...',
}: SearchBarProps){

  const [searchQuery, setSearchQuery] = useState<string>('');



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
    setSearchQuery('');
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <>
        <div className = "searchBarContainer">
            <form onSubmit={handleSubmit} className = "searchBar">
            <div className="input-group">
                <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                aria-label={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                />
                {searchQuery && (
                <button
                    className="btn btn-outline-secondary border-0"
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear"
                >
                    <i className="bi bi-x-circle"></i>
                </button>
                )}
                <button className="btn btnBackground" type="submit">
                <i className="bi bi-search me-1"></i>
                </button>
            </div>
            </form>
        </div>
    </>
  );
};

export default SearchBar;