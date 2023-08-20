const { connect } = require('./db-connection');
const mongoose = require('mongoose');
require('dotenv').config(); 

const url = process.env.MONGODB_URI_MULTITENANT;
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