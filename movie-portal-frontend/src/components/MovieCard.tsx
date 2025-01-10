import styled from 'styled-components';
import { Movie } from '@/types/movie';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Type = styled.span`
  background: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <Card>
    <Image src={movie.image} alt={movie.title} />
    <Content>
      <Title>{movie.title}</Title>
      <Description>{movie.description}</Description>
      <Type>{movie.type}</Type>
    </Content>
  </Card>
);
