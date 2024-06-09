import React, { createContext, useReducer, useContext } from 'react';
import { RESET_DRUGS, RESET_SUGGESTIONS, SET_DRUGS, SET_ERROR, SET_LOADING, SET_NDCS, SET_SUGGESTIONS } from '../actions/types';

const DrugStateContext = createContext();
const DrugDispatchContext = createContext();

const initialState = {
  drugs: [],
  suggestions: [],
  drugDetails: null,
  ndcs: [],
  loading: false,
  error: '',
};

// Reducer for handling the state
const drugReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, error: '' };
    case SET_DRUGS:
      return { ...state, drugs: action.payload, suggestions: [], loading: false, error: '' };
    case SET_SUGGESTIONS:
      return { ...state, suggestions: action.payload, drugs: [], loading: false, error: '' };
    case SET_NDCS:
      return { ...state, ndcs: action.payload, loading: false, error: '' };
    case RESET_DRUGS:
      return { ...state, drugs: [], loading: false, error: ''};
    case RESET_SUGGESTIONS:
      return { ...state, suggestions: [], loading: false, error: ''};
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const DrugProvider = ({ children }) => {
  const [state, dispatch] = useReducer(drugReducer, initialState);

  return (
    <DrugStateContext.Provider value={state}>
      <DrugDispatchContext.Provider value={dispatch}>
        {children}
      </DrugDispatchContext.Provider>
    </DrugStateContext.Provider>
  );
};

export const useDrugState = () => useContext(DrugStateContext);
export const useDrugDispatch = () => useContext(DrugDispatchContext);

