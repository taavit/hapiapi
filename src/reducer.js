
export default function reducer(state = Map(), action) {
    switch (action.type) {
    case 'SET_BOOKS':
        return setBooks(state, action.books)
    }
}
