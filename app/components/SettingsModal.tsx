// components/SettingsModal.tsx

import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: 'light' | 'dark'; // Ensure the type is strictly 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void; // Update here
  playbackSpeed: number;
  onPlaybackSpeedChange: (speed: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
  playbackSpeed,
  onPlaybackSpeedChange,
  volume,
  onVolumeChange,
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800 text-white rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>

        {/* Theme Selection */}
        <div className="mb-4">
          <label className="block mb-2">Theme:</label>
          <select
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value as 'light' | 'dark')} // Ensure value is correctly typed
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Playback Speed Selection */}
        <div className="mb-4">
          <label className="block mb-2">Playback Speed:</label>
          <select
            value={playbackSpeed}
            onChange={(e) => onPlaybackSpeedChange(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value={1}>Normal</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
            <option value={0.5}>0.5x</option>
          </select>
        </div>

        {/* Volume Control */}
        <div className="mb-4">
          <label className="block mb-2">Volume:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Close Button */}
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
