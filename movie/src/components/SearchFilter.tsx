import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { filterMovies } from '../store/movieSlice';

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  min-width: 200px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
`;

export const SearchFilter = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    year: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    dispatch(filterMovies(newFilters));
  };

  return (
    <FilterContainer>
      <Input
        type="text"
        name="title"
        placeholder="Search by title..."
        value={filters.title}
        onChange={handleChange}
      />
      <Select name="type" value={filters.type} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="sci-fi">Sci-Fi</option>
      </Select>
      <Input
        type="number"
        name="year"
        placeholder="Filter by year..."
        value={filters.year}
        onChange={handleChange}
      />
    </FilterContainer>
  );
};