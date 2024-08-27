import {Router} from 'express'
export const router = Router()

import cartsManager  from '../dao/CartsManager.js'

// nuevo carrito

router.post('/', async (req, res) => {
    try {
        const newCart = await CartsManager.getCarrito();  
        res.status(201).json(newCart)
    } catch (error) {
        res.status(500).json({error: 'error generando el carrito'});
    }
})








router.get ('/', async (req, res) =>{

    let prodCarts = `Carrito`

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({prodCarts})
})
