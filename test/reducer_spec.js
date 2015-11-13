import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_BOOKS', () => {
        const initialState = Map();
        const action = {type: 'SET_BOOKS', books: [{id: 1, author: 'Stephen King', title: 'Shining'}]};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            books: [{id: 1, author: 'Stephen King', title: 'Shining'}]
        }));
    })
});
