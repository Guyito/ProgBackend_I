
import {Router} from 'express'
import { electroManager } from '../dao/electroManager.js'
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

// Actualizando un producto desde POST

router.put('/:id', async (req, res) => {

    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({error: 'id debe ser numerico'})
    }

    let aModificar=req.body
    delete aModificar.id

    if(aModificar.name){
        let existe =prod.find(f => f.name.toLowerCase()===aModificar.name.tuLowerCase() && f.id!==id)
        if(existe){
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({error:`ya existe otro prod ${aModificar.name}`})
        }
    }

    try{
        const updateID = await electroManager.updateProduct(id, aModificar)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({updateID});
        // const productId = req.params.id; 
        // const updateID = req.body

        // if(Object.keys(updateID).length===0){
        //     return res.status(400).json({error: 'no se puede actualizar'})
        // }

        // const productUp = await electroManager.updateProduct(productId, updateID);

        // if (!productUp){
        //     return res.status(404).json({error: 'falla de id_upgrade'})
        // }
        // res.json(productUp)
    }

    catch (error){
        console.error('error de ID_upgrade', error.message)
        return res.status(500).json({error: 'de ID_upgrade'})
    }

})

// Eliminar un producto desde DELETE

router.delete('/:id', async (req, res) => {
    try{
        const id = Number(req.params.id)
        const deleteProd = await electroManager.deleteProduct(id)

        if(deleteProd ===0){
            return res.status(404).json({error: 'prod no encontrado'})
        }
        res.status(204).end()
    }
    catch(error){
        console.error(error,'error eliminando el prod')
        res.status(500).json({error: 'error eliminando el producto'})
    }
})