import { error } from "console"
import fs from "fs"
import electroManager from "./electroManager"
const cartsFilePath = path.resolve('./src/data/dataCarts.json')

export class cartsManager{

    static async getCarrito(){
        if(fs.existsSync(cartsFilePath)){
            return JSON.parse(await fs.promises.readFile(cartsFilePath, 'utf-8'))

        }else{
            return []
        }
    }

    static async addCarrito(){

        let aCarrito = await this.getCarrito()
        let newCarrito = {
            id: ,
            prod: [],
        }

        aCarrito.push(newCarrito)

        await fs.promises.writeFile(cartsFilePath, JSON.stringify(aCarrito, null, 5))
        return newCarrito
        
    }

    static async getCarProd(cartId){
        try {
            const carts = await this.getCarrito()
            const cart = carts.find(c => c.id === cartId)

            if (!cart){
                return null
            }
            return cart.prod
        } 
        catch (error){
            console.error('error de prod en carrito:', error.message)
            throw new error ('error de prod en carrito')
        }
    }

    static async aggProdEnCart (cartId, productId){
        const carts = await this.getCarrito()
        const cart = carts.find(c => c.id === cartId)

        if (!cart){
            throw new error (`no existe el id ${cartId}`)
        }

        const prod = await electroManager.get()
        const pro = prod.find(p => p.id === productId)

        if (!pro){
            throw new error (`producto id ${productId} no encontrado`)
        }

        const productIndex = cart.prod.findIndex(p =>p.pro === productId)

        if(productIndex ===-1){
            cart.prod.push({pro: productId, cantidad: 1})
        } else{
            cart.prod[productIndex].cantidad +=1
        }

        await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 5))

        return (cart.prod)

    }
}

export default cartsManager