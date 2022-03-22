import { useEffect, useState } from "react";
import styles from '../styles/Home.module.scss'
import { Link } from "react-router-dom";
import axios from 'axios'


const Films = ( ) => 
{
		const [movies, setMovies] = useState(null);
		const [favs, setFavs] = useState([]);
		const [originalMovies, setOriginalMovies] = useState(null);
		const [loading, setLoading] = useState(true);

		const getMovies = async() => {
			const res = await axios.get('https://www.swapi.tech/api/films');
			const films = res.data.result;
			setMovies(films)
			setOriginalMovies(films)
			setLoading(false)
		}

		const searcher = event =>
		{
			const query = event.target.value.toLowerCase();
			if(!query)
				setMovies(originalMovies)
			setMovies(
				prev => originalMovies.filter(
					film => film.properties.title.toLowerCase().startsWith(query)
				)
			)
		}

		const saveFav = event =>
		{
			const id = event.target.id
			if(favs.includes(id))
				setFavs(prev => prev.filter(fav => fav !== id))
			else
				setFavs(prev => [...prev, id])
		}

		useEffect(
				() => 
				{
					getMovies()
					if(window.localStorage.getItem('favs'))
						setFavs(JSON.parse(window.localStorage.getItem('favs')))
				}, 
				[]
		)

		useEffect(
				() => 
				{
					if(favs.length > 0)
						window.localStorage.setItem('favs', JSON.stringify(favs))
					else
						window.localStorage.removeItem('favs')
				}, 
				[favs]
		)

		return ( 
				<div className={styles.container}>
					<div>
						<label>Search Film: </label>
						<input type='text' onChange={searcher} />
					</div>
					<div>
						<div>
							<h2 style={ { textAlign: "center" } }>
								List of Star Wars Films
							</h2>
						</div>
						<div>
							{
								loading 
									? 'Loading...'
									:
										(movies?.length > 0) 
									? 
									<>
										{
											movies.map(
												film => 
													(favs.includes(film.uid))
														?	<div className={styles.filmlist} key={film._id}>
																<Link to={`/films/${film.uid}`} key={film.uid}>
																	{film.properties.title}
																</Link> 
																<span id={film.uid} onClick={saveFav} style={ { color: favs.includes(film.uid) ? 'red' : 'black' } }>FAV</span>
															</div>
														: ''
											)
										}
										{
											movies.map(
												film => 
													(!favs.includes(film.uid))
														? <div className={styles.filmlist} key={film._id}>
																<Link to={`/films/${film.uid}`} key={film.uid}>
																	{film.properties.title}
																</Link> 
																<span id={film.uid} onClick={saveFav} style={{color: favs.includes(film.uid) ? 'red' : 'black'}}>FAV</span>
															</div>
														: ''
											)           
										}
									</>
									: 
										<p>No Film matching your query</p>
							}
						</div>
					</div>
				</div>
		);
}
 
export default Films;
