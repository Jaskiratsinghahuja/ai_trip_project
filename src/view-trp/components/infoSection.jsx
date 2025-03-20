import React from "react";
import { motion } from "framer-motion";

function InfoSection({ trip }) {
  const tripDetails = trip?.tripData?.tripDetails || {};
  const itinerary = trip?.tripData?.itinerary || {};
  const hotelOptions = trip?.tripData?.hotelOptions || [];
  const notes = trip?.tripData?.notes || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-cover bg-center min-h-screen p-5 flex flex-wrap justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg overflow-hidden p-6 bg-opacity-90 w-full md:w-5/6 lg:w-4/6"
      >
        <div className="flex flex-wrap gap-6">
          {/* Trip Details */}
          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: "#FFD700", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 min-w-[300px] p-6 rounded-lg backdrop-blur-md bg-white bg-opacity-50 transition-transform duration-300 hover:text-black"
            style={{
              backgroundImage: `url('/sea.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
            }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trip Details 🌍</h2>
            <div className="space-y-2">
              <p className="text-black-600"><span className="font-bold">Destination:</span> {tripDetails.location || "Not specified"} 🌄</p>
              <p className="text-black-600"><span className="font-bold">Duration:</span> {tripDetails.duration || "Not specified"} 🗓️</p>
              <p className="text-black-600"><span className="font-bold">Budget:</span> {tripDetails.budget || "Not specified"} 💰</p>
              <p className="text-black-600"><span className="font-bold">Travelers:</span> {tripDetails.travelers || "Not specified"} 💑</p>
            </div>
          </motion.div>

          {/* Hotel Options */}
          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: "#FFD700", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="relative flex-1 min-w-[300px] p-6 rounded-lg backdrop-blur-md bg-white bg-opacity-50 hover:text-black overflow-hidden"
          >
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
            >
              <source src="/room.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Content */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4 relative z-10">Hotel Options 🛏️</h2>
            <div className="space-y-4 relative z-10">
              {hotelOptions.length > 0 ? (
                hotelOptions.map((hotel, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, backgroundColor: "#D1A3FF", color: "#000" }}
                    className="border p-6 rounded-lg hover:text-black bg-white bg-opacity-80"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{hotel.hotelName}</h3>
                    <p className="text-gray-600">{hotel.hotelAddress}</p>
                    <p className="text-gray-600"><span className="font-semibold">Price:</span> ${hotel.price}</p>
                    <p className="text-gray-600"><span className="font-semibold">Rating:</span> {hotel.rating} ⭐</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600">No hotel options available.</p>
              )}
            </div>
          </motion.div>

          {/* Itinerary */}
          <motion.div className="mt-8 w-full"
            style={{
              backgroundImage: `url('/road.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
            }}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Itinerary 📅</h2>
            {Object.keys(itinerary).length > 0 ? (
              Object.keys(itinerary).map((day, index) => (
                <motion.div key={index} className="mb-6">
                  <h3 className="text-xl font-bold text-black
                  -800 mb-2">{itinerary[day].theme}</h3>
                  <div className="space-y-4">
                    {itinerary[day].activities.map((activity, actIndex) => (
                      <motion.div
                        key={actIndex}
                        whileHover={{ scale: 1.05, backgroundColor: "#D1A3FF", color: "#000" }}
                        className="border p-6 rounded-lg hover:text-black"
                      >
                        <h4 className="text-lg font-bold text-black
                        -800">{activity.placeName}</h4>
                        <p className="text-black
                        -600">{activity.placeDetails}</p>
                        <p className="text-black
                        -600"><span className="font-bold">Best Time to Visit ⏰:</span> {activity.bestTimeToVisit}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No itinerary available.</p>
            )}
          </motion.div>

          {/* Notes */}
          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: "#D1A3FF", color: "#000" }}
            className="p-6 rounded-lg mt-8 w-full"
            style={{
              backgroundImage: `url('/notepad.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
            }}

          >
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Notes 📝</h2>
            {notes.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {notes.map((note, index) => (
                  <li key={index} className="text-black
                  -600 font-bold">{note}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 font-bold">No notes available.</p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default InfoSection;
