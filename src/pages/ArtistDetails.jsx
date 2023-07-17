import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery, useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const { data: relatedSongsData, isFetching: isFetchingRelatedSongs, error: errorRelatedSongs} = useGetRelatedSongsQuery(artistId);

  if(isFetchingArtistDetails || isFetchingRelatedSongs) return <Loader title="Loading artist details" />;

  if(error || errorRelatedSongs) return <Error />

  const data = {
    properties: {},
    tracks: relatedSongsData?.tracks?.filter((song) => song.artists && song?.hub?.actions)
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={artistId}
        artistData={artistData}
      />
      
      <RelatedSongs 
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
  </div>
  )
};

export default ArtistDetails;
