import { useState, useEffect } from 'react';
import { useDrugDispatch, useDrugState } from '../context/DrugContext';
import { fetchDrugs, fetchSpellingSuggestions } from '../actions/drugDetailsActions';
import { useNavigate } from 'react-router-dom';
import { RESET_DRUGS, RESET_SUGGESTIONS } from '../actions/types';

/**
 * Custom hook to handle side effects for Search page.
 */
const useDrugSearch = () => {
  const [query, setQuery] = useState('');
  const [dropdownTitle, setDropDownTitle] = useState('Suggestions');
  const { drugs, suggestions, loading, error } = useDrugState();
  const dispatch = useDrugDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset states when the component is unmounted
    return () => {
      dispatch({ type: RESET_DRUGS });
      dispatch({ type: RESET_SUGGESTIONS });
    };
  }, [dispatch]);

  const handleSearch = () => {
    setDropDownTitle('Search Results');
    fetchDrugs(dispatch, query);
  };

  const handleDrugClick = (drugName, rxcui, synonym) => {
    navigate(`/drugs/${query}`, { state: { drugName, rxcui, synonym } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setDropDownTitle('Suggestions');
    setQuery(e.target.value);
    fetchSpellingSuggestions(dispatch, e.target.value);
  };

  return {
    query,
    setQuery,
    dropdownTitle,
    setDropDownTitle,
    drugs,
    suggestions,
    loading,
    error,
    handleSearch,
    handleDrugClick,
    handleKeyPress,
    handleInputChange,
  };
};

export default useDrugSearch;
