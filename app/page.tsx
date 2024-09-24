'use client';

import React, { useState } from 'react';
import MediaPlayer from './components/MediaPlayer';
import Playlist from './components/Playlist';
import SettingsModal from './components/SettingsModal';

interface MediaItem {
  url: string;
  name: string;
}

const IndexPage: React.FC = () => {
  const [playlist, setPlaylist] = useState<MediaItem[]>([]);
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [view, setView] = useState<'upload' | 'player' | 'playlist'>('upload');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(100); // Volume as a percentage

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      const mediaName = file.name;
      setPlaylist((prev) => [...prev, { url: mediaUrl, name: mediaName }]);
      setView('playlist');
    }
  };

  const playMedia = (mediaUrl: string) => {
    setCurrentMedia(mediaUrl);
    setIsPlaying(true);
    setView('player');
  };

  const removeMedia = (mediaUrl: string) => {
    const updatedPlaylist = playlist.filter((item) => item.url !== mediaUrl);
    setPlaylist(updatedPlaylist);
    
    if (currentMedia === mediaUrl) {
      setCurrentMedia(null);
      setIsPlaying(false);
      setView('playlist');
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'} text-white flex flex-col`}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-900">
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
          <h1 className="text-2xl font-bold">PlayHive</h1>
        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => setIsSettingsOpen(true)}
        >
          Settings
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center p-4 flex-grow">
        {view === 'upload' && (
          <>
            <h2 className="text-4xl font-bold mb-6">Upload Your Media</h2>
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setView('playlist')}
            >
              View Playlist
            </button>
          </>
        )}

        {view === 'player' && currentMedia && (
          <>
            <MediaPlayer
              mediaSrc={currentMedia}
              isPlaying={isPlaying}
              onTogglePlay={togglePlayPause}
              onRemove={() => removeMedia(currentMedia)}
              onEnd={handleEnd}
              playbackSpeed={playbackSpeed}
              volume={volume}
            />
            <button
              className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setView('playlist')}
            >
              Back to Playlist
            </button>
          </>
        )}

        {view === 'playlist' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Your Playlist</h2>
            <Playlist playlist={playlist} onPlay={playMedia} onRemove={removeMedia} />
            <button
              className="mt-6 bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => setView('upload')}
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
    </div>
  );
};

export default IndexPage;