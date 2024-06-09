import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDrugDispatch, useDrugState } from '../context/DrugContext';
import { fetchNDCDetails } from '../actions/drugDetailsActions';

/**
 * Custom hook to handle side effects for DrugDetails page.
 */
const useDrugDetailsPage = () => {
  const location = useLocation();
  const { drugName, rxcui, synonym } = location.state || {};
  const { ndcs, loading, error } = useDrugState();
  const dispatch = useDrugDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect back to search page if any required state items are missing
    if (!rxcui || !drugName) {
      navigate('/drugs/search');
      return;
    }

    // Fetch drug details if rxcui is available
    if (rxcui) {
      fetchNDCDetails(dispatch, rxcui);
    }
  }, [dispatch, rxcui, drugName, navigate]);

  return {
    drugName,
    rxcui,
    synonym,
    ndcs,
    loading,
    error,
  };
};

export default useDrugDetailsPage;
