import styled from 'styled-components';
import { Movie } from '../types/movie';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #eee;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const Badge = styled.span`
  background: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

export const MovieCard = ({ movie }: { movie: Movie }) => (
  <Card>
    <ImageContainer>
      <img
        src={movie.image}
        alt={movie.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/300x200?text=Movie';
        }}
      />
    </ImageContainer>
    <Content>
      <Title>{movie.title}</Title>
      <Description>{movie.description}</Description>
      <Badge>{movie.type}</Badge>
    </Content>
  </Card>
);
