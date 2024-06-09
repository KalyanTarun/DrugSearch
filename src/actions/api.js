const BASE_URL = 'https://rxnav.nlm.nih.gov/REST';

// API to fetch details about the drug.
export const searchDrugs = async (name) => {
  const response = await fetch(`${BASE_URL}/drugs.json?name=${name}`);
  const data = await response.json();
  return data.drugGroup;
};

// API to fetch spelling suggestions.
export const getSpellingSuggestions = async (name) => {
  const response = await fetch(`${BASE_URL}/spellingsuggestions.json?name=${name}`);
  const data = await response.json();
  return data.suggestionGroup;
};

// API to fetch NDCs.
export const getNDCs = async (rxcui) => {
  const response = await fetch(`${BASE_URL}/rxcui/${rxcui}/ndcs.json`);
  const data = await response.json();
  return data.ndcGroup;
};
