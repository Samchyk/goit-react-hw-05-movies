import { Suspense } from 'react';
import { URL_IMG, fetchMovieDetailsById } from '../../services/movies-api';
import { useState, useEffect } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import NotFound from '../NotFound/NotFound';
import defaultImg from '../../images/default-movie.png';

export default function MovieDetailsPage() {
   const { movieId } = useParams();
   const [movie, setMovie] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchMovieDetailsById(movieId)
         .then(setMovie)
         .catch(error => setError(error));
   }, [movieId]);

   return (
      <div>
         {movie && (
            <div>
               <div className={s.movie}>
                  <img
                     src={
                        movie.poster_path
                           ? URL_IMG + movie.poster_path
                           : defaultImg
                     }
                     alt={movie.title || movie.name}
                     width="300"
                  />
                  <div className={s.Info}>
                     <h2 className={s.title}>{movie.title || movie.name}</h2>
                     <p className={s.text}>
                        <b>Release date:</b> {movie.release_date}
                     </p>
                     <p className={s.text}>
                        <b>User Score:</b> {movie.vote_average}
                     </p>
                     <p className={s.text}>
                        <b>Genres:</b>{' '}
                        {movie.genres.map(genr => genr.name).join(' / ')}
                     </p>
                     <p className={s.text}>
                        <b>Runtime:</b> {movie.runtime} min.
                     </p>
                     <p className={s.text}>
                        <b>Overview:</b>
                     </p>
                     <p className={s.text}>{movie.overview}</p>
                  </div>
               </div>
               <hr />
               <nav className={s.nav}>
                  <NavLink to="cast">Cast</NavLink>
                  <NavLink to="reviews">Reviews</NavLink>
               </nav>
               <hr />
            </div>
         )}
         {error && <NotFound />}
         <Suspense fallback={<Loader />}>
            <Outlet />
         </Suspense>
      </div>
   );
}
