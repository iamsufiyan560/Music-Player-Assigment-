import React from "react";
import useFetchSongs from "../hooks/useFetchSongs";
import Loader from "./Loader";

const SongList = ({ searchTerm, onSelectSong, selectedSong }) => {
  const { songs, isLoading, error } = useFetchSongs();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error fetching data</div>;
  }

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4  pt-16 sm:pt-16 lg:pt-28 h-screen ">
      {filteredSongs.length === 0 ? (
        <div className="text-gray-400 mt-14 text-2xl items-center justify-center flex">
          No songs found.
        </div>
      ) : (
        filteredSongs.map((song) => (
          <div
            key={song.id}
            className={`flex items-center justify-between mb-4 p-2 rounded-md h-20 cursor-pointer ${
              selectedSong && selectedSong.id === song.id
                ? "bg-[#FFFFFF14]"
                : ""
            }`}
            onClick={() => onSelectSong(song)}
          >
            <div className="flex items-center ">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <div className="text-white font-bold">{song.name}</div>
                <div className="text-gray-400">{song.artist}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SongList;
