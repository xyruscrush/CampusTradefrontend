import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import axios from "axios";

export default function Upload() {
  const { setglobaldata, globaldata, user } = useUserContext();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (globaldata) {
      setFilteredData(globaldata.filter((items) => items.user === user));
    }
  }, [globaldata, user]);

  const remove = async (id) => {
    try {
      const response = await axios.delete(
        "https://campustradeproduction.up.railway.app/delete",
        {
          data: { id: id },
        }
      );
      const newglobaldata = globaldata.filter((items) => items._id !== id);
      setglobaldata(newglobaldata);
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 mb-8 text-center">
        Your Listings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredData?.map((items) => (
          <div
            key={items._id}
            className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 border border-gray-700/30"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={items.Image_url}
                alt={items.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-100 truncate">
                  {items.name}
                </h2>
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {items.category}
                </span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Daily Rate</p>
                  <p className="text-2xl font-bold text-blue-400">
                    ${items.price_per_day}
                  </p>
                </div>
                <button
                  onClick={() => remove(items._id)}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/20"
                >
                  Remove
                </button>
              </div>

              <div className="border-t border-gray-700/50 pt-4">
                <p className="text-gray-400 text-sm">Contact Number</p>
                <p className="text-gray-200 font-medium">
                  {items.mobile_number}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center mt-12 text-gray-400">
          <p className="text-xl">No listings found</p>
          <p className="mt-2">Start by uploading new items!</p>
        </div>
      )}
    </div>
  );
}
