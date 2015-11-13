import {Map, fromJS} from 'immutable';

export function setBooks(state, entries) {
    return state.set('books', fromJS(entries));
}

export function addBook(state, entry) {
    const immEntry = fromJS(entry);
    return state.updateIn(['books'], (books) => {
        const nextId = books.maxBy((book) => book.get('id')).get('id') + 1;
        return books.push(immEntry.set('id', nextId));
    });
}

export function updateBook(state, entry) {
    const books = state.get('books');
    const immEntry = fromJS(entry);
    const index = books.findIndex((book) => book.get('id') === immEntry.get('id'));
    return state.updateIn(['books'], (books) => books.update(index, (oldEntry) => immEntry));
}

export function deleteBook(state, entry) {
    const immEntry = fromJS(entry);
    const index = state.get('books').findIndex((book) => book.get('id') === immEntry.get('id'));
    return state.updateIn(['books'], (books) => books.delete(index));
}
