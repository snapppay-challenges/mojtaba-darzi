import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactDetails, Home, NotFound } from "./pages";
import ErrorBoundary from "./components/common/error-boundry";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
