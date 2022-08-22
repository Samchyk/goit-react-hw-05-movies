import { useState, useEffect } from 'react';
import { fetchMovieReviewsById } from '../../../services/movies-api';
import { useParams } from 'react-router-dom';
import s from './Reviews.module.css';

export default function Reviews() {
   const { movieId } = useParams();
   const [reviews, setReviews] = useState(null);

   useEffect(() => {
      fetchMovieReviewsById(movieId).then(date => setReviews(date.results));
   }, [movieId]);
   return (
      <ul className={s.list}>
         {reviews && reviews.length ? (
            reviews.map(review => (
               <li key={review.id}>
                  <h2 className={s.title}>Author: {review.author}</h2>
                  <p className={s.text}>{review.content}</p>
               </li>
            ))
         ) : (
            <li>We don`t have any reviews for this movie</li>
         )}
      </ul>
   );
}
