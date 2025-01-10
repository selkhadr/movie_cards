import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../store/store';
import { fetchMovies } from '../store/movieSlice';
import { MovieCard } from '../components/MovieCard';
import { SearchFilter } from '../components/SearchFilter';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredMovies, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <Loading>Loading movies...</Loading>;
  }

  if (error) {
    return <Loading>Error: {error}</Loading>;
  }

  return (
    <Container>
      <h1>Movie Portal</h1>
      <SearchFilter />
      <Grid>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Container>
  );
}