import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://demo:demo@localhost:5432/demodb'
);

export default sequelize;
