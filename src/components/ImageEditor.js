import React, { useState } from 'react';
import Header from './Header';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import './ImageEditor.css';

function ImageEditor() {
  const [imageSrc, setImageSrc] = useState(null);
  const [cropper, setCropper] = useState(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        if (cropper) {
          cropper.destroy();
        }
        setCropper(new Cropper(document.getElementById('cropper-image'), {
          aspectRatio: 1,
          viewMode: 1,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        console.log('Cropped Image Blob:', blob);
      });
    }
  };

  return (
    <div className="container">
      <Header />
      <input type="file" id="image-upload" onChange={handleImageUpload} />
      <img id="cropper-image" src={imageSrc} alt="To be cropped" />
      <button id="crop-button" onClick={handleCrop}>Crop Image</button>
    </div>
  );
}

export default ImageEditor;
