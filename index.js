import {Server} from 'hapi';
import {notFound} from 'boom';
import Book from './src/model/book';

const server = new Server(
    {connections: {
        routes: {
            cors: true
        }
    }
});

server.connection({
    port: parseInt(process.env.PORT, 10) || 5000
});

server.route({
    method: 'GET',
    path: '/books',
    handler: (request, reply) => Book.findAll().then((books) => reply(books))
});

server.route({
    method: 'GET',
    path: '/books/{id}',
    handler: (request, reply) => Book.findById(request.params.id).then((book) => reply(book === null ? notFound('book not found') : book))
});

server.route({
    method: 'PUT',
    path: '/books/{id}',
    handler: (request, reply) => Book.update(request.payload, {where: {id: request.params.id}}).then((book) => reply())
});

server.route({
    method: 'POST',
    path: '/books',
    handler: (request, reply) => Book.create(request.payload).then((book) => reply(book))
});

server.route({
    method: 'DELETE',
    path: '/books/{id}',
    handler: (request, reply) => Book.destroy({where: {id: request.params.id}}).then(() => reply())
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
