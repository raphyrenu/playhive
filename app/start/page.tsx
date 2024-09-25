// app/page.tsx

"use client";

import React, { useState } from "react";
import MediaPlayer from "../components/MediaPlayer";
import Playlist from "../components/Playlist";
import Image from "next/image"; // Importing the Image component from next/image
import logo from "../logo.png"; // Ensure this import path is correct
import SettingsModal from "../components/SettingsModal"; // Ensure this import is correct
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'; 

import "../globals.css";

interface MediaItem {
  url: string;
  name: string;
}

const IndexPage: React.FC = () => {
  const [playlist, setPlaylist] = useState<MediaItem[]>([]);
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [view, setView] = useState<"upload" | "player" | "playlist">("upload");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(100); // Volume as a percentage

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      const mediaName = file.name;
      setPlaylist((prev) => [...prev, { url: mediaUrl, name: mediaName }]);
      setView("playlist");
    }
  };

  const playMedia = (mediaUrl: string) => {
    setCurrentMedia(mediaUrl);
    setIsPlaying(true);
    setView("player");
  };

  const removeMedia = (mediaUrl: string) => {
    const updatedPlaylist = playlist.filter((item) => item.url !== mediaUrl);
    setPlaylist(updatedPlaylist);

    if (currentMedia === mediaUrl) {
      setCurrentMedia(null);
      setIsPlaying(false);
      setView("playlist");
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={`min-h-screen ${
        currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } text-white flex flex-col`}
    >
      {/* Header */}
      <header className={`flex justify-between items-center p-4  ${
        currentTheme === "dark" ? "bg-gray-900 border-b" : "bg-white  border-b"
      }`}>
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            className="h-10 w-10 mr-2"
            width={40}
            height={40}
          />{" "}
          {/* Using the Image component */}
          <h1 className={`text-2xl font-bold ${
        currentTheme === "dark" ? undefined:"text-gray-900"}`}>PlayHive</h1>
        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => setIsSettingsOpen(true)}
        >
          Settings
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center p-4 flex-grow h-full justify-center">
        {view === "upload" && (
          <>
            <h2 className={`text-4xl font-bold mb-6 ${
        currentTheme === "dark" ? "text-white":"text-gray-900"}`}>Upload Your Media</h2>
            <div className="mb-6">
              <input
                type="file"
                accept="video/mp4,video/x-m4v,video/*,audio/*"
                id="file-upload"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg cursor-pointer"
              >
                Choose a File
              </label>
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-7  rounded-lg"
              onClick={() => setView("playlist")}
            >
              View Playlist
            </button>
          </>
        )}

        {view === "player" && currentMedia && (
          <>
            <MediaPlayer
              mediaSrc={currentMedia}
              isPlaying={isPlaying}
              onTogglePlay={togglePlayPause}
              onRemove={() => removeMedia(currentMedia!)} // Use non-null assertion operator
              onEnd={handleEnd}
              playbackSpeed={playbackSpeed}
              volume={volume}
            />
            <button
              className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setView("playlist")}
            >
              Back to Playlist
            </button>
          </>
        )}

        {view === "playlist" && (
          <>
            <h2 className={`text-4xl font-bold mb-6 ${
        currentTheme === "dark" ? "text-white":"text-gray-900"}`}>Your Playlist</h2>
           <Playlist
  playlist={playlist}
  onPlay={playMedia}
  onRemove={removeMedia}
  currentTheme={currentTheme} 
/>
            <button
              className="mt-6 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setView("upload")}
            >
              Upload More Media
            </button>
          </>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        playbackSpeed={playbackSpeed}
        onPlaybackSpeedChange={setPlaybackSpeed}
        volume={volume}
        onVolumeChange={setVolume}
      />
      
      <div className={`container mx-auto px-4 flex flex-col md:flex-row justify-between items-center ${
        currentTheme === "dark" ? "text-white":"text-gray-900"}`}>
        
        {/* Logo or Brand Name */}
        <div className="mb-4 md:mb-0 flex flex-row items-center justify-center">
        <Image
            src={logo}
            alt="Logo"
            className="h-10 w-10 mr-2 "
            width={40}
            height={40}
          />{" "}
          <h1 className={`inline text-2xl font-bold  ${
        currentTheme === "dark" ? "text-white":"text-gray-900"}`}>Playhive</h1> {/* Adjust this to your team name */}
        </div>

        {/* Footer Links */}
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li>
            <a href="/about" className="hover:text-gray-800">About</a>
          </li>
          <li>
            <a href="/projects" className="hover:text-gray-800">Projects</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-800">Contact</a>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://x.com/RAPHY15926" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
            <FaTwitter size={24} />
          </a>
          <a href="https://github.com/raphyrenu/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/raphaelrenu/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-gray-500">
        © {new Date().getFullYear()} PlayHive. All rights reserved.
      </div>
    

    </div>
  );
};

export default IndexPage;
