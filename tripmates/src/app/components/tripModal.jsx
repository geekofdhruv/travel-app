// TripModal.js
import React from 'react';
import {X} from 'lucide-react'

const TripModal = ({ trip, isOpen, onClose }) => {
  if (!isOpen || !trip) return null; // Don't render if not open or no trip data

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-[60vw]">
      <X className="" onClick={onClose}>
        close
      </X>
      
      <img src={trip.image} alt={trip.title} className="w-full h-[45vh] object-cover rounded-lg mb-4" />
      <h2 className="text-2xl font-bold mb-4">{trip.title}</h2>
      <p className="text-gray-700 mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, ea eligendi? Dicta blanditiis a minus repellat amet exercitationem nostrum eum cumque, ea nisi sunt doloribus. Inventore perspiciatis nesciunt ipsam porro voluptate cum at tempora! Eum maiores tempore possimus doloremque repellendus.</p> {/* Trip description */}
      <div className="flex items-center justify-between text-sm text-black font-bold">
        <span>Price: ${trip.price}</span>
        <span>Rating: {trip.rating}</span>
        <span>{trip.participants} spots available</span>
      </div>
    </div>
  </div>
  );
};

export default TripModal;
