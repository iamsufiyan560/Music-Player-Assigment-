import React, { useEffect, useState, useRef } from "react";
import {
  FaForward,
  FaBackward,
  FaVolumeMute,
  FaVolumeUp,
  FaPlayCircle,
  FaPauseCircle,
} from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import displayColorAtom from "../atoms/colorAtom";
import { useSetRecoilState } from "recoil";
import useFetchSongs from "../hooks/useFetchSongs";

const SongInfo = ({ selectedSong, onSelectSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const setScreenColor = useSetRecoilState(displayColorAtom);
  const audioRef = useRef(null);
  const progressRef = useRef();
  const { songs } = useFetchSongs();

  useEffect(() => {
    setScreenColor(selectedSong.accent);

    if (audioRef.current) {
      audioRef.current.src = selectedSong.url;
      audioRef.current.currentTime = 0;
      setCurrentTime(0);

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedSong, setScreenColor]);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      const updateDuration = () => {
        setDuration(audioElement.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioElement.currentTime);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        handleNext();
      };

      audioElement.addEventListener("loadedmetadata", updateDuration);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("ended", handleEnded);

      return () => {
        audioElement.removeEventListener("loadedmetadata", updateDuration);
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [selectedSong]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = progressRef.current.value;
      setCurrentTime(progressRef.current.value);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    if (currentIndex < songs.length - 1) {
      onSelectSong(songs[currentIndex + 1]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    if (currentIndex > 0) {
      onSelectSong(songs[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);

  return (
    <div className="lg:ml-16 ml-8 fixed  text-white lg:pt-0 sm:pt-24 pt-20 h-screen md:pt-20 md:w-auto md:mr-16 xl:w-[480px] w-[250px] sm:w-[320px]">
      <h2 className="sm:text-3xl md:text-2xl font-bold text-xl">
        {selectedSong.name}
      </h2>
      <h3 className="sm:text-2xl md:text-xl text-xl text-gray-400 mb-4">
        {selectedSong.artist}
      </h3>

      <img
        src={`https://cms.samespace.com/assets/${selectedSong.cover}`}
        alt={selectedSong.name}
        className="w-[240px] xl:w-[480px] xl:h-[400px] lg:h-[250px] sm:h-[300px] md:h-[130px] md:w-[400px] object-cover mb-4 h-[120px]"
      />
      <div className="flex items-center">
        <div className="xl:w-full">
          <div className="relative h-1 bg-[#FFFFFF1A] rounded-md overflow-hidden">
            <div
              className="absolute h-full bg-white"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            />
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            ref={progressRef}
            className="lg:w-[240px] xl:w-full w-[240px] md:w-[400px] h-1 opacity-0 cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-4">
        <div className="">
          <PiDotsThreeBold
            className="cursor-pointer bg-[#FFFFFF1A] rounded-full p-2"
            size={36}
          />
        </div>
        <div className="flex ml-auto">
          <FaBackward
            size={30}
            className={`cursor-pointer ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          />
          {isPlaying ? (
            <FaPauseCircle
              size={30}
              className="cursor-pointer mx-4"
              onClick={togglePlayPause}
            />
          ) : (
            <FaPlayCircle
              size={36}
              className="cursor-pointer mx-4"
              onClick={togglePlayPause}
            />
          )}
          <FaForward
            size={30}
            className={`cursor-pointer ${
              currentIndex === songs.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNext}
            disabled={currentIndex === songs.length - 1}
          />
        </div>

        <div className="ml-auto">
          {isMuted ? (
            <FaVolumeMute
              size={36}
              className="cursor-pointer bg-[#FFFFFF1A] rounded-full p-2"
              onClick={toggleMute}
            />
          ) : (
            <FaVolumeUp
              size={36}
              className="cursor-pointer bg-[#FFFFFF1A] rounded-full p-2"
              onClick={toggleMute}
            />
          )}
        </div>
      </div>

      {/* Hidden audio element for music playback */}
      <audio ref={audioRef} />
    </div>
  );
};

export default SongInfo;
