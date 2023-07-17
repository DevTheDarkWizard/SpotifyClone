import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const { searchTerm } = useParams(); 
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data: topChartsData, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

	if(isFetching) return <Loader title="Loading top charts" />;

	if(error) return <Error />;

	const data = {
		properties: {},
		tracks: topChartsData?.tracks?.filter((song) => song.artists && song?.hub?.actions)
	};

	return (
		<div className="flex flex-col">
			<h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
				Showing results for <span className="font-black">{searchTerm}</span>
			</h2>

			<div className="flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.tracks?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	)
};

export default Search;
