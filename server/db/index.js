const mongoose = require('mongoose')


const start = (() => {
    let connection = false
    return () => {
        if (connection) {
            return connection
        }

        mongoose.connect('mongodb://127.0.0.1:27017/cinema', {useNewUrlParser: true}
        ).catch(e => {console.log('Connection Error ', e.message)})
        connection = mongoose.connection

        return connection
    }
})();


module.exports = {start}