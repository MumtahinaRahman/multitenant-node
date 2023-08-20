const mongoose = require('mongoose');
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
};
const connect = async (url) => { // sets up a connection to the database 
    return new Promise(async (resolve, reject) => {
        const connection = await mongoose.createConnection(url, mongoOptions).asPromise();
        resolve(connection)
    })
};

module.exports = {
    connect
}