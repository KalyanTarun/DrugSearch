import React from 'react';
import { useParams } from 'react-router-dom';
import useDrugDetailsPage from '../hooks/useDrugDetailsPage';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/DrugDetailPage.css';
import NavBar from '../components/NavBar';

const DrugDetailPage = () => {
  const { query } = useParams();
  const {
    drugName,
    rxcui,
    synonym,
    ndcs,
    loading,
    error,
  } = useDrugDetailsPage();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <NavBar title={'Drug Details'}/>
      <div className="container">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="drug-details">
            <h1>{query}</h1>
            <p><strong>ID:</strong> {rxcui}</p>
            <p><strong>Name:</strong> {drugName}</p>
            <p><strong>Synonym:</strong> {synonym}</p>
            <h2>Associated NDCs</h2>
            <ul>
              {ndcs?.map((ndc, index) => (
                <li key={index}>{ndc}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugDetailPage;
