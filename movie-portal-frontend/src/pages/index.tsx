import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchMovies } from '@/store/features/movieSlice';
import { MovieCard } from '@/components/MovieCard';
import { SearchFilter } from '@/components/SearchFilter';
import { AppDispatch, RootState } from '@/store/store';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
`;

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredMovies, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return <LoadingText>Loading movies...</LoadingText>;
  }

  if (error) {
    return <LoadingText>Error: {error}</LoadingText>;
  }

  return (
    <Container>
      <Title>Movie Portal</Title>
      <SearchFilter />
      <Grid>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Container>
  );
}