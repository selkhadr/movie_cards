import { FastifyInstance } from 'fastify';
import { movies } from '../data/movies';

export async function movieRoutes(fastify: FastifyInstance) {
  fastify.get('/api/movies', async (request, reply) => {
    try {
      return { 
        success: true, 
        data: movies 
      };
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });

  fastify.get('/api/movies/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const movie = movies.find(m => m.id === parseInt(id));
      
      if (!movie) {
        reply.code(404).send({
          success: false,
          error: 'Movie not found'
        });
        return;
      }

      return { 
        success: true, 
        data: movie 
      };
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });

  fastify.get('/api/movies/search', async (request, reply) => {
    try {
      const { title, type, year } = request.query as { 
        title?: string; 
        type?: string; 
        year?: string;
      };

      let filteredMovies = [...movies];

      if (title) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.title.toLowerCase().includes(title.toLowerCase())
        );
      }

      if (type) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.type === type
        );
      }

      if (year) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.releaseYear === parseInt(year)
        );
      }

      return { 
        success: true, 
        data: filteredMovies 
      };
    } catch (error) {
      reply.code(500).send({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
}