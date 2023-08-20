const { connect } = require('./db-connection');
const mongoose = require('mongoose');
const url = "mongodb+srv://mumtahina:mumtahina@cluster0.e2bat.mongodb.net";
let db;
const customerSchema = new mongoose.Schema({ // defines the customer schema 
    customerName: String
}, { timestamps: true })

const customerModel = mongoose.model("customers", customerSchema) // create customer tables based on the customer schema

const getTenantDB = async (tenantId) => { // establishes a connection to a specific tenant's database 
    const dbName = `tenant-${tenantId}`;
    db = db ? db : await connect(url)
    let tenantDb = db.useDb(dbName, { useCache: true });
    return tenantDb;
}

const getCustomerModel = async (tenantId) => { // retrieves the customers database for a specific tenant 
    const tenantDb = await getTenantDB(tenantId);
    return tenantDb.model("customers", customerSchema)
}

module.exports = {
    getCustomerModel
}