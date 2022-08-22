import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import NotFound from './pages/NotFound/NotFound';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.js'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.js'));
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage/MovieDetailsPage.js')
);
const Cast = lazy(() => import('./pages/MovieDetailsPage/Cast/Cast.js'));
const Reviews = lazy(() =>
  import('./pages/MovieDetailsPage/Reviews/Reviews.js')
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
