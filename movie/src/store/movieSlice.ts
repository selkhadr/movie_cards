import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../types/movie';
import { fetchMoviesApi } from '../services/api';

interface MovieState {
  movies: Movie[];
  filteredMovies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  filteredMovies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await fetchMoviesApi();
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    filterMovies: (state, action) => {
      const { title, type, year } = action.payload;
      let filtered = [...state.movies];

      if (title) {
        filtered = filtered.filter(movie =>
          movie.title.toLowerCase().includes(title.toLowerCase())
        );
      }
      if (type) {
        filtered = filtered.filter(movie => movie.type === type);
      }
      if (year) {
        filtered = filtered.filter(movie => 
          movie.releaseYear === parseInt(year)
        );
      }

      state.filteredMovies = filtered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.filteredMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export const { filterMovies } = movieSlice.actions;
export default movieSlice.reducer;