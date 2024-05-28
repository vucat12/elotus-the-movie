import Head from 'next/head';
import { fetchFilm } from '../api/api';
import MoviesOrTv from '../components/MoviesOrTv';
import WelcomePage from '../components/WelcomePage';

export default function Home({ nowPlaying, topRated }) {
	return (
		<>
			<Head>
				<title>PremierMovie</title>
				<meta name="description" content="PremierMovie" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<WelcomePage />

			<MoviesOrTv title="now_playing" filmList={nowPlaying} />

			<MoviesOrTv title="top_rated" filmList={topRated} />
		</>
	);
}

export const getStaticProps = async () => {
	const nowPlayingData = fetchFilm('now_playing', 1);

	const topRatedData = fetchFilm('top_rated', 1);

	const [nowPlaying, topRated] = await Promise.all([nowPlayingData, topRatedData]);

	return {
		props: { nowPlaying, topRated },
	};
};
