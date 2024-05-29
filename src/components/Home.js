import React from 'react';
import './styles/Home.css';

const Home = () => (
  <div id="feature">
    <div className="feature-box" id="edit-feature">
      <h2>Question editor</h2>
      <p>View and Modify easily and quickly !!</p>
      <button onClick={() => window.location.href = '/editor'}>Edit question</button>
    </div>
    <div className="feature-box" id="crop-feature">
      <h2>Image Modifier</h2>
      <p>Crop question and solution photograph very effectively !!</p>
      <button onClick={() => window.location.href = '/image'}>Crop-Image</button>
    </div>ss
  </div>
);

export default Home;
