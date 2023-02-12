require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbConnect = require ('./config/mongo')
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT

/**
 * Aqui invocamos la rutas
 */

//TODO localhost/api/_______
app.use("/api",require("./routes"))


app.listen(port,()=>{
    console.log(`tu app está lista por http://localhost:${port}`)
})

dbConnect()