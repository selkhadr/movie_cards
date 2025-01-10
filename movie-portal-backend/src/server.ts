import Fastify from 'fastify';
import cors from '@fastify/cors';
import { movieRoutes } from './routes/movies';

const fastify = Fastify({
  logger: true
});

// Register p
// lugins
fastify.register(cors, {
  origin: true // In production, specify your frontend domain
});

// Register routes
fastify.register(movieRoutes);

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({
    success: false,
    error: 'Internal Server Error'
  });
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();