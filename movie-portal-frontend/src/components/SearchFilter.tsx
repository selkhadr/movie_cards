import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { filterMovies } from '@/store/features/movieSlice';
import { useState } from 'react';

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SearchFilter = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    year: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    dispatch(filterMovies({ ...filters, [name]: value }));
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