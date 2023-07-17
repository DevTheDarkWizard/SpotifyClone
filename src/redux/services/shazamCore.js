import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const shazamCoreApi = createApi({
	reducerPath: "shazamCoreApi",
	baseQuery: fetchBaseQuery({
		//baseUrl: "https://shazam.p.rapidapi.com",
		baseUrl: "http://localhost:3001",
		prepareHeaders: (headers) => {
			headers.set("Authorization", `Bearer ${import.meta.env.VITE_LOCAL_BEARER_API_KEY}`)
			//headers.set("X-RapidAPI-Key", `${import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY}`);
			return headers;
		},
	}),

	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: (args) => {
			let baseUrl = "/charts/track";
			if(args) {
				baseUrl+="?";
				args.map((x, i)=> baseUrl+=`${x.name}=${x.value}${(i+1==args.length?"":"&")}`);
			}
			return { url: baseUrl }
		}
		}),
		getSongsByGenre: builder.query({ query: (genre) => `charts/genre-world?genre_code=${genre}` }),
		getSongDetails: builder.query({ query: (songId) => `songs/get-details?key=${songId}` }),
		getRelatedSongs: builder.query({ query: (artistId) => `artists/get-top-songs?id=${artistId}` }),
		getArtistDetails: builder.query({ query: (artistId) => `artists/get-details?id=${artistId} `}),
		getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
		getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` })
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongsByGenreQuery,
	useGetSongDetailsQuery,
	useGetRelatedSongsQuery,
	useGetArtistDetailsQuery,
	useGetSongsByCountryQuery,
	useGetSongsBySearchQuery
} = shazamCoreApi;