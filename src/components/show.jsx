import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Show() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .post(`https://campustradeproduction.up.railway.app/item/${id}`)
      .then((response) => {
        setItem(response.data.response);
      })
      .catch((error) => console.error("Error fetching item details:", error));
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
          Loading item details...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="relative h-96 overflow-hidden rounded-xl group">
              <img
                src={item.Image_url}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
            </div>

            <div className="space-y-6 text-gray-100">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {item.name}
              </h1>

              <div className="space-y-4">
                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <p className="text-lg leading-relaxed text-gray-300">
                    {item.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Category</p>
                    <p className="text-lg font-medium text-blue-400">
                      {item.category}
                    </p>
                  </div>

                  <div className="bg-gray-700/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Daily Rate</p>
                    <p className="text-lg font-medium text-green-400">
                      ₹{item.price_per_day}/day
                    </p>
                  </div>
                </div>

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Owner Contact</p>
                  <p className="text-lg font-medium text-indigo-300">
                    {item.mobile_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
