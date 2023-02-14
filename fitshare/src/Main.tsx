import ReactDOM from 'react-dom'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from "./pages/App"
import TrainingPrograms from "./pages/TrainingPrograms";
import Error404page from './pages/Error404page';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes> {/* The Switch decides which component to show based on the current URL.*/}
        <Route path="/" element={<App />} />
        <Route path="/Programs" element={<TrainingPrograms />} />
        <Route path="/*" element={<Error404page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;