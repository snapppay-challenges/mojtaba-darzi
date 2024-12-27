import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/common/error-boundry";
import { PageLoading } from "./components";

const Home = React.lazy(() => import("./pages/home"))
const ContactDetails = React.lazy(() => import("./pages/contact-details"))
const NotFound = React.lazy(() => import("./pages/not-found"))

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
