import {Router} from 'express'
export const router = Router()


router.get ('/', async (req, res) =>{

    let prodCarts = `Carrito`

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({prodCarts})
})
