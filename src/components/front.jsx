import React from "react";
import { Link } from "react-router-dom";

export default function Front() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="border-b border-gray-700/30 shadow-xl backdrop-blur-sm">
        {/* Existing header remains unchanged */}
      </header>

      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float absolute top-1/4 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="animate-float-delayed absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="animate-float absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>

        {/* Main content */}
        <div className="text-center relative z-10 space-y-8">
          <h1 className="text-8xl font-bold tracking-tighter transform hover:scale-105 transition-all duration-500">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 animate-text-glow">
              CampusTrade
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Connect, thrive in your campus community. Exchange books,
            gadgets, and more with fellow students securely.
          </p>

          <div className="mt-8">
            <Link
              to="/signup"
              className="inline-block px-12 py-4 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30"
            >
              Join Now →
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-700/30 shadow-xl backdrop-blur-sm">
        {/* Existing footer remains unchanged */}
      </footer>

      <style jsx>{`
        @keyframes text-glow {
          0% {
            text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(79, 70, 229, 0.8);
          }
          100% {
            text-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
          }
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
}
