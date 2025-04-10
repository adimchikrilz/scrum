import React, { useState, useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const ImageVerifier = ({ onResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // In a real app, you would send this to your backend
    // For the demo, we'll simulate a response after a delay
    setTimeout(() => {
      // Mock result
      const result = {
        isManipulated: Math.random() > 0.5,
        similarImages: [
          { url: 'https://example.com/image1.jpg', similarity: '92%' },
          { url: 'https://example.com/image2.jpg', similarity: '87%' }
        ],
        metadata: {
          created: '2025-01-15',
          software: 'Adobe Photoshop',
          edits: ['color adjustment', 'cropping']
        }
      };
      
      setIsAnalyzing(false);
      onResult(result);
    }, 2000);
  };
  
  return (
    <div className="image-verifier">
      <h3>{t.imageVerifierTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <label>
            {selectedImage ? selectedImage.name : t.selectImage}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden"
            />
          </label>
        </div>
        
        {selectedImage && (
          <div className="image-preview">
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Preview" 
            />
          </div>
        )}
        
        <button 
          type="submit" 
          className="primary-button"
          disabled={!selectedImage || isAnalyzing}
        >
          {isAnalyzing ? t.analyzing : t.checkImage}
        </button>
      </form>
    </div>
  );
};
export default ImageVerifier;