import { fetchTrending } from '../../services/movies-api';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Scrollup from '../../components/Scrollup/Scrollup';
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery';
import * as Scroll from 'react-scroll';
import s from './HomePage.module.css';

export default function HomePage() {
   const [moviesList, setMoviesList] = useState([]);
   const [countPage, setCountPage] = useState(1);
   const [showLoadMore, setShowLoadMore] = useState(true);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setShowLoadMore(false);
      setLoading(true);
      fetchTrending(countPage).then(date => {
         setMoviesList(prev => {
            const filterRes = date.results.filter(({ id }) => {
               for (const movie of prev) {
                  if (id === movie.id) {
                     return false;
                  }
               }
               return true;
            });
            return [...prev, ...filterRes];
         });
         setLoading(false);
         setShowLoadMore(true);
      });
   }, [countPage]);

   const onloadeMore = () => {
      setCountPage(prev => prev + 1);
      scrollSlowly();
   };

   const scrollSlowly = () => {
      const { height: cardHeight } = document
         .querySelector('#MoviesGallery')
         .firstElementChild.getBoundingClientRect();
      Scroll.animateScroll.scrollMore(cardHeight * 2);
   };

   return (
      <div>
         <h1 className={s.title}>Trending today</h1>
         <MoviesGallery moviesList={moviesList} />
         {loading && <Loader />}
         {showLoadMore && <Button onClick={onloadeMore} title="Load more" />}
         <Scrollup />
      </div>
   );
}
