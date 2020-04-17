const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/Proof_of_price_db', {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

module.exports = db;