import React from 'react';
import { URL_IMG } from '../../services/movies-api';
import { Link } from 'react-router-dom';
import s from './MoviesGallery.module.css';
import defaultImg from '../../images/default-movie.png';
import PropTypes from 'prop-types';

export default function MoviesGallery({ moviesList }) {
   return (
      <ul id="MoviesGallery" className={s.MovieGrid}>
         {moviesList.map(({ id, title, name, poster_path }) => (
            <li key={id} className={s.Item}>
               <Link to={`/movies/${id}`} className={s.Link}>
                  <img
                     className={s.Img}
                     src={poster_path ? URL_IMG + poster_path : defaultImg}
                     alt={title || name}
                  />
                  <p className={s.title}>{title || name}</p>
               </Link>
            </li>
         ))}
      </ul>
   );
}

MoviesGallery.propTypes = {
   moviesList: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         title: PropTypes.string,
         name: PropTypes.string,
         poster_path: PropTypes.string,
      })
   ),
};
