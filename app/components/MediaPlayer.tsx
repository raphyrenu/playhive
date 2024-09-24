// components/MediaPlayer.tsx

import React, { useEffect, useRef } from 'react';

interface MediaPlayerProps {
  mediaSrc: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRemove: () => void;
  onEnd: () => void;
  playbackSpeed: number;  // New prop for playback speed
  volume: number;         // New prop for volume
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  mediaSrc,
  isPlaying,
  onTogglePlay,
  onRemove,
  onEnd,
  playbackSpeed,
  volume,
}) => {
  const mediaRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackSpeed; // Set playback speed
      mediaRef.current.volume = volume / 100;        // Set volume (0-1)
      
      if (isPlaying) {
        mediaRef.current.play().catch((error) => console.error('Error playing video:', error));
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying, playbackSpeed, volume]); // Update when playback speed or volume changes

  return (
    <div className="flex flex-col items-center space-y-4">
      <video
        ref={mediaRef}
        controls
        className="w-full max-w-xl h-auto rounded-lg shadow-lg"
        onEnded={onEnd}
      >
        <source src={mediaSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-between mt-2 w-full max-w-xl">
        <button
          className="bg-gradient-to-r from-green-600 to-green-800 text-white font-bold py-2 px-4 rounded"
          onClick={onTogglePlay}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className="bg-gradient-to-r from-red-600 to-red-800 text-white font-bold py-2 px-4 rounded"
          onClick={onRemove}
        >
          Remove Media
        </button>
      </div>
    </div>
  );
};

export default MediaPlayer;
