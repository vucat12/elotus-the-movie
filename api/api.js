import axios from 'axios';

const api = 'https://api.themoviedb.org/3';

const envFile = process.env.API_KEY;

const fetchFilm = async (title, page) => {
	const film = title === 'now_playing' ? 'now_playing' : 'top_rated';

	const options = {
		method: 'GET',
		url: `${api}/movie/${film}`,
		params: {
			api_key: envFile,
			page: page
		}
	};
	const data = await axios(options).then((res) => res.data);

	// const { results } = data;

	return data;
};

const fetchFilmById = async (id) => {
	const options = {
		method: 'GET',
		url: `${api}/movie/${id}`,
		params: {
			api_key: envFile
		}
	};
	const data = await axios(options).then((res) => res.data);

	const {
		title,
		vote_average,
		release_date,
		episode_run_time,
		runtime,
		backdrop_path,
		genres,
		overview
	} = data;


	const filmName = title;

	const filmDate = release_date;

	const rating = Number(vote_average).toFixed(1);

	const duration = runtime ? runtime : episode_run_time[0];

	const isOverview = overview ? overview : 'To be updated...';

	return {
		filmName,
		rating,
		filmDate,
		duration,
		backdrop_path,
		isOverview,
		genres
	};
};

export { fetchFilm, fetchFilmById };
