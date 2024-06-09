import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DrugDetailPage from './pages/DrugDetailPage';
import { DrugProvider } from './context/DrugContext';


function App() {
  return (
    <DrugProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/drugs/search" element={<SearchPage/>} />
            <Route path="/drugs/:drug_name" element={<DrugDetailPage/>} />
            <Route path="/" exact element={<SearchPage/>} />
          </Routes>
        </div>
      </Router>
    </DrugProvider>
  );
}

export default App;
