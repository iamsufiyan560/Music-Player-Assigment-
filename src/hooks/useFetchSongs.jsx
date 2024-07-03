import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSongs = async () => {
  const { data } = await axios.get("https://cms.samespace.com/items/songs");
  return data.data;
};

const useFetchSongs = () => {
  const {
    data: songs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: fetchSongs,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    staleTime: Infinity,
  });

  const topTracks = songs
    ? songs.filter((song) => song.top_track === true)
    : [];

  return { songs, topTracks, error, isLoading };
};

export default useFetchSongs;
