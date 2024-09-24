// components/Playlist.tsx
import React from 'react';

interface MediaItem {
  url: string;
  name: string;
}

interface PlaylistProps {
  playlist: MediaItem[];
  onPlay: (url: string) => void;
  onRemove: (url: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, onPlay, onRemove }) => {
  return (
    <div>
      {playlist.length === 0 ? (
        <p>No media in the playlist.</p>
      ) : (
        <ul className="list-disc">
          {playlist.map((item) => (
            <li key={item.url} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div>
                <button
                  onClick={() => onPlay(item.url)}
                  className="bg-gradient-to-r from-green-400 to-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Play
                </button>
                <button
                  onClick={() => onRemove(item.url)}
                  className="bg-red-600 text-white font-bold py-1 px-3 rounded"
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
