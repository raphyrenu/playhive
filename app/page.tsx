'use client';
import React from 'react';
import logo from './logo.png';

import Image from "next/image";// Adjust the path as needed

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-800 text-white">
     
      
      <header className="flex justify-between items-center p-6 bg-gray-900">
        <div className="flex items-center">
        <Image
            src={logo}
            alt="Logo"
            className="h-10 w-10 mr-2"
            width={40}
            height={40}
          />
          <h1 className="text-2xl font-bold">PlayHive</h1>
        </div>
       
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to PlayHive
        </h2>
        <p className="text-lg md:text-xl mb-8">
          The ultimate media player for managing and enjoying your music and videos.
          Upload, organize, and play your favorite media all in one place.
        </p>
        <div>
          <button
           
            onClick={() => {}}
          >
            <a href="/start" className='bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg mr-4'>Start Now</a>
          </button>
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg"
            onClick={() => {/* Link to other page or feature */}}
          >
            Learn More
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4">
        <p className="text-sm">&copy; 2024 PlayHive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;