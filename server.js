const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
})

app.post('/signup', (req,res)=>{
    const sql = 'INSERT INTO registration (`email`,`password`) VALUES(?)';
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data)=>{
        if(err){
            res.json('Error')
        }
        return res.json(data)
    })
})

app.listen(5000, ()=>{
    console.log('NodeApi is running on port 5000')
})
