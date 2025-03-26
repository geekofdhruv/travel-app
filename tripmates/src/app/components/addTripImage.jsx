import React, { useState } from 'react';

function AddTrip() {
  const [images, setImages] = useState([]);

  const imageUpload = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setImages((prevImages) => [...prevImages, ...Array.from(files)]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[40vw] flex justify-center items-center">
        <div className="relative w-[35vw] h-[80vh] border border-gray-300 flex justify-center items-center p-4">
          
          {/* Displaying selected images inside the box */}
          {images.length === 0 ? (
            <span className="text-xl text-center">Add images of the trip</span>
          ) : (
            <div className="grid gap-2 w-full overflow-auto">
              {Array.from(images).map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  
                />
              ))}
            </div>
          )}

          {/* "+" button to add more images */}
          <div className="absolute bottom-4 right-4 bg-[#FA7436] text-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-[#d65a24] transition-colors">
            <label htmlFor="file-input" className="cursor-pointer">
              +
            </label>
          </div>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            onChange={imageUpload}
            multiple
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default AddTrip;
