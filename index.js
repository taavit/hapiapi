import Hapi from '@hapi/hapi';
import { notFound } from 'boom';
import Book from './src/model/book';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/books',
        handler: async () => await Book.findAll(),
    });
    
    server.route({
        method: 'GET',
        path: '/books/{id}',
        handler: async (request) => {
            const book = await Book.findAll({ where: { id: request.params.id } });
            if (book.length === 0) {
                return notFound('Book not found');
            }
            return book;
        },
    });
    
    server.route({
        method: 'PUT',
        path: '/books/{id}',
        handler: async (request, reply) => {
            await Book.update(request.payload, {where: {id: request.params.id}});
            return null;
        },
    });
    
    server.route({
        method: 'POST',
        path: '/books',
        handler: async (request, reply) => await Book.create(request.payload),
    });
    
    server.route({
        method: 'DELETE',
        path: '/books/{id}',
        handler: async (request, reply) => {
            await Book.destroy({where: {id: request.params.id}});
            return null;
        },
    });
    
    await server.start();
    console.log('Server running at:', server.info.uri);
}

 init();
