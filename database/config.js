const { connect } = require('mongoose');

const dbConnection = async () => {
    try {
        await connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (error) {
        console.log(error);
        throw new error('Error at database initialization');
    }
};

module.exports = dbConnection;
