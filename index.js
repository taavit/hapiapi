import {Server} from 'hapi';
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
let books = [{id: 1, author: 'Stephen King', title: 'Shining'}];

server.route({
    method: 'GET',
    path: '/books',
    handler: (request, reply) => {
        return reply(books);
    }
});

server.route({
    method: 'GET',
    path: '/books/{id}',
    handler: (request, reply) => {
        return reply(books.find((book) => book.id = request.params.id));
    }
});

server.route({
    method: 'PUT',
    path: '/books/{id}',
    handler: (request, reply) => {
        const index = books.findIndex((book) => book.id === request.params.id);
        const book = JSON.parse(request.payload);
        books[index] = book;
        return reply();
    }
});

server.route({
    method: 'POST',
    path: '/books',
    handler: (request, reply) => {
        const nextId = books.reduce((prev, current) => current.id > prev ? current.id: prev, 0) + 1;
        const book = JSON.parse(request.payload);
        const newBook = Object.assign(book, {id: nextId});
        books.push(newBook);
        return reply(newBook);
    }
});

server.route({
    method: 'DELETE',
    path: '/books/{id}',
    handler: (request, reply) => {
        const indexToRemove = books.findIndex((book) => book.id === request.params.id);
        books.splice(indexToRemove, 1);
        return reply();
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
