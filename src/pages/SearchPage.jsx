import React from 'react';
import useDrugSearch from '../hooks/useDrugSearch';
import LoadingSpinner from '../components/LoadingSpinner';
import { AiOutlineSearch } from 'react-icons/ai';
import '../styles/SearchPage.css';
import NavBar from '../components/NavBar';

const SearchPage = () => {
  const {
    query,
    handleInputChange,
    handleKeyPress,
    handleSearch,
    drugs,
    suggestions,
    dropdownTitle,
    handleDrugClick,
    loading,
    error,
  } = useDrugSearch();

  return (
    <div className="search-page">
      <NavBar title={'Drug Search'}/>
      {error && <div className="error-message">{error}</div>}
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for a drug..."
          className="search-input"
        />
        <AiOutlineSearch className="search-icon" onClick={handleSearch} />
        {(drugs.length > 0 || suggestions.length > 0) && (
          <ul className="dropdown">
            <li className="dropdown-heading">{dropdownTitle}</li>
            {drugs.map((drug) => (
              <li key={drug.rxcui} onClick={() => handleDrugClick(drug.name, drug.rxcui, drug.synonym)}>
                {drug.name}
              </li>
            ))}
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleInputChange({ target: { value: suggestion } })}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default SearchPage;
