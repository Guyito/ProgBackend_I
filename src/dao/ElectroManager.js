// import { error } from "console"
import fs from "fs"
import path from "path";

const productsFilePath = path.resolve('./src/data/dataProdElectro.json');

export class electroManager{

    static path = productsFilePath // Utilizamos estatico para no tener que llamar al New
    static async get(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding: "utf-8"}))

        }else{
            return []
        }
    }

static async create (prodElectros={}){  // Creando un nuevo producto

    if (!prodElectros.id){
        throw new Error ("id es requerido")
    }
    let prodElectro=await this.get()
    let existeId = prodElectro.find(p=>p.id === prodElectros.id)

    if (existeId){
        throw new Error (`El ${prodElectros.id}ya existe en otro producto`)
    }

    let id =1
    if(prodElectro.length>0){
        id=Math.max(...prodElectro.map(p=>p.id))+1
    }

    // let idCarrito = await electroManager.create()

    let nuevoElectroProduct ={
        id, ...prodElectros}

    prodElectro.push(nuevoElectroProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(prodElectro, null, 2))
    return nuevoElectroProduct
}

}

// module.exports = electroManager;
