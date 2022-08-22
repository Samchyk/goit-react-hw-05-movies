import { useState, useEffect } from 'react';
import { URL_IMG, fetchMovieCreditsById } from '../../../services/movies-api';
import { useParams } from 'react-router-dom';
import defaultPhoto from '../../../images/avatar.png';
import s from './Cast.module.css';

export default function Cast() {
   const { movieId } = useParams();
   const [authors, setAuthors] = useState(null);

   useEffect(() => {
      fetchMovieCreditsById(movieId).then(date => {
         setAuthors([...date.cast]);
      });
   }, [movieId]);

   return (
      <ul className={s.authorGrid}>
         {authors &&
            authors.map(({ id, profile_path, name, cast_id }) => (
               <li key={id + cast_id} className={s.Item}>
                  <img
                     className={s.Img}
                     src={profile_path ? URL_IMG + profile_path : defaultPhoto}
                     alt={name}
                     width="100"
                  />
                  <p className={s.title}>{name}</p>
               </li>
            ))}
      </ul>
   );
}
