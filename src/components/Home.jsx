import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

function Home() {
  const { globaldata, user, setUser, accessToken } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [priceSortOrder, setPriceSortOrder] = useState("asc");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editType, setEditType] = useState("");
  const [email, setEmail] = useState(user || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://campustradeproduction.up.railway.app/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    if (editType === "email") {
      try {
        const response = await axios.post(
          "https://campustradeproduction.up.railway.app/update-email",
          { email: email },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data.success) {
          setUser(response.data.email);
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Something went wrong");
      }
    } else {
      try {
        const response = await axios.post(
          "https://campustradeproduction.up.railway.app/update-password",
          { password: password },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
    setEditType("");
  };

  const filteredData = globaldata
    ? globaldata.filter((item) => {
        return searchType === "name"
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
          : item.category.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  const sortedData = filteredData.sort((a, b) => {
    return priceSortOrder === "asc"
      ? a.price_per_day - b.price_per_day
      : b.price_per_day - a.price_per_day;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-gray-800/95 backdrop-blur-lg text-gray-100 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out z-50 p-6 shadow-2xl`}
      >
        <button
          className="absolute top-6 right-6 text-gray-300 hover:text-white transition-colors"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FiX size={24} className="stroke-current" />
        </button>
        <div className="mt-12">
          <h2 className="text-m font-bold text-gray-100 mb-6">{user}</h2>
          {isEditing ? (
            <div className="space-y-4">
              {editType === "password" && (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                  placeholder="New Password"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditType("");
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditType("password");
                }}
                className="w-full px-4 py-2 bg-blue-600/50 hover:bg-blue-700 border border-blue-500/30 text-blue-100 rounded-lg transition-all duration-200 hover:border-blue-600"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600/50 hover:bg-red-700 border border-red-500/30 text-red-100 rounded-lg transition-all duration-200 hover:border-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="fixed top-0 w-full z-40 bg-gray-900/80 backdrop-blur-sm shadow-xl p-4 flex justify-between items-center border-b border-gray-700">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
        >
          <FiMenu size={26} className="stroke-current" />
        </button>

        <div className="flex gap-4 items-center">
          <div className="flex gap-3">
            <Link
              to="/uploadItem"
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-medium text-sm hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20 flex items-center gap-2 group"
            >
              <svg
                className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="tracking-wide">Upload Item</span>
            </Link>
            <Link
              to="/upload"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/20 flex items-center gap-2 group"
            >
              <svg
                className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="tracking-wide">My Listings</span>
            </Link>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex gap-2 bg-gray-800/50 rounded-lg p-1.5 border border-gray-700">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-3 py-2 bg-transparent text-gray-300 rounded-md border-r border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name" className="bg-gray-800">
                Name
              </option>
              <option value="category" className="bg-gray-800">
                Category
              </option>
            </select>
            <input
              type="text"
              placeholder={`Search ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-transparent text-gray-300 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md placeholder-gray-500"
            />
          </div>

          <select
            value={priceSortOrder}
            onChange={(e) => setPriceSortOrder(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8 mt-20">
        {sortedData.map((item) => (
          <div
            key={item.id}
            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 border border-gray-700"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.Image_url}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-100 mb-2 truncate">
                {item.name}
              </h3>
              <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                <span className="bg-gray-700/50 px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="font-semibold text-blue-400">
                  ${item.price_per_day}/day
                </span>
              </div>

              <Link
                to={`/show/${item._id}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600/30 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-600/50 hover:text-white transition-all font-medium hover:border-transparent hover:shadow-lg hover:shadow-blue-500/20"
              >
                View Details
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
