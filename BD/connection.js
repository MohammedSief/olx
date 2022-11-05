const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(process.env.DB_URI)
        .then((result) => { console.log(`DB is connected ...`); })
        .catch((err) => { console.log("Failed to connect DB !", err); })
}


module.exports = connectDB