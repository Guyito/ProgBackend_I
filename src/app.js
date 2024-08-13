// Inicio Server via Express en Puerto 8080

import express from 'express'
import {router as prodElectrosRouter} from './routes/prodElectros.js'
import {router as prodCartsRouter} from './routes/prodCarts.js'
import { electroManager } from './dao/ElectroManager.js'
import { cartsManager } from './dao/CartsManager.js'

electroManager.path = "./src/data/dataProdElectro.json"
cartsManager.path = "./src/data/dataCarts.json"

const PORT =8080
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', prodElectrosRouter)
app.use('/api/carts', prodCartsRouter)


app.get('/', (req, res)=>{
res.setHeader('Content-Type', 'text/plain')
res.status(200).send('OK')
})

const Server=app.listen(PORT, ()=>{
    console.log(`Server en puerto ${PORT}`)
})

//-----------------------------------------------------------
