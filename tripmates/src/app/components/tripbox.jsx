import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Star, Users, Calendar } from 'lucide-react';
import TripModal from './tripModal';

function TripBox() {
  const [trips, setTrips] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null); // For modal

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.post('http://localhost:3000/trips');
          setTrips(response.data.trips);
          setHosts(response.data.hosts);
        } else {
          console.log('User not signed in');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, []);

  const handleTripClick = (trip) => {
    setSelectedTrip(trip); // Open modal with selected trip
  };

  const closeModal = () => {
    setSelectedTrip(null); // Close the modal
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      {/* Trip Modal */}
      <TripModal trip={selectedTrip} isOpen={!!selectedTrip} onClose={closeModal} />

      {/* Trip Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
            onClick={() => handleTripClick(trip)} // Trigger modal on hover
            
          >
            <div className="relative h-48">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-orange-500 font-semibold">
              ₹{trip.price}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <MapPin className="text-orange-500 w-4 h-4 mr-1" />
                <span className="text-gray-600 text-sm">{trip.location}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {trip.title}
              </h3>
              <div className="flex items-center mb-4">
                <img
                  src={hosts[trip.host_id - 1]?.image}
                  alt={hosts[trip.host_id - 1]?.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {hosts[trip.host_id - 1]?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {hosts[trip.host_id - 1]?.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-4 h-4 mr-1" />
                  <span>{trip.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{trip.participants} spots</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{trip.dates}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripBox;
