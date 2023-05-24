const api = module.exports
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

api.get = async (req, res) => {
    // const { dateRange } = req.query
    console.log(req.query)
    const fromDate = '2023-05-23'
    const toDate = '2023-05-23'
    const getQuery =
        `SELECT learnings, createdAt from learnings
     WHERE createdAt BETWEEN '${fromDate}' AND '${toDate}'`

    conn.query(getQuery, function (err, result) {
        if (err) throw new Error(err)

        const response = result.map(data => {
            let learnings = data.learnings.split(',')
            let count = learnings.length;
            return {
                learnings,
                count,
                createdAt: data.createdAt
            }
        })
        // res.status(200).json(response)
        return res.status(200).json(response)
    })
}


api.create = async (req, res) => {
    const { learning } = req.body;
    console.log("req.body", req.body)
    const createTable = `
    CREATE TABLE IF NOT EXISTS learnings
    (id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    learnings VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    type VARCHAR(20) DEFAULT "growthhub:learning" )
    `

    conn.query(createTable, function (err, result) {
        if (err) throw new Error(err)
        console.log("result", result)
    })

    const insertQuery = `
    INSERT INTO learnings
    SET learnings = '${learning}'`

    conn.query(insertQuery, function (err, result) {
        if (err) throw new Error(err)
        return res.json('Data inserted successfully')
    })
}