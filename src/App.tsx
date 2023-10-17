import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BlogPostsFeed } from './pages/BlogPostsFeed';
import React from "react";
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='' element={<BlogPostsFeed />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
