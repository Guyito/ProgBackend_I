import fs from "fs"
// const cartsFilePath = path.resolve('./src/data/dataCarts.json');

export class cartsManager{

    static path

    static async get(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, {encoding: "utf-8"}))

        }else{
            return []
        }
    }

    static async create (){

        let carrito = await this.get()
        let id=1

        if(carrito.lenght>0){
            id=Math.max(...carrito.map(d=>d.id))+1
        }
        carrito.push({
            id,
            producto:[]
        })

        await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, 5))
        return id
        
    }
}