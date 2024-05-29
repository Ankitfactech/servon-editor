import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Editor from './components/Editor';
import ImageEditor from './components/ImageEditor';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/image" element={<ImageEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
