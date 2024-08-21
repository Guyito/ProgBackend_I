
import {Router} from 'express'
import { electroManager } from '../dao/ElectroManager.js'
export const router = Router()

// Obtener todos los productos con un límite opcional
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let prodElectros = await electroManager.get()
        if (limit && !isNaN(limit)) {
            prodElectros = prodElectros.slice(0, limit);
        }
        res.json(prodElectros);
    } catch (error) {
        res.status(500).json({ error: 'Error en Productos' });
    }
});


// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const productId = Number(req.params.id)
        const products = await electroManager.get()
        const product = products.find(p => p.id === productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error en consulta prod' });
    }
})

// Agrego producto desde POST

router.post('/', async (req, res)=>{

    let { nombre, id, precio, stock } = req.body
    if (!nombre || !id || !precio || !stock) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({ error: 'Complete sarasa'})
    }

    try{
        
        let newProduct = await electroManager.create({ nombre, id, precio, stock })

        res.setHeader('Content-Type', 'application/json')
        res.status(201).json({newProduct})
    }
    catch(error){

        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        res.status(500).json({Error: `Error en el server`, detalle: `${error.message}`})
    }

})
