import sequelize from '../sequelize';
import Sequelize from 'sequelize';

const Book = sequelize.define('book', {
    author: {
        type: Sequelize.STRING,
        field: 'author'
    },
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    released: {
        type: Sequelize.INTEGER,
        field: 'released'
    }
});

export default Book;
