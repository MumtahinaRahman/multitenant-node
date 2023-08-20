const { connect } = require('./db-connection');
const mongoose = require('mongoose');
const url = "mongodb+srv://mumtahina:mumtahina@cluster0.e2bat.mongodb.net/multitenant";
let db;
const tenantSchema = new mongoose.Schema({ // defines the tenants schema 
    id: Number,
    name: String
}, { timestamps: true })

const tenantModel = mongoose.model("tenants", tenantSchema); // creates the tenants database

const getDb = async () => {
    return db ? db : await connect(url) // establish a connection to the database and return the connection instance unless the db is already created
}

const getTenantModel = async () => { // an asynchronous function that retrieve tenant model. i didn't get it.
    const adminDb = await getDb();
    return adminDb.model("tenants", tenantSchema)
}

module.exports = {
    getTenantModel
}