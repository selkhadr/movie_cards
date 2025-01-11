import Fastify from 'fastify';
import cors from '@fastify/cors';
import { movieRoutes } from './routes/movies';

const fastify = Fastify({
  logger: true
});


fastify.register(cors, {
  origin: true 
});

fastify.register(movieRoutes);

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({
    success: false,
    error: 'Internal Server Error'
  });
});

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