const main = module.exports
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'GrowthHub',
    timezone: 'Asia/Kolkata',
})

conn.connect(function (err) {
    if (err) throw new Error(err)
    console.log('Database connected successfully')
})



main.get = async (req, res) => { 

        return res.render('index', {title: 'chartJS'})
   
}

