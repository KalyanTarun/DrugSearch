
import debounce from 'lodash/debounce';
import { searchDrugs, getSpellingSuggestions, getNDCs } from '../actions/api';
import { flattenDrugData } from '../utils/flattenDrugData';
import { RESET_DRUGS, RESET_SUGGESTIONS, SET_DRUGS, SET_ERROR, SET_LOADING, SET_NDCS, SET_SUGGESTIONS, SPELLING_SUGGESTIONS_API_DEBOUNCE_MS } from './types';

// Action to fetch drug details.
export const fetchDrugs = async (dispatch, query) => {
    dispatch({ type: SET_LOADING });
    try {
      const result = await searchDrugs(query);
      if (result.conceptGroup && result.conceptGroup.length > 0) {
        dispatch({ type: SET_DRUGS, payload: flattenDrugData(result.conceptGroup) });
      } else {
        throw new Error("No results");
      }
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: 'An error occurred while searching.' });
    }
  };

  // Action to fetch spelling suggestions. A debounce is added to avoid unecessary calls
  export const fetchSpellingSuggestions = debounce(async (dispatch, query) => {
    try {
      const suggestionResult = await getSpellingSuggestions(query);
      if (suggestionResult.suggestionList.suggestion.length > 0) {
        dispatch({ type: SET_SUGGESTIONS, payload: suggestionResult.suggestionList.suggestion });
      } else {
        dispatch({ type: SET_ERROR, payload: 'No results found.' });
      }
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: 'An error occurred while fetching suggestions.' });
    }
  }, SPELLING_SUGGESTIONS_API_DEBOUNCE_MS);

// Action to fetch NDC details.  
export const fetchNDCDetails = async (dispatch, rxcui) => {
  dispatch({ type: SET_LOADING });
  try {
    const ndcDetails = await getNDCs(rxcui);
    dispatch({ type: SET_NDCS, payload: ndcDetails.ndcList.ndc }); 
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: 'An error occurred while fetching details.' });
  }
};

// Action to reset drug details on page unmount.
export const resetDrugs = (dispatch) => {
    dispatch({ type: RESET_DRUGS });
};
  
// Action to reset suggestions on page unmount.
export const resetSuggestions = (dispatch) => {
    dispatch({ type: RESET_SUGGESTIONS });
};
  