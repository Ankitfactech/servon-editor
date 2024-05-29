import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => (
  <header>
    <h1>Welcome to Servon editor </h1>
    {/* <nav>
      <Link to="/">Home</Link>
      <Link to="/editor">Edit question</Link>
      <Link to="/image">Crop-Image</Link>
    </nav> */}
  </header>
);

export default Header;
