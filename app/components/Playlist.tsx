"use client"
import React from 'react';
import { useState } from 'react';



interface MediaItem {
  url: string;
  name: string;
  
}

interface PlaylistProps {
  playlist: MediaItem[];
  onPlay: (url: string) => void;
  onRemove: (url: string) => void;
  currentTheme: 'light' | 'dark';
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, onPlay, onRemove,currentTheme }) => {
  return (
    <div>
      {playlist.length === 0 ? (
        <p className={`${
          currentTheme === "dark" ? "text-white":"text-gray-900"}`}>No media in the playlist.</p>
      ) : (
        <ul className="list-disc">
          {playlist.map((item) => (
            <li key={item.url} className="flex justify-between items-center mb-2">
              <span className={`font-bold mr-7 text-white ${
          currentTheme === "dark" ? "text-white":"text-gray-900"}`}>{item.name}</span>
              <div>
                <button
                  onClick={() => onPlay(item.url)}
                  className="bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Play
                </button>
                <button
                  onClick={() => onRemove(item.url)}
                  className="ml-5 bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Playlist;
