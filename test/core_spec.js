import {expect} from 'chai';
import {Map, fromJS} from 'immutable';
import {setBooks, addBook, updateBook, deleteBook} from '../src/core';

describe('library storage', () => {
    describe('setBooks', () => {
        it('set books to the state', () => {
            const state = Map();
            const entries = [
                {id: 1, author: 'Stephen King', title: 'Shining'},
                {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'}
            ];
            const nextState = setBooks(state, entries);
            expect(nextState).to.equal(fromJS({'books': [
                {id: 1, author: 'Stephen King', title: 'Shining'},
                {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'}
            ]}));
        });
    });

    describe('addBook', () => {
        it('adds entry to the state', () => {
            const state = fromJS({
                'books': [
                    {id: 1, author: 'Stephen King', title: 'Shining'},
                    {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'}
                ]});
            const nextState = addBook(state, {'author': 'R.R. Martin', title: 'A game of thrones'});
            expect(nextState).to.equal(fromJS({'books': [
                {id: 1, author: 'Stephen King', title: 'Shining'},
                {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'},
                {id: 3, author: 'R.R. Martin', title: 'A game of thrones'}
            ]}));
        });
    });

    describe('updateBook', () => {
        it('updates existing entry', () => {
            const state = fromJS({
                'books': [
                    {id: 1, author: 'Stephen King', title: 'Shining'},
                    {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'}
                ]});
            const nextState = updateBook(state, {id: 1, author: 'Stephen King', title: 'Lśnienie'});
            expect(nextState).to.equal(fromJS({'books': [
                {id: 1, author: 'Stephen King', title: 'Lśnienie'},
                {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'},
            ]}));
        });
    });

    describe('deleteBook', () => {
        it('updates existing entry', () => {
            const state = fromJS({
                'books': [
                    {id: 1, author: 'Stephen King', title: 'Shining'},
                    {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'}
                ]});
            const nextState = deleteBook(state, {id: 1});
            expect(nextState).to.equal(fromJS({'books': [
                {id: 2, author: 'J.R.R. Tolkien', title: 'Lord of the ring'},
            ]}));
        });
    });
});
